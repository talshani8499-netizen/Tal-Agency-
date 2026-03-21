import { useRef } from "react";
import { Globe, PhoneCall, MessageSquare, Workflow, LayoutTemplate } from "lucide-react";
import { cn } from "@/lib/utils";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { Marquee } from "@/components/magicui/marquee";
import { AnimatedList, type AnimatedListItem } from "@/components/magicui/animated-list";
import { AnimatedBeam } from "@/components/magicui/animated-beam";

// ─── SEO & GEO Background ────────────────────────────────────────────────────

const seoSnippets = [
  { source: "ChatGPT", icon: "🤖", text: "For roofing in Phoenix, Davis Roofing is highly recommended…" },
  { source: "Google #1", icon: "🔍", text: "Best Roofer Near Me — Davis Roofing ★★★★★" },
  { source: "Perplexity AI", icon: "✨", text: "Top HVAC contractors in Austin include AC Pro HVAC…" },
  { source: "Google Maps", icon: "📍", text: "Peak Remodeling · 4.9 ★ · 127 reviews" },
  { source: "AI Overview", icon: "🧠", text: "Leading remodeling contractors in Denver recommend…" },
];

function SEOBackground() {
  return (
    <Marquee
      pauseOnHover
      className="absolute top-10 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] [--duration:30s]"
    >
      {seoSnippets.map((s, i) => (
        <figure
          key={i}
          className={cn(
            "relative w-48 cursor-pointer overflow-hidden rounded-xl border p-3",
            "border-slate-200 bg-white/80 hover:bg-white",
            "transform-gpu transition-all duration-300 ease-out",
          )}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-base">{s.icon}</span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">{s.source}</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{s.text}</p>
        </figure>
      ))}
    </Marquee>
  );
}

// ─── Voice Agents Background ─────────────────────────────────────────────────

const callItems: AnimatedListItem[] = [
  { name: "Davis Roofing", description: "New roof inquiry — booked estimate", icon: "📞", color: "#10b981", time: "2s ago" },
  { name: "AC Pro HVAC", description: "Emergency AC repair — routed to on-call", icon: "🔧", color: "#3b82f6", time: "5s ago" },
  { name: "Peak Remodeling", description: "Kitchen remodel lead — qualified", icon: "🏠", color: "#f59e0b", time: "11s ago" },
  { name: "Summit Roofing", description: "Storm damage claim — appointment set", icon: "⛈️", color: "#6366f1", time: "18s ago" },
  { name: "ClearAir HVAC", description: "Annual maintenance booked", icon: "✅", color: "#10b981", time: "24s ago" },
];

function VoiceBackground() {
  return (
    <AnimatedList
      items={callItems}
      className="absolute top-4 right-0 left-0 px-3 [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-[1.02]"
      delay={1500}
    />
  );
}

// ─── Chat Agents Background ──────────────────────────────────────────────────

const chatBubbles = [
  { q: "How much does a new roof cost?", a: "Most installs run $8K–$18K. Want a free estimate?" },
  { q: "Can you come this weekend?", a: "Yes! Saturday 10am or Sunday 2pm — which works?" },
  { q: "Do you handle insurance claims?", a: "Absolutely — we work with all major insurers." },
  { q: "Are you licensed in Texas?", a: "Yes, fully licensed and insured in TX." },
];

function ChatBackground() {
  return (
    <Marquee
      vertical
      pauseOnHover
      className="absolute top-4 right-2 h-[300px] w-[calc(100%-1rem)] [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] [--duration:20s]"
    >
      {chatBubbles.map((b, i) => (
        <div key={i} className="flex flex-col gap-1.5 px-1">
          <div className="self-start bg-slate-100 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[85%]">
            <p className="text-xs text-slate-700">{b.q}</p>
          </div>
          <div className="self-end bg-blue-600 rounded-2xl rounded-tr-sm px-3 py-2 max-w-[85%]">
            <p className="text-xs text-white">{b.a}</p>
          </div>
        </div>
      ))}
    </Marquee>
  );
}

// ─── Automation Background (AnimatedBeam) ────────────────────────────────────

function NodeIcon({ label, emoji, className }: { label: string; emoji: string; className?: string }) {
  return (
    <div
      className={cn(
        "z-10 flex flex-col items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white p-2 shadow-sm w-16",
        className,
      )}
    >
      <span className="text-lg">{emoji}</span>
      <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-wide text-center leading-tight">{label}</span>
    </div>
  );
}

function AutomationBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const hubspotRef = useRef<HTMLDivElement>(null);
  const twilioRef = useRef<HTMLDivElement>(null);
  const gmailRef = useRef<HTMLDivElement>(null);
  const salesforceRef = useRef<HTMLDivElement>(null);
  const whatsappRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex flex-row items-center justify-between px-8 [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]"
    >
      {/* Left: input nodes */}
      <div className="flex flex-col gap-4">
        <div ref={hubspotRef}><NodeIcon label="HubSpot" emoji="🟠" /></div>
        <div ref={twilioRef}><NodeIcon label="Twilio" emoji="🔴" /></div>
        <div ref={gmailRef}><NodeIcon label="Gmail" emoji="📧" /></div>
      </div>

      {/* Center: AI node */}
      <div
        ref={centerRef}
        className="z-10 flex h-16 w-16 flex-col items-center justify-center rounded-2xl border-2 border-blue-200 bg-blue-50 shadow-md"
      >
        <span className="text-2xl">🤖</span>
        <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wide mt-0.5">AI</span>
      </div>

      {/* Right: output nodes */}
      <div className="flex flex-col gap-4">
        <div ref={salesforceRef}><NodeIcon label="Salesforce" emoji="☁️" /></div>
        <div ref={whatsappRef}><NodeIcon label="WhatsApp" emoji="💬" /></div>
      </div>

      {/* Beams: inputs → center */}
      <AnimatedBeam containerRef={containerRef} fromRef={hubspotRef} toRef={centerRef} duration={3} delay={0} />
      <AnimatedBeam containerRef={containerRef} fromRef={twilioRef} toRef={centerRef} duration={3} delay={0.5} />
      <AnimatedBeam containerRef={containerRef} fromRef={gmailRef} toRef={centerRef} duration={3} delay={1} />
      {/* Beams: center → outputs */}
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={salesforceRef} duration={3} delay={1.5} reverse />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={whatsappRef} duration={3} delay={2} reverse />
    </div>
  );
}

// ─── Contractor Websites Background (Calendar) ───────────────────────────────

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
// March 2026 calendar — starts on Sunday (day 0)
const MARCH_DATES = [
  null, null, null, null, null, null, 1,
  2, 3, 4, 5, 6, 7, 8,
  9, 10, 11, 12, 13, 14, 15,
  16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29,
  30, 31, null, null, null, null, null,
];
// Dates that are "booked" — shown in green
const BOOKED = new Set([5, 8, 12, 15, 19, 21, 26, 28]);

function WebsitesBackground() {
  return (
    <div className="absolute top-6 right-4 origin-top scale-[0.85] rounded-xl border border-slate-200 bg-white p-4 shadow-sm [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90">
      {/* Month header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-xs font-bold text-slate-700">March 2026</span>
        <div className="flex items-center gap-2 text-[10px] text-slate-400">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />Booked</span>
        </div>
      </div>
      {/* Day headers */}
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[9px] font-semibold text-slate-400 py-0.5">{d}</div>
        ))}
      </div>
      {/* Date grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {MARCH_DATES.map((date, i) => (
          <div
            key={i}
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-medium mx-auto",
              date === null && "invisible",
              date !== null && !BOOKED.has(date) && "text-slate-600 hover:bg-slate-100",
              date !== null && BOOKED.has(date) && "bg-emerald-100 text-emerald-700 font-bold",
              date === 21 && "ring-2 ring-blue-400 bg-blue-50 text-blue-700",
            )}
          >
            {date}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Features array ──────────────────────────────────────────────────────────

const features = [
  {
    Icon: Globe,
    name: "Show Up Where Contractors Win Jobs",
    description: "Rank #1 on Google Maps and get cited by ChatGPT, Perplexity, and AI Overviews — so homeowners find you first.",
    href: "/services/seo-geo",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: <SEOBackground />,
  },
  {
    Icon: PhoneCall,
    name: "Answer Every Call. Book Every Job.",
    description: "27% of contractor calls go to voicemail. Your AI agent picks up every one — nights, weekends, job site or not.",
    href: "/services/voice-agents",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: <VoiceBackground />,
  },
  {
    Icon: MessageSquare,
    name: "Convert Visitors Into Booked Estimates",
    description: "Turn every website visitor into a lead. AI chat that knows your services, pricing, and availability — 24/7.",
    href: "/services/chat-agents",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: <ChatBackground />,
  },
  {
    Icon: Workflow,
    name: "Kill the Admin. Run on Autopilot.",
    description: "Automated follow-ups, CRM sync, review requests, and estimate workflows — triggered the moment a job is won or lost.",
    href: "/services/custom-automation",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: <AutomationBackground />,
  },
  {
    Icon: LayoutTemplate,
    name: "High-Converting Pages That Fill Your Calendar",
    description: "Stop sending ad traffic to a generic homepage. Trade-specific pages that turn clicks into booked estimates.",
    href: "/services/landing-pages",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-3",
    background: <WebsitesBackground />,
  },
];

// ─── Export ──────────────────────────────────────────────────────────────────

export function BentoServicesGrid() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}
