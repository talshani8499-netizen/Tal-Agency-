# Quick Business AI Audit — Design Spec

**Date:** 2026-03-20
**Status:** Approved
**Feature:** Interactive bottom-drawer wizard that audits a business owner's AI readiness and delivers personalized, ROI-estimated service recommendations, ending with a Cal.com booking.

---

## Overview

A floating "Quick Business AI Audit" bubble currently lives on every page as a static `<div>` (already shipped in `Layout.tsx`). **This feature converts it to an interactive `<button>`.** After 3 seconds from initial app load, an animated AI orb character wakes up on the bubble with a speech bubble: *"You should click it 👆"*. The speech bubble stays visible until the user clicks — it does not auto-dismiss. Clicking the bubble opens a bottom-drawer wizard — 7 discovery steps, a lead gate (name + email), a rule-based results card with ROI estimates, and an inline Cal.com booking.

The 3-second "awake" animation fires **once** per app session. After the user clicks and opens the wizard, the orb returns to idle state when the drawer closes and does **not** re-awaken during that session. This state lives in component state (`Layout.tsx`) — not `localStorage`.

Tone throughout: **smooth, business-oriented, positive encouragement at each step.**

---

## Architecture

### New Files
| File | Responsibility |
|------|---------------|
| `src/components/AuditWizard.tsx` | Bottom drawer shell + all wizard step rendering + state machine |
| `src/components/AuditOrb.tsx` | Animated glowing orb — used on the bubble and inside the drawer |
| `src/components/AuditBookingWidget.tsx` | Minimal Cal.com embed for inside the drawer (no layout shell) |
| `src/lib/auditEngine.ts` | Pure function: answers → ranked recommendations + ROI estimates |

### Modified Files
| File | Change |
|------|--------|
| `src/components/Layout.tsx` | Add `isAuditOpen: boolean` state and `hasBeenOpened: boolean` state. Convert the existing bubble `<div>` to a `<button>` with `onClick={() => { setIsAuditOpen(true); setHasBeenOpened(true); }}`. The bubble's inner content — the `MessageSquare` icon, text label ("Quick Business AI Audit"), and pinging dot — is **replaced entirely** by `<AuditOrb size={32} state={orbState} approveCount={0} />` plus a text label `"Quick Business AI Audit"` (the label is kept for context). **The bubble unmounts (conditionally renders `null`) when `isAuditOpen === true`** so `AnimatePresence` can play its exit animation. When the drawer closes (`isAuditOpen` returns to `false`), the bubble re-mounts with a simple fade-in entrance (`initial={{ opacity: 0 }} animate={{ opacity: 1 }}`). The `approveCount={0}` passed to the bubble's orb is a constant — the bubble orb never plays a brightness surge, and this is intentional. `orbState` is `"awake"` if 3 seconds have elapsed and `!hasBeenOpened`, else `"idle"`. Add `<AuditWizard open={isAuditOpen} onClose={() => setIsAuditOpen(false)} />` after `<Footer />`. |

### Existing Files Used (unchanged)
- `src/components/ui/Button.tsx` — CTA buttons inside the wizard

### Why NOT reusing `BookingSection`
`BookingSection` cannot be embedded in the drawer as-is:
1. Its Cal.com target has `id="my-cal-inline-elevate-digital"` — if the page already has a `BookingSection`, two elements would share the same id, causing the embed to init into the wrong node.
2. It renders a full `<section>` with `py-24` padding and a marketing heading — wrong inside a compact drawer.
3. Its embed height is hardcoded to 660px — too tall for a drawer context.

`AuditBookingWidget` uses a unique id (`my-cal-inline-audit`), no layout shell, and a height of 500px.

---

## Canonical Answer Values

All answer fields store these **exact** string values. These are the canonical keys used in both rendering and scoring.

```ts
type Industry = "Home Services" | "Law Firm" | "Dental / Medical" | "Real Estate" | "E-commerce" | "Contractor" | "Other";

type Pain =
  | "Missed calls & leads"
  | "Slow follow-up"
  | "Website doesn't convert"
  | "Too much manual admin"
  | "Hard to scale without hiring";

type TeamSize = "Just me" | "2–5" | "6–15" | "16–50" | "50+";

type Revenue = "Under $10k" | "$10k–$30k" | "$30k–$100k" | "$100k+" | "Prefer not to say";

type AfterHours =
  | "They hit voicemail and rarely call back"
  | "We have someone on-call (expensive)"
  | "We forward to my personal phone (exhausting)"
  | "We just miss the calls"
  | "We use a third-party answering service";

type LeadVolume = "Under 20" | "20–50" | "50–150" | "150–500" | "500+";

type Goal =
  | "Save time"
  | "Capture more leads"
  | "Cut costs"
  | "Scale without hiring"
  | "All of the above";
```

