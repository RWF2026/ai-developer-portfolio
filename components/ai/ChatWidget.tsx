"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import {
  answerPortfolioQuestion,
  suggestedPrompts,
  type ChatMessage,
} from "@/lib/ai-knowledge";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, Sparkles } from "lucide-react";
import { FormEvent, useEffect, useId, useRef, useState } from "react";

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

type ChatWidgetProps = {
  className?: string;
  compact?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function ChatWidget({ className, compact = false }: ChatWidgetProps) {
  const listId = useId();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Ask me anything about qualifications, projects, or the tech stack. I answer from this portfolio's knowledge base.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    const userMsg: ChatMessage = { id: uid(), role: "user", content: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);

    await new Promise((r) => setTimeout(r, 450 + Math.random() * 400));
    const reply = answerPortfolioQuestion(trimmed);
    setMessages((m) => [
      ...m,
      { id: uid(), role: "assistant", content: reply },
    ]);
    setTyping(false);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void send(input);
  }

  return (
    <GlassCard
      hover={false}
      className={cn(
        "flex flex-col border-teal-400/15 bg-black/40",
        compact ? "h-[360px]" : "h-full min-h-[420px]",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-400/15 text-teal-300">
          <Bot className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-mist-50">
            Portfolio AI
          </p>
          <p className="flex items-center gap-1 font-mono text-[10px] tracking-wider text-teal-400/80 uppercase">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-teal-400" />
            Online · local knowledge
          </p>
        </div>
        <Sparkles className="h-4 w-4 text-amber-400/80" />
      </div>

      <div
        id={listId}
        className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
        role="log"
        aria-live="polite"
      >
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "max-w-[92%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
              msg.role === "user"
                ? "ml-auto bg-teal-500/20 text-mist-50"
                : "mr-auto bg-white/5 text-mist-200",
            )}
          >
            {msg.content}
          </motion.div>
        ))}
        <AnimatePresence>
          {typing ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mr-auto flex gap-1 rounded-2xl bg-white/5 px-3.5 py-3"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-mist-400"
                  style={{ animationDelay: `${i * 120}ms` }}
                />
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      <div className="space-y-2 border-t border-white/10 p-3">
        <div className="flex flex-wrap gap-1.5">
          {suggestedPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => void send(prompt)}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-mist-300 transition hover:border-teal-400/40 hover:text-teal-200"
            >
              {prompt}
            </button>
          ))}
        </div>
        <form onSubmit={onSubmit} className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about skills, projects…"
            className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-mist-50 outline-none placeholder:text-mist-500 focus:border-teal-400/40"
            aria-controls={listId}
          />
          <button
            type="submit"
            disabled={!input.trim() || typing}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-400 text-ink-950 transition hover:bg-teal-300 disabled:opacity-40"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </GlassCard>
  );
}
