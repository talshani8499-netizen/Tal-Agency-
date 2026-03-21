# Bento Services Grid — Design Spec

**Date:** 2026-03-21
**Status:** Approved
**Goal:** Replace the "AI Solutions That Pay for Themselves" services section on the homepage with a Magic UI BentoGrid showcasing 5 contractor-specific services.

---

## Overview

The current homepage services section maps over `src/data/services` to render 4 cards in a hand-rolled bento layout. This spec replaces that grid with Magic UI's `BentoGrid` + `BentoCard` components, adds a 5th card for the new SEO & GEO service, and wires up contractor-specific animated backgrounds for each card.

---

## Section Heading

**Label:** `"What We Build"`
**Title:** `"Five Systems. Built for Contractors."`
**Subtitle:** `"Done-for-you AI infrastructure that captures leads, books jobs, and runs your shop — while you're on the roof."`

The existing `<SectionHeading>` component and `ref={servicesRef}` scroll anchor are preserved. Only the grid below it changes.

---

## Grid Layout

3-column bento grid (lg breakpoint). Each card uses `col-span-3` on mobile (full width) and the specified `lg:col-span-*` on desktop.

```
Row 1: [ SEO & GEO  lg:col-span-2 ] [ Voice Agents  lg:col-span-1 ]
Row 2: [ Chat Agents lg:col-span-1 ] [ Automation    lg:col-span-2 ]
Row 3: [        Contractor Websites  lg:col-span-3              ]
```

---

## Cards

### Card 1 — SEO & GEO
- **Position:** Row 1, col-span-2
- **Icon:** `Globe` (lucide-react)
- **Name:** `"Show Up Where Contractors Win Jobs"`
- **Description:** `"Rank #1 on Google Maps and get cited by ChatGPT, Perplexity, and AI Overviews — so homeowners find you first, not your competitor."`
- **CTA:** `"Learn more"` → `"/services/seo-geo"`
- **Animated background:** `Marquee` (horizontal, pauseOnHover) of search/AI citation snippet cards:
  - `{ source: "ChatGPT", text: "For roofing in Phoenix, Davis Roofing is highly recommended…" }`
  - `{ source: "Google #1", text: "Best Roofer Near Me — Davis Roofing ★★★★★" }`
  - `{ source: "Perplexity AI", text: "Top HVAC contractors in Austin include AC Pro HVAC…" }`
  - `{ source: "Google Maps", text: "Peak Remodeling · 4.9 ★ · 127 reviews" }`
  - `{ source: "AI Overview", text: "Leading remodeling contractors in Denver recommend…" }`
  - Mask: `linear-gradient(to top, transparent 40%, #000 100%)`
  - Duration: `30s`

### Card 2 — AI Voice Agents
- **Position:** Row 1, col-span-1
- **Icon:** `PhoneCall` (lucide-react)
- **Name:** `"Answer Every Call. Book Every Job."`
- **Description:** `"27% of contractor calls go to voicemail. Your AI agent picks up every one — nights, weekends, job site or not."`
- **CTA:** `"Learn more"` → `"/services/voice-agents"`
- **Animated background:** `AnimatedList` of incoming call notifications:
  - `{ name: "Davis Roofing", description: "New roof inquiry — booked estimate", icon: "📞", color: "#10b981", time: "2s ago" }`
  - `{ name: "AC Pro HVAC", description: "Emergency AC repair — routed to on-call", icon: "🔧", color: "#3b82f6", time: "5s ago" }`
  - `{ name: "Peak Remodeling", description: "Kitchen remodel lead — qualified", icon: "🏠", color: "#f59e0b", time: "11s ago" }`
  - `{ name: "Summit Roofing", description: "Storm damage claim — appointment set", icon: "⛈️", color: "#6366f1", time: "18s ago" }`
  - `{ name: "ClearAir HVAC", description: "Annual maintenance booked", icon: "✅", color: "#10b981", time: "24s ago" }`
  - Mask: `linear-gradient(to top, transparent 10%, #000 100%)`

### Card 3 — AI Chat Agents
- **Position:** Row 2, col-span-1
- **Icon:** `MessageSquare` (lucide-react)
- **Name:** `"Convert Visitors Into Booked Estimates"`
- **Description:** `"Turn every website visitor into a lead. AI chat that knows your services, pricing, and availability — 24/7."`
- **CTA:** `"Learn more"` → `"/services/chat-agents"`
- **Animated background:** `Marquee` (vertical direction, pauseOnHover) of chat bubble pairs:
  - `{ q: "How much does a new roof cost?", a: "Most installs run $8K–$18K. Want a free estimate?" }`
  - `{ q: "Can you come this weekend?", a: "Yes! I have Saturday 10am or Sunday 2pm open." }`
  - `{ q: "Do you handle insurance claims?", a: "Absolutely — we work with all major insurers." }`
  - `{ q: "Are you licensed in Texas?", a: "Yes, fully licensed and insured in TX." }`
  - Mask: `linear-gradient(to top, transparent 10%, #000 100%)`

