/** Design-system typography scale.
 *  Each key maps to the Tailwind classes that produce the intended size/weight/leading. */
export const typography = {
  display:  "text-5xl md:text-7xl font-bold tracking-tighter leading-none",
  h1:       "text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]",
  h2:       "text-3xl md:text-4xl font-bold tracking-tight leading-[1.2]",
  h3:       "text-xl font-semibold leading-[1.4]",
  overline: "text-xs font-bold uppercase tracking-widest",
  bodyLg:   "text-lg text-ink-700 leading-relaxed",
  body:     "text-base text-ink-700 leading-relaxed",
  caption:  "text-sm text-ink-500",
  stat:     "text-4xl md:text-5xl font-extrabold tabular-nums leading-none",
} as const;

export type TypographyKey = keyof typeof typography;
