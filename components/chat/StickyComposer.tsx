"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";

interface StickyComposerProps {
  disabled: boolean;
  placeholder: string;
  helper: string;
  onSubmit: (value: string) => Promise<void>;
}

export function StickyComposer({
  disabled,
  placeholder,
  helper,
  onSubmit,
}: StickyComposerProps) {
  const [value, setValue] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!value.trim() || disabled) {
      return;
    }

    const current = value;
    setValue("");
    await onSubmit(current);
  };

  return (
    <form
      onSubmit={(event) => {
        void handleSubmit(event);
      }}
      className="sticky bottom-0 z-20 rounded-3xl border border-[var(--demo-border)] bg-[var(--demo-card)]/95 p-3 shadow-[0_22px_46px_rgba(16,22,38,0.24)] backdrop-blur"
    >
      <label className="sr-only" htmlFor="advisor-chat-input">
        Reply to advisor
      </label>
      <div className="flex items-end gap-3">
        <textarea
          id="advisor-chat-input"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          rows={2}
          placeholder={placeholder}
          className="min-h-16 w-full resize-none rounded-2xl border border-[var(--demo-border)] bg-[var(--demo-surface)] px-3 py-2 text-sm text-[var(--demo-text)] outline-none transition placeholder:text-[var(--demo-muted)] focus:border-[var(--demo-accent)]"
          disabled={disabled}
        />
        <Button type="submit" disabled={disabled || value.trim().length === 0}>
          Send
        </Button>
      </div>
      <p className="mt-2 px-1 text-xs text-[var(--demo-muted)]">{helper}</p>
    </form>
  );
}
