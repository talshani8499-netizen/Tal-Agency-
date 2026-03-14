import { SectionHeading, Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CTABanner } from "@/components/ui/CTABanner";
import { services } from "@/data/services";
import { motion } from "motion/react";
import { PhoneCall, MessageSquare, LayoutTemplate, Workflow, ArrowRight } from "lucide-react";

const iconMap = {
  PhoneCall,
  MessageSquare,
  LayoutTemplate,
  Workflow,
};

export default function Services() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-accent font-medium text-xs tracking-widest uppercase mb-8">
              Capabilities
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-text-heading mb-8 leading-[1.1] tracking-tight text-balance max-w-4xl mx-auto">
              AI Solutions Built for <span className="italic text-accent">Growth</span>
            </h1>
            <p className="text-xl text-text-body max-w-2xl mx-auto leading-relaxed">
              We don't just sell software. We build, integrate, and optimize intelligent systems that solve your most expensive bottlenecks.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full"
                >
                  <Card className="h-full p-10 flex flex-col group hover:bg-white/5 transition-all duration-500">
                    <div className="flex items-center gap-6 mb-8">
                      <div className="h-16 w-16 rounded-2xl glass-panel text-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border-accent/20">
                        <Icon className="h-8 w-8" strokeWidth={1.5} />
                      </div>
                      <h2 className="text-3xl font-serif text-text-heading">{service.title}</h2>
                    </div>
                    
                    <p className="text-lg text-text-body mb-10 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="mb-10">
                      <h4 className="font-sans font-semibold text-text-heading mb-6 uppercase tracking-widest text-xs">Key Benefits</h4>
                      <ul className="space-y-4">
                        {service.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-4">
                            <div className="h-1.5 w-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
                            <span className="text-text-body leading-relaxed">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto pt-8 border-t border-white/10">
                      <Button href={`/services/${service.slug}`} variant="secondary" className="w-full sm:w-auto group-hover:bg-accent group-hover:text-background group-hover:border-accent transition-all duration-300" icon>
                        Explore {service.title}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
