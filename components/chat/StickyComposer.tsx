"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { ConversationAnswerPayload, ConversationQuestion } from "@/types/orientation-chat";
import { Button } from "@/components/ui/Button";

interface StickyComposerProps {
  disabled: boolean;
  question: ConversationQuestion | null;
  onSubmit: (payload: ConversationAnswerPayload) => Promise<void>;
}

function optionContainerClass(mode: ConversationQuestion["mode"]): string {
  if (mode === "pill-chips") {
    return "flex flex-wrap gap-2";
  }

  if (mode === "segmented") {
    return "grid grid-cols-2 gap-2 sm:grid-cols-4";
  }

  if (mode === "range-cards") {
    return "grid gap-2 sm:grid-cols-2";
  }

  return "grid gap-2 sm:grid-cols-2";
}

function optionClass(mode: ConversationQuestion["mode"], isSelected: boolean): string {
  const shared =
    "group rounded-2xl border text-left transition duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--demo-accent)] disabled:cursor-not-allowed disabled:opacity-55";

  const selectedStyle = isSelected
    ? "border-[var(--demo-accent)] bg-[var(--demo-accent)]/12 text-[var(--demo-text)] shadow-[0_10px_26px_rgba(37,95,196,0.22)]"
    : "border-[var(--demo-border)] bg-[var(--demo-card)] text-[var(--demo-text)] hover:-translate-y-0.5 hover:border-[var(--demo-accent)]/60";

  if (mode === "pill-chips") {
    return `${shared} rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] ${selectedStyle}`;
  }

  if (mode === "segmented") {
    return `${shared} px-3 py-3 text-sm font-semibold ${selectedStyle}`;
  }

  if (mode === "range-cards") {
    return `${shared} px-4 py-4 text-sm ${selectedStyle}`;
  }

  return `${shared} px-4 py-4 text-sm ${selectedStyle}`;
}

interface ActiveComposerProps {
  disabled: boolean;
  question: ConversationQuestion;
  onSubmit: (payload: ConversationAnswerPayload) => Promise<void>;
}

function ActiveComposer({
  disabled,
  question,
  onSubmit,
}: ActiveComposerProps) {
  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([]);
  const [reflectionText, setReflectionText] = useState("");


  const canSubmit = useMemo(() => {
    if (!question) {
      return false;
    }

    return selectedOptionIds.length >= question.minSelections;
  }, [question, selectedOptionIds.length]);

  const handleSubmit = async () => {
    if (!question || disabled || !canSubmit) {
      return;
    }

    await onSubmit({
      selectedOptionIds,
      reflectionText,
    });
  };

  const toggleOption = async (optionId: string) => {
    if (!question || disabled) {
      return;
    }

    if (question.multiSelect) {
      setSelectedOptionIds((previous) => {
        if (previous.includes(optionId)) {
          return previous.filter((candidate) => candidate !== optionId);
        }

        if (previous.length >= question.maxSelections) {
          return previous;
        }

        return [...previous, optionId];
      });
      return;
    }

    setSelectedOptionIds([optionId]);

    if (!question.allowReflection) {
      await onSubmit({
        selectedOptionIds: [optionId],
      });
    }
  };

  return (
    <section className="sticky bottom-0 z-20 rounded-3xl border border-[var(--demo-border)] bg-[var(--demo-card)]/95 p-3 shadow-[0_22px_46px_rgba(16,22,38,0.24)] backdrop-blur">
      {!question ? (
        <p className="px-1 text-xs text-[var(--demo-muted)]">
          Waiting for the advisor to prepare your next step.
        </p>
      ) : (
        <>
          <p className="px-1 text-xs font-semibold uppercase tracking-[0.11em] text-[var(--demo-muted)]">
            {question.helper}
          </p>

          <div className={`mt-3 ${optionContainerClass(question.mode)}`}>
            {question.options.map((option) => {
              const isSelected = selectedOptionIds.includes(option.id);

              return (
                <motion.button
                  key={option.id}
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  className={optionClass(question.mode, isSelected)}
                  aria-label={option.label}
                  aria-pressed={isSelected}
                  disabled={disabled}
                  onClick={() => {
                    void toggleOption(option.id);
                  }}
                >
                  <p className="font-semibold">{option.label}</p>
                  {option.description ? (
                    <p className="mt-1 text-xs text-[var(--demo-muted)]">{option.description}</p>
                  ) : null}
                </motion.button>
              );
            })}
          </div>

          {question.allowReflection ? (
            <div className="mt-3">
              <label className="sr-only" htmlFor="advisor-reflection-input">
                Optional reflection
              </label>
              <textarea
                id="advisor-reflection-input"
                rows={2}
                value={reflectionText}
                onChange={(event) => {
                  setReflectionText(event.target.value);
                }}
                placeholder={question.reflectionPlaceholder}
                className="min-h-16 w-full resize-none rounded-2xl border border-[var(--demo-border)] bg-[var(--demo-surface)] px-3 py-2 text-sm text-[var(--demo-text)] outline-none transition placeholder:text-[var(--demo-muted)] focus:border-[var(--demo-accent)]"
                disabled={disabled}
              />
            </div>
          ) : null}

          {question.multiSelect || question.allowReflection ? (
            <div className="mt-3 flex justify-end">
              <Button
                type="button"
                onClick={() => {
                  void handleSubmit();
                }}
                disabled={disabled || !canSubmit}
              >
                Continue
              </Button>
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}

export function StickyComposer({
  disabled,
  question,
  onSubmit,
}: StickyComposerProps) {
  if (!question) {
    return (
      <section className="sticky bottom-0 z-20 rounded-3xl border border-[var(--demo-border)] bg-[var(--demo-card)]/95 p-3 shadow-[0_22px_46px_rgba(16,22,38,0.24)] backdrop-blur">
        <p className="px-1 text-xs text-[var(--demo-muted)]">
          Waiting for the advisor to prepare your next step.
        </p>
      </section>
    );
  }

  return (
    <ActiveComposer
      key={question.id}
      disabled={disabled}
      question={question}
      onSubmit={onSubmit}
    />
  );
}
