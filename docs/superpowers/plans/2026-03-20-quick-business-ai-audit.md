# Quick Business AI Audit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an interactive floating audit wizard that guides business owners through 7 discovery questions, gates results behind a lead form, computes rule-based ROI estimates, and ends with a Cal.com booking — all in a bottom-anchored drawer with an animated AI orb character.

**Architecture:** A pure-function scoring engine (`auditEngine.ts`) feeds a multi-step bottom-drawer wizard (`AuditWizard.tsx`) wired into the existing `Layout.tsx` via an `isAuditOpen` boolean. An animated orb component (`AuditOrb.tsx`) lives both on the floating bubble and inside the drawer header, and a minimal Cal.com widget (`AuditBookingWidget.tsx`) renders at the end of results without colliding with the existing `BookingSection`.

**Tech Stack:** React 19, TypeScript, Motion (`motion/react`), Lucide React, Tailwind CSS 4, Cal.com embed script

---

## No Test Runner Installed

This project has no Vitest/Jest setup. Build verification is done with `npm run build` (TypeScript compile + Vite bundle). After each task, the verification step is:
1. Run `npm run build` — must exit 0 with no TypeScript errors
2. Run `npm run dev` and visually inspect in the browser

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/lib/auditEngine.ts` | Create | All TypeScript types + scoring + ROI formulas |
| `src/components/AuditOrb.tsx` | Create | Animated orb (idle / awake / active states) |
| `src/components/AuditBookingWidget.tsx` | Create | Minimal Cal.com embed for drawer context |
| `src/components/AuditWizard.tsx` | Create | Full drawer shell, state machine, all steps 1–10 |
| `src/components/Layout.tsx` | Modify | Wire bubble as interactive `<button>`, mount `<AuditWizard />` |

---

## Task 1: Scoring Engine and Types (`src/lib/auditEngine.ts`)

**Files:**
- Create: `src/lib/auditEngine.ts`

This is a pure function with no React dependency — build it first so all other tasks can import its types.

- [ ] **Step 1: Create the file with all type definitions**

```ts
// src/lib/auditEngine.ts

export type Industry =
  | "Home Services"
  | "Law Firm"
  | "Dental / Medical"
  | "Real Estate"
  | "E-commerce"
  | "Contractor"
  | "Other";

export type Pain =
  | "Missed calls & leads"
  | "Slow follow-up"
  | "Website doesn't convert"
  | "Too much manual admin"
  | "Hard to scale without hiring";

export type TeamSize = "Just me" | "2–5" | "6–15" | "16–50" | "50+";

export type Revenue =
  | "Under $10k"
  | "$10k–$30k"
  | "$30k–$100k"
  | "$100k+"
  | "Prefer not to say";

export type AfterHours =
  | "They hit voicemail and rarely call back"
  | "We have someone on-call (expensive)"
  | "We forward to my personal phone (exhausting)"
  | "We just miss the calls"
  | "We use a third-party answering service";

export type LeadVolume = "Under 20" | "20–50" | "50–150" | "150–500" | "500+";

export type Goal =
  | "Save time"
  | "Capture more leads"
  | "Cut costs"
  | "Scale without hiring"
  | "All of the above";

export type ServiceKey = "voice" | "chat" | "landing" | "automation";

export type Answers = {
  industry: Industry;
  industryCustom?: string;
  pain: Pain;
  teamSize: TeamSize;
  revenue: Revenue;
  afterHours: AfterHours;
  leadVolume: LeadVolume;
  goal: Goal;
};

export type ServiceRecommendation = {
  service: ServiceKey;
  score: number;
  roiMin: number;
  roiMax: number;
  label: string;
  description: string;
  insight: string;
};

export type AuditResult = {
  recommendations: ServiceRecommendation[];
  totalMin: number;
  totalMax: number;
};
```

- [ ] **Step 2: Add lookup tables**

```ts
const AVG_JOB_VALUE: Record<Industry, number> = {
  "Home Services": 450,
  "Law Firm": 2000,
  "Dental / Medical": 600,
  "Real Estate": 3500,
  "E-commerce": 150,
  Contractor: 800,
  Other: 500,
};

const LEAD_MIDPOINTS: Record<LeadVolume, number> = {
  "Under 20": 10,
  "20–50": 35,
  "50–150": 100,
  "150–500": 325,
  "500+": 600,
};

const TEAM_MIDPOINTS: Record<TeamSize, number> = {
  "Just me": 1,
  "2–5": 3,
  "6–15": 10,
  "16–50": 30,
  "50+": 60,
};

const SERVICE_PRIORITY: ServiceKey[] = ["voice", "chat", "landing", "automation"];

