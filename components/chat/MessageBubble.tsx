import { motion } from "framer-motion";
import { AdvisorAvatar } from "@/components/chat/AdvisorAvatar";
import { StudentAvatar } from "@/components/chat/StudentAvatar";
import { StreamingText } from "@/components/chat/StreamingText";
import type { ConversationMessage } from "@/types/orientation-chat";

interface MessageBubbleProps {
  message: ConversationMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isAssistant = message.role === "assistant";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className={`flex items-end gap-3 ${isAssistant ? "justify-start" : "justify-end"}`}
    >
      {isAssistant ? <AdvisorAvatar /> : null}

      <div
        className={`max-w-[86%] rounded-2xl border px-4 py-3 shadow-[var(--demo-shadow-soft)] md:max-w-[72%] ${
          isAssistant
            ? "border-[var(--demo-border)] bg-[var(--demo-card)] text-[var(--demo-text)]"
            : "border-transparent bg-[linear-gradient(140deg,#1f3d77_0%,#2f71d4_100%)] text-white"
        }`}
      >
        <p className="text-sm leading-6">
          {isAssistant ? (
            <StreamingText text={message.content} isStreaming={message.status === "streaming"} />
          ) : (
            message.content
          )}
        </p>
      </div>

      {!isAssistant ? <StudentAvatar /> : null}
    </motion.div>
  );
}
