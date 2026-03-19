# Client Cases Page Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the tabbed split-panel CaseStudies page with an editorial stacked-card layout where each card has a lime result tag, serif headline, raw stats, a floating dark image card, and a single expand button that reveals Problem / Solution / Result + testimonial.

**Architecture:** Three-file change — update the data shape in `caseStudies.ts`, extract a self-contained `CaseStudyCard.tsx` component, and rewrite `CaseStudies.tsx` as a thin page wrapper that owns the single `openId` state. No new dependencies required; CSS transitions replace Motion for the expand animation.

**Tech Stack:** React 19, TypeScript 5.8, Tailwind CSS v4, Vite 6. No test framework installed — TypeScript type checking (`npm run lint`) serves as automated verification; visual verification via `npm run dev`.

**Spec:** `docs/superpowers/specs/2026-03-19-client-cases-redesign.md`

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `src/data/caseStudies.ts` | CaseStudy type definition + all 4 data objects |
| Create | `src/components/CaseStudyCard.tsx` | Full card UI: header (left panel + image card) + expandable story panel |
| Modify | `src/pages/CaseStudies.tsx` | Page shell: heading, openId state, maps data → CaseStudyCard |

---

## Task 1: Update Data Model

**Files:**
- Modify: `src/data/caseStudies.ts`

### Context
The existing data file has no TypeScript `interface` — it's an untyped array. We need to:
1. Add a typed `CaseStudy` interface with the new fields
2. Update all 4 objects to match (rename "Apex Construction" → "Horizon Design&Build", update all field names)
3. Remove old fields: `bundle`, `metrics`, `challengeSummary`, `solutionSummary`, `fullStory`, `keyMetric`, `image`, `takeaways`

- [ ] **Step 1.1: Replace the entire contents of `src/data/caseStudies.ts`** with the following:

```typescript
export interface CaseStat {
  value: string
  label: string
  up?: boolean
}

export interface CaseStudy {
  id: string
  slug: string
  client: string
  industry: string
  timeline: string
  accentFrom: string
  accentTo: string
  testimonial: { quote: string; author: string }
  resultTag: string
  headline: string
  teaser: string
  services: string[]
  imageUrl?: string
  cardGradient: string
  cardAccentColor?: string
  cardSubtitle?: string
  stats: CaseStat[]
  story: {
    problem: string
    solution: string
    outcome: string
    outcomeStats: Array<{ value: string; label: string }>
  }
}

export const caseStudies: CaseStudy[] = [
  {
    id: "horizon-design-build",
    slug: "horizon-design-build-full-stack",
    client: "Horizon Design&Build",
    industry: "Construction",
    timeline: "Live in 21 days",
    accentFrom: "#1B2E3C",
    accentTo: "#0D1B24",
    cardGradient: "linear-gradient(145deg, #1B2E3C 0%, #0D1B24 100%)",
    cardAccentColor: "#A0622A",
    cardSubtitle: "DESIGN&BUILD LLC",
    resultTag: "3× More Qualified Leads",
    headline: "How Horizon Design&Build Went From Zero Digital Presence to $280K/Month in 21 Days",
    teaser: "They had no website, no lead capture, no follow-up system. Every inquiry was a missed call or a lost email. We rebuilt the entire pipeline from scratch and automated it.",
    services: ["Custom Landing Page", "CRM Integration", "Lead Capture", "AI Voice Agent"],
    stats: [
      { value: "3×", label: "Qualified leads", up: true },
      { value: "$280K", label: "Pipeline / month", up: true },
      { value: "41%", label: "Close rate", up: true },
      { value: "<90s", label: "AI response time" },
    ],
    story: {
      problem:
        "Zero digital presence. Relying 100% on word-of-mouth with no way to capture, respond to, or follow up on inbound project inquiries — often taking days to call leads back.",
      solution:
        "Built a high-converting landing page with integrated lead capture forms, connected to a CRM that auto-assigns leads. Layered on an AI voice agent that calls back within 90 seconds, qualifies the lead, and books consultations directly into the owner's calendar.",
      outcome: "Within the first month of going live:",
      outcomeStats: [
        { value: "3×", label: "more qualified consultations booked" },
        { value: "$280K", label: "added to monthly pipeline" },
        { value: "41%", label: "higher close rate on consultations" },
      ],
    },
    testimonial: {
      quote:
        "I went from chasing leads to choosing projects. The system does the qualifying — I just show up to the meetings.",
      author: "Dan K., Owner",
    },
  },
  {
    id: "meridian-realty",
    slug: "meridian-realty-voice-agent",
    client: "Meridian Realty Group",
    industry: "Real Estate",
    timeline: "Live in 14 days",
    accentFrom: "#1d4ed8",
    accentTo: "#0f2460",
    cardGradient: "linear-gradient(145deg, #1d4ed8 0%, #0f2460 100%)",
    resultTag: "62% of Calls Automated",
    headline: "How Meridian Realty Stopped Missing Buyers and Reclaimed 18 Hours a Week",
    teaser:
      "Agents were missing warm buyers during showings. Every missed call was a lost commission. We deployed an AI that answers, qualifies, and logs every call — so agents only touch ready-to-act leads.",
    services: ["AI Voice Agent", "Lead Qualification", "CRM Integration"],
    stats: [
      { value: "62%", label: "Calls automated", up: true },
      { value: "18h", label: "Saved per week", up: true },
      { value: "100%", label: "Leads pre-qualified" },
    ],
    story: {
      problem:
        "Agents were drowning in inbound calls during showings, causing warm buyers to hit voicemail and move on to competing agencies.",
      solution:
        "An AI voice agent that answers every call, runs a qualification script, and pushes structured lead data directly into their CRM — automatically assigned to the right agent by area.",
      outcome: "After the first 30 days:",
      outcomeStats: [
        { value: "62%", label: "of calls fully handled by AI" },
        { value: "18h", label: "reclaimed per agent per week" },
        { value: "100%", label: "of passed leads pre-qualified" },
      ],
    },
    testimonial: {
      quote:
        "My agents used to dread Mondays. Now they come in with a calendar full of pre-qualified showings.",
      author: "Lisa M., Broker/Owner",
    },
  },
  {
    id: "clearview-dental",
    slug: "clearview-dental-full-system",
    client: "ClearView Dental",
    industry: "Healthcare",
    timeline: "Live in 18 days",
    accentFrom: "#059669",
    accentTo: "#064e3b",
    cardGradient: "linear-gradient(145deg, #059669 0%, #064e3b 100%)",
    resultTag: "↓58% No-Show Rate",
    headline: "How ClearView Dental Slashed No-Shows by 58% and Freed Their Front Desk",
    teaser:
      "Manual reminder calls were eating 2.5 hours of front desk time every day — and patients were still not showing up. We automated the entire appointment cycle end-to-end.",
    services: ["Website Redesign", "Inbound AI Agent", "Outbound AI Agent", "Appointment Automation"],
    stats: [
      { value: "↓58%", label: "No-show rate" },
      { value: "73%", label: "AI-booked appointments", up: true },
      { value: "2.5h", label: "Front desk saved / day", up: true },
    ],
    story: {
      problem:
        "Front desk staff spending hours daily on manual reminder calls. No-show rate was 24%, costing the practice significant revenue every week.",
      solution:
        "Deployed inbound + outbound AI voice agents with automated reminder sequences. Patients who don't confirm get a rebooking flow — automatically — without any staff involvement.",
      outcome: "First 30 days after launch:",
      outcomeStats: [
        { value: "↓58%", label: "reduction in no-shows" },
        { value: "73%", label: "of appointments now AI-booked" },
        { value: "2.5h", label: "front desk time saved daily" },
      ],
    },
    testimonial: {
      quote:
        "Our front desk went from reactive to proactive. They're focused on patients in the chair — not patients on the phone.",
      author: "Dr. Rachel S., Practice Owner",
    },
  },
  {
    id: "procomfort-hvac",
    slug: "procomfort-hvac-peak-season",
    client: "ProComfort HVAC",
    industry: "Home Services",
    timeline: "Live in 11 days",
    accentFrom: "#7c3aed",
    accentTo: "#3b0764",
    cardGradient: "linear-gradient(145deg, #7c3aed 0%, #3b0764 100%)",
    resultTag: "+$180K First Summer",
    headline: "How ProComfort HVAC Captured Every Peak-Season Call and Added $180K in Revenue",
    teaser:
      "One dispatcher, hundreds of peak-season calls, zero backup. Customers were hanging up and calling the next company in Google. We deployed AI triage that handles 78% of calls without a human.",
    services: ["AI Voice Agent", "Emergency Triage", "Dispatch Integration"],
    stats: [
      { value: "78%", label: "Calls auto-handled", up: true },
      { value: "<60s", label: "Emergency response" },
      { value: "+$180K", label: "Added revenue", up: true },
    ],
    story: {
      problem:
        "Peak summer heat meant the phone never stopped. One dispatcher couldn't keep up — calls went to voicemail, customers left, revenue walked out the door to competitors.",
      solution:
        "AI voice triage that categorises calls (emergency vs. scheduled), handles routine bookings automatically, and escalates true emergencies to a live dispatcher in under 60 seconds. Integrated directly with their dispatch board.",
      outcome: "Results from the first full summer:",
      outcomeStats: [
        { value: "78%", label: "of calls handled without a dispatcher" },
        { value: "<60s", label: "emergency response time" },
        { value: "+$180K", label: "added revenue that first summer" },
      ],
    },
    testimonial: {
      quote:
        "We stopped losing jobs just because our phone line was busy. The agent handles the volume that used to break us every summer.",
      author: "Carlos V., Operations Manager",
    },
  },
]
```