const DESCRIPTIONS: Record<ServiceKey, string> = {
  voice: "estimated monthly revenue from recovered missed calls",
  chat: "estimated monthly revenue from leads leaving your website",
  landing: "estimated monthly gain from improved conversion",
  automation: "estimated monthly time savings (in labor cost)",
};
```

- [ ] **Step 3: Add insight template function**

```ts
function buildInsight(service: ServiceKey, answers: Answers): string {
  const industryLabel =
    answers.industry === "Other" && answers.industryCustom
      ? answers.industryCustom
      : answers.industry;
  switch (service) {
    case "voice":
      return `Based on your ${answers.leadVolume} monthly leads and after-hours situation, you're leaving revenue on the table every night.`;
    case "chat":
      return `With ${answers.leadVolume} monthly leads coming in, a chat agent captures prospects even when your team is busy.`;
    case "landing":
      return `A high-converting landing page tailored to ${industryLabel} businesses can meaningfully lift your close rate.`;
    case "automation":
      return `For a team of ${answers.teamSize}, automating follow-up and admin could recover hours of billable time weekly.`;
  }
}
```

- [ ] **Step 4: Add scoring function**

```ts
function computeScores(answers: Answers): Record<ServiceKey, number> {
  const scores: Record<ServiceKey, number> = { voice: 0, chat: 0, landing: 0, automation: 0 };

  // Pain scoring
  const painMap: Partial<Record<Pain, Partial<Record<ServiceKey, number>>>> = {
    "Missed calls & leads":         { voice: 3, chat: 1, automation: 1 },
    "Slow follow-up":               { voice: 1, chat: 2, automation: 3 },
    "Website doesn't convert":      { chat: 2, landing: 3, automation: 1 },
    "Too much manual admin":        { voice: 1, chat: 1, automation: 3 },
    "Hard to scale without hiring": { voice: 2, chat: 1, landing: 1, automation: 3 },
  };

  // After-hours scoring
  const afterHoursMap: Partial<Record<AfterHours, Partial<Record<ServiceKey, number>>>> = {
    "They hit voicemail and rarely call back":   { voice: 3, chat: 1 },
    "We just miss the calls":                    { voice: 3, chat: 1 },
    "We have someone on-call (expensive)":       { voice: 3, automation: 1 },
    "We forward to my personal phone (exhausting)": { voice: 3, automation: 1 },
    "We use a third-party answering service":    { voice: 2, chat: 1, automation: 1 },
  };

  // Goal scoring
  const goalMap: Partial<Record<Goal, Partial<Record<ServiceKey, number>>>> = {
    "Capture more leads":    { voice: 2, chat: 2, landing: 2, automation: 1 },
    "Save time":             { voice: 1, chat: 1, automation: 3 },
    "Scale without hiring":  { voice: 2, chat: 2, landing: 1, automation: 3 },
    "Cut costs":             { voice: 1, chat: 1, automation: 2 },
    "All of the above":      { voice: 2, chat: 2, landing: 1, automation: 2 },
  };

  for (const [key, val] of Object.entries(painMap[answers.pain] ?? {})) {
    scores[key as ServiceKey] += val as number;
  }
  for (const [key, val] of Object.entries(afterHoursMap[answers.afterHours] ?? {})) {
    scores[key as ServiceKey] += val as number;
  }
  for (const [key, val] of Object.entries(goalMap[answers.goal] ?? {})) {
    scores[key as ServiceKey] += val as number;
  }

  return scores;
}
```

- [ ] **Step 5: Add ROI formula function**

```ts
function round50(n: number): number {
  return Math.round(n / 50) * 50;
}

function formatLabel(min: number, max: number): string {
  return `est. $${min.toLocaleString()}–$${max.toLocaleString()}/mo`;
}

function computeRoi(
  service: ServiceKey,
  answers: Answers
): { roiMin: number; roiMax: number; label: string } {
  const jobValue = AVG_JOB_VALUE[answers.industry];
  const leadMidpoint = LEAD_MIDPOINTS[answers.leadVolume];
  const teamMidpoint = TEAM_MIDPOINTS[answers.teamSize];

  // Initialize to 0 to satisfy TypeScript's "used before assigned" check on let-without-initializer
  let base = 0;
  switch (service) {
    case "voice":
      base = leadMidpoint * 0.35 * jobValue * 0.25;
      break;
    case "chat":
      base = leadMidpoint * 0.3 * jobValue * 0.2;
      break;
    case "landing":
      base = leadMidpoint * jobValue * 0.15;
      break;
    case "automation":
      base = teamMidpoint * 10 * 35;
      break;
  }
  const roiMin = round50(base * 0.8);
  const roiMax = round50(base * 1.3);
  return { roiMin, roiMax, label: formatLabel(roiMin, roiMax) };
}
```

- [ ] **Step 6: Add the main `runAuditEngine` export**

```ts
export function runAuditEngine(answers: Answers): AuditResult {
  const scores = computeScores(answers);

  const qualifying = SERVICE_PRIORITY.filter((s) => scores[s] >= 2).sort(
    (a, b) => scores[b] - scores[a]
  );
  const nonQualifying = SERVICE_PRIORITY.filter((s) => scores[s] < 2).sort(
    (a, b) => scores[b] - scores[a]
  );

  // Ensure min 2, max 4
  let selected = qualifying.slice(0, 4);
  if (selected.length < 2) {
    const needed = 2 - selected.length;
    selected = [...selected, ...nonQualifying.slice(0, needed)];
  }

  const recommendations: ServiceRecommendation[] = selected.map((service) => {
    const { roiMin, roiMax, label } = computeRoi(service, answers);
    return {
      service,
      score: scores[service],
      roiMin,
      roiMax,
      label,
      description: DESCRIPTIONS[service],
      insight: buildInsight(service, answers),
    };
  });

  const totalMin = recommendations.reduce((sum, r) => sum + r.roiMin, 0);
  const totalMax = recommendations.reduce((sum, r) => sum + r.roiMax, 0);

  return { recommendations, totalMin, totalMax };
}
```

- [ ] **Step 7: Verify build**

```bash
cd "/Users/talshani/Desktop/Elevate digiTal" && npm run build
```

Expected: exit 0, no TypeScript errors.

- [ ] **Step 8: Commit**

```bash
git add src/lib/auditEngine.ts
git commit -m "feat: add audit scoring engine with ROI formulas and all TypeScript types"
```

---

## Task 2: AuditOrb Component (`src/components/AuditOrb.tsx`)

**Files:**
- Create: `src/components/AuditOrb.tsx`

The orb uses Motion + inline styles (not Tailwind) because animation values are dynamic. It has three states: idle (slow pulse), awake (speech bubble + typewriter), active (inside drawer, brightness surge on `approveCount`).

- [ ] **Step 1: Create the file with the orb base and props interface**

```tsx
// src/components/AuditOrb.tsx
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "motion/react";

