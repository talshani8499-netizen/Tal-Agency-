# Elevate Digital — Design System Reference

> Living reference for tokens, components, animations, and utility classes.
> Source of truth: `src/index.css` (@theme block) and `src/components/ui/`.

---

## Token Reference

### Brand Palette

| Token              | Value     | Use                        |
|--------------------|-----------|----------------------------|
| `brand-50`         | `#EFF6FF` | Tinted backgrounds         |
| `brand-100`        | `#DBEAFE` | Badge fills, subtle tints  |
| `brand-500`        | `#3B82F6` | Accent icons, stat units   |
| `brand-600`        | `#2563EB` | Primary buttons, links     |
| `brand-700`        | `#1D4ED8` | Hover state                |
| `brand-900`        | `#1E3A8A` | Deep brand on dark         |

### Ink (Neutral) Scale

| Token       | Value     | Use                            |
|-------------|-----------|--------------------------------|
| `ink-950`   | `#0F172A` | Headings, high-contrast text   |
| `ink-700`   | `#334155` | Body text (darker contexts)    |
| `ink-500`   | `#64748B` | Secondary / muted text         |
| `ink-300`   | `#CBD5E1` | Borders, dividers              |
| `ink-100`   | `#F1F5F9` | Subtle section backgrounds     |
| `ink-50`    | `#F8FAFC` | Page background                |

### Surface Tokens

| Token             | Value     | Use                         |
|-------------------|-----------|-----------------------------|
| `surface-0`       | `#FFFFFF` | Cards, modals               |
| `surface-1`       | `#F8FAFC` | Default page background     |
| `surface-2`       | `#F1F5F9` | Alternate section fill      |
| `surface-dark`    | `#0F172A` | Dark hero / CTA sections    |
| `surface-mid`     | `#1E293B` | Secondary dark surface      |

### Semantic / Status

| Token           | Value     |
|-----------------|-----------|
| `success`       | `#059669` |
| `success-bg`    | `#ECFDF5` |
| `warning`       | `#D97706` |
| `warning-bg`    | `#FFFBEB` |
| `error`         | `#DC2626` |

### Spacing

| Token               | Value  | Use                        |
|---------------------|--------|----------------------------|
| `space-section-y`   | `5rem` | Standard section padding   |
| `space-section-y-lg`| `7rem` | Large section padding      |

### Radius

| Token          | Value   |
|----------------|---------|
| `radius-card`  | `12px`  |
| `radius-badge` | `6px`   |
| `radius-pill`  | `999px` |

### Shadows

| Token              | Use                                       |
|--------------------|-------------------------------------------|
| `shadow-card`      | Default card elevation                    |
| `shadow-card-hover`| Card hover state elevation                |
| `shadow-glow-blue` | Focused / highlighted card glow           |
| `shadow-glow-md`   | Larger hero / feature glow                |

---

## Typography

| Element    | Font             | Weight    | Size (desktop)  | Letter-spacing |
|------------|------------------|-----------|-----------------|----------------|
| Display    | Cal Sans / Inter | 700–800   | 3rem–4rem       | -0.02em        |
| H1         | Inter            | 800       | 2.25rem+        | -0.02em        |
| H2         | Inter            | 700       | 1.875rem        | -0.02em        |
| H3         | Inter            | 600       | 1.25rem         | -0.02em        |
| Body       | Inter            | 400       | 1rem            | 0              |
| Small/Muted| Inter            | 400–500   | 0.875rem        | 0              |
| Badge/Label| Inter            | 600       | 0.75rem         | +0.04em        |
| Stat       | Inter            | 800       | 2.25–3rem       | 0 (tabular-nums)|

Loaded weights: 300, 400, 500, 600, 700, 800.

---

## Component Inventory

All components are named exports from `src/components/ui/index.ts`.

### Button
```ts
variant?: "primary" | "secondary" | "ghost"  // default: "primary"
size?:    "sm" | "md" | "lg"                 // default: "md"
href?:    string                             // renders as <Link> if provided
icon?:    boolean                            // appends ArrowRight icon
```

### Card / SectionHeading
- `Card` — thin wrapper div with `card-panel` styling; accepts all `div` props.
- `SectionHeading` — eyebrow + title + description heading block.

### CTABanner
No props — full-width pre-configured CTA block (legacy; use CTABand for new pages).

### FAQAccordion
```ts
faqs: { question: string; answer: string }[]
```

