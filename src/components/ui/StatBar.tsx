import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { fadeUp, stagger } from "./animations";
import { cn } from "@/lib/utils";

interface StatItem {
  value: number;
  unit: string;
  label: string;
}

interface StatBarProps {
  stats: StatItem[];
  variant?: "light" | "dark";
  animate?: boolean;
}

function useCountUp(target: number, inView: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(id);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(id);
  }, [inView, target, duration]);
  return count;
}

function StatCell({
  stat,
  inView,
  variant,
}: {
  stat: StatItem;
  inView: boolean;
  variant: "light" | "dark";
}) {
  const display = useCountUp(stat.value, inView);
  return (
    <motion.div variants={fadeUp} className="text-center">
      <div
        className={cn(
          "text-4xl md:text-5xl font-extrabold tabular-nums leading-none",
          variant === "dark" ? "text-white" : "text-ink-950"
        )}
      >
        {display.toLocaleString()}
        <span className="text-brand-500">{stat.unit}</span>
      </div>
      <p className={cn("text-sm mt-2", variant === "dark" ? "text-ink-300" : "text-ink-500")}>
        {stat.label}
      </p>
    </motion.div>
  );
}

export function StatBar({ stats, variant = "light", animate = true }: StatBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial={animate ? "hidden" : "visible"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={cn(
        "grid gap-8 py-12 px-6 rounded-2xl",
        stats.length <= 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-4",
        variant === "dark"
          ? "bg-surface-mid border border-white/10"
          : "bg-white border border-ink-300"
      )}
    >
      {stats.map((stat, i) => (
        <StatCell key={i} stat={stat} inView={inView} variant={variant} />
      ))}
    </motion.div>
  );
}
