export interface MajorTaxonomyNode {
  id: string;
  name: string;
  category: string;
  subjectSignals: string[];
  dislikedSignals: string[];
  domainSignals: string[];
  problemSignals: string[];
  careerSignals: string[];
  annualTuitionBandUsd: [number, number];
  personalitySignals: {
    analytical: number;
    creative: number;
    teamwork: number;
    research: number;
    practical: number;
  };
}

export const mockMajorTaxonomy: MajorTaxonomyNode[] = [
  {
    id: "finance",
    name: "Finance",
    category: "business",
    subjectSignals: ["math", "statistics", "economics", "accounting"],
    dislikedSignals: ["biology"],
    domainSignals: ["business", "technology"],
    problemSignals: ["risk", "investment", "market", "strategy"],
    careerSignals: ["investment", "fintech", "analyst", "banking"],
    annualTuitionBandUsd: [22000, 46000],
    personalitySignals: {
      analytical: 5,
      creative: 2,
      teamwork: 3,
      research: 3,
      practical: 4,
    },
  },
  {
    id: "business-analytics",
    name: "Business Analytics",
    category: "business-tech",
    subjectSignals: ["math", "statistics", "economics", "computer science"],
    dislikedSignals: ["chemistry"],
    domainSignals: ["business", "technology"],
    problemSignals: ["optimization", "data", "strategy", "forecasting"],
    careerSignals: ["analyst", "product", "consulting", "operations"],
    annualTuitionBandUsd: [20000, 42000],
    personalitySignals: {
      analytical: 5,
      creative: 3,
      teamwork: 4,
      research: 3,
      practical: 4,
    },
  },
  {
    id: "data-science",
    name: "Data Science",
    category: "technology",
    subjectSignals: ["math", "statistics", "computer science"],
    dislikedSignals: ["literature"],
    domainSignals: ["technology", "engineering"],
    problemSignals: ["prediction", "modeling", "automation", "data"],
    careerSignals: ["machine learning", "data", "ai", "engineering"],
    annualTuitionBandUsd: [24000, 52000],
    personalitySignals: {
      analytical: 5,
      creative: 3,
      teamwork: 3,
      research: 4,
      practical: 3,
    },
  },
  {
    id: "computer-science",
    name: "Computer Science",
    category: "technology",
    subjectSignals: ["math", "computer science", "physics"],
    dislikedSignals: ["history"],
    domainSignals: ["technology", "engineering"],
    problemSignals: ["systems", "algorithms", "building", "automation"],
    careerSignals: ["software", "platform", "engineering", "security"],
    annualTuitionBandUsd: [24000, 54000],
    personalitySignals: {
      analytical: 5,
      creative: 3,
      teamwork: 3,
      research: 4,
      practical: 3,
    },
  },
  {
    id: "industrial-engineering",
    name: "Industrial Engineering",
    category: "engineering",
    subjectSignals: ["math", "physics", "statistics", "economics"],
    dislikedSignals: ["literature"],
    domainSignals: ["engineering", "technology", "business"],
    problemSignals: ["optimization", "systems", "efficiency", "operations"],
    careerSignals: ["operations", "supply chain", "process", "manufacturing"],
    annualTuitionBandUsd: [22000, 50000],
    personalitySignals: {
      analytical: 4,
      creative: 2,
      teamwork: 4,
      research: 3,
      practical: 5,
    },
  },
  {
    id: "public-health",
    name: "Public Health",
    category: "health",
    subjectSignals: ["biology", "statistics", "chemistry"],
    dislikedSignals: ["accounting"],
    domainSignals: ["health", "social-sciences"],
    problemSignals: ["policy", "community", "health systems", "prevention"],
    careerSignals: ["epidemiology", "policy", "ngo", "healthcare"],
    annualTuitionBandUsd: [19000, 43000],
    personalitySignals: {
      analytical: 3,
      creative: 2,
      teamwork: 4,
      research: 4,
      practical: 4,
    },
  },
  {
    id: "ux-design",
    name: "UX Design",
    category: "creativity-tech",
    subjectSignals: ["computer science", "art", "psychology"],
    dislikedSignals: ["chemistry"],
    domainSignals: ["creativity", "technology"],
    problemSignals: ["user experience", "interfaces", "journeys", "research"],
    careerSignals: ["product", "design", "research", "experience"],
    annualTuitionBandUsd: [21000, 45000],
    personalitySignals: {
      analytical: 3,
      creative: 5,
      teamwork: 4,
      research: 4,
      practical: 3,
    },
  },
];
