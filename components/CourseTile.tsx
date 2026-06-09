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
}

const accentClasses: Record<string, string> = {
  amber: 'border-amber-300/20 bg-amber-300/10 text-amber-200',
  cyan: 'border-cyan-300/20 bg-cyan-300/10 text-cyan-200',
  emerald: 'border-emerald-300/20 bg-emerald-300/10 text-emerald-200',
  violet: 'border-violet-300/20 bg-violet-300/10 text-violet-200',
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
}: CourseTileProps & { onContinue?: (id: string) => void }) {
  const accentClass = accentClasses[accent] ?? accentClasses.cyan;

  return (
    <motion.article
      key={id}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      className="dashboard-panel group flex min-h-[220px] flex-col justify-between p-4"
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className={`flex h-11 w-11 items-center justify-center rounded-lg border ${accentClass}`}>
            <CourseIcon iconName={iconName} />
          </div>
          <span className="rounded-md border border-slate-800 px-2 py-1 text-xs font-medium text-slate-400">
            {status}
          </span>
        </div>

        <h3 className="mt-5 line-clamp-2 text-base font-semibold leading-6 text-slate-50">
          {title}
        </h3>
        <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
          <Clock3 size={15} />
          <span>{duration}</span>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-slate-400">Progress</span>
          <span className="font-medium text-slate-100">{progress}%</span>
        </div>
        <ProgressIndicator progress={progress} size="medium" />
        <button
          type="button"
          onClick={() => onContinue && onContinue(id)}
          className="mt-4 flex w-full items-center justify-between rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-cyan-300/30 hover:text-cyan-200"
        >
          Continue
          <ArrowRight size={16} />
        </button>
      </div>
    </motion.article>
  );
}
