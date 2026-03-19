export interface CaseStat {
  value: string
  label: string
  up?: boolean
}

export interface CaseStudy {
  id: string
  slug: string
  client: string
  industry: string
  timeline: string
  accentFrom: string
  accentTo: string
  testimonial: { quote: string; author: string }
  resultTag: string
  headline: string
  teaser: string
  services: string[]
  imageUrl?: string
  cardGradient: string
  cardAccentColor?: string
  cardSubtitle?: string
  stats: CaseStat[]
  story: {
    problem: string
    solution: string
    outcome: string
    outcomeStats: Array<{ value: string; label: string }>
  }
}

export const caseStudies: CaseStudy[] = [
  {
    id: "horizon-design-build",
    slug: "horizon-design-build-full-stack",
    client: "Horizon Design&Build",
    industry: "Construction",
    timeline: "Live in 21 days",
    accentFrom: "#1B2E3C",
    accentTo: "#0D1B24",
    cardGradient: "linear-gradient(145deg, #1B2E3C 0%, #0D1B24 100%)",
    cardAccentColor: "#A0622A",
    cardSubtitle: "DESIGN&BUILD LLC",
    resultTag: "3× More Qualified Leads",
    headline: "How Horizon Design&Build Went From Zero Digital Presence to $280K/Month in 21 Days",
    teaser: "They had no website, no lead capture, no follow-up system. Every inquiry was a missed call or a lost email. We rebuilt the entire pipeline from scratch and automated it.",
    services: ["Custom Landing Page", "CRM Integration", "Lead Capture", "AI Voice Agent"],
    stats: [
      { value: "3×", label: "Qualified leads", up: true },
      { value: "$280K", label: "Pipeline / month", up: true },
      { value: "41%", label: "Close rate", up: true },
      { value: "<90s", label: "AI response time" },
    ],
    story: {
      problem:
        "Zero digital presence. Relying 100% on word-of-mouth with no way to capture, respond to, or follow up on inbound project inquiries — often taking days to call leads back.",
      solution:
        "Built a high-converting landing page with integrated lead capture forms, connected to a CRM that auto-assigns leads. Layered on an AI voice agent that calls back within 90 seconds, qualifies the lead, and books consultations directly into the owner's calendar.",
      outcome: "Within the first month of going live:",
      outcomeStats: [
        { value: "3×", label: "more qualified consultations booked" },
        { value: "$280K", label: "added to monthly pipeline" },
        { value: "41%", label: "higher close rate on consultations" },
      ],
    },
    testimonial: {
      quote:
        "I went from chasing leads to choosing projects. The system does the qualifying — I just show up to the meetings.",
      author: "Dan K., Owner",
    },
  },
  {
    id: "meridian-realty",
    slug: "meridian-realty-voice-agent",
    client: "Meridian Realty Group",
    industry: "Real Estate",
    timeline: "Live in 14 days",
    accentFrom: "#1d4ed8",
    accentTo: "#0f2460",
    cardGradient: "linear-gradient(145deg, #1d4ed8 0%, #0f2460 100%)",
    resultTag: "62% of Calls Automated",
    headline: "How Meridian Realty Stopped Missing Buyers and Reclaimed 18 Hours a Week",
    teaser:
      "Agents were missing warm buyers during showings. Every missed call was a lost commission. We deployed an AI that answers, qualifies, and logs every call — so agents only touch ready-to-act leads.",
    services: ["AI Voice Agent", "Lead Qualification", "CRM Integration"],
    stats: [
      { value: "62%", label: "Calls automated", up: true },
      { value: "18h", label: "Saved per week", up: true },
      { value: "100%", label: "Leads pre-qualified" },
    ],
    story: {
      problem:
        "Agents were drowning in inbound calls during showings, causing warm buyers to hit voicemail and move on to competing agencies.",
      solution:
        "An AI voice agent that answers every call, runs a qualification script, and pushes structured lead data directly into their CRM — automatically assigned to the right agent by area.",
      outcome: "After the first 30 days:",
      outcomeStats: [
        { value: "62%", label: "of calls fully handled by AI" },
        { value: "18h", label: "reclaimed per agent per week" },
        { value: "100%", label: "of passed leads pre-qualified" },
      ],
    },
    testimonial: {
      quote:
        "My agents used to dread Mondays. Now they come in with a calendar full of pre-qualified showings.",
      author: "Lisa M., Broker/Owner",
    },
  },
  {
    id: "clearview-dental",
    slug: "clearview-dental-full-system",
    client: "ClearView Dental",
    industry: "Healthcare",
    timeline: "Live in 18 days",
    accentFrom: "#059669",
    accentTo: "#064e3b",
    cardGradient: "linear-gradient(145deg, #059669 0%, #064e3b 100%)",
    resultTag: "↓58% No-Show Rate",
    headline: "How ClearView Dental Slashed No-Shows by 58% and Freed Their Front Desk",
    teaser:
      "Manual reminder calls were eating 2.5 hours of front desk time every day — and patients were still not showing up. We automated the entire appointment cycle end-to-end.",
    services: ["Website Redesign", "Inbound AI Agent", "Outbound AI Agent", "Appointment Automation"],
    stats: [
      { value: "↓58%", label: "No-show rate" },
      { value: "73%", label: "AI-booked appointments", up: true },
      { value: "2.5h", label: "Front desk saved / day", up: true },
    ],
    story: {
      problem:
        "Front desk staff spending hours daily on manual reminder calls. No-show rate was 24%, costing the practice significant revenue every week.",
      solution:
        "Deployed inbound + outbound AI voice agents with automated reminder sequences. Patients who don't confirm get a rebooking flow — automatically — without any staff involvement.",
      outcome: "First 30 days after launch:",
      outcomeStats: [
        { value: "↓58%", label: "reduction in no-shows" },
        { value: "73%", label: "of appointments now AI-booked" },
        { value: "2.5h", label: "front desk time saved daily" },
      ],
    },
    testimonial: {
      quote:
        "Our front desk went from reactive to proactive. They're focused on patients in the chair — not patients on the phone.",
      author: "Dr. Rachel S., Practice Owner",
    },
  },
  {
    id: "procomfort-hvac",
    slug: "procomfort-hvac-peak-season",
    client: "ProComfort HVAC",
    industry: "Home Services",
    timeline: "Live in 11 days",
    accentFrom: "#7c3aed",
    accentTo: "#3b0764",
    cardGradient: "linear-gradient(145deg, #7c3aed 0%, #3b0764 100%)",
    resultTag: "+$180K First Summer",
    headline: "How ProComfort HVAC Captured Every Peak-Season Call and Added $180K in Revenue",
    teaser:
      "One dispatcher, hundreds of peak-season calls, zero backup. Customers were hanging up and calling the next company in Google. We deployed AI triage that handles 78% of calls without a human.",
    services: ["AI Voice Agent", "Emergency Triage", "Dispatch Integration"],
    stats: [
      { value: "78%", label: "Calls auto-handled", up: true },
      { value: "<60s", label: "Emergency response" },
      { value: "+$180K", label: "Added revenue", up: true },
    ],
    story: {
      problem:
        "Peak summer heat meant the phone never stopped. One dispatcher couldn't keep up — calls went to voicemail, customers left, revenue walked out the door to competitors.",
      solution:
        "AI voice triage that categorises calls (emergency vs. scheduled), handles routine bookings automatically, and escalates true emergencies to a live dispatcher in under 60 seconds. Integrated directly with their dispatch board.",
      outcome: "Results from the first full summer:",
      outcomeStats: [
        { value: "78%", label: "of calls handled without a dispatcher" },
        { value: "<60s", label: "emergency response time" },
        { value: "+$180K", label: "added revenue that first summer" },
      ],
    },
    testimonial: {
      quote:
        "We stopped losing jobs just because our phone line was busy. The agent handles the volume that used to break us every summer.",
      author: "Carlos V., Operations Manager",
    },
  },
]
