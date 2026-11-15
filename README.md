# CampusFind – Smart Campus Lost & Found Portal

A premium, modern, fully functional full-stack web application designed specifically for college and university campuses. Built with **React**, **Vite**, **Tailwind CSS**, and powered by a robust **Supabase** backend (PostgreSQL database, Supabase Auth, and Supabase Storage with Row Level Security).

---

## 🌟 Key Features

- **🎓 Campus-Tailored Architecture**: Report and search lost or found belongings across specific university zones (Central Library, Engineering Block, Student Center, Sports Complex, Dining Halls, Dorms, etc.).
- **🔐 Secure Supabase Authentication**: Full registration and login flow for university students with encrypted credentials and metadata.
- **🛡️ Row Level Security (RLS)**: Enforced directly at the PostgreSQL database level. Anyone can browse listings, but students can only edit, resolve, or delete their own posts.
- **📸 Supabase Storage for Item Photos**: Upload item photos directly to the `item-images` Supabase bucket with public access policies.
- **⚡ Real-Time Search & Multi-Filter**: Filter by category (Electronics, ID & Cards, Keys, Books, Bags, etc.), campus location, and resolution status (active vs resolved).
- **📊 Student Dashboard**: Track your submitted lost items, found items, resolution rate, and manage or delete posts in one place.
- **🎉 Interactive Case Resolution**: Mark returned items as resolved with visual feedback and celebration confetti.
- **🎨 Premium Navy & Subtle Purple Theme**: Glassmorphism effects, backdrop blurs, glow accents, responsive mobile navigation, and Plus Jakarta Sans typography.

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 + Vite
- **Styling**: Tailwind CSS + Custom Glassmorphism UI
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **Backend & Database**: Supabase (PostgreSQL)
- **Security & Authorization**: Supabase Row Level Security (RLS)
- **File Storage**: Supabase Storage (`item-images` bucket)
- **Auth Provider**: Supabase Authentication (Email & Password)

---

## 📂 Project Structure

```text
CampusFind/
├── .env                      # Local environment configuration
├── .env.example              # Example environment variables
├── index.html                # Entry HTML with custom fonts & meta
├── package.json              # Project dependencies & scripts
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.js        # Custom Navy/Purple theme configuration
├── vite.config.js            # Vite configuration
│
├── supabase/
│   └── schema.sql            # Full PostgreSQL database schema, RLS & Storage policies
│
└── src/
    ├── main.jsx              # App entry point
    ├── App.jsx               # Page router, modal controller & providers
    ├── index.css             # Glassmorphism utilities & base styles
    │
    ├── lib/
    │   └── supabase.js       # Supabase client, storage upload & delete helpers
    │
    ├── context/
    │   ├── AuthContext.jsx   # Student authentication provider & state
    │   └── ItemContext.jsx   # Items database CRUD provider & local preview fallback
    │
    ├── components/
    │   ├── Navbar.jsx        # Responsive navigation with badge counters & mobile menu
    │   ├── Footer.jsx        # Campus safety tips, links & campus emergency contacts
    │   ├── ItemCard.jsx      # Item card with status badge, owner controls & details trigger
    │   ├── ItemDetailModal.jsx # Full-page modal with details & contact instructions
    │   ├── EditItemModal.jsx # Post editor modal for post owners
    │   └── SetupNotice.jsx   # In-app guided walkthrough for Supabase connection
    │
    └── pages/
        ├── Home.jsx          # Hero, live search, stats counter & recent items showcase
        ├── LostItems.jsx     # Filterable lost items board with location & category filters
        ├── FoundItems.jsx    # Filterable found items directory
        ├── AddItem.jsx       # Report form with drag-and-drop photo upload
        ├── Dashboard.jsx     # Student personal dashboard with post management
        ├── About.jsx         # Mission, safety guidelines, and FAQ accordion
        ├── Login.jsx         # Student sign in page
        └── Signup.jsx        # Student registration page
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18 or higher)
- A free **Supabase** account ([https://supabase.com](https://supabase.com))

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Open `.env` and fill in your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-or-anon-key
```

### 4. Run the Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

---

## 🐘 Supabase Database & Backend Setup

To connect your own live Supabase PostgreSQL database:

### Step 1: Create a Supabase Project
1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard) and create a new project.
2. Choose your preferred region and set a secure database password.

### Step 2: Get API Credentials
1. In your Supabase Project Dashboard, go to **Project Settings** (gear icon) -> **API**.
2. Copy the **Project URL** and paste it into `VITE_SUPABASE_URL` in `.env`.
3. Copy the **Project API Key** (`anon` / `public`) and paste it into `VITE_SUPABASE_PUBLISHABLE_KEY` in `.env`.

### Step 3: Run the Database Schema
1. Go to the **SQL Editor** tab in your Supabase dashboard.
2. Click **New query**.
3. Copy the entire contents of [`supabase/schema.sql`](./supabase/schema.sql) and paste it into the query editor.
4. Click **Run**.

This SQL script will:
- Create the `public.items` table with required fields: `user_id`, `user_name`, `user_email`, `title`, `description`, `category`, `location`, `date`, `item_type`, `image_url`, `image_path`, `status`, and `contact_info`.
- Create performance indexes for search and filter queries.
- Add an automatic `updated_at` trigger.
- Enable **Row Level Security (RLS)**.
- Set up security policies:
  - Anyone can read active/all items.
  - Authenticated students can insert items with their own `auth.uid()`.
  - Only authors can update or delete their own posts.
- Create the public storage bucket `item-images`.
- Configure storage RLS policies for uploading and deleting item photos.

### Step 4: Supabase Authentication Configuration
1. In the Supabase Dashboard, go to **Authentication** -> **Providers** -> **Email**.
2. Ensure **Email provider** is **Enabled**.
3. (Optional for local testing): Under **Authentication** -> **URL Configuration**, set the Site URL to `http://localhost:5173`. You can also toggle off "Confirm email" under **Authentication** -> **Providers** -> **Email** if you want instant student sign-in without waiting for email verification links.

---

## 🛡️ Security & Privacy

- **Row Level Security**: Users cannot modify or delete items posted by other students even if they attempt direct API requests.
- **Secret Key Protection**: The `service_role` key is never bundled or referenced in frontend code. Only the safe `anon`/`publishable` key is used.
- **File Validation**: Image uploads are validated for file size (under 8MB) and file type before being uploaded to Supabase Storage.

---

## 📦 Building for Production

To create an optimized production build:
```bash
npm run build
```
To preview the production build locally:
```bash
npm run preview
```

---

## 📄 License
MIT License. Built for university and college student communities.
