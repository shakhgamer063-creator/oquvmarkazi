# Bilimdon — O'quv markazi sayti

Premium ko'rinishdagi, to'liq responsive React + Vite + Tailwind loyihasi.

## Texnologiyalar

- React 18 + Vite 5
- Tailwind CSS 3
- lucide-react (ikonkalar)

## Loyihani ishga tushirish

```bash
npm install
npm run dev
```

Keyin brauzerda `http://localhost:5173` manzilini oching.

## Production build

```bash
npm run build
npm run preview
```

`npm run build` buyrug'i `dist/` papkasida optimallashtirilgan statik fayllarni yaratadi —
ularni istalgan hosting (Vercel, Netlify, Nginx va h.k.) ga joylashtirish mumkin.

## Loyiha strukturasi

```
src/
  components/       — barcha UI komponentlari (Navbar, Hero, Courses, ...)
  data/             — mock ma'lumotlar (courses.js, teachers.js, ...).
                      Keyinchalik shu joyga API/CMS chaqiruvlarini ulash mumkin.
  hooks/useInView.js — scroll-reveal va animated counter uchun IntersectionObserver hook
  utils/scroll.js    — smooth-scroll yordamchi funksiyasi
  App.jsx            — barcha bo'limlarni birlashtiruvchi asosiy komponent
  main.jsx           — React root
  index.css          — Tailwind + global animatsiya klasslari
```

## Backend/CMS bilan ulash

Hozircha barcha ma'lumotlar `src/data/*.js` fayllarida mock tarzda saqlanadi.
Kelajakda buni API bilan ulash uchun har bir data faylini shunchaki
`fetch`/`axios` chaqiruviga almashtirish kifoya — komponentlar props orqali
ma'lumot oladi, shuning uchun UI qismini o'zgartirish shart emas.

## Animatsiyalar

- Scroll-reveal: `Reveal` komponenti (`src/components/Reveal.jsx`) — yengil,
  faqat CSS transition + IntersectionObserver, qo'shimcha kutubxonasiz.
- Animated counter: `Stats.jsx` ichidagi `Counter` komponenti.
- Hover effektlar: kartalar, tugmalar va havolalarda.
- Mobil menyu: max-height/opacity orqali silliq ochilish-yopilish.
- `prefers-reduced-motion` tanlovi hurmat qilinadi.
