import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { BookingSection } from "@/components/BookingSection";
import { motion } from "motion/react";
import {
  PhoneCall,
  PhoneMissed,
  CalendarCheck,
  CheckCircle2,
  DollarSign,
  Zap,
  ChevronDown,
} from "lucide-react";

// ─── FAQ Accordion ────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "Will callers know they're talking to AI?",
    a: "Most don't — and those who do don't care, as long as their question gets answered and their appointment gets booked. Your agent speaks naturally, uses your business name, and knows your services. We offer a live demo call so you can hear it yourself before deciding.",
  },
  {
    q: "What if a caller has a complex problem or wants a human?",
    a: "The agent is trained to recognize situations that need a human touch — complaints, detailed estimates, anything outside its scope — and transfers the call or takes a message immediately. You stay in control.",
  },
  {
    q: "Do I need to change my phone number?",
    a: "No. We set up a simple call-forward from your existing number. Nothing changes for your customers. If you want a new dedicated line, we can set that up too.",
  },
  {
    q: "What calendar systems does it connect to?",
    a: "Google Calendar, Calendly, Acuity, and most major scheduling tools. If you use something else, we'll check compatibility during your free audit — most tools have a solution.",
  },
  {
    q: "How long does setup take?",
    a: "5 business days from your onboarding call. We handle all the programming, testing, and configuration. You just show up for a 30-minute call at the start.",
  },
  {
    q: "What does it cost?",
    a: "Most of our clients pay $300–$600/month — typically recovered in the first 2–3 bookings. Get a custom quote on your free audit call.",
  },
  {
    q: "Can I cancel if it doesn't work out?",
    a: "Yes. No long-term contracts. If you're not seeing results in the first 30 days, we'll refund your first month — no questions asked.",
  },
];

// ─── Step Animations ──────────────────────────────────────────────────────────

// Step 01: Customer calls — incoming call ripple → AI answers (green)
function Step1Anim() {
  return (
    <div className="relative flex items-center justify-center h-full w-full">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border-2 border-blue-400"
          style={{ width: 56, height: 56 }}
          animate={{ scale: [1, 1, 2.2], opacity: [0, 0.7, 0] }}
          transition={{
            duration: 2,
            times: [0, 0.05, 1],
            delay: i * 0.55,
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: "easeOut",
          }}
        />
      ))}
      <div className="relative z-10 h-14 w-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-sm">
        <PhoneCall className="h-6 w-6 text-blue-500" />
      </div>
      <motion.div
        className="absolute z-20 h-14 w-14 rounded-2xl bg-emerald-500 flex items-center justify-center"
        animate={{ opacity: [0, 0, 0, 1, 1, 0], scale: [0.8, 0.8, 0.8, 1, 1, 0.8] }}
        transition={{
          duration: 7.15,
          times: [0, 0.24, 0.28, 0.35, 0.72, 0.85],
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth={3}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </motion.div>
    </div>
  );
}

