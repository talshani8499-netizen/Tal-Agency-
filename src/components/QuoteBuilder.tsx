import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

const SERVICES = [
  { id: "voice", label: "AI Voice Agent",           description: "24/7 call answering & booking",          price: 150 },
  { id: "chat",  label: "AI Chat Agent",             description: "Website lead capture & qualification",   price: 150 },
  { id: "lp",    label: "AI Powered Landing Page",   description: "High-converting, optimized page",        price: 100 },
  { id: "auto",  label: "Custom Automation",         description: "SMS, email & workflow automation",       price: 200 },
] as const;

type ServiceId = typeof SERVICES[number]["id"];

export function QuoteBuilder() {
  const [selected, setSelected] = useState<Set<ServiceId>>(new Set());

  function toggle(id: ServiceId) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const activeServices = SERVICES.filter((s) => selected.has(s.id));
  const total = activeServices.reduce((sum, s) => sum + s.price, 0);

  return (
    <section className="py-20 relative">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-3">
            Build Your Package
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-text-heading mb-4 leading-tight">
            Instant AI Quote Builder
          </h2>
          <p className="text-text-body leading-relaxed">
            Select the services you need. Your estimated monthly total updates instantly.
          </p>
        </div>

        {/* Receipt container */}
        <div className="glass-panel rounded-2xl overflow-hidden">

          {/* Receipt header strip */}
          <div className="bg-white/5 border-b border-white/10 px-6 py-4 text-center">
            <p className="text-xs font-mono font-bold tracking-[0.15em] uppercase text-text-muted">
              ELEVATE DIGITAL
            </p>
            <p className="text-xs font-mono text-text-muted mt-1">AI Services · Monthly Estimate</p>
            <div className="border-b border-dashed border-white/20 mt-4" />
          </div>

          {/* Service toggles */}
          <div className="px-6 py-6 space-y-2">
            {SERVICES.map((service) => {
              const isSelected = selected.has(service.id);
              return (
                <button
                  key={service.id}
                  onClick={() => toggle(service.id)}
                  className={[
                    "w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all duration-150 text-left group",
                    isSelected
                      ? "bg-accent/10 border border-accent/30"
                      : "border border-transparent hover:bg-white/5",
                  ].join(" ")}
                  aria-pressed={isSelected}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={[
                        "shrink-0 h-5 w-5 rounded border-2 flex items-center justify-center transition-colors",
                        isSelected
                          ? "bg-accent border-accent"
                          : "border-white/30 group-hover:border-accent/50",
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      {isSelected && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                    </div>
                    <div className="min-w-0">
                      <p className={`text-sm font-semibold truncate ${isSelected ? "text-text-heading" : "text-text-body"}`}>
                        {service.label}
                      </p>
                      <p className="text-xs text-text-muted truncate font-mono">{service.description}</p>
                    </div>
                  </div>
                  <span className={`shrink-0 text-sm font-bold font-mono tabular-nums ${isSelected ? "text-accent" : "text-text-muted"}`}>
                    ${service.price}/mo
                  </span>
                </button>
              );
            })}
          </div>

          {/* Dashed separator */}
          <div className="px-6">
            <div className="border-t border-dashed border-white/20" />
          </div>

          {/* Subtotal line items */}
          <div className="px-6 py-4 min-h-[60px]">
            {activeServices.length === 0 ? (
              <p className="text-xs font-mono text-text-muted text-center py-2">
                — select services above —
              </p>
            ) : (
              <div className="space-y-1.5">
                {activeServices.map((s) => (
                  <div key={s.id} className="flex justify-between text-xs font-mono text-text-muted">
                    <span>{s.label}</span>
                    <span className="tabular-nums">${s.price}.00</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dashed separator */}
          <div className="px-6">
            <div className="border-t border-dashed border-white/20" />
          </div>

          {/* Total */}
          <div className="px-6 py-5 flex items-baseline justify-between">
            <span className="text-sm font-bold font-mono text-text-heading uppercase tracking-widest">
              Est. Monthly Total
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-accent font-mono tabular-nums">
                ${total.toLocaleString()}
              </span>
              <span className="text-text-muted text-sm font-mono">/mo</span>
            </div>
          </div>

          {/* Footer: disclaimer + CTA */}
          <div className="px-6 pb-6">
            <div className="border-t border-dashed border-white/20 mb-4" />
            <p className="text-xs font-mono text-text-muted mb-5 leading-relaxed">
              * A one-time setup fee applies to all custom implementations.
              Final pricing confirmed on your strategy call.
            </p>
            {/* When total === 0, omit href so Button renders as <button> and respects disabled */}
            <Button
              href={total > 0 ? "/contact" : undefined}
              className="w-full justify-center"
              variant={total === 0 ? "secondary" : "primary"}
              disabled={total === 0}
            >
              {total === 0
                ? "Select services to get started"
                : `Book a Call — $${total.toLocaleString()}/mo estimated`}
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
