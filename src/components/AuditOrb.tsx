// src/components/AuditOrb.tsx
import { useEffect, useState } from "react";
import { motion, useAnimation } from "motion/react";

interface AuditOrbProps {
  size?: number;       // px, default 48
  state: "idle" | "awake" | "active" | "calculating";
  approveCount: number; // increment to trigger brightness surge; initial value 0 is skipped
}

function useTypewriter(text: string, msPerChar: number, active: boolean) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) {
      setDisplayed("");
      setDone(false);
      return;
    }
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, msPerChar);
    return () => clearInterval(interval);
  }, [active, text, msPerChar]);

  return { displayed, done };
}

export function AuditOrb({ size = 48, state, approveCount }: AuditOrbProps) {
  const controls = useAnimation();
  const brightnessControls = useAnimation();

  // Consolidated state animation — always stop first to prevent competing loops
  useEffect(() => {
    controls.stop();
    if (state === "idle" || state === "active") {
      controls.start({
        scale: [1, 1.08, 1],
        transition: { duration: 3, ease: "easeInOut", repeat: Infinity },
      });
    } else if (state === "awake") {
      controls.start({
        scale: [1, 1.15, 1],
        transition: { duration: 0.2, ease: "easeOut" },
      });
    } else if (state === "calculating") {
      controls.start({
        scale: [1, 1.2, 1],
        transition: { duration: 0.6, ease: "easeInOut", repeat: Infinity },
      });
    }
  }, [state, controls]);

  // Brightness surge on approveCount change — skip when no approvals yet
  useEffect(() => {
    if (approveCount === 0) return;
    brightnessControls.start({
      filter: ["brightness(1)", "brightness(1.4)", "brightness(1)"],
      transition: { duration: 0.3, ease: "easeInOut" },
    });
  }, [approveCount, brightnessControls]);

  const orbStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: "50%",
    background: "radial-gradient(circle at 35% 35%, #a78bfa, #3b82f6 60%, #1e3a8a)",
    boxShadow: "0 0 20px 4px rgba(139,92,246,0.5)",
    flexShrink: 0,
  };

  return (
    <motion.div animate={brightnessControls} style={{ display: "inline-flex" }}>
      <motion.div animate={controls} style={orbStyle} />
    </motion.div>
  );
}

const SPEECH_TEXT = "You should click it 👆";

export function AuditOrbWithBubble({
  size = 48,
  state,
  approveCount,
}: AuditOrbProps) {
  // AuditOrbWithBubble is only used on the floating bubble (state = "idle" | "awake")
  const awake = state === "awake";
  const { displayed, done } = useTypewriter(SPEECH_TEXT, 80, awake);
  const controls = useAnimation();

  // Y bounce after typewriter done
  useEffect(() => {
    if (done) {
      controls.start({
        y: [0, -4, 0],
        transition: { duration: 0.4, ease: "easeInOut" },
      });
    }
  }, [done, controls]);

  return (
    <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
      {awake && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "white",
            color: "#1e293b",
            borderRadius: "12px",
            padding: "6px 10px",
            fontSize: "12px",
            fontWeight: 600,
            whiteSpace: "nowrap",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            pointerEvents: "none",
          }}
        >
          {displayed}
          {/* Speech bubble tail */}
          <span
            style={{
              position: "absolute",
              bottom: -6,
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid white",
            }}
          />
        </motion.div>
      )}
      <motion.div animate={controls}>
        <AuditOrb size={size} state={state} approveCount={approveCount} />
      </motion.div>
    </div>
  );
}
