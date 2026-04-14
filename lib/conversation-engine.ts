import type { OrientationAnswers, StudentProfileContext } from "@/types/orientation";
import type {
  ConversationBranch,
  ConversationEngineState,
  ConversationQuestion,
  ConversationQuestionId,
  ConversationSlots,
  ConversationTurnResult,
  ProcessingStage,
} from "@/types/orientation-chat";

export const ADVISOR_WELCOME_MESSAGE =
  "Hi, I'm your Vantery AI Academic Advisor. I'll help you discover the best-fit major, career direction, and US universities based on your strengths, goals, and budget.";

export const ADVISOR_STARTER_CTA = "Let's begin";

export const PROCESSING_STAGES: ProcessingStage[] = [
  { id: "academic", label: "analyzing academic strengths..." },
  { id: "majors", label: "mapping ideal majors..." },
  { id: "career", label: "simulating career pathways..." },
  { id: "universities", label: "matching affordable US universities..." },
  { id: "insights", label: "generating counselor insights..." },
];

const QUESTION_BANK: Record<ConversationQuestionId, ConversationQuestion> = {
  "strongest-subjects": {
    id: "strongest-subjects",
    prompt: "What are your strongest subjects right now?",
    helper: "Share 2-4 subjects, for example: math, statistics, economics.",
    placeholder: "Example: math, statistics, economics",
  },
  "enjoyed-subjects": {
    id: "enjoyed-subjects",
    prompt: "Which subjects do you enjoy the most, even when they are difficult?",
    helper: "This helps me separate skill from motivation.",
    placeholder: "Example: data analysis, product strategy",
  },
  "problem-solving-style": {
    id: "problem-solving-style",
    prompt: "Do you prefer analytical or creative problem solving?",
    helper: "You can answer analytical, creative, or balanced.",
    placeholder: "Example: mostly analytical, but creative in presentation",
  },
  "quant-follow-up": {
    id: "quant-follow-up",
    prompt:
      "Given your quantitative profile, which direction feels closest: finance strategy, data science, or engineering systems?",
    helper: "I will use this to sharpen your major shortlist.",
    placeholder: "Example: finance and data science",
  },
  "creative-follow-up": {
    id: "creative-follow-up",
    prompt:
      "Given your creative profile, which direction feels strongest: business storytelling, design, or media product work?",
    helper: "I will use this to personalize major and career recommendations.",
    placeholder: "Example: design and digital media",
  },
  "career-vision": {
    id: "career-vision",
    prompt: "What kind of career do you imagine in 5 years?",
    helper: "Mention role, industry, and work style if possible.",
    placeholder: "Example: fintech analyst leading data-driven decisions",
  },
  "salary-vs-passion": {
    id: "salary-vs-passion",
    prompt: "Do you care more about salary or passion right now?",
    helper: "You can choose salary-first, passion-first, or balanced.",
    placeholder: "Example: balanced, but I still want strong salary growth",
  },
  "tuition-budget": {
    id: "tuition-budget",
    prompt: "What is your yearly tuition budget in USD?",
    helper: "A rough number is enough. You can use formats like 32000 or 32k.",
    placeholder: "Example: 32000",
  },
  "scholarship-support": {
    id: "scholarship-support",
    prompt: "Will you need scholarship support?",
    helper: "Answer none, moderate, or high.",
    placeholder: "Example: moderate",
  },
  "us-states": {
    id: "us-states",
    prompt: "Which US states interest you the most?",
    helper: "Share 1-4 states. This demo is US-only.",
    placeholder: "Example: California, Texas, New York",
  },
};

const PRE_BRANCH_SEQUENCE: ConversationQuestionId[] = [
  "strongest-subjects",
  "enjoyed-subjects",
  "problem-solving-style",
];

const POST_BRANCH_SEQUENCE: ConversationQuestionId[] = [
  "career-vision",
  "salary-vs-passion",
  "tuition-budget",
  "scholarship-support",
  "us-states",
];

const QUANT_KEYWORDS = [
  "math",
  "statistics",
  "calculus",
  "data",
  "analytics",
  "physics",
  "economics",
  "finance",
  "engineering",
  "algorithm",
  "quant",
];

const CREATIVE_KEYWORDS = [
  "design",
  "media",
  "creative",
  "branding",
  "storytelling",
  "visual",
  "ux",
  "content",
  "marketing",
  "art",
  "film",
];

