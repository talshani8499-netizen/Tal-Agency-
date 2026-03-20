// src/components/AuditBookingWidget.tsx
import { useEffect } from "react";

export function AuditBookingWidget() {
  useEffect(() => {
    function initCalEmbed() {
      const Cal = (window as any).Cal;
      if (!Cal) return;
      Cal("init", "elevate-digital-audit", { origin: "https://app.cal.com" });
      Cal.ns["elevate-digital-audit"]("inline", {
        elementOrSelector: "#my-cal-inline-audit",
        config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
        calLink: "tal-shani-i0wamv/elevate-digital",
      });
      Cal.ns["elevate-digital-audit"]("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": "#2563eb" },
          dark: { "cal-brand": "#fafafa" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    }

    if (!document.getElementById("cal-embed-script-audit")) {
      const script = document.createElement("script");
      script.id = "cal-embed-script-audit";
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
              if (typeof namespace === "string") {
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

    const interval = setInterval(() => {
      if ((window as any).Cal) {
        clearInterval(interval);
        initCalEmbed();
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="my-cal-inline-audit"
      style={{ width: "100%", height: "500px", overflow: "hidden" }}
      className="rounded-xl border border-white/10"
    />
  );
}
