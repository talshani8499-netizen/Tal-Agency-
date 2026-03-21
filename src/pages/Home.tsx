import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Card";
import { BookingSection } from "@/components/BookingSection";
import { FounderImage } from "@/components/FounderImage";
import { services } from "@/data/services";
import { motion } from "motion/react";
import { PhoneCall, MessageSquare, LayoutTemplate, Workflow, ArrowRight, CheckCircle2, Clock, DollarSign, Users, Phone, Hammer, Flame, Wrench } from "lucide-react";
import { TradeToggle } from "@/components/ui/TradeToggle";
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
                  <p className="text-xs text-blue-600 font-semibold">Founder & CEO</p>
                </div>
              </div>
            </div>

            {/* Content column */}
            <div className="flex-1">
              <span className="inline-block mb-5 text-xs font-bold tracking-[0.08em] text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Who You're Working With
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                You Work Directly With the<br className="hidden md:block" /> Person Who Builds Your System.
              </h2>
              <blockquote className="text-lg text-slate-700 leading-relaxed mb-5 border-l-4 border-blue-500 pl-5">
                "I started Elevate Digital because small business owners deserve the same AI advantage that billion-dollar companies have — without the enterprise price tag or complexity."
              </blockquote>
              <p className="text-slate-500 leading-relaxed mb-8">
                Every system is built hands-on and founder-led, obsessively focused on one metric: your ROI. No account managers, no hand-offs, no bloated retainers — just results.
              </p>
              <div className="flex flex-wrap gap-6 mb-8 text-sm font-semibold text-slate-600">
                {["5+ Years in AI Automation", "100% US Small Business Focus", "Founder-Led, Always"].map((t) => (
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

      {/* Two Business Owners Comparison */}
      <section ref={comparisonRef as React.RefObject<HTMLElement>} className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">The Real Cost of Waiting</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
              He didn't get more clients.<br />He just stopped<br />losing the ones he had.
            </h2>
            <p className="text-slate-500 text-lg max-w-lg mx-auto">
              Two business owners. Same market. One recognized the gap — and acted.
            </p>
          </div>

          {/* Split cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden shadow-xl ring-1 ring-slate-200 mb-6">

            {/* Mike — full-photo cinematic card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="relative min-h-[600px] flex flex-col overflow-hidden"
            >
              <img
                src="/images/persona-mike.jpg"
                alt="Stressed business owner — without AI"
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-900/60 to-slate-950" />
              <div className="relative z-10 flex flex-col h-full p-8 pb-10 min-h-[600px]">
                <span className="self-start text-[10px] font-bold uppercase tracking-widest bg-red-900/80 text-red-300 border border-red-700/50 px-3 py-1 rounded-full backdrop-blur-sm">
                  Without Elevate Digital
                </span>
                <div className="mt-auto mb-6">
                  <p className="text-2xl font-bold text-white">Mike</p>
                  <p className="text-slate-400 text-sm">Home services · doing it the old way</p>
                </div>
                <div className="mb-7">
                  <p className="text-5xl lg:text-6xl font-extrabold text-red-400 leading-none">-$7,200</p>
                  <p className="text-red-400/70 text-xs font-semibold uppercase tracking-widest mt-2">estimated monthly revenue leak</p>
                </div>
                <div className="space-y-3 mb-8">
                  {[
                    { Icon: Phone, num: "3 missed calls", label: "daily — gone to a competitor while you're on a job" },
                    { Icon: Clock, num: "22 hrs/week", label: "wasted on scheduling, follow-ups, and manual admin" },
                    { Icon: DollarSign, num: "$800 → 2 jobs", label: "78% of ad clicks left without ever calling" },
                    { Icon: Users, num: "$3,400/mo salesperson", label: "10 cold calls a day — 1 close in 6 weeks" },
                  ].map(({ Icon, num, label }, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-red-400/60 shrink-0" />
                      <span className="text-sm font-bold text-white">{num}</span>
                      <span className="text-xs text-slate-500">{label}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm italic text-slate-500 border-t border-slate-800 pt-5">
                  "If I stop, the whole thing stops with me."
                </p>
              </div>
            </motion.div>

            {/* Marcus — photo-to-white card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="bg-white flex flex-col min-h-[600px]"
            >
              <div className="relative h-72 overflow-hidden shrink-0">
                <img
                  src="/images/persona-marcus.jpeg"
                  alt="Confident business owner — with AI"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
                <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest bg-emerald-900/80 text-emerald-300 border border-emerald-700/50 px-3 py-1 rounded-full backdrop-blur-sm">
                  With Elevate Digital
                </span>
                <div className="absolute bottom-4 left-6">
                  <p className="text-xl font-bold text-slate-900">Marcus</p>
                  <p className="text-slate-500 text-xs">Same business — AI runs the rest</p>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="mb-7">
                  <p className="text-5xl lg:text-6xl font-extrabold text-emerald-500 leading-none">+$12,400</p>
                  <p className="text-emerald-600/80 text-xs font-semibold uppercase tracking-widest mt-2">additional monthly revenue captured</p>
                </div>
                <div className="space-y-3 mb-8">
                  {[
                    { Icon: Phone, num: "0 missed calls", label: "AI voice agent answers every call, day or night" },
                    { Icon: Clock, num: "18 hrs back", label: "automation runs scheduling, follow-ups, and admin" },
                    { Icon: DollarSign, num: "$800 → 11 jobs", label: "optimized landing page · every ad dollar works 5× harder" },
                    { Icon: Users, num: "15 new leads", label: "Elevate outbound calls — 2 weeks, $300/mo" },
                  ].map(({ Icon, num, label }, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span className="text-sm font-bold text-slate-800">{num}</span>
                      <span className="text-xs text-slate-400">{label}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm italic text-slate-500 border-t border-slate-100 pt-5 mt-auto">
                  "I took a long weekend. Monday morning: 9 new bookings waiting."
                </p>
              </div>
            </motion.div>

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