interface AuditOrbProps {
  size?: number;       // px, default 48
  state: "idle" | "awake" | "active" | "calculating";
  approveCount: number; // increment to trigger brightness surge; initial value 0 is skipped
}
```

- [ ] **Step 2: Add the typewriter hook**

```tsx
function useTypewriter(text: string, msPerChar: number, active: boolean) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) {
      setDisplayed("");
      setDone(false);
      return;
    }
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, msPerChar);
    return () => clearInterval(interval);
  }, [active, text, msPerChar]);

  return { displayed, done };
}
```

- [ ] **Step 3: Add the orb component**

```tsx
export function AuditOrb({ size = 48, state, approveCount }: AuditOrbProps) {
  const controls = useAnimation();
  const brightnessControls = useAnimation();
  const isFirstRender = useRef(true);

  // Idle pulse loop
  useEffect(() => {
    if (state === "idle") {
      controls.start({
        scale: [1, 1.08, 1],
        transition: { duration: 3, ease: "easeInOut", repeat: Infinity },
      });
    }
  }, [state, controls]);

  // Awake sequence (suspends idle pulse)
  useEffect(() => {
    if (state !== "awake") return;
    controls.stop();
    controls.start({
      scale: [1, 1.15, 1],
      transition: { duration: 0.2, ease: "easeOut" },
    });
  }, [state, controls]);

  // Active: resume slow pulse
  useEffect(() => {
    if (state !== "active") return;
    controls.start({
      scale: [1, 1.08, 1],
      transition: { duration: 3, ease: "easeInOut", repeat: Infinity },
    });
  }, [state, controls]);

  // Calculating: rapid pulse (600ms)
  useEffect(() => {
    if (state !== "calculating") return;
    controls.start({
      scale: [1, 1.2, 1],
      transition: { duration: 0.6, ease: "easeInOut", repeat: Infinity },
    });
  }, [state, controls]);

  // Brightness surge on approveCount change — skip initial mount
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    brightnessControls.start({
      filter: ["brightness(1)", "brightness(1.4)", "brightness(1)"],
      transition: { duration: 0.3, ease: "easeInOut" },
    });
  }, [approveCount, brightnessControls]);

  const orbStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: "50%",
    background: "radial-gradient(circle at 35% 35%, #a78bfa, #3b82f6 60%, #1e3a8a)",
    boxShadow: "0 0 20px 4px rgba(139,92,246,0.5)",
    flexShrink: 0,
  };

  return (
    <motion.div animate={brightnessControls} style={{ display: "inline-flex" }}>
      <motion.div animate={controls} style={orbStyle} />
    </motion.div>
  );
}
```

- [ ] **Step 4: Add the `AuditOrbWithBubble` variant (used on the floating bubble)**

This is the orb + the speech bubble — only used in `Layout.tsx`, not inside the drawer.

```tsx
const SPEECH_TEXT = "You should click it 👆";

export function AuditOrbWithBubble({
  size = 48,
  state,
  approveCount,
}: AuditOrbProps) {
  // Note: AuditOrbWithBubble is only used on the floating bubble (state = "idle" | "awake")
  const awake = state === "awake";
  const { displayed, done } = useTypewriter(SPEECH_TEXT, 80, awake);
  const controls = useAnimation();

  // Y bounce after typewriter done
  useEffect(() => {
    if (done) {
      controls.start({
        y: [0, -4, 0],
        transition: { duration: 0.4, ease: "easeInOut" },
      });
    }
  }, [done, controls]);

  return (
    <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
      {awake && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "white",
            color: "#1e293b",
            borderRadius: "12px",
            padding: "6px 10px",
            fontSize: "12px",
            fontWeight: 600,
            whiteSpace: "nowrap",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            pointerEvents: "none",
          }}
        >
          {displayed}
          {/* Speech bubble tail */}
          <span
            style={{
              position: "absolute",
              bottom: -6,
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid white",
            }}
          />
        </motion.div>
      )}
      <motion.div animate={controls}>
        <AuditOrb size={size} state={state} approveCount={approveCount} />
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 5: Verify build**

