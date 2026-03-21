import { HeroSection } from "@/components/ui/HeroSection";
import { StatBar } from "@/components/ui/StatBar";
import { CTABand } from "@/components/ui/CTABand";
import { BookingSection } from "@/components/BookingSection";
import { CheckCircle2 } from "lucide-react";

export default function Roofing() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection
        variant="dark"
        overline="AI for Roofers"
        headline={<>Stop Losing $11,500 Jobs<br /><span className="gradient-text">to Voicemail.</span></>}
        subheadline="Your AI receptionist answers every call, books estimates, and follows up — even when you're 3 stories up."
        primaryCTA={{ label: "See How Many Calls You're Missing", href: "/free-ai-audit" }}
        secondaryCTA={{ label: "Watch Demo", href: "/ai-voice-demo" }}
        trustStrip={
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-ink-300">
            {["$11,500 avg job value", "62% close rate from speed-to-lead", "27% of calls missed"].map((t) => (
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
            { value: 11500, unit: "$", label: "Avg roofing job value" },
            { value: 62, unit: "%", label: "Close rate from speed-to-lead" },
            { value: 27, unit: "%", label: "Of contractor calls go to voicemail" },
          ]} />
        </div>
      </div>
      <CTABand
        headline="Your Roof Crew Is Booked. But Your Phone Shouldn't Be."
        supporting="Get a free audit showing exactly how many roofing leads are slipping through the cracks."
        buttonLabel="Get Your Free Audit"
        buttonHref="/free-ai-audit"
        variant="blue"
      />
      <BookingSection />
    </div>
  );
}
