import { motion } from "motion/react";
import { fadeUp, stagger } from "./animations";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  highlight?: boolean;
}

interface FeatureGridProps {
  features: Feature[];
  columns?: 2 | 3;
  variant?: "cards" | "list" | "icons-only";
}

export function FeatureGrid({ features, columns = 3, variant = "cards" }: FeatureGridProps) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={cn(
        "grid gap-6",
        columns === 2
          ? "grid-cols-1 sm:grid-cols-2"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      )}
    >
      {features.map((f, i) => {
        const Icon = f.icon;
        return (
          <motion.div
            key={i}
            variants={fadeUp}
            className={cn(
              "rounded-2xl p-6 transition-all duration-300",
              variant === "cards" && "border shadow-sm hover:shadow-md",
              f.highlight
                ? "bg-brand-600 text-white border-brand-600"
                : "bg-white border-ink-300 hover:border-brand-500"
            )}
          >
            <div
              className={cn(
                "h-10 w-10 rounded-lg flex items-center justify-center mb-4",
                f.highlight ? "bg-white/20" : "bg-brand-50"
              )}
            >
              <Icon
                className={cn("h-5 w-5", f.highlight ? "text-white" : "text-brand-600")}
                strokeWidth={1.5}
              />
            </div>
            <h3
              className={cn(
                "text-lg font-semibold mb-2",
                f.highlight ? "text-white" : "text-ink-950"
              )}
            >
              {f.title}
            </h3>
            {variant !== "icons-only" && (
              <p
                className={cn(
                  "text-sm leading-relaxed",
                  f.highlight ? "text-white/80" : "text-ink-500"
                )}
              >
                {f.description}
              </p>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
