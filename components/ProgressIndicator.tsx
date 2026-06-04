'use client';

import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  progress: number;
  size?: 'small' | 'medium' | 'large';
}

export function ProgressIndicator({ progress, size = 'small' }: ProgressIndicatorProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const sizeClasses = {
    small: 'h-1.5',
    medium: 'h-2',
    large: 'h-3',
  };

  return (
    <div
      className={`relative w-full overflow-hidden rounded-full bg-slate-800 ${sizeClasses[size]}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clampedProgress}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${clampedProgress}%` }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-emerald-300 to-amber-300"
      />
    </div>
  );
}
