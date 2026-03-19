import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { BookingSection } from "@/components/BookingSection";
import { motion } from "motion/react";
import {
  LayoutTemplate,
  TrendingUp,
  Zap,
  CheckCircle2,
  ChevronDown,
  Globe,
  MousePointer,
  DollarSign,
  Star,
} from "lucide-react";

// ─── FAQ Accordion ────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "Do I need to already have a website?",
    a: "No. We build from scratch or redesign what you have. Either way, you end up with something you're proud to send people to.",
  },
  {
    q: "Will it rank on Google?",
    a: "Yes. Every site is built with SEO fundamentals — clean code, fast load times, proper heading structure, and local search optimization. We don't build pretty sites that Google ignores.",
  },
  {
    q: "Can you write the copy too?",
    a: "Yes. Copywriting is included. We interview you, write it, and you review and approve before anything goes live. Most clients say the copy is the part they're most impressed by.",
  },
  {
    q: "What if I want to make changes later?",
    a: "We handle all edits. Monthly maintenance is included — just tell us what to update and we'll turn it around fast. No developer queues, no extra charges for small changes.",
  },
  {
    q: "How long until it's live?",
    a: "Full business websites: 10–14 days. Targeted landing pages: 5 days. You review and approve every page before anything goes live. No surprises.",
  },
  {
    q: "Do you build on WordPress or a page builder?",
    a: "No. We build custom, clean-coded sites that load fast, don't break, and don't get hacked. No bloated plugins, no drag-and-drop templates, no monthly WordPress headaches.",
  },
  {
    q: "What does it cost?",
    a: "Full business websites start at $1,500 setup + $300/month maintenance. Landing pages: $400–$800/month all-in. Most clients recover the investment in the first 1–2 new clients.",
  },
];

// ─── Step Animations ──────────────────────────────────────────────────────────

// Step 01: Discovery — checklist / brief items animate in
function Step1Anim() {
  const items = [
    { delay: 0,   w: "75%", label: "Target audience" },
    { delay: 0.6, w: "60%", label: "Competitors" },
    { delay: 1.2, w: "80%", label: "Conversion goal" },
  ];
  return (
    <div className="flex flex-col justify-center gap-2.5 w-full px-6 py-4">
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="h-8 bg-blue-50 border border-blue-100 rounded-lg flex items-center px-3 gap-2"
          style={{ width: item.w }}
          animate={{ opacity: [0, 1, 1, 0], x: [-14, 0, 0, -14] }}
          transition={{
            duration: 1.3,
            times: [0, 0.2, 0.7, 1],
            delay: item.delay,
            repeat: Infinity,
            repeatDelay: 3.6 - item.delay,
          }}
        >
          <CheckCircle2 className="h-3.5 w-3.5 text-blue-400 shrink-0" />
          <div className="h-2 rounded bg-blue-300 flex-1" />
        </motion.div>
      ))}
    </div>
  );
}

