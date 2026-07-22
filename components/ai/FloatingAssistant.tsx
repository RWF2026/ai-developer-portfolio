"use client";

import { ChatWidget } from "@/components/ai/ChatWidget";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";

export function FloatingAssistant() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onOpen() {
      setOpen(true);
    }
    window.addEventListener("open-ai-assistant", onOpen);
    return () => window.removeEventListener("open-ai-assistant", onOpen);
  }, []);

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 md:right-6 md:bottom-6">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="w-[min(100vw-2rem,380px)] shadow-2xl shadow-black/50"
          >
            <ChatWidget compact className="h-[440px]" />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-14 items-center gap-2 rounded-full bg-teal-400 px-5 font-semibold text-ink-950 shadow-[0_0_40px_-8px_rgba(45,212,191,0.7)] transform-gpu"
        aria-expanded={open}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        <span className="hidden sm:inline">
          {open ? "Close" : "AI Assistant"}
        </span>
      </motion.button>
    </div>
  );
}

export function openAiAssistant() {
  window.dispatchEvent(new Event("open-ai-assistant"));
}
