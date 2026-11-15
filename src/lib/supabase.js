import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseKey && 
  supabaseUrl.startsWith('https://') && 
  !supabaseUrl.includes('your-project-id')
);

// Fallback placeholder URL for graceful initialization when keys are pending
const validUrl = isSupabaseConfigured ? supabaseUrl : 'https://placeholder-project.supabase.co';
const validKey = isSupabaseConfigured ? supabaseKey : 'placeholder-anon-key';

export const supabase = createClient(validUrl, validKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

/**
 * Upload an image file to Supabase Storage bucket 'item-images'
 * @param {File} file 
 * @param {string} userId 
 * @returns {Promise<{ publicUrl: string, path: string }>}
 */
export async function uploadItemImage(file, userId) {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured yet. Please add your credentials in .env');
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
  const filePath = `${userId || 'public'}/${fileName}`;

  const { data, error } = await supabase.storage
    .from('item-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Error uploading image to Supabase Storage:', error);
    throw error;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('item-images')
    .getPublicUrl(data.path);

  return { publicUrl, path: data.path };
}

/**
 * Remove an image file from Supabase Storage bucket
 * @param {string} path 
 */
export async function deleteItemImage(path) {
  if (!isSupabaseConfigured || !path) return;
  try {
    await supabase.storage.from('item-images').remove([path]);
  } catch (err) {
    console.warn('Failed to delete image from storage:', err);
  }
}