When the user selects "Other" for industry, `answers.industry` stores `"Other"` (the canonical key). The user's custom text is stored separately in `answers.industryCustom?: string` for display in the results insight string. The `AVG_JOB_VALUE` lookup always uses `"Other"` as the fallback key for any unrecognized value.

---

## Component: AuditOrb

A Motion + inline-style animated element (not Tailwind classes — inline styles are required because animation values are dynamic). Soft glowing circle, layered radial gradients in blue/purple tones.

```tsx
// Base inline style
const orbStyle: React.CSSProperties = {
  width: size,
  height: size,
  borderRadius: "50%",
  background: "radial-gradient(circle at 35% 35%, #a78bfa, #3b82f6 60%, #1e3a8a)",
  boxShadow: "0 0 20px 4px rgba(139,92,246,0.5)",
};
```

All animation (scale, glow, brightness) is handled via Motion `animate` props — not Tailwind utility classes.

### Props
```ts
interface AuditOrbProps {
  size?: number;       // px, default 48
  state: "idle" | "awake" | "active";
  approveCount: number; // parent increments on each answer selection; orb watches for changes and plays brightness surge
}
```

**`approveCount` pattern:** The parent holds `approveCount` in state and increments it (`setApproveCount(c => c + 1)`) whenever the user selects an answer. The orb's `useEffect` watches `[approveCount]` and plays the brightness surge (`filter: brightness(1.4)`) on changes. **Skip the initial mount:** use a `useRef(false)` initialized to `false`; set it to `true` after first render; skip the effect if the ref is still `false`. This ensures no spurious flash when the orb first renders inside the drawer.

### Animation States

**1. Idle** (on the floating bubble, page just loaded)
- Slow pulse: `scale` oscillates 1.0 → 1.08 → 1.0, period 3s, ease in-out
- Soft glow: `boxShadow` breathes with the pulse

