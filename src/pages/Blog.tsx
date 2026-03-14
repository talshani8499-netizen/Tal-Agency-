import { SectionHeading, Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CTABanner } from "@/components/ui/CTABanner";
import { blogPosts } from "@/data/blogPosts";
import { motion } from "motion/react";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export default function Blog() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-50 mix-blend-overlay pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-accent font-medium text-xs tracking-widest uppercase mb-8">
              Our Journal
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-text-heading tracking-tight mb-6 leading-[1.1]">
              Insights for <span className="italic text-accent">Automated Growth</span>
            </h1>
            <p className="text-xl text-text-body max-w-3xl mx-auto leading-relaxed">
              Actionable strategies, industry trends, and deep dives into how AI is reshaping the landscape for US SMBs.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <div className="flex gap-3 overflow-x-auto pb-4 w-full md:w-auto scrollbar-hide">
              {["All", "Voice AI", "Chat AI", "Automation"].map((cat, i) => (
                <button 
                  key={cat} 
                  className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 whitespace-nowrap ${
                    i === 0 
                      ? "bg-accent text-bg-primary shadow-[0_0_15px_rgba(212,168,83,0.3)]" 
                      : "glass-panel text-text-muted hover:text-text-heading hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="w-full md:w-80 relative">
              <input 
                type="search" 
                placeholder="Search articles..." 
                className="w-full px-5 py-3 rounded-full bg-white/5 border border-white/10 text-text-heading placeholder-white/30 focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all backdrop-blur-sm"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="h-full flex flex-col overflow-hidden group glass-panel hover:bg-white/5 transition-all duration-500 p-0 border-white/10">
                  <div className={`h-56 ${post.image} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-bg-primary/20 group-hover:bg-transparent transition-colors duration-500 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary to-transparent opacity-80" />
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-1.5 glass-panel text-accent text-xs font-medium tracking-widest uppercase rounded-full border-accent/20">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow relative z-10 -mt-8">
                    <div className="flex items-center gap-4 text-xs text-text-muted mb-4 font-sans tracking-widest uppercase">
                      <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
                      <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
                    </div>
                    
                    <h3 className="text-2xl font-serif text-text-heading mb-4 group-hover:text-accent transition-colors duration-300 line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    
                    <p className="text-text-body mb-8 flex-grow line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <Button href={`/blog/${post.slug}`} variant="ghost" className="self-start -ml-4 group-hover:text-accent">
                      Read Article <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
