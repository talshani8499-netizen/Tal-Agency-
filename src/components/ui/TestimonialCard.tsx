import { Star } from "lucide-react";
import { motion } from "motion/react";
import { fadeUp } from "./animations";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  quote: string;
  name: string;
  business: string;
  trade: string;
  rating: number;
  avatar?: string;
  variant?: "featured" | "compact";
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < count ? "text-amber-400 fill-amber-400" : "text-ink-300"
          )}
        />
      ))}
    </div>
  );
}

export function TestimonialCard({
  quote,
  name,
  business,
  trade,
  rating,
  avatar,
  variant = "compact",
}: TestimonialCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        "rounded-2xl border border-ink-300 bg-white p-6",
        variant === "featured" && "col-span-full lg:p-10"
      )}
    >
      <Stars count={rating} />
      <blockquote
        className={cn(
          "mt-4 leading-relaxed text-ink-700",
          variant === "featured" ? "text-lg" : "text-sm"
        )}
      >
        "{quote}"
      </blockquote>
      <div className="mt-4 flex items-center gap-3 border-t border-ink-100 pt-4">
        {avatar ? (
          <img src={avatar} alt={name} className="h-10 w-10 rounded-full object-cover" />
        ) : (
          <div className="h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-sm">
            {name.charAt(0)}
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-ink-950">{name}</p>
          <p className="text-xs text-ink-500">{business}</p>
        </div>
        <span className="ml-auto badge badge-blue">{trade}</span>
      </div>
    </motion.div>
  );
}
