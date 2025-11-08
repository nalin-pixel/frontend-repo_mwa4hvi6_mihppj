import { useEffect } from 'react';
import { motion } from 'framer-motion';

const QUESTIONS = [
  {
    id: 'read_words',
    text: 'Do you find it difficult to recognize written words even when you know them?',
    tag: 'dyslexia',
  },
  {
    id: 'math_symbols',
    text: 'Do numbers or mathematical symbols sometimes feel confusing?',
    tag: 'dyscalculia',
  },
  {
    id: 'letter_form',
    text: 'Do you struggle to form letters neatly or at a steady pace?',
    tag: 'dysgraphia',
  },
];

const choices = [
  { label: 'Yes', value: 2, emoji: '🙂' },
  { label: 'Sometimes', value: 1, emoji: '😐' },
  { label: 'No', value: 0, emoji: '🙁' },
];

export default function ScreeningTest({ onComplete, responses, setResponses, voiceEnabled }) {
  useEffect(() => {
    if (!voiceEnabled) return;
    const utter = new SpeechSynthesisUtterance(
      'We will go through a few short, supportive questions. You can answer Yes, Sometimes, or No.'
    );
    speechSynthesis.speak(utter);
  }, [voiceEnabled]);

  const progress = Object.keys(responses).length / QUESTIONS.length;

  const handleAnswer = (id, value, tag) => {
    const next = { ...responses, [id]: { value, tag } };
    setResponses(next);
    if (Object.keys(next).length === QUESTIONS.length) {
      setTimeout(() => onComplete(next), 400);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-4 h-2 w-full rounded-full bg-[#A8C686]/30" aria-hidden>
        <motion.div
          className="h-2 rounded-full bg-[#A8C686]"
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(progress * 100, 8)}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </div>

      <div className="space-y-6">
        {QUESTIONS.map((q, idx) => (
          <motion.div
            key={q.id}
            className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-[#A8C686]/30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <p className="text-lg text-[#4B5D3A]">{q.text}</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {choices.map((c) => (
                <button
                  key={c.label}
                  onClick={() => handleAnswer(q.id, c.value, q.tag)}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition ring-1 ring-[#A8C686]/30 shadow-sm ${
                    responses[q.id]?.value === c.value
                      ? 'bg-[#A8C686] text-[#24331a]'
                      : 'bg-white text-[#4B5D3A] hover:bg-[#F5EFE6]'
                  }`}
                  aria-pressed={responses[q.id]?.value === c.value}
                >
                  <span className="mr-1" aria-hidden>{c.emoji}</span>
                  {c.label}
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
