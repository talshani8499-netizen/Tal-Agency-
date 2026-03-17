import { useParams, Navigate } from "react-router-dom";
import { caseStudies } from "@/data/caseStudies";
import { Button } from "@/components/ui/Button";
import { CTABanner } from "@/components/ui/CTABanner";
import { Quote, TrendingUp, Check } from "lucide-react";

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) {
    return <Navigate to="/case-studies" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className={`pt-4 pb-32 ${study.image} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-background/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-text-heading tracking-tight mb-8 text-balance">
            {study.client}
          </h1>
          <p className="text-2xl text-text-body font-medium max-w-2xl mx-auto leading-relaxed">
            {study.solutionSummary}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Metrics Bar */}
          <div className="glass-panel p-10 -mt-40 relative z-20 mb-20 flex flex-col gap-6 border-accent/20 shadow-[0_0_40px_rgba(212,168,83,0.05)]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="h-16 w-16 rounded-full glass-panel text-accent flex items-center justify-center shrink-0 border-accent/20">
                  <TrendingUp className="h-8 w-8" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs text-text-muted font-sans font-semibold uppercase tracking-widest mb-1">Key Result</p>
                  <p className="text-4xl font-serif text-accent">{study.keyMetric}</p>
                </div>
              </div>
              <Button href="/contact" size="lg" className="w-full md:w-auto">
                Get Similar Results
              </Button>
            </div>
            <div className="border-t border-accent/10 pt-5">
              <p className="text-xs text-text-muted font-sans font-semibold uppercase tracking-widest mb-3">Stack Used</p>
              <div className="flex flex-wrap gap-2">
                {study.bundle.map((item) => (
                  <span key={item} className="text-xs font-medium bg-background border border-accent/20 text-text-body px-3 py-1 rounded-full">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="prose prose-lg prose-invert max-w-none prose-headings:font-serif prose-headings:text-text-heading prose-p:text-text-body prose-p:leading-relaxed">
            <h2 className="text-3xl md:text-4xl font-serif text-text-heading mb-8">The Challenge</h2>
            <p className="text-xl text-text-body leading-relaxed mb-16">
              {study.challengeSummary}
            </p>

            <h2 className="text-3xl md:text-4xl font-serif text-text-heading mb-8">The Solution & Implementation</h2>
            <p className="text-lg text-text-body leading-relaxed mb-16">
              {study.fullStory}
            </p>

            <div className="glass-panel rounded-3xl p-12 my-20 relative overflow-hidden group">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors duration-700" />
              <Quote className="absolute top-8 left-8 h-16 w-16 text-accent/20" strokeWidth={1} />
              <blockquote className="relative z-10 pt-8">
                <p className="text-2xl md:text-3xl font-serif text-text-heading italic leading-relaxed mb-8">
                  "{study.testimonial.quote}"
                </p>
                <footer className="font-sans font-semibold text-accent tracking-wide uppercase text-sm">
                  — {study.testimonial.author}, {study.client}
                </footer>
              </blockquote>
            </div>

            <h2 className="text-3xl md:text-4xl font-serif text-text-heading mb-8">Key Takeaways</h2>
            <ul className="space-y-6 mb-16 list-none pl-0">
              {study.takeaways.map((takeaway) => (
                <li key={takeaway} className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full glass-panel text-accent flex items-center justify-center shrink-0 mt-1 border-accent/20">
                    <Check className="h-4 w-4" strokeWidth={1.5} />
                  </div>
                  <span className="text-lg text-text-body leading-relaxed">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
