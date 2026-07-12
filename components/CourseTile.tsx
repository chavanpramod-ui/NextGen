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

const accentClasses: Record<string, string> = {
  amber: 'border-amber-400/30 bg-amber-400/10 text-amber-600 dark:text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.15)]',
  cyan: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-700 dark:text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.15)]',
  emerald: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-600 dark:text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.15)]',
  violet: 'border-violet-400/30 bg-violet-400/10 text-violet-600 dark:text-violet-300 shadow-[0_0_15px_rgba(139,92,246,0.15)]',
};

const hoverClasses: Record<string, string> = {
  amber: 'hover:border-amber-400/80 hover:shadow-[0_20px_50px_-10px_rgba(251,191,36,0.35)] hover:-translate-y-2 hover:scale-[1.025]',
  cyan: 'hover:border-cyan-400/80 hover:shadow-[0_20px_50px_-10px_rgba(34,211,238,0.35)] hover:-translate-y-2 hover:scale-[1.025]',
  emerald: 'hover:border-emerald-400/80 hover:shadow-[0_20px_50px_-10px_rgba(52,211,153,0.35)] hover:-translate-y-2 hover:scale-[1.025]',
  violet: 'hover:border-violet-400/80 hover:shadow-[0_20px_50px_-10px_rgba(139,92,246,0.35)] hover:-translate-y-2 hover:scale-[1.025]',
};

function CourseIcon({ iconName }: { iconName: string }) {
  const iconProps = { size: 21 };

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
  const accentClass = accentClasses[accent] ?? accentClasses.cyan;
  const hoverClass = hoverClasses[accent] ?? hoverClasses.cyan;

  return (
    <motion.article
      key={id}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`dashboard-panel group flex min-h-[220px] flex-col justify-between p-4 transition-all duration-300 ${hoverClass}`}
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className={`flex h-11 w-11 items-center justify-center rounded-lg border transition-colors ${accentClass}`}>
            <CourseIcon iconName={iconName} />
          </div>
          <span className="rounded-md border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 px-2 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 backdrop-blur-md">
            {status}
          </span>
        </div>

        <h3 className="mt-5 line-clamp-2 text-base font-semibold leading-6 text-slate-900 dark:text-slate-50 transition-colors group-hover:text-slate-900 dark:text-white">
          {title}
        </h3>
        <div className="mt-3 flex items-center gap-2 text-sm text-slate-900 dark:text-slate-500">
          <Clock3 size={15} />
          <span>{duration}</span>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400">Progress</span>
          <span className="font-medium text-slate-900 dark:text-slate-100">{progress}%</span>
        </div>
        <ProgressIndicator progress={progress} size="medium" />
        <button
          type="button"
          onClick={() => onContinue && onContinue(id)}
          className={`mt-4 flex w-full items-center justify-between rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/60 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 transition-all duration-300 hover:text-slate-900 dark:text-white ${hoverClasses[accent]?.split(' ')[0]}`}
        >
          Continue
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.article>
  );
}
