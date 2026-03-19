# Client Cases Page Redesign — Design Spec
**Date:** 2026-03-19
**Project:** Elevate Digital Website
**File:** `src/pages/CaseStudies.tsx`

---

## Summary

Redesign the Client Cases page from the current tabbed split-panel layout into an editorial, magazine-style stacked card layout. Each card presents a client story with a bold headline, raw metric stats, and a single expand button that reveals the full Problem / Solution / Result narrative plus a client testimonial.

---

## Layout

### Page Structure
- Page heading: "Results We've Delivered" (serif, large)
- Eyebrow: "Client Work" (small caps)
- Subline: "Real projects. Real outcomes. Click any card to read the full story."
- Cards stack vertically in a single column, `max-width: 1040px`, centered

### Card Structure (per case study)
Each card has two sections:

1. **Card Header** (always visible) — CSS grid: `1fr 320px`, gap 40px, `align-items: center`
2. **Story Panel** (hidden by default — all cards start collapsed)

---

## Card Header — Left Side (Editorial Content)

| Element | Details |
|---------|---------|
| Result tag | Lime-green pill — `background: #CBFF4D`, `color: #1A2800`. Displays the primary key metric (e.g. "3× More Qualified Leads"). Same style on every card. |
| Headline | 30px, font-weight 800, Georgia serif. Full story headline, e.g. "How Horizon Design&Build Went From Zero Digital Presence to $280K/Month in 21 Days". |
| Teaser | 14px, `color: #64748B`. 2–3 sentence hook summarising the challenge and what was done. |
| Services line | `Built:` eyebrow label (11px, uppercase, `#94A3B8`) + service names separated by `·` dots. Plain text, no pill components. |
| Divider | 1px `#E2E8F0` horizontal rule |
| Stats row | 3–4 statistics. Each stat: large bold number (26px, 900 weight, `#0A0F1E`) + optionally a green `↑` arrow (16px, `#22C55E`, shown only when `stat.up === true`) + small label below (12px, `#94A3B8`). If `up` is absent or `false`, no arrow is shown. |
| CTA row | Left: expand button. Right: "Start a similar project →" link (`color: #2563EB`) — always links to `/contact`. |

### Expand Button (collapsed state)
- Label: `Read the full story`
- Prepended icon: dark circle (32×32px, `background: #0A0F1E`, `border-radius: 50%`) containing `+` (white, 15px)
- On hover: gap between icon and text increases from 8px to 12px (CSS `transition: gap 0.2s`)
- `background: none`, no border — purely typographic

### Expand Button (expanded state)
- Icon rotates 45° (`transform: rotate(45deg)`, `transition: transform 0.3s`) — `+` becomes `×`
- Icon background changes to `#2563EB`
- Label stays "Read the full story" (no label change)

---

## Card Header — Right Side (Floating Image Card)

- **Width:** 320px fixed, `aspect-ratio: 4/3`
- **Shape:** `border-radius: 20px`
- **Shadow:** `box-shadow: 0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)`
- **Background:** `cardGradient` field — a full CSS `linear-gradient(...)` string, e.g. `"linear-gradient(145deg, #1B2E3C 0%, #0D1B24 100%)"`
- **Content (centered):**
  1. If `imageUrl` is set: `<img src={imageUrl} />` sized to fit (max 160px wide, object-fit contain)
  2. If `imageUrl` is absent: show client initials as large white monogram text (first letter of each word, max 2 chars, 56px, bold, opacity 0.6)
  3. Below image/monogram: client name in uppercase, letter-spacing 0.12em, 16px, white
  4. Below that: subtitle line using `cardAccentColor` for text, 11px — e.g. `"DESIGN&BUILD LLC"` in copper `#A0622A`. If no subtitle is needed, omit.
  5. Below that: `industry · timeline`, 11px, `rgba(255,255,255,0.4)`

**`cardAccentColor`** is used exclusively for the subtitle text in the image card (item 4 above). It is a hex string, e.g. `"#A0622A"`.

---

## Story Panel (Expanded State)

**Trigger:** Clicking the expand button. Only one card can be open at a time — opening a new card collapses the previously open one.

**Animation:** CSS `max-height` transition from `0` to `600px`, duration `0.55s`, easing `cubic-bezier(0.4,0,0.2,1)`. Combined `opacity` transition from `0` to `1`, duration `0.3s`.

**Layout:** 3-column CSS grid (equal columns) + full-width testimonial row below.

### Column 1 — The Problem
- Eyebrow: "THE PROBLEM" (10px, 700 weight, uppercase, letter-spacing 0.12em, `color: #EF4444`)
- Body: `story.problem` text (13px, `#475569`, line-height 1.7)

