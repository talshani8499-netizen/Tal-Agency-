import { motion } from "motion/react";
import { fadeUp, stagger } from "./animations";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  variant?: "light" | "dark" | "gradient";
  headline: React.ReactNode;
  subheadline?: string;
  overline?: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  trustStrip?: React.ReactNode;
  backgroundImage?: string;
  children?: React.ReactNode;
}

export function HeroSection({
  variant = "gradient",
  headline,
  subheadline,
  overline,
  primaryCTA,
  secondaryCTA,
  trustStrip,
  backgroundImage,
  children,
}: HeroSectionProps) {
  const bgClass =
    variant === "dark"     ? "hero-mesh-dark text-white" :
    variant === "gradient" ? "hero-mesh" :
    "bg-white";

  return (
    <section
      className={cn("relative min-h-[80vh] flex items-center overflow-hidden", bgClass)}
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }
          : undefined
      }
    >
      {backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-ink-950/40 to-ink-950/80" />
      )}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {overline && (
            <motion.span
              variants={fadeUp}
              className={cn(
                "badge mb-6",
                variant === "dark" ? "badge-dark" : "badge-blue"
              )}
            >
              {overline}
            </motion.span>
          )}

          <motion.h1
            variants={fadeUp}
            className={cn(
              "text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-6",
              variant === "dark" ? "text-white" : "text-ink-950"
            )}
          >
            {headline}
          </motion.h1>

          {subheadline && (
            <motion.p
              variants={fadeUp}
              className={cn(
                "text-xl leading-relaxed mb-10 max-w-xl",
                variant === "dark" ? "text-ink-300" : "text-ink-700"
              )}
            >
              {subheadline}
            </motion.p>
          )}

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start gap-4 mb-10">
            <Button href={primaryCTA.href} size="lg" icon className="btn-glow">
              {primaryCTA.label}
            </Button>
            {secondaryCTA && (
              <Button href={secondaryCTA.href} variant="ghost" size="lg">
                {secondaryCTA.label}
              </Button>
            )}
          </motion.div>

          {trustStrip && (
            <motion.div variants={fadeUp}>
              {trustStrip}
            </motion.div>
          )}
        </motion.div>

        {children}
      </div>
    </section>
  );
}
