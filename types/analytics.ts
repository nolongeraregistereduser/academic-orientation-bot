export type OrientationEventName =
  | "orientation_landing_viewed"
  | "orientation_started"
  | "chat_started"
  | "question_asked"
  | "answer_submitted"
  | "branch_selected"
  | "chat_completed"
  | "wizard_step_completed"
  | "orientation_submitted"
  | "analysis_completed"
  | "results_viewed"
  | "demo_results_viewed"
  | "demo_explorer_cta_clicked"
  | "explorer_cta_clicked";

export interface OrientationEvent {
  name: OrientationEventName;
  timestampIso: string;
  payload?: Record<string, string | number | boolean>;
}
