import { Link } from "react-router-dom"
import type { CaseStudy } from "@/data/caseStudies"

interface Props {
  study: CaseStudy
  isOpen: boolean
  onToggle: () => void
}

/** Derives up-to-2-character monogram from client name */
function getMonogram(client: string): string {
  return client
    .split(/[\s&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("")
}

export function CaseStudyCard({ study, isOpen, onToggle }: Props) {
  const monogram = getMonogram(study.client)

  return (
    <article
      className="rounded-3xl overflow-hidden shadow-sm transition-shadow duration-300 hover:shadow-xl"
      style={{ background: "#F8F9FB" }}
    >
      {/* ── CARD HEADER ── */}
      <div
        className="grid items-center gap-10 p-10"
        style={{ gridTemplateColumns: "1fr 320px" }}
      >
        {/* LEFT: Editorial content */}
        <div className="flex flex-col">
          {/* Result tag */}
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold w-fit mb-4"
            style={{ background: "#CBFF4D", color: "#1A2800" }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: "#5A9000" }}
            />
            {study.resultTag}
          </span>

          {/* Headline */}
          <h2
            className="font-bold leading-snug tracking-tight mb-3"
            style={{
              fontSize: "30px",
              fontFamily: "Georgia, 'Times New Roman', serif",
              color: "#0A0F1E",
            }}
          >
            {study.headline}
          </h2>

          {/* Teaser */}
          <p className="text-sm leading-relaxed mb-4" style={{ color: "#64748B" }}>
            {study.teaser}
          </p>

          {/* Services line */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span
              className="text-[11px] font-semibold uppercase tracking-widest flex-shrink-0"
              style={{ color: "#94A3B8" }}
            >
              Built:
            </span>
            {study.services.map((svc, i) => (
              <span key={svc} className="text-sm font-semibold" style={{ color: "#334155" }}>
                {svc}
                {i < study.services.length - 1 && (
                  <span className="ml-2" style={{ color: "#CBD5E1" }}>·</span>
                )}
              </span>
            ))}
          </div>

          {/* Divider */}
          <hr className="mb-5" style={{ borderColor: "#E2E8F0" }} />

          {/* Stats row */}
          <div className="flex gap-9 flex-wrap mb-7">
            {study.stats.map((stat) => (
              <div key={stat.label}>
                <div className="flex items-baseline gap-1">
                  <span
                    className="font-black leading-none"
                    style={{ fontSize: "26px", color: "#0A0F1E" }}
                  >
                    {stat.value}
                  </span>
                  {stat.up && (
                    <span className="font-bold" style={{ fontSize: "16px", color: "#22C55E" }}>
                      ↑
                    </span>
                  )}
                </div>
                <div
                  className="text-xs font-medium mt-1"
                  style={{ color: "#94A3B8" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA row */}
          <div className="flex items-center justify-between">
            <button
              onClick={onToggle}
              aria-expanded={isOpen}
              aria-controls={`story-panel-${study.id}`}
              className="flex items-center cursor-pointer border-none bg-transparent p-0"
              style={{ gap: isOpen ? "12px" : "8px", transition: "gap 0.2s" }}
            >
              <span
                className="flex items-center justify-center w-8 h-8 rounded-full text-white text-sm flex-shrink-0"
                style={{
                  background: isOpen ? "#2563EB" : "#0A0F1E",
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  transition: "transform 0.3s, background 0.2s",
                  fontSize: "15px",
                }}
              >
                +
              </span>
              <span className="text-sm font-bold" style={{ color: "#0A0F1E" }}>
                Read the full story
              </span>
            </button>

            <Link
              to="/contact"
              className="text-sm font-semibold hover:underline"
              style={{ color: "#2563EB" }}
            >
              Start a similar project →
            </Link>
          </div>
        </div>

        {/* RIGHT: Floating image card */}
        <div
          className="relative overflow-hidden flex-shrink-0"
          style={{
            width: "320px",
            aspectRatio: "4/3",
            borderRadius: "20px",
            background: study.cardGradient,
            boxShadow: "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)",
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            {study.imageUrl ? (
              <img
                src={study.imageUrl}
                alt={study.client}
                style={{ maxWidth: "160px", objectFit: "contain", marginBottom: "12px" }}
              />
            ) : (
              <div
                className="font-bold mb-3"
                style={{ fontSize: "56px", color: "white", opacity: 0.6 }}
              >
                {monogram}
              </div>
            )}
            <div
              className="uppercase font-extrabold tracking-widest"
              style={{ fontSize: "16px", color: "rgba(255,255,255,0.92)", letterSpacing: "0.12em" }}
            >
              {study.client}
            </div>
            {study.cardSubtitle && (
              <div
                className="font-semibold tracking-widest mt-0.5"
                style={{
                  fontSize: "11px",
                  color: study.cardAccentColor ?? "rgba(255,255,255,0.6)",
                  letterSpacing: "0.08em",
                }}
              >
                {study.cardSubtitle}
              </div>
            )}
            <div
              className="mt-2 font-medium"
              style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}
            >
              {study.industry} · {study.timeline}
            </div>
          </div>
        </div>
      </div>

      {/* ── STORY PANEL ── */}
      {/*
        max-height note: 600px is the animation ceiling — actual rendered height is ~350-420px.
        Using 9999px breaks collapse animation. 600px gives natural timing without clipping.
      */}
      <div
        id={`story-panel-${study.id}`}
        aria-hidden={!isOpen}
        style={{
          maxHeight: isOpen ? "600px" : "0",
          opacity: isOpen ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.3s",
        }}
      >
        <div
          className="grid gap-8 px-10 pt-8"
          style={{
            gridTemplateColumns: "1fr 1fr 1fr",
            borderTop: "1px solid #E2E8F0",
          }}
        >
          {/* Problem */}
          <div>
            <div
              className="text-[10px] font-bold uppercase tracking-widest mb-2.5"
              style={{ color: "#EF4444" }}
            >
              The Problem
            </div>
            <p className="text-[13px] leading-relaxed" style={{ color: "#475569", lineHeight: 1.7 }}>
              {study.story.problem}
            </p>
          </div>

          {/* Solution */}
          <div>
            <div
              className="text-[10px] font-bold uppercase tracking-widest mb-2.5"
              style={{ color: "#2563EB" }}
            >
              What We Built
            </div>
            <p className="text-[13px] leading-relaxed" style={{ color: "#475569", lineHeight: 1.7 }}>
              {study.story.solution}
            </p>
          </div>

          {/* Outcome */}
          <div>
            <div
              className="text-[10px] font-bold uppercase tracking-widest mb-2.5"
              style={{ color: "#16A34A" }}
            >
              The Outcome
            </div>
            <p className="text-[13px] mb-3" style={{ color: "#475569" }}>
              {study.story.outcome}
            </p>
            <div className="flex flex-col gap-2.5">
              {study.story.outcomeStats.map((s) => (
                <div key={s.label} className="flex items-baseline gap-1.5">
                  <span className="font-extrabold" style={{ fontSize: "20px", color: "#16A34A" }}>
                    {s.value}
                  </span>
                  <span className="text-xs" style={{ color: "#64748B" }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial strip */}
        <div
          className="flex items-start gap-4 px-10 py-6 mt-6"
          style={{
            background: "#FAFBFC",
            borderTop: "1px solid #E2E8F0",
          }}
        >
          <div
            className="flex-shrink-0"
            style={{
              fontSize: "56px",
              lineHeight: 1,
              color: "#E2E8F0",
              fontFamily: "Georgia, serif",
              marginTop: "-12px",
            }}
          >
            "
          </div>
          <div>
            <p className="italic leading-relaxed" style={{ fontSize: "15px", color: "#334155" }}>
              {study.testimonial.quote}
            </p>
            <p className="text-xs font-semibold mt-2" style={{ color: "#94A3B8" }}>
              — {study.testimonial.author}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