### HeroSection
```ts
variant?:         "light" | "dark" | "gradient"  // default: "gradient"
headline:         ReactNode                       // required
subheadline?:     string
overline?:        string                          // badge above headline
primaryCTA:       { label: string; href: string } // required
secondaryCTA?:    { label: string; href: string }
trustStrip?:      ReactNode
backgroundImage?: string                          // overrides variant bg
children?:        ReactNode
```

### StatBar
```ts
stats:    { value: number; unit: string; label: string }[]  // required
variant?: "light" | "dark"   // default: "light"
animate?: boolean             // count-up on scroll (default: true)
```

### FeatureGrid
```ts
features: { icon: LucideIcon; title: string; description: string; highlight?: boolean }[]
columns?: 2 | 3              // default: 3
variant?: "cards" | "list" | "icons-only"  // default: "cards"
```

### TestimonialCard
```ts
quote:     string  // required
name:      string  // required
business:  string  // required
trade:     string  // required
rating:    number  // 1–5
avatar?:   string  // image URL
variant?:  "featured" | "compact"  // default: "compact"
```

### CTABand
```ts
headline:    string  // required
supporting?: string
buttonLabel: string  // required
buttonHref:  string  // required
variant?:    "blue" | "dark" | "bordered"  // default: "blue"
```

### TradeToggle
```ts
trades:       { id: string; label: string; icon: LucideIcon; content: ReactNode }[]
defaultTrade?: string  // defaults to trades[0].id
```

### ComparisonTable
```ts
rows:       { label: string; before: string; after: string }[]
leftLabel:  string  // required (e.g. "Without Elevate")
rightLabel: string  // required (e.g. "With Elevate")
variant?:   "before-after" | "competitor"
```

### PricingCard
```ts
tier: {
  id:             string
  name:           string
  subtitle:       string
  targetAudience: string
  setupFee:       string
  monthlyFee:     string
  popular:        boolean
  features:       string[]
  ctaText:        string
  ctaLink:        string
}
featured?: boolean  // defaults to tier.popular
```

### ProcessSteps
```ts
steps: { number: number; title: string; description: string; icon?: LucideIcon }[]
orientation?: "vertical" | "horizontal"  // default: "vertical"
animate?:     boolean                     // default: true
```

---

## Animation Variants (`src/components/ui/animations.ts`)

Import via: `import { fadeUp, stagger, ... } from "@/components/ui/animations"`

| Name          | Effect                                    | Typical use                        |
|---------------|-------------------------------------------|------------------------------------|
| `fadeUp`      | Opacity 0→1, y +24→0, 0.6s spring        | Individual cards, headlines        |
| `fadeIn`      | Opacity 0→1, 0.5s ease-out               | Overlays, images                   |
| `stagger`     | Staggers children 80ms apart             | Grid/list parents                  |
| `staggerSlow` | Staggers children 120ms apart            | Wider layouts, fewer items         |
| `scaleIn`     | Opacity + scale 0.94→1, 0.5s spring      | Modals, badges                     |
| `slideLeft`   | Opacity + x +32→0, 0.6s spring           | Right-origin content               |
| `slideRight`  | Opacity + x -32→0, 0.6s spring           | Left-origin content                |

All variants use the `hidden` / `visible` convention and pair with `motion/react`.

---

## Utility Class Reference

| Class                | Purpose                                                    |
|----------------------|------------------------------------------------------------|
| `.card-panel`        | White card with border, `radius-card`, `shadow-card`, hover elevation |
| `.glass-panel`       | Like card-panel — for light sections                       |
| `.glass-panel-dark`  | Frosted glass on dark backgrounds (rgba + blur)            |
| `.glass-panel-light` | Semi-transparent white card with blur                      |
| `.section-dark`      | Dark section base (surface-dark bg + ink-100 text)         |
| `.gradient-text`     | Brand blue → cyan gradient fill on text                    |
| `.hero-mesh`         | Light radial gradient hero background                      |
| `.hero-mesh-dark`    | Dark radial gradient hero background                       |
| `.btn-glow`          | Blue glow shadow on hover (use with Button primary)        |
| `.badge`             | Base pill badge (combine with modifier)                    |
| `.badge-blue`        | Blue fill badge (brand-100 / brand-700)                    |
| `.badge-green`       | Green fill badge (success palette)                         |
| `.badge-dark`        | Translucent white badge (for dark sections)                |
| `.section-divider`   | 1px horizontal gradient rule                               |
| `.ticker-track`      | Infinite horizontal scroll (28s)                           |
| `.ticker-pause`      | Pauses ticker on hover                                     |

---

## Smoke Test Route

Visit `/design-test` (dev only) to render every component in isolation.
Source: `src/pages/DesignTest.tsx`.
