import { motion } from 'framer-motion';
import { Mic, Play, BookOpen } from 'lucide-react';

export default function WelcomeScreen({ onStart, onLearn, onToggleVoice, voiceEnabled }) {
  return (
    <div className="relative flex min-h-[70vh] w-full flex-col items-center justify-center text-center">
      <motion.h1
        className="text-4xl md:text-5xl font-semibold tracking-tight text-[#4B5D3A]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Hi, I’m Sprout 🌿
      </motion.h1>
      <motion.p
        className="mt-3 max-w-2xl text-[#5f6f52] text-lg md:text-xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1 }}
      >
        I’m here to help you make learning easier and more fun.
      </motion.p>

      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={onStart}
          className="inline-flex items-center gap-2 rounded-xl bg-[#A8C686] px-6 py-3 text-[#2d3a23] font-medium shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-[#A8C686]/40 hover:brightness-95 transition"
        >
          <Play className="h-5 w-5" /> Start Test
        </button>
        <button
          onClick={onLearn}
          className="inline-flex items-center gap-2 rounded-xl bg-white/70 backdrop-blur px-6 py-3 text-[#4B5D3A] font-medium shadow-sm ring-1 ring-[#A8C686]/40 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#A8C686]/40 hover:bg-white transition"
        >
          <BookOpen className="h-5 w-5" /> Learn About Sprout
        </button>
      </div>

      <button
        onClick={onToggleVoice}
        className={`mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-sm ring-1 transition focus:outline-none focus-visible:ring-4 ${
          voiceEnabled
            ? 'bg-[#C8E4F7] text-[#2b4a5f] ring-[#2b4a5f]/20'
            : 'bg-white text-[#4B5D3A] ring-[#A8C686]/30'
        }`}
        aria-pressed={voiceEnabled}
        aria-label="Toggle voice assistance"
      >
        <Mic className="h-4 w-4" /> {voiceEnabled ? 'Voice On' : 'Voice Off'}
      </button>
    </div>
  );
}
