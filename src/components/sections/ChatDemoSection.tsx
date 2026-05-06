"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import WaitlistForm from "@/components/WaitlistForm";
import { getTranslations, type Locale } from "@/lib/i18n";

type Message = { from: "plant" | "user"; text: string };

function TypingIndicator({ color }: { color: string }) {
  return (
    <div className="flex items-end gap-2">
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base"
        style={{ background: color + "25" }}
      >
        💬
      </div>
      <div
        className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm px-4 py-3"
        style={{ background: color }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-2 w-2 rounded-full bg-white"
            animate={{ y: [0, -5, 0] }}
            transition={{
              repeat: Infinity,
              duration: 0.7,
              delay: i * 0.15,
              ease: "easeInOut" as const,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ChatBubble({ msg, emoji, color }: { msg: Message; emoji: string; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={msg.from === "plant" ? "flex items-end gap-2" : "flex justify-end"}
    >
      {msg.from === "plant" && (
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base"
          style={{ background: color + "25" }}
        >
          {emoji}
        </div>
      )}
      <div
        className={`max-w-[200px] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
          msg.from === "plant"
            ? "rounded-bl-sm text-white"
            : "rounded-br-sm bg-white text-[#1A3C34] shadow-sm"
        }`}
        style={msg.from === "plant" ? { background: color } : {}}
      >
        {msg.text}
      </div>
    </motion.div>
  );
}

const charColors = ["#52B788", "#d97706", "#db2777"];
const charBgColors = ["#e8f5e9", "#fef3c7", "#fce7f3"];
const charEmojis = ["🌿", "🌵", "🌸"];

export default function ChatDemoSection({ locale }: { locale: Locale }) {
  const sectionRef = useRef<HTMLElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });

  const [currentChar, setCurrentChar] = useState(0);
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const t = getTranslations(locale).chatDemo;
  const characters = t.characters;

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [displayedMessages, isTyping]);

  useEffect(() => {
    if (!inView) return;

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    setDisplayedMessages([]);
    setIsTyping(false);

    function add(fn: () => void, delay: number) {
      const id = setTimeout(fn, delay);
      timeouts.push(id);
    }

    function playStep(idx: number) {
      const messages = characters[currentChar].messages;
      if (idx >= messages.length) {
        add(() => setCurrentChar((prev) => (prev + 1) % characters.length), 3000);
        return;
      }
      const msg = messages[idx];
      if (msg.from === "plant") {
        add(() => setIsTyping(true), 0);
        add(() => {
          setIsTyping(false);
          setDisplayedMessages((prev) => [...prev, msg]);
          add(() => playStep(idx + 1), 700);
        }, 1500);
      } else {
        add(() => {
          setDisplayedMessages((prev) => [...prev, msg]);
          add(() => playStep(idx + 1), 700);
        }, 900);
      }
    }

    add(() => playStep(0), 600);
    return () => timeouts.forEach(clearTimeout);
  }, [currentChar, inView, characters]);

  function switchChar(idx: number) {
    if (idx === currentChar) return;
    setCurrentChar(idx);
  }

  const char = characters[currentChar];

  return (
    <section
      ref={sectionRef}
      className="bg-[#1A3C34] px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#52B788] sm:text-sm">
            {t.sectionLabel}
          </p>
          <h2 className="mb-4 text-3xl font-black text-white sm:text-4xl">
            {t.headline}
          </h2>
          <p className="mx-auto max-w-sm whitespace-pre-line text-sm leading-relaxed text-white/60 sm:text-base">
            {t.subtext}
          </p>
        </motion.div>

        <div className="flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full max-w-[300px] sm:max-w-[320px]"
          >
            <div className="rounded-[44px] border-4 border-[#2d5243] bg-[#0d1f18] p-2 shadow-2xl">
              <div className="overflow-hidden rounded-[36px] bg-white">
                <div className="flex items-center justify-between bg-white px-5 pt-3 pb-1">
                  <span className="text-[10px] font-semibold text-[#1A3C34]">9:41</span>
                  <div className="h-4 w-20 rounded-full bg-[#0d1f18]" />
                  <span className="text-[10px] font-semibold text-[#1A3C34]">●●●</span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentChar}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3 border-b border-[#e8f5e9] bg-white px-4 py-2.5"
                  >
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-full text-lg"
                      style={{ background: charBgColors[currentChar] }}
                    >
                      {charEmojis[currentChar]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1A3C34]">{char.name}</p>
                      <p className="text-[10px] text-[#52B788]">{char.label}</p>
                    </div>
                    <div className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-[#52B788]/10">
                      <span className="text-xs">📞</span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div
                  ref={chatRef}
                  className="flex h-[340px] flex-col gap-3 overflow-y-scroll bg-[#f4faf7] p-3 sm:h-[380px]"
                  style={{ scrollbarWidth: "none" }}
                >
                  <AnimatePresence>
                    {displayedMessages.map((msg, i) => (
                      <ChatBubble
                        key={i}
                        msg={msg}
                        emoji={charEmojis[currentChar]}
                        color={charColors[currentChar]}
                      />
                    ))}
                    {isTyping && (
                      <motion.div
                        key="typing"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.25 }}
                      >
                        <TypingIndicator color={charColors[currentChar]} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex items-center gap-2 border-t border-[#e8f5e9] bg-white px-3 py-2.5">
                  <div className="flex-1 rounded-full bg-[#f4faf7] px-3 py-1.5 text-xs text-[#5a7a6e]">
                    {t.inputPlaceholder}
                  </div>
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-full text-sm"
                    style={{ background: charColors[currentChar] }}
                  >
                    ↑
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex gap-3"
          >
            {characters.map((c, i) => (
              <motion.button
                key={i}
                onClick={() => switchChar(i)}
                whileTap={{ scale: 0.94 }}
                className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  i === currentChar
                    ? "text-[#1A3C34] shadow-md"
                    : "bg-white/10 text-white/50 hover:bg-white/20 hover:text-white/80"
                }`}
                style={i === currentChar ? { background: charBgColors[i] } : {}}
              >
                <span>{charEmojis[i]}</span>
                <span>{c.name}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-14 flex flex-col items-center gap-4 text-center"
        >
          <p className="text-base font-semibold text-white sm:text-lg">
            {t.bottomCta}
          </p>
          <div className="w-full max-w-md">
            <WaitlistForm locale={locale} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