// Step 02: Build — layout blocks stack up
function Step2Anim() {
  const blocks = [
    { h: "h-6",  bg: "bg-slate-800", w: "58%",  delay: 0 },
    { h: "h-2.5", bg: "bg-slate-300", w: "80%",  delay: 0.3 },
    { h: "h-2.5", bg: "bg-slate-300", w: "65%",  delay: 0.5 },
    { h: "h-8",  bg: "bg-blue-500",  w: "42%",  delay: 0.8 },
  ];
  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full px-8 py-4">
      {blocks.map((b, i) => (
        <motion.div
          key={i}
          className={`${b.h} ${b.bg} rounded-md`}
          style={{ width: b.w, transformOrigin: "left" }}
          animate={{ scaleX: [0, 0, 1], opacity: [0, 0, 1] }}
          transition={{
            duration: 2.5,
            times: [0, b.delay / 2.5, Math.min((b.delay + 0.4) / 2.5, 1)],
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

// Step 03: Optimize — A/B bars + winning badge
function Step3Anim() {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <motion.div
        className="flex items-center gap-1.5 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full"
        animate={{ opacity: [0, 0, 0, 1, 1, 0], y: [4, 4, 4, 0, 0, -4], scale: [0.9, 0.9, 0.9, 1, 1, 0.9] }}
        transition={{ duration: 4.5, times: [0, 0.35, 0.42, 0.52, 0.78, 0.95], repeat: Infinity, repeatDelay: 0.5 }}
      >
        <TrendingUp className="h-3 w-3" />
        Variant B winning +34%
      </motion.div>
      <div className="grid grid-cols-2 gap-2 w-36">
        {["Variant A", "Variant B"].map((label, i) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <motion.div
              className="w-full rounded-md"
              animate={i === 1 ? {
                height: [24, 24, 52, 52, 24],
                backgroundColor: ["#f1f5f9", "#f1f5f9", "#34d399", "#34d399", "#f1f5f9"],
              } : { height: 24, backgroundColor: "#f1f5f9" }}
              transition={i === 1 ? { duration: 4.5, times: [0, 0.18, 0.28, 0.72, 1], repeat: Infinity, repeatDelay: 0.5 } : {}}
            />
            <span className="text-xs text-slate-400 font-medium">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FAQItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-slate-50 transition-colors"
        onClick={onToggle}
      >
        <span className="font-semibold text-slate-900 pr-4">{q}</span>
        <ChevronDown className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-6 pb-5 bg-white text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandingPages() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="flex flex-col min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-12 pb-20 lg:pt-16 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 flex flex-col gap-7"
            >
              <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-[1.05] tracking-tight">
                Your Website Is Either<br />
                Winning You Clients — or<br />
                <span className="text-blue-600">Losing Them.</span>
              </h1>

              <p className="text-xl text-slate-600 max-w-xl leading-relaxed">
                We design and build beautiful, fast-loading websites and landing pages
                that turn visitors into paying clients. No templates. No page builders.
                Built to convert.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button href="/case-studies" size="lg" icon>
                  See Our Work
                </Button>
                <Button href="/free-ai-audit" variant="secondary" size="lg">
                  Get My Free Quote
                </Button>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {[
                  "Live in 5–14 days",
                  "Mobile-first design",
                  "Built to convert",
                ].map((t) => (
                  <span key={t} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right — Website Preview Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
                {/* Browser chrome */}
                <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex-1 bg-white border border-slate-200 rounded-md px-3 py-1 text-xs text-slate-400 mx-2">
                    yourbusiness.com
                  </div>
                </div>

                {/* Simulated website */}
                <div className="bg-slate-900 px-6 pt-8 pb-6">
                  {/* Nav */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="h-3 w-20 bg-white/30 rounded" />
                    <div className="flex gap-3">
                      {[1,2,3].map(i => <div key={i} className="h-2 w-10 bg-white/20 rounded" />)}
                    </div>
                  </div>
                  {/* Hero text */}
                  <motion.div
                    animate={{ opacity: [0, 1] }}
                    transition={{ duration: 0.8, delay: 0.5, repeat: Infinity, repeatDelay: 5 }}
                  >
                    <div className="h-4 w-3/4 bg-white rounded mb-2" />
                    <div className="h-4 w-1/2 bg-white rounded mb-5" />
                    <div className="h-2.5 w-full bg-white/30 rounded mb-1.5" />
                    <div className="h-2.5 w-5/6 bg-white/30 rounded mb-6" />
                  </motion.div>
                  {/* CTA button */}
                  <motion.div
                    className="inline-block bg-blue-500 rounded-lg px-5 py-2.5"
                    animate={{ scale: [1, 1.04, 1], backgroundColor: ["#3b82f6", "#2563eb", "#3b82f6"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                  >
                    <div className="h-2.5 w-24 bg-white rounded" />
                  </motion.div>
                </div>

                {/* Below fold preview */}
                <div className="px-6 py-5 bg-white">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-14 bg-slate-50 border border-slate-100 rounded-lg flex flex-col items-center justify-center gap-1 p-2">
                        <div className="h-2 w-8 bg-blue-200 rounded" />
                        <div className="h-1.5 w-12 bg-slate-200 rounded" />
                      </div>
                    ))}
                  </div>
                  {/* Star rating row */}
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(i => <Star key={i} className="h-3 w-3 text-yellow-400 fill-yellow-400" />)}
                    </div>
                    <div className="h-1.5 w-32 bg-slate-200 rounded" />
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Proof Bar ─────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-blue-50/60 to-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <TrendingUp className="h-5 w-5 text-blue-600" />,     stat: "3–5×",    label: "more leads vs. generic sites" },
              { icon: <Zap className="h-5 w-5 text-blue-600" />,            stat: "< 2s",    label: "average page load time" },
              { icon: <LayoutTemplate className="h-5 w-5 text-blue-600" />, stat: "5 days",  label: "landing page to live" },
              { icon: <DollarSign className="h-5 w-5 text-blue-600" />,     stat: "$0",      label: "in designer or dev fees" },
            ].map((item, i) => (
              <motion.div
                key={item.stat}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col items-center text-center"
              >
                <div className="bg-blue-50 rounded-xl p-2.5 w-10 h-10 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <span className="text-4xl font-extrabold text-emerald-600 leading-none mb-1.5">{item.stat}</span>
                <span className="text-xs font-semibold text-slate-500 leading-snug">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What We Build ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              One team. Every type of site.
            </h2>
            <p className="text-xl text-slate-500 max-w-xl mx-auto">
              Whether you need a full online presence or a single converting page, we build it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Globe className="h-5 w-5 text-blue-600" />,
                title: "Full Business Website",
                description: "A complete online presence — Home, About, Services, Contact, and Blog. Designed to rank on Google and convert visitors into clients.",
                tags: ["Custom design", "SEO-ready", "CMS included"],
                delay: 0,
              },
              {
                icon: <MousePointer className="h-5 w-5 text-blue-600" />,
                title: "Targeted Landing Page",
                description: "One page, one goal. Built to match a specific ad, campaign, or offer. Loads fast, converts high, and is tested continuously.",
                tags: ["A/B tested", "Ad-matched", "< 2s load time"],
                delay: 0.1,
              },
              {
                icon: <TrendingUp className="h-5 w-5 text-blue-600" />,
                title: "Lead Magnet Funnel",
                description: "A sequence of pages designed to capture leads, nurture them, and guide them toward booking a call — fully automated.",
                tags: ["Email capture", "Auto follow-up", "Multi-step"],
                delay: 0.2,
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: card.delay }}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col gap-5"
              >
                <div className="bg-blue-50 rounded-xl p-2.5 w-10 h-10 flex items-center justify-center">
                  {card.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-xl mb-2">{card.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{card.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {card.tags.map((tag) => (
                    <span key={tag} className="bg-slate-100 text-slate-600 text-xs font-semibold rounded-full px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              From blank slate to live<br className="hidden sm:block" /> website in days, not months.
            </h2>
            <p className="text-xl text-slate-500 max-w-xl mx-auto">
              We handle everything. You just review, approve, and watch clients come in.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "Step 01",
                anim: <Step1Anim />,
                title: "We learn your business and goals",
                desc: "A discovery call to understand your audience, competitors, and what 'converted' means for you. We use this to write copy and design a site that speaks directly to your buyers.",
                delay: 0,
              },
              {
                step: "Step 02",
                anim: <Step2Anim />,
                title: "We design and build it",
                desc: "Full custom design, copywriting, and development. You review every page before anything goes live. No surprises, no templates, no 'we'll fix it later.'",
                delay: 0.1,
              },
              {
                step: "Step 03",
                anim: <Step3Anim />,
                title: "It performs and improves",
                desc: "Built-in analytics, monthly performance reviews, and A/B testing. Your site gets measurably better over time — without you lifting a finger.",
                delay: 0.2,
              },
            ].map((s) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: s.delay }}
                className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col"
              >
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{s.step}</p>
                <div className="h-44 bg-slate-50 rounded-xl mb-6 overflow-hidden flex items-center justify-center">
                  {s.anim}
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problem Recognition ───────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Your website is costing you<br className="hidden sm:block" /> clients every day.
            </h2>
            <p className="text-xl text-slate-500 max-w-xl mx-auto">
              A slow, generic, or confusing site isn't neutral — it's actively losing you business.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
          >
            <div className="bg-slate-50 border-b border-slate-200 px-7 py-5 flex items-center gap-3">
              <Globe className="h-5 w-5 text-slate-400" />
              <span className="text-sm font-semibold text-slate-600">What a bad website costs you:</span>
            </div>

            <div className="px-7 py-6 space-y-5">
              {[
                {
                  pain: "A potential client checks your website.",
                  result: "It looks outdated and loads slowly. They leave in 8 seconds and never come back.",
                },
                {
                  pain: "Your competitor has a clean, fast, professional site.",
                  result: "They book without comparing prices. You lose the job before you even knew about it.",
                },
                {
                  pain: "Your site takes 6 seconds to load on mobile.",
                  result: "Google buries you in search results. Your competitor on page one gets the call.",
                },
                {
                  pain: "There's no clear 'Book Now' or 'Call Us' on the homepage.",
                  result: "Visitors scroll around, read a bit, and leave without contacting you.",
                },
                {
                  pain: "You spent $8k on ads sending traffic to your homepage.",
                  result: "It converts at 1%. You burned $7,920 on traffic that bounced. The page was the problem.",
                },
              ].map((item) => (
                <div key={item.pain}>
                  <p className="text-slate-800 font-medium text-sm">· {item.pain}</p>
                  <p className="text-slate-400 text-sm mt-0.5 pl-3">{item.result}</p>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 border-t border-slate-100 px-7 py-5">
              <p className="text-slate-400 italic text-sm">
                "I was embarrassed to send people to my website. Now it's my best salesperson — books 3–4 consultations a week on its own." — Law firm owner, NY
              </p>
            </div>
          </motion.div>

          <p className="text-center text-slate-600 text-lg font-medium mt-10">
            Your website should work as hard as you do.
          </p>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-slate-900">
              What business owners<br /> ask us every week.
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <React.Fragment key={i}>
                <FAQItem
                  q={faq.q}
                  a={faq.a}
                  open={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      <BookingSection />
    </div>
  );
}
