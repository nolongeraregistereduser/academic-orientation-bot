import type { OrientationAnswers, StudentProfileContext } from "@/types/orientation";
import type {
  ConversationAnswerPayload,
  ConversationBranchTag,
  ConversationEngineState,
  ConversationPhaseId,
  ConversationPhaseMeta,
  ConversationProgress,
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

export const CONVERSATION_PHASES: ConversationPhaseMeta[] = [
  {
    id: "academic-foundation",
    title: "Academic Foundation",
    subtitle: "Performance, strengths, and readiness signals.",
    milestoneCopy: "Great start. Now let's map what naturally drives your interests.",
  },
  {
    id: "interests",
    title: "Interests",
    subtitle: "Curiosity, problem preferences, and engagement patterns.",
    milestoneCopy: "Perfect. Next, let's define how you do your best work day-to-day.",
  },
  {
    id: "work-style",
    title: "Work Style",
    subtitle: "Structure, collaboration, and environment fit.",
    milestoneCopy: "Excellent. Now let's sharpen your career direction and priorities.",
  },
  {
    id: "career-goals",
    title: "Career Goals",
    subtitle: "Direction, priorities, and growth preferences.",
    milestoneCopy: "Great clarity. Let's lock constraints so recommendations stay realistic.",
  },
  {
    id: "constraints",
    title: "Constraints",
    subtitle: "Geography, budget, scholarships, and timing.",
    milestoneCopy: "Final phase. Let's capture your deeper self-awareness signals.",
  },
  {
    id: "self-awareness",
    title: "Self-awareness",
    subtitle: "Strengths, values, and long-term decision quality.",
    milestoneCopy: "",
  },
];

const DEFAULT_SLOTS: ConversationSlots = {
  gpaRange: "3-2-to-3-6",
  strongestSubjects: [],
  weakestSubjects: [],
  decisionPriority: "balanced",
  scholarshipNeed: "moderate",
  preferredUsStates: [],
  desiredCareerTrack: "",
  coreValues: [],
};

const QUESTION_ORDER: ConversationQuestionId[] = [
  "gpa-range",
  "strongest-subjects",
  "weakest-subjects",
  "advanced-courses",
  "free-time-topics",
  "preferred-problem-types",
  "people-data-ideas",
  "extracurriculars",
  "structure-vs-open",
  "solo-team-leadership",
  "detail-vs-big-picture",
  "work-setting",
  "desired-career",
  "salary-impact-prestige",
  "org-path",
  "balance-vs-growth",
  "us-states",
  "tuition-budget",
  "scholarship-need",
  "degree-duration",
  "self-strengths",
  "help-request-theme",
  "core-values",
  "regret-minimization",
];

function optionsFrom(
  values: Array<{ id: string; label: string; value: string; description?: string; icon?: string }>,
) {
  return values;
}

const QUESTION_BANK: Record<ConversationQuestionId, ConversationQuestion> = {
  "gpa-range": {
    id: "gpa-range",
    phaseId: "academic-foundation",
    prompt: "To begin, where does your current GPA range sit?",
    helper: "Select the range that best matches your current transcript trend.",
    mode: "segmented",
    options: optionsFrom([
      { id: "gpa-1", label: "Below 2.8", value: "below-2-8" },
      { id: "gpa-2", label: "2.8 - 3.2", value: "2-8-to-3-2" },
      { id: "gpa-3", label: "3.2 - 3.6", value: "3-2-to-3-6" },
      { id: "gpa-4", label: "3.6 - 4.0", value: "3-6-to-4-0" },
    ]),
    multiSelect: false,
    minSelections: 1,
    maxSelections: 1,
    required: true,
  },
  "strongest-subjects": {
    id: "strongest-subjects",
    phaseId: "academic-foundation",
    prompt: "Which subjects are currently your strongest?",
    helper: "Choose up to four subjects where you consistently perform best.",
    mode: "pill-chips",
    options: optionsFrom([
      { id: "ss-1", label: "Math", value: "math" },
      { id: "ss-2", label: "Statistics", value: "statistics" },
      { id: "ss-3", label: "Economics", value: "economics" },
      { id: "ss-4", label: "Computer Science", value: "computer science" },
      { id: "ss-5", label: "Physics", value: "physics" },
      { id: "ss-6", label: "Biology", value: "biology" },
      { id: "ss-7", label: "Psychology", value: "psychology" },
      { id: "ss-8", label: "Design", value: "design" },
    ]),
    multiSelect: true,
    minSelections: 2,
    maxSelections: 4,
    required: true,
  },
  "weakest-subjects": {
    id: "weakest-subjects",
    phaseId: "academic-foundation",
    prompt: "Which subjects feel like your weakest fit right now?",
    helper: "Pick one or two to avoid low-fit major recommendations.",
    mode: "pill-chips",
    options: optionsFrom([
      { id: "ws-1", label: "Chemistry", value: "chemistry" },
      { id: "ws-2", label: "Biology", value: "biology" },
      { id: "ws-3", label: "Literature", value: "literature" },
      { id: "ws-4", label: "History", value: "history" },
      { id: "ws-5", label: "Accounting", value: "accounting" },
      { id: "ws-6", label: "Programming", value: "programming" },
    ]),
    multiSelect: true,
    minSelections: 1,
    maxSelections: 2,
    required: false,
  },
  "advanced-courses": {
    id: "advanced-courses",
    phaseId: "academic-foundation",
    prompt: "Which advanced courses have you completed or started?",
    helper: "Optional but useful for confidence calibration.",
    mode: "cards",
    options: optionsFrom([
      { id: "ac-1", label: "AP / Advanced Calculus", value: "advanced calculus" },
      { id: "ac-2", label: "AP / Advanced Statistics", value: "advanced statistics" },
      { id: "ac-3", label: "Research Methods", value: "research methods" },
      { id: "ac-4", label: "Business Strategy", value: "business strategy" },
      { id: "ac-5", label: "Programming / Data Structures", value: "data structures" },
      { id: "ac-6", label: "No Advanced Courses Yet", value: "none" },
    ]),
    multiSelect: true,
    minSelections: 1,
    maxSelections: 3,
    required: false,
  },
  "free-time-topics": {
    id: "free-time-topics",
    phaseId: "interests",
    prompt: "When you explore topics in your free time, what do you naturally gravitate toward?",
    helper: "This helps identify your intrinsic motivation signals.",
    mode: "cards",
    options: optionsFrom([
      { id: "ft-1", label: "FinTech and markets", value: "fintech and markets" },
      { id: "ft-2", label: "AI and data products", value: "ai and data products" },
      { id: "ft-3", label: "Design and user behavior", value: "design and user behavior" },
      { id: "ft-4", label: "Social impact and policy", value: "social impact and policy" },
      { id: "ft-5", label: "Health innovation", value: "health innovation" },
      { id: "ft-6", label: "Startup building", value: "startup building" },
    ]),
    multiSelect: true,
    minSelections: 1,
    maxSelections: 3,
    required: true,
  },
  "preferred-problem-types": {
    id: "preferred-problem-types",
    phaseId: "interests",
    prompt: "Which problem types are most energizing for you?",
    helper: "Select the kinds of challenges you enjoy solving.",
    mode: "pill-chips",
    options: optionsFrom([
      { id: "pp-1", label: "Optimization", value: "optimization" },
      { id: "pp-2", label: "Risk analysis", value: "risk analysis" },
      { id: "pp-3", label: "Strategy and decisions", value: "strategy" },
      { id: "pp-4", label: "User experience", value: "user experience" },
      { id: "pp-5", label: "Research and insights", value: "research" },
      { id: "pp-6", label: "Storytelling and communication", value: "storytelling" },
    ]),
    multiSelect: true,
    minSelections: 1,
    maxSelections: 3,
    required: false,
  },
  "people-data-ideas": {
    id: "people-data-ideas",
    phaseId: "interests",
    prompt: "When solving problems, where is your strongest orientation?",
    helper: "Pick one or two if you are naturally hybrid.",
    mode: "segmented",
    options: optionsFrom([
      { id: "pdi-1", label: "People", value: "people" },
      { id: "pdi-2", label: "Data", value: "data" },
      { id: "pdi-3", label: "Ideas", value: "ideas" },
      { id: "pdi-4", label: "Blend", value: "blend" },
    ]),
    multiSelect: true,
    minSelections: 1,
    maxSelections: 2,
    required: true,
  },
  extracurriculars: {
    id: "extracurriculars",
    phaseId: "interests",
    prompt: "Which extracurricular environments describe your current involvement?",
    helper: "These signals improve advisor confidence and role fit.",
    mode: "cards",
    options: optionsFrom([
      { id: "ec-1", label: "Business or finance club", value: "business club" },
      { id: "ec-2", label: "Robotics or coding club", value: "robotics club" },
      { id: "ec-3", label: "Design studio or media team", value: "design studio" },
      { id: "ec-4", label: "Debate or consulting case teams", value: "debate team" },
      { id: "ec-5", label: "NGO or volunteer leadership", value: "ngo volunteer" },
      { id: "ec-6", label: "Student government", value: "student government" },
      { id: "ec-7", label: "Research assistantship", value: "research assistant" },
      { id: "ec-8", label: "Sports team captaincy", value: "sports captain" },
    ]),
    multiSelect: true,
    minSelections: 1,
    maxSelections: 3,
    required: false,
  },
  "structure-vs-open": {
    id: "structure-vs-open",
    phaseId: "work-style",
    prompt: "Do you perform best in a structured or open-ended environment?",
    helper: "Choose the environment that feels most natural.",
    mode: "segmented",
    options: optionsFrom([
      { id: "so-1", label: "Structured", value: "structured" },
      { id: "so-2", label: "Balanced", value: "balanced" },
      { id: "so-3", label: "Open-ended", value: "open-ended" },
    ]),
    multiSelect: false,
    minSelections: 1,
    maxSelections: 1,
    required: true,
  },
  "solo-team-leadership": {
    id: "solo-team-leadership",
    phaseId: "work-style",
    prompt: "Which collaboration style feels most like you?",
    helper: "This sharpens leadership vs specialist trajectory recommendations.",
    mode: "cards",
    options: optionsFrom([
      { id: "stl-1", label: "I prefer solo deep work", value: "solo" },
      { id: "stl-2", label: "I thrive in team collaboration", value: "team" },
      { id: "stl-3", label: "I naturally lead teams", value: "leadership" },
    ]),
    multiSelect: false,
    minSelections: 1,
    maxSelections: 1,
    required: true,
  },
  "detail-vs-big-picture": {
    id: "detail-vs-big-picture",
    phaseId: "work-style",
    prompt: "Do you lean more detail-oriented or big-picture oriented?",
    helper: "Optional signal used for specialization depth.",
    mode: "segmented",
    options: optionsFrom([
      { id: "db-1", label: "Detail", value: "detail" },
      { id: "db-2", label: "Balanced", value: "balanced" },
      { id: "db-3", label: "Big-picture", value: "big-picture" },
    ]),
    multiSelect: false,
    minSelections: 1,
    maxSelections: 1,
    required: false,
  },
  "work-setting": {
    id: "work-setting",
    phaseId: "work-style",
    prompt: "What work environment do you prefer most?",
    helper: "This influences both major and role recommendations.",
    mode: "cards",
    options: optionsFrom([
      { id: "ws-1", label: "Desk / analysis-oriented", value: "desk" },
      { id: "ws-2", label: "Field / people-facing", value: "field" },
      { id: "ws-3", label: "Hybrid mix", value: "hybrid" },
    ]),
    multiSelect: false,
    minSelections: 1,
    maxSelections: 1,
    required: false,
  },
  "desired-career": {
    id: "desired-career",
    phaseId: "career-goals",
    prompt: "Which career direction feels closest to your 5-year target?",
    helper: "Pick the nearest direction, not a perfect final answer.",
    mode: "cards",
    options: optionsFrom([
      { id: "dc-1", label: "Finance and investment", value: "finance" },
      { id: "dc-2", label: "Data science and AI", value: "data-science" },
      { id: "dc-3", label: "Engineering systems", value: "engineering" },
      { id: "dc-4", label: "Product / UX design", value: "product-design" },
      { id: "dc-5", label: "Business management", value: "business-management" },
      { id: "dc-6", label: "Public policy", value: "public-policy" },
      { id: "dc-7", label: "Psychology and behavior", value: "psychology" },
      { id: "dc-8", label: "Still exploring", value: "exploring-options" },
    ]),
    multiSelect: false,
    minSelections: 1,
    maxSelections: 1,
    required: true,
  },
  "salary-impact-prestige": {
    id: "salary-impact-prestige",
    phaseId: "career-goals",
    prompt: "Which priority is strongest for your next 5-10 years?",
    helper: "There is no wrong answer. This calibrates recommendation strategy.",
    mode: "segmented",
    options: optionsFrom([
      { id: "sip-1", label: "Salary", value: "salary" },
      { id: "sip-2", label: "Impact", value: "impact" },
      { id: "sip-3", label: "Prestige", value: "prestige" },
      { id: "sip-4", label: "Balanced", value: "balanced" },
    ]),
    multiSelect: false,
    minSelections: 1,
    maxSelections: 1,
    required: true,
  },
  "org-path": {
    id: "org-path",
    phaseId: "career-goals",
    prompt: "What organization path feels most natural?",
    helper: "Optional but useful for role environment fit.",
    mode: "cards",
    options: optionsFrom([
      { id: "op-1", label: "Established company", value: "company" },
      { id: "op-2", label: "Startup team", value: "startup" },
      { id: "op-3", label: "Entrepreneurship", value: "entrepreneur" },
      { id: "op-4", label: "NGO / mission organization", value: "nonprofit" },
      { id: "op-5", label: "Undecided", value: "undecided" },
    ]),
    multiSelect: false,
    minSelections: 1,
    maxSelections: 1,
    required: false,
  },
  "balance-vs-growth": {
    id: "balance-vs-growth",
    phaseId: "career-goals",
    prompt: "Do you prioritize work-life balance or high growth intensity?",
    helper: "This influences the recommended program tempo and career path.",
    mode: "segmented",
    options: optionsFrom([
      { id: "bg-1", label: "Work-life balance", value: "work-life-balance" },
      { id: "bg-2", label: "Balanced", value: "balanced" },
      { id: "bg-3", label: "High growth", value: "high-growth" },
    ]),
    multiSelect: false,
    minSelections: 1,
    maxSelections: 1,
    required: false,
  },
  "us-states": {
    id: "us-states",
    phaseId: "constraints",
    prompt: "Which US states are most attractive for your study plan?",
    helper: "Pick up to four preferences. This demo is US-only.",
    mode: "pill-chips",
    options: optionsFrom([
      { id: "state-1", label: "California", value: "california" },
      { id: "state-2", label: "New York", value: "new york" },
      { id: "state-3", label: "Texas", value: "texas" },
      { id: "state-4", label: "Massachusetts", value: "massachusetts" },
      { id: "state-5", label: "Illinois", value: "illinois" },
      { id: "state-6", label: "Florida", value: "florida" },
      { id: "state-7", label: "Washington", value: "washington" },
      { id: "state-8", label: "North Carolina", value: "north carolina" },
      { id: "state-9", label: "Virginia", value: "virginia" },
      { id: "state-10", label: "Arizona", value: "arizona" },
      { id: "state-11", label: "Colorado", value: "colorado" },
      { id: "state-12", label: "Open across US", value: "usa-flexible" },
    ]),
    multiSelect: true,
    minSelections: 1,
    maxSelections: 4,
    required: true,
  },
  "tuition-budget": {
    id: "tuition-budget",
    phaseId: "constraints",
    prompt: "What yearly tuition range is realistic for your plan?",
    helper: "Choose the range closest to your intended annual tuition budget.",
    mode: "range-cards",
    options: optionsFrom([
      { id: "tb-1", label: "Under $20k", value: "under-20000" },
      { id: "tb-2", label: "$20k - $30k", value: "20000-30000" },
      { id: "tb-3", label: "$30k - $40k", value: "30000-40000" },
      { id: "tb-4", label: "$40k - $50k", value: "40000-50000" },
      { id: "tb-5", label: "Over $50k", value: "over-50000" },
    ]),
    multiSelect: false,
    minSelections: 1,
    maxSelections: 1,
    required: true,
  },
  "scholarship-need": {
    id: "scholarship-need",
    phaseId: "constraints",
    prompt: "How important is scholarship support for your plan?",
    helper: "This directly affects university ranking strategy.",
    mode: "segmented",
    options: optionsFrom([
      { id: "sn-1", label: "Not needed", value: "none" },
      { id: "sn-2", label: "Moderate need", value: "moderate" },
      { id: "sn-3", label: "High need", value: "high" },
    ]),
    multiSelect: false,
    minSelections: 1,
    maxSelections: 1,
    required: true,
  },
  "degree-duration": {
    id: "degree-duration",
    phaseId: "constraints",
    prompt: "Which degree duration do you prefer?",
    helper: "Optional but helpful for realistic planning.",
    mode: "cards",
    options: optionsFrom([
      { id: "dd-1", label: "1 year", value: "1-year" },
      { id: "dd-2", label: "2 years", value: "2-year" },
      { id: "dd-3", label: "3+ years", value: "3-plus-years" },
      { id: "dd-4", label: "Flexible", value: "flexible" },
    ]),
    multiSelect: false,
    minSelections: 1,
    maxSelections: 1,
    required: false,
  },
  "self-strengths": {
    id: "self-strengths",
    phaseId: "self-awareness",
    prompt: "Which strengths describe you most accurately?",
    helper: "Choose up to three strengths that are consistently true for you.",
    mode: "pill-chips",
    options: optionsFrom([
      { id: "ssr-1", label: "Analytical reasoning", value: "analytical reasoning" },
      { id: "ssr-2", label: "Leadership", value: "leadership" },
      { id: "ssr-3", label: "Creativity", value: "creativity" },
      { id: "ssr-4", label: "Communication", value: "communication" },
      { id: "ssr-5", label: "Empathy", value: "empathy" },
      { id: "ssr-6", label: "Execution discipline", value: "execution discipline" },
      { id: "ssr-7", label: "Research depth", value: "research depth" },
    ]),
    multiSelect: true,
    minSelections: 1,
    maxSelections: 3,
    required: true,
  },
  "help-request-theme": {
    id: "help-request-theme",
    phaseId: "self-awareness",
    prompt: "What do people most often ask your help for?",
    helper: "Optional signal for role identity.",
    mode: "cards",
    options: optionsFrom([
      { id: "hr-1", label: "Data-based decisions", value: "data-based decisions" },
      { id: "hr-2", label: "Planning and organization", value: "planning and organization" },
      { id: "hr-3", label: "Creative feedback", value: "creative feedback" },
      { id: "hr-4", label: "Team coordination", value: "team coordination" },
      { id: "hr-5", label: "Career and life advice", value: "career and life advice" },
      { id: "hr-6", label: "Technical troubleshooting", value: "technical troubleshooting" },
    ]),
    multiSelect: true,
    minSelections: 1,
    maxSelections: 2,
    required: false,
  },
  "core-values": {
    id: "core-values",
    phaseId: "self-awareness",
    prompt: "Which values must be present in your future path?",
    helper: "Pick two or three non-negotiable values.",
    mode: "pill-chips",
    options: optionsFrom([
      { id: "cv-1", label: "Impact", value: "impact" },
      { id: "cv-2", label: "Growth", value: "growth" },
      { id: "cv-3", label: "Stability", value: "stability" },
      { id: "cv-4", label: "Prestige", value: "prestige" },
      { id: "cv-5", label: "Freedom", value: "freedom" },
      { id: "cv-6", label: "Community", value: "community" },
      { id: "cv-7", label: "Curiosity", value: "curiosity" },
    ]),
    multiSelect: true,
    minSelections: 2,
    maxSelections: 3,
    required: true,
  },
  "regret-minimization": {
    id: "regret-minimization",
    phaseId: "self-awareness",
    prompt: "If you choose the wrong major, what would you regret most?",
    helper: "Select the closest option, then optionally add one sentence in your own words.",
    mode: "reflection",
    options: optionsFrom([
      { id: "rm-1", label: "Ignoring my strongest abilities", value: "ignoring strengths" },
      { id: "rm-2", label: "Choosing a path with weak financial return", value: "financial downside" },
      { id: "rm-3", label: "Choosing a path with low impact", value: "low impact" },
      { id: "rm-4", label: "Choosing a path with limited growth", value: "limited growth" },
    ]),
    multiSelect: false,
    minSelections: 1,
    maxSelections: 1,
    required: true,
    allowReflection: true,
    reflectionPlaceholder:
      "Optional reflection: In one sentence, what future would you want to avoid at all costs?",
  },
};

const QUESTION_BY_ID = QUESTION_BANK;

const PHASE_BY_ID = CONVERSATION_PHASES.reduce(
  (accumulator, phase) => {
    accumulator[phase.id] = phase;
    return accumulator;
  },
  {} as Record<ConversationPhaseId, ConversationPhaseMeta>,
);

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function normalizeToken(value: string): string {
  return value.trim().toLowerCase();
}

function titleCase(value: string): string {
  return value
    .split(" ")
    .filter(Boolean)
    .map((token) => token[0].toUpperCase() + token.slice(1))
    .join(" ");
}

function unique(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))];
}

