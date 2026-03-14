import { useParams, Navigate } from "react-router-dom";
import { services } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { SectionHeading, Card } from "@/components/ui/Card";
import { CTABanner } from "@/components/ui/CTABanner";
import { motion } from "motion/react";
import { PhoneCall, MessageSquare, LayoutTemplate, Workflow, Check } from "lucide-react";

const iconMap = {
  PhoneCall,
  MessageSquare,
  LayoutTemplate,
  Workflow,
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const Icon = iconMap[service.icon as keyof typeof iconMap];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-50 mix-blend-overlay pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-panel text-accent font-medium text-xs tracking-widest uppercase mb-8 border-accent/20">
              <Icon className="h-4 w-4" strokeWidth={1.5} /> {service.title}
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-text-heading mb-8 leading-[1.1] tracking-tight text-balance">
              {service.shortDescription}
            </h1>
            <p className="text-xl text-text-body mb-12 leading-relaxed max-w-2xl">
              {service.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Button href="/contact" size="lg" icon>
                Schedule Consultation
              </Button>
              {service.id === "voice-agents" && (
                <Button href="/ai-voice-demo" variant="secondary" size="lg">
                  Request Live Demo
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits & Use Cases */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif text-text-heading mb-12">Why Choose {service.title}?</h2>
              <div className="space-y-8">
                {service.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-6 group">
                    <div className="h-12 w-12 rounded-full glass-panel text-accent flex items-center justify-center shrink-0 mt-1 group-hover:scale-110 transition-transform duration-500 border-accent/20">
                      <Check className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-xl font-serif text-text-heading mb-3">{benefit}</h3>
                      <p className="text-text-body leading-relaxed">
                        Stop letting inefficiencies drain your resources. Our solution ensures consistent, high-quality execution every single time.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7 }}
              className="glass-panel p-10 lg:p-12 h-fit sticky top-32"
            >
              <h2 className="text-2xl font-serif text-text-heading mb-8">Perfect For:</h2>
              <div className="flex flex-wrap gap-3 mb-12">
                {service.useCases.map((useCase, i) => (
                  <div key={i} className="px-4 py-2 glass-panel text-text-body text-sm hover:border-accent/50 transition-colors cursor-default">
                    {useCase}
                  </div>
                ))}
              </div>
              
              <div className="pt-10 border-t border-white/10">
                <h3 className="text-xl font-serif text-text-heading mb-4">The Cost of Inaction</h3>
                <p className="text-text-body leading-relaxed">
                  Every day you delay automation is another day of missed opportunities, higher payroll costs, and stressed employees. The ROI on {service.title.toLowerCase()} is typically realized within the first 30 days.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-accent/5 mix-blend-overlay" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading 
            label="Methodology"
            title="How It Works" 
            subtitle="A simple, transparent 3-step process to get your automation live and generating ROI."
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[1px] bg-white/10 -z-10" />
            
            {service.process.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative text-center group"
              >
                <div className="w-24 h-24 mx-auto glass-panel text-accent rounded-full flex items-center justify-center text-3xl font-serif mb-8 group-hover:scale-110 transition-transform duration-500 border-accent/20 group-hover:bg-accent/10">
                  {step.step}
                </div>
                <h3 className="text-2xl font-serif text-text-heading mb-4">{step.title}</h3>
                <p className="text-text-body leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
