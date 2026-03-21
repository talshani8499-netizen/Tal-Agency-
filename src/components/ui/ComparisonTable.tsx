import { Check, X } from "lucide-react";
import { motion } from "motion/react";
import { fadeUp, stagger } from "./animations";
import { cn } from "@/lib/utils";

interface ComparisonRow {
  label: string;
  before: string;
  after: string;
}

interface ComparisonTableProps {
  rows: ComparisonRow[];
  leftLabel: string;
  rightLabel: string;
  variant?: "before-after" | "competitor";
}

export function ComparisonTable({ rows, leftLabel, rightLabel }: ComparisonTableProps) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="rounded-2xl border border-ink-300 overflow-hidden bg-white"
    >
      {/* Header */}
      <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-ink-300">
        <div className="p-4" />
        <div className="p-4 text-center border-l border-ink-300">
          <span className="text-xs font-bold uppercase tracking-widest text-ink-500">
            {leftLabel}
          </span>
        </div>
        <div className="p-4 text-center border-l border-brand-600 bg-brand-50">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
            {rightLabel}
          </span>
        </div>
      </div>

      {/* Rows */}
      {rows.map((row, i) => (
        <motion.div
          key={i}
          variants={fadeUp}
          className={cn(
            "grid grid-cols-[1fr_1fr_1fr] border-b border-ink-100 last:border-b-0",
            i % 2 === 0 ? "bg-white" : "bg-ink-50/50"
          )}
        >
          <div className="p-4 text-sm font-semibold text-ink-950">{row.label}</div>
          <div className="p-4 text-sm text-ink-500 text-center border-l border-ink-100 flex items-center justify-center gap-2">
            <X className="h-4 w-4 text-red-400 shrink-0" />
            {row.before}
          </div>
          <div className="p-4 text-sm text-brand-700 font-medium text-center border-l border-brand-100 bg-brand-50/30 flex items-center justify-center gap-2">
            <Check className="h-4 w-4 text-emerald-500 shrink-0" />
            {row.after}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
