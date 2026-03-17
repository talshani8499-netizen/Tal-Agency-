export const services = [
  {
    id: "voice-agents",
    title: "AI Voice Agents",
    slug: "voice-agents",
    shortDescription: "Never miss another call. 24/7 intelligent voice agents that book appointments and qualify leads.",
    description: "Automate customer support, appointment booking, and lead qualification, giving your team more time for high-value tasks.",
    icon: "PhoneCall",
    benefits: [
      "Zero missed calls, 24/7 availability",
      "Human-like conversational AI",
      "Direct calendar integration",
      "Instant lead qualification"
    ],
    benefitDetails: [
      "Your AI agent picks up every call — nights, weekends, holidays. No more voicemails that go unanswered while leads call your competitors.",
      "Natural voice interactions trained on your business knowledge. Callers won't know they're speaking with AI, and they'll get accurate answers every time.",
      "Appointments are booked directly into your Google Calendar, Calendly, or scheduling tool. No double-bookings, no back-and-forth.",
      "Each caller is scored and categorized before your team ever picks up the phone. Only qualified, high-intent leads reach your inbox."
    ],
    useCases: ["Home Services", "Real Estate", "Healthcare Clinics", "Law Firms"],
    process: [
      { step: 1, title: "Discovery & Scripting", description: "We map out your ideal call flow and train the AI on your business knowledge." },
      { step: 2, title: "Integration & Testing", description: "We connect the agent to your CRM and calendar, running rigorous test calls." },
      { step: 3, title: "Deployment & Optimization", description: "Your agent goes live, and we continuously refine its responses based on real conversations." }
    ]
  },
  {
    id: "chat-agents",
    title: "AI Chat Agents",
    slug: "chat-agents",
    shortDescription: "Turn website visitors into qualified leads instantly with intelligent, context-aware chat.",
    description: "Engage visitors the moment they land on your site. Our AI chat agents answer complex questions, capture contact info, and route hot leads directly to your sales team.",
    icon: "MessageSquare",
    benefits: [
      "Instant response times",
      "Multi-language support",
      "Seamless CRM handoff",
      "Trained on your specific FAQs"
    ],
    benefitDetails: [
      "Respond to every website visitor within seconds — not minutes or hours. Studies show leads contacted within 5 minutes are 21x more likely to convert.",
      "Serve customers in their preferred language automatically. Expand your reach without hiring multilingual staff.",
      "Qualified leads are pushed directly into your CRM with full conversation context. Your sales team picks up where the AI left off, fully informed.",
      "Your chat agent knows your pricing, services, hours, and policies inside-out. No generic bot responses — just accurate, helpful answers."
    ],
    useCases: ["E-commerce", "SaaS", "B2B Services", "Education"],
    process: [
      { step: 1, title: "Knowledge Base Ingestion", description: "We feed your website, PDFs, and past support tickets into the AI's brain." },
      { step: 2, title: "Personality Tuning", description: "We adjust the tone and style to perfectly match your brand voice." },
      { step: 3, title: "Live Handoff Setup", description: "We configure rules for when the AI should escalate a chat to a human team member." }
    ]
  },
  {
    id: "landing-pages",
    title: "AI-Powered Landing Pages",
    slug: "landing-pages",
    shortDescription: "High-converting landing pages dynamically optimized for your specific ad campaigns.",
    description: "Stop sending expensive ad traffic to a generic homepage. We build hyper-focused landing pages that use AI to personalize copy and maximize conversion rates.",
    icon: "LayoutTemplate",
    benefits: [
      "A/B testing on autopilot",
      "Dynamic text replacement",
      "Lightning-fast load times",
      "Integrated lead capture forms"
    ],
    benefitDetails: [
      "AI continuously tests headlines, CTAs, and layouts — finding the winning combination without you lifting a finger.",
      "Ad copy matches landing page copy automatically. When someone clicks an ad for 'emergency plumbing,' the page speaks directly to that need.",
      "Pages load in under 2 seconds on any device. Slow pages kill conversions — ours don't.",
      "Smart forms that adapt based on visitor behavior. Fewer fields for cold traffic, deeper qualification for warm leads."
    ],
    useCases: ["Paid Ad Campaigns", "Lead Magnet Funnels", "Event Registrations", "Product Launches"],
    process: [
      { step: 1, title: "Audience Analysis", description: "We analyze your target demographic and the specific intent behind their clicks." },
      { step: 2, title: "Design & Copywriting", description: "We craft compelling, conversion-focused layouts and persuasive copy." },
      { step: 3, title: "Continuous Optimization", description: "We monitor performance and let AI tweak elements to improve the conversion rate over time." }
    ]
  },
  {
    id: "custom-automation",
    title: "Custom AI Automation",
    slug: "custom-automation",
    shortDescription: "Bespoke workflows connecting your favorite tools to eliminate repetitive manual tasks.",
    description: "If you find yourself copying and pasting data between apps, you need custom automation. We build seamless bridges between your software stack to save you hours every week.",
    icon: "Workflow",
    benefits: [
      "Eliminate human error",
      "Save 10+ hours per week per employee",
      "Connect legacy systems",
      "Trigger actions across multiple apps"
    ],
    benefitDetails: [
      "Automated workflows don't mistype numbers, forget steps, or skip entries. Your data is consistent and accurate, every single time.",
      "Free your team from copy-paste busywork. Those 10+ hours go back into selling, building relationships, and growing revenue.",
      "Even if your tools are outdated, we build custom bridges using APIs, webhooks, and middleware to make everything talk to each other.",
      "One event can cascade across your entire stack — a new lead triggers a CRM entry, welcome email, Slack notification, and task assignment simultaneously."
    ],
    useCases: ["Invoice Processing", "Employee Onboarding", "Inventory Syncing", "Complex Data Entry"],
    process: [
      { step: 1, title: "Process Auditing", description: "We shadow your team to identify the most time-consuming manual bottlenecks." },
      { step: 2, title: "Architecture Design", description: "We map out the data flow and select the right integration tools (Zapier, Make, custom APIs)." },
      { step: 3, title: "Build & Monitor", description: "We build the automation, test it rigorously, and set up alerts to ensure it runs flawlessly." }
    ]
  }
];