function labelsFromSelection(question: ConversationQuestion, optionIds: string[]): string[] {
  const selected = optionIds
    .map((optionId) => question.options.find((option) => option.id === optionId))
    .filter((option): option is ConversationQuestion["options"][number] => option !== undefined);

  return selected.map((option) => option.label);
}

function valuesFromSelection(question: ConversationQuestion, optionIds: string[]): string[] {
  const selected = optionIds
    .map((optionId) => question.options.find((option) => option.id === optionId))
    .filter((option): option is ConversationQuestion["options"][number] => option !== undefined);

  return selected.map((option) => normalizeToken(option.value));
}

function firstAnswer(
  state: ConversationEngineState,
  questionId: ConversationQuestionId,
): string | null {
  return state.answersByQuestion[questionId]?.[0] ?? null;
}

function answerCount(state: ConversationEngineState, questionId: ConversationQuestionId): number {
  return state.answersByQuestion[questionId]?.length ?? 0;
}

function calculateTargetQuestionCount(state: ConversationEngineState): number {
  let target = 14;

  const gpaRange = firstAnswer(state, "gpa-range");
  if (gpaRange === "below-2-8" || gpaRange === "3-6-to-4-0") {
    target += 1;
  }

  if (answerCount(state, "strongest-subjects") >= 3) {
    target += 1;
  }

  if (answerCount(state, "people-data-ideas") >= 2) {
    target += 1;
  }

  const career = firstAnswer(state, "desired-career");
  if (career === "exploring-options") {
    target += 2;
  } else if (career === "public-policy" || career === "psychology") {
    target += 1;
  }

  const scholarshipNeed = firstAnswer(state, "scholarship-need");
  if (scholarshipNeed === "high") {
    target += 2;
  } else if (scholarshipNeed === "moderate") {
    target += 1;
  }

  const tuitionBand = firstAnswer(state, "tuition-budget");
  if (tuitionBand === "under-20000" || tuitionBand === "over-50000") {
    target += 1;
  }

  if (answerCount(state, "core-values") >= 3) {
    target += 1;
  }

  const reflectionLength = (state.reflectionByQuestion["regret-minimization"] ?? "").trim().length;
  if (reflectionLength >= 90) {
    target += 1;
  }

  return clamp(target, 14, 24);
}

