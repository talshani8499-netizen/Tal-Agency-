import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

export interface AnimatedListItem {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

function NotificationItem({ item }: { item: AnimatedListItem }) {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-3",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.04),0_2px_4px_rgba(0,0,0,.06)]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-9 items-center justify-center rounded-xl text-base shrink-0"
          style={{ backgroundColor: item.color + "20" }}
        >
          <span>{item.icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-800 truncate">{item.name}</span>
            <span className="text-[10px] text-slate-400 shrink-0">{item.time}</span>
          </div>
          <p className="text-xs text-slate-500 truncate">{item.description}</p>
        </div>
      </div>
    </figure>
  );
}

export function AnimatedList({
  className,
  items,
  delay = 1200,
}: {
  className?: string;
  items: AnimatedListItem[];
  delay?: number;
}) {
  const [index, setIndex] = useState(0);
  const itemsToShow = useMemo(
    () => items.slice(0, index + 1).reverse(),
    [index, items],
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, delay);
    return () => clearTimeout(timeout);
  }, [index, delay, items]);

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <AnimatePresence>
        {itemsToShow.map((item) => (
          <motion.div
            key={item.name + item.time}
            layout
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, originY: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 40 }}
            className="w-full"
          >
            <NotificationItem item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