// Step 02: AI conversation — alternating chat bubbles (customer ↔ AI)
function Step2Anim() {
  const bubbles = [
    { side: "left",  delay: 0,   w: "65%" },
    { side: "right", delay: 1.2, w: "75%" },
    { side: "left",  delay: 2.6, w: "45%" },
    { side: "right", delay: 3.6, w: "80%" },
  ];
  return (
    <div className="flex flex-col justify-center gap-2.5 w-full px-6 py-2">
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          className={`h-7 rounded-2xl flex-shrink-0 ${
            b.side === "left"
              ? "bg-slate-200 self-start rounded-tl-sm"
              : "bg-blue-200 self-end rounded-tr-sm"
          }`}
          style={{ width: b.w }}
          initial={{ opacity: 0, scale: 0.85 }}
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

// Step 03: Booking confirmed — calendar cell lights up + notification badge
function Step3Anim() {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <motion.div
        className="flex items-center gap-1.5 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full"
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
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
        New booking · Tue 2pm
      </motion.div>
      <div className="grid grid-cols-3 gap-1.5">
        {Array.from({ length: 6 }, (_, i) => i).map((i) => (
          <motion.div
            key={i}
            className="h-8 w-12 rounded-md"
            animate={i === 4 ? {
              backgroundColor: ["#f1f5f9", "#f1f5f9", "#34d399", "#34d399", "#f1f5f9"],
              scale: [1, 1, 1.06, 1, 1],
            } : { backgroundColor: "#f1f5f9" }}
            transition={i === 4 ? {
              duration: 4.5,
              times: [0, 0.18, 0.28, 0.72, 1],
              repeat: Infinity,
              repeatDelay: 0.5,
            } : {}}
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

export default function VoiceAgents() {
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
                Every Call Answered.<br />
                Every Appointment Booked.<br />
                <span className="text-blue-600">Even at 2am.</span>
              </h1>

              <p className="text-xl text-slate-600 max-w-xl leading-relaxed">
                Your AI voice agent picks up every call, answers questions, and books
                appointments directly into your calendar — while you focus on the job
                in front of you.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button href="/free-ai-audit" size="lg" icon>
                  Get My Free Setup Quote
                </Button>
                <Button href="/ai-voice-demo" variant="secondary" size="lg">
                  Hear a Live Demo Call
                </Button>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {[
                  "Answers in under 2 rings",
                  "Books into your calendar",
                  "No tech setup on your end",
                ].map((t) => (
                  <span key={t} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right — Call Activity Widget */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
                {/* Widget header */}
                <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <PhoneCall className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-semibold text-slate-700">AI Voice Agent · Right Now</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-emerald-600 font-medium">Active</span>
                  </div>
                </div>

                {/* Recent call rows */}
                {[
                  { name: "Mike's Plumbing — New inquiry", time: "2 min ago", badge: "Booked", color: "emerald" },
                  { name: "Dr. Kim's Dental — Appointment", time: "11 min ago", badge: "Booked", color: "emerald" },
                  { name: "Rivera Law — Lead qualified", time: "34 min ago", badge: "Qualified", color: "blue" },
                ].map((row) => (
                  <div key={row.name} className="px-5 py-3.5 flex items-center justify-between border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <PhoneCall className={`h-4 w-4 shrink-0 text-${row.color}-500`} />
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

                {/* Footer stat */}
                <div className="bg-emerald-50 border-t border-emerald-100 px-5 py-4 flex items-center gap-3">
                  <CalendarCheck className="h-5 w-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-emerald-800">18 appointments booked</p>
                    <p className="text-xs text-emerald-600">while the owner was on-site</p>
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
              { icon: <CalendarCheck className="h-5 w-5 text-blue-600" />, stat: "15–20", label: "extra bookings per month" },
              { icon: <PhoneCall className="h-5 w-5 text-blue-600" />,     stat: "100%",  label: "of calls answered" },
              { icon: <Zap className="h-5 w-5 text-blue-600" />,           stat: "< 2s",  label: "avg pickup time" },
              { icon: <DollarSign className="h-5 w-5 text-blue-600" />,    stat: "$0",    label: "added to payroll" },
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
              What happens every time<br className="hidden sm:block" /> your phone rings.
            </h2>
            <p className="text-xl text-slate-500 max-w-xl mx-auto">
              Automatic, every call, 24/7. No action needed from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Step 01 */}
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
              <h3 className="font-bold text-slate-900 text-lg mb-2">A customer calls your number</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Your existing number, unchanged. The AI picks up in under 2 seconds — no hold music, no menu. It answers as your business, by name.
              </p>
            </motion.div>

            {/* Step 02 */}
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
              <h3 className="font-bold text-slate-900 text-lg mb-2">The AI handles the conversation</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                It answers questions about your services, qualifies the caller, and guides them toward booking — in natural, human-sounding conversation. No scripts, no robotic menus.
              </p>
            </motion.div>

            {/* Step 03 */}
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
              <h3 className="font-bold text-slate-900 text-lg mb-2">Appointment booked. You're notified.</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                The AI books directly into your calendar and sends you a summary: who called, what they need, and when they're coming in. You never had to pick up.
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
              You're losing jobs to voicemail.
            </h2>
            <p className="text-xl text-slate-500 max-w-xl mx-auto">
              Every missed call is a lead that called your competitor next.
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
              <PhoneMissed className="h-5 w-5 text-slate-400" />
              <span className="text-sm font-semibold text-slate-600">A typical Tuesday without AI:</span>
            </div>

            <div className="px-7 py-6 space-y-5">
              {[
                {
                  pain: "Phone rings at 6pm while you're wrapping up a job.",
                  result: "Caller hung up. Called the next plumber on Google.",
                },
                {
                  pain: "Customer wants to reschedule — plays phone tag for 3 days.",
                  result: "They gave up. Left a 3-star review about 'hard to reach.'",
                },
                {
                  pain: "You're paying $18/hr to answer phones and take messages.",
                  result: "Half those messages never turn into booked jobs.",
                },
                {
                  pain: "You come in Monday to 7 missed calls from the weekend.",
                  result: "All 7 called someone else. That's $2,000+ you never saw.",
                },
                {
                  pain: "You're the only one who knows how to handle new inquiries.",
                  result: "The business stops when you stop answering.",
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
                "If I'm on a job, calls go to voicemail. Half never call back." — A contractor we spoke to before building this
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
