import { HeroSection } from "@/components/ui/HeroSection";
import { StatBar } from "@/components/ui/StatBar";
import { CTABand } from "@/components/ui/CTABand";
import { BookingSection } from "@/components/BookingSection";
import { CheckCircle2 } from "lucide-react";

export default function Remodeling() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection
        variant="dark"
        overline="AI for Remodelers"
        headline={<>Your Remodel Pipeline<br /><span className="gradient-text">Starts With a Phone Call.</span></>}
        subheadline="High-ticket jobs need trust from the first ring. Your AI builds it — professional, instant, and always available."
        primaryCTA={{ label: "See How Many Calls You're Missing", href: "/free-ai-audit" }}
        secondaryCTA={{ label: "Watch Demo", href: "/ai-voice-demo" }}
        trustStrip={
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-ink-300">
            {["$28,400 avg kitchen remodel", "Trust signals close jobs", "Referrals need a system"].map((t) => (
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
            { value: 28400, unit: "$", label: "Avg kitchen remodel value" },
            { value: 85, unit: "%", label: "Booking rate with instant follow-up" },
            { value: 27, unit: "%", label: "Of contractor calls go to voicemail" },
          ]} />
        </div>
      </div>
      <CTABand
        headline="Every Missed Call Is Someone Else's Kitchen Remodel."
        supporting="Get a free audit showing how many remodeling leads are slipping through the cracks."
        buttonLabel="Get Your Free Audit"
        buttonHref="/free-ai-audit"
        variant="blue"
      />
      <BookingSection />
    </div>
  );
}
