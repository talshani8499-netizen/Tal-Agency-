export const caseStudies = [
  {
    id: "apex-construction",
    slug: "apex-construction-full-stack",
    client: "Apex Construction Group",
    industry: "Construction",
    timeline: "Live in 21 days",
    image: "bg-gradient-to-br from-amber-500 to-orange-600",
    accentFrom: "#f59e0b",
    accentTo: "#ea580c",
    bundle: ["Custom Landing Page", "CRM Integration", "Lead Capture", "AI Voice Agent"],
    keyMetric: "3× More Qualified Leads",
    metrics: [
      { label: "Lead response time", value: "< 2 min" },
      { label: "Consultation close rate", value: "+41%" },
      { label: "Monthly pipeline added", value: "+$280K" },
    ],
    challengeSummary:
      "Zero digital presence. Relying 100% on word-of-mouth with no way to capture, respond to, or follow up on inbound project inquiries — often taking days to call leads back.",
    solutionSummary:
      "Built a complete tech infrastructure from scratch: high-converting landing page, CRM, lead capture, and an AI Voice Agent that calls every new lead back within 90 seconds.",
    fullStory:
      "Apex Construction had zero online presence when they came to us. Leads that found them through word of mouth had no way to inquire after hours, and the owner was manually following up — often days later. We started with a high-converting landing page targeting their local service area, wired it into a CRM, and layered in an AI Voice Agent that calls every new lead within 90 seconds of form submission. The agent qualifies project type, timeline, and budget before routing hot leads directly to the owner's calendar. Within 60 days, Apex had a $280K pipeline they wouldn't have had without the system.",
    testimonial: {
      quote:
        "I went from chasing leads to choosing projects. The system does the qualifying — I just show up to the meetings.",
      author: "Dan K., Owner",
    },
    takeaways: [
      "Speed-to-lead is everything in construction — responding in 90 seconds vs. 2 days changes the close rate dramatically.",
      "A high-converting landing page + instant AI follow-up outperforms any traditional sales rep.",
      "CRM integration means every lead is tracked, followed up, and never falls through the cracks.",
    ],
  },
  {
    id: "meridian-realty",
    slug: "meridian-realty-voice-agent",
    client: "Meridian Realty Group",
    industry: "Real Estate",
    timeline: "Live in 12 days",
    image: "bg-gradient-to-br from-violet-600 to-purple-800",
    accentFrom: "#7c3aed",
    accentTo: "#6b21a8",
    bundle: ["AI Voice Agent", "Lead Qualification", "CRM Integration"],
    keyMetric: "62% of Calls Handled by AI",
    metrics: [
      { label: "Agent hours reclaimed/week", value: "18 hrs" },
      { label: "Leads pre-qualified before handoff", value: "100%" },
      { label: "After-hours leads captured", value: "100%" },
    ],
    challengeSummary:
      "Agents drowning in inbound calls — most from early-stage buyers asking the same questions. Hours lost every week that could have been spent closing deals.",
    solutionSummary:
      "Deployed an AI Voice Agent trained on their listings, pricing data, and market FAQs to handle all inbound calls, qualify intent, and book showings automatically.",
    fullStory:
      "Meridian's agents were fielding dozens of calls a day — the majority from buyers asking questions agents could answer in their sleep. We deployed an AI Voice Agent trained on their active listings, pricing data, and local market FAQs. It now handles every inbound call, gives buyers and sellers real, accurate answers, qualifies intent and financing readiness, and only transfers to a live agent when the lead is genuinely hot. Showing appointments are booked automatically into agents' calendars. After-hours calls — previously lost to voicemail — are now fully captured.",
    testimonial: {
      quote:
        "My agents used to dread Mondays. Now they come in with a calendar full of pre-qualified showings.",
      author: "Lisa M., Broker/Owner",
    },
    takeaways: [
      "Most inbound real estate calls can be resolved without a human — AI handles volume so agents focus on closings.",
      "Pre-qualifying before the handoff means higher conversion rates and zero wasted time on tire-kickers.",
      "After-hours lead capture is a massive untapped revenue source — serious buyers don't only shop 9–5.",
    ],
  },
  {
    id: "clearview-dental",
    slug: "clearview-dental-full-system",
    client: "ClearView Dental",
    industry: "Dental & Medical",
    timeline: "Live in 18 days",
    image: "bg-gradient-to-br from-cyan-500 to-sky-600",
    accentFrom: "#06b6d4",
    accentTo: "#0284c7",
    bundle: [
      "Custom Website",
      "AI Voice Agent (Inbound)",
      "AI Voice Agent (Outbound)",
      "Appointment Automation",
    ],
    keyMetric: "↓58% No-Show Rate",
    metrics: [
      { label: "Appointments booked by AI", value: "73%" },
      { label: "Front desk hours saved/day", value: "2.5 hrs" },
      { label: "No-show rate", value: "↓58%" },
    ],
    challengeSummary:
      "Old website with no online booking. Front desk spending 2+ hours daily on manual reminder calls. No-shows spiking and patients unable to reach anyone after hours.",
    solutionSummary:
      "Built a new website with modern booking flow, then deployed a dual-mode AI Voice Agent: inbound for real-time scheduling, outbound for automated appointment reminders.",
    fullStory:
      "ClearView Dental came to us with two compounding problems: their old website couldn't accept online bookings, and their front desk was spending hours every morning manually calling patients to confirm appointments. We rebuilt their website with a modern booking experience, then deployed a dual-mode AI Voice Agent. Inbound mode: answers every call, checks the live schedule, and books or reschedules appointments in real time. Outbound mode: automatically calls patients 48 and 24 hours before their appointment, handles confirmations, and proactively reschedules before the chair goes empty. No-shows dropped 58% in the first 30 days.",
    testimonial: {
      quote:
        "Our front desk went from reactive to proactive. They're focused on patients in the chair — not patients on the phone.",
      author: "Dr. Rachel S., Practice Owner",
    },
    takeaways: [
      "Dual-mode AI — inbound and outbound — covers the full appointment lifecycle without adding headcount.",
      "Real-time schedule access means the AI can offer and confirm actual open slots, not just take a message.",
      "Every prevented no-show is $300–$600 recovered — the system paid for itself in the first month.",
    ],
  },
  {
    id: "procomfort-hvac",
    slug: "procomfort-hvac-peak-season",
    client: "ProComfort HVAC",
    industry: "Home Services",
    timeline: "Live in 8 days",
    image: "bg-gradient-to-br from-rose-500 to-red-600",
    accentFrom: "#f43f5e",
    accentTo: "#dc2626",
    bundle: ["AI Voice Agent", "Emergency Triage System", "Dispatch Integration"],
    keyMetric: "+$180K First Summer",
    metrics: [
      { label: "Calls handled without dispatcher", value: "78%" },
      { label: "Emergency response time", value: "< 60 sec" },
      { label: "Seasonal revenue increase", value: "+38%" },
    ],
    challengeSummary:
      "One dispatcher handling 80+ calls on peak summer days. Customers hitting voicemail called the next HVAC company. Their busiest days were also their most costly in lost revenue.",
    solutionSummary:
      "Deployed an AI Voice Agent trained on ProComfort's service catalog and emergency protocols — triages every call, books routine jobs, and dispatches emergencies in under 60 seconds.",
    fullStory:
      "ProComfort's dispatcher was physically incapable of answering 80+ calls on a 95-degree July day. Customers who hit voicemail didn't wait — they called the next HVAC company on Google. We deployed an AI Voice Agent trained on ProComfort's service catalog, pricing zones, and emergency protocols. It answers every call within 3 rings, qualifies the issue (broken AC, preventive maintenance, commercial emergency), and books directly into their scheduling software. Emergency calls are flagged and dispatched within 60 seconds. By the end of their first summer with the system, they'd captured $180K in revenue that previously slipped away during peak demand.",
    testimonial: {
      quote:
        "We stopped losing jobs just because our phone line was busy. The agent handles the volume that used to break us every summer.",
      author: "Carlos V., Operations Manager",
    },
    takeaways: [
      "Peak-season call volume is a predictable, solvable problem — AI turns your busiest days from a liability into an advantage.",
      "Emergency triage logic built into the agent ensures your highest-value calls always get priority routing.",
      "An AI dispatcher costs less than one seasonal hire and works 24/7 through every peak day of the year.",
    ],
  },
];
