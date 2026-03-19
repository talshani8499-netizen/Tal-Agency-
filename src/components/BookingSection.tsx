import { useEffect } from "react";

export function BookingSection() {
  useEffect(() => {
    function initCalEmbed() {
      const Cal = (window as any).Cal;
      if (!Cal) return;
      Cal("init", "elevate-digital", { origin: "https://app.cal.com" });
      Cal.ns["elevate-digital"]("inline", {
        elementOrSelector: "#my-cal-inline-elevate-digital",
        config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
        calLink: "tal-shani-i0wamv/elevate-digital",
      });
      Cal.ns["elevate-digital"]("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": "#2563eb" },
          dark: { "cal-brand": "#fafafa" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    }

    // Inject the script only on first load
    if (!document.getElementById("cal-embed-script")) {
      const script = document.createElement("script");
      script.id = "cal-embed-script";
      script.type = "text/javascript";
      script.innerHTML = `
        (function (C, A, L) {
          let p = function (a, ar) { a.q.push(ar); };
          let d = C.document;
          C.Cal = C.Cal || function () {
            let cal = C.Cal;
            let ar = arguments;
            if (!cal.loaded) {
              cal.ns = {};
              cal.q = cal.q || [];
              d.head.appendChild(d.createElement("script")).src = A;
              cal.loaded = true;
            }
            if (ar[0] === L) {
              const api = function () { p(api, arguments); };
              const namespace = ar[1];
              api.q = api.q || [];
              if(typeof namespace === "string"){
                cal.ns[namespace] = cal.ns[namespace] || api;
                p(cal.ns[namespace], ar);
                p(cal, ["initNamespace", namespace]);
              } else p(cal, ar);
              return;
            }
            p(cal, ar);
          };
        })(window, "https://app.cal.com/embed/embed.js", "init");
      `;
      document.head.appendChild(script);
    }

    // Always poll until Cal is ready, then initialize into the current DOM node.
    // This handles both first load AND SPA remounts (where the script tag exists
    // but window.Cal may still be the async queue stub, not the real API).
    const interval = setInterval(() => {
      if ((window as any).Cal) {
        clearInterval(interval);
        initCalEmbed();
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
            Book a Call
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Your business has a next level.<br />
            <span className="text-blue-600">Let's map out how to reach it.</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Free 30-min strategy call. No commitment, no pressure — just a clear picture of what AI can do for your business.
          </p>
        </div>

        {/* Cal.com embed */}
        <div
          id="my-cal-inline-elevate-digital"
          style={{ width: "100%", height: "660px", overflow: "hidden" }}
          className="rounded-2xl border border-slate-200 overflow-hidden bg-white"
        />
      </div>
    </section>
  );
}