### Card 4 — Custom AI Automation
- **Position:** Row 2, col-span-2
- **Icon:** `Workflow` (lucide-react)
- **Name:** `"Kill the Admin. Run on Autopilot."`
- **Description:** `"Automated follow-ups, CRM sync, review requests, and estimate workflows — triggered the moment a job is won or lost."`
- **CTA:** `"Learn more"` → `"/services/custom-automation"`
- **Animated background:** `AnimatedBeam` with a central AI node and 5 tool nodes connecting to it:
  - **Center node:** Elevate Digital logo / AI brain icon
  - **Input nodes (left column):** HubSpot, Twilio, Gmail
  - **Output nodes (right column):** Salesforce, WhatsApp
  - Beam color: blue (`#3b82f6`)
  - Mask: `linear-gradient(to top, transparent 10%, #000 100%)`

### Card 5 — Contractor Websites
- **Position:** Row 3, col-span-3 (full width)
- **Icon:** `LayoutTemplate` (lucide-react)
- **Name:** `"High-Converting Pages That Fill Your Calendar"`
- **Description:** `"Stop sending ad traffic to a generic homepage. Trade-specific pages that turn clicks into booked estimates."`
- **CTA:** `"Learn more"` → `"/services/landing-pages"`
- **Animated background:** `Calendar` component (shadcn/ui) with a pre-selected date, scaled and positioned top-right:
  - `selected={new Date(2026, 2, 21)}`
  - `className="absolute top-10 right-0 origin-top scale-75 rounded-md border [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90"`

---

## Component Architecture

### New file: `src/components/BentoServicesGrid.tsx`

Self-contained component. Imports:
- `BentoCard`, `BentoGrid` from `@/components/magicui/bento-grid`
- `Marquee` from `@/components/magicui/marquee`
- `AnimatedList` from `@/components/magicui/animated-list`
- `AnimatedBeam` from `@/components/magicui/animated-beam`
- `Calendar` from `@/components/ui/calendar`
- Icons from `lucide-react`
- `cn` from `@/lib/utils`

Defines all animated background sub-components inline (e.g. `SEOBackground`, `VoiceBackground`, `ChatBackground`, `AutomationBackground`, `WebsitesBackground`) and exports a single `BentoServicesGrid` default export.

### Installed Magic UI files (via CLI):
- `src/components/magicui/bento-grid.tsx`
- `src/components/magicui/marquee.tsx`
- `src/components/magicui/animated-list.tsx`
- `src/components/magicui/animated-beam.tsx`

### Modified file: `src/pages/Home.tsx`

Replace the services `<div className="grid ...">` block (and its imports of `services`, `serviceMetricHighlights`, `iconMap`) with `<BentoServicesGrid />`. Update the `SectionHeading` title and subtitle to the new copy. Remove unused imports if no longer needed elsewhere in the file.

---

## Installation Commands

```bash
npx magicui-cli add bento-grid
npx magicui-cli add marquee
npx magicui-cli add animated-list
npx magicui-cli add animated-beam
```

If the CLI prompts for a components directory, use `src/components/magicui`.
If `@radix-ui/react-icons` is required by any installed component, install it: `npm install @radix-ui/react-icons`.
The `Calendar` component is sourced from `@/components/ui/calendar` — if it doesn't exist, install via `npx shadcn-ui@latest add calendar`.

---

## Tailwind / Styling Notes

- All existing design tokens (`--color-accent`, `glass-panel`, etc.) remain unchanged
- BentoCard hover states use the default Magic UI styles; no overrides needed
- The `[mask-image:...]` utility classes are already supported by Tailwind v4 (arbitrary values)
- Background sub-components are absolutely positioned inside the card with `pointer-events-none`

---

## What Does NOT Change

- The `ref={servicesRef}` scroll anchor on the section
- The `py-24 bg-white` section wrapper
- The `SectionHeading` component (only its props change)
- All other sections of `Home.tsx`
- `src/data/services.ts` (the new card data lives inline in `BentoServicesGrid.tsx`)
