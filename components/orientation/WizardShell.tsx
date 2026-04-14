"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { WizardProgressBar } from "@/components/orientation/WizardProgressBar";

interface WizardShellProps {
  title: string;
  subtitle: string;
  progressPercent: number;
  currentStepLabel: string;
  onBack: () => void;
  onContinue: () => void;
  canContinue: boolean;
  isFirstStep: boolean;
  isFinalStep: boolean;
  children: ReactNode;
}

export function WizardShell({
  title,
  subtitle,
  progressPercent,
  currentStepLabel,
  onBack,
  onContinue,
  canContinue,
  isFirstStep,
  isFinalStep,
  children,
}: WizardShellProps) {
  return (
    <div className="space-y-6">
      <WizardProgressBar
        progressPercent={progressPercent}
        currentStepLabel={currentStepLabel}
      />
      <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_20px_42px_rgba(0,0,0,0.08)] md:p-8">
        <h1 className="text-2xl font-black text-[var(--brand-ink)] md:text-3xl">{title}</h1>
        <p className="mt-2 text-sm text-black/70">{subtitle}</p>
        <div className="mt-6">{children}</div>
      </div>
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} disabled={isFirstStep}>
          Back
        </Button>
        <Button onClick={onContinue} disabled={!canContinue}>
          {isFinalStep ? "Generate My Orientation" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
