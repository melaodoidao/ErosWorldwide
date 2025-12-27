---
description: How to work on the Aura & Eros project - "Empire Building" approach
---

# Aura & Eros - Empire Building Workflow

## Project Vision
This is not just a website - it's an **international marriage agency empire**. The goal is to create a platform that looks like it has been developed over **years** by a professional team, not something that was quickly coded.

## Design Philosophy

### What We're NOT
- Vibecoding / quick prototype look
- Modern startup aesthetic
- Too much whitespace
- Generic placeholder content

### What We ARE
- Established business portal (like loveme.com / AFA)
- Dense information architecture
- Specific numbers and dates
- Awards and credentials prominently displayed
- Corporate blue palette with gold accents
- Professional, trustworthy, authoritative

## Key Design Principles

1. **Density over Minimalism**: More useful content per viewport
2. **Specific over Generic**: Real numbers, dates, statistics
3. **Professional over Modern**: Subtle transitions, corporate colors
4. **Authoritative over Trendy**: Awards, compliance badges, years in business
5. **Functional over Decorative**: Every element serves a purpose

## Color Palette
- Primary: `#1e3a5f` (Corporate Blue)
- Accent: `#c9a227` (Gold)
- Success: `#28a745` (Green)
- Background: `#f1f3f5` (Light Gray)
- Text: Various grays from design system

## Typography
- Sans-serif for body (Inter, system fonts)
- Bold for headers, medium for body
- Less uppercase than typical modern sites
- Smaller font sizes for density

## Components to Maintain Consistency

### Card Headers
```tsx
<div className="bg-[#1e3a5f] text-white px-4 py-2 text-sm font-bold">
  Section Title
</div>
```

### Buttons
```tsx
// Primary
<button className="bg-[#1e3a5f] text-white px-4 py-2 rounded text-sm font-bold">

// Accent/CTA
<button className="bg-[#c9a227] text-[#1e3a5f] px-4 py-2 rounded text-sm font-bold">

// Success
<button className="bg-[#28a745] text-white px-4 py-2 rounded text-sm font-bold">
```

### Cards
```tsx
<div className="bg-white border border-gray-200 rounded-lg">
```

## Running the Project

// turbo-all
1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Build for production: `npm run build`

## Key Files

- `App.tsx` - Main application component (large, ~1000 lines)
- `index.css` - Design system and global styles
- `database.ts` - LocalStorage data management
- `supabaseClient.ts` - Supabase integration (when configured)
- `components/Carousel.tsx` - Featured ladies carousel
- `components/LadyProfileModal.tsx` - Lady profile modal
- `components/TestimonialTabs.tsx` - Success stories tabs

## Backend Integration

### Supabase (Optional)
1. Create project at supabase.com
2. Run `supabase-schema.sql` in SQL Editor
3. Update `.env.local` with credentials
4. App will automatically use Supabase when configured

### Stripe (Future)
- Payment processing for tour bookings
- Requires backend server for webhooks

## Quality Checklist

Before considering a page "done":
- [ ] Multiple dense content blocks
- [ ] Specific numbers/dates
- [ ] Clear CTAs with hover states
- [ ] Professional color scheme
- [ ] Works on mobile
- [ ] All buttons functional
- [ ] No placeholder text
- [ ] Looks like it took years to build
