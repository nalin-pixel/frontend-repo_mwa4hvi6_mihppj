import { useEffect, useMemo, useRef, useState } from 'react';
import { Mic, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function applyTheme(root, profile) {
  // Dyslexia
  if (profile.dyslexia && profile.dyslexia !== 'None') {
    root.style.setProperty('--sprout-font', 'Lexend, Inter, system-ui');
    root.style.setProperty('--sprout-bg', '#FFF9F0');
    root.style.setProperty('--sprout-spacing', '0.08em');
  }
  // Dysgraphia
  if (profile.dysgraphia && profile.dysgraphia !== 'None') {
    root.style.setProperty('--sprout-buttons', '1.1');
  }
  // Dyscalculia
  if (profile.dyscalculia && profile.dyscalculia !== 'None') {
    root.style.setProperty('--sprout-aids', '1');
  }
}

export default function AdaptiveChat({ severityProfile, voiceEnabled }) {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'I will adapt to your needs. Ask me anything or tap the microphone to speak.' },
  ]);
  const [input, setInput] = useState('');
  const listRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    applyTheme(root, severityProfile);
  }, [severityProfile]);

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!voiceEnabled) return;
    const last = messages[messages.length - 1];
    if (last?.role === 'bot') {
      const utter = new SpeechSynthesisUtterance(last.text);
      speechSynthesis.cancel();
      speechSynthesis.speak(utter);
    }
  }, [messages, voiceEnabled]);

  const send = (text) => {
    if (!text.trim()) return;
    const userMsg = { role: 'user', text };
    setMessages((m) => [...m, userMsg]);
    setTimeout(() => {
      const bot = { role: 'bot', text: 'Thanks for sharing. I will tailor tips and tools for you.' };
      setMessages((m) => [...m, bot]);
    }, 600);
    setInput('');
  };

  const font = useMemo(() => (severityProfile.dyslexia && severityProfile.dyslexia !== 'None' ? 'font-[var(--sprout-font)]' : ''), [severityProfile]);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div
        className={`rounded-2xl bg-white/90 p-4 shadow-sm ring-1 ring-[#A8C686]/30 backdrop-blur ${font}`}
        style={{
          letterSpacing: 'var(--sprout-spacing, 0)',
          background: 'var(--sprout-bg, white)',
        }}
      >
        <div ref={listRef} className="max-h-[40vh] overflow-y-auto space-y-3 pr-1">
          <AnimatePresence>
            {messages.map((m, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className={`${
                  m.role === 'user'
                    ? 'ml-auto bg-[#C8E4F7] text-[#2b4a5f]'
                    : 'mr-auto bg-[#F5EFE6] text-[#4B5D3A]'
                } max-w-[80%] rounded-2xl px-3 py-2 shadow-sm`}
              >
                {m.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#A8C686] text-[#24331a] shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-[#A8C686]/40"
            aria-label="Start voice input"
          >
            <Mic className="h-5 w-5" />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message"
            className="flex-1 rounded-xl border border-[#A8C686]/40 bg-white px-3 py-2 text-[#2d3a23] placeholder:text-[#2d3a23]/60 focus:outline-none focus:ring-2 focus:ring-[#A8C686]"
            style={{ fontFamily: 'var(--sprout-font, inherit)', letterSpacing: 'var(--sprout-spacing, 0)' }}
          />
          <button
            onClick={() => send(input)}
            className="inline-flex items-center gap-2 rounded-xl bg-[#A8C686] px-4 py-2 text-[#24331a] font-medium shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-[#A8C686]/40"
          >
            Send
          </button>
          <span className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#4B5D3A] ring-1 ring-[#A8C686]/30" title="Voice playback available">
            <Volume2 className="h-5 w-5" />
          </span>
        </div>

        {severityProfile.dyscalculia && severityProfile.dyscalculia !== 'None' && (
          <div className="mt-4 grid grid-cols-2 gap-3" aria-live="polite">
            <div className="rounded-xl bg-white p-3 ring-1 ring-[#C8E4F7]">
              <p className="text-sm text-[#2b4a5f]">Visual math aid</p>
              <div className="mt-2 flex gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span key={n} className="inline-flex h-6 w-6 items-center justify-center rounded bg-[#C8E4F7] text-[#2b4a5f]">
                    {n}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-xl bg-white p-3 ring-1 ring-[#C8E4F7]">
              <p className="text-sm text-[#2b4a5f]">Color-coded numbers</p>
              <div className="mt-2 flex gap-1">
                {['#C8E4F7', '#A8C686', '#F2D6C9', '#C8E4F7', '#A8C686'].map((c, i) => (
                  <span key={i} className="inline-flex h-6 w-6 items-center justify-center rounded" style={{ backgroundColor: c }}>
                    {i + 1}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
