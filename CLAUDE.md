# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server (uses Turbopack)
npm run build    # Production build
npm run lint     # ESLint check
```

No test framework is configured.

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## Architecture

Single-page marketing/pre-registration site for the Greeny app (식물 친구 AI앱).

**Page structure** (`src/app/page.tsx`): Sections are stacked in order — Hero → ScrollShowcase → ChatDemo → Garden → PlantGuide → Features → Pain → HowItWorks → CTA → Footer — with `FloatingCTA` fixed overlay.

**Waitlist flow**: Two entry points both call the `addToWaitlist` Server Action (`src/app/actions/waitlist.ts`), which writes to Supabase table `waitlist_greeny`. Fields: `contact`, `contact_type` (email|phone), `ip_address`, `user_agent`, `marketing_agreed`. Error code `23505` = duplicate contact.

- `WaitlistForm` (hero inline form) — email only
- `DownloadModal` — email or phone, with optional marketing consent checkbox

**DownloadModal pattern**: The modal is mounted once in `layout.tsx`. Any component triggers it by calling `openDownloadModal()` from `src/components/DownloadModal.tsx`, which dispatches a `CustomEvent("open-download-modal")` on `window`. Don't try to lift state — use this event pattern.

**Analytics** (`src/lib/ga.ts`): `trackDownloadClick(source)` and `trackWaitlistSignup(source, method)` wrap `window.gtag`. GA4 ID: `G-QLNTJX18MD`. Call these client-side only.

**FloatingCTA** visibility: Uses `IntersectionObserver` on `#hero` — button appears when hero scrolls out of view.

## Stack Notes

- **Next.js 16** (App Router) with **React 19** — APIs may differ from older versions; check `node_modules/next/dist/docs/` before writing unfamiliar code
- **Tailwind CSS v4** — configuration is in CSS (`globals.css`), not `tailwind.config.js`; syntax and utilities differ from v3
- **Framer Motion v12** — used for all animations; `AnimatePresence` wraps conditional renders
- Brand colors: primary `#52B788`, dark `#1A3C34`, muted `#5a7a6e`, light green `#F0FFF4`
