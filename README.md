# 🚀 Mahavishnu — Personal Portfolio & Blog

A modern, full-stack developer portfolio built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, and **Supabase**. Features a 3D hero scene, admin CMS, SEO-optimized blog system, and premium dark-mode design.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwindcss)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)

---

## ✨ Features

- **3D Hero Section** — Interactive React Three Fiber scene with ambient glow animations
- **Responsive Design** — Pixel-perfect on mobile, tablet, and desktop
- **Dark / Light Mode** — System-aware theme with smooth transitions
- **Blog System** — Markdown-based with SEO, tags, and search/filter
- **Admin Panel** — Full CMS with blog CRUD, message inbox, and newsletter management
- **Custom Cursor** — Hydration-safe animated cursor (desktop only)
- **Contact Form** — Anti-spam honeypot, stores messages to database
- **Newsletter** — Email subscription with admin management
- **SEO Optimized** — OpenGraph, Twitter cards, sitemap.xml, robots.txt
- **Framer Motion** — Staggered animations throughout
- **Supabase Auth** — Admin-only authentication

---

## 🛠 Tech Stack

| Layer         | Technology                         |
| :------------ | :--------------------------------- |
| Framework     | Next.js 16 (App Router, Turbopack) |
| Language      | TypeScript                         |
| Styling       | Tailwind CSS 4                     |
| UI Components | ShadCN UI                          |
| Animations    | Framer Motion                      |
| 3D            | React Three Fiber + Drei           |
| Database      | Supabase (PostgreSQL)              |
| ORM           | Prisma                             |
| Auth          | Supabase Auth                      |
| Deployment    | Vercel                             |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm / yarn / pnpm
- Supabase project (free tier)

### 1. Clone & Install

```bash
git clone https://github.com/mahavishnup/personal-portfolio.git
cd personal-portfolio
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env
```

Fill in your Supabase credentials in `.env` — see [.env.example](.env.example) for all required variables.

### 3. Database Setup

```bash
npx prisma generate
npx prisma db push
npx prisma db seed   # optional: seeds sample data
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (main)/          # Public routes (home, about, blogs, etc.)
│   ├── admin/           # Admin panel (protected)
│   └── actions/         # Server actions (blog, contact, auth)
├── components/
│   ├── 3d/              # Three.js hero scene
│   ├── about/           # Experience timeline
│   ├── admin/           # Admin components (sidebar, editor, etc.)
│   ├── auth/            # Login form
│   ├── blog/            # Blog card, filters
│   ├── contact/         # Contact form
│   ├── home/            # Hero, skills, projects, about sections
│   ├── layout/          # Header, footer
│   ├── projects/        # Project grid
│   └── ui/              # ShadCN UI + custom cursor
├── lib/                 # Prisma client, utils, static data
├── utils/supabase/      # Supabase client/server helpers
└── hooks/               # Custom React hooks
```

---

## 🌐 Deployment (Vercel)

1. Push your code to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
   - `NEXT_PUBLIC_SITE_URL` _(optional — defaults to `http://localhost:3000`)_
4. Deploy!

> **Note:** `NEXT_PUBLIC_SITE_URL` falls back to `http://localhost:3000` if not set. If you use a custom domain on Vercel, set this variable to your custom domain URL.

---

## 📜 Scripts

| Command          | Description               |
| :--------------- | :------------------------ |
| `npm run dev`    | Start development server  |
| `npm run build`  | Production build          |
| `npm run start`  | Start production server   |
| `npm run format` | Format code with Prettier |
| `npm run lint`   | Lint with ESLint          |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Mahavishnu P**

- [GitHub](https://github.com/mahavishnup)
- [LinkedIn](https://www.linkedin.com/in/developermahavishnu/)
- [YouTube](https://www.youtube.com/@mahavishnu9312)
- [Instagram](https://www.instagram.com/developermahavishnu/)
