'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, CalendarCheck, Clock3, Flame, TrendingUp, Zap } from 'lucide-react';
import type { Activity } from '@/lib/supabase';

interface ActivityTileProps {
  activity?: Activity;
}

const activityData = [
  { day: 'Mon', value: 45, isToday: false },
  { day: 'Tue', value: 52, isToday: false },
  { day: 'Wed', value: 48, isToday: false },
  { day: 'Thu', value: 61, isToday: true },
  { day: 'Fri', value: 55, isToday: false },
  { day: 'Sat', value: 67, isToday: false },
  { day: 'Sun', value: 38, isToday: false },
];

export function ActivityTile({ activity }: ActivityTileProps) {
  const [currentDayIndex, setCurrentDayIndex] = useState(3); // Default to Thu
  const [currentDateFormatted, setCurrentDateFormatted] = useState('Friday, Jul 10, 2026');
  const [currentTimeFormatted, setCurrentTimeFormatted] = useState('10:03:40 PM');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDayIndex((now.getDay() + 6) % 7);
      setCurrentDateFormatted(
        now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      );
      setCurrentTimeFormatted(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const dynamicActivityData = activityData.map((item, index) => {
    const now = new Date();
    const currentDayIdx = (now.getDay() + 6) % 7; // Mon = 0, Sun = 6
    const diffDays = index - currentDayIdx;
    const itemDate = new Date(now);
    itemDate.setDate(now.getDate() + diffDays);

    const dateStr = itemDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    const dateNum = itemDate.getDate();

    return {
      ...item,
      isToday: index === currentDayIndex,
      dateStr,
      dateNum,
    };
  });

  const maxValue = Math.max(...dynamicActivityData.map((item) => item.value));
  const weekStart = dynamicActivityData[0]?.dateStr?.replace(/^[A-Za-z]+,\s*/, '') || 'Jul 6';
  const weekEnd = dynamicActivityData[6]?.dateStr?.replace(/^[A-Za-z]+,\s*/, '') || 'Jul 12';

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group/tile relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white via-cyan-50/20 to-slate-50/90 p-6 shadow-[0_15px_40px_-15px_rgba(6,182,212,0.12)] transition-all duration-500 hover:-translate-y-2 hover:scale-[1.012] hover:border-cyan-400/90 hover:shadow-[0_32px_85px_-15px_rgba(6,182,212,0.38),0_0_40px_-5px_rgba(6,182,212,0.22)] dark:border-slate-800/80 dark:from-slate-900 dark:via-cyan-950/20 dark:to-slate-950 dark:hover:border-cyan-400/80"
    >
      {/* Ambient Radial Auroras */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-cyan-500/15 blur-3xl transition-all duration-700 group-hover/tile:scale-150 group-hover/tile:opacity-100 dark:bg-cyan-500/25" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-teal-500/15 blur-3xl transition-all duration-700 group-hover/tile:scale-150 group-hover/tile:opacity-100 dark:bg-teal-500/20" />

      {/* Top Luminous Border Beam */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/80 via-teal-500/80 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.8)] transition-all duration-500 group-hover/tile:h-[3px] group-hover/tile:shadow-[0_0_28px_rgba(6,182,212,1)]" />

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
              <Zap size={11} className="text-cyan-500" />
              Activity Feed
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
          </div>
          <h2 className="mt-2.5 text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            Weekly consistency
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            {activity?.title ?? 'Minutes learned per day • Continuous telemetry'}
          </p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/30 bg-gradient-to-br from-cyan-400/15 via-cyan-400/5 to-transparent text-cyan-600 shadow-[0_0_18px_rgba(34,211,238,0.18)] transition-all duration-300 group-hover/tile:scale-105 group-hover/tile:border-cyan-400/50 group-hover/tile:shadow-[0_0_24px_rgba(34,211,238,0.35)] dark:text-cyan-300">
          <BarChart3 size={20} />
        </div>
      </div>

      {/* Ultra-Premium Dual Capsule Date & Time HUD Strip */}
      <div className="relative z-10 mt-5 flex flex-wrap items-center justify-between gap-2.5 rounded-xl border border-slate-200/80 bg-slate-100/70 p-1.5 shadow-inner backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/60">
        <div className="flex items-center gap-2.5 rounded-lg border border-slate-200/60 bg-white/95 px-3 py-1.5 shadow-xs dark:border-slate-800/60 dark:bg-slate-900/90">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-xs">
            <CalendarCheck size={13} />
          </div>
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200" suppressHydrationWarning>
            {currentDateFormatted}
          </span>
        </div>
        <div className="flex items-center gap-2.5 rounded-lg border border-slate-200/60 bg-white/95 px-3 py-1.5 shadow-xs dark:border-slate-800/60 dark:bg-slate-900/90">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xs">
            <Clock3 size={13} />
          </div>
          <span className="font-mono text-xs font-bold tracking-tight text-slate-800 dark:text-slate-200" suppressHydrationWarning>
            {currentTimeFormatted}
          </span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div className="relative z-10 mt-6 pt-2">
        {/* Background Grid Guide Lines */}
        <div className="pointer-events-none absolute inset-x-0 top-3 flex h-36 flex-col justify-between opacity-35 dark:opacity-20">
          <div className="w-full border-b border-dashed border-slate-300 dark:border-slate-700" />
          <div className="w-full border-b border-dashed border-slate-300 dark:border-slate-700" />
          <div className="w-full border-b border-dashed border-slate-300 dark:border-slate-700" />
        </div>

        <div className="relative flex h-44 items-end gap-2.5">
          {dynamicActivityData.map((item, index) => (
            <div key={item.day} className="group/bar flex min-w-0 flex-1 flex-col items-center gap-2">
              <div className="relative flex h-36 w-full items-end rounded-xl border border-slate-200/60 bg-slate-100/70 p-1.5 transition-colors duration-300 group-hover/bar:border-cyan-400/40 dark:border-slate-800/60 dark:bg-slate-950/70">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.value / maxValue) * 100}%` }}
                  transition={{ delay: index * 0.04, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  title={`${item.dateStr} ${item.isToday ? '(Today)' : ''}: ${item.value} mins learned`}
                  className={`relative w-full rounded-lg transition-all duration-300 origin-bottom group-hover/bar:scale-x-105 ${
                    item.isToday
                      ? 'bg-gradient-to-t from-cyan-600 via-cyan-400 to-teal-300 shadow-[0_0_20px_rgba(34,211,238,0.55)]'
                      : 'bg-gradient-to-t from-slate-300 via-slate-200 to-slate-100 dark:from-slate-700 dark:via-slate-600 dark:to-slate-500 group-hover/bar:from-cyan-500 group-hover/bar:via-teal-400 group-hover/bar:to-emerald-300 group-hover/bar:shadow-[0_0_18px_rgba(52,211,153,0.4)]'
                  }`}
                >
                  {/* Glowing Top Indicator Cap */}
                  <div className={`absolute inset-x-0.5 top-0.5 h-1 rounded-full ${
                    item.isToday ? 'bg-white/80 shadow-[0_0_8px_#fff]' : 'bg-white/40 group-hover/bar:bg-white/80'
                  }`} />
                </motion.div>
              </div>

              {/* Day & Date Pill */}
              <div
                className={`flex flex-col items-center rounded-lg px-1.5 py-1 transition-all duration-300 leading-none w-full ${
                  item.isToday
                    ? 'border border-cyan-400/40 bg-cyan-500/15 text-cyan-700 dark:text-cyan-200 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 group-hover/bar:text-cyan-600 dark:group-hover/bar:text-cyan-300'
                }`}
              >
                <span className={`text-[11px] ${item.isToday ? 'font-bold' : 'font-medium'}`}>
                  {item.day.charAt(0)}
                </span>
                <span
                  suppressHydrationWarning
                  className={`mt-1 text-[10px] ${item.isToday ? 'font-extrabold text-cyan-600 dark:text-cyan-300' : 'text-slate-400 dark:text-slate-500'}`}
                >
                  {item.dateNum}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ultra-Premium Dual Stat Pods */}
      <div className="relative z-10 mt-6 grid grid-cols-2 gap-3.5 border-t border-slate-200/80 pt-5 dark:border-slate-800/80">
        <div className="group/stat rounded-xl border border-slate-200/70 bg-gradient-to-br from-slate-50 to-white p-3.5 transition-all duration-300 hover:border-cyan-400/40 hover:shadow-md dark:border-slate-800/70 dark:from-slate-900/60 dark:to-slate-900/30">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Study Time
            </span>
            <TrendingUp size={14} className="text-cyan-500" />
          </div>
          <p className="mt-1.5 text-2xl font-black tracking-tight text-slate-900 dark:text-slate-50">
            6.1h
          </p>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            This week{' '}
            <span suppressHydrationWarning className="font-medium text-slate-400 dark:text-slate-500">
              ({weekStart} – {weekEnd})
            </span>
          </p>
        </div>

        <div className="group/stat rounded-xl border border-slate-200/70 bg-gradient-to-br from-slate-50 to-white p-3.5 transition-all duration-300 hover:border-emerald-400/40 hover:shadow-md dark:border-slate-800/70 dark:from-slate-900/60 dark:to-slate-900/30">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Consistency Score
            </span>
            <Flame size={14} className="text-emerald-500" />
          </div>
          <p className="mt-1.5 text-2xl font-black tracking-tight text-slate-900 dark:text-slate-50">
            82%
          </p>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" />
            </div>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">A+</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
