// src/lib/auditEngine.ts

export type Industry =
  | "Home Services"
  | "Law Firm"
  | "Dental / Medical"
  | "Real Estate"
  | "E-commerce"
  | "Contractor"
  | "Other";

export type Pain =
  | "Missed calls & leads"
  | "Slow follow-up"
  | "Website doesn't convert"
  | "Too much manual admin"
  | "Hard to scale without hiring";

export type TeamSize = "Just me" | "2–5" | "6–15" | "16–50" | "50+";

export type Revenue =
  | "Under $10k"
  | "$10k–$30k"
  | "$30k–$100k"
  | "$100k+"
  | "Prefer not to say";

export type AfterHours =
  | "They hit voicemail and rarely call back"
  | "We have someone on-call (expensive)"
  | "We forward to my personal phone (exhausting)"
  | "We just miss the calls"
  | "We use a third-party answering service";

export type LeadVolume = "Under 20" | "20–50" | "50–150" | "150–500" | "500+";

export type Goal =
  | "Save time"
  | "Capture more leads"
  | "Cut costs"
  | "Scale without hiring"
  | "All of the above";

export type ServiceKey = "voice" | "chat" | "landing" | "automation";

export type Answers = {
  industry: Industry;
  industryCustom?: string;
  pain: Pain;
  teamSize: TeamSize;
  revenue: Revenue;
  afterHours: AfterHours;
  leadVolume: LeadVolume;
  goal: Goal;
};

export type ServiceRecommendation = {
  service: ServiceKey;
  score: number;
  roiMin: number;
  roiMax: number;
  label: string;
  description: string;
  insight: string;
};

export type AuditResult = {
  recommendations: ServiceRecommendation[];
  totalMin: number;
  totalMax: number;
};

const AVG_JOB_VALUE: Record<Industry, number> = {
  "Home Services": 450,
  "Law Firm": 2000,
  "Dental / Medical": 600,
  "Real Estate": 3500,
  "E-commerce": 150,
  Contractor: 800,
  Other: 500,
};

const LEAD_MIDPOINTS: Record<LeadVolume, number> = {
  "Under 20": 10,
  "20–50": 35,
  "50–150": 100,
  "150–500": 325,
  "500+": 600,
};

const TEAM_MIDPOINTS: Record<TeamSize, number> = {
  "Just me": 1,
  "2–5": 3,
  "6–15": 10,
  "16–50": 30,
  "50+": 60,
};

const SERVICE_PRIORITY: ServiceKey[] = ["voice", "chat", "landing", "automation"];

const DESCRIPTIONS: Record<ServiceKey, string> = {
  voice: "estimated monthly revenue from recovered missed calls",
  chat: "estimated monthly revenue from leads leaving your website",
  landing: "estimated monthly gain from improved conversion",
  automation: "estimated monthly time savings (in labor cost)",
};

function buildInsight(service: ServiceKey, answers: Answers): string {
  const industryLabel =
    answers.industry === "Other" && answers.industryCustom
      ? answers.industryCustom
      : answers.industry;
  switch (service) {
    case "voice":
      return `Based on your ${answers.leadVolume} monthly leads and after-hours situation, you're leaving revenue on the table every night.`;
    case "chat":
      return `With ${answers.leadVolume} monthly leads coming in, a chat agent captures prospects even when your team is busy.`;
    case "landing":
      return `A high-converting landing page tailored to ${industryLabel} businesses can meaningfully lift your close rate.`;
    case "automation":
      return `For a team of ${answers.teamSize}, automating follow-up and admin could recover hours of billable time weekly.`;
  }
}

