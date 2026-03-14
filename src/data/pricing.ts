export const pricingTiers = [
  {
    id: "essentials",
    name: "AI Essentials",
    subtitle: "The Foundation",
    targetAudience: "SMBs new to AI, seeking to address a single primary pain point (e.g., missed calls or basic lead capture).",
    setupFee: "$1,000",
    monthlyFee: "$200",
    popular: false,
    features: [
      "1 AI Chatbot OR 1 AI Voice Agent",
      "Standard Lead Capture & Qualification",
      "CRM Integration (e.g., Monday.com, HubSpot)",
      "Monthly Performance Report"
    ],
    ctaText: "Choose Essentials",
    ctaLink: "/contact?plan=essentials"
  },
  {
    id: "growth",
    name: "AI Growth",
    subtitle: "The Accelerator",
    targetAudience: "Businesses ready for deeper AI integration across multiple touchpoints in sales and service processes.",
    setupFee: "$2,500",
    monthlyFee: "$500",
    popular: true,
    features: [
      "AI Chatbot AND AI Voice Agent",
      "Advanced Lead Routing & Appointment Booking",
      "Direct CRM Integration (e.g., HubSpot, Salesforce)",
      "Custom Automation (e.g., WhatsApp, SMS, Email)",
      "AI-Powered Landing Page (1)",
      "Bi-Weekly Performance & Strategy Calls"
    ],
    ctaText: "Choose Growth",
    ctaLink: "/contact?plan=growth"
  },
  {
    id: "scale",
    name: "AI Scale",
    subtitle: "The Custom Engine",
    targetAudience: "Larger SMBs or those with complex, unique needs requiring bespoke workflows and extensive integrations.",
    setupFee: "$10,000+",
    monthlyFee: "Custom",
    popular: false,
    features: [
      "Includes all features from the Growth package, plus:",
      "Custom AI Workflows (e.g., internal process automation)",
      "Multi-Agent Systems",
      "API & Database Integration",
      "Dedicated Account Manager",
      "Comprehensive CRM Integration"
    ],
    ctaText: "Book a Custom Strategy Call",
    ctaLink: "/contact?plan=scale"
  }
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
