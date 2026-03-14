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
    useCases: ["Invoice Processing", "Employee Onboarding", "Inventory Syncing", "Complex Data Entry"],
    process: [
      { step: 1, title: "Process Auditing", description: "We shadow your team to identify the most time-consuming manual bottlenecks." },
      { step: 2, title: "Architecture Design", description: "We map out the data flow and select the right integration tools (Zapier, Make, custom APIs)." },
      { step: 3, title: "Build & Monitor", description: "We build the automation, test it rigorously, and set up alerts to ensure it runs flawlessly." }
    ]
  }
];
