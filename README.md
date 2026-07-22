# AI Developer Portfolio

Ultra-modern, interactive developer portfolio built with **Next.js (App Router)**, **Tailwind CSS v4**, **Framer Motion**, **Lenis**, and **Spline 3D** — plus an embedded portfolio AI assistant.

## Folder structure

```
ai-developer-portfolio/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ai/
│   │   ├── ChatWidget.tsx
│   │   └── FloatingAssistant.tsx
│   ├── layout/
│   │   └── Navbar.tsx
│   ├── providers/
│   │   └── SmoothScroll.tsx
│   ├── sections/
│   │   ├── AIPlayground.tsx
│   │   ├── BentoGrid.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   └── Timeline.tsx
│   ├── three/
│   │   └── SplineScene.tsx
│   └── ui/
│       ├── GlassCard.tsx
│       ├── MagneticLink.tsx
│       ├── SectionHeading.tsx
│       └── ShimmerLoader.tsx
├── lib/
│   ├── ai-knowledge.ts
│   ├── portfolio-data.ts
│   └── utils.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Setup

```bash
cd ai-developer-portfolio

# Core framework (already scaffolded) + portfolio deps
npm install framer-motion lenis @splinetool/react-spline @splinetool/runtime lucide-react clsx tailwind-merge

# Note: @studio-freight/lenis was renamed to `lenis` — use the maintained package.

npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize

1. **Identity & content** — edit `lib/portfolio-data.ts` (name, projects, timeline, socials).
2. **AI answers** — edit `lib/ai-knowledge.ts`.
3. **Spline scenes** — replace `splineScenes.hero` / `splineScenes.tech` with your own exports from [spline.design](https://spline.design).
4. **Colors / type** — `app/globals.css` and fonts in `app/layout.tsx` (Syne + Outfit + JetBrains Mono).

## Sections

| Section | Description |
|--------|-------------|
| Hero | Kinetic gradient type + full-bleed Spline + CTAs |
| Bento Grid | Flagship preview, embedded chat, 3D wheel, skill matrix |
| AI Playground | Vision / terminal / model simulation |
| Timeline | Framer Motion scroll-triggered glass nodes |
| Footer | Magnetic socials, local clock, copy-email |

## Scripts

```bash
npm run dev      # development
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint
```
