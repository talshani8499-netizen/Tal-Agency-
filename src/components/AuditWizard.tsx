// src/components/AuditWizard.tsx
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, Phone, MessageSquare, Globe, Zap } from "lucide-react"; // Phone, MessageSquare, Globe, Zap used in StepResults (added in Task 5)
import { Button } from "@/components/ui/Button";
import { AuditOrb } from "@/components/AuditOrb";
import { AuditBookingWidget } from "@/components/AuditBookingWidget"; // used in StepResults (added in Task 5)
import {
  runAuditEngine, // used in StepCalculating (added in Task 5)
  type Answers,
  type AuditResult,
  type Industry,
  type Pain,
  type TeamSize,
  type Revenue,
  type AfterHours,
  type LeadVolume,
  type Goal,
  type ServiceKey,
} from "@/lib/auditEngine";

interface AuditWizardProps {
  open: boolean;
  onClose: () => void;
}

type WizardState = {
  step: number; // 1-7=steps, 8=lead gate, 9=calculating, 10=results+booking
  answers: Partial<Answers>;
  name: string;
  email: string;
  encouragementVisible: boolean;
  approveCount: number;
  auditResult: AuditResult | null;
  showEscConfirm: boolean;
};

const INITIAL_STATE: WizardState = {
  step: 1,
  answers: {},
  name: "",
  email: "",
  encouragementVisible: false,
  approveCount: 0,
  auditResult: null,
  showEscConfirm: false,
};

const ENCOURAGEMENT: Record<number, string | ((answers: Partial<Answers>) => string)> = {
  1: "Great — we know this space well.",
  2: "You're not alone — this is the #1 issue we solve.",
  3: "Perfect size to see immediate ROI from AI.",
  4: (a) =>
    a.revenue === "Prefer not to say"
      ? "No problem — we'll use industry averages."
      : "This helps us give you accurate numbers.",
  5: "That's significant — here's what you're leaving on the table.",
  6: "Got it — let's calculate your opportunity.",
  7: "That's exactly what we built this for.",
};

function getEncouragement(step: number, answers: Partial<Answers>): string {
  const val = ENCOURAGEMENT[step];
  if (!val) return "";
  return typeof val === "function" ? val(answers) : val;
}

