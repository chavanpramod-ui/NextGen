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
  amber: 'border-amber-300/60 dark:border-amber-500/30 bg-gradient-to-br from-white via-amber-50/40 to-slate-50/90 dark:from-slate-900/90 dark:via-amber-950/25 dark:to-slate-950 hover:border-amber-400 dark:hover:border-amber-400/80 hover:shadow-[0_20px_50px_-12px_rgba(245,158,11,0.35)]',
  cyan: 'border-cyan-300/60 dark:border-cyan-500/30 bg-gradient-to-br from-white via-cyan-50/40 to-slate-50/90 dark:from-slate-900/90 dark:via-cyan-950/25 dark:to-slate-950 hover:border-cyan-400 dark:hover:border-cyan-400/80 hover:shadow-[0_20px_50px_-12px_rgba(6,182,212,0.35)]',
  emerald: 'border-emerald-300/60 dark:border-emerald-500/30 bg-gradient-to-br from-white via-emerald-50/40 to-slate-50/90 dark:from-slate-900/90 dark:via-emerald-950/25 dark:to-slate-950 hover:border-emerald-400 dark:hover:border-emerald-400/80 hover:shadow-[0_20px_50px_-12px_rgba(16,185,129,0.35)]',
  violet: 'border-violet-300/60 dark:border-violet-500/30 bg-gradient-to-br from-white via-violet-50/40 to-slate-50/90 dark:from-slate-900/90 dark:via-violet-950/25 dark:to-slate-950 hover:border-violet-400 dark:hover:border-violet-400/80 hover:shadow-[0_20px_50px_-12px_rgba(139,92,246,0.35)]',
  rose: 'border-rose-300/60 dark:border-rose-500/30 bg-gradient-to-br from-white via-rose-50/40 to-slate-50/90 dark:from-slate-900/90 dark:via-rose-950/25 dark:to-slate-950 hover:border-rose-400 dark:hover:border-rose-400/80 hover:shadow-[0_20px_50px_-12px_rgba(244,63,94,0.35)]',
  indigo: 'border-indigo-300/60 dark:border-indigo-500/30 bg-gradient-to-br from-white via-indigo-50/40 to-slate-50/90 dark:from-slate-900/90 dark:via-indigo-950/25 dark:to-slate-950 hover:border-indigo-400 dark:hover:border-indigo-400/80 hover:shadow-[0_20px_50px_-12px_rgba(99,102,241,0.35)]',
};

const topBeams: Record<string, string> = {
  amber: 'bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_15px_rgba(245,158,11,0.85)]',
  cyan: 'bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.85)]',
  emerald: 'bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_rgba(16,185,129,0.85)]',
  violet: 'bg-gradient-to-r from-transparent via-violet-400 to-transparent shadow-[0_0_15px_rgba(139,92,246,0.85)]',
  rose: 'bg-gradient-to-r from-transparent via-rose-400 to-transparent shadow-[0_0_15px_rgba(244,63,94,0.85)]',
  indigo: 'bg-gradient-to-r from-transparent via-indigo-400 to-transparent shadow-[0_0_15px_rgba(99,102,241,0.85)]',
};

const ambientGlows: Record<string, string> = {
  amber: 'bg-amber-500/15 dark:bg-amber-500/25',
  cyan: 'bg-cyan-500/15 dark:bg-cyan-500/25',
  emerald: 'bg-emerald-500/15 dark:bg-emerald-500/25',
  violet: 'bg-violet-500/15 dark:bg-violet-500/25',
  rose: 'bg-rose-500/15 dark:bg-rose-500/25',
  indigo: 'bg-indigo-500/15 dark:bg-indigo-500/25',
};

const iconBoxes: Record<string, string> = {
  amber: 'border-amber-400/40 bg-gradient-to-br from-amber-400/20 to-orange-400/10 text-amber-600 dark:text-amber-300 shadow-[0_0_18px_rgba(251,191,36,0.25)]',
  cyan: 'border-cyan-400/40 bg-gradient-to-br from-cyan-400/20 to-teal-400/10 text-cyan-600 dark:text-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.25)]',
  emerald: 'border-emerald-400/40 bg-gradient-to-br from-emerald-400/20 to-green-400/10 text-emerald-600 dark:text-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.25)]',
  violet: 'border-violet-400/40 bg-gradient-to-br from-violet-400/20 to-fuchsia-400/10 text-violet-600 dark:text-violet-300 shadow-[0_0_18px_rgba(139,92,246,0.25)]',
  rose: 'border-rose-400/40 bg-gradient-to-br from-rose-400/20 to-pink-400/10 text-rose-600 dark:text-rose-300 shadow-[0_0_18px_rgba(244,63,94,0.25)]',
  indigo: 'border-indigo-400/40 bg-gradient-to-br from-indigo-400/20 to-blue-400/10 text-indigo-600 dark:text-indigo-300 shadow-[0_0_18px_rgba(99,102,241,0.25)]',
};

const statusBadges: Record<string, { box: string; dot: string }> = {
  amber: {
    box: 'border-amber-400/40 bg-amber-500/10 text-amber-700 dark:border-amber-400/30 dark:text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.15)]',
    dot: 'bg-amber-400',
  },
  cyan: {
    box: 'border-cyan-400/40 bg-cyan-500/10 text-cyan-700 dark:border-cyan-400/30 dark:text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.15)]',
    dot: 'bg-cyan-400',
  },
  emerald: {
    box: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400/30 dark:text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.15)]',
    dot: 'bg-emerald-400',
  },
  violet: {
    box: 'border-violet-400/40 bg-violet-500/10 text-violet-700 dark:border-violet-400/30 dark:text-violet-300 shadow-[0_0_12px_rgba(139,92,246,0.15)]',
    dot: 'bg-violet-400',
  },
  rose: {
    box: 'border-rose-400/40 bg-rose-500/10 text-rose-700 dark:border-rose-400/30 dark:text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.15)]',
    dot: 'bg-rose-400',
  },
  indigo: {
    box: 'border-indigo-400/40 bg-indigo-500/10 text-indigo-700 dark:border-indigo-400/30 dark:text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.15)]',
    dot: 'bg-indigo-400',
  },
};

