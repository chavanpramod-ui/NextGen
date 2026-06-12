'use client';

import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
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
  const maxValue = Math.max(...activityData.map((item) => item.value));

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="dashboard-panel p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-cyan-300">
            Activity
          </p>
          <h2 className="mt-2 text-lg font-semibold text-slate-50">
            Weekly consistency
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {activity?.title ?? 'Minutes learned per day'}
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
          <BarChart3 size={19} />
        </div>
      </div>

      <div className="mt-7 flex h-40 items-end gap-2">
        {activityData.map((item, index) => (
          <div key={item.day} className="flex min-w-0 flex-1 flex-col items-center gap-2">
            <div className="flex h-32 w-full items-end rounded-md bg-slate-950/70 p-1">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(item.value / maxValue) * 100}%` }}
                transition={{ delay: index * 0.04, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                title={`${item.day}: ${item.value} minutes`}
                className={`w-full rounded-sm transition-all duration-300 origin-bottom hover:scale-x-125 ${
                  item.isToday
                    ? 'bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]'
                    : 'bg-slate-700 hover:bg-emerald-400 hover:shadow-[0_0_15px_rgba(52,211,153,0.5)]'
                }`}
              />
            </div>
            <span className={`text-xs ${item.isToday ? 'font-semibold text-cyan-200' : 'text-slate-500'}`}>
              {item.day.charAt(0)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-800 pt-4">
        <div>
          <p className="text-2xl font-semibold text-slate-50">6.1h</p>
          <p className="text-xs text-slate-500">This week</p>
        </div>
        <div>
          <p className="text-2xl font-semibold text-slate-50">82%</p>
          <p className="text-xs text-slate-500">Consistency</p>
        </div>
      </div>
    </motion.section>
  );
}
