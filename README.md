# Eros Worldwide - Setup Guide

## 🚀 Quick Start (Development)

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

The app will run with **localStorage** by default. No additional setup needed.

---

## 🎨 Brand Colors

| Element | Color |
|---------|-------|
| Primary (Rose) | `#E8475F` |
| Dark Navy | `#1A1D29` |
| Secondary Gray | `#374151` |
| Success | `#10B981` |

---

## 🗄️ Database Options

### Option 1: LocalStorage (Default)
The app uses localStorage by default for development. No setup needed.

### Option 2: Supabase (Production)

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In your Supabase dashboard, go to **SQL Editor**
3. Copy the contents of `supabase-schema.sql` and run it
4. Update `.env.local`:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 💳 Stripe Setup (Payments)

1. Go to [stripe.com](https://stripe.com) and create an account
2. Get your **Publishable Key** from the API Keys section
3. Add to `.env.local`:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

## 🔧 Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key for AI consultant | Optional |
| `VITE_SUPABASE_URL` | Supabase project URL | For production |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | For production |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | For payments |

---

## 📁 Project Structure

```
├── App.tsx                 # Main application component
├── index.tsx               # React entry point
├── index.html              # HTML template
├── index.css               # Global styles (design system)
├── types.ts                # TypeScript interfaces
├── database.ts             # LocalStorage database (fallback)
├── supabaseClient.ts       # Supabase client and API
├── supabase-schema.sql     # Database schema for Supabase
├── geminiService.ts        # AI consultant service
├── vite.config.ts          # Vite configuration
├── components/
│   ├── Carousel.tsx        # Featured ladies carousel
│   ├── LadyProfileModal.tsx # Lady profile modal
│   ├── Sidebar.tsx         # Navigation sidebar
│   └── TestimonialTabs.tsx # Testimonial section
├── hooks/
│   └── useData.ts          # Data management hook
└── src/
    ├── styles/             # Design tokens & globals
    └── types/              # TypeScript types
```

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3984
CMD ["npm", "run", "preview"]
```

---

## 🎯 Website

**Production URL:** https://erosworldwide.io

---

## 📞 Support

For questions about the codebase, please refer to the inline comments or create an issue.