const buttonBoxes: Record<string, string> = {
  amber: 'border-amber-300/60 bg-amber-50/80 text-amber-800 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-white hover:border-transparent hover:shadow-[0_8px_20px_-4px_rgba(245,158,11,0.4)] dark:border-amber-500/30 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-gradient-to-r dark:hover:from-amber-500 dark:hover:to-orange-500 dark:hover:text-white',
  cyan: 'border-cyan-300/60 bg-cyan-50/80 text-cyan-800 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-teal-500 hover:text-white hover:border-transparent hover:shadow-[0_8px_20px_-4px_rgba(6,182,212,0.4)] dark:border-cyan-500/30 dark:bg-cyan-950/40 dark:text-cyan-300 dark:hover:bg-gradient-to-r dark:hover:from-cyan-500 dark:hover:to-teal-500 dark:hover:text-white',
  emerald: 'border-emerald-300/60 bg-emerald-50/80 text-emerald-800 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white hover:border-transparent hover:shadow-[0_8px_20px_-4px_rgba(16,185,129,0.4)] dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-gradient-to-r dark:hover:from-emerald-500 dark:hover:to-teal-500 dark:hover:text-white',
  violet: 'border-violet-300/60 bg-violet-50/80 text-violet-800 hover:bg-gradient-to-r hover:from-violet-600 hover:to-indigo-500 hover:text-white hover:border-transparent hover:shadow-[0_8px_20px_-4px_rgba(139,92,246,0.4)] dark:border-violet-500/30 dark:bg-violet-950/40 dark:text-violet-300 dark:hover:bg-gradient-to-r dark:hover:from-violet-600 dark:hover:to-indigo-500 dark:hover:text-white',
  rose: 'border-rose-300/60 bg-rose-50/80 text-rose-800 hover:bg-gradient-to-r hover:from-rose-500 hover:to-pink-500 hover:text-white hover:border-transparent hover:shadow-[0_8px_20px_-4px_rgba(244,63,94,0.4)] dark:border-rose-500/30 dark:bg-rose-950/40 dark:text-rose-300 dark:hover:bg-gradient-to-r dark:hover:from-rose-500 dark:hover:to-pink-500 dark:hover:text-white',
  indigo: 'border-indigo-300/60 bg-indigo-50/80 text-indigo-800 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-blue-500 hover:text-white hover:border-transparent hover:shadow-[0_8px_20px_-4px_rgba(99,102,241,0.4)] dark:border-indigo-500/30 dark:bg-indigo-950/40 dark:text-indigo-300 dark:hover:bg-gradient-to-r dark:hover:from-indigo-500 dark:hover:to-blue-500 dark:hover:text-white',
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
  const cardTheme = cardThemes[accent] ?? cardThemes.cyan;
  const topBeam = topBeams[accent] ?? topBeams.cyan;
  const ambientGlow = ambientGlows[accent] ?? ambientGlows.cyan;
  const iconBox = iconBoxes[accent] ?? iconBoxes.cyan;
  const badgeTheme = statusBadges[accent] ?? statusBadges.cyan;
  const buttonBox = buttonBoxes[accent] ?? buttonBoxes.cyan;

  return (
    <motion.article
      key={id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      className={`dashboard-panel group relative flex min-h-[235px] flex-col justify-between overflow-hidden rounded-3xl border p-5 transition-all duration-300 ${cardTheme}`}
    >
      {/* Top Luminous Neon Border Beam */}
      <div className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] transition-all duration-500 group-hover:h-[3px] ${topBeam}`} />

      {/* Ambient Corner Radial Auroras */}
      <div className={`pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-100 opacity-60 ${ambientGlow}`} />
      <div className={`pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-100 opacity-40 ${ambientGlow}`} />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border backdrop-blur-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${iconBox}`}>
            <CourseIcon iconName={iconName} />
          </div>
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold backdrop-blur-md transition-transform duration-300 group-hover:scale-105 ${badgeTheme.box}`}>
            <span className="relative flex h-1.5 w-1.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${badgeTheme.dot}`} />
              <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${badgeTheme.dot}`} />
            </span>
            {status}
          </span>
        </div>

        <h3 className="mt-5 line-clamp-2 text-base font-bold tracking-tight text-slate-900 dark:text-white transition-colors">
          {title}
        </h3>
        <div className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <Clock3 size={14} className="text-slate-400 dark:text-slate-500" />
          <span>{duration}</span>
        </div>
      </div>

      <div className="relative z-10 mt-6">
        <div className="mb-2 flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-500 dark:text-slate-400 uppercase tracking-wider">Progress</span>
          <span className="text-slate-800 dark:text-slate-100 font-bold">{progress}%</span>
        </div>
        <ProgressIndicator progress={progress} size="medium" accent={accent} />
        <button
          type="button"
          onClick={() => onContinue && onContinue(id)}
          className={`mt-4 flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 text-xs font-bold tracking-wide backdrop-blur-md transition-all duration-300 ${buttonBox}`}
        >
          <span>Continue Track</span>
          <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </motion.article>
  );
}