const DEFAULT_SLOTS: ConversationSlots = {
  strongestSubjects: [],
  enjoyedSubjects: [],
  problemSolvingStyle: "balanced",
  branchIntent: "",
  careerVision: "",
  salaryVsPassion: "balanced",
  tuitionBudgetUsd: 0,
  scholarshipNeed: "moderate",
  preferredUsStates: [],
};

const US_STATES = [
  "alabama",
  "alaska",
  "arizona",
  "arkansas",
  "california",
  "colorado",
  "connecticut",
  "delaware",
  "florida",
  "georgia",
  "hawaii",
  "idaho",
  "illinois",
  "indiana",
  "iowa",
  "kansas",
  "kentucky",
  "louisiana",
  "maine",
  "maryland",
  "massachusetts",
  "michigan",
  "minnesota",
  "mississippi",
  "missouri",
  "montana",
  "nebraska",
  "nevada",
  "new hampshire",
  "new jersey",
  "new mexico",
  "new york",
  "north carolina",
  "north dakota",
  "ohio",
  "oklahoma",
  "oregon",
  "pennsylvania",
  "rhode island",
  "south carolina",
  "south dakota",
  "tennessee",
  "texas",
  "utah",
  "vermont",
  "virginia",
  "washington",
  "west virginia",
  "wisconsin",
  "wyoming",
];

function normalizeText(value: string): string {
  return value.trim().toLowerCase();
}

function toTitleCase(value: string): string {
  return value
    .split(" ")
    .filter(Boolean)
    .map((segment) => segment[0].toUpperCase() + segment.slice(1))
    .join(" ");
}

