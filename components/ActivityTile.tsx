'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, CalendarCheck, Clock3 } from 'lucide-react';
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
      className="dashboard-panel p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-cyan-600 dark:text-cyan-300">
            Activity
          </p>
          <h2 className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-50">
            Weekly consistency
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {activity?.title ?? 'Minutes learned per day'}
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-400/30 dark:border-cyan-300/20 bg-cyan-400/10 dark:bg-cyan-300/10 text-cyan-700 dark:text-cyan-200">
          <BarChart3 size={19} />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-cyan-500/20 dark:border-cyan-400/15 bg-gradient-to-r from-cyan-500/5 via-slate-500/5 to-emerald-500/5 dark:from-cyan-500/10 dark:via-slate-800/40 dark:to-emerald-500/10 px-3.5 py-2.5 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-200">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-300">
            <CalendarCheck size={13} />
          </div>
          <span suppressHydrationWarning>{currentDateFormatted}</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-200">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
            <Clock3 size={13} />
          </div>
          <span className="font-mono tracking-tight" suppressHydrationWarning>{currentTimeFormatted}</span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </div>
      </div>

      <div className="mt-6 flex h-40 items-end gap-2">
        {dynamicActivityData.map((item, index) => (
          <div key={item.day} className="flex min-w-0 flex-1 flex-col items-center gap-2">
            <div className="flex h-32 w-full items-end rounded-md bg-slate-50 dark:bg-slate-950/70 p-1">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(item.value / maxValue) * 100}%` }}
                transition={{ delay: index * 0.04, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                title={`${item.dateStr} ${item.isToday ? '(Today)' : ''}: ${item.value} minutes learned`}
                className={`w-full rounded-sm transition-all duration-300 origin-bottom hover:scale-x-125 ${
                  item.isToday
                    ? 'bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]'
                    : 'bg-slate-200 dark:bg-slate-700 hover:bg-emerald-400 hover:shadow-[0_0_15px_rgba(52,211,153,0.5)]'
                }`}
              />
            </div>
            <div className="flex flex-col items-center leading-none">
              <span className={`text-xs ${item.isToday ? 'font-semibold text-cyan-700 dark:text-cyan-200' : 'text-slate-700 dark:text-slate-400'}`}>
                {item.day.charAt(0)}
              </span>
              <span suppressHydrationWarning className={`mt-1 text-[10px] ${item.isToday ? 'font-bold text-cyan-600 dark:text-cyan-300' : 'text-slate-400 dark:text-slate-500'}`}>
                {item.dateNum}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-200 dark:border-slate-800 pt-4">
        <div>
          <p className="text-2xl font-semibold text-slate-900 dark:text-slate-50">6.1h</p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            This week <span suppressHydrationWarning className="text-[11px] text-slate-400 dark:text-slate-500">({weekStart} – {weekEnd})</span>
          </p>
        </div>
        <div>
          <p className="text-2xl font-semibold text-slate-900 dark:text-slate-50">82%</p>
          <p className="text-xs text-slate-600 dark:text-slate-400">Consistency</p>
        </div>
      </div>
    </motion.section>
  );
}