function remainingRequiredCountAfter(
  state: ConversationEngineState,
  questionId: ConversationQuestionId,
): number {
  const index = QUESTION_ORDER.indexOf(questionId);
  if (index < 0) {
    return 0;
  }

  const remainingIds = QUESTION_ORDER.slice(index + 1);
  return remainingIds.filter((id) => {
    const question = QUESTION_BY_ID[id];
    return question.required && !state.askedQuestionIds.includes(id);
  }).length;
}

function shouldAskQuestion(state: ConversationEngineState, question: ConversationQuestion): boolean {
  if (state.askedQuestionIds.includes(question.id)) {
    return false;
  }

  if (question.required) {
    return true;
  }

  if (question.id === "advanced-courses") {
    const gpaRange = firstAnswer(state, "gpa-range");
    if (gpaRange === "below-2-8") {
      return false;
    }
  }

  const remainingRequired = remainingRequiredCountAfter(state, question.id);
  const askedWithRequiredOnly = state.askedQuestionIds.length + remainingRequired;

  return askedWithRequiredOnly < state.targetQuestionCount;
}

function inferPhaseId(state: ConversationEngineState): ConversationPhaseId | null {
  if (state.currentPhaseId) {
    return state.currentPhaseId;
  }

  const lastAsked = state.askedQuestionIds[state.askedQuestionIds.length - 1];
  if (!lastAsked) {
    return null;
  }

  return QUESTION_BY_ID[lastAsked].phaseId;
}

