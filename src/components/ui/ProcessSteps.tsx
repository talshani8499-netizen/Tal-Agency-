import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { fadeUp, stagger } from "./animations";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface Step {
  number: number;
  title: string;
  description: string;
  icon?: LucideIcon;
}

interface ProcessStepsProps {
  steps: Step[];
  orientation?: "vertical" | "horizontal";
  animate?: boolean;
}

export function ProcessSteps({
  steps,
  orientation = "vertical",
  animate = true,
}: ProcessStepsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  if (orientation === "horizontal") {
    return (
      <motion.div
        ref={ref}
        variants={stagger}
        initial={animate ? "hidden" : "visible"}
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <motion.div key={step.number} variants={fadeUp} className="text-center">
              <div className="mx-auto h-14 w-14 rounded-full bg-brand-600 text-white flex items-center justify-center text-xl font-bold mb-4">
                {Icon ? <Icon className="h-6 w-6" /> : step.number}
              </div>
              <h3 className="text-lg font-semibold text-ink-950 mb-2">{step.title}</h3>
              <p className="text-sm text-ink-500 leading-relaxed">{step.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    );
  }

  // Vertical
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial={animate ? "hidden" : "visible"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="relative pl-8"
    >
      {/* Connector line */}
      <motion.div
        className={cn("absolute left-[15px] top-0 w-0.5 bg-brand-600 origin-top")}
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ height: "100%" }}
      />

      {steps.map((step) => {
        const Icon = step.icon;
        return (
          <motion.div key={step.number} variants={fadeUp} className="relative pb-10 last:pb-0">
            <div className="absolute -left-8 top-0 h-8 w-8 rounded-full bg-brand-600 text-white flex items-center justify-center text-sm font-bold shadow-md">
              {Icon ? <Icon className="h-4 w-4" /> : step.number}
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-ink-950 mb-1">{step.title}</h3>
              <p className="text-sm text-ink-500 leading-relaxed">{step.description}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
