"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ChatShell } from "@/components/chat/ChatShell";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { PhaseProgressBar } from "@/components/chat/PhaseProgressBar";
import { ProcessingTimeline } from "@/components/chat/ProcessingTimeline";
import { StickyComposer } from "@/components/chat/StickyComposer";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { Button } from "@/components/ui/Button";
import { useConversationDemo } from "@/hooks/useConversationDemo";
import { ADVISOR_STARTER_CTA } from "@/lib/conversation-engine";
import { trackFunnelEvent } from "@/lib/analytics/funnelTracker";

export default function OrientationDemoPage() {
  const {
    messages,
    currentQuestion,
    progress,
    currentPhaseMeta,
    isStarted,
    isAdvisorTyping,
    isSubmitting,
    isProcessing,
    processingStages,
    processingIndex,
    flowError,
    canSend,
    startConversation,
    submitAnswer,
  } = useConversationDemo();

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isAdvisorTyping, isProcessing]);

  return (
    <ChatShell
      theme={theme}
      onToggleTheme={() => {
        setTheme((previous) => (previous === "light" ? "dark" : "light"));
      }}
      footer={
        isStarted ? (
          <StickyComposer
            disabled={!canSend || isSubmitting}
            question={currentQuestion}
            onSubmit={submitAnswer}
          />
        ) : (
          <section className="rounded-3xl border border-[var(--demo-border)] bg-[var(--demo-card)] p-4 shadow-[var(--demo-shadow-soft)]">
            <p className="text-sm text-[var(--demo-muted)]">
              I will guide you through a counselor-style conversation, then generate your premium
              US major and university recommendations.
            </p>
            <div className="mt-4">
              <Button
                size="lg"
                onClick={() => {
                  trackFunnelEvent("orientation_started", {
                    entryPoint: "orientation_demo",
                  });
                  startConversation();
                }}
              >
                {ADVISOR_STARTER_CTA}
              </Button>
            </div>
          </section>
        )
      }
    >
      <div className="flex-1 overflow-y-auto rounded-2xl border border-[var(--demo-border)] bg-[var(--demo-surface)]/78 p-3 md:p-4">
        <div className="space-y-4">
          {isStarted ? (
            <PhaseProgressBar progress={progress} currentPhaseMeta={currentPhaseMeta} />
          ) : null}

          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </AnimatePresence>

          {isAdvisorTyping ? <TypingIndicator /> : null}

          {isProcessing ? (
            <ProcessingTimeline stages={processingStages} activeIndex={processingIndex} />
          ) : null}

          {flowError ? (
            <div className="rounded-2xl border border-red-400/40 bg-red-100/70 p-3 text-sm text-red-800">
              {flowError}
            </div>
          ) : null}

          <div ref={bottomRef} />
        </div>
      </div>
    </ChatShell>
  );
}
