export const salaryAndCareerOutcomes: Record<
  string,
  { medianSalaryUsd: number; roles: string[]; outlook: string }
> = {
  finance: {
    medianSalaryUsd: 98000,
    roles: ["Financial Analyst", "Investment Analyst", "FinTech Associate"],
    outlook: "Strong demand in digital banking, risk, and financial strategy teams.",
  },
  "business-analytics": {
    medianSalaryUsd: 102000,
    roles: ["Business Analyst", "Analytics Consultant", "Product Analyst"],
    outlook: "Growing demand for data-backed decision makers across all industries.",
  },
  "data-science": {
    medianSalaryUsd: 118000,
    roles: ["Data Scientist", "ML Analyst", "Decision Science Lead"],
    outlook: "Very high demand with STEM-advantaged pathways and strong salary growth.",
  },
  "computer-science": {
    medianSalaryUsd: 122000,
    roles: ["Software Engineer", "Platform Engineer", "Security Engineer"],
    outlook: "Consistent demand across software, cloud, and AI-adjacent disciplines.",
  },
  "industrial-engineering": {
    medianSalaryUsd: 94000,
    roles: ["Operations Engineer", "Supply Chain Analyst", "Process Engineer"],
    outlook: "Solid demand in logistics, manufacturing, and process optimization.",
  },
  "public-health": {
    medianSalaryUsd: 83000,
    roles: ["Public Health Analyst", "Program Coordinator", "Epidemiology Associate"],
    outlook: "Stable demand in policy, nonprofit, and public health operations roles.",
  },
  "ux-design": {
    medianSalaryUsd: 96000,
    roles: ["UX Designer", "Product Designer", "UX Researcher"],
    outlook: "Strong demand in digital product teams focused on user-centric growth.",
  },
  "public-policy": {
    medianSalaryUsd: 88000,
    roles: ["Policy Analyst", "Government Affairs Associate", "Impact Strategy Consultant"],
    outlook: "Growing demand in civic-tech, international development, and social impact strategy.",
  },
  psychology: {
    medianSalaryUsd: 87000,
    roles: ["Behavioral Analyst", "People Operations Specialist", "UX Researcher"],
    outlook: "Strong growth in behavioral science, people analytics, and human-centered product teams.",
  },
};
