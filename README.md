# Violet Paper

> A futuristic, glassmorphic microblog built with Next.js, Tailwind CSS, and animated backgrounds. Share your thoughts, stories, and creativity in a beautiful, modern UI. Now with global language switching, author profiles, post follow/edit/delete, and transparent search bar.

## Features

- 🟣 Glassmorphism and animated gradient backgrounds
- 🌗 Light/Dark theme with smooth transitions
- 📝 Create, view, edit, and delete posts and stories
- 🔍 Transparent search bar at the top
- 📱 Mobile-first, app-like UX
- 👤 User authentication and profile pages
- 🏷️ Trending topics and user stats
- ❤️ Like, 💬 Comment, and 👥 Follow authors
- ✏️ Edit and 🗑️ Delete your own posts
- 🕒 Post date and time display
- 🧑 Author info and profile links on every post
- 🌐 Global Persian/English language switch (reactive)
- Header images for posts
- Modern navigation and responsive layout

## Tech Stack

- [Next.js](https://nextjs.org/) (App directory)
- [Tailwind CSS](https://tailwindcss.com/) for all styling
- Custom CSS for glassmorphism and theme variables
- React hooks for state and effects
- API routes for auth, posts, profile, activity, follow, delete

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
2. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/` — Main app directory (pages, API routes, UI components)
- `app/ui/` — UI components (AuthPanel, SiteHeader, MobileNav, etc.)
- `app/globals.css` — Global styles, theme variables, glassmorphism
- `public/` — Static assets (SVGs, icons)

## Customization

- Edit `app/page.tsx` for the main feed and search bar
- Edit `app/ui/` components for UI changes
- Update theme variables and glass styles in `app/globals.css`

## Deployment

Deploy easily on [Vercel](https://vercel.com/) or any platform supporting Next.js.

## Author

Made with 💜 by Slahtalab Mohsen