- [ ] **Step 1.2: Do NOT commit yet — proceed to Task 2**

`npm run lint` will produce errors at this point because `CaseStudies.tsx` still references removed fields (`bundle`, `keyMetric`, etc.). Committing here would fail if a pre-commit hook runs `tsc --noEmit`. All three files (data, component, page) must compile cleanly together before any commit. Continue to Task 2.

---

## Task 2: Create CaseStudyCard Component

**Files:**
- Create: `src/components/CaseStudyCard.tsx`

### Context
This is the core UI component. It receives a `CaseStudy` object plus `isOpen: boolean` and `onToggle: () => void` from the parent. It renders two things:
1. The always-visible card header (left editorial panel + right floating image card)
2. The expandable story panel (3 columns + testimonial strip)

All expand/collapse animation is done via CSS transitions on `max-height` and `opacity` — no Motion library.

The `imageUrl` field is optional. If absent, derive the monogram from `client`: take the first letter of each word, max 2 characters (e.g. "Horizon Design&Build" → "HD").

- [ ] **Step 2.1: Create `src/components/CaseStudyCard.tsx`** with the following:

```tsx
import { Link } from "react-router-dom"
import type { CaseStudy } from "@/data/caseStudies"

interface Props {
  study: CaseStudy
  isOpen: boolean
  onToggle: () => void
}

/** Derives up-to-2-character monogram from client name */
function getMonogram(client: string): string {
  return client
    .split(/[\s&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("")
}

export function CaseStudyCard({ study, isOpen, onToggle }: Props) {
  const monogram = getMonogram(study.client)

  return (
    <article
      className="rounded-3xl overflow-hidden shadow-sm transition-shadow duration-300 hover:shadow-xl"
      style={{ background: "#F8F9FB" }}
    >
      {/* ── CARD HEADER ── */}
      <div
        className="grid items-center gap-10 p-10"
        style={{ gridTemplateColumns: "1fr 320px" }}
      >
        {/* LEFT: Editorial content */}
        <div className="flex flex-col">
          {/* Result tag */}
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold w-fit mb-4"
            style={{ background: "#CBFF4D", color: "#1A2800" }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: "#5A9000" }}
            />
            {study.resultTag}
          </span>

          {/* Headline */}
          <h2
            className="font-bold leading-snug tracking-tight mb-3"
            style={{
              fontSize: "30px",
              fontFamily: "Georgia, 'Times New Roman', serif",
              color: "#0A0F1E",
            }}
          >
            {study.headline}
          </h2>

          {/* Teaser */}
          <p className="text-sm leading-relaxed mb-4" style={{ color: "#64748B" }}>
            {study.teaser}
          </p>

          {/* Services line */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span
              className="text-[11px] font-semibold uppercase tracking-widest flex-shrink-0"
              style={{ color: "#94A3B8" }}
            >
              Built:
            </span>
            {study.services.map((svc, i) => (
              <span key={svc} className="text-sm font-semibold" style={{ color: "#334155" }}>
                {svc}
                {i < study.services.length - 1 && (
                  <span className="ml-2" style={{ color: "#CBD5E1" }}>·</span>
                )}
              </span>
            ))}
          </div>

          {/* Divider */}
          <hr className="mb-5" style={{ borderColor: "#E2E8F0" }} />

          {/* Stats row */}
          <div className="flex gap-9 flex-wrap mb-7">
            {study.stats.map((stat) => (
              <div key={stat.label}>
                <div className="flex items-baseline gap-1">
                  <span
                    className="font-black leading-none"
                    style={{ fontSize: "26px", color: "#0A0F1E" }}
                  >
                    {stat.value}
                  </span>
                  {stat.up && (
                    <span className="font-bold" style={{ fontSize: "16px", color: "#22C55E" }}>
                      ↑
                    </span>
                  )}
                </div>
                <div
                  className="text-xs font-medium mt-1"
                  style={{ color: "#94A3B8" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA row */}
          <div className="flex items-center justify-between">
            <button
              onClick={onToggle}
              className="flex items-center cursor-pointer border-none bg-transparent p-0"
              style={{ gap: isOpen ? "12px" : "8px", transition: "gap 0.2s" }}
            >
              <span
                className="flex items-center justify-center w-8 h-8 rounded-full text-white text-sm flex-shrink-0"
                style={{
                  background: isOpen ? "#2563EB" : "#0A0F1E",
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  transition: "transform 0.3s, background 0.2s",
                  fontSize: "15px",
                }}
              >
                +
              </span>
              <span className="text-sm font-bold" style={{ color: "#0A0F1E" }}>
                Read the full story
              </span>
            </button>

            <Link
              to="/contact"
              className="text-sm font-semibold hover:underline"
              style={{ color: "#2563EB" }}
            >
              Start a similar project →
            </Link>
          </div>
        </div>

        {/* RIGHT: Floating image card */}
        <div
          className="relative overflow-hidden flex-shrink-0"
          style={{
            width: "320px",
            aspectRatio: "4/3",
            borderRadius: "20px",
            background: study.cardGradient,
            boxShadow: "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)",
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            {study.imageUrl ? (
              <img
                src={study.imageUrl}
                alt={study.client}
                style={{ maxWidth: "160px", objectFit: "contain", marginBottom: "12px" }}
              />
            ) : (
              <div
                className="font-bold mb-3"
                style={{ fontSize: "56px", color: "white", opacity: 0.6 }}
              >
                {monogram}
              </div>
            )}
            <div
              className="uppercase font-extrabold tracking-widest"
              style={{ fontSize: "16px", color: "rgba(255,255,255,0.92)", letterSpacing: "0.12em" }}
            >
              {study.client}
            </div>
            {study.cardSubtitle && (
              <div
                className="font-semibold tracking-widest mt-0.5"
                style={{
                  fontSize: "11px",
                  color: study.cardAccentColor ?? "rgba(255,255,255,0.6)",
                  letterSpacing: "0.08em",
                }}
              >
                {study.cardSubtitle}
              </div>
            )}
            <div
              className="mt-2 font-medium"
              style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}
            >
              {study.industry} · {study.timeline}
            </div>
          </div>
        </div>
      </div>

      {/* ── STORY PANEL ── */}
      {/*
        max-height note: 600px is the animation ceiling — the panel's actual rendered
        height is ~350-420px for the current data. Using a value much larger than the
        content height (e.g. 9999px) breaks the collapse animation (appears instant).
        600px is the right ceiling: large enough to never clip, small enough that the
        transition timing feels natural. If content ever exceeds 600px, increase this value.
      */}
      <div
        style={{
          maxHeight: isOpen ? "600px" : "0",
          opacity: isOpen ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.3s",
        }}
      >
        <div
          className="grid gap-8 px-10 pt-8"
          style={{
            gridTemplateColumns: "1fr 1fr 1fr",
            borderTop: "1px solid #E2E8F0",
          }}
        >
          {/* Problem */}
          <div>
            <div
              className="text-[10px] font-bold uppercase tracking-widest mb-2.5"
              style={{ color: "#EF4444" }}
            >
              The Problem
            </div>
            <p className="text-[13px] leading-relaxed" style={{ color: "#475569", lineHeight: 1.7 }}>
              {study.story.problem}
            </p>
          </div>

          {/* Solution */}
          <div>
            <div
              className="text-[10px] font-bold uppercase tracking-widest mb-2.5"
              style={{ color: "#2563EB" }}
            >
              What We Built
            </div>
            <p className="text-[13px] leading-relaxed" style={{ color: "#475569", lineHeight: 1.7 }}>
              {study.story.solution}
            </p>
          </div>

          {/* Outcome */}
          <div>
            <div
              className="text-[10px] font-bold uppercase tracking-widest mb-2.5"
              style={{ color: "#16A34A" }}
            >
              The Outcome
            </div>
            <p className="text-[13px] mb-3" style={{ color: "#475569" }}>
              {study.story.outcome}
            </p>
            <div className="flex flex-col gap-2.5">
              {study.story.outcomeStats.map((s) => (
                <div key={s.label} className="flex items-baseline gap-1.5">
                  <span className="font-extrabold" style={{ fontSize: "20px", color: "#16A34A" }}>
                    {s.value}
                  </span>
                  <span className="text-xs" style={{ color: "#64748B" }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial strip */}
        <div
          className="flex items-start gap-4 px-10 py-6 mt-6"
          style={{
            background: "#FAFBFC",
            borderTop: "1px solid #E2E8F0",
          }}
        >
          <div
            className="flex-shrink-0"
            style={{
              fontSize: "56px",
              lineHeight: 1,
              color: "#E2E8F0",
              fontFamily: "Georgia, serif",
              marginTop: "-12px",
            }}
          >
            "
          </div>
          <div>
            <p className="italic leading-relaxed" style={{ fontSize: "15px", color: "#334155" }}>
              {study.testimonial.quote}
            </p>
            <p className="text-xs font-semibold mt-2" style={{ color: "#94A3B8" }}>
              — {study.testimonial.author}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
```

