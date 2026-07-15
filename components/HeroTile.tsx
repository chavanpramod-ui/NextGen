'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle2, Clock, Flame, PlayCircle, Sparkles, Target, Zap } from 'lucide-react';

interface HeroTileProps {
  userName: string;
  streakDays: number;
}

const streakWeekDays = [
  { day: 'M', done: true },
  { day: 'T', done: true },
  { day: 'W', done: true },
  { day: 'T', done: true },
  { day: 'F', done: true },
  { day: 'S', done: false },
  { day: 'S', done: false },
];

const todayPlanItems = [
  { label: 'React Patterns', time: '42 min', tag: 'In Progress', active: true },
  { label: 'Schema Lab', time: '30 min', tag: 'Ready', active: false },
  { label: 'UI Review', time: '18 min', tag: 'Queue', active: false },
];

export function HeroTile({ userName, streakDays }: HeroTileProps) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 180, damping: 24 });
  const smoothY = useSpring(pointerY, { stiffness: 180, damping: 24 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-3, 3]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="group/hero relative min-h-[380px] overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white via-slate-50/90 to-slate-100/80 p-6 shadow-[0_20px_50px_-15px_rgba(124,58,237,0.08)] transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] hover:border-violet-400/90 hover:shadow-[0_35px_90px_-15px_rgba(139,92,246,0.38),0_0_45px_-5px_rgba(6,182,212,0.25)] dark:border-slate-800/80 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-950 dark:hover:border-violet-400/80 sm:p-7 lg:p-8"
    >
      {/* Ambient Mesh Auroras */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/15 blur-[110px] transition-all duration-700 group-hover/hero:scale-125 group-hover/hero:opacity-100 dark:bg-violet-600/25" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-500/15 blur-[110px] transition-all duration-700 group-hover/hero:scale-125 group-hover/hero:opacity-100 dark:bg-cyan-500/25" />

      {/* Top Luminous Border Beam */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500/80 via-cyan-500/80 to-transparent shadow-[0_0_20px_rgba(139,92,246,0.8)] transition-all duration-500 group-hover/hero:h-[3px] group-hover/hero:shadow-[0_0_30px_rgba(139,92,246,1)]" />

      <div className="relative z-10 grid h-full gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* Left Column: Welcome & Action Controls */}
        <div className="flex min-w-0 flex-col justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/40 bg-gradient-to-r from-violet-500/10 via-cyan-500/10 to-violet-500/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-700 shadow-[0_0_20px_rgba(139,92,246,0.15)] backdrop-blur-md dark:border-violet-400/30 dark:text-violet-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
              </span>
              <Zap size={14} className="text-violet-600 dark:text-violet-400" />
              Live Learning System
            </div>

            <h2 className="mt-6 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              Welcome back, {userName}.{' '}
              <span className="bg-gradient-to-r from-violet-600 via-cyan-500 to-teal-400 bg-clip-text text-transparent dark:from-violet-300 dark:via-cyan-300 dark:to-teal-200">
                Your next best move is ready.
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
              Continue the React architecture module, then clear the database lab while your focus score is trending up.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Interactive Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                className="group/btn inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_25px_-5px_rgba(6,182,212,0.4)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_15px_30px_-5px_rgba(139,92,246,0.55)] active:scale-[0.98]"
              >
                <PlayCircle size={18} className="transition-transform duration-300 group-hover/btn:scale-110" />
                <span>Resume session</span>
              </button>

              <button
                type="button"
                className="group/btn2 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300/80 bg-white/80 px-5 py-3.5 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <span>View roadmap</span>
                <ArrowRight size={16} className="transition-transform duration-300 group-hover/btn2:translate-x-1" />
              </button>
            </div>

            {/* Live Telemetry Bar */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <Target size={14} className="text-cyan-500" />
                <span>Focus efficiency: <strong className="text-slate-800 dark:text-slate-200">94%</strong></span>
              </div>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <div className="flex items-center gap-1.5">
                <Sparkles size={14} className="text-amber-500" />
                <span>AI optimization status: <strong className="text-emerald-600 dark:text-emerald-400">Active</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Stacked Telemetry Pods */}
        <div className="flex flex-col gap-4">
          {/* Learning Streak Pod */}
          <div className="group/streak relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-white/90 to-amber-500/5 p-5 shadow-md backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.015] hover:border-amber-400/80 hover:shadow-[0_20px_45px_-10px_rgba(245,158,11,0.35)] dark:border-amber-400/20 dark:from-amber-500/15 dark:via-slate-900/90 dark:to-slate-900/60 dark:hover:border-amber-400/70">
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-500/20 blur-2xl transition-all duration-500 group-hover/streak:scale-150 group-hover/streak:opacity-100" />
            
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                Learning Streak
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300">
                <Flame size={11} />
                Hot Streak
              </span>
            </div>

            <div className="relative z-10 mt-4 flex items-end justify-between gap-4">
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-500 bg-clip-text text-4xl font-black text-transparent dark:from-amber-300 dark:via-orange-300 dark:to-amber-200">
                    {streakDays}
                  </span>
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">days active</span>
                </div>
              </div>

              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, -4, 4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.45)] transition-transform duration-300 group-hover/streak:scale-110"
              >
                <Flame size={24} />
              </motion.div>
            </div>

            {/* Weekly Streak Progress Strip */}
            <div className="relative z-10 mt-4 flex items-center justify-between border-t border-amber-500/20 pt-3">
              {streakWeekDays.map((d, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">{d.day}</span>
                  <div
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      d.done
                        ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)] group-hover/streak:scale-125'
                        : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Today Plan Pod */}
          <div className="group/plan relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-white/90 to-emerald-500/5 p-5 shadow-md backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.015] hover:border-emerald-400/80 hover:shadow-[0_20px_45px_-10px_rgba(16,185,129,0.35)] dark:border-emerald-400/20 dark:from-emerald-500/15 dark:via-slate-900/90 dark:to-slate-900/60 dark:hover:border-emerald-400/70">
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-emerald-500/20 blur-2xl transition-all duration-500 group-hover/plan:scale-150 group-hover/plan:opacity-100" />

            <div className="relative z-10 flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Today Plan
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 shadow-xs dark:text-emerald-300">
                <Sparkles size={11} className="text-emerald-500" />
                Optimized
              </span>
            </div>

            <div className="relative z-10 mt-4 space-y-2.5">
              {todayPlanItems.map((item, index) => (
                <div
                  key={item.label}
                  className="group/item flex items-center justify-between gap-3 rounded-xl border border-slate-200/70 bg-white/80 p-2.5 transition-all duration-300 hover:scale-[1.025] hover:-translate-y-0.5 hover:border-cyan-400/70 hover:bg-white hover:shadow-md dark:border-slate-800/70 dark:bg-slate-900/70 dark:hover:border-cyan-400/60 dark:hover:bg-slate-800"
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-all duration-300 group-hover/item:scale-110 ${
                        item.active
                          ? 'bg-gradient-to-br from-cyan-500 to-violet-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 group-hover/item:text-cyan-500'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className="truncate text-xs font-semibold text-slate-800 transition-colors group-hover/item:text-cyan-600 dark:text-slate-200 dark:group-hover/item:text-cyan-300">
                      {item.label}
                    </span>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <span
                      className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${
                        item.active
                          ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-300'
                          : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                      }`}
                    >
                      {item.tag}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                      <Clock size={11} className="text-slate-400" />
                      {item.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
