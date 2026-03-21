import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface Trade {
  id: string;
  label: string;
  icon: LucideIcon;
  content: React.ReactNode;
}

interface TradeToggleProps {
  trades: Trade[];
  defaultTrade?: string;
}

export function TradeToggle({ trades, defaultTrade }: TradeToggleProps) {
  const [active, setActive] = useState(defaultTrade ?? trades[0]?.id ?? "");
  const activeTrade = trades.find((t) => t.id === active);

  return (
    <div>
      {/* Pill bar */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-ink-100 rounded-full p-1 gap-1">
          {trades.map((trade) => {
            const Icon = trade.icon;
            const isActive = trade.id === active;
            return (
              <button
                key={trade.id}
                onClick={() => setActive(trade.id)}
                className={cn(
                  "relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200",
                  isActive ? "text-white" : "text-ink-700 hover:text-ink-950"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="trade-toggle-pill"
                    className="absolute inset-0 bg-brand-600 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {trade.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTrade && (
          <motion.div
            key={activeTrade.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {activeTrade.content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
