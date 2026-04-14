import type { OrientationEventName } from "@/types/analytics";
import { trackOrientationEvent } from "@/lib/analytics/events";

export function trackFunnelEvent(
  name: OrientationEventName,
  payload?: Record<string, string | number | boolean>,
): void {
  trackOrientationEvent({
    name,
    payload,
    timestampIso: new Date().toISOString(),
  });
}
