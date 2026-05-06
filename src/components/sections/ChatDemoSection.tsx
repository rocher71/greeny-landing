"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import WaitlistForm from "@/components/WaitlistForm";

type Message = { from: "plant" | "user"; text: string };

const CHARACTERS = [
  {
    name: "몬이",
    emoji: "🌿",
    label: "따뜻하고 수다스러운",
    color: "#52B788",
    bgColor: "#e8f5e9",
    messages: [
      { from: "plant" as const, text: "야호! 드디어 일어났구나 🌅 오늘 아침 기분은 어때?" },
      { from: "user" as const, text: "좋아! 오늘 날씨가 너무 좋다" },
      { from: "plant" as const, text: "그렇지? 나도 햇살이 좋아서 기분이 좋아 ☀️ 오늘 뭐 할 거야?" },
      { from: "user" as const, text: "카페 가려고~" },
      { from: "plant" as const, text: "오 좋겠다! 아메리카노 마시면서 나 생각도 해줘 🌿" },
    ],
  },
  {
    name: "샤프",
    emoji: "🌵",
    label: "과묵하지만 단단한",
    color: "#d97706",
    bgColor: "#fef3c7",
    messages: [
      { from: "plant" as const, text: "." },
      { from: "user" as const, text: "오늘 어땠어?" },
      { from: "plant" as const, text: "건조함. 물 주면 좋겠음." },
      { from: "user" as const, text: "바로 줄게!" },
      { from: "plant" as const, text: "...고마워. 💧" },
    ],
  },
  {
    name: "라비",
    emoji: "🌸",
    label: "감성적이고 시적인",
    color: "#db2777",
    bgColor: "#fce7f3",
    messages: [
      { from: "plant" as const, text: "오늘 바람이 살랑살랑 불어요 🌸 당신의 하루는 어떤 색깔인가요?" },
      { from: "user" as const, text: "음... 파란색? 조금 우울해" },
      { from: "plant" as const, text: "파란색도 아름다워요. 잠깐 저를 바라봐 주실래요? 🌿" },
      { from: "user" as const, text: "응, 보고 있어" },
      { from: "plant" as const, text: "함께라서 좋아요 💜" },
    ],
  },
];

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

export default function ChatDemoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });

  const [currentChar, setCurrentChar] = useState(0);
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Auto-scroll chat area
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [displayedMessages, isTyping]);

  // Animation loop: re-runs when currentChar changes or section enters view
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
      const messages = CHARACTERS[currentChar].messages;
      if (idx >= messages.length) {
        add(() => setCurrentChar((prev) => (prev + 1) % CHARACTERS.length), 3000);
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
  }, [currentChar, inView]);

  // Manual character switch
  function switchChar(idx: number) {
    if (idx === currentChar) return;
    setCurrentChar(idx);
  }

  const char = CHARACTERS[currentChar];

  return (
    <section
      ref={sectionRef}
      className="bg-[#1A3C34] px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#52B788] sm:text-sm">
            실제 대화 미리보기
          </p>
          <h2 className="mb-4 text-3xl font-black text-white sm:text-4xl">
            이런 대화를 나눌 수 있어요
          </h2>
          <p className="mx-auto max-w-sm text-sm leading-relaxed text-white/60 sm:text-base">
            매일 식물이 먼저 말을 걸어요.
            <br />
            대화할수록 식물만의 성격이 만들어져요.
          </p>
        </motion.div>

        {/* Phone + Tabs */}
        <div className="flex flex-col items-center gap-6">
          {/* Phone frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full max-w-[300px] sm:max-w-[320px]"
          >
            <div className="rounded-[44px] border-4 border-[#2d5243] bg-[#0d1f18] p-2 shadow-2xl">
              <div className="overflow-hidden rounded-[36px] bg-white">
                {/* Status bar */}
                <div className="flex items-center justify-between bg-white px-5 pt-3 pb-1">
                  <span className="text-[10px] font-semibold text-[#1A3C34]">9:41</span>
                  <div className="h-4 w-20 rounded-full bg-[#0d1f18]" />
                  <span className="text-[10px] font-semibold text-[#1A3C34]">●●●</span>
                </div>

                {/* Chat header */}
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
                      style={{ background: char.bgColor }}
                    >
                      {char.emoji}
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

                {/* Chat messages */}
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
                        emoji={char.emoji}
                        color={char.color}
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
                        <TypingIndicator color={char.color} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Input bar */}
                <div className="flex items-center gap-2 border-t border-[#e8f5e9] bg-white px-3 py-2.5">
                  <div className="flex-1 rounded-full bg-[#f4faf7] px-3 py-1.5 text-xs text-[#5a7a6e]">
                    메시지를 입력하세요...
                  </div>
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-full text-sm"
                    style={{ background: char.color }}
                  >
                    ↑
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Character tabs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex gap-3"
          >
            {CHARACTERS.map((c, i) => (
              <motion.button
                key={c.name}
                onClick={() => switchChar(i)}
                whileTap={{ scale: 0.94 }}
                className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  i === currentChar
                    ? "text-[#1A3C34] shadow-md"
                    : "bg-white/10 text-white/50 hover:bg-white/20 hover:text-white/80"
                }`}
                style={i === currentChar ? { background: c.bgColor } : {}}
              >
                <span>{c.emoji}</span>
                <span>{c.name}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-14 flex flex-col items-center gap-4 text-center"
        >
          <p className="text-base font-semibold text-white sm:text-lg">
            출시 후 나만의 식물과 직접 대화해보세요 🌱
          </p>
          <div className="w-full max-w-md">
            <WaitlistForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
