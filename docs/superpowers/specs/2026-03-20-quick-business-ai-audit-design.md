# Quick Business AI Audit — Design Spec

**Date:** 2026-03-20
**Status:** Approved
**Feature:** Interactive bottom-drawer wizard that audits a business owner's AI readiness and delivers personalized, ROI-estimated service recommendations, ending with a Cal.com booking.

---

## Overview

A floating "Quick Business AI Audit" bubble lives on every page (already shipped in `Layout.tsx`). After 3 seconds, an animated AI orb character wakes up on the bubble with a speech bubble: *"You should click it 👆"*. Clicking opens a bottom-drawer wizard — 7 discovery steps, a lead gate (name + email), a rule-based results card with ROI estimates, and an inline Cal.com booking.

Tone throughout: **smooth, business-oriented, positive encouragement at each step.**

---

## Architecture

### New Files
| File | Responsibility |
|------|---------------|
| `src/components/AuditWizard.tsx` | Bottom drawer shell + all wizard step rendering + state machine |
| `src/components/AuditOrb.tsx` | Animated glowing orb — used on the bubble and inside the drawer |
| `src/lib/auditEngine.ts` | Pure function: answers → ranked recommendations + ROI estimates |

### Modified Files
| File | Change |
|------|--------|
| `src/components/Layout.tsx` | Add `isAuditOpen` state + pass open/close to bubble and `<AuditWizard />` |

### Existing Files Used (unchanged)
- `src/components/BookingSection.tsx` — Cal.com widget rendered at the end of results
- `src/components/ui/Button.tsx` — CTA buttons inside the wizard

---

## Component: AuditOrb

A CSS + Motion animated element: soft glowing circle, layered radial gradients in blue/purple tones matching `--color-accent`.

### Animation States

**1. Idle** (on the floating bubble, page just loaded)
- Slow pulse: `scale` oscillates 1.0 → 1.08 → 1.0, period 3s, ease in-out
- Soft glow: `box-shadow` breathes with the pulse

**2. Awake** (triggered 3s after page load)
- Orb "inhales": quick scale-up to 1.15 over 200ms
- Speech bubble fades in attached above the orb
- Speech bubble text: *"You should click it 👆"* rendered with typewriter effect (~80ms per character)
- Subtle bounce: orb does a small y-axis bounce (`-4px`) after typewriter completes

**3. Active** (inside the open drawer)
- Orb sits top-left of drawer header, 40×40px
- Slow idle pulse continues
- On each step answer: brief brightness surge (filter: `brightness(1.4)`) over 300ms then back — visual "approval" of the answer

### Bubble → Drawer Transition
1. Click → bubble scales up to 1.1 + fades out over 150ms
2. Simultaneously: drawer slides up from `translateY(100%)` to `translateY(0)` over 300ms, spring easing
3. Orb fades into drawer header with a 120ms entrance bounce

---

## Component: AuditWizard

A bottom-anchored drawer. On desktop: max-height 85vh, max-width 680px, centered horizontally, rounded top corners. On mobile: full viewport width, same max-height.

### Drawer Structure
```
┌─────────────────────────────────────┐
│ [Orb]  Step X of 7    [progress bar]│  ← Header (sticky)
│                              [✕]    │
├─────────────────────────────────────┤
│                                     │
│         Step content                │  ← Scrollable body
│                                     │
│  [encouragement text after select]  │
│                                     │
└─────────────────────────────────────┘
```

### State Machine
```
IDLE → OPEN → STEP_1 → STEP_2 → ... → STEP_7 → LEAD_GATE → CALCULATING → RESULTS → BOOKING
```

State shape:
```ts
type WizardState = {
  step: number;           // 0 = closed, 1-7 = steps, 8 = lead gate, 9 = calculating, 10 = results
  answers: Answers;
  name: string;
  email: string;
  encouragementVisible: boolean;
}

type Answers = {
  industry: string;
  pain: string;
  teamSize: string;
  revenue: string;          // may be "skip"
  afterHours: string;
  leadVolume: string;
  goal: string;
}
```