function inferBranchTag(
  answersByQuestion: ConversationEngineState["answersByQuestion"],
): ConversationBranchTag {
  const pdi = answersByQuestion["people-data-ideas"] ?? [];
  const career = answersByQuestion["desired-career"]?.[0] ?? "";
  const priority = answersByQuestion["salary-impact-prestige"]?.[0] ?? "";
  const orgPath = answersByQuestion["org-path"]?.[0] ?? "";

  if (priority === "impact" || orgPath === "nonprofit" || career === "public-policy") {
    return "impact";
  }

  if (career === "finance" || career === "business-management") {
    return "business";
  }

  if (career === "data-science" || career === "engineering" || pdi.includes("data")) {
    return "quant";
  }

  if (career === "product-design" || pdi.includes("ideas")) {
    return "creative";
  }

  return "balanced";
}

function mapCareerSignals(
  selectedCareer: string,
): {
  intendedMajors: string[];
  preferredDomains: OrientationAnswers["preferredDomains"];
  careerVision: string;
} {
  if (selectedCareer === "finance") {
    return {
      intendedMajors: ["Finance", "Business Analytics", "Data Science"],
      preferredDomains: ["business", "technology"],
      careerVision: "I plan to build a career in finance strategy and investment analysis.",
    };
  }

  if (selectedCareer === "data-science") {
    return {
      intendedMajors: ["Data Science", "Business Analytics", "Computer Science"],
      preferredDomains: ["technology", "engineering"],
      careerVision: "I plan to build a career in data science and AI-driven decision systems.",
    };
  }

  if (selectedCareer === "engineering") {
    return {
      intendedMajors: ["Industrial Engineering", "Computer Science", "Data Science"],
      preferredDomains: ["engineering", "technology"],
      careerVision: "I plan to build a career in engineering systems and optimization.",
    };
  }

  if (selectedCareer === "product-design") {
    return {
      intendedMajors: ["UX Design", "Business Analytics", "Psychology"],
      preferredDomains: ["creativity", "technology"],
      careerVision: "I plan to build a career in product and user experience design.",
    };
  }

  if (selectedCareer === "business-management") {
    return {
      intendedMajors: ["Business Analytics", "Finance", "Industrial Engineering"],
      preferredDomains: ["business", "technology"],
      careerVision: "I plan to build a career in business management and strategic operations.",
    };
  }

  if (selectedCareer === "public-policy") {
    return {
      intendedMajors: ["Public Policy", "Public Health", "Psychology"],
      preferredDomains: ["social-sciences", "law"],
      careerVision: "I plan to build a career in public policy and social impact strategy.",
    };
  }

  if (selectedCareer === "psychology") {
    return {
      intendedMajors: ["Psychology", "Public Health", "UX Design"],
      preferredDomains: ["health", "social-sciences"],
      careerVision: "I plan to build a career focused on psychology, behavior, and human outcomes.",
    };
  }

  return {
    intendedMajors: ["Business Analytics", "Finance", "Data Science"],
    preferredDomains: ["business", "technology"],
    careerVision: "I am still exploring and want a major that balances strong opportunity with fit.",
  };
}

