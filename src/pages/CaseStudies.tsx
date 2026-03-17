import { useState } from "react";
import { CTABanner } from "@/components/ui/CTABanner";
import { caseStudies } from "@/data/caseStudies";
import { motion } from "motion/react";
import { ArrowRight, Quote } from "lucide-react";
import { Link } from "react-router-dom";

type Tab = "problem" | "solution" | "result";

export default function CaseStudies() {
  const [activeTabs, setActiveTabs] = useState<Record<string, Tab>>(
    Object.fromEntries(caseStudies.map((s) => [s.id, "problem"]))
  );

  const setTab = (id: string, tab: Tab) =>
    setActiveTabs((prev) => ({ ...prev, [id]: tab }));

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="pb-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
              Client Cases
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-text-heading mb-6 leading-[1.1] tracking-tight text-balance">
              Real problems.{" "}
              <span className="italic text-accent">Real results.</span>
            </h1>
            <p className="text-xl text-text-body max-w-2xl leading-relaxed">
              Every engagement is measured. Here's what Elevate Digital clients actually achieved.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case study sections */}
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {caseStudies.map((study, index) => {
            const activeTab = activeTabs[study.id];
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-white grid grid-cols-1 lg:grid-cols-2 min-h-[480px]"
              >
                {/* Visual panel — alternates sides */}
                <div
                  className={`relative flex flex-col justify-between p-10 ${study.image} min-h-[240px] lg:min-h-0 ${isEven ? "lg:order-first" : "lg:order-last"}`}
                >
                  {/* Overlay for readability */}
                  <div className="absolute inset-0 bg-black/30" />

                  {/* Top: industry + client */}
                  <div className="relative z-10">
                    <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 backdrop-blur-sm">
                      {study.industry}
                    </span>
                    <h2 className="text-2xl font-serif text-white leading-tight">
                      {study.client}
                    </h2>
                    <p className="text-white/70 text-sm mt-1">{study.timeline}</p>
                  </div>

                  {/* Bottom: key metric + bundle */}
                  <div className="relative z-10">
                    <p className="text-4xl md:text-5xl font-serif font-bold text-white leading-none mb-1">
                      {study.keyMetric}
                    </p>
                    <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-3">
                      Primary Result
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {study.bundle.map((item) => (
                        <span
                          key={item}
                          className="text-[10px] font-semibold bg-white/15 text-white/90 px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/20"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tab panel */}
                <div className="flex flex-col p-8 lg:p-10 bg-white">
                  {/* Tab bar */}
                  <div className="flex gap-0 border-b border-slate-200 mb-8">
                    {(["problem", "solution", "result"] as Tab[]).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setTab(study.id, tab)}
                        className={`px-5 py-3 text-xs font-semibold uppercase tracking-widest transition-colors border-b-2 -mb-px ${
                          activeTab === tab
                            ? "border-blue-600 text-blue-600"
                            : "border-transparent text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Tab content */}
                  <div className="flex-1 flex flex-col justify-between">
                    {activeTab === "problem" && (
                      <div>
                        <p className="text-lg text-slate-700 leading-relaxed">
                          {study.challengeSummary}
                        </p>
                      </div>
                    )}

                    {activeTab === "solution" && (
                      <div>
                        <p className="text-base font-semibold text-slate-900 mb-3 leading-relaxed">
                          {study.solutionSummary}
                        </p>
                        <p className="text-base text-slate-600 leading-relaxed">
                          {study.fullStory}
                        </p>
                      </div>
                    )}

                    {activeTab === "result" && (
                      <div>
                        {/* Secondary metrics grid */}
                        <div className="grid grid-cols-3 gap-3 mb-6">
                          {study.metrics.map((m) => (
                            <div
                              key={m.label}
                              className="text-center bg-slate-50 rounded-xl px-2 py-4 border border-slate-100"
                            >
                              <p className="text-base font-bold text-slate-900 leading-none mb-1">
                                {m.value}
                              </p>
                              <p className="text-[10px] text-slate-500 leading-tight uppercase tracking-wide">
                                {m.label}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Testimonial */}
                        <div className="relative bg-slate-50 rounded-2xl p-5 border border-slate-100">
                          <Quote
                            className="absolute top-3 left-4 h-6 w-6 text-slate-200"
                            strokeWidth={1}
                          />
                          <p className="text-slate-700 italic leading-relaxed text-sm pt-3 mb-2">
                            "{study.testimonial.quote}"
                          </p>
                          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                            — {study.testimonial.author}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* CTA */}
                    <Link
                      to="/contact"
                      className="mt-8 flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group"
                    >
                      Start a similar project
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