function computeScores(answers: Answers): Record<ServiceKey, number> {
  const scores: Record<ServiceKey, number> = { voice: 0, chat: 0, landing: 0, automation: 0 };

  const painMap: Partial<Record<Pain, Partial<Record<ServiceKey, number>>>> = {
    "Missed calls & leads":         { voice: 3, chat: 1, automation: 1 },
    "Slow follow-up":               { voice: 1, chat: 2, automation: 3 },
    "Website doesn't convert":      { chat: 2, landing: 3, automation: 1 },
    "Too much manual admin":        { voice: 1, chat: 1, automation: 3 },
    "Hard to scale without hiring": { voice: 2, chat: 1, landing: 1, automation: 3 },
  };

  const afterHoursMap: Partial<Record<AfterHours, Partial<Record<ServiceKey, number>>>> = {
    "They hit voicemail and rarely call back":      { voice: 3, chat: 1 },
    "We just miss the calls":                       { voice: 3, chat: 1 },
    "We have someone on-call (expensive)":          { voice: 3, automation: 1 },
    "We forward to my personal phone (exhausting)": { voice: 3, automation: 1 },
    "We use a third-party answering service":       { voice: 2, chat: 1, automation: 1 },
  };

  const goalMap: Partial<Record<Goal, Partial<Record<ServiceKey, number>>>> = {
    "Capture more leads":   { voice: 2, chat: 2, landing: 2, automation: 1 },
    "Save time":            { voice: 1, chat: 1, automation: 3 },
    "Scale without hiring": { voice: 2, chat: 2, landing: 1, automation: 3 },
    "Cut costs":            { voice: 1, chat: 1, automation: 2 },
    "All of the above":     { voice: 2, chat: 2, landing: 1, automation: 2 },
  };

  for (const [key, val] of Object.entries(painMap[answers.pain] ?? {})) {
    scores[key as ServiceKey] += val as number;
  }
  for (const [key, val] of Object.entries(afterHoursMap[answers.afterHours] ?? {})) {
    scores[key as ServiceKey] += val as number;
  }
  for (const [key, val] of Object.entries(goalMap[answers.goal] ?? {})) {
    scores[key as ServiceKey] += val as number;
  }

  return scores;
}

function round50(n: number): number {
  return Math.round(n / 50) * 50;
}

function formatLabel(min: number, max: number): string {
  return `est. $${min.toLocaleString()}–$${max.toLocaleString()}/mo`;
}

function computeRoi(
  service: ServiceKey,
  answers: Answers
): { roiMin: number; roiMax: number; label: string } {
  const jobValue = AVG_JOB_VALUE[answers.industry];
  const leadMidpoint = LEAD_MIDPOINTS[answers.leadVolume];
  const teamMidpoint = TEAM_MIDPOINTS[answers.teamSize];

  let base = 0;
  switch (service) {
    case "voice":
      base = leadMidpoint * 0.35 * jobValue * 0.25;
      break;
    case "chat":
      base = leadMidpoint * 0.3 * jobValue * 0.2;
      break;
    case "landing":
      base = leadMidpoint * jobValue * 0.15;
      break;
    case "automation":
      base = teamMidpoint * 10 * 35;
      break;
  }
  const roiMin = round50(base * 0.8);
  const roiMax = round50(base * 1.3);
  return { roiMin, roiMax, label: formatLabel(roiMin, roiMax) };
}

export function runAuditEngine(answers: Answers): AuditResult {
  const scores = computeScores(answers);

  const qualifying = SERVICE_PRIORITY.filter((s) => scores[s] >= 2).sort(
    (a, b) => scores[b] - scores[a]
  );
  const nonQualifying = SERVICE_PRIORITY.filter((s) => scores[s] < 2).sort(
    (a, b) => scores[b] - scores[a]
  );

  let selected = qualifying.slice(0, 4);
  if (selected.length < 2) {
    const needed = 2 - selected.length;
    selected = [...selected, ...nonQualifying.slice(0, needed)];
  }

  const recommendations: ServiceRecommendation[] = selected.map((service) => {
    const { roiMin, roiMax, label } = computeRoi(service, answers);
    return {
      service,
      score: scores[service],
      roiMin,
      roiMax,
      label,
      description: DESCRIPTIONS[service],
      insight: buildInsight(service, answers),
    };
  });

  const totalMin = recommendations.reduce((sum, r) => sum + r.roiMin, 0);
  const totalMax = recommendations.reduce((sum, r) => sum + r.roiMax, 0);

  return { recommendations, totalMin, totalMax };
}