```bash
cd "/Users/talshani/Desktop/Elevate digiTal" && npm run build
```

Expected: exit 0.

- [ ] **Step 6: Commit**

```bash
git add src/components/AuditOrb.tsx
git commit -m "feat: add AuditOrb component with idle/awake/active animation states and typewriter speech bubble"
```

---

## Task 3: AuditBookingWidget (`src/components/AuditBookingWidget.tsx`)

**Files:**
- Create: `src/components/AuditBookingWidget.tsx`

Minimal Cal.com embed — unique id, unique script guard id, unique namespace. No layout shell. Same polling pattern as `BookingSection.tsx`.

- [ ] **Step 1: Create the component**

```tsx
// src/components/AuditBookingWidget.tsx
import { useEffect } from "react";

export function AuditBookingWidget() {
  useEffect(() => {
    function initCalEmbed() {
      const Cal = (window as any).Cal;
      if (!Cal) return;
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
    }

    if (!document.getElementById("cal-embed-script-audit")) {
      const script = document.createElement("script");
      script.id = "cal-embed-script-audit";
      script.type = "text/javascript";
      script.innerHTML = `
        (function (C, A, L) {
          let p = function (a, ar) { a.q.push(ar); };
          let d = C.document;
          C.Cal = C.Cal || function () {
            let cal = C.Cal;
            let ar = arguments;
            if (!cal.loaded) {
              cal.ns = {};
              cal.q = cal.q || [];
              d.head.appendChild(d.createElement("script")).src = A;
              cal.loaded = true;
            }
            if (ar[0] === L) {
              const api = function () { p(api, arguments); };
              const namespace = ar[1];
              api.q = api.q || [];
              if (typeof namespace === "string") {
                cal.ns[namespace] = cal.ns[namespace] || api;
                p(cal.ns[namespace], ar);
                p(cal, ["initNamespace", namespace]);
              } else p(cal, ar);
              return;
            }
            p(cal, ar);
          };
        })(window, "https://app.cal.com/embed/embed.js", "init");
      `;
      document.head.appendChild(script);
    }

    const interval = setInterval(() => {
      if ((window as any).Cal) {
        clearInterval(interval);
        initCalEmbed();
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="my-cal-inline-audit"
      style={{ width: "100%", height: "500px", overflow: "hidden" }}
      className="rounded-xl border border-white/10"
    />
  );
}
```

- [ ] **Step 2: Verify build**

```bash
cd "/Users/talshani/Desktop/Elevate digiTal" && npm run build
```

Expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/AuditBookingWidget.tsx
git commit -m "feat: add AuditBookingWidget — minimal Cal.com embed for drawer context"
```

---

## Task 4: AuditWizard — Drawer Shell + Steps 1–7 (`src/components/AuditWizard.tsx`)

**Files:**
- Create: `src/components/AuditWizard.tsx`

Build the drawer shell, state machine, header, progress bar, ESC confirmation, and the 7 discovery step cards. Leave steps 8–10 as `null` placeholders for now.

- [ ] **Step 1: Create the file with imports, types, and initial state**

```tsx
// src/components/AuditWizard.tsx
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, Phone, MessageSquare, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AuditOrb } from "@/components/AuditOrb";
import { AuditBookingWidget } from "@/components/AuditBookingWidget";
import {
  runAuditEngine,
  type Answers,
  type AuditResult,
  type Industry,
  type Pain,
  type TeamSize,
  type Revenue,
  type AfterHours,
  type LeadVolume,
  type Goal,
  type ServiceKey,
} from "@/lib/auditEngine";

interface AuditWizardProps {
  open: boolean;
  onClose: () => void;
}

type WizardState = {
  step: number; // 0=closed, 1-7=steps, 8=lead gate, 9=calculating, 10=results+booking
  answers: Partial<Answers>;
  name: string;
  email: string;
  encouragementVisible: boolean;
  approveCount: number;
  auditResult: AuditResult | null;
  showEscConfirm: boolean;
};

const INITIAL_STATE: WizardState = {
  step: 1,
  answers: {},
  name: "",
  email: "",
  encouragementVisible: false,
  approveCount: 0,
  auditResult: null,
  showEscConfirm: false,
};
```

- [ ] **Step 2: Add encouragement text lookup**

```tsx
const ENCOURAGEMENT: Record<number, string | ((answers: Partial<Answers>) => string)> = {
  1: "Great — we know this space well.",
  2: "You're not alone — this is the #1 issue we solve.",
  3: "Perfect size to see immediate ROI from AI.",
  4: (a) =>
    a.revenue === "Prefer not to say"
      ? "No problem — we'll use industry averages."
      : "This helps us give you accurate numbers.",
  5: "That's significant — here's what you're leaving on the table.",
  6: "Got it — let's calculate your opportunity.",
  7: "That's exactly what we built this for.",
};

