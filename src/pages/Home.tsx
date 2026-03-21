import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Card";
import { BookingSection } from "@/components/BookingSection";
import { FounderImage } from "@/components/FounderImage";
import { services } from "@/data/services";
import { motion } from "motion/react";
import { PhoneCall, MessageSquare, LayoutTemplate, Workflow, ArrowRight, CheckCircle2, Hammer, Flame, Wrench } from "lucide-react";
import { TradeToggle } from "@/components/ui/TradeToggle";
import { ComparisonTable } from "@/components/ui/ComparisonTable";
import { trackCTAClick, trackServiceInterest, useTrackSectionView } from "@/lib/analytics";
import { HeroSection } from "@/components/ui/HeroSection";

const iconMap = {
  PhoneCall,
  MessageSquare,
  LayoutTemplate,
  Workflow,
};

const serviceMetricHighlights: Record<string, { stat: string; label: string }> = {
  "voice-agents":    { stat: "15–20",  label: "extra bookings per month" },
  "chat-agents":     { stat: "30%",    label: "more leads captured" },
  "landing-pages":   { stat: "2x",     label: "conversion improvement" },
  "custom-automation": { stat: "10+",  label: "hours saved per week" },
};


export default function Home() {
  const founderRef = useTrackSectionView('founder_section');
  const comparisonRef = useTrackSectionView('mike_vs_marcus');
  const servicesRef = useTrackSectionView('services_grid');
  const bookingRef = useTrackSectionView('booking_section');

  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <HeroSection
        variant="gradient"
        overline="Built for Contractors"
        headline={
          <>
            We Handle the Calls.{" "}
            <span className="gradient-text">You Handle the Build.</span>
          </>
        }
        subheadline="AI-powered call answering, follow-up, and booking — built specifically for roofing, HVAC, and remodeling contractors."
        primaryCTA={{ label: "See How Many Calls You're Missing", href: "/free-ai-audit" }}
        secondaryCTA={{ label: "Watch 90-sec Demo", href: "/ai-voice-demo" }}
        trustStrip={
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-ink-500">
            {["500+ calls handled", "27% of contractor calls go to voicemail", "$13K avg job value"].map((text) => (
              <span key={text} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                {text}
              </span>
            ))}
          </div>
        }
      />

      {/* Trade Toggle */}
      <section className="py-20 bg-white border-y border-ink-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="badge badge-blue mb-4">Who We Serve</span>
            <h2 className="text-3xl md:text-4xl font-bold text-ink-950 tracking-tight">
              Built for the Trades That Build America
            </h2>
          </div>
          <TradeToggle
            trades={[
              {
                id: "roofing", label: "Roofers", icon: Hammer,
                content: (
                  <div className="text-center py-8 space-y-4">
                    <div className="flex justify-center gap-8 text-sm font-semibold text-ink-700">
                      <span>$11,500 avg job</span>
                      <span>62% close rate from speed-to-lead</span>
                      <span>27% of calls missed</span>
                    </div>
                    <p className="text-ink-500 max-w-lg mx-auto">Your AI answers while you're on the roof. Every missed call is $11,500 walking to your competitor.</p>
                    <Button href="/roofing" variant="ghost" size="sm">See How It Works for Roofers <ArrowRight className="ml-1.5 h-4 w-4" /></Button>
                  </div>
                ),
              },
              {
                id: "hvac", label: "HVAC", icon: Flame,
                content: (
                  <div className="text-center py-8 space-y-4">
                    <div className="flex justify-center gap-8 text-sm font-semibold text-ink-700">
                      <span>$13,000 avg job</span>
                      <span>Seasonal peaks kill solo operators</span>
                      <span>4.9-star = 37% more calls</span>
                    </div>
                    <p className="text-ink-500 max-w-lg mx-auto">When summer hits, your phone explodes. Your AI handles the surge so you don't lose peak-season revenue.</p>
                    <Button href="/hvac" variant="ghost" size="sm">See How It Works for HVAC <ArrowRight className="ml-1.5 h-4 w-4" /></Button>
                  </div>
                ),
              },
              {
                id: "remodeling", label: "Remodelers", icon: Wrench,
                content: (
                  <div className="text-center py-8 space-y-4">
                    <div className="flex justify-center gap-8 text-sm font-semibold text-ink-700">
                      <span>$28,400 avg kitchen remodel</span>
                      <span>Trust signals close jobs</span>
                      <span>Referrals need a system</span>
                    </div>
                    <p className="text-ink-500 max-w-lg mx-auto">High-ticket jobs need trust. Your AI builds it from the first call — professional, instant, and always available.</p>
                    <Button href="/remodeling" variant="ghost" size="sm">See How It Works for Remodelers <ArrowRight className="ml-1.5 h-4 w-4" /></Button>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </section>

      {/* Founder Section */}
      <section ref={founderRef as React.RefObject<HTMLElement>} className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/40 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row gap-14 items-center"
          >
            {/* Photo column */}
            <div className="shrink-0 relative">
              <div className="absolute inset-0 rounded-2xl bg-blue-500/10 blur-2xl scale-105 -z-10" />
              <div className="relative">
                <FounderImage
                  size="lg"
                  className="border border-blue-100 shadow-[0_8px_40px_rgba(37,99,235,0.15)]"
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-slate-100">
                  <p className="text-xs font-bold text-slate-900">Tal Shani</p>
                  <p className="text-xs text-blue-600 font-semibold">Built the AI systems. Chose contractors.</p>
                </div>
              </div>
            </div>

            {/* Content column */}
            <div className="flex-1">
              <span className="inline-block mb-5 text-xs font-bold tracking-[0.08em] text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Why I Built This
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Why I Built This for Contractors
              </h2>
              <blockquote className="text-lg text-slate-700 leading-relaxed mb-5 border-l-4 border-blue-500 pl-5">
                "I spent 6 years building AI systems for enterprise — Unit 8200, fintech, e-commerce at scale. Then I talked to a roofer who missed a $13K job because he was on a roof when the phone rang. That's when I knew where this technology needed to go."
              </blockquote>
              <p className="text-slate-500 leading-relaxed mb-8">
                In the time it takes to finish a 6-hour job, your AI handles 40+ calls, 12 follow-ups, and 3 booking confirmations. That's the system I built for you.
              </p>
              <div className="flex flex-wrap gap-6 mb-8 text-sm font-semibold text-slate-600">
                {["5+ Years in AI Automation", "Unit 8200 Engineering", "Built for Contractors"].map((t) => (
                  <span key={t} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    {t}
                  </span>
                ))}
              </div>
              <Button 
                href="/about" 
                variant="secondary" 
                size="sm"
                onClick={() => trackCTAClick('My Full Story', '/about')}
              >
                My Full Story <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison: Mike vs Marcus */}
      <section ref={comparisonRef as React.RefObject<HTMLElement>} className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="badge badge-blue mb-4">The Real Cost of Waiting</span>
            <h2 className="text-3xl md:text-4xl font-bold text-ink-950 tracking-tight mb-4">
              Two Contractors. Same Market. Very Different Results.
            </h2>
          </div>

          <ComparisonTable
            rows={[
              { label: "Missed Calls", before: "3+ per day", after: "AI handles 100%" },
              { label: "Follow-up Time", before: "Manual, whenever you remember", after: "Automated within 5 min" },
              { label: "Review Management", before: "No system", after: "Auto-request after every job" },
              { label: "Booking Rate", before: "50%", after: "85%" },
              { label: "Weekend Hours Worked", before: "16 hrs", after: "8 hrs" },
            ]}
            leftLabel="Mike — Without Elevate"
            rightLabel="Marcus — With Elevate"
          />

          <div className="text-center mt-10">
            <Button href="/free-ai-audit" size="lg" icon className="btn-glow">
              Get Marcus's Setup
            </Button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section ref={servicesRef as React.RefObject<HTMLElement>} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="What We Build"
            title="AI Solutions That Pay for Themselves"
            subtitle="Four done-for-you systems that directly increase revenue and cut costs for US small businesses."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap];
              const m = serviceMetricHighlights[service.id];

              // Bento layout: Voice (0) tall left col-span-1, Chat (1) top mid, Landing (2) top right, Custom (3) bottom spanning 2 cols
              const isTallCard = index === 0;
              const isBottomWideCard = index === 3;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className={`rounded-2xl border p-6 md:p-8 flex flex-col transition-all duration-200 ${
                    index === 0 || index === 3 ? "bg-blue-50 border-blue-100" : "bg-white border-slate-200"
                  } ${isTallCard ? "md:row-span-2" : ""} ${isBottomWideCard ? "md:col-span-2" : ""}`}
                >
                  {/* Tall left card (Voice): big stat first */}
                  {isTallCard && m && (
                    <div className="mb-6">
                      <div className="text-6xl md:text-7xl font-extrabold text-blue-600 leading-none mb-2">
                        {m.stat}
                      </div>
                      <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                        {m.label}
                      </div>
                    </div>
                  )}

                  {/* Icon + title */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${index === 0 || index === 3 ? "bg-blue-600" : "bg-blue-50"}`}>
                      <Icon className={`h-5 w-5 ${index === 0 || index === 3 ? "text-white" : "text-blue-600"}`} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-slate-900">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed mb-4 flex-grow text-slate-500">
                    {service.shortDescription}
                  </p>

                  {/* Middle cards (Chat, Landing): stat in the middle or bottom, wide bottom card (Custom) */}
                  {!isTallCard && m && (
                    <div className="mb-4 pt-4 border-t border-slate-200">
                      <div className="text-5xl font-extrabold text-emerald-600 leading-none mb-1">{m.stat}</div>
                      <div className="text-xs text-slate-400 uppercase tracking-widest">{m.label}</div>
                    </div>
                  )}

                  {/* CTA */}
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center text-sm font-semibold mt-4 text-blue-600 hover:text-blue-700"
                    onClick={() => trackServiceInterest(service.title)}
                  >
                    Learn more <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <div ref={bookingRef as React.RefObject<HTMLDivElement>}>
        <BookingSection />
      </div>
    </div>
  );
}
