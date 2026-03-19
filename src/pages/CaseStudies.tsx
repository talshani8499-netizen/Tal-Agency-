import React, { useState } from "react"
import { CTABanner } from "@/components/ui/CTABanner"
import { caseStudies } from "@/data/caseStudies"
import { CaseStudyCard } from "@/components/CaseStudyCard"

export default function CaseStudies() {
  const [openId, setOpenId] = useState<string | null>(null)

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page header */}
      <section className="pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
            Client Work
          </p>
          <h1
            className="text-5xl font-extrabold leading-tight tracking-tight mb-3"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#0A0F1E" }}
          >
            Results We've Delivered
          </h1>
          <p className="text-base text-slate-500">
            Real projects. Real outcomes. Click any card to read the full story.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="pb-24">
        <div
          className="mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-5"
          style={{ maxWidth: "1040px" }}
        >
          {caseStudies.map((study) => (
            <React.Fragment key={study.id}>
              <CaseStudyCard
                study={study}
                isOpen={openId === study.id}
                onToggle={() => handleToggle(study.id)}
              />
            </React.Fragment>
          ))}
        </div>
      </section>

      <CTABanner />
    </div>
  )
}