function mapDomainsFromSignals(signals: string[]): OrientationAnswers["preferredDomains"] {
  const normalized = signals.map(normalizeToken);
  const domains = new Set<OrientationAnswers["preferredDomains"][number]>();

  normalized.forEach((signal) => {
    if (signal.includes("finance") || signal.includes("business") || signal.includes("market")) {
      domains.add("business");
    }
    if (
      signal.includes("data") ||
      signal.includes("ai") ||
      signal.includes("tech") ||
      signal.includes("computer")
    ) {
      domains.add("technology");
    }
    if (signal.includes("health") || signal.includes("psychology")) {
      domains.add("health");
    }
    if (
      signal.includes("design") ||
      signal.includes("creative") ||
      signal.includes("media") ||
      signal.includes("story")
    ) {
      domains.add("creativity");
    }
    if (signal.includes("policy") || signal.includes("law")) {
      domains.add("law");
    }
    if (signal.includes("engineering") || signal.includes("systems")) {
      domains.add("engineering");
    }
    if (
      signal.includes("social") ||
      signal.includes("community") ||
      signal.includes("ngo") ||
      signal.includes("impact")
    ) {
      domains.add("social-sciences");
    }
  });

  if (domains.size === 0) {
    domains.add("business");
    domains.add("technology");
  }

  return [...domains];
}

