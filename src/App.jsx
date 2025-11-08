import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import NatureBackground from './components/NatureBackground';
import WelcomeScreen from './components/WelcomeScreen';
import ScreeningTest from './components/ScreeningTest';
import DurationSeverity from './components/DurationSeverity';
import AdaptiveChat from './components/AdaptiveChat';

const container = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export default function App() {
  const [stage, setStage] = useState('welcome');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [responses, setResponses] = useState({});
  const [duration, setDuration] = useState({ unit: 'Months', value: 6 });
  const [severity, setSeverity] = useState({ dyslexia: 'None', dyscalculia: 'None', dysgraphia: 'None' });

  const bgClass = useMemo(() => 'min-h-screen w-full relative overflow-hidden antialiased', []);

  return (
    <div className={bgClass}>
      <NatureBackground />

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-10">
        <header className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 ring-1 ring-[#A8C686]/40 shadow-sm">
            <span className="text-lg">🌿</span>
            <span className="font-semibold text-[#4B5D3A]">Sprout</span>
          </div>
          <button
            onClick={() => setVoiceEnabled((v) => !v)}
            className="rounded-full bg-white/80 px-3 py-1 text-sm text-[#4B5D3A] ring-1 ring-[#A8C686]/30 shadow-sm hover:bg-white"
            aria-pressed={voiceEnabled}
          >
            {voiceEnabled ? 'Voice On' : 'Voice Off'}
          </button>
        </header>

        <section className="mt-8">
          <AnimatePresence mode="wait">
            {stage === 'welcome' && (
              <motion.div key="welcome" {...container}>
                <WelcomeScreen
                  onStart={() => setStage('screen')}
                  onLearn={() => alert('Sprout offers supportive guidance and tools. This prototype focuses on accessibility and calm design.')}
                  onToggleVoice={() => setVoiceEnabled((v) => !v)}
                  voiceEnabled={voiceEnabled}
                />
              </motion.div>
            )}

            {stage === 'screen' && (
              <motion.div key="screen" {...container}>
                <ScreeningTest
                  responses={responses}
                  setResponses={setResponses}
                  onComplete={() => setStage('duration')}
                  voiceEnabled={voiceEnabled}
                />
              </motion.div>
            )}

            {stage === 'duration' && (
              <motion.div key="duration" {...container}>
                <DurationSeverity
                  responses={responses}
                  duration={duration}
                  setDuration={setDuration}
                  onNext={(sev) => {
                    setSeverity(sev);
                    setStage('chat');
                  }}
                  voiceEnabled={voiceEnabled}
                />
              </motion.div>
            )}

            {stage === 'chat' && (
              <motion.div key="chat" {...container}>
                <AdaptiveChat severityProfile={severity} voiceEnabled={voiceEnabled} />
                <div className="mx-auto mt-6 w-full max-w-2xl rounded-2xl bg-white/80 p-4 text-center text-[#4B5D3A] shadow-sm ring-1 ring-[#A8C686]/30">
                  <p className="font-semibold">Sprout is a supportive tool — not a diagnostic one. 🌼</p>
                  <p className="mt-1 text-sm">For a full evaluation, please consult a licensed psychologist or specialist.</p>
                  <button
                    className="mt-3 rounded-xl bg-[#A8C686] px-5 py-2 font-medium text-[#24331a] shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-[#A8C686]/40"
                    onClick={() => setStage('welcome')}
                  >
                    Explore learning tools with Sprout →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}
