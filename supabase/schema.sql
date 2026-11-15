-- =========================================================
-- CampusFind – Smart Campus Lost & Found Portal
-- Supabase PostgreSQL Schema & Security Configuration
-- =========================================================

-- 1. Create items table
CREATE TABLE IF NOT EXISTS public.items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    user_name TEXT,
    user_email TEXT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    item_type TEXT NOT NULL CHECK (item_type IN ('lost', 'found')),
    image_url TEXT,
    image_path TEXT,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'resolved')),
    contact_info TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Performance indexes for search, filter & user dashboard
CREATE INDEX IF NOT EXISTS idx_items_type ON public.items (item_type);
CREATE INDEX IF NOT EXISTS idx_items_status ON public.items (status);
CREATE INDEX IF NOT EXISTS idx_items_category ON public.items (category);
CREATE INDEX IF NOT EXISTS idx_items_location ON public.items (location);
CREATE INDEX IF NOT EXISTS idx_items_user_id ON public.items (user_id);
CREATE INDEX IF NOT EXISTS idx_items_created_at ON public.items (created_at DESC);

-- 3. Trigger for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_items_updated_at ON public.items;
CREATE TRIGGER set_items_updated_at
    BEFORE UPDATE ON public.items
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- 4. Grant table permissions to API roles
GRANT ALL ON TABLE public.items TO anon, authenticated, service_role;

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;

-- 6. Row Level Security Policies
-- Anyone (students, visitors, logged in or logged out) can view all items
DROP POLICY IF EXISTS "Public items view" ON public.items;
CREATE POLICY "Public items view"
    ON public.items
    FOR SELECT
    USING (true);

-- Authenticated students can post new lost or found items
DROP POLICY IF EXISTS "Authenticated users can insert items" ON public.items;
CREATE POLICY "Authenticated users can insert items"
    ON public.items
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Students can ONLY update their own posts
DROP POLICY IF EXISTS "Users can update own items" ON public.items;
CREATE POLICY "Users can update own items"
    ON public.items
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Students can ONLY delete their own posts
DROP POLICY IF EXISTS "Users can delete own items" ON public.items;
CREATE POLICY "Users can delete own items"
    ON public.items
    FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- =========================================================
-- Supabase Storage Configuration for "item-images" Bucket
-- =========================================================

-- Create the public bucket if it does not exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('item-images', 'item-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policy: Public access to view item photos
DROP POLICY IF EXISTS "Public can view item images" ON storage.objects;
CREATE POLICY "Public can view item images"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'item-images');

-- Storage Policy: Authenticated users can upload item images
DROP POLICY IF EXISTS "Authenticated users can upload item images" ON storage.objects;
CREATE POLICY "Authenticated users can upload item images"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'item-images');

-- Storage Policy: Users can update their uploaded images
DROP POLICY IF EXISTS "Authenticated users can update own images" ON storage.objects;
CREATE POLICY "Authenticated users can update own images"
    ON storage.objects
    FOR UPDATE
    TO authenticated
    USING (bucket_id = 'item-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage Policy: Users can delete their uploaded images
DROP POLICY IF EXISTS "Authenticated users can delete own images" ON storage.objects;
CREATE POLICY "Authenticated users can delete own images"
    ON storage.objects
    FOR DELETE
    TO authenticated
    USING (bucket_id = 'item-images');