function mapBudgetBand(value: string): {
  tuition: number;
  living: number;
  bank: number;
} {
  if (value === "under-20000") {
    return { tuition: 18000, living: 1200, bank: 23500 };
  }
  if (value === "20000-30000") {
    return { tuition: 26000, living: 1500, bank: 33000 };
  }
  if (value === "30000-40000") {
    return { tuition: 34000, living: 1800, bank: 43000 };
  }
  if (value === "40000-50000") {
    return { tuition: 45000, living: 2200, bank: 56000 };
  }
  return { tuition: 56000, living: 2600, bank: 70000 };
}

function mapGpaToEnglishScore(gpaRange: OrientationAnswers["gpaRange"]): number {
  if (gpaRange === "below-2-8") {
    return 84;
  }
  if (gpaRange === "2-8-to-3-2") {
    return 90;
  }
  if (gpaRange === "3-2-to-3-6") {
    return 96;
  }
  return 103;
}

function buildStudentSummary(
  selectedLabels: string[],
  reflectionText: string,
): string {
  const base = selectedLabels.join(", ");
  if (!reflectionText.trim()) {
    return base;
  }

  return `${base}. ${reflectionText.trim()}`;
}

function nextQuestionInternal(state: ConversationEngineState): ConversationQuestion | null {
  for (const questionId of QUESTION_ORDER) {
    const candidate = QUESTION_BY_ID[questionId];
    if (shouldAskQuestion(state, candidate)) {
      return candidate;
    }
  }

  return null;
}

export function createInitialConversationState(): ConversationEngineState {
  return {
    branchTag: null,
    targetQuestionCount: 18,
    currentPhaseId: null,
    askedQuestionIds: [],
    skippedQuestionIds: [],
    answersByQuestion: {},
    reflectionByQuestion: {},
    slots: { ...DEFAULT_SLOTS },
  };
}

export function getNextConversationQuestion(
  state: ConversationEngineState,
): ConversationQuestion | null {
  return nextQuestionInternal(state);
}

export function getQuestionById(questionId: ConversationQuestionId): ConversationQuestion {
  return QUESTION_BY_ID[questionId];
}

export function getPhaseMeta(phaseId: ConversationPhaseId): ConversationPhaseMeta {
  return PHASE_BY_ID[phaseId];
}

export function getConversationProgress(state: ConversationEngineState): ConversationProgress {
  const askedCount = state.askedQuestionIds.length;
  const targetCount = Math.max(14, state.targetQuestionCount);
  const percent = clamp(Math.round((askedCount / Math.max(targetCount, 1)) * 100), 0, 100);

  const currentPhaseId = inferPhaseId(state);
  const currentPhaseIndex = currentPhaseId
    ? CONVERSATION_PHASES.findIndex((phase) => phase.id === currentPhaseId)
    : 0;

  return {
    askedCount,
    targetCount,
    percent,
    currentPhaseId,
    currentPhaseIndex: currentPhaseIndex < 0 ? 0 : currentPhaseIndex,
    totalPhases: CONVERSATION_PHASES.length,
  };
}