- [ ] **Step 2.2: Do NOT commit yet — proceed to Task 3**

`CaseStudies.tsx` still has type errors from the old field names. Commit only after Task 3 when the full project compiles cleanly.

---

## Task 3: Rewrite CaseStudies Page

**Files:**
- Modify: `src/pages/CaseStudies.tsx`

### Context
The page becomes a thin shell: page header + state (which card is open) + a list of `CaseStudyCard` components. The `openId` state ensures only one card is open at a time — passing `null` means all are collapsed.

Remove all tab-related state and imports (`useState` can stay for `openId`, but the `Tab` type and `activeTabs` state are gone). Remove the `motion` import (the page-level entrance animation on the hero can stay if desired, but it's optional).

- [ ] **Step 3.1: Replace `src/pages/CaseStudies.tsx`** with the following:

```tsx
import { useState } from "react"
import { CTABanner } from "@/components/ui/CTABanner"
import { caseStudies } from "@/data/caseStudies"
import { CaseStudyCard } from "@/components/CaseStudyCard"

export default function CaseStudies() {
  const [openId, setOpenId] = useState<string | null>(null)

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page header */}
      <section className="pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
            Client Work
          </p>
          <h1
            className="text-5xl font-extrabold leading-tight tracking-tight mb-3"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#0A0F1E" }}
          >
            Results We've Delivered
          </h1>
          <p className="text-base text-slate-500">
            Real projects. Real outcomes. Click any card to read the full story.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="pb-24">
        <div
          className="mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-5"
          style={{ maxWidth: "1040px" }}
        >
          {caseStudies.map((study) => (
            <CaseStudyCard
              key={study.id}
              study={study}
              isOpen={openId === study.id}
              onToggle={() => handleToggle(study.id)}
            />
          ))}
        </div>
      </section>

      <CTABanner />
    </div>
  )
}
```

- [ ] **Step 3.2: Verify the full project compiles with zero errors**

```bash
cd "/Users/talshani/Desktop/Elevate digiTal" && npm run lint
```
Expected: zero TypeScript errors across all files.

- [ ] **Step 3.3: Visual verification — start dev server and open the page**

```bash
cd "/Users/talshani/Desktop/Elevate digiTal" && npm run dev
```

Open `http://localhost:3000/case-studies` and verify:
(Port 3000 is intentional — the dev script in `package.json` sets `--port=3000` explicitly.)
- [ ] Page heading "Results We've Delivered" renders in serif
- [ ] 4 cards render in a vertical stack
- [ ] Each card shows: lime result tag, serif headline, teaser, services line, stats with ↑ arrows, CTA row
- [ ] Right side shows the floating dark image card with correct gradient, client name, and monogram (or logo if imageUrl is set)
- [ ] Clicking "Read the full story" expands the story panel with smooth animation
- [ ] Opening a second card collapses the first
- [ ] Clicking again collapses the open card
- [ ] The `+` icon rotates 45° and turns blue when open
- [ ] "Start a similar project →" links to `/contact`
- [ ] The existing `/case-studies/:slug` detail routes still work (no change to routing)

- [ ] **Step 3.4: Commit all three files together**

All three files changed together in one atomic commit — the data model, component, and page form a single coherent unit.

```bash
cd "/Users/talshani/Desktop/Elevate digiTal"
git add src/data/caseStudies.ts src/components/CaseStudyCard.tsx src/pages/CaseStudies.tsx
git commit -m "feat: rewrite CaseStudies page with editorial card layout"
```

---

## Task 4: Add Client Logo (Horizon Design&Build)

**Files:**
- Add: `public/logos/horizon-design-build.png` (provided by user)
- Modify: `src/data/caseStudies.ts` (set `imageUrl`)

### Context
The user has a logo for Horizon Design&Build. Once the file is placed in `public/logos/`, update the data to point to it. The `CaseStudyCard` component already handles the `imageUrl` path — no component changes needed.

- [ ] **Step 4.1: Place the logo file**

Copy the Horizon Design&Build logo to:
```
public/logos/horizon-design-build.png
```
(PNG with white background or transparent background both work. If the background is white, it will show against the dark card — a transparent or white-removed version looks better.)

- [ ] **Step 4.2: Update `imageUrl` in `caseStudies.ts`**

In the `horizon-design-build` entry, add:
```typescript
imageUrl: "/logos/horizon-design-build.png",
```

- [ ] **Step 4.3: Visual check**

Restart the dev server if needed. Verify the logo appears in the Horizon card's image panel, max 160px wide, centered on the dark gradient.

- [ ] **Step 4.4: Commit**

```bash
cd "/Users/talshani/Desktop/Elevate digiTal"
git add public/logos/horizon-design-build.png src/data/caseStudies.ts
git commit -m "feat: add Horizon Design&Build logo to case study card"
```

---

## Done

All four tasks complete when:
- `npm run lint` passes with zero errors
- `npm run build` produces a clean Vite build (`npm run build` should complete without errors)
- Visual checklist in Task 3.3 is fully verified
- The existing `/case-studies/:slug` detail routes are unaffected
