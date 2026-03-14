import { useParams, Navigate } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import { Button } from "@/components/ui/Button";
import { CTABanner } from "@/components/ui/CTABanner";
import { Calendar, Clock, User, Share2 } from "lucide-react";
import { motion } from "motion/react";

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-50 mix-blend-overlay pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-accent font-medium text-xs tracking-widest uppercase mb-8">
              {post.category}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-text-heading tracking-tight mb-8 leading-[1.1] text-balance">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-text-muted text-xs font-sans tracking-widest uppercase">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-accent" /> Nexus AI Team
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-accent" /> {post.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" /> {post.readTime}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 relative z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className={`w-full h-64 md:h-[400px] rounded-3xl ${post.image} mb-16 shadow-2xl relative overflow-hidden`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-bg-primary/10 mix-blend-overlay" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl" />
          </motion.div>
          
          <motion.div 
            className="prose prose-lg prose-invert max-w-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <p className="text-2xl text-text-heading leading-relaxed mb-10 font-serif italic border-l-2 border-accent pl-6">
              {post.excerpt}
            </p>
            
            <div className="text-lg text-text-body leading-relaxed space-y-8">
              {/* Splitting content by numbers for simple formatting */}
              {post.content.split(/(?=\d\.)/).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Embedded Lead Magnet CTA */}
            <div className="my-20 glass-panel rounded-3xl p-8 md:p-12 text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/50 to-accent" />
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <h3 className="text-3xl font-serif text-text-heading mb-4">Want to dive deeper?</h3>
                <p className="text-text-body mb-8 max-w-lg mx-auto leading-relaxed">
                  Download our free SMB Owner's Blueprint to AI Automation and discover 5 proven ways to reclaim your time.
                </p>
                <Button href="/guide-to-ai-automation" size="lg">
                  Download Free Guide
                </Button>
              </div>
            </div>
          </motion.div>
          
          <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full glass-panel flex items-center justify-center text-accent font-serif text-xl border-accent/20">
                N
              </div>
              <div>
                <p className="font-serif text-text-heading">Nexus AI Team</p>
                <p className="text-xs text-text-muted font-sans tracking-widest uppercase mt-1">Automation Strategists</p>
              </div>
            </div>
            <button className="flex items-center gap-2 text-text-muted hover:text-accent transition-colors font-sans text-xs tracking-widest uppercase">
              <Share2 className="h-4 w-4" /> Share
            </button>
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