export function submitConversationAnswer(
  state: ConversationEngineState,
  questionId: ConversationQuestionId,
  payload: ConversationAnswerPayload,
): ConversationTurnResult {
  const question = QUESTION_BY_ID[questionId];
  const selectedOptionIds = unique(payload.selectedOptionIds);
  const selectedLabels = labelsFromSelection(question, selectedOptionIds);
  const selectedValues = valuesFromSelection(question, selectedOptionIds);

  const safeValues = selectedValues.length > 0 ? selectedValues : [question.options[0].value];
  const safeLabels = selectedLabels.length > 0 ? selectedLabels : [question.options[0].label];

  const reflectionText = (payload.reflectionText ?? "").trim();

  const askedQuestionIds = state.askedQuestionIds.includes(questionId)
    ? state.askedQuestionIds
    : [...state.askedQuestionIds, questionId];

  const answersByQuestion: ConversationEngineState["answersByQuestion"] = {
    ...state.answersByQuestion,
    [questionId]: safeValues,
  };

  const reflectionByQuestion: ConversationEngineState["reflectionByQuestion"] =
    question.allowReflection && reflectionText
      ? {
          ...state.reflectionByQuestion,
          [questionId]: reflectionText,
        }
      : state.reflectionByQuestion;

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

  if (questionId === "gpa-range") {
    const gpaRange = safeValues[0] as OrientationAnswers["gpaRange"];
    slots.gpaRange = gpaRange;
    answerPatch.gpaRange = gpaRange;
    answerPatch.englishScore = mapGpaToEnglishScore(gpaRange);
  }

  if (questionId === "strongest-subjects") {
    slots.strongestSubjects = safeValues;
    answerPatch.strongestSubjects = safeValues;

    const hasQuant = safeValues.some((value) =>
      ["math", "statistics", "computer science", "physics", "economics"].includes(value),
    );

    answerPatch.enjoysQuantitativeProblemSolving = hasQuant ? 5 : 3;
  }

  if (questionId === "weakest-subjects") {
    slots.weakestSubjects = safeValues;
    answerPatch.dislikedSubjects = safeValues;
  }

  if (questionId === "advanced-courses") {
    answerPatch.advancedCourseExposure = safeValues;
    answerPatch.researchComfortLevel = safeValues.includes("research methods") ? 4 : 3;
  }

  if (questionId === "free-time-topics") {
    answerPatch.freeTimeTopics = safeValues;
    answerPatch.curiosityTopics = safeValues;
    answerPatch.preferredDomains = mapDomainsFromSignals(safeValues);
  }

  if (questionId === "preferred-problem-types") {
    answerPatch.favoriteProblemTypes = safeValues;
  }

  if (questionId === "people-data-ideas") {
    const primary = safeValues.includes("blend")
      ? "blend"
      : (safeValues[0] as OrientationAnswers["peopleDataIdeasPreference"]);

    answerPatch.peopleDataIdeasPreference = primary;

    if (primary === "data") {
      answerPatch.thinkingStyle = "analytical";
      answerPatch.teamworkStyle = "solo";
    } else if (primary === "ideas") {
      answerPatch.thinkingStyle = "creative";
      answerPatch.teamworkStyle = "balanced";
    } else if (primary === "people") {
      answerPatch.thinkingStyle = "balanced";
      answerPatch.teamworkStyle = "team";
    } else {
      answerPatch.thinkingStyle = "balanced";
      answerPatch.teamworkStyle = "balanced";
    }
  }

  if (questionId === "extracurriculars") {
    answerPatch.extracurricularProfiles = safeValues;
    const hasLeadershipSignal = safeValues.some((value) =>
      ["student government", "sports captain", "ngo volunteer", "business club"].includes(value),
    );
    if (hasLeadershipSignal) {
      answerPatch.leadershipVsSpecialist = "leadership";
    }
  }

  if (questionId === "structure-vs-open") {
    const preference = safeValues[0] as OrientationAnswers["workStructurePreference"];
    answerPatch.workStructurePreference = preference;

    if (preference === "structured") {
      answerPatch.practicalVsTheoryPreference = "practical";
    } else if (preference === "open-ended") {
      answerPatch.practicalVsTheoryPreference = "theory";
    } else {
      answerPatch.practicalVsTheoryPreference = "balanced";
    }
  }

  if (questionId === "solo-team-leadership") {
    const style = safeValues[0];

    if (style === "solo") {
      answerPatch.teamworkStyle = "solo";
      answerPatch.leadershipVsSpecialist = "technical-specialist";
    } else if (style === "team") {
      answerPatch.teamworkStyle = "team";
      answerPatch.leadershipVsSpecialist = "balanced";
    } else {
      answerPatch.teamworkStyle = "team";
      answerPatch.leadershipVsSpecialist = "leadership";
    }
  }

  if (questionId === "detail-vs-big-picture") {
    answerPatch.detailVsBigPicturePreference =
      safeValues[0] as OrientationAnswers["detailVsBigPicturePreference"];
  }

  if (questionId === "work-setting") {
    const setting = safeValues[0] as OrientationAnswers["workEnvironmentPreference"];
    answerPatch.workEnvironmentPreference = setting;
    answerPatch.remoteVsOnsite = setting === "hybrid" ? "hybrid" : "on-site";
  }

  if (questionId === "desired-career") {
    const selectedCareer = safeValues[0];
    const mapped = mapCareerSignals(selectedCareer);

    slots.desiredCareerTrack = selectedCareer;
    answerPatch.desiredCareerTrack = selectedCareer;
    answerPatch.fiveYearCareerVision = mapped.careerVision;
    answerPatch.preferredDomains = mapped.preferredDomains;
    profilePatch.intendedMajors = mapped.intendedMajors;
  }

  if (questionId === "salary-impact-prestige") {
    const decisionPriority = safeValues[0] as OrientationAnswers["decisionPriority"];
    slots.decisionPriority = decisionPriority;
    answerPatch.decisionPriority = decisionPriority;

    if (decisionPriority === "salary") {
      answerPatch.salaryVsPassion = "salary-first";
    } else if (decisionPriority === "impact") {
      answerPatch.salaryVsPassion = "passion-first";
    } else {
      answerPatch.salaryVsPassion = "balanced";
    }
  }

  if (questionId === "org-path") {
    const organizationPreference = safeValues[0] as OrientationAnswers["organizationPreference"];
    answerPatch.organizationPreference = organizationPreference;

    if (organizationPreference === "company") {
      answerPatch.corporateVsEntrepreneurship = "corporate";
    } else if (
      organizationPreference === "startup" ||
      organizationPreference === "entrepreneur"
    ) {
      answerPatch.corporateVsEntrepreneurship = "entrepreneurship";
    } else {
      answerPatch.corporateVsEntrepreneurship = "balanced";
    }
  }

  if (questionId === "balance-vs-growth") {
    const growthPreference = safeValues[0] as OrientationAnswers["growthVsBalancePreference"];
    answerPatch.growthVsBalancePreference = growthPreference;
  }

  if (questionId === "us-states") {
    const states = safeValues
      .filter((value) => value !== "usa-flexible")
      .map(titleCase)
      .slice(0, 4);

    slots.preferredUsStates = states;
    answerPatch.preferredUsStates = states;
    profilePatch.preferredDestinations =
      states.length > 0 ? ["United States", ...states] : ["United States"];
  }

  if (questionId === "tuition-budget") {
    const mapping = mapBudgetBand(safeValues[0]);
    answerPatch.maxAnnualTuitionBudgetUsd = mapping.tuition;
    answerPatch.maxMonthlyLivingBudgetUsd = mapping.living;
    answerPatch.bankStatementCapacityUsd = mapping.bank;
  }

  if (questionId === "scholarship-need") {
    const scholarshipNeed = safeValues[0] as OrientationAnswers["scholarshipNeed"];
    slots.scholarshipNeed = scholarshipNeed;
    answerPatch.scholarshipNeed = scholarshipNeed;
  }

  if (questionId === "degree-duration") {
    answerPatch.degreeDurationPreference =
      safeValues[0] as OrientationAnswers["degreeDurationPreference"];
  }

  if (questionId === "self-strengths") {
    answerPatch.selfPerceivedStrengths = safeValues;

    if (safeValues.includes("leadership")) {
      answerPatch.leadershipVsSpecialist = "leadership";
    }

    if (safeValues.includes("creativity") && !safeValues.includes("analytical reasoning")) {
      answerPatch.thinkingStyle = "creative";
    }

    if (safeValues.includes("analytical reasoning")) {
      answerPatch.thinkingStyle = "analytical";
    }
  }

  if (questionId === "help-request-theme") {
    answerPatch.helpRequestThemes = safeValues;
  }

  if (questionId === "core-values") {
    slots.coreValues = safeValues;
    answerPatch.coreValues = safeValues;
  }

  if (questionId === "regret-minimization") {
    const fallback = `I would regret ${safeValues[0] ?? "choosing a low-fit path"}.`;
    answerPatch.regretPromptReflection = reflectionText || fallback;
  }

  const mergedSignals = unique([
    ...(answersByQuestion["free-time-topics"] ?? []),
    ...(answersByQuestion["preferred-problem-types"] ?? []),
    ...(answersByQuestion["desired-career"] ?? []),
    ...(answersByQuestion["core-values"] ?? []),
  ]);

  if (!answerPatch.preferredDomains) {
    answerPatch.preferredDomains = mapDomainsFromSignals(mergedSignals);
  }

  const branchTag = inferBranchTag(answersByQuestion);

  const draftNextState: ConversationEngineState = {
    ...state,
    branchTag,
    askedQuestionIds,
    answersByQuestion,
    reflectionByQuestion,
    slots,
  };

  draftNextState.targetQuestionCount = calculateTargetQuestionCount(draftNextState);

  const nextQuestion = nextQuestionInternal(draftNextState);
  const previousPhaseId = state.currentPhaseId;
  const nextPhaseId = nextQuestion?.phaseId ?? previousPhaseId;

  const nextState: ConversationEngineState = {
    ...draftNextState,
    currentPhaseId: nextPhaseId ?? null,
  };

  const phaseMilestone =
    nextQuestion &&
    previousPhaseId !== null &&
    nextQuestion.phaseId !== previousPhaseId
      ? PHASE_BY_ID[nextQuestion.phaseId].milestoneCopy
      : null;

  return {
    nextState,
    answerPatch,
    profilePatch,
    nextQuestion,
    studentSummary: buildStudentSummary(safeLabels, reflectionText),
    phaseMilestone,
    isComplete: nextQuestion === null,
  };
}
