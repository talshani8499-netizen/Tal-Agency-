import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { BookingSection } from "@/components/BookingSection";
import { motion } from "motion/react";
import {
  MessageSquare,
  UserCheck,
  Users,
  Zap,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

// ─── FAQ Accordion ────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "Will visitors know they're talking to AI?",
    a: "Most don't. The agent uses your brand name, your tone, and your knowledge base. It's trained to sound like your best customer-facing employee. We offer a live preview before you go live so you can hear it yourself.",
  },
  {
    q: "What happens when someone is ready to buy?",
    a: "The agent captures their contact info and routes the conversation — or a real-time SMS/email alert — directly to you or your sales team. Hot leads never sit in a queue.",
  },
  {
    q: "Does it work on any website?",
    a: "Yes. One line of code embeds it on Webflow, WordPress, Shopify, Wix, or any custom-built site. No developer required.",
  },
  {
    q: "Can it answer complex product or service questions?",
    a: "Yes. We train it on your full catalog, FAQs, pricing, policies, and anything else you give us. The more context you provide, the smarter and more accurate it gets.",
  },
  {
    q: "What if it can't answer something?",
    a: "It tells the visitor it'll follow up, captures their contact info, and flags the question for you. No dead ends, no frustrated visitors left hanging.",
  },
  {
    q: "How long does setup take?",
    a: "3–5 business days from your onboarding call. We handle all the training, testing, and installation. You just review it before we go live.",
  },
  {
    q: "What does it cost?",
    a: "Most clients pay $200–$400/month — usually recovered in the first 2–3 leads the agent captures. Get a custom quote on your free audit call.",
  },
];

// ─── Step Animations ──────────────────────────────────────────────────────────

// Step 01: Visitor arrives → chat bubble opens
function Step1Anim() {
  return (
    <div className="relative flex items-center justify-center h-full w-full">
      {/* Browser chrome mockup */}
      <div className="w-40 h-28 bg-slate-100 rounded-lg border border-slate-200 flex flex-col overflow-hidden">
        <div className="bg-slate-200 px-2 py-1.5 flex items-center gap-1">
          <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
          <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
          <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
        </div>
        <div className="flex-1 p-2 flex flex-col gap-1.5">
          <div className="h-2 bg-slate-200 rounded w-full" />
          <div className="h-2 bg-slate-200 rounded w-3/4" />
          <div className="h-2 bg-slate-200 rounded w-5/6" />
        </div>
      </div>
      {/* Chat bubble pop */}
      <motion.div
        className="absolute bottom-3 right-6 bg-blue-600 rounded-2xl rounded-br-sm px-3 py-2 flex items-center gap-1.5 shadow-md"
        animate={{ scale: [0, 0, 1.08, 1], opacity: [0, 0, 1, 1] }}
        transition={{
          duration: 3.5,
          times: [0, 0.3, 0.65, 0.8],
          repeat: Infinity,
          repeatDelay: 1.5,
          ease: "easeOut",
        }}
      >
        <MessageSquare className="h-3.5 w-3.5 text-white" />
        <span className="text-white text-xs font-semibold">Hi! How can I help?</span>
      </motion.div>
    </div>
  );
}

// Step 02: Conversation — alternating chat bubbles
function Step2Anim() {
  const bubbles = [
    { side: "left",  delay: 0,   w: "70%", text: "What's your pricing?" },
    { side: "right", delay: 1.3, w: "80%", text: "Starting at $299/mo..." },
    { side: "left",  delay: 2.7, w: "55%", text: "Do you offer trials?" },
    { side: "right", delay: 3.8, w: "75%", text: "Yes! 14 days free." },
  ];
  return (
    <div className="flex flex-col justify-center gap-2.5 w-full px-6 py-2">
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          className={`h-7 rounded-2xl flex-shrink-0 flex items-center px-2.5 ${
            b.side === "left"
              ? "bg-slate-200 self-start rounded-tl-sm"
              : "bg-blue-200 self-end rounded-tr-sm"
          }`}
          style={{ width: b.w }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0.85, 1, 1, 0.85] }}
          transition={{
            duration: 1.0,
            times: [0, 0.15, 0.7, 1],
            delay: b.delay,
            repeat: Infinity,
            repeatDelay: 4.5 - b.delay,
          }}
        />
      ))}
    </div>
  );
}

