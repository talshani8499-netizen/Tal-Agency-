import { Check } from "lucide-react";
import { motion } from "motion/react";
import { fadeUp } from "./animations";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

interface PricingTier {
  id: string;
  name: string;
  subtitle: string;
  targetAudience: string;
  setupFee: string;
  monthlyFee: string;
  popular: boolean;
  features: string[];
  ctaText: string;
  ctaLink: string;
}

interface PricingCardProps {
  tier: PricingTier;
  featured?: boolean;
}

export function PricingCard({ tier, featured }: PricingCardProps) {
  const isFeatured = featured ?? tier.popular;
  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        "relative flex flex-col rounded-2xl border p-8 md:p-10 transition-all duration-300",
        isFeatured
          ? "border-brand-600 shadow-[0_0_40px_rgba(37,99,235,.12)] bg-white lg:-mt-4 lg:mb-4"
          : "border-ink-300 bg-white"
      )}
    >
      {isFeatured && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 badge badge-blue text-[10px]">
          Most Popular
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-2xl font-bold text-ink-950">{tier.name}</h3>
        <p className="text-sm font-semibold text-brand-600 mt-1">{tier.subtitle}</p>
        <p className="text-sm text-ink-500 mt-3 leading-relaxed">{tier.targetAudience}</p>
      </div>

      <div className="mb-8 pb-8 border-b border-ink-100">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-extrabold text-ink-950">{tier.setupFee}</span>
          <span className="text-sm text-ink-500 ml-1">setup</span>
        </div>
        <div className="flex items-baseline gap-1 mt-2">
          <span className="text-2xl font-bold text-ink-950">+{tier.monthlyFee}</span>
          <span className="text-sm text-ink-500">/mo</span>
        </div>
      </div>

      <ul className="space-y-4 mb-10 flex-grow">
        {tier.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" strokeWidth={2} />
            <span className="text-sm text-ink-700 leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        href={tier.ctaLink}
        variant={isFeatured ? "primary" : "secondary"}
        className="w-full mt-auto btn-glow"
      >
        {tier.ctaText}
      </Button>
    </motion.div>
  );
}