function dedupe(values: string[]): string[] {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

function parseList(value: string): string[] {
  return dedupe(
    value
      .split(/,|\/| and |\n|&/gi)
      .map((item) => normalizeText(item))
      .filter((item) => item.length >= 2)
      .slice(0, 6),
  );
}

function containsAnyKeyword(value: string, keywords: string[]): boolean {
  return keywords.some((keyword) => value.includes(keyword));
}

function resolveBranch(
  answerText: string,
  currentBranch: ConversationBranch | null,
  problemStyle: OrientationAnswers["thinkingStyle"],
): ConversationBranch {
  if (problemStyle === "analytical") {
    return "quant";
  }
  if (problemStyle === "creative") {
    return "creative";
  }

  if (containsAnyKeyword(answerText, QUANT_KEYWORDS)) {
    return "quant";
  }
  if (containsAnyKeyword(answerText, CREATIVE_KEYWORDS)) {
    return "creative";
  }

  return currentBranch ?? "balanced";
}

function parseProblemSolvingStyle(
  value: string,
): OrientationAnswers["thinkingStyle"] {
  if (value.includes("analytical") || value.includes("logic") || value.includes("data")) {
    return "analytical";
  }
  if (value.includes("creative") || value.includes("design") || value.includes("idea")) {
    return "creative";
  }
  return "balanced";
}

function parseSalaryPreference(value: string): OrientationAnswers["salaryVsPassion"] {
  if (value.includes("salary") || value.includes("income") || value.includes("money")) {
    return "salary-first";
  }
  if (value.includes("passion") || value.includes("purpose") || value.includes("impact")) {
    return "passion-first";
  }
  return "balanced";
}

function parseScholarshipNeed(value: string): OrientationAnswers["scholarshipNeed"] {
  if (value.includes("high") || value.includes("need") || value.includes("must")) {
    return "high";
  }
  if (value.includes("none") || value.includes("no")) {
    return "none";
  }
  return "moderate";
}

function parseBudget(value: string): number {
  const numericMatch = value.match(/(\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?)(\s*k)?/i);
  if (!numericMatch) {
    return 0;
  }

  const raw = Number(numericMatch[1].replaceAll(",", ""));
  if (!Number.isFinite(raw)) {
    return 0;
  }

  const multiplier = numericMatch[2] ? 1000 : 1;
  return Math.round(raw * multiplier);
}

function parseUsStates(value: string): string[] {
  const normalized = normalizeText(value);
  const states = US_STATES.filter((state) => normalized.includes(state)).map(toTitleCase);
  return states.slice(0, 4);
}

function parseCareerTrackHints(value: string): {
  intendedMajors: string[];
  preferredDomains: OrientationAnswers["preferredDomains"];
  favoriteProblemTypes: string[];
} {
  const normalized = normalizeText(value);

  if (normalized.includes("finance")) {
    return {
      intendedMajors: ["Finance", "Business Analytics", "Data Science"],
      preferredDomains: ["business", "technology"],
      favoriteProblemTypes: ["investment", "risk", "strategy"],
    };
  }

  if (normalized.includes("engineering")) {
    return {
      intendedMajors: ["Industrial Engineering", "Data Science", "Computer Science"],
      preferredDomains: ["engineering", "technology"],
      favoriteProblemTypes: ["optimization", "systems", "automation"],
    };
  }

  if (normalized.includes("design") || normalized.includes("media") || normalized.includes("ux")) {
    return {
      intendedMajors: ["UX Design", "Business Analytics", "Public Health"],
      preferredDomains: ["creativity", "technology"],
      favoriteProblemTypes: ["user experience", "journeys", "product storytelling"],
    };
  }

  if (normalized.includes("business")) {
    return {
      intendedMajors: ["Business Analytics", "Finance", "Industrial Engineering"],
      preferredDomains: ["business", "technology"],
      favoriteProblemTypes: ["strategy", "market", "decision making"],
    };
  }

  if (normalized.includes("data") || normalized.includes("ai")) {
    return {
      intendedMajors: ["Data Science", "Business Analytics", "Computer Science"],
      preferredDomains: ["technology", "business"],
      favoriteProblemTypes: ["prediction", "modeling", "analytics"],
    };
  }

  return {
    intendedMajors: ["Business Analytics", "Finance", "Data Science"],
    preferredDomains: ["business", "technology"],
    favoriteProblemTypes: ["strategy", "optimization", "decision making"],
  };
}

function buildQuestionOrder(branch: ConversationBranch | null): ConversationQuestionId[] {
  const branchQuestion =
    branch === "quant"
      ? "quant-follow-up"
      : branch === "creative"
        ? "creative-follow-up"
        : null;

  if (!branchQuestion) {
    return [...PRE_BRANCH_SEQUENCE, ...POST_BRANCH_SEQUENCE];
  }

  return [...PRE_BRANCH_SEQUENCE, branchQuestion, ...POST_BRANCH_SEQUENCE];
}

export function createInitialConversationState(): ConversationEngineState {
  return {
    branch: null,
    askedQuestionIds: [],
    answersByQuestion: {},
    slots: { ...DEFAULT_SLOTS },
  };
}

export function getNextConversationQuestion(
  state: ConversationEngineState,
): ConversationQuestion | null {
  const order = buildQuestionOrder(state.branch);
  const nextId = order.find((questionId) => !state.askedQuestionIds.includes(questionId));
  return nextId ? QUESTION_BANK[nextId] : null;
}

export function submitConversationAnswer(
  state: ConversationEngineState,
  questionId: ConversationQuestionId,
  rawAnswer: string,
): ConversationTurnResult {
  const normalizedAnswer = normalizeText(rawAnswer);
  const askedQuestionIds = state.askedQuestionIds.includes(questionId)
    ? state.askedQuestionIds
    : [...state.askedQuestionIds, questionId];

  const answersByQuestion = {
    ...state.answersByQuestion,
    [questionId]: rawAnswer.trim(),
  };

  const slots: ConversationSlots = {
    ...state.slots,
  };

  const answerPatch: Partial<OrientationAnswers> = {
    countryFlexibility: "usa-only",
    visaPreference: "f1-focused",
  };

  const profilePatch: Partial<StudentProfileContext> = {
    preferredDestinations: ["United States"],
  };

  if (questionId === "strongest-subjects") {
    const subjects = parseList(normalizedAnswer);
    slots.strongestSubjects = subjects;
    answerPatch.strongestSubjects = subjects.length > 0 ? subjects : ["math", "economics"];
  }

  if (questionId === "enjoyed-subjects") {
    const enjoyed = parseList(normalizedAnswer);
    slots.enjoyedSubjects = enjoyed;
    answerPatch.curiosityTopics = enjoyed;
    answerPatch.favoriteProblemTypes = enjoyed.slice(0, 4);
  }

  if (questionId === "problem-solving-style") {
    const style = parseProblemSolvingStyle(normalizedAnswer);
    slots.problemSolvingStyle = style;
    answerPatch.thinkingStyle = style;
    answerPatch.enjoysQuantitativeProblemSolving =
      style === "analytical" ? 5 : style === "creative" ? 2 : 3;

    if (normalizedAnswer.includes("hands-on") || normalizedAnswer.includes("practical")) {
      answerPatch.practicalVsTheoryPreference = "practical";
    } else if (normalizedAnswer.includes("theory") || normalizedAnswer.includes("research")) {
      answerPatch.practicalVsTheoryPreference = "theory";
    } else {
      answerPatch.practicalVsTheoryPreference = "balanced";
    }

    if (normalizedAnswer.includes("team")) {
      answerPatch.teamworkStyle = "team";
    } else if (normalizedAnswer.includes("solo") || normalizedAnswer.includes("independent")) {
      answerPatch.teamworkStyle = "solo";
    } else {
      answerPatch.teamworkStyle = "balanced";
    }
  }

  if (questionId === "quant-follow-up" || questionId === "creative-follow-up") {
    const hints = parseCareerTrackHints(normalizedAnswer);
    slots.branchIntent = normalizedAnswer;
    answerPatch.preferredDomains = hints.preferredDomains;
    answerPatch.favoriteProblemTypes = hints.favoriteProblemTypes;
    profilePatch.intendedMajors = hints.intendedMajors;
  }

  if (questionId === "career-vision") {
    slots.careerVision = rawAnswer.trim();
    answerPatch.fiveYearCareerVision = rawAnswer.trim();

    if (normalizedAnswer.includes("startup") || normalizedAnswer.includes("founder")) {
      answerPatch.corporateVsEntrepreneurship = "entrepreneurship";
    } else if (normalizedAnswer.includes("bank") || normalizedAnswer.includes("corporate")) {
      answerPatch.corporateVsEntrepreneurship = "corporate";
    } else {
      answerPatch.corporateVsEntrepreneurship = "balanced";
    }

    if (normalizedAnswer.includes("remote")) {
      answerPatch.remoteVsOnsite = "remote";
    } else if (normalizedAnswer.includes("onsite") || normalizedAnswer.includes("on-site")) {
      answerPatch.remoteVsOnsite = "on-site";
    } else {
      answerPatch.remoteVsOnsite = "hybrid";
    }

    if (normalizedAnswer.includes("lead") || normalizedAnswer.includes("manager")) {
      answerPatch.leadershipVsSpecialist = "leadership";
    } else if (normalizedAnswer.includes("specialist") || normalizedAnswer.includes("engineer")) {
      answerPatch.leadershipVsSpecialist = "technical-specialist";
    } else {
      answerPatch.leadershipVsSpecialist = "balanced";
    }
  }

  if (questionId === "salary-vs-passion") {
    const preference = parseSalaryPreference(normalizedAnswer);
    slots.salaryVsPassion = preference;
    answerPatch.salaryVsPassion = preference;
  }

  if (questionId === "tuition-budget") {
    const budget = parseBudget(normalizedAnswer);
    const safeBudget = budget > 0 ? budget : 32000;
    slots.tuitionBudgetUsd = safeBudget;
    answerPatch.maxAnnualTuitionBudgetUsd = safeBudget;
    answerPatch.maxMonthlyLivingBudgetUsd = Math.round(Math.max(1200, safeBudget * 0.05));
    answerPatch.bankStatementCapacityUsd = Math.round(safeBudget * 1.25);
  }

  if (questionId === "scholarship-support") {
    const scholarshipNeed = parseScholarshipNeed(normalizedAnswer);
    slots.scholarshipNeed = scholarshipNeed;
    answerPatch.scholarshipNeed = scholarshipNeed;
  }

  if (questionId === "us-states") {
    const states = parseUsStates(normalizedAnswer);
    slots.preferredUsStates = states;
    profilePatch.preferredDestinations =
      states.length > 0 ? ["United States", ...states] : ["United States"];
  }

  const branch = resolveBranch(normalizedAnswer, state.branch, slots.problemSolvingStyle);
  const nextState: ConversationEngineState = {
    branch,
    askedQuestionIds,
    answersByQuestion,
    slots,
  };

  const nextQuestion = getNextConversationQuestion(nextState);

  return {
    nextState,
    answerPatch,
    profilePatch,
    nextQuestion,
    isComplete: nextQuestion === null,
  };
}

export function getQuestionById(questionId: ConversationQuestionId): ConversationQuestion {
  return QUESTION_BANK[questionId];
}