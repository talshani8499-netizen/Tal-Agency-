import { motion } from "motion/react";
import { fadeUp, stagger } from "./animations";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

interface CTABandProps {
  headline: string;
  supporting?: string;
  buttonLabel: string;
  buttonHref: string;
  variant?: "blue" | "dark" | "bordered";
}

export function CTABand({
  headline,
  supporting,
  buttonLabel,
  buttonHref,
  variant = "blue",
}: CTABandProps) {
  const styles = {
    blue:     "bg-brand-600 text-white",
    dark:     "section-dark relative overflow-hidden",
    bordered: "bg-white border-2 border-brand-600",
  };
  const textColor = variant === "bordered" ? "text-ink-950" : "text-white";
  const subColor  = variant === "bordered" ? "text-ink-500" : "text-white/80";

  return (
    <section className={cn("py-20", styles[variant])}>
      {variant === "dark" && (
        <div
          className="absolute inset-0 opacity-30"
          style={{ boxShadow: "inset 0 0 120px rgba(37,99,235,.3)" }}
        />
      )}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.h2
          variants={fadeUp}
          className={cn("text-3xl md:text-4xl font-bold tracking-tight mb-4", textColor)}
        >
          {headline}
        </motion.h2>
        {supporting && (
          <motion.p
            variants={fadeUp}
            className={cn("text-lg leading-relaxed mb-8 max-w-2xl mx-auto", subColor)}
          >
            {supporting}
          </motion.p>
        )}
        <motion.div variants={fadeUp}>
          <Button
            href={buttonHref}
            size="lg"
            icon
            variant={variant === "bordered" ? "primary" : "secondary"}
            className={
              variant !== "bordered"
                ? "bg-white text-ink-950 hover:bg-ink-100 btn-glow"
                : "btn-glow"
            }
          >
            {buttonLabel}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
