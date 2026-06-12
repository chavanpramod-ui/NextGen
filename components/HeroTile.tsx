'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Flame, PlayCircle, Zap } from 'lucide-react';

interface HeroTileProps {
  userName: string;
  streakDays: number;
}

export function HeroTile({ userName, streakDays }: HeroTileProps) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 180, damping: 24 });
  const smoothY = useSpring(pointerY, { stiffness: 180, damping: 24 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-4, 4]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="dashboard-panel relative min-h-[360px] overflow-hidden p-5 sm:p-6 lg:p-7"
    >
      <div className="absolute inset-0 grid-overlay opacity-60" />
      <motion.div 
        animate={{ opacity: [0.4, 0.8, 0.4] }} 
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_rgba(34,211,238,0.8)]" 
      />
      
      <div className="relative z-10 grid h-full gap-6 lg:grid-cols-[minmax(0,1fr)_310px]">
        <div className="flex min-w-0 flex-col justify-between gap-8">
          <div style={{ transform: 'translateZ(20px)' }}>
            <div className="inline-flex items-center gap-2 rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-cyan-300">
              <Zap size={14} />
              Live learning system
            </div>
            <h2 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight tracking-normal text-slate-50 sm:text-4xl lg:text-5xl">
              Welcome back, {userName}. Your next best move is ready.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Continue the React architecture module, then clear the database lab while your focus score is trending up.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row" style={{ transform: 'translateZ(10px)' }}>
            <button type="button" className="primary-button">
              <PlayCircle size={18} />
              Resume session
            </button>
            <button type="button" className="secondary-button">
              View roadmap
              <ArrowRight size={17} />
            </button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1" style={{ transform: 'translateZ(15px)' }}>
          <div className="group rounded-lg border border-slate-800 bg-slate-900/60 p-4 transition-all hover:border-amber-400/30 hover:bg-slate-800/80">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Learning streak
            </p>
            <div className="mt-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-4xl font-semibold text-slate-50">{streakDays}</p>
                <p className="text-sm text-slate-400">days active</p>
              </div>
              <motion.div 
                animate={{ scale: [1, 1.15, 1], rotate: [0, -5, 5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="flex h-12 w-12 items-center justify-center rounded-lg border border-amber-400/30 bg-amber-400/10 text-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-transform group-hover:scale-110"
              >
                <Flame size={24} />
              </motion.div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 transition-all hover:border-emerald-400/30 hover:bg-slate-800/80">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Today plan
              </p>
              <span className="rounded-md border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 text-xs font-medium text-emerald-400">
                Optimized
              </span>
            </div>
            <div className="mt-5 space-y-4">
              {[
                ['React Patterns', '42 min'],
                ['Schema Lab', '30 min'],
                ['UI Review', '18 min'],
              ].map(([label, time], index) => (
                <div key={label} className="group/item flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-slate-700 bg-slate-800 text-xs text-slate-400 transition-colors group-hover/item:border-cyan-400/50 group-hover/item:text-cyan-300">
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm font-medium text-slate-300 transition-colors group-hover/item:text-slate-50">
                    {label}
                  </span>
                  <span className="text-xs text-slate-500">{time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
