# SectionVault - Complete Setup Guide

This guide will help you set up SectionVault with Clerk authentication and optionally Supabase for database features.

---

## 📋 Quick Overview

- **Clerk** (REQUIRED) - User authentication (sign-in/sign-up)
- **Supabase** (OPTIONAL) - Database for saving/sharing codes

**Without Supabase:** You can still use the editor and preview Liquid code!  
**With Supabase:** Full functionality including save, My Codes, and Public Gallery.

---

## 🔑 Step 1: Set Up Clerk Authentication (REQUIRED)

### 1.1 Create Clerk Account

1. Go to [https://dashboard.clerk.com](https://dashboard.clerk.com)
2. Click "Sign up" and create a free account
3. After signing in, click **"+ Create application"**
4. **Name your application:** `SectionVault` (or any name)
5. **Choose sign-in options:** Email + Google (recommended)
6. Click **"Create application"**

### 1.2 Get API Keys

1. You'll see "API Keys" page automatically after creating the app
2. Copy these two keys:
   - **Publishable Key** (starts with `pk_test_...`)
   - **Secret Key** (starts with `sk_test_...`) - Click "Show" first

### 1.3 Add Keys to .env.local

1. In your project folder, open (or create) `.env.local`
2. Add these lines with YOUR keys:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
CLERK_SECRET_KEY=sk_test_your_actual_secret_key_here
```

**⚠️ Important:** Replace `your_actual_key_here` with the real keys from Clerk!

### 1.4 Configure Clerk Paths (Already Done!)

The app is already configured for Clerk. You're good to go!

### 1.5 Test Clerk

1. Save `.env.local`
2. Restart your dev server:
   ```bash
   npm run dev
   ```
3. Visit `http://localhost:3000`
4. Click "Sign Up" in the header
5. ✅ You should see Clerk's sign-up form!

---

## 🗄️ Step 2: Set Up Supabase (OPTIONAL - For Save/Load)

**Skip this if you only want to preview Liquid code!**

### 2.1 Create Supabase Project

1. **Go to** [https://supabase.com](https://supabase.com)
2. **Click** "Start your project" 
3. **Sign in** with GitHub (easiest)
4. **Create Organization** (first time only):
   - Organization name: `Personal` or any name
   - Click "Create organization"

5. **Create New Project:**
   - Click **"New Project"**
   - **Name:** `sectionvault` 
   - **Database Password:** Make a strong password ⚠️ **SAVE THIS!**
   - **Region:** Pick closest to your location
   - **Plan:** Free (perfect for this project)
   - Click **"Create new project"**
   - ⏱️ Wait 1-2 minutes for setup

### 2.2 Run Database Schema

1. **Wait** for project to finish setting up (green checkmark)
2. In Supabase Dashboard, click **"SQL Editor"** in left sidebar
3. Click **"+ New query"**
4. **Open this file** in your code editor: `lib/supabase/schema.sql`
5. **Copy ALL the SQL** from that file
6. **Paste** into Supabase SQL Editor
7. Click **"Run"** (or press `Ctrl+Enter` / `Cmd+Enter`)
8. ✅ Should say "Success. No rows returned"

**What this does:** Creates `users` and `user_codes` tables.

### 2.3 Get Supabase API Keys

1. Click **"Settings"** (gear icon ⚙️) in left sidebar
2. Click **"API"**
3. Find and copy:
   - **Project URL** - something like `https://abcdefghijk.supabase.co`
   - **anon public key** - long string under "Project API keys"

### 2.4 Add Supabase Keys to .env.local

1. Open `.env.local` again
2. Add these lines (with YOUR values):

```bash
# Supabase Database (Optional)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key_here
```

Your complete `.env.local` should look like:

```bash
# Clerk Authentication (REQUIRED)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_sunny-bonefish-8.clerk.accounts.dev$
CLERK_SECRET_KEY=sk_test_nopVOwpRqrH30Hk9zF16vtYXfZWbl3J9RbYfSrHQ3O

# Supabase Database (OPTIONAL)
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. **Save** the file

### 2.5 Restart Server

```bash
# Stop server (Ctrl+C or Cmd+C)
# Start again
npm run dev
```

### 2.6 Test Supabase

1. Visit `http://localhost:3000/editor`
2. Paste some Liquid code
3. Add a title: "Test Section"
4. Click **"Save"**
5. ✅ Should say "Code saved successfully!"
6. Go to `/my-codes` - you should see your code!

---

## ✅ What Works Without Supabase

- ✅ Sign in / Sign up (Clerk)
- ✅ Editor page works
- ✅ Liquid code preview (desktop/mobile)
- ✅ All preview features
- ❌ Save button (shows error)
- ❌ My Codes page (shows setup message)
- ❌ Gallery page (shows setup message)

## ✅ What Works With Supabase

**Everything above, PLUS:**
- ✅ Save codes to database
- ✅ My Codes - view all your codes
- ✅ Delete codes
- ✅ Public/Private toggle
- ✅ Gallery - browse community codes
- ✅ Search codes

---

## 🔧 Troubleshooting

### Clerk Issues

**"Clerk publishable key not found"**
- Check `.env.local` exists in project root (not in a subfolder!)
- Keys should start with `pk_test_` and `sk_test_`
- No quotes around the keys
- Restart dev server after adding keys

**Can't sign in**
- Try incognito/private mode
- Clear cookies and try again
- Check Clerk dashboard is active

### Supabase Issues

**"Supabase is not configured"**
- Did you add both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`?
- Restart dev server after adding keys
- Check for typos (no extra spaces!)

**"Failed to save code"**
- Did you run the schema SQL in Supabase?
- Check "Table Editor" in Supabase - should see `user_codes` table
- Try this SQL: `SELECT * FROM user_codes;` in SQL Editor

**Schema errors when running SQL**
- If it says "already exists", that's OK! Tables are created.
- If other errors, copy the exact error and check the SQL file

### General Issues

**Page won't load**
- Check dev server is running (`npm run dev`)
- Try `http://localhost:3000` (not https)
- Check console for errors

**Changes not showing**
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Clear browser cache
- Restart dev server

---

## 🎉 You're Ready!

**With just Clerk:**
- Use the Editor to preview Liquid code
- Test different section layouts
- Desktop/Mobile preview

**With Clerk + Supabase:**
- Save unlimited sections
- Build your code library
- Share with community
- Browse public gallery

Enjoy **SectionVault**! 🚀

---

## 📚 Additional Resources

- **Clerk Docs:** https://clerk.com/docs
- **Supabase Docs:** https://supabase.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Shopify Liquid:** https://shopify.dev/docs/api/liquid
