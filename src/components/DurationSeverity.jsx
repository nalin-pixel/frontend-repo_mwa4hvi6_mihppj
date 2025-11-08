import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

export default function DurationSeverity({ responses, duration, setDuration, onNext, voiceEnabled }) {
  const { unit, value } = duration;
  const units = ['Days', 'Weeks', 'Months', 'Years'];

  useEffect(() => {
    if (!voiceEnabled) return;
    const utter = new SpeechSynthesisUtterance(
      'How long have you noticed these difficulties? Choose a time period and a number.'
    );
    speechSynthesis.speak(utter);
  }, [voiceEnabled]);

  const severity = useMemo(() => {
    const scores = Object.values(responses).reduce(
      (acc, r) => ({ ...acc, [r.tag]: (acc[r.tag] || 0) + r.value }),
      {}
    );
    const durationFactor = Math.min(1 + (value || 0) / 10, 3);
    const levels = {};
    for (const tag of ['dyslexia', 'dyscalculia', 'dysgraphia']) {
      const s = (scores[tag] || 0) * durationFactor;
      levels[tag] = s >= 5 ? 'Severe' : s >= 3 ? 'Moderate' : s > 0 ? 'Mild' : 'None';
    }
    return levels;
  }, [responses, value]);

  const summary = Object.entries(severity)
    .filter(([, lvl]) => lvl !== 'None')
    .map(([k, lvl]) => `${k.replace('dys', 'dys-')}: ${lvl}`)
    .join(', ');

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-[#A8C686]/30">
        <p className="text-lg text-[#4B5D3A]">How long have you noticed these difficulties?</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {units.map((u) => (
            <button
              key={u}
              onClick={() => setDuration({ unit: u, value })}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ring-1 ring-[#A8C686]/30 shadow-sm ${
                unit === u ? 'bg-[#C8E4F7] text-[#2b4a5f]' : 'bg-white text-[#4B5D3A] hover:bg-[#F5EFE6]'
              }`}
              aria-pressed={unit === u}
            >
              {u}
            </button>
          ))}
        </div>
        <div className="mt-4">
          <input
            type="range"
            min={0}
            max={20}
            value={value}
            onChange={(e) => setDuration({ unit, value: Number(e.target.value) })}
            className="w-full accent-[#A8C686]"
            aria-label="Select duration value"
          />
          <p className="mt-2 text-[#4B5D3A]">You’ve selected: {value} {unit} 🌿</p>
        </div>
      </div>

      <motion.div
        className="rounded-2xl bg-[#F5EFE6] p-4 shadow-sm ring-1 ring-[#A8C686]/30"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-[#4B5D3A]">
          Based on what you’ve shared, you may have {summary || 'no specific'} challenges. Don’t worry —
          I’ll adapt to make things easier for you.
        </p>
        <button
          onClick={() => onNext(severity)}
          className="mt-4 rounded-xl bg-[#A8C686] px-5 py-2 font-medium text-[#24331a] shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-[#A8C686]/40"
        >
          Continue
        </button>
      </motion.div>
    </div>
  );
}