export function AuditWizard({ open, onClose }: AuditWizardProps) {
  const [state, setState] = useState<WizardState>(INITIAL_STATE);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset state 300ms after drawer closes (after exit animation)
  useEffect(() => {
    if (!open) {
      closeTimer.current = setTimeout(() => {
        setState(INITIAL_STATE);
      }, 300);
    }
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, [open]);

  // ESC key handler
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape" || !open) return;
      if (state.step <= 1) {
        onClose();
      } else {
        setState((s) => ({ ...s, showEscConfirm: true }));
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, state.step, onClose]);

  // Focus trap
  const drawerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const drawer = drawerRef.current;
    if (!drawer) return;

    drawer.focus();

    function handleTab(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const focusable = drawer!.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    }
    window.addEventListener("keydown", handleTab);
    return () => window.removeEventListener("keydown", handleTab);
  }, [open]);

  function selectAnswer(field: keyof Answers, value: string) {
    setState((s) => ({
      ...s,
      answers: { ...s.answers, [field]: value },
      encouragementVisible: true,
      approveCount: s.approveCount + 1,
    }));
    setTimeout(() => {
      setState((s) => ({
        ...s,
        encouragementVisible: false,
        step: s.step + 1,
      }));
    }, 1200);
  }

  function goBack() {
    setState((s) => ({
      ...s,
      step: Math.max(1, s.step - 1),
      encouragementVisible: false,
    }));
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-[49]"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Quick Business AI Audit"
            tabIndex={-1}
            initial={{ translateY: "100%" }}
            animate={{ translateY: "0%" }}
            exit={{ translateY: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[680px] max-h-[85dvh] z-50 flex flex-col rounded-t-2xl overflow-hidden focus:outline-none"
            style={{ background: "#0f172a", color: "white" }}
          >
            {/* Header — steps 1–7 only */}
            {state.step >= 1 && state.step <= 7 && (
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 shrink-0">
                {state.step > 1 && (
                  <button
                    onClick={goBack}
                    className="text-white/60 hover:text-white transition-colors"
                    aria-label="Go back"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                )}
                <span className="sm:hidden"><AuditOrb size={32} state="active" approveCount={state.approveCount} /></span>
                <span className="hidden sm:inline"><AuditOrb size={40} state="active" approveCount={state.approveCount} /></span>
                <span className="text-xs text-white/60 font-medium">
                  Step {state.step} of 7
                </span>
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden" role="progressbar" aria-valuenow={state.step} aria-valuemax={7}>
                  <motion.div
                    className="h-full bg-blue-500 rounded-full"
                    animate={{ width: `${(state.step / 7) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <button
                  onClick={() => state.step <= 1 ? onClose() : setState((s) => ({ ...s, showEscConfirm: true }))}
                  className="text-white/60 hover:text-white transition-colors ml-2"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Header — steps 8–10: close button only */}
            {state.step >= 8 && (
              <div className="flex items-center justify-end px-5 py-4 border-b border-white/10 shrink-0">
                <button
                  onClick={onClose}
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* ESC Confirmation overlay */}
            {state.showEscConfirm && (
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative bg-slate-800 rounded-xl p-6 mx-4 text-center shadow-2xl">
                  <p className="text-white font-semibold mb-2">Are you sure?</p>
                  <p className="text-white/60 text-sm mb-5">You'll lose your progress.</p>
                  <div className="flex gap-3 justify-center">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setState((s) => ({ ...s, showEscConfirm: false }))}
                    >
                      Keep Going
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={onClose}
                    >
                      Close Anyway
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1 px-5 py-6">
              <StepContent state={state} setState={setState} selectAnswer={selectAnswer} onClose={onClose} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface StepContentProps {
  state: WizardState;
  setState: React.Dispatch<React.SetStateAction<WizardState>>;
  selectAnswer: (field: keyof Answers, value: string) => void;
  onClose: () => void;
}

function StepContent({ state, setState, selectAnswer, onClose }: StepContentProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={state.step}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.2 }}
      >
        {state.step === 1 && <Step1 state={state} selectAnswer={selectAnswer} setState={setState} />}
        {state.step === 2 && <StepOptions step={2} field="pain" headline="What's your #1 growth bottleneck right now?" options={["Missed calls & leads","Slow follow-up","Website doesn't convert","Too much manual admin","Hard to scale without hiring"] as Pain[]} state={state} selectAnswer={selectAnswer} />}
        {state.step === 3 && <StepOptions step={3} field="teamSize" headline="How many people are on your team?" options={["Just me","2–5","6–15","16–50","50+"] as TeamSize[]} state={state} selectAnswer={selectAnswer} />}
        {state.step === 4 && <StepOptions step={4} field="revenue" headline="Roughly, what's your current monthly revenue?" subLabel="Helps us size your opportunity accurately." options={["Under $10k","$10k–$30k","$30k–$100k","$100k+","Prefer not to say"] as Revenue[]} state={state} selectAnswer={selectAnswer} />}
        {state.step === 5 && <StepOptions step={5} field="afterHours" headline="What happens when someone calls after office hours?" options={["They hit voicemail and rarely call back","We have someone on-call (expensive)","We forward to my personal phone (exhausting)","We just miss the calls","We use a third-party answering service"] as AfterHours[]} state={state} selectAnswer={selectAnswer} />}
        {state.step === 6 && <StepOptions step={6} field="leadVolume" headline="How many inbound leads or calls do you get per month?" options={["Under 20","20–50","50–150","150–500","500+"] as LeadVolume[]} state={state} selectAnswer={selectAnswer} />}
        {state.step === 7 && <StepOptions step={7} field="goal" headline="What matters most to you right now?" options={["Save time","Capture more leads","Cut costs","Scale without hiring","All of the above"] as Goal[]} state={state} selectAnswer={selectAnswer} />}
        {state.step === 8 && null}
        {state.step === 9 && null}
        {state.step === 10 && null}
      </motion.div>
    </AnimatePresence>
  );
}

function Step1({ state, selectAnswer, setState }: { state: WizardState; selectAnswer: (field: keyof Answers, value: string) => void; setState: React.Dispatch<React.SetStateAction<WizardState>> }) {
  const [customText, setCustomText] = useState("");
  const industries: Industry[] = ["Home Services","Law Firm","Dental / Medical","Real Estate","E-commerce","Contractor","Other"];
  const selected = state.answers.industry;

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">What type of business do you run?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
        {industries.map((opt) => (
          <OptionCard
            key={opt}
            label={opt}
            selected={selected === opt}
            onClick={() => {
              if (opt !== "Other") {
                selectAnswer("industry", opt);
              } else {
                setState((s) => ({ ...s, answers: { ...s.answers, industry: "Other" } }));
              }
            }}
          />
        ))}
      </div>
      {selected === "Other" && (
        <div className="mt-4">
          <input
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/40 border border-white/20 focus:outline-none focus:border-blue-400"
            placeholder="Describe your business..."
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            autoFocus
          />
          <Button
            className="mt-3 w-full"
            disabled={customText.trim() === ""}
            onClick={() => {
              setState((s) => ({
                ...s,
                answers: { ...s.answers, industry: "Other", industryCustom: customText.trim() },
                encouragementVisible: true,
                approveCount: s.approveCount + 1,
              }));
              setTimeout(() => {
                setState((s) => ({ ...s, encouragementVisible: false, step: s.step + 1 }));
              }, 1200);
            }}
          >
            Continue →
          </Button>
        </div>
      )}
      {state.encouragementVisible && (
        <EncouragementText text={getEncouragement(1, state.answers)} />
      )}
    </div>
  );
}

function StepOptions<T extends string>({
  step,
  field,
  headline,
  subLabel,
  options,
  state,
  selectAnswer,
}: {
  step: number;
  field: keyof Answers;
  headline: string;
  subLabel?: string;
  options: T[];
  state: WizardState;
  selectAnswer: (field: keyof Answers, value: string) => void;
}) {
  const selected = state.answers[field] as string | undefined;
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">{headline}</h2>
      {subLabel && <p className="text-white/50 text-sm mb-4">{subLabel}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        {options.map((opt) => (
          <OptionCard
            key={opt}
            label={opt}
            selected={selected === opt}
            onClick={() => !state.encouragementVisible && selectAnswer(field, opt)}
          />
        ))}
      </div>
      {state.encouragementVisible && (
        <EncouragementText text={getEncouragement(step, state.answers)} />
      )}
    </div>
  );
}

function OptionCard({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      aria-pressed={selected}
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-150 ${
        selected
          ? "bg-blue-600 border-blue-500 text-white"
          : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20"
      }`}
    >
      {label}
    </button>
  );
}

function EncouragementText({ text }: { text: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 text-emerald-400 text-sm font-medium"
    >
      ✓ {text}
    </motion.p>
  );
}
