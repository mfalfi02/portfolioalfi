# Next.js 15 Portfolio

Struktur proyek Next.js (App Router) modern dengan Three.js viewport yang lebih halus, Tailwind CSS, TypeScript, contact API, dan backend konten sederhana berbasis file JSON.

## 📂 Struktur Folder Proyek

```
nextjs-3d-portfolio/
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── api/
│   │   │   ├── admin/
│   │   │   │   └── verify/      # API verifikasi PIN admin
│   │   │   ├── contact/
│   │   │   │   └── route.ts     # API endpoint pengiriman pesan
│   │   │   └── site-content/    # API baca/tulis konten portfolio
│   │   ├── favicon.ico
│   │   ├── globals.css          # Global Tailwind styles & font variables
│   │   ├── layout.tsx           # Root metadata, fonts, header, footer layout
│   │   └── page.tsx             # Main client/server interactive portfolio page
│   ├── components/              # Modular UI Components
│   │   ├── Navbar.tsx           # Sticky responsive navigation bar
│   │   ├── ThreeHeroCanvas.tsx  # Interactive WebGL 3D Canvas (Three.js)
│   │   ├── HeroSection.tsx      # Intro hero section & statistics
│   │   ├── ProjectsSection.tsx  # Dynamic filterable project cards
│   │   ├── ProjectDetailModal.tsx # Project modal overview
│   │   ├── TechStackSection.tsx # Skill progress bars & tech categories
│   │   ├── ExperienceSection.tsx# Career timeline track
│   │   ├── ContactSection.tsx   # Contact form with Next.js API integration
│   │   ├── Footer.tsx           # Footer credits & social links
│   │   └── AdminModals.tsx      # Admin PIN login & bio/portfolio manager
│   ├── lib/
│   │   ├── data.ts              # Seed data profil, project, skill, dan pengalaman
│   │   └── portfolio-store.ts   # File-based backend storage
│   │   └── utils.ts             # Tailwind classnames merger (clsx & twMerge)
│   └── types/
│       └── index.ts             # TypeScript interfaces & types definition
├── data/
│   └── portfolio.json           # Konten yang diedit melalui admin panel
├── public/
│   └── robots.txt
├── next.config.ts
├── package.json
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── .env.example
└── .gitignore
```

## 🛠️ Cara Menjalankan Proyek

1. **Ekstrak file ZIP:**
   ```bash
   unzip nextjs-3d-portfolio.zip
   cd nextjs-3d-portfolio
   ```

2. **Install dependensi:**
   ```bash
   npm install
   # atau
   pnpm install
   # atau
   yarn install
   ```

3. **Jalankan server pengembangan (Dev Server):**
   ```bash
   npm run dev
   ```

4. **Buka di browser:**
   Akses [http://localhost:3000](http://localhost:3000)

## ⚡ Fitur Utama
- **Next.js 15 App Router** & React 19
- **Three.js viewport** dengan gaya yang lebih halus dan profesional
- **Server API Route Handler** (`/api/contact`)
- **Backend konten lokal** lewat JSON file untuk edit profil dan project
- **Admin Management System** dengan PIN dari `.env`
- **Fully responsive design** dengan Tailwind CSS
- **TypeScript strict type checking**
