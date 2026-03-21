import { Card } from "@/components/ui/Card";
import { BookingSection } from "@/components/BookingSection";
import { FounderImage } from "@/components/FounderImage";
import { motion } from "motion/react";
import { Target, Shield, Zap, Users, Hammer } from "lucide-react";

const journey = [
  {
    era: "2017–2023",
    badge: "IDF · Intelligence Unit",
    title: "Unit 8200",
    tagline: "Built systems that had to be reliable, precise, and impossible to fool.",
    stat: { value: "Unit 8200", label: "· most cited tech talent pipeline in the world" },
    accentColor: "text-slate-700",
    dotBorder: "border-slate-500",
    badgeBg: "bg-slate-100 text-slate-700",
  },
  {
    era: "2023–2025",
    badge: "E-commerce · Marketplace",
    title: "Growth Lead",
    tagline: "Drove AI and product decisions for tens of millions of daily active users.",
    stat: { value: "10M+", label: "monthly active users" },
    accentColor: "text-blue-600",
    dotBorder: "border-blue-400",
    badgeBg: "bg-blue-50 text-blue-700",
  },
  {
    era: "2025–2026",
    badge: "Fintech · AI",
    title: "AI & Automation Lead",
    tagline: "Deployed AI across core product flows. Measured in millions of dollars.",
    stat: { value: "$5M+", label: "revenue generated through AI optimization" },
    accentColor: "text-emerald-600",
    dotBorder: "border-emerald-400",
    badgeBg: "bg-emerald-50 text-emerald-700",
  },
  {
    era: "2026",
    badge: "AI Agency",
    title: "Elevate Digital",
    tagline: "Went all-in on contractors. The data said yes.",
    stat: { value: "30 days", label: "avg. time to first measurable ROI" },
    accentColor: "text-blue-600",
    dotBorder: "border-blue-400",
    badgeBg: "bg-blue-50 text-blue-700",
  },
];

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-50 mix-blend-overlay pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-text-heading mb-8 leading-[1.1] tracking-tight text-balance max-w-4xl mx-auto">
              We Chose Contractors. <span className="italic text-accent">Here's Why.</span>
            </h1>
            <p className="text-xl text-text-body max-w-3xl mx-auto leading-relaxed">
              We believe small business owners shouldn't have to choose between growing their company and having a life. We build the AI systems that make both possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Row — photo left + compact timeline right */}
      <section className="pt-8 pb-16 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left — Photo + identity */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center"
            >
              <FounderImage size="lg" className="mb-6" />
              <h2 className="text-2xl font-serif text-text-heading mb-1">Tal Shani</h2>
              <p className="text-sm text-accent font-semibold uppercase tracking-widest mb-5">
                Founder & CEO, Elevate Digital
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-slate-100 text-slate-600 text-xs font-medium px-3 py-1.5 rounded-full">
                  IDF Unit 8200
                </span>
                <span className="bg-slate-100 text-slate-600 text-xs font-medium px-3 py-1.5 rounded-full">
                  10M+ users
                </span>
                <span className="bg-emerald-50 text-emerald-700 text-xs font-medium px-3 py-1.5 rounded-full">
                  $5M+ generated
                </span>
              </div>
            </motion.div>

            {/* Right — Compact timeline */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
                Background
              </p>
              <div className="relative pl-4">
                {/* Vertical line */}
                <div className="absolute left-[6px] top-0 bottom-0 w-px bg-slate-200" />

                {journey.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                    className="relative pl-6 mb-7 last:mb-0"
                  >
                    {/* Dot */}
                    <div
                      className={`absolute left-0 top-1.5 h-3 w-3 rounded-full bg-white border-2 ${item.dotBorder} shadow-sm`}
                    />
                    {/* Era + badge */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                      <span className="text-[11px] font-mono text-slate-400">{item.era}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${item.badgeBg}`}>
                        {item.badge}
                      </span>
                    </div>
                    {/* Title */}
                    <p className="text-sm font-bold text-slate-900 mb-0.5">{item.title}</p>
                    {/* Tagline */}
                    <p className="text-xs text-slate-500 leading-relaxed mb-1.5">{item.tagline}</p>
                    {/* Stat */}
                    <span className={`text-xs font-extrabold ${item.accentColor}`}>{item.stat.value}</span>
                    <span className="text-xs text-slate-400 ml-1.5">{item.stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Elevate Digital + Values */}
      <section className="py-20 relative z-10 bg-slate-50 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-8">About Elevate Digital</h2>
            <div className="space-y-5 text-lg text-text-body leading-relaxed max-w-3xl">
              <p>
                I started Elevate Digital because I saw a massive gap: enterprise companies were leveraging AI to become hyper-efficient, while the contractors who build our neighborhoods were still drowning in missed calls, manual data entry, and 80-hour weeks.
              </p>
              <p>
                The data was clear: 27% of contractor calls go to voicemail, costing the average shop $50K/year in lost revenue. Zero tech adoption. Outsized ROI opportunity. So we went all-in on construction.
              </p>
              <p>
                Today, Elevate Digital acts as your fractional Chief AI Officer. We don't just sell software — we architect custom automation engines that run silently in the background, capturing leads, booking appointments, and saving you thousands of hours.
              </p>
            </div>
            <blockquote className="mt-10 border-l-2 border-blue-500 pl-6 max-w-3xl">
              <p className="text-lg italic text-slate-700 leading-relaxed">
                "Every system I built for enterprise — the lead scoring, the automation workflows — I rebuilt for contractors. Because no one should lose a $13K job to voicemail."
              </p>
              <footer className="mt-3 text-sm font-semibold text-slate-500 uppercase tracking-wide">
                — Tal Shani, Founder
              </footer>
            </blockquote>

            {/* Core Values — directly below the quote */}
            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: Target, title: "Results First", desc: "We only build what drives ROI. No vanity projects." },
                { icon: Shield, title: "Radical Transparency", desc: "No hidden fees, no jargon, no surprises." },
                { icon: Zap, title: "Speed to Value", desc: "Live in weeks, not months. Fast results matter." },
                { icon: Users, title: "True Partners", desc: "We succeed when you scale. Your growth is our growth." },
                { icon: Hammer, title: "Why Construction?", desc: "A $50K/yr missed-call problem meets zero tech adoption. Outsized ROI." },
              ].map((val, i) => {
                const Icon = val.icon;
                return (
                  <Card key={i} className="p-6 glass-panel group hover:bg-white/5 transition-all duration-500">
                    <div className="h-10 w-10 rounded-full glass-panel text-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 border-accent/20">
                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-base font-serif text-text-heading mb-2">{val.title}</h3>
                    <p className="text-sm text-text-body leading-relaxed">{val.desc}</p>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <BookingSection />
    </div>
  );
}