### Step Transitions
- Selecting an option → sets answer → shows encouragement text for 1200ms → auto-advances to next step
- Step content slides out to the left, next step slides in from the right (Motion `AnimatePresence`, `x: ±40`, opacity 0→1)
- Progress bar at top fills proportionally: `(currentStep / 7) * 100%`
- Back chevron (`‹`) top-left allows going back (except Step 1)

### Close Behaviour
- ✕ button always visible top-right
- Backdrop click: does NOT close (prevents accidental dismissal)
- ESC key: if step ≤ 1 → close immediately; if step ≥ 2 → show inline confirmation *"Are you sure? You'll lose your progress."* with Cancel / Close buttons

---

## The 7 Steps

Each step: large headline, small sub-label, answer options as tap-friendly cards (icon + label, full-width on mobile, 2-col grid on desktop where applicable).

### Step 1 — Industry
**Headline:** *"What type of business do you run?"*
**Options:** Home Services · Law Firm · Dental / Medical · Real Estate · E-commerce · Contractor · Other *(reveals a text input)*
**Encouragement:** *"Great — we know this space well."*

### Step 2 — Biggest Pain
**Headline:** *"What's your #1 growth bottleneck right now?"*
**Options:** Missed calls & leads · Slow follow-up · Website doesn't convert · Too much manual admin · Hard to scale without hiring
**Encouragement:** *"You're not alone — this is the #1 issue we solve."*

### Step 3 — Team Size
**Headline:** *"How many people are on your team?"*
**Options:** Just me · 2–5 · 6–15 · 16–50 · 50+
**Encouragement:** *"Perfect size to see immediate ROI from AI."*

### Step 4 — Monthly Revenue *(optional)*
**Headline:** *"Roughly, what's your current monthly revenue?"*
**Sub-label:** *"Helps us give you accurate ROI estimates."*
**Options:** Under $10k · $10k–$30k · $30k–$100k · $100k+ · Prefer not to say
**Note:** "Prefer not to say" is visually identical to other options — no separate skip link.
**Encouragement:** *"This helps us give you accurate numbers."* / *"No problem — we'll use industry averages."* (if skipped)

### Step 5 — After-Hours Calls
**Headline:** *"What happens when someone calls after office hours?"*
**Options:** They hit voicemail and rarely call back · We have someone on-call (expensive) · We forward to my personal phone (exhausting) · We just miss the calls · We use a third-party answering service
**Encouragement:** *"That's significant — here's what you're leaving on the table."*

### Step 6 — Lead Volume
**Headline:** *"How many inbound leads or calls do you get per month?"*
**Options:** Under 20 · 20–50 · 50–150 · 150–500 · 500+
**Encouragement:** *"Got it — let's calculate your opportunity."*

### Step 7 — Primary Goal
**Headline:** *"What matters most to you right now?"*
**Options:** Save time · Capture more leads · Cut costs · Scale without hiring · All of the above
**Encouragement:** *"That's exactly what we built this for."*

---

## Lead Gate (Step 8)

No step number shown. Feels like a natural transition, not a form step.

**Headline:** *"You're 30 seconds away from your results."*
**Sub:** *"Where should we send your personalized AI audit?"*

Fields:
- First Name (required)
- Work Email (required, validated)

**CTA:** `Show Me My Audit →`

**Below CTA:** *"No spam. We'll also send you a copy of your results."* (small, muted)

---

## Calculating State (Step 9)

Duration: 1500ms fake delay.

Orb pulses rapidly. Text cycles:
1. *"Analyzing your business..."*
2. *"Identifying opportunities..."*
3. *"Calculating your ROI..."*

Each line fades in/out, 500ms each. Then results slide in.

---

## Results Engine (`src/lib/auditEngine.ts`)

Pure function — no side effects, easily testable.

```ts
export function runAuditEngine(answers: Answers): AuditResult
```

### Service Scoring

Each answer contributes weighted points to each service:

