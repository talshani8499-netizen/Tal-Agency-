export const pricingTiers = [
  {
    id: "starter-crew",
    name: "Starter Crew",
    subtitle: "The Foundation",
    targetAudience: "For new contractors just getting the phone ringing.",
    setupFee: "$1,000",
    monthlyFee: "$300",
    popular: false,
    features: [
      "AI Voice Agent — answers every call, even on the roof",
      "Lead capture & qualification",
      "CRM integration (Monday, HubSpot)",
      "Monthly performance report",
    ],
    ctaText: "Choose Starter Crew",
    ctaLink: "/contact?plan=starter-crew",
  },
  {
    id: "full-crew",
    name: "Full Crew",
    subtitle: "The Accelerator",
    targetAudience: "For established shops ready to run on autopilot.",
    setupFee: "$2,500",
    monthlyFee: "$600",
    popular: true,
    features: [
      "AI Voice Agent + Chat Agent",
      "Automated follow-ups (SMS, email, WhatsApp)",
      "Direct CRM integration (HubSpot, Salesforce)",
      "Review request automation after every job",
      "Contractor landing page (1)",
      "Bi-weekly strategy calls",
    ],
    ctaText: "Choose Full Crew",
    ctaLink: "/contact?plan=full-crew",
  },
  {
    id: "general-contractor",
    name: "General Contractor",
    subtitle: "The Custom Engine",
    targetAudience: "Full digital infrastructure for scaling operations.",
    setupFee: "$10,000+",
    monthlyFee: "Custom",
    popular: false,
    features: [
      "Everything in Full Crew, plus:",
      "Multi-location AI call routing",
      "Custom AI workflows & estimate automation",
      "API & database integration",
      "Dedicated account manager",
      "Comprehensive CRM buildout",
    ],
    ctaText: "Book a Strategy Call",
    ctaLink: "/contact?plan=general-contractor",
  },
];

export const costDrivers = [
  {
    title: "Complexity of Conversation",
    description: "A simple FAQ bot is less complex than an AI agent that needs to access a database to check order status or negotiate pricing.",
    icon: "BrainCircuit"
  },
  {
    title: "Number of Integrations",
    description: "Connecting to a Google Sheet is simpler than a deep, two-way integration with a custom or legacy CRM system.",
    icon: "Blocks"
  },
  {
    title: "Custom Features",
    description: "Any development outside of our standard feature set, such as unique reporting dashboards or specific external API calls.",
    icon: "Settings"
  }
];

export const capabilities = [
  "Landing Page Optimization",
  "Lead Capture & Qualification",
  "CRM Integration",
  "AI Voice & Chat Agents",
  "Custom Automations (SMS, Email, WhatsApp)",
  "Data Analytics & Reporting"
];

export const faqs = [
  {
    question: "What is the typical ROI I can expect?",
    answer: "ROI comes from both cost savings (e.g., equivalent to a receptionist's salary) and revenue generation (e.g., captured leads). For example, our average client in the Home Services niche captures 15-20 extra leads per month, valued at over $5,000, simply by never missing a call."
  },
  {
    question: "Is there a long-term contract?",
    answer: "We offer a 3-month initial commitment to ensure we can demonstrate significant value and properly train your AI systems. After that, it's a flexible month-to-month subscription."
  },
  {
    question: "What does the setup fee cover?",
    answer: "The setup fee covers the intensive initial work: discovery, strategy development, agent/bot creation, custom scripting, CRM integration, rigorous testing, and your team's onboarding."
  },
  {
    question: "Why not just use a cheap chatbot builder myself?",
    answer: "You're not just buying a tool; you're investing in an expert partner dedicated to your ROI. We provide the strategy, the technical expertise to integrate it deeply into your business, and the ongoing optimization. It's a 'done-for-you' service that guarantees results, rather than another software subscription you have to manage."
  }
];
