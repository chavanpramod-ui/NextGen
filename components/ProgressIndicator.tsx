'use client';

import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  progress: number;
  size?: 'small' | 'medium' | 'large';
  accent?: string;
}

const accentGradients: Record<string, string> = {
  cyan: 'bg-gradient-to-r from-cyan-500 via-teal-400 to-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.6)]',
  violet: 'bg-gradient-to-r from-violet-600 via-purple-400 to-fuchsia-300 shadow-[0_0_12px_rgba(139,92,246,0.6)]',
  emerald: 'bg-gradient-to-r from-emerald-500 via-teal-400 to-green-300 shadow-[0_0_12px_rgba(16,185,129,0.6)]',
  amber: 'bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-300 shadow-[0_0_12px_rgba(245,158,11,0.6)]',
  rose: 'bg-gradient-to-r from-rose-500 via-pink-400 to-red-300 shadow-[0_0_12px_rgba(244,63,94,0.6)]',
  indigo: 'bg-gradient-to-r from-indigo-500 via-blue-400 to-cyan-300 shadow-[0_0_12px_rgba(99,102,241,0.6)]',
};

const tipGlows: Record<string, string> = {
  cyan: 'bg-cyan-200 shadow-[0_0_10px_#22d3ee]',
  violet: 'bg-violet-200 shadow-[0_0_10px_#c084fc]',
  emerald: 'bg-emerald-200 shadow-[0_0_10px_#34d399]',
  amber: 'bg-amber-200 shadow-[0_0_10px_#fbbf24]',
  rose: 'bg-rose-200 shadow-[0_0_10px_#fb7185]',
  indigo: 'bg-indigo-200 shadow-[0_0_10px_#818cf8]',
};

export function ProgressIndicator({ progress, size = 'small', accent = 'cyan' }: ProgressIndicatorProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const sizeClasses = {
    small: 'h-1.5',
    medium: 'h-2',
    large: 'h-3',
  };

  const gradientClass = accentGradients[accent] ?? accentGradients.cyan;
  const tipClass = tipGlows[accent] ?? tipGlows.cyan;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800/80 shadow-inner ${sizeClasses[size]}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clampedProgress}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${clampedProgress}%` }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`relative h-full rounded-full transition-all duration-500 ${gradientClass}`}
      >
        {clampedProgress > 0 && clampedProgress < 100 && (
          <span
            className={`absolute right-0 top-1/2 -translate-y-1/2 h-full w-1.5 rounded-full ${tipClass}`}
          />
        )}
      </motion.div>
    </div>
  );
}
