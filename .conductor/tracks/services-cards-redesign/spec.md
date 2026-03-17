# Track: Services Cards Redesign — Clean, Business-Owner Focused

**Type**: refactor
**Status**: planning
**Created**: 2026-03-15

## Goal
Replace the visually chaotic multi-gradient split-card layout with a clean, professional card design that clearly communicates value — inspired by how Stripe, Intercom, and Linear present their feature grids.

## Background
The current "split card" approach (4 different gradient colors on top, white below) creates visual noise. Research on top SaaS sites (Stripe, Linear, Attentive, HubSpot) shows the most effective services sections:
- Use a single consistent accent color — not a different gradient per card
- Lead with a benefit headline, support with description
- Show one clear outcome metric per service (not buried in callout boxes)
- Keep cards clean and scannable with generous whitespace

## What the research says
- **Stripe**: white card, single colored icon, bold title, 2-3 line benefit description, subtle CTA
- **Linear**: icon + short bold title + one sentence — extreme restraint, premium feel
- **HubSpot/Intercom**: add one prominent outcome metric, but inline (not as a header takeover)
- **Key principle**: business owners scan, they don't read — one hierarchy: icon → title → outcome stat → description → CTA

## Before / After

**Before (current — broken):**
- 4 different gradient backgrounds (blue/violet/cyan/emerald) = visual chaos
- Split card: gradient header zone + white body zone = fragmented
- "What this means for you" callout box = redundant, cluttered

**After (target):**
```
┌──────────────────────────────────────────────────────┐
│  [blue icon square]  AI Voice Agents                 │
│                                                      │
│  Never miss another call. 24/7 intelligent voice     │
│  agents that book appointments and qualify leads.    │
│                                                      │
│  ✦ 15–20 extra bookings/month, on average            │  ← emerald, bold
│                                                      │
│  Learn more →                                        │
└──────────────────────────────────────────────────────┘
```

- **Single consistent blue icon** across all 4 cards (no per-card gradient colors)
- **Clean white card** with 1px border + subtle shadow
- **Outcome stat** styled as a single prominent emerald line with a small ✦ or arrow prefix
- **Short description** (2 lines max)
- **"Learn more →"** ghost CTA at bottom
- **Hover**: blue left border appears (`border-l-4 border-blue-500`) + shadow lifts — gives interactivity without color chaos

## Files touched
- `src/pages/Home.tsx` — services grid JSX + remove `serviceGradients` + remove `serviceValueStatements` constants

## Out of scope
- Changing service data (`src/data/services.ts`)
- Changing the section heading
- Redesigning other sections

## Implementation plan

### Phase 1: Clean up constants + redesign cards
- [ ] Remove `serviceGradients` and `serviceValueStatements` from Home.tsx
- [ ] Replace services grid JSX with clean white card design
- [ ] Consistent blue icon treatment across all cards
- [ ] Inline emerald outcome stat line
- [ ] Hover: `border-l-4 border-l-blue-500` transition

### Phase 2: Verify
- [ ] `npm run build` passes
- [ ] Check all 4 cards look consistent at localhost:3002
- [ ] Confirm no color chaos — all cards uniform
