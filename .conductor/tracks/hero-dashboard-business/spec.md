# Track: Hero Dashboard — Business Owner Redesign

**Type**: refactor
**Status**: in-progress
**Created**: 2026-03-15

## Goal
Replace the developer-facing code/terminal widget with a clean, visual ROI dashboard that immediately resonates with non-technical US small business owners.

## Background
The previous iteration used monospace font, `//` comments, `=` assignment syntax, and macOS window chrome — all signals that read as "software tool" to a developer audience. The target audience (plumbers, dentists, law firms, contractors) will not find this trustworthy or relatable. They need to see familiar business metrics presented the way they'd appear in tools like Stripe, HubSpot, or their accounting software.

## Scope
### In scope
- Replace the dark terminal widget with a white/light clean card
- Show 7 metrics with icons, big readable numbers, and plain English labels
- Group metrics visually: funnel metrics (top) → time saved (middle) → revenue (bottom, highlighted)
- Keep the pulsing "live" indicator (business owners like seeing things are active)

### Out of scope
- Animating individual numbers (counters)
- Fetching real data
- Changing anything outside the hero right-column widget

## Before / After
| Before | After |
|---|---|
| Dark bg, monospace, `//` comments | White card, Inter font, plain English |
| `landingPageVisits = 4,507` | 👁 Website Visits **4,507** |
| Terminal chrome | Clean header with "AI Results · This Month" |
| Code aesthetic | SaaS analytics dashboard aesthetic |

## Files touched
- `src/pages/Home.tsx` — replace lines ~81–150 (widget JSX only)

## Implementation plan

### Phase 1: Redesign widget JSX
- [ ] White card: `bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden`
- [ ] Header bar: light slate bg, plain "AI Results · This Month" label, pulsing green dot
- [ ] 2×2 grid of metric tiles (Website Visits, Leads Captured, Calls Handled, Leads Qualified) with Lucide icons + big numbers
- [ ] Hours Saved row (full width, amber accent)
- [ ] Revenue footer section: emerald-tinted bg, two revenue stats + total

### Phase 2: Verify
- [ ] `npm run build` passes
- [ ] Check visually at localhost:3002 — readable, no code syntax visible
