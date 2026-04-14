export type OrientationEventName =
  | "orientation_landing_viewed"
  | "orientation_started"
  | "wizard_step_completed"
  | "orientation_submitted"
  | "analysis_completed"
  | "results_viewed"
  | "explorer_cta_clicked";

export interface OrientationEvent {
  name: OrientationEventName;
  timestampIso: string;
  payload?: Record<string, string | number | boolean>;
}
