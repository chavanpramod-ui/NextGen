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
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', '--mouse-x': useTransform(pointerX, [-0.5, 0.5], ['0%', '100%']), '--mouse-y': useTransform(pointerY, [-0.5, 0.5], ['0%', '100%']) } as any}
      className="dashboard-panel relative min-h-[360px] overflow-hidden p-5 sm:p-6 lg:p-7"
    >
      <div className="absolute inset-0 grid-overlay opacity-40 mix-blend-overlay" />
      
      {/* Glowing Orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-violet-600/30 blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-600/30 blur-[100px] pointer-events-none"
      />

      <motion.div 
        animate={{ opacity: [0.4, 1, 0.4] }} 
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-violet-400 to-transparent shadow-[0_0_20px_rgba(139,92,246,0.8)]" 
      />
      
      <div className="relative z-10 grid h-full gap-6 lg:grid-cols-[minmax(0,1fr)_310px]">
        <div className="flex min-w-0 flex-col justify-between gap-8">
          <div style={{ transform: 'translateZ(30px)' }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-violet-300 shadow-[0_4px_10px_rgba(0,0,0,0.2)]">
              <Zap size={14} className="text-violet-400" />
              Live learning system
            </div>
            <h2 className="mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-lg font-outfit">
              Welcome back, {userName}. Your next best move is ready.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg mix-blend-plus-lighter">
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

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1" style={{ transform: 'translateZ(20px)' }}>
          <div className="group rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md p-5 transition-all hover:border-white/15 hover:bg-white/10 hover:shadow-[0_8px_30px_rgba(251,191,36,0.15)] relative overflow-hidden">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-500/20 blur-[40px] pointer-events-none transition-opacity group-hover:opacity-100 opacity-0" />
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
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

          <div className="group rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md p-5 transition-all hover:border-white/15 hover:bg-white/10 hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)] relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-emerald-500/20 blur-[40px] pointer-events-none transition-opacity group-hover:opacity-100 opacity-0" />
            <div className="flex items-center justify-between gap-4 relative z-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Today plan
              </p>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                Optimized
              </span>
            </div>
            <div className="mt-5 space-y-4 relative z-10">
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
