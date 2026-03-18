import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Card";
import { BookingSection } from "@/components/BookingSection";
import { FounderImage } from "@/components/FounderImage";
import { services } from "@/data/services";
import { caseStudies } from "@/data/caseStudies";
import { motion } from "motion/react";
import { PhoneCall, MessageSquare, LayoutTemplate, Workflow, ArrowRight, CheckCircle2, Star, TrendingUp, Clock, DollarSign, Users, Globe, Phone } from "lucide-react";
import { trackCTAClick, trackServiceInterest, useTrackSectionView } from "@/lib/analytics";

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
    <div className="flex flex-col min-h-screen pt-16">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-12 pb-20 lg:pt-16 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-7"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 mb-6 leading-[1.05] tracking-tight">
                Stop Losing Money<br/>
                to <span className="text-blue-600">Missed Calls</span><br/>
                and Manual Work.
              </h1>

              <p className="text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
                We build AI systems that capture every lead, answer every call, and eliminate busywork — 24/7, without adding to your payroll.
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4 mb-10">
                <Button 
                  href="/free-ai-audit" 
                  size="lg" 
                  icon
                  onClick={() => trackCTAClick('Get Free AI Audit', '/free-ai-audit')}
                >
                  Get Your Free AI Audit
                </Button>
                <Button 
                  href="/contact" 
                  variant="ghost" 
                  size="lg"
                  onClick={() => trackCTAClick('Schedule a Call', '/contact')}
                >
                  Schedule a Call <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-600">
                {["No Long-Term Contracts", "Done-For-You Setup", "ROI in 30 Days"].map((point) => (
                  <div key={point} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    {point}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — Dashboard Widget */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="lg:col-span-5 hidden lg:block"
            >
              {/* Business-owner ROI dashboard */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-200">

                {/* Header */}
                <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-semibold text-slate-700">AI Results · This Month</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-semibold text-emerald-600">Live</span>
                  </div>
                </div>

                {/* Funnel metrics — 2×2 grid */}
                <div className="grid grid-cols-2 divide-x divide-y divide-slate-100">
                  {[
                    { icon: Globe,         label: "Website Visits",   value: "4,507", color: "text-blue-600",  bg: "bg-blue-50"   },
                    { icon: Users,         label: "Leads Captured",   value: "2,896", color: "text-blue-600",  bg: "bg-blue-50"   },
                    { icon: Phone,         label: "Calls Handled",    value: "1,896", color: "text-slate-700", bg: "bg-slate-50"  },
                    { icon: CheckCircle2,  label: "Leads Qualified",  value: "842",   color: "text-slate-700", bg: "bg-slate-50"  },
                  ].map(({ icon: Icon, label, value, color, bg }) => (
                    <div key={label} className="p-5 flex flex-col gap-2">
                      <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center`}>
                        <Icon className={`h-4 w-4 ${color}`} />
                      </div>
                      <div className="text-2xl font-bold text-slate-900">{value}</div>
                      <div className="text-xs text-slate-500 font-medium">{label}</div>
                    </div>
                  ))}
                </div>

                {/* Hours saved — full-width row */}
                <div className="border-t border-slate-100 px-5 py-4 flex items-center justify-between bg-amber-50/60">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium">Time Saved</div>
                      <div className="text-sm font-semibold text-slate-700">160 hrs freed up for your team</div>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-amber-600">160 hrs</span>
                </div>

                {/* Revenue footer */}
                <div className="border-t border-emerald-100 bg-emerald-50 px-5 py-4">
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="h-4 w-4 text-emerald-600" />
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Revenue Impact</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-emerald-600 font-medium">Recovered</div>
                      <div className="text-xl font-bold text-emerald-700">$4,200</div>
                    </div>
                    <div className="w-px h-10 bg-emerald-200" />
                    <div>
                      <div className="text-xs text-emerald-600 font-medium">Generated</div>
                      <div className="text-xl font-bold text-emerald-700">$17,000</div>
                    </div>
                    <div className="w-px h-10 bg-emerald-200" />
                    <div className="text-right">
                      <div className="text-xs text-emerald-600 font-medium">Total</div>
                      <div className="text-2xl font-extrabold text-emerald-700">$21,200</div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Industry Carousel */}
      {(() => {
        const industries = [
          {
            label: "Home Services",
            photo: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=420&h=280&fit=crop&auto=format&q=80",
          },
          {
            label: "Law Firms",
            photo: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=420&h=280&fit=crop&auto=format&q=80",
          },
          {
            label: "Dental & Medical",
            photo: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=420&h=280&fit=crop&auto=format&q=80",
          },
          {
            label: "Real Estate",
            photo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=420&h=280&fit=crop&auto=format&q=80",
          },
          {
            label: "E-commerce",
            photo: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=420&h=280&fit=crop&auto=format&q=80",
          },
          {
            label: "Contractors",
            photo: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=420&h=280&fit=crop&auto=format&q=80",
          },
        ];
        const cards = [...industries, ...industries]; // duplicate for seamless loop
        return (
          <section className="bg-white border-y border-slate-200 py-8 overflow-hidden ticker-pause">
            <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
              Helping businesses in
            </p>
            {/* fade edges */}
            <div
              className="relative"
              style={{
                maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
              }}
            >
              <div className="flex gap-5 ticker-track" style={{ width: "max-content" }}>
                {cards.map((item, i) => (
                  <div
                    key={i}
                    className="relative w-52 h-36 rounded-xl overflow-hidden shrink-0 shadow-md"
                    style={{ backgroundColor: "#334155" }}
                  >
                    <img
                      src={item.photo}
                      alt={item.label}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                    {/* dark gradient overlay */}
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)" }}
                    />
                    <span className="absolute bottom-3 left-4 text-white text-sm font-bold drop-shadow-md leading-tight">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

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

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Client Results"
            title="Real Businesses. Real Numbers."
            subtitle="See exactly how we've helped SMBs across the US cut costs and capture more revenue."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-white rounded-xl border border-slate-200 p-8 flex flex-col hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex gap-1 mb-5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <blockquote className="text-base text-slate-700 mb-6 flex-grow leading-relaxed">
                  "{study.testimonial.quote}"
                </blockquote>

                <div className="mb-6">
                  <div className="font-semibold text-slate-900 text-sm">{study.testimonial.author}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{study.client}</div>
                </div>

                <div className="mt-auto pt-5 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Key Result</div>
                  <div className="text-2xl font-extrabold text-emerald-600">{study.keyMetric}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div ref={bookingRef as React.RefObject<HTMLDivElement>}>
        <BookingSection />
      </div>
    </div>
  );
}
