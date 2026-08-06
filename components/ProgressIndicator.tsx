'use client';

import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  progress: number;
  size?: 'small' | 'medium' | 'large';
  accent?: string;
}

const accentGradients: Record<string, string> = {
  cyan: 'bg-gradient-to-r from-cyan-500 via-teal-400 to-cyan-300 shadow-sm',
  violet: 'bg-gradient-to-r from-violet-600 via-purple-400 to-fuchsia-300 shadow-sm',
  emerald: 'bg-gradient-to-r from-emerald-500 via-teal-400 to-green-300 shadow-sm',
  amber: 'bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-300 shadow-sm',
  rose: 'bg-gradient-to-r from-rose-500 via-pink-400 to-red-300 shadow-sm',
  indigo: 'bg-gradient-to-r from-indigo-500 via-blue-400 to-cyan-300 shadow-sm',
};

const tipGlows: Record<string, string> = {
  cyan: 'bg-cyan-200 shadow-sm',
  violet: 'bg-violet-200 shadow-sm',
  emerald: 'bg-emerald-200 shadow-sm',
  amber: 'bg-amber-200 shadow-sm',
  rose: 'bg-rose-200 shadow-sm',
  indigo: 'bg-indigo-200 shadow-sm',
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
      className={`relative w-full overflow-hidden rounded-full bg-slate-200/80 dark:bg-zinc-800/80 shadow-inner ${sizeClasses[size]}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clampedProgress}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${clampedProgress}%` }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`relative h-full rounded-full transition-colors duration-200 ${gradientClass}`}
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
