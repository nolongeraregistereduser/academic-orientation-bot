"use client";

import { useEffect } from "react";
import { OrientationHero } from "@/components/orientation/OrientationHero";
import { OrientationTrustStrip } from "@/components/orientation/OrientationTrustStrip";
import { OrientationValueProps } from "@/components/orientation/OrientationValueProps";
import { trackFunnelEvent } from "@/lib/analytics/funnelTracker";

export default function OrientationLandingPage() {
  useEffect(() => {
    trackFunnelEvent("orientation_landing_viewed", {
      source: "demo",
    });
  }, []);

  return (
    <main className="space-y-6 md:space-y-8">
      <OrientationHero />
      <OrientationTrustStrip />
      <OrientationValueProps />
    </main>
  );
}
