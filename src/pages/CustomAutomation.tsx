import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CTABanner } from "@/components/ui/CTABanner";
import { motion } from "motion/react";
import {
  Workflow,
  Clock,
  CheckCircle2,
  ChevronDown,
  Settings,
  Zap,
  Users,
  ArrowRight,
} from "lucide-react";

// ─── FAQ Accordion ────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "Do you replace the tools I'm already using?",
    a: "Never. We connect your existing tools together — CRM, email, spreadsheets, Slack, invoicing, whatever you're on. No migration, no retraining your team, no disruption.",
  },
  {
    q: "What kinds of things can you automate?",
    a: "Data entry, lead routing, client onboarding, invoice processing, reporting, internal notifications, file management, and much more. If your team does it manually more than twice a week, we can likely automate it.",
  },
  {
    q: "What if a workflow breaks?",
    a: "We monitor every automation and address issues proactively. You'll never come in to a broken system without us already knowing about it and working on a fix.",
  },
  {
    q: "I'm not technical — can I still use this?",
    a: "Absolutely. You describe the problem in plain English during a 30-minute call. We handle everything technical. You just tell us what's eating your team's time.",
  },
  {
    q: "How do you figure out what to automate first?",
    a: "We start with a free audit call. You walk us through your most painful manual processes and we map out an automation blueprint — prioritized by time saved and ease of implementation.",
  },
  {
    q: "How long does setup take?",
    a: "3–5 business days for straightforward automations. Complex multi-system workflows with custom logic may take 1–2 weeks. We'll give you an honest timeline on the audit call.",
  },
  {
    q: "What does it cost?",
    a: "Most clients pay $300–$700/month. One saved hour per day per employee pays for itself fast — most see ROI in the first week.",
  },
];

// ─── Platform data ─────────────────────────────────────────────────────────────

const row1 = ["HubSpot", "Salesforce", "Pipedrive", "Zoho CRM", "Gmail", "Google Sheets", "Airtable", "Notion", "Slack", "Monday.com", "Asana", "Trello"];
const row2 = ["Zapier", "Make", "QuickBooks", "Xero", "Stripe", "Shopify", "Calendly", "Mailchimp", "ActiveCampaign", "Twilio", "Typeform", "Webflow"];

// ─── Step Animations ──────────────────────────────────────────────────────────

function Step1Anim() {
  const items = [
    { delay: 0,   w: "70%" },
    { delay: 0.7, w: "55%" },
    { delay: 1.4, w: "80%" },
    { delay: 2.1, w: "60%" },
  ];
  return (
    <div className="flex flex-col justify-center gap-2.5 w-full px-6 py-4">
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="h-7 bg-white border border-slate-200 rounded-lg flex items-center gap-2 px-2.5"
          style={{ width: item.w }}
          animate={{ opacity: [0, 1, 1, 0], x: [-12, 0, 0, -12] }}
          transition={{ duration: 1.1, times: [0, 0.2, 0.7, 1], delay: item.delay, repeat: Infinity, repeatDelay: 4.2 - item.delay }}
        >
          <motion.div
            animate={{ backgroundColor: ["#e2e8f0", "#e2e8f0", "#34d399"] }}
            transition={{ duration: 0.3, delay: item.delay + 0.4, repeat: Infinity, repeatDelay: 5.2 - item.delay }}
            className="h-3.5 w-3.5 rounded-sm border border-slate-300 shrink-0"
          />
          <div className="h-2 bg-slate-200 rounded flex-1" />
        </motion.div>
      ))}
    </div>
  );
}

function Step2Anim() {
  return (
    <div className="flex items-center justify-center gap-0 w-full px-6">
      <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
        <Settings className="h-4 w-4 text-blue-500" />
      </div>
      <div className="flex-1 h-0.5 bg-slate-100 relative overflow-hidden mx-1">
        <motion.div
          className="absolute top-0 left-0 h-full bg-blue-400 rounded-full"
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
          style={{ width: "40%" }}
        />
      </div>
      <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
        <Zap className="h-4 w-4 text-white" />
      </div>
      <div className="flex-1 h-0.5 bg-slate-100 relative overflow-hidden mx-1">
        <motion.div
          className="absolute top-0 left-0 h-full bg-emerald-400 rounded-full"
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 1.2, delay: 0.4, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
          style={{ width: "40%" }}
        />
      </div>
      <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
      </div>
    </div>
  );
}

