# BentoGrid Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Three targeted fixes to the BentoServicesGrid: reduce overall height to fit a laptop screen, replace the Automation card's AnimatedBeam with an IconCloud, and enlarge the Calendar in the Websites card.

**Architecture:** All changes are confined to two files — `src/components/magicui/bento-grid.tsx` (row height) and `src/components/BentoServicesGrid.tsx` (backgrounds). A new `src/components/magicui/icon-cloud.tsx` is added for the IconCloud component. No other files change.

**Tech Stack:** React 19 + TypeScript + Tailwind CSS v4 + motion/react + react-icon-cloud (new dep)

---

## File Structure

| File | Change |
|------|--------|
| `src/components/magicui/bento-grid.tsx` | Reduce `auto-rows` height: `22rem` → `15rem` |
| `src/components/magicui/icon-cloud.tsx` | **New** — IconCloud component wrapping `react-icon-cloud` |
| `src/components/BentoServicesGrid.tsx` | Replace `AutomationBackground` with `IconCloudBackground`; enlarge `WebsitesBackground` calendar; adjust `SEOBackground` and `ChatBackground` top offsets for shorter cards |

---

## Task 1: Reduce Grid Row Height

**Files:**
- Modify: `src/components/magicui/bento-grid.tsx:13`
- Modify: `src/components/BentoServicesGrid.tsx` — adjust background offsets

**Goal:** 3 rows × 15rem (240px) = 720px + gaps ≈ 768px total — fits a 900px laptop screen.

- [ ] **Step 1: Reduce row height in bento-grid.tsx**

In `src/components/magicui/bento-grid.tsx` line 13, change:
```tsx
"grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
```
to:
```tsx
"grid w-full auto-rows-[15rem] grid-cols-3 gap-4",
```

- [ ] **Step 2: Adjust SEOBackground top offset**

In `src/components/BentoServicesGrid.tsx`, in `SEOBackground`, change:
```tsx
className="absolute top-10 [mask-image:..."
```
to:
```tsx
className="absolute top-6 [mask-image:..."
```

- [ ] **Step 3: Adjust ChatBackground height**

In `ChatBackground`, change:
```tsx
className="absolute top-4 right-2 h-[300px] w-[calc(100%-1rem)] ..."
```
to:
```tsx
className="absolute top-4 right-2 h-[160px] w-[calc(100%-1rem)] ..."
```

- [ ] **Step 4: Verify build**

```bash
cd "/Users/talshani/Desktop/Elevate digiTal" && npm run lint && npm run build
```
Expected: 0 errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/magicui/bento-grid.tsx src/components/BentoServicesGrid.tsx
git commit -m "fix(bento): reduce grid row height to 15rem to fit laptop screen"
```

---

## Task 2: Replace AutomationBackground with IconCloud

**Files:**
- Create: `src/components/magicui/icon-cloud.tsx`
- Modify: `src/components/BentoServicesGrid.tsx`

**Goal:** Replace the AnimatedBeam node diagram with a rotating 3D sphere of automation tool icons.

### Step 1: Install react-icon-cloud

- [ ] Run:
```bash
cd "/Users/talshani/Desktop/Elevate digiTal" && npm install react-icon-cloud
```
Expected: package added to package.json with no peer-dep errors.

### Step 2: Create src/components/magicui/icon-cloud.tsx

- [ ] Create the file with this exact content:

```tsx
import { Cloud, ICloud } from "react-icon-cloud";

const cloudProps: Omit<ICloud, "children"> = {
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "none",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
  },
};

interface IconCloudProps {
  images: string[];
}

export function IconCloud({ images }: IconCloudProps) {
  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden">
      <Cloud {...cloudProps}>
        {images.map((img, i) => (
          <a key={i} href="#" onClick={(e) => e.preventDefault()}>
            <img height="40" width="40" alt="" src={img} />
          </a>
        ))}
      </Cloud>
    </div>
  );
}
```

### Step 3: Replace AutomationBackground in BentoServicesGrid.tsx

- [ ] In `src/components/BentoServicesGrid.tsx`:

**Remove** the `AnimatedBeam` import (line 7):
```tsx
import { AnimatedBeam } from "@/components/magicui/animated-beam";
```

**Also remove `useRef`** from the React import on line 1 (it will no longer be used):
```tsx
// Change:
import { useRef } from "react";
// To: (delete the line entirely — no React imports are needed)
```

**Add** the `IconCloud` import after the existing imports:
```tsx
import { IconCloud } from "@/components/magicui/icon-cloud";
```

**Delete** the entire `NodeIcon` function (lines 97–109) and `AutomationBackground` function (lines 111–156) — both are being replaced.

**Add** this new background function in their place:

```tsx
// ─── Automation Background (IconCloud) ───────────────────────────────────────

