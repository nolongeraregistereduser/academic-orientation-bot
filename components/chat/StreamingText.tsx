"use client";

import { useEffect, useMemo, useState } from "react";

interface StreamingTextProps {
  text: string;
  isStreaming: boolean;
  speedMs?: number;
}

export function StreamingText({
  text,
  isStreaming,
  speedMs = 14,
}: StreamingTextProps) {
  const [visibleCount, setVisibleCount] = useState(isStreaming ? 0 : text.length);

  useEffect(() => {
    if (!isStreaming) {
      return;
    }

    const interval = window.setInterval(() => {
      setVisibleCount((previous) => {
        if (previous >= text.length) {
          window.clearInterval(interval);
          return text.length;
        }
        return previous + 1;
      });
    }, speedMs);

    return () => {
      window.clearInterval(interval);
    };
  }, [isStreaming, speedMs, text]);

  const renderedText = useMemo(() => {
    if (!isStreaming) {
      return text;
    }
    return text.slice(0, visibleCount);
  }, [isStreaming, text, visibleCount]);

  return <span>{renderedText}</span>;
}
