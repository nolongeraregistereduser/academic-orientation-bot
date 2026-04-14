import type { OrientationEvent } from "@/types/analytics";

const EVENT_BUFFER_KEY = "orientation.events.v1";

export function trackOrientationEvent(event: OrientationEvent): void {
  if (typeof window === "undefined") {
    return;
  }

  const existingRaw = window.localStorage.getItem(EVENT_BUFFER_KEY);
  const existing: OrientationEvent[] = existingRaw ? JSON.parse(existingRaw) : [];
  existing.push(event);
  window.localStorage.setItem(EVENT_BUFFER_KEY, JSON.stringify(existing));
}

export function readTrackedEvents(): OrientationEvent[] {
  if (typeof window === "undefined") {
    return [];
  }

  const existingRaw = window.localStorage.getItem(EVENT_BUFFER_KEY);
  return existingRaw ? (JSON.parse(existingRaw) as OrientationEvent[]) : [];
}