const automationSlugs = [
  "gmail",
  "hubspot",
  "salesforce",
  "zapier",
  "n8n",
  "slack",
  "notion",
  "airtable",
  "googlesheets",
  "stripe",
  "twilio",
  "mailchimp",
  "zoom",
  "dropbox",
  "shopify",
  "zendesk",
  "whatsapp",
  "googledrive",
  "googlecalendar",
  "trello",
  "asana",
  "pipedrive",
  "intercom",
  "clickup",
];

const automationImages = automationSlugs.map(
  (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
);

function AutomationBackground() {
  return (
    <div className="absolute inset-0 [mask-image:linear-gradient(to_top,transparent_10%,#000_80%)]">
      <IconCloud images={automationImages} />
    </div>
  );
}
```

- [ ] **Step 4: Verify build**

```bash
cd "/Users/talshani/Desktop/Elevate digiTal" && npm run lint && npm run build
```
Expected: 0 errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/magicui/icon-cloud.tsx src/components/BentoServicesGrid.tsx package.json package-lock.json
git commit -m "feat(bento): replace Automation AnimatedBeam with IconCloud of automation tools"
```

---

## Task 3: Enlarge Calendar in WebsitesBackground

**Files:**
- Modify: `src/components/BentoServicesGrid.tsx:173–208`

**Goal:** Make the calendar fill most of the full-width card instead of being a small top-right inset.

- [ ] **Step 1: Replace WebsitesBackground**

Replace the entire `WebsitesBackground` function (lines 173–208) with:

```tsx
function WebsitesBackground() {
  return (
    <div className="absolute inset-0 flex items-start justify-center pt-4 [mask-image:linear-gradient(to_top,transparent_15%,#000_70%)]">
      <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm w-[320px]">
        {/* Month header */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-slate-700">March 2026</span>
          <span className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
            Booked
          </span>
        </div>
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-1.5">
          {DAYS.map((d) => (
            <div key={d} className="text-center text-[10px] font-semibold text-slate-400 py-0.5">{d}</div>
          ))}
        </div>
        {/* Date grid */}
        <div className="grid grid-cols-7 gap-1">
          {MARCH_DATES.map((date, i) => (
            <div
              key={i}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium mx-auto",
                date === null && "invisible",
                date !== null && !BOOKED.has(date) && "text-slate-600 hover:bg-slate-100 cursor-pointer",
                date !== null && BOOKED.has(date) && "bg-emerald-100 text-emerald-700 font-bold",
                date === 21 && "ring-2 ring-blue-400 bg-blue-50 text-blue-700",
              )}
            >
              {date}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

Key changes from original:
- Removed `absolute top-6 right-4 origin-top scale-[0.85]` → now centered, full natural size
- Increased date cell size: `h-6 w-6 text-[10px]` → `h-8 w-8 text-xs`
- Increased font sizes throughout
- Fixed width `w-[320px]` to fill most of the 3-column card width
- Changed mask to fade from bottom so calendar is fully visible at top

- [ ] **Step 2: Verify build**

```bash
cd "/Users/talshani/Desktop/Elevate digiTal" && npm run lint && npm run build
```
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/BentoServicesGrid.tsx
git commit -m "fix(bento): enlarge calendar in Websites card — centered, bigger cells, fills card"
```

---

## Summary

| Task | Files | Key Change |
|------|-------|-----------|
| 1 — Grid height | bento-grid.tsx, BentoServicesGrid.tsx | `22rem` → `15rem` rows; adjust background offsets |
| 2 — IconCloud | icon-cloud.tsx (new), BentoServicesGrid.tsx | 24 automation tool icons in rotating 3D sphere |
| 3 — Calendar size | BentoServicesGrid.tsx | Centered, natural scale, `h-8 w-8` cells |