function getEncouragement(step: number, answers: Partial<Answers>): string {
  const val = ENCOURAGEMENT[step];
  if (!val) return "";
  return typeof val === "function" ? val(answers) : val;
}
```

- [ ] **Step 3: Add the main AuditWizard component with state machine**

```tsx
export function AuditWizard({ open, onClose }: AuditWizardProps) {
  const [state, setState] = useState<WizardState>(INITIAL_STATE);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset state 300ms after drawer closes (after exit animation)
  useEffect(() => {
    if (!open) {
      closeTimer.current = setTimeout(() => {
        setState(INITIAL_STATE);
      }, 300);
    }
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, [open]);

  // ESC key handler
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape" || !open) return;
      if (state.step <= 1) {
        onClose();
      } else {
        setState((s) => ({ ...s, showEscConfirm: true }));
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, state.step, onClose]);

  // Focus trap — keep focus inside the drawer while open
  const drawerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const drawer = drawerRef.current;
    if (!drawer) return;

    // Focus the drawer itself on open
    drawer.focus();

    function handleTab(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const focusable = drawer!.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    }
    window.addEventListener("keydown", handleTab);
    return () => window.removeEventListener("keydown", handleTab);
  }, [open]);

  function selectAnswer(field: keyof Answers, value: string) {
    setState((s) => ({
      ...s,
      answers: { ...s.answers, [field]: value },
      encouragementVisible: true,
      approveCount: s.approveCount + 1,
    }));
    // Auto-advance after 1200ms encouragement
    setTimeout(() => {
      setState((s) => ({
        ...s,
        encouragementVisible: false,
        step: s.step + 1,
      }));
    }, 1200);
  }

  function goBack() {
    setState((s) => ({
      ...s,
      step: Math.max(1, s.step - 1),
      encouragementVisible: false,
    }));
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-[49]"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Quick Business AI Audit"
            tabIndex={-1}
            initial={{ translateY: "100%" }}
            animate={{ translateY: "0%" }}
            exit={{ translateY: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[680px] max-h-[85dvh] z-50 flex flex-col rounded-t-2xl overflow-hidden focus:outline-none"
            style={{ background: "#0f172a", color: "white" }}
          >
            {/* Header — steps 1–7 only */}
            {state.step >= 1 && state.step <= 7 && (
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 shrink-0">
                {state.step > 1 && (
                  <button
                    onClick={goBack}
                    className="text-white/60 hover:text-white transition-colors"
                    aria-label="Go back"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                )}
                {/* Responsive orb: 32px mobile, 40px desktop — use a wrapper div */}
                <span className="sm:hidden"><AuditOrb size={32} state="active" approveCount={state.approveCount} /></span>
                <span className="hidden sm:inline"><AuditOrb size={40} state="active" approveCount={state.approveCount} /></span>
                <span className="text-xs text-white/60 font-medium">
                  Step {state.step} of 7
                </span>
                {/* Progress bar */}
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden" role="progressbar" aria-valuenow={state.step} aria-valuemax={7}>
                  <motion.div
                    className="h-full bg-blue-500 rounded-full"
                    animate={{ width: `${(state.step / 7) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <button
                  onClick={() => state.step <= 1 ? onClose() : setState((s) => ({ ...s, showEscConfirm: true }))}
                  className="text-white/60 hover:text-white transition-colors ml-2"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Header — steps 8–10: close button only */}
            {state.step >= 8 && (
              <div className="flex items-center justify-end px-5 py-4 border-b border-white/10 shrink-0">
                <button
                  onClick={onClose}
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* ESC Confirmation overlay */}
            {state.showEscConfirm && (
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative bg-slate-800 rounded-xl p-6 mx-4 text-center shadow-2xl">
                  <p className="text-white font-semibold mb-2">Are you sure?</p>
                  <p className="text-white/60 text-sm mb-5">You'll lose your progress.</p>
                  <div className="flex gap-3 justify-center">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setState((s) => ({ ...s, showEscConfirm: false }))}
                    >
                      Keep Going
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={onClose}
                    >
                      Close Anyway
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1 px-5 py-6">
              <StepContent state={state} setState={setState} selectAnswer={selectAnswer} onClose={onClose} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 4: Add the `StepContent` dispatcher and Steps 1–7**

```tsx
interface StepContentProps {
  state: WizardState;
  setState: React.Dispatch<React.SetStateAction<WizardState>>;
  selectAnswer: (field: keyof Answers, value: string) => void;
  onClose: () => void;
}

function StepContent({ state, setState, selectAnswer, onClose }: StepContentProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={state.step}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.2 }}
      >
        {state.step === 1 && <Step1 state={state} selectAnswer={selectAnswer} setState={setState} />}
        {state.step === 2 && <StepOptions step={2} field="pain" headline="What's your #1 growth bottleneck right now?" options={["Missed calls & leads","Slow follow-up","Website doesn't convert","Too much manual admin","Hard to scale without hiring"] as Pain[]} state={state} selectAnswer={selectAnswer} />}
        {state.step === 3 && <StepOptions step={3} field="teamSize" headline="How many people are on your team?" options={["Just me","2–5","6–15","16–50","50+"] as TeamSize[]} state={state} selectAnswer={selectAnswer} />}
        {state.step === 4 && <StepOptions step={4} field="revenue" headline="Roughly, what's your current monthly revenue?" subLabel="Helps us size your opportunity accurately." options={["Under $10k","$10k–$30k","$30k–$100k","$100k+","Prefer not to say"] as Revenue[]} state={state} selectAnswer={selectAnswer} />}
        {state.step === 5 && <StepOptions step={5} field="afterHours" headline="What happens when someone calls after office hours?" options={["They hit voicemail and rarely call back","We have someone on-call (expensive)","We forward to my personal phone (exhausting)","We just miss the calls","We use a third-party answering service"] as AfterHours[]} state={state} selectAnswer={selectAnswer} />}
        {state.step === 6 && <StepOptions step={6} field="leadVolume" headline="How many inbound leads or calls do you get per month?" options={["Under 20","20–50","50–150","150–500","500+"] as LeadVolume[]} state={state} selectAnswer={selectAnswer} />}
        {state.step === 7 && <StepOptions step={7} field="goal" headline="What matters most to you right now?" options={["Save time","Capture more leads","Cut costs","Scale without hiring","All of the above"] as Goal[]} state={state} selectAnswer={selectAnswer} />}
        {state.step === 8 && <StepLeadGate state={state} setState={setState} />}
        {state.step === 9 && <StepCalculating state={state} setState={setState} />}
        {state.step === 10 && <StepResults state={state} />}
      </motion.div>
    </AnimatePresence>
  );
}

// Step 1 — Industry (special: "Other" reveals text input)
function Step1({ state, selectAnswer, setState }: { state: WizardState; selectAnswer: (field: keyof Answers, value: string) => void; setState: React.Dispatch<React.SetStateAction<WizardState>> }) {
  const [customText, setCustomText] = useState("");
  const industries: Industry[] = ["Home Services","Law Firm","Dental / Medical","Real Estate","E-commerce","Contractor","Other"];
  const selected = state.answers.industry;

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">What type of business do you run?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
        {industries.map((opt) => (
          <OptionCard
            key={opt}
            label={opt}
            selected={selected === opt}
            onClick={() => {
              if (opt !== "Other") {
                selectAnswer("industry", opt);
              } else {
                setState((s) => ({ ...s, answers: { ...s.answers, industry: "Other" } }));
              }
            }}
          />
        ))}
      </div>
      {selected === "Other" && (
        <div className="mt-4">
          <input
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/40 border border-white/20 focus:outline-none focus:border-blue-400"
            placeholder="Describe your business..."
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            autoFocus
          />
          <Button
            className="mt-3 w-full"
            disabled={customText.trim() === ""}
            onClick={() => {
              setState((s) => ({
                ...s,
                answers: { ...s.answers, industry: "Other", industryCustom: customText.trim() },
                encouragementVisible: true,
                approveCount: s.approveCount + 1,
              }));
              setTimeout(() => {
                setState((s) => ({ ...s, encouragementVisible: false, step: s.step + 1 }));
              }, 1200);
            }}
          >
            Continue →
          </Button>
        </div>
      )}
      {state.encouragementVisible && (
        <EncouragementText text={getEncouragement(1, state.answers)} />
      )}
    </div>
  );
}

// Generic step with option cards
function StepOptions<T extends string>({
  step,
  field,
  headline,
  subLabel,
  options,
  state,
  selectAnswer,
}: {
  step: number;
  field: keyof Answers;
  headline: string;
  subLabel?: string;
  options: T[];
  state: WizardState;
  selectAnswer: (field: keyof Answers, value: string) => void;
}) {
  const selected = state.answers[field] as string | undefined;
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">{headline}</h2>
      {subLabel && <p className="text-white/50 text-sm mb-4">{subLabel}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        {options.map((opt) => (
          <OptionCard
            key={opt}
            label={opt}
            selected={selected === opt}
            onClick={() => !state.encouragementVisible && selectAnswer(field, opt)}
          />
        ))}
      </div>
      {state.encouragementVisible && (
        <EncouragementText text={getEncouragement(step, state.answers)} />
      )}
    </div>
  );
}

// Reusable option card
function OptionCard({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      aria-pressed={selected}
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-150 ${
        selected
          ? "bg-blue-600 border-blue-500 text-white"
          : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20"
      }`}
    >
      {label}
    </button>
  );
}

// Encouragement text
function EncouragementText({ text }: { text: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 text-emerald-400 text-sm font-medium"
    >
      ✓ {text}
    </motion.p>
  );
}
```

- [ ] **Step 5: Verify build**

```bash
cd "/Users/talshani/Desktop/Elevate digiTal" && npm run build
```

Expected: exit 0.

- [ ] **Step 6: Commit**

```bash
git add src/components/AuditWizard.tsx
git commit -m "feat: add AuditWizard drawer shell, state machine, steps 1-7, option cards"
```

---

## Task 5: AuditWizard — Lead Gate, Calculating, Results + Booking (Steps 8–10)

**Files:**
- Modify: `src/components/AuditWizard.tsx` — add `StepLeadGate`, `StepCalculating`, `StepResults`

- [ ] **Step 1: Add `StepLeadGate` (Step 8)**

Add this function inside `AuditWizard.tsx`:

```tsx
function StepLeadGate({ state, setState }: { state: WizardState; setState: React.Dispatch<React.SetStateAction<WizardState>> }) {
  const [emailError, setEmailError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/.+@.+\..+/.test(state.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    // v1: client-side only lead capture
    try {
      localStorage.setItem(
        "elevate_audit_lead",
        JSON.stringify({ name: state.name, email: state.email, answers: state.answers, timestamp: Date.now() })
      );
    } catch {}
    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "audit_lead_captured", { name: state.name, email: state.email });
    }
    setState((s) => ({ ...s, step: 9 }));
  }

  return (
    <div className="max-w-md mx-auto text-center py-4">
      <h2 className="text-2xl font-bold text-white mb-2">You're 30 seconds away from your results.</h2>
      <p className="text-white/60 mb-8">Where should we send your personalized AI audit?</p>
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <input
          className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/40 border border-white/20 focus:outline-none focus:border-blue-400"
          placeholder="First Name"
          required
          value={state.name}
          onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
        />
        <div>
          <input
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/40 border border-white/20 focus:outline-none focus:border-blue-400"
            placeholder="Work Email"
            type="email"
            required
            value={state.email}
            onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))}
          />
          {emailError && <p className="text-red-400 text-xs mt-1">{emailError}</p>}
        </div>
        <Button type="submit" className="w-full" icon>
          Show Me My Audit
        </Button>
        <p className="text-center text-white/30 text-xs">No spam. We'll also send you a copy of your results.</p>
      </form>
    </div>
  );
}
```

- [ ] **Step 2: Add `StepCalculating` (Step 9)**

```tsx
const CALC_TEXTS = [
  "Analyzing your business...",
  "Identifying opportunities...",
  "Calculating your ROI...",
];

// Timestamps: text[0] shows 0–400ms, fades out 400–500ms; text[1] shows 500–900ms, fades out 900–1000ms; text[2] shows 1000–1500ms
function StepCalculating({ state, setState }: { state: WizardState; setState: React.Dispatch<React.SetStateAction<WizardState>> }) {
  const [textIndex, setTextIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const sequence: Array<{ at: number; action: () => void }> = [
      { at: 400, action: () => setVisible(false) },
      { at: 500, action: () => { setTextIndex(1); setVisible(true); } },
      { at: 900, action: () => setVisible(false) },
      { at: 1000, action: () => { setTextIndex(2); setVisible(true); } },
      {
        at: 1500,
        action: () => {
          const result = runAuditEngine(state.answers as Answers);
          setState((s) => ({ ...s, auditResult: result, step: 10 }));
        },
      },
    ];

    const timers = sequence.map(({ at, action }) => setTimeout(action, at));
    return () => timers.forEach(clearTimeout);
  }, []); // intentionally runs once on mount

  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6">
      <AuditOrb size={64} state="calculating" approveCount={0} />
      <AnimatePresence mode="wait">
        {visible && (
          <motion.p
            key={textIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="text-white/80 text-lg font-medium"
          >
            {CALC_TEXTS[textIndex]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 3: Add `StepResults` (Step 10)**

```tsx
const SERVICE_ICONS: Record<ServiceKey, React.ReactNode> = {
  voice: <Phone className="h-5 w-5" />,
  chat: <MessageSquare className="h-5 w-5" />,
  landing: <Globe className="h-5 w-5" />,
  automation: <Zap className="h-5 w-5" />,
};

const SERVICE_NAMES: Record<ServiceKey, string> = {
  voice: "AI Voice Agent",
  chat: "AI Chat Agent",
  landing: "AI Powered Landing Page",
  automation: "Custom Automation",
};

function StepResults({ state }: { state: WizardState }) {
  const { auditResult, name } = state;
  if (!auditResult) return null;

  return (
    <div className="pb-8">
      <h2 className="text-2xl font-bold text-white mb-6">
        Here's your AI opportunity snapshot, {name}
      </h2>

      {/* Recommendation cards */}
      <div className="space-y-4">
        {auditResult.recommendations.map((rec) => (
          <div key={rec.service} className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-blue-400">{SERVICE_ICONS[rec.service]}</span>
              <span className="text-white font-semibold">{SERVICE_NAMES[rec.service]}</span>
            </div>
            <p className="text-white/60 text-sm mb-3">{rec.insight}</p>
            <p className="text-emerald-400 font-bold text-lg">{rec.label}</p>
            <p className="text-white/40 text-xs mt-1">{rec.description}</p>
          </div>
        ))}
      </div>

      {/* Total bar */}
      <div className="mt-6 p-5 bg-blue-600/20 border border-blue-500/30 rounded-xl">
        <p className="text-white/60 text-sm mb-1">Total estimated monthly opportunity:</p>
        <p className="text-white font-bold text-2xl">
          ${auditResult.totalMin.toLocaleString()} – ${auditResult.totalMax.toLocaleString()}
        </p>
      </div>

      {/* Divider + Booking */}
      <div className="my-8 border-t border-white/10" />
      <h3 className="text-xl font-bold text-white mb-2">Want us to build this for you?</h3>
      <p className="text-white/60 text-sm mb-6">
        Book a free 30-min strategy call. We'll walk through your audit live and show you exactly what we'd build.
      </p>
      <AuditBookingWidget />
    </div>
  );
}
```

- [ ] **Step 4: Verify build**

```bash
cd "/Users/talshani/Desktop/Elevate digiTal" && npm run build
```

Expected: exit 0.

- [ ] **Step 5: Commit**

```bash
git add src/components/AuditWizard.tsx
git commit -m "feat: add lead gate, calculating animation, and results + booking steps to AuditWizard"
```

---

## Task 6: Wire Layout.tsx — Bubble as Interactive Button + Mount AuditWizard

**Files:**
- Modify: `src/components/Layout.tsx`

Replace the static `<div>` bubble with a conditional `<button>` that mounts `AuditWizard` and shows `AuditOrbWithBubble`.

- [ ] **Step 1: Update imports in Layout.tsx**

Remove `MessageSquare` from lucide-react (no longer needed). Add:
```tsx
import { AuditOrbWithBubble } from "./AuditOrb";
import { AuditWizard } from "./AuditWizard";
```

- [ ] **Step 2: Add state variables to the `Layout` function**

Add inside `Layout()` after existing state:
```tsx
const [isAuditOpen, setIsAuditOpen] = useState(false);
const [hasBeenOpened, setHasBeenOpened] = useState(false);
const [orbAwake, setOrbAwake] = useState(false);

// Trigger awake state 3 seconds after initial mount
useEffect(() => {
  const timer = setTimeout(() => setOrbAwake(true), 3000);
  return () => clearTimeout(timer);
}, []); // empty deps = runs once on mount

const orbState = orbAwake && !hasBeenOpened ? "awake" : "idle";
```

- [ ] **Step 3: Replace the bubble `<div>` with a conditional `<button>` and mount the wizard**

Replace the entire `{/* Floating Chat Bubble */}` block and the closing `</div>` with:

```tsx
      <Footer />

      {/* Floating AI Audit Bubble — conditionally rendered for AnimatePresence exit */}
      <AnimatePresence>
        {!isAuditOpen && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => {
              setIsAuditOpen(true);
              setHasBeenOpened(true);
            }}
            aria-label="Open Quick Business AI Audit"
            className="fixed bottom-6 right-6 z-40 flex items-center gap-3 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg select-none cursor-pointer hover:bg-blue-700 transition-colors"
          >
            <AuditOrbWithBubble size={32} state={orbState} approveCount={0} />
            <span className="text-sm font-semibold leading-tight hidden sm:inline">
              Quick Business AI Audit
            </span>
            <span className="absolute -top-1 -right-1 flex h-3 w-3" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AuditWizard
        open={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
      />
    </div>
  );
}
```

- [ ] **Step 4: Remove the now-unused `MessageSquare` import**

The import line `import { MessageSquare } from "lucide-react";` should be removed (or if other components use it, check first with grep):

```bash
grep -r "MessageSquare" /Users/talshani/Desktop/Elevate\ digiTal/src/
```

If only `Layout.tsx` uses it, remove the import. `AuditOrb.tsx` does not import from lucide — `MessageSquare` is used in the service icon map inside `AuditWizard.tsx`.

- [ ] **Step 5: Verify build**

```bash
cd "/Users/talshani/Desktop/Elevate digiTal" && npm run build
```

Expected: exit 0, no TypeScript errors.

- [ ] **Step 6: Smoke-test in dev server**

```bash
cd "/Users/talshani/Desktop/Elevate digiTal" && npm run dev
```

Open browser at `http://localhost:5173`. Verify:
1. Floating bubble appears bottom-right
2. After 3 seconds, speech bubble shows "You should click it 👆" with typewriter effect
3. Clicking the bubble opens the drawer (slides up from bottom)
4. Step 1 renders with industry options
5. Selecting an option shows encouragement text, advances to step 2
6. Back chevron returns to previous step
7. ✕ button closes the drawer; step ≥ 2 shows confirmation
8. Completing all 7 steps shows lead gate
9. Submitting lead gate shows calculating animation, then results card
10. Results card shows recommendation cards with ROI numbers
11. Cal.com booking widget loads below results

- [ ] **Step 7: Commit**

```bash
git add src/components/Layout.tsx
git commit -m "feat: wire audit bubble as interactive button with AuditOrbWithBubble and mount AuditWizard"
```

---

## Task 7: Final Polish and Production Push

**Files:** No new files — final verification and deploy.

- [ ] **Step 1: Full build check**

```bash
cd "/Users/talshani/Desktop/Elevate digiTal" && npm run build
```

Expected: exit 0.

- [ ] **Step 2: Test key edge cases in dev server**

- Select "Other" for industry → confirm text input appears, Continue button disabled when empty, enabled after typing
- Select "Prefer not to say" for revenue → confirm encouragement says "No problem — we'll use industry averages."
- Complete wizard without revenue → results still render (uses `AVG_JOB_VALUE` fallback)
- Open wizard on a page that also has `BookingSection` (e.g., `/pricing`) → confirm both Cal.com widgets load without collision
- ESC on step 1 → closes immediately; ESC on step 3 → shows confirmation

- [ ] **Step 3: Push to production**

```bash
cd "/Users/talshani/Desktop/Elevate digiTal" && git push origin main
```

- [ ] **Step 4: Verify production**

Open the live site. Confirm the audit bubble is present on all pages and the full wizard flow works end-to-end.
