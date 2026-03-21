import { HeroSection } from "@/components/ui/HeroSection";
import { StatBar } from "@/components/ui/StatBar";
import { CTABand } from "@/components/ui/CTABand";
import { BookingSection } from "@/components/BookingSection";
import { CheckCircle2 } from "lucide-react";

export default function HVAC() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection
        variant="dark"
        overline="AI for HVAC"
        headline={<>Every Missed Call Is a<br /><span className="gradient-text">$13K Emergency Job Gone.</span></>}
        subheadline="When summer hits and phones explode, your AI handles the surge. No missed calls, no lost peak-season revenue."
        primaryCTA={{ label: "See How Many Calls You're Missing", href: "/free-ai-audit" }}
        secondaryCTA={{ label: "Watch Demo", href: "/ai-voice-demo" }}
        trustStrip={
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-ink-300">
            {["$13,000 avg job value", "Seasonal peaks kill solo operators", "4.9-star = 37% more calls"].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                {t}
              </span>
            ))}
          </div>
        }
      />
      <div className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <StatBar stats={[
            { value: 13000, unit: "$", label: "Avg HVAC job value" },
            { value: 37, unit: "%", label: "More calls with 4.9-star rating" },
            { value: 27, unit: "%", label: "Of contractor calls go to voicemail" },
          ]} />
        </div>
      </div>
      <CTABand
        headline="Peak Season Doesn't Wait. Neither Should Your Phone."
        supporting="Get a free audit showing how many HVAC leads are going unanswered during your busiest months."
        buttonLabel="Get Your Free Audit"
        buttonHref="/free-ai-audit"
        variant="blue"
      />
      <BookingSection />
    </div>
  );
}