**2. Awake** (triggered 3s after app load, while `!hasBeenOpened`)
- The idle scale pulse is **suspended** while the awake sequence plays (Motion's `animate` prop is changed from the loop to the awake sequence).
- Orb "inhales": quick scale-up to 1.15 over 200ms
- Speech bubble fades in attached above the orb
- Speech bubble text: *"You should click it 👆"* rendered with typewriter effect (~80ms per character)
- Subtle bounce: orb does a small y-axis bounce (`-4px`) after typewriter completes
- After the bounce, the orb holds at scale 1.0 with the speech bubble **remaining visible** until the user clicks. The idle pulse does NOT resume while the speech bubble is shown.

**3. Active** (inside the open drawer)
- Orb sits top-left of drawer header, 40×40px (32×32px on mobile)
- Slow idle pulse resumes
- On `approveCount` change: brightness surge (`filter: brightness(1.4)`) over 300ms then back to `brightness(1.0)`

### Bubble → Drawer Transition
1. User clicks the bubble `<button>` → `setIsAuditOpen(true)` fires **immediately** on click. Because the bubble is conditionally rendered and wrapped in `AnimatePresence`, it plays its exit animation (`scale: 1.1, opacity: 0` over 150ms) before unmounting.
2. Simultaneously (because `isAuditOpen` is `true` immediately), the drawer slides up from `translateY(100%)` to `translateY(0)` over 300ms with spring easing.
3. Orb fades into drawer header with a 120ms entrance bounce.

---

## Component: AuditWizard

A bottom-anchored drawer. On desktop: max-height 85vh, max-width 680px, centered horizontally, rounded top corners. On mobile: full viewport width, same max-height. **z-index: 50** (above navbar which is z-40).

### Props
```ts
interface AuditWizardProps {
  open: boolean;
  onClose: () => void;
}
```

**State reset on close:** When `open` transitions from `true` to `false` (via ✕ button, ESC, or external `onClose` call), the wizard resets `WizardState` to its initial values **after** the drawer's exit animation completes (300ms). This way the drawer slides down fully before state clears, preventing a flash of the first step during close.

### Backdrop
A full-screen overlay `<div>` with `position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 49` sits behind the drawer. Clicking it does NOT close the drawer. `aria-hidden="true"` on the backdrop.

### Drawer Structure
```
┌─────────────────────────────────────┐
│ [‹] [Orb]  Step X of 7  [████░░░░] │  ← Header (sticky, steps 1–7 only)
│                              [✕]    │
├─────────────────────────────────────┤
│                                     │
│         Step content                │  ← Scrollable body
│                                     │
│  [encouragement text after select]  │
│                                     │
└─────────────────────────────────────┘
```

**Header visibility by step:**
- Steps 1–7: show orb + "Step X of 7" + progress bar + back chevron + close button
- Step 8 (lead gate): show only close button, no progress bar, no step counter, no orb in header
- Step 9 (calculating): show only close button
- Step 10 (results + booking): show only close button

### State Machine
```
IDLE → OPEN → STEP_1 → STEP_2 → ... → STEP_7 → LEAD_GATE → CALCULATING → RESULTS
```

The **booking** section is not a separate step — it is part of the results view (step 10), rendered below the results card and scrolled into view. There is no step 11.

State shape:
```ts
type WizardState = {
  step: number;               // 0 = closed, 1-7 = steps, 8 = lead gate, 9 = calculating, 10 = results+booking
  answers: Partial<Answers>;  // accumulates as user progresses
  name: string;
  email: string;
  encouragementVisible: boolean;  // true for 1200ms after an answer is selected, then false
  approveCount: number;           // incremented on each answer; passed to AuditOrb
  auditResult: AuditResult | null; // null until calculating completes
}

type Answers = {
  industry: Industry;
  industryCustom?: string;   // set only when industry === "Other"
  pain: Pain;
  teamSize: TeamSize;
  revenue: Revenue;
  afterHours: AfterHours;
  leadVolume: LeadVolume;
  goal: Goal;
}
```

### Step Transitions
- Selecting an option → sets answer → increments `approveCount` → sets `encouragementVisible: true` → shows encouragement text for 1200ms → sets `encouragementVisible: false` → auto-advances to next step
- Step content slides out to the left, next step slides in from the right (Motion `AnimatePresence`, `x: ±40`, opacity 0→1)
- When navigating **back**, `encouragementVisible` resets to `false` immediately
- Progress bar at top fills proportionally: `(step / 7) * 100` where `step` is the `WizardState.step` value (1–7). At Step 7 this reaches 100% — this is intentional UX (signals "you're almost done, just one more thing") before the lead gate.
- Back chevron (`‹`) top-left allows going back (except Step 1)

### Close Behaviour
- ✕ button always visible top-right
- Backdrop click: does NOT close
- ESC key: if step ≤ 1 → close immediately; if step ≥ 2 → show ESC confirmation
- **ESC confirmation UI:** A centered overlay panel inside the drawer (`position: absolute; inset: 0; z-index: 20; display: flex; align-items: center; justify-content: center`). Behind the panel, the step content is dimmed by a semi-transparent scrim (`background: rgba(0,0,0,0.3)`). The panel itself is a white/dark card with text *"Are you sure? You'll lose your progress."* and two buttons: "Keep Going" (dismisses confirmation, scrim disappears) and "Close Anyway" (calls `onClose`). The full-screen backdrop (z-49) remains `aria-hidden` and non-interactive — it does not respond to clicks while the confirmation is visible.

---

## The 7 Steps

Each step: large headline, small sub-label, answer options as tap-friendly cards (icon + label, full-width on mobile, 2-col grid on desktop where applicable).

### Step 1 — Industry
**Headline:** *"What type of business do you run?"*
**Options (canonical values):** `"Home Services"` · `"Law Firm"` · `"Dental / Medical"` · `"Real Estate"` · `"E-commerce"` · `"Contractor"` · `"Other"`
- Selecting `"Other"` reveals a text input below the cards for custom entry (stores to `answers.industryCustom`). The text input is optional — the Continue button is disabled only while `answers.industryCustom` is an empty string; typing any character enables it.
- Clicking "Continue →" sets `answers.industry = "Other"`, increments `approveCount`, shows encouragement for 1200ms, then auto-advances to Step 2.
- All other options auto-advance after 1200ms encouragement (no Continue button).
**Encouragement:** *"Great — we know this space well."* (shown for all industry selections including "Other")

### Step 2 — Biggest Pain
**Headline:** *"What's your #1 growth bottleneck right now?"*
**Options (canonical values):** `"Missed calls & leads"` · `"Slow follow-up"` · `"Website doesn't convert"` · `"Too much manual admin"` · `"Hard to scale without hiring"`
**Encouragement:** *"You're not alone — this is the #1 issue we solve."*

### Step 3 — Team Size
**Headline:** *"How many people are on your team?"*
**Options (canonical values):** `"Just me"` · `"2–5"` · `"6–15"` · `"16–50"` · `"50+"`
**Encouragement:** *"Perfect size to see immediate ROI from AI."*

### Step 4 — Monthly Revenue *(optional)*
**Headline:** *"Roughly, what's your current monthly revenue?"*
**Sub-label:** *"Helps us size your opportunity accurately."*
**Options (canonical values):** `"Under $10k"` · `"$10k–$30k"` · `"$30k–$100k"` · `"$100k+"` · `"Prefer not to say"`
**Note:** `"Prefer not to say"` is visually identical to other options — no separate skip link.
**Encouragement logic:**
- Any value except `"Prefer not to say"` → *"This helps us give you accurate numbers."*
- `"Prefer not to say"` → *"No problem — we'll use industry averages."*

**Note on ROI math:** The `revenue` answer is NOT used directly in any ROI formula. ROI always uses `AVG_JOB_VALUE[industry]` as the per-job value. Revenue data is collected for future CRM/qualification use only.

### Step 5 — After-Hours Calls
**Headline:** *"What happens when someone calls after office hours?"*
**Options (canonical values):** `"They hit voicemail and rarely call back"` · `"We have someone on-call (expensive)"` · `"We forward to my personal phone (exhausting)"` · `"We just miss the calls"` · `"We use a third-party answering service"`
**Encouragement:** *"That's significant — here's what you're leaving on the table."*

### Step 6 — Lead Volume
**Headline:** *"How many inbound leads or calls do you get per month?"*
**Options (canonical values):** `"Under 20"` · `"20–50"` · `"50–150"` · `"150–500"` · `"500+"`
**Encouragement:** *"Got it — let's calculate your opportunity."*

### Step 7 — Primary Goal
**Headline:** *"What matters most to you right now?"*
**Options (canonical values):** `"Save time"` · `"Capture more leads"` · `"Cut costs"` · `"Scale without hiring"` · `"All of the above"`
**Encouragement:** *"That's exactly what we built this for."*

---

## Lead Gate (Step 8)

No step number shown. No progress bar. Feels like a natural transition, not a form step.

**Headline:** *"You're 30 seconds away from your results."*
**Sub:** *"Where should we send your personalized AI audit?"*

Fields:
- First Name (required)
- Work Email (required, validated with basic regex `/.+@.+\..+/`)

**CTA:** `Show Me My Audit →`

**Below CTA:** *"No spam. We'll also send you a copy of your results."* (small, muted)

### Lead Submission (v1 — client-side only)
On valid form submit:
1. Store `{ name, email, answers, timestamp: Date.now() }` in `localStorage` under key `"elevate_audit_lead"`.
2. If `window.gtag` exists, fire: `gtag("event", "audit_lead_captured", { name, email })`.
3. Advance to step 9 (Calculating). No server call in v1.

---

## Calculating State (Step 9)

Duration: 1500ms fake delay.

Orb pulses rapidly (scale 1.0 → 1.2 → 1.0, period 600ms). Text cycles (sequential, no overlap):

| Text | Starts visible at | Fades out starting at | Fade duration |
|------|------------------|----------------------|---------------|
| *"Analyzing your business..."* | t = 0ms (fade in 100ms) | t = 400ms | 100ms |
| *"Identifying opportunities..."* | t = 500ms (fade in 100ms) | t = 900ms | 100ms |
| *"Calculating your ROI..."* | t = 1000ms (fade in 100ms) | stays visible | — |

Only one text is visible at a time. After 1500ms total, call `runAuditEngine(answers)`, store result in `auditResult`, advance to step 10.

---

## Results Engine (`src/lib/auditEngine.ts`)

Pure function — no side effects, easily testable.

```ts
export function runAuditEngine(answers: Answers): AuditResult
```

### Service Scoring

**Industry and teamSize are intentionally excluded from the scoring table** — industry is used only for `AVG_JOB_VALUE`; teamSize only for Automation ROI. They contribute to output but not scores.

Scoring uses the canonical answer values defined above as keys:

| Signal (canonical value) | Voice | Chat | Landing | Automation |
|--------------------------|-------|------|---------|------------|
| pain = "Missed calls & leads" | +3 | +1 | 0 | +1 |
| pain = "Slow follow-up" | +1 | +2 | 0 | +3 |
| pain = "Website doesn't convert" | 0 | +2 | +3 | +1 |
| pain = "Too much manual admin" | +1 | +1 | 0 | +3 |
| pain = "Hard to scale without hiring" | +2 | +1 | +1 | +3 |
| afterHours = "They hit voicemail and rarely call back" | +3 | +1 | 0 | 0 |
| afterHours = "We just miss the calls" | +3 | +1 | 0 | 0 |
| afterHours = "We have someone on-call (expensive)" | +3 | 0 | 0 | +1 |
| afterHours = "We forward to my personal phone (exhausting)" | +3 | 0 | 0 | +1 |
| afterHours = "We use a third-party answering service" | +2 | +1 | 0 | +1 |
| goal = "Capture more leads" | +2 | +2 | +2 | +1 |
| goal = "Save time" | +1 | +1 | 0 | +3 |
| goal = "Scale without hiring" | +2 | +2 | +1 | +3 |
| goal = "Cut costs" | +1 | +1 | 0 | +2 |
| goal = "All of the above" | +2 | +2 | +1 | +2 |

Services scoring ≥ 2 are recommended, sorted highest-first. Minimum 2 recommendations always returned, maximum 4.

**Tiebreaking for minimum fill:** If fewer than 2 services score ≥ 2, add services from the sub-threshold set to reach the minimum. Selection rule: pick the **highest-scoring** sub-threshold service(s). Ties broken by fixed priority: `voice > chat > landing > automation`. Fill-up services are **appended after** the qualifying services (not interleaved by score).

### ROI Estimates

Industry average job values:
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
// Always use AVG_JOB_VALUE[answers.industry] as jobValue. Revenue answer is not used in ROI math.
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

Team size midpoints (Automation formula):
```ts
const TEAM_MIDPOINTS: Record<TeamSize, number> = {
  "Just me": 1,
  "2–5": 3,
  "6–15": 10,
  "16–50": 30,
  "50+": 60,
}
```

ROI formulas (all produce a range via × 0.8 / × 1.3):
```ts
const jobValue = AVG_JOB_VALUE[answers.industry];
const leadMidpoint = LEAD_MIDPOINTS[answers.leadVolume];
const teamMidpoint = TEAM_MIDPOINTS[answers.teamSize];

// Voice Agent
const voiceBase = leadMidpoint * 0.35 * jobValue * 0.25;
// roiMin = voiceBase * 0.8, roiMax = voiceBase * 1.3

// Chat Agent
const chatBase = leadMidpoint * 0.30 * jobValue * 0.20;
// roiMin = chatBase * 0.8, roiMax = chatBase * 1.3

// Landing Page
const landingBase = leadMidpoint * jobValue * 0.15;
// roiMin = landingBase * 0.8, roiMax = landingBase * 1.3

// Automation
const automationBase = teamMidpoint * 10 * 35;
// roiMin = automationBase * 0.8, roiMax = automationBase * 1.3
```

### Output Shape
**Rounding:** All ROI values (`roiMin`, `roiMax`, `totalMin`, `totalMax`) are rounded to the nearest $50 before use. The `label` field is formatted from rounded values: `"est. $" + roiMin.toLocaleString() + "–$" + roiMax.toLocaleString() + "/mo"`.

```ts
type AuditResult = {
  recommendations: ServiceRecommendation[];
  totalMin: number;   // sum of roiMin across all returned recommendations (rounded to nearest $50)
  totalMax: number;   // sum of roiMax across all returned recommendations (rounded to nearest $50)
}

type ServiceRecommendation = {
  service: "voice" | "chat" | "landing" | "automation";
  score: number;
  roiMin: number;     // rounded to nearest $50
  roiMax: number;     // rounded to nearest $50
  label: string;       // pre-formatted: "est. $1,200–$1,950/mo"
  description: string; // human-readable impact phrase (see below)
  insight: string;     // personalized one-liner using their answers (see below)
}
```

**`description` values (static per service):**
- voice: `"estimated monthly revenue from recovered missed calls"`
- chat: `"estimated monthly revenue from leads leaving your website"`
- landing: `"estimated monthly gain from improved conversion"`
- automation: `"estimated monthly time savings (in labor cost)"`

**`insight` templates:**
```ts
const INSIGHTS: Record<"voice" | "chat" | "landing" | "automation", (a: Answers) => string> = {
  voice: (a) =>
    `Based on your ${a.leadVolume} monthly leads and after-hours situation, you're leaving revenue on the table every night.`,
  chat: (a) =>
    `With ${a.leadVolume} monthly leads coming in, a chat agent captures prospects even when your team is busy.`,
  landing: (a) =>
    `A high-converting landing page tailored to ${a.industry === "Other" && a.industryCustom ? a.industryCustom : a.industry} businesses can meaningfully lift your close rate.`,
  automation: (a) =>
    `For a team of ${a.teamSize}, automating follow-up and admin could recover hours of billable time weekly.`,
}
```

### Service Icons (Lucide React)
| Service | Icon |
|---------|------|
| `"voice"` | `Phone` |
| `"chat"` | `MessageSquare` |
| `"landing"` | `Globe` |
| `"automation"` | `Zap` |

---

## Results Card (Step 10)

**Header:** *"Here's your AI opportunity snapshot, [name]"*

2–4 service recommendation cards, each showing:
- Service name + Lucide icon (see icon mapping above)
- `insight` one-liner
- `label` (dollar range) in emerald green
- `description` (impact phrase) in muted text below the dollar range

**Footer of results card:**
Total bar: *"Total estimated monthly opportunity:"* **`$X,XXX – $X,XXX`** in large accent text.
`totalMin` and `totalMax` are the sum of `roiMin` / `roiMax` across all returned recommendations.

After the results card, a soft divider then:
- Heading: *"Want us to build this for you?"*
- Sub: *"Book a free 30-min strategy call. We'll walk through your audit live and show you exactly what we'd build."*
- `<AuditBookingWidget />`

---

## Component: AuditBookingWidget

Purpose-built Cal.com embed for the drawer context. No layout shell, no marketing heading.

**Props:** none (Cal link is hardcoded).

**DOM:**
```tsx
<div
  id="my-cal-inline-audit"
  style={{ width: "100%", height: "500px", overflow: "hidden" }}
  className="rounded-xl border border-white/10"
