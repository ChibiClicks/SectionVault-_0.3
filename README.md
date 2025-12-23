# SectionVault - Shopify Liquid Code Preview & Library

![SectionVault](https://img.shields.io/badge/SectionVault-Liquid%20Preview-6366f1?style=for-the-badge)

**Preview, save, and share your Shopify Liquid section code with the community.**

A platform for Shopify developers to paste Liquid code, see it rendered live, save to their library, and discover code shared by others.

---

## ✨ Features

- 💻 **Monaco Code Editor** - Professional VS Code-style editor
- 👁️ **Live Preview** - Real-time Liquid rendering with variable mocking
- 💾 **Save to Library** - Store unlimited Liquid sections
- 🌐 **Public Sharing** - Share your code with the community
- 📚 **Browse Gallery** - Discover and fork public code
- 🔒 **Private/Public Control** - Choose visibility for each code
- 📱 **Responsive Preview** - Toggle between desktop and mobile views
- 🔐 **Authentication** - Secure sign-in with Clerk

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Clerk account (free)
- Supabase account (optional, for save/share features)

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables (see SETUP.md)
cp .env.example .env.local
# Add your Clerk keys to .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📖 Setup Guide

**See [SETUP.md](./SETUP.md) for complete setup instructions.**

You'll need to:
1. Create a Clerk account and get API keys
2. (Optional) Set up Supabase database for save/share features

---

## 🎯 Usage

### Preview Liquid Code
1. Go to `/editor`
2. Paste your Shopify Liquid section code
3. See live preview on the left
4. Toggle between desktop and mobile views

### Save to Library
1. Add title and description
2. Choose Public or Private
3. Click "Save"
4. Access from "My Codes"

### Browse Community Codes
1. Go to `/gallery`
2. Browse public codes from other developers
3. Click to view full preview
4. Copy or fork to your account

---

## 🏗️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Authentication | Clerk |
| Database | Supabase (PostgreSQL) |
| Code Editor | Monaco Editor |
| Liquid Parser | LiquidJS |
| Styling | Tailwind CSS |
| Icons | Lucide React |

---

## 📁 Project Structure

```
SectionVault/
├── app/
│   ├── page.tsx              # Landing page
│   ├── editor/               # Code editor page
│   ├── my-codes/             # User dashboard
│   ├── gallery/              # Public codes gallery
│   ├── sign-in/              # Clerk sign-in
│   └── sign-up/              # Clerk sign-up
├── components/
│   ├── editor/               # Editor components
│   │   └── LiquidPreview.tsx
│   └── layout/
│       └── Header.tsx
├── lib/
│   └── supabase/
│       ├── client.ts         # Supabase API client
│       └── schema.sql        # Database schema
├── middleware.ts             # Route protection
└── SETUP.md                  # Setup instructions
```

---

## 🔐 Authentication

SectionVault uses [Clerk](https://clerk.com) for authentication.

**Protected Routes:**
- `/editor` - Code editor
- `/my-codes` - User dashboard

**Public Routes:**
- `/` - Landing page
- `/gallery` - Browse public codes

---

## 💾 Database Schema

```sql
-- User codes table
CREATE TABLE user_codes (
  id UUID PRIMARY KEY,
  clerk_user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  liquid_code TEXT NOT NULL,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

See `lib/supabase/schema.sql` for complete schema.

---

## 🎨 Features in Detail

### Code Editor
- **Monaco Editor** - Same editor as VS Code
- **Syntax Highlighting** - HTML/Liquid highlighting
- **Line Numbers** - Easy code navigation
- **Dark Theme** - Professional VS Dark theme

### Live Preview
- **Variable Mocking** - Auto-replaces Liquid variables
- **Schema Removal** - Strips `{% schema %}` for clean preview
- **Responsive** - Test desktop and mobile layouts
- **Real-time** - Updates as you type

### User Dashboard
- **Grid View** - Visual code library
- **Public/Private Icons** - Quick visibility indicator
- **Edit/Delete** - Full code management
- **Search** - Find your codes quickly

### Public Gallery
- **Community Codes** - Browse all public codes
- **Author Info** - See who created each code
- **Search** - Find specific code types
- **Preview** - See before you copy

---

## 🚧 Roadmap

### Phase 1 (Completed ✅)
- [x] Monaco code editor integration
- [x] Live Liquid preview with mocking
- [x] Clerk authentication
- [x] Supabase database schema
- [x] My Codes dashboard UI
- [x] Public gallery UI
- [x] Public/private toggle

### Phase 2 (In Progress)
- [ ] Connect save functionality to Supabase
- [ ] Load real data in My Codes
- [ ] Load real data in Gallery
- [ ] Edit existing code
- [ ] Delete code functionality

### Phase 3 (Planned)
- [ ] Individual code view page
- [ ] Copy/Fork functionality
- [ ] Code preview thumbnails
- [ ] Search and filter
- [ ] User profiles
- [ ] Comments and likes

---

## 🤝 Contributing

This is a demonstration project. Feel free to fork and customize for your needs!

---

## 📄 License

MIT License - feel free to use for your own projects

---

## 🙏 Acknowledgments

- Built with ❤️ for the Shopify developer community
- Powered by [Clerk](https://clerk.com) and [Supabase](https://supabase.com)
- Editor by [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- Icons by [Lucide](https://lucide.dev/)

---

**Made for developers who love clean code and beautiful previews** ✨