| Signal | Voice Agent | Chat Agent | Landing Page | Automation |
|--------|------------|------------|--------------|------------|
| Pain: Missed calls | +3 | +1 | 0 | +1 |
| Pain: Slow follow-up | +1 | +2 | 0 | +3 |
| Pain: Website doesn't convert | 0 | +2 | +3 | +1 |
| Pain: Too much admin | +1 | +1 | 0 | +3 |
| Pain: Hard to scale | +2 | +1 | +1 | +3 |
| After-hours: voicemail/miss calls | +3 | +1 | 0 | 0 |
| After-hours: personal phone/on-call | +3 | 0 | 0 | +1 |
| After-hours: answering service | +2 | +1 | 0 | +1 |
| Goal: Capture more leads | +2 | +2 | +2 | +1 |
| Goal: Save time | +1 | +1 | 0 | +3 |
| Goal: Scale without hiring | +2 | +2 | +1 | +3 |
| Goal: Cut costs | +1 | +1 | 0 | +2 |
| Goal: All of the above | +2 | +2 | +1 | +2 |

Services scoring ≥ 2 are recommended, sorted highest-first. Minimum 2 recommendations always returned, maximum 4.

### ROI Estimates

Industry average job values (used when revenue is skipped):
```ts
const AVG_JOB_VALUE: Record<Industry, number> = {
  "Home Services": 450,
  "Law Firm": 2000,
  "Dental / Medical": 600,
  "Real Estate": 3500,
  "E-commerce": 150,
  "Contractor": 800,
  "Other": 500,
}
```

Lead volume midpoints:
```ts
const LEAD_MIDPOINTS: Record<LeadVolume, number> = {
  "Under 20": 10,
  "20–50": 35,
  "50–150": 100,
  "150–500": 325,
  "500+": 600,
}
```

ROI formulas:
- **Voice Agent:** `missedLeads × jobValue × 0.25` (25% close rate on recovered calls)
  - `missedLeads` = `leadMidpoint × 0.35` (35% miss rate assumption)
  - Range: result × 0.8 to result × 1.3
  - Label: *"estimated monthly revenue from recovered missed calls"*

- **Chat Agent:** `leadMidpoint × 0.30 × jobValue × 0.20`
  - Label: *"estimated monthly revenue from leads currently leaving your website"*

- **Landing Page:** `leadMidpoint × jobValue × 0.15`
  - Label: *"estimated monthly gain from improved conversion"*

- **Automation:** `teamSize × 10 × 35` (10 hrs/week recovered per person at $35/hr)
  - Label: *"estimated monthly time savings"*

### Output Shape
```ts
type AuditResult = {
  recommendations: ServiceRecommendation[];
  totalMin: number;
  totalMax: number;
}

type ServiceRecommendation = {
  service: "voice" | "chat" | "landing" | "automation";
  score: number;
  roiMin: number;
  roiMax: number;
  insight: string;       // personalised one-liner using their answers
  label: string;         // "est. $X,XXX–$X,XXX/mo"
}
```

---

## Results Card (Step 10)

**Header:** *"Here's your AI opportunity snapshot, [Name]"*

2–4 service recommendation cards, each showing:
- Service name + icon
- One-line insight tied to their specific answers (e.g. *"Based on your call volume and after-hours gap, you're losing an estimated..."*)
- Estimated monthly impact in emerald green

**Footer of results card:**
Total bar: *"Total estimated monthly opportunity:"* **`$X,XXX – $X,XXX`** in large accent text

---

## Booking Finale

After results card, a soft divider then:

**Headline:** *"Want us to build this for you?"*
**Sub:** *"Book a free 30-min strategy call. We'll walk through your audit live and show you exactly what we'd build."*

Renders existing `<BookingSection />` component inline inside the drawer (scrollable).

---

## Mobile Behaviour
- Drawer: full viewport width, `max-height: 85dvh`, `overflow-y: auto`
- Step option cards: single column
- Orb: 32×32px in drawer header
- Booking section height capped at 500px with internal scroll

---

## Accessibility
- Drawer traps focus when open (`focus-trap` pattern)
- ESC closes with confirmation if past Step 1
- `aria-modal="true"`, `role="dialog"` on drawer
- All option cards are `<button>` elements with `aria-pressed`
- Progress bar has `aria-valuenow` / `aria-valuemax`
