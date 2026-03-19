import { SectionHeading } from "@/components/ui/Card";
import { ContactForm } from "@/components/ContactForm";
import { Mail, Phone, Clock } from "lucide-react";
import { motion } from "motion/react";

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-50 mix-blend-overlay pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-text-heading tracking-tight mb-6 leading-[1.1]">
                Let's Talk <span className="italic text-accent">Automation.</span>
              </h1>
              <p className="text-xl text-text-body leading-relaxed">
                Reach out to discuss your business needs and discover how intelligent automation can transform your operations.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div
              className="lg:col-span-1 space-y-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="glass-panel p-8 rounded-3xl">
                <h3 className="text-2xl font-serif text-text-heading mb-8">Get in Touch</h3>

                <div className="space-y-8">
                  <div className="flex items-start gap-5 group">
                    <div className="h-12 w-12 rounded-full glass-panel text-accent flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500 border-accent/20">
                      <Phone className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-muted mb-1 uppercase tracking-wider">Call Us</p>
                      <p className="text-lg font-medium text-text-heading">Coming Soon</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 group">
                    <div className="h-12 w-12 rounded-full glass-panel text-accent flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500 border-accent/20">
                      <Mail className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-muted mb-1 uppercase tracking-wider">Email Us</p>
                      <p className="text-lg font-medium text-text-heading">hello@elevatedigital.agency</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 group">
                    <div className="h-12 w-12 rounded-full glass-panel text-accent flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500 border-accent/20">
                      <Clock className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-muted mb-1 uppercase tracking-wider">Business Hours</p>
                      <p className="text-lg font-medium text-text-heading">Mon-Fri, 9am - 6pm EST</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-serif text-text-heading mb-4">Send us a message</h2>
                  <p className="text-text-body mb-10 leading-relaxed">Fill out the form below and we'll get back to you within 24 hours.</p>
                  <ContactForm />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