### Column 2 — What We Built
- Eyebrow: "WHAT WE BUILT" (`color: #2563EB`)
- Body: `story.solution` text

### Column 3 — The Outcome
- Eyebrow: "THE OUTCOME" (`color: #16A34A`)
- Intro line: `story.outcome` (1–2 sentences)
- Below: stacked `story.outcomeStats` — each row: value (20px, 800 weight, `#16A34A`) + label (12px, `#64748B`). No arrows in this column.

**`story.outcomeStats`** has shape `Array<{ value: string; label: string }>` — same as header `stats[]` but without the `up` field. These are separate arrays: header stats are the 3–4 top-line numbers shown on the collapsed card; outcome stats are the fuller result list shown in the expanded panel.

### Testimonial Strip
- Spans all 3 columns (`grid-column: 1 / -1`)
- Background: `#FAFBFC`
- Top border: 1px `#E2E8F0`
- Layout: large `"` quote mark (56px Georgia, `#E2E8F0`) + quote block
- Quote block: `testimonial.quote` in italic 15px + `testimonial.author` in 12px muted below
- **Uses existing `testimonial` field** already present on all CaseStudy objects — no new data needed.

---

## Data Model

Update `src/data/caseStudies.ts`. The existing `CaseStudy` type gains new fields; old fields that are fully replaced are removed.

### Fields removed
- `bundle` → replaced by `services`
- `metrics` → replaced by `stats` (header) and `story.outcomeStats` (expanded)
- `challengeSummary` → replaced by `story.problem`
- `solutionSummary` → replaced by `story.solution`
- `fullStory` → replaced by `story.problem` + `story.solution` + `story.outcome`
- `keyMetric` → replaced by `resultTag`
- `takeaways` → removed (not shown in new design)

### Fields added
```typescript
interface CaseStudy {
  // --- existing, kept ---
  id: string
  slug: string
  client: string
  industry: string
  timeline: string
  accentFrom: string
  accentTo: string
  testimonial: { quote: string; author: string }

  // --- new ---
  resultTag: string           // e.g. "3× More Qualified Leads"
  headline: string            // editorial story headline
  teaser: string              // 2–3 sentence hook
  services: string[]          // e.g. ["Custom Landing Page", "CRM Integration"]
  imageUrl?: string           // optional real photo/logo
  cardGradient: string        // full CSS gradient string
  cardAccentColor?: string    // optional hex for subtitle text in image card
  cardSubtitle?: string       // optional subtitle text line in image card (e.g. "DESIGN&BUILD LLC")
  stats: Array<{
    value: string             // e.g. "3×", "$280K", "<90s"
    label: string             // e.g. "Qualified leads"
    up?: boolean              // if true, show green ↑ arrow
  }>
  story: {
    problem: string
    solution: string
    outcome: string           // 1–2 sentence intro for the outcome column
    outcomeStats: Array<{
      value: string
      label: string
    }>
  }
}
```

---

## Component Architecture

### Files to modify
| File | Change |
|------|--------|
| `src/pages/CaseStudies.tsx` | Full rewrite — renders page header + maps `caseStudies` to `<CaseStudyCard>` |
| `src/data/caseStudies.ts` | Update type and all 4 case study objects to new shape |

### Files to create
| File | Purpose |
|------|---------|
| `src/components/CaseStudyCard.tsx` | Self-contained card component with open/close state |

### Component tree
```
CaseStudies (page)
  └── CaseStudyCard (×4)  — props: CaseStudy, isOpen, onToggle
        ├── LeftPanel      — result tag, headline, teaser, services, stats, CTA buttons
        ├── ImageCard      — gradient bg, logo/photo or monogram, name, subtitle, timeline
        └── StoryPanel     — animated expand/collapse wrapper
              ├── StoryColumn × 3
              └── TestimonialStrip
```

`CaseStudies` owns the `openId: string | null` state and passes `isOpen` + `onToggle` down to each card — only one open at a time.

---

## Styling Notes

- **Framework:** Tailwind CSS v4 (existing)
- **Animation:** CSS transitions only (`max-height`, `opacity`, `transform`, `gap`). No Motion library needed for this component.
- **Card background:** `#F8F9FB` (off-white)
- **Page background:** existing `--color-bg-base` (`#F8FAFC`)
- **Serif font:** Georgia (system font, no import)
- **Result tag:** `#CBFF4D` / `#1A2800` — same across all cards
- **Expand transition:** `max-height` 0.55s `cubic-bezier(0.4,0,0.2,1)` + `opacity` 0.3s

---

## Out of Scope
- Mobile/responsive layout (future iteration)
- Filtering or search on the cases page
- Adding new case studies beyond the existing 4
- Individual case study detail pages (existing `/case-studies/:slug` routes unchanged)
- Animation library usage (CSS transitions are sufficient)