function Step3Anim() {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <motion.div
        className="flex items-center gap-1.5 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full"
        animate={{ opacity: [0, 0, 0, 1, 1, 0], y: [4, 4, 4, 0, 0, -4] }}
        transition={{ duration: 4.5, times: [0, 0.35, 0.42, 0.52, 0.78, 0.95], repeat: Infinity, repeatDelay: 0.5 }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
        342 tasks run · 0 errors
      </motion.div>
      <div className="relative h-16 w-16 flex items-center justify-center">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Settings className="h-10 w-10 text-slate-300" />
        </motion.div>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: [0, 0, 0, 1, 1, 0], scale: [0.6, 0.6, 0.6, 1, 1, 0.6] }}
          transition={{ duration: 4.5, times: [0, 0.3, 0.45, 0.55, 0.78, 0.95], repeat: Infinity, repeatDelay: 0.5 }}
        >
          <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth={3}>
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </motion.div>
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

export default function CustomAutomation() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="flex flex-col min-h-screen pt-16">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-12 pb-20 lg:pt-16 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 flex flex-col gap-7"
            >
              <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-[1.05] tracking-tight">
                Your Team Is Drowning<br />
                in Tasks a Robot<br />
                <span className="text-blue-600">Should Be Doing.</span>
              </h1>

              <p className="text-xl text-slate-600 max-w-xl leading-relaxed">
                We map your most time-draining workflows and automate them end-to-end —
                so your team spends time on real work, not copying data between apps.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button href="/free-ai-audit" size="lg" icon>
                  Get My Free Setup Quote
                </Button>
                <Button href="/case-studies" variant="secondary" size="lg">
                  See What We've Automated
                </Button>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {["10+ hours saved per employee/week", "Works with 500+ tools", "No IT team needed"].map((t) => (
                  <span key={t} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Workflow className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-semibold text-slate-700">Automation Dashboard · Live</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-emerald-600 font-medium">Running</span>
                  </div>
                </div>

                {[
                  { name: "Invoice #4421 — logged to QuickBooks", time: "Just now", badge: "Automated", color: "emerald" },
                  { name: "New lead — synced to HubSpot CRM", time: "4 min ago", badge: "Automated", color: "emerald" },
                  { name: "Client signed — onboarding email sent", time: "17 min ago", badge: "Automated", color: "emerald" },
                ].map((row) => (
                  <div key={row.name} className="px-5 py-3.5 flex items-center justify-between border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <Zap className={`h-4 w-4 shrink-0 text-${row.color}-500`} />
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
                  <Settings className="h-5 w-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-emerald-800">342 tasks automated this week</p>
                    <p className="text-xs text-emerald-600">zero manual steps</p>
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
              { icon: <Clock className="h-5 w-5 text-blue-600" />,    stat: "10+",  label: "hours saved per employee/week" },
              { icon: <Workflow className="h-5 w-5 text-blue-600" />, stat: "500+", label: "tools we can connect" },
              { icon: <Zap className="h-5 w-5 text-blue-600" />,      stat: "< 5",  label: "days to deploy" },
              { icon: <Users className="h-5 w-5 text-blue-600" />,    stat: "0",    label: "manual steps after setup" },
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

      {/* ── What Can Be Automated ─────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              If your team does it manually,<br className="hidden sm:block" /> we can probably automate it.
            </h2>
            <p className="text-xl text-slate-500 max-w-xl mx-auto">
              Here's what we've already built for businesses like yours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                industry: "Real Estate",
                title: "New lead auto-routed to agent + CRM",
                desc: "Zillow/Realtor.com lead arrives → contact created in CRM + welcome email sent + agent notified via Slack. All in 30 seconds.",
                before: "2 hrs manual work",
                after: "0",
                delay: 0,
              },
              {
                industry: "Home Services",
                title: "Job complete → invoice + review request",
                desc: "Technician marks job done in the field → QuickBooks invoice generated + review request SMS sent to client automatically.",
                before: "45 min per job",
                after: "instant",
                delay: 0.07,
              },
              {
                industry: "Law Firm",
                title: "Consultation booked → intake packet sent",
                desc: "Client books via Calendly → intake form emailed + client folder created in Google Drive + paralegal notified.",
                before: "30 min admin work",
                after: "0",
                delay: 0.14,
              },
              {
                industry: "E-commerce",
                title: "Order placed → fulfillment + inventory sync",
                desc: "Order hits Shopify → warehouse notified + inventory updated + tracking email sent to customer. No human touch required.",
                before: "3 manual steps",
                after: "fully automated",
                delay: 0.21,
              },
              {
                industry: "Medical / Dental",
                title: "No-show → auto-reschedule + follow-up",
                desc: "Patient misses appointment → cancellation logged + reschedule SMS sent + slot reopened in booking calendar.",
                before: "$200 avg lost",
                after: "recovered",
                delay: 0.28,
              },
              {
                industry: "Agency / Consulting",
                title: "Client onboarded → full kickoff flow",
                desc: "Contract signed → kickoff email + project folder + Slack channel + first invoice — all created automatically.",
                before: "1 hr setup",
                after: "3 minutes",
                delay: 0.35,
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: card.delay }}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="bg-slate-100 text-slate-500 text-xs font-semibold px-2.5 py-1 rounded-full shrink-0">
                    {card.industry}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">{card.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{card.desc}</p>
                </div>
                <div className="mt-auto pt-3 border-t border-slate-100 flex items-center gap-2 text-sm">
                  <span className="text-slate-400 line-through">{card.before}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-300 shrink-0" />
                  <span className="text-emerald-600 font-semibold">{card.after}</span>
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
              From manual chaos<br className="hidden sm:block" /> to automated clarity.
            </h2>
            <p className="text-xl text-slate-500 max-w-xl mx-auto">
              We handle every step. You show up for one call, then watch it run.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "Step 01", anim: <Step1Anim />,
                title: "We audit your biggest time sinks",
                desc: "A 30-minute call where you walk us through the tasks your team repeats every day — data entry, follow-ups, file transfers, internal notifications. We map the biggest wins.",
                delay: 0,
              },
              {
                step: "Step 02", anim: <Step2Anim />,
                title: "We design and build the automation",
                desc: "Custom workflows connecting your existing tools — CRM, email, spreadsheets, Slack, invoicing — without replacing any software you already use or retraining your team.",
                delay: 0.1,
              },
              {
                step: "Step 03", anim: <Step3Anim />,
                title: "It runs 24/7 without you",
                desc: "Every trigger fires automatically, every task completes without human input. You get a live dashboard showing exactly what ran, when, and how many hours your team got back.",
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

      {/* ── Platform Carousel ─────────────────────────────────────────────── */}
      <section className="py-16 bg-white overflow-hidden">
        <style>{`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes scroll-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .carousel-left { animation: scroll-left 28s linear infinite; }
          .carousel-right { animation: scroll-right 22s linear infinite; }
          .carousel-track:hover .carousel-left,
          .carousel-track:hover .carousel-right { animation-play-state: paused; }
        `}</style>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
            We connect the tools you already use.
          </h2>
          <p className="text-lg text-slate-500">No switching, no migrating — just everything working together.</p>
        </div>

        <div className="carousel-track flex flex-col gap-4">
          {/* Row 1 — scrolls left */}
          <div className="overflow-hidden">
            <div className="carousel-left flex gap-3 w-max">
              {[...row1, ...row1].map((name, i) => (
                <span
                  key={i}
                  className="bg-white border border-slate-200 rounded-full px-4 py-2 text-sm font-medium text-slate-700 shadow-sm whitespace-nowrap"
                >
                  <span className="inline-block h-2 w-2 rounded-full bg-blue-400 mr-2 align-middle" />
                  {name}
                </span>
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right */}
          <div className="overflow-hidden">
            <div className="carousel-right flex gap-3 w-max">
              {[...row2, ...row2].map((name, i) => (
                <span
                  key={i}
                  className="bg-white border border-slate-200 rounded-full px-4 py-2 text-sm font-medium text-slate-700 shadow-sm whitespace-nowrap"
                >
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 mr-2 align-middle" />
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem Recognition ───────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Your best people are<br className="hidden sm:block" /> doing $15/hr work.
            </h2>
            <p className="text-xl text-slate-500 max-w-xl mx-auto">
              Every hour spent on manual tasks is an hour not spent growing your business.
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
              <Workflow className="h-5 w-5 text-slate-400" />
              <span className="text-sm font-semibold text-slate-600">A typical week before automation:</span>
            </div>

            <div className="px-7 py-6 space-y-5">
              {[
                { pain: "Your team manually copies lead data from email → CRM → spreadsheet.", result: "3 hours wasted. Errors everywhere. Someone always forgets a field." },
                { pain: "New client signs — 6 people need to be notified and kicked off.", result: "Someone emails the wrong thread. Onboarding gets delayed. Client notices." },
                { pain: "An invoice arrives and needs to be logged in QuickBooks.", result: "It sits in someone's inbox for 2 days. The backlog never clears." },
                { pain: "You use 4 tools that don't talk to each other.", result: "Your team is the connector. They hate it. It's slowing everything down." },
                { pain: "Reporting takes half a day every Friday.", result: "Pulling numbers from 3 systems by hand. Always a week behind. Always wrong." },
              ].map((item) => (
                <div key={item.pain}>
                  <p className="text-slate-800 font-medium text-sm">· {item.pain}</p>
                  <p className="text-slate-400 text-sm mt-0.5 pl-3">{item.result}</p>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 border-t border-slate-100 px-7 py-5">
              <p className="text-slate-400 italic text-sm">
                "I got 12 hours a week back — my EA was spending all her time on data entry. Now she focuses on actual client work." — Agency owner, FL
              </p>
            </div>
          </motion.div>

          <p className="text-center text-slate-600 text-lg font-medium mt-10">
            The fix is simpler — and faster — than you think.
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
              <FAQItem
                key={i}
                q={faq.q}
                a={faq.a}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