// Step 03: Lead captured — contact card + CRM badge
function Step3Anim() {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <motion.div
        className="flex items-center gap-1.5 bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full"
        animate={{
          opacity: [0, 0, 0, 1, 1, 0],
          y: [4, 4, 4, 0, 0, -4],
          scale: [0.9, 0.9, 0.9, 1, 1, 0.9],
        }}
        transition={{
          duration: 4.5,
          times: [0, 0.35, 0.42, 0.52, 0.78, 0.95],
          repeat: Infinity,
          repeatDelay: 0.5,
        }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-white shrink-0" />
        New lead saved to CRM
      </motion.div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3 w-40">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-7 w-7 rounded-full bg-blue-100 flex items-center justify-center">
            <UserCheck className="h-3.5 w-3.5 text-blue-600" />
          </div>
          <div>
            <div className="h-2 w-16 bg-slate-800 rounded mb-1" />
            <div className="h-1.5 w-12 bg-slate-300 rounded" />
          </div>
        </div>
        {[4, 3, 5].map((w, i) => (
          <motion.div
            key={i}
            className="h-1.5 bg-slate-200 rounded mb-1.5"
            style={{ width: `${w * 14}%` }}
            animate={i === 0 ? { backgroundColor: ["#e2e8f0", "#e2e8f0", "#34d399", "#34d399", "#e2e8f0"] } : {}}
            transition={i === 0 ? { duration: 4.5, times: [0, 0.18, 0.28, 0.72, 1], repeat: Infinity, repeatDelay: 0.5 } : {}}
          />
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

export default function ChatAgents() {
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
                Your Website Visitor<br />
                Just Left. Did You<br />
                <span className="text-blue-600">Capture Them?</span>
              </h1>

              <p className="text-xl text-slate-600 max-w-xl leading-relaxed">
                Our AI chat agent engages every visitor instantly — answers questions,
                captures leads, and hands off hot prospects to your team before they bounce.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button href="/free-ai-audit" size="lg" icon>
                  Get My Free Setup Quote
                </Button>
                <Button href="/ai-voice-demo" variant="secondary" size="lg">
                  See It In Action
                </Button>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {[
                  "Responds in under 1 second",
                  "Captures leads 24/7",
                  "No code needed",
                ].map((t) => (
                  <span key={t} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right — Chat Activity Widget */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-semibold text-slate-700">Chat Activity · Live</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-emerald-600 font-medium">Active</span>
                  </div>
                </div>

                {[
                  { name: "Bloom Florist — Pricing question", time: "1 min ago", badge: "Engaged", color: "blue" },
                  { name: "Vertex SaaS — Demo request", time: "9 min ago", badge: "Lead captured", color: "emerald" },
                  { name: "Peak Fitness — Membership inquiry", time: "22 min ago", badge: "Routed", color: "emerald" },
                ].map((row) => (
                  <div key={row.name} className="px-5 py-3.5 flex items-center justify-between border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <MessageSquare className={`h-4 w-4 shrink-0 text-${row.color}-500`} />
                      <div>
                        <p className="text-sm font-medium text-slate-800">{row.name}</p>
                        <p className="text-xs text-slate-400">{row.time}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full bg-${row.color}-50 text-${row.color}-700`}>
                      {row.badge}
                    </span>
                  </div>
                ))}

                <div className="bg-emerald-50 border-t border-emerald-100 px-5 py-4 flex items-center gap-3">
                  <Users className="h-5 w-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-emerald-800">12 leads captured today</p>
                    <p className="text-xs text-emerald-600">while you were offline</p>
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
              { icon: <Zap className="h-5 w-5 text-blue-600" />,           stat: "< 1s",  label: "response time" },
              { icon: <ArrowRight className="h-5 w-5 text-blue-600" />,    stat: "3×",    label: "more leads vs. contact form" },
              { icon: <MessageSquare className="h-5 w-5 text-blue-600" />, stat: "24/7",  label: "coverage without staff" },
              { icon: <CheckCircle2 className="h-5 w-5 text-blue-600" />,  stat: "0",     label: "missed conversations" },
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

      {/* ── How It Works ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              What happens every time<br className="hidden sm:block" /> someone visits your site.
            </h2>
            <p className="text-xl text-slate-500 max-w-xl mx-auto">
              Automatic, every visitor, 24/7. No action needed from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: 0 }}
              className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col"
            >
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Step 01</p>
              <div className="h-44 bg-slate-50 rounded-xl mb-6 overflow-hidden flex items-center justify-center">
                <Step1Anim />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">A visitor lands on your site</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Within 1 second, your AI chat agent greets them by name if they're returning, speaks in any language, and opens the conversation using your brand voice.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col"
            >
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Step 02</p>
              <div className="h-44 bg-slate-50 rounded-xl mb-6 overflow-hidden flex items-center justify-center">
                <Step2Anim />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">The AI handles every question</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Pricing, services, availability, FAQs — the agent answers accurately and qualifies the visitor with smart follow-up questions. No scripts, no robotic responses.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col"
            >
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Step 03</p>
              <div className="h-44 bg-slate-50 rounded-xl mb-6 overflow-hidden flex items-center justify-center">
                <Step3Anim />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Lead captured or handed off</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Contact info saved to your CRM instantly. Hot leads trigger a real-time SMS or email alert to you — so you can follow up while they're still warm.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Problem Recognition ───────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              You're losing leads to your<br className="hidden sm:block" /> "Contact Us" form.
            </h2>
            <p className="text-xl text-slate-500 max-w-xl mx-auto">
              Most visitors who don't get an instant answer leave — and never come back.
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
              <MessageSquare className="h-5 w-5 text-slate-400" />
              <span className="text-sm font-semibold text-slate-600">A typical week with just a contact form:</span>
            </div>

            <div className="px-7 py-6 space-y-5">
              {[
                {
                  pain: "Visitor asks about pricing on your site.",
                  result: "No response. They Google your competitor and book with them instead.",
                },
                {
                  pain: "A lead fills out your form at 8pm.",
                  result: "You reply the next morning. They already hired someone else.",
                },
                {
                  pain: "You're paying $2,000/month in ads driving traffic to your site.",
                  result: "90% bounce without leaving a name or number. You have no idea who they were.",
                },
                {
                  pain: "Your 'Contact Us' page has a 2–3 day reply time.",
                  result: "Serious buyers don't wait 3 days. Your close rate is suffering.",
                },
                {
                  pain: "Someone wants a quick quote and types in the chat.",
                  result: "Silence. They waited 2 days, heard nothing, called your competitor.",
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
                "I didn't realize how many people were just leaving. The chat agent doubled my leads in the first month." — E-commerce client
              </p>
            </div>
          </motion.div>

          <p className="text-center text-slate-600 text-lg font-medium mt-10">
            There's a simpler fix than you think.
          </p>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
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
