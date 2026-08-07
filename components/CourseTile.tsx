'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Clock3,
  Code,
  Database,
  Palette,
  Rocket,
} from 'lucide-react';
import { ProgressIndicator } from './ProgressIndicator';

interface CourseTileProps {
  id: string;
  title: string;
  progress: number;
  iconName: string;
  index?: number;
  status?: string;
  duration?: string;
  accent?: string;
  onContinue?: (id: string) => void;
}

const cardThemes: Record<string, string> = {
  amber: 'hover:border-amber-400/60 dark:hover:border-amber-500/50',
  cyan: 'hover:border-cyan-400/60 dark:hover:border-cyan-500/50',
  emerald: 'hover:border-emerald-400/60 dark:hover:border-emerald-500/50',
  violet: 'hover:border-violet-400/60 dark:hover:border-violet-500/50',
  rose: 'hover:border-rose-400/60 dark:hover:border-rose-500/50',
  indigo: 'hover:border-indigo-400/60 dark:hover:border-indigo-500/50',
};

const iconBoxes: Record<string, string> = {
  amber: 'text-amber-600 dark:text-amber-400',
  cyan: 'text-cyan-600 dark:text-cyan-400',
  emerald: 'text-emerald-600 dark:text-emerald-400',
  violet: 'text-violet-600 dark:text-violet-400',
  rose: 'text-rose-600 dark:text-rose-400',
  indigo: 'text-indigo-600 dark:text-indigo-400',
};

const statusBadges: Record<string, string> = {
  amber: 'bg-amber-500',
  cyan: 'bg-cyan-500',
  emerald: 'bg-emerald-500',
  violet: 'bg-violet-500',
  rose: 'bg-rose-500',
  indigo: 'indigo-500',
};

function CourseIcon({ iconName }: { iconName: string }) {
  const iconProps = { size: 20 };

  switch (iconName) {
    case 'BookOpen':
      return <BookOpen {...iconProps} />;
    case 'Code':
      return <Code {...iconProps} />;
    case 'Database':
      return <Database {...iconProps} />;
    case 'Palette':
      return <Palette {...iconProps} />;
    default:
      return <Rocket {...iconProps} />;
  }
}

export function CourseTile({
  id,
  title,
  progress,
  iconName,
  index = 0,
  status = 'Active',
  duration = 'Course',
  accent = 'cyan',
  onContinue,
}: CourseTileProps) {
  const cardTheme = cardThemes[accent] ?? cardThemes.cyan;
  const iconBox = iconBoxes[accent] ?? iconBoxes.cyan;
  const badgeDot = statusBadges[accent] ?? statusBadges.cyan;

  return (
    <motion.article
      key={id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3, ease: 'easeOut' }}
      className={`group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 ${cardTheme}`}
    >
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 ${iconBox}`}>
            <CourseIcon iconName={iconName} />
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[11px] font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            <span className={`h-1.5 w-1.5 rounded-full ${badgeDot}`} />
            {status}
          </span>
        </div>

        <h3 className="mt-4 line-clamp-2 text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {title}
        </h3>
        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
          <Clock3 size={14} />
          <span>{duration}</span>
        </div>
      </div>

      <div className="relative z-10 mt-5">
        <div className="mb-2 flex items-center justify-between text-xs font-medium">
          <span className="text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Progress</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{progress}%</span>
        </div>
        <ProgressIndicator progress={progress} size="small" accent={accent} />
        
        <button
          type="button"
          onClick={() => onContinue && onContinue(id)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          <span>Continue Track</span>
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </motion.article>
  );
}