/>
```

**Cal.com dual namespace safety:** The Cal.com embed loader supports multiple named namespaces on the same page — `"elevate-digital"` (used by `BookingSection`) and `"elevate-digital-audit"` (used here) are independent and do not conflict. Both share the same `window.Cal` object but each namespace maintains its own queue. No pages currently mount both simultaneously (most pages with `BookingSection` don't have the drawer open at the same time in normal use), but even if they did, this is safe.

**Initialization:** Same polling pattern as `BookingSection`. Inject the Cal loader script once (guarded by id `"cal-embed-script-audit"` — distinct from `"cal-embed-script"` used by `BookingSection`). Then poll for `window.Cal` and call:
```ts
Cal("init", "elevate-digital-audit", { origin: "https://app.cal.com" });
Cal.ns["elevate-digital-audit"]("inline", {
  elementOrSelector: "#my-cal-inline-audit",
  config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
  calLink: "tal-shani-i0wamv/elevate-digital",
});
Cal.ns["elevate-digital-audit"]("ui", {
  cssVarsPerTheme: {
    light: { "cal-brand": "#2563eb" },
    dark: { "cal-brand": "#fafafa" },
  },
  hideEventTypeDetails: false,
  layout: "month_view",
});
```

---

## Mobile Behaviour
- Drawer: full viewport width, `max-height: 85dvh`, `overflow-y: auto`
- Step option cards: single column
- Orb in bubble: 32×32px; orb in drawer header: 32×32px on mobile, 40×40px on desktop
- Booking widget height: 500px on all viewports

---

## Accessibility
- Drawer traps focus when open (`focus-trap` pattern)
- ESC closes with confirmation if past Step 1
- `aria-modal="true"`, `role="dialog"` on drawer
- All option cards are `<button>` elements with `aria-pressed`
- Progress bar has `aria-valuenow` / `aria-valuemax`
- Backdrop has `aria-hidden="true"`
- Bubble in Layout.tsx is a `<button>` with `aria-label="Open Quick Business AI Audit"`
