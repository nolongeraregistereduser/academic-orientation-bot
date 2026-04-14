import type { ReactNode } from "react";
import { OrientationSessionProvider } from "@/hooks/useOrientationSession";

export default function OrientationLayout({ children }: { children: ReactNode }) {
  return (
    <OrientationSessionProvider>
      <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(160deg,#f7f9ff_0%,#fffef2_45%,#ecf8ff_100%)] px-4 py-6 md:px-8 md:py-10">
        <div className="mx-auto w-full max-w-6xl">{children}</div>
      </div>
    </OrientationSessionProvider>
  );
}
