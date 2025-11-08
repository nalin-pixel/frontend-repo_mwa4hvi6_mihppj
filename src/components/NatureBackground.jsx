import { motion } from 'framer-motion';

function Leaf({ delay = 0, left = '10%' }) {
  return (
    <motion.div
      aria-hidden
      className="absolute top-0 text-sage-600/30"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: ['-10%', '110%'], opacity: [0.2, 0.6, 0.2], rotate: [0, 10, -10, 0] }}
      transition={{ duration: 18, delay, repeat: Infinity, ease: 'easeInOut' }}
      style={{ left }}
    >
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="opacity-70">
        <path d="M12 2C8 6 4 8 4 12c0 4 4 8 8 8s8-4 8-8c0-4-4-6-8-10z" fill="currentColor" />
      </svg>
    </motion.div>
  );
}

export default function NatureBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#F5EFE6] via-[#C8E4F7]/40 to-[#A8C686]/30" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-20 rounded-[50%] bg-[radial-gradient(circle_at_center,rgba(168,198,134,0.25),transparent_60%)]"
        animate={{ scale: [1, 1.05, 1], opacity: [0.7, 0.9, 0.7] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <Leaf delay={0} left="8%" />
      <Leaf delay={3} left="25%" />
      <Leaf delay={6} left="55%" />
      <Leaf delay={1.5} left="75%" />
      <Leaf delay={4.5} left="90%" />
    </div>
  );
}
