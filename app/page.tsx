'use client';

import { useRouter } from 'next/navigation';

import { Suspense, useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  Activity,
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  Command,
  Cpu,
  Flame,
  GraduationCap,
  Loader2,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { ActivityTile } from '@/components/ActivityTile';
import { CourseTile } from '@/components/CourseTile';
import { HeroTile } from '@/components/HeroTile';
import { LoadingSkeletons } from '@/components/LoadingStates';
import { Sidebar } from '@/components/Sidebar';

import { initialCourses } from '@/lib/mockData';

const initialMetrics = [
  { label: 'Focus score', value: '94%', detail: '+12% this week', icon: Target },
  { label: 'Study time', value: '18.5h', detail: '4h 20m today', icon: Clock3 },
  { label: 'Completed', value: '27', detail: 'certified skills', icon: ShieldCheck },
];

const initialPriorities = [
  { title: 'Design critique recap', time: 'Friday, 2:00 PM', tone: 'Low' },
  { title: 'Ship portfolio case study', time: 'Today, 4:30 PM', tone: 'High' },
  { title: 'Database schema checkpoint', time: 'Tomorrow, 10:00 AM', tone: 'Medium' },
];

function MetricStrip({ metrics }: { metrics: typeof initialMetrics }) {
  return (
    <section className="grid gap-4 md:grid-cols-3" aria-label="Learning metrics">
      {metrics.map((metric, idx) => {
        const Icon = metric.icon;
        const themes = [
          {
            border: 'hover:-translate-y-2 hover:scale-[1.015] hover:border-cyan-400/90 hover:shadow-[0_28px_75px_-12px_rgba(6,182,212,0.42),0_0_35px_-5px_rgba(6,182,212,0.25)] dark:hover:border-cyan-400/80',
            bg: 'from-white via-cyan-50/40 to-slate-50/90 dark:from-slate-900 dark:via-cyan-950/25 dark:to-slate-950',
            beam: 'via-cyan-500/80 shadow-[0_0_15px_rgba(6,182,212,0.8)] group-hover/metric:shadow-[0_0_28px_rgba(6,182,212,1)]',
            aurora: 'bg-cyan-500/15 dark:bg-cyan-500/25',
            iconContainer: 'border-cyan-400/40 bg-gradient-to-br from-cyan-500/20 via-cyan-500/5 to-transparent text-cyan-600 dark:text-cyan-300 shadow-[0_0_18px_rgba(6,182,212,0.22)]',
            badgeText: 'text-cyan-700 dark:text-cyan-300 border-cyan-400/30 bg-cyan-500/10',
            valueGradient: 'from-cyan-600 via-teal-500 to-cyan-500 dark:from-cyan-400 dark:via-teal-300 dark:to-cyan-300'
          },
          {
            border: 'hover:-translate-y-2 hover:scale-[1.015] hover:border-violet-400/90 hover:shadow-[0_28px_75px_-12px_rgba(139,92,246,0.42),0_0_35px_-5px_rgba(139,92,246,0.25)] dark:hover:border-violet-400/80',
            bg: 'from-white via-violet-50/40 to-slate-50/90 dark:from-slate-900 dark:via-violet-950/25 dark:to-slate-950',
            beam: 'via-violet-500/80 shadow-[0_0_15px_rgba(139,92,246,0.8)] group-hover/metric:shadow-[0_0_28px_rgba(139,92,246,1)]',
            aurora: 'bg-violet-500/15 dark:bg-violet-500/25',
            iconContainer: 'border-violet-400/40 bg-gradient-to-br from-violet-500/20 via-violet-500/5 to-transparent text-violet-600 dark:text-violet-300 shadow-[0_0_18px_rgba(139,92,246,0.22)]',
            badgeText: 'text-violet-700 dark:text-violet-300 border-violet-400/30 bg-violet-500/10',
            valueGradient: 'from-violet-600 via-purple-500 to-violet-500 dark:from-violet-400 dark:via-purple-300 dark:to-violet-300'
          },
          {
            border: 'hover:-translate-y-2 hover:scale-[1.015] hover:border-amber-400/90 hover:shadow-[0_28px_75px_-12px_rgba(245,158,11,0.42),0_0_35px_-5px_rgba(245,158,11,0.25)] dark:hover:border-amber-400/80',
            bg: 'from-white via-amber-50/40 to-slate-50/90 dark:from-slate-900 dark:via-amber-950/25 dark:to-slate-950',
            beam: 'via-amber-500/80 shadow-[0_0_15px_rgba(245,158,11,0.8)] group-hover/metric:shadow-[0_0_28px_rgba(245,158,11,1)]',
            aurora: 'bg-amber-500/15 dark:bg-amber-500/25',
            iconContainer: 'border-amber-400/40 bg-gradient-to-br from-amber-500/20 via-amber-500/5 to-transparent text-amber-600 dark:text-amber-300 shadow-[0_0_18px_rgba(245,158,11,0.22)]',
            badgeText: 'text-amber-700 dark:text-amber-300 border-amber-400/30 bg-amber-500/10',
            valueGradient: 'from-amber-600 via-orange-500 to-amber-500 dark:from-amber-400 dark:via-orange-300 dark:to-amber-300'
          }
        ][idx % 3];

        return (
          <motion.article 
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            key={metric.label} 
            className={`group/metric relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br ${themes.bg} p-5 shadow-[0_15px_35px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 ${themes.border} dark:border-slate-800/80 sm:p-6`}
          >
            {/* Ambient Radial Aurora */}
            <div className={`pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full ${themes.aurora} blur-2xl transition-all duration-700 group-hover/metric:scale-[1.7] group-hover/metric:opacity-100`} />

            {/* Top Luminous Border Beam */}
            <div className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent ${themes.beam} to-transparent transition-all duration-500 group-hover/metric:h-[3px]`} />

            <div className="relative z-10 flex items-start justify-between gap-3">
              <div>
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${themes.badgeText}`}>
                  {metric.label}
                </span>
                <p className={`mt-3 bg-gradient-to-r ${themes.valueGradient} bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl`}>
                  {metric.value}
                </p>
                <p className="mt-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
                  {metric.detail}
                </p>
              </div>
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border backdrop-blur-md transition-all duration-300 group-hover/metric:scale-110 group-hover/metric:rotate-6 ${themes.iconContainer}`}>
                <Icon size={22} />
              </div>
            </div>
          </motion.article>
        );
      })}
    </section>
  );
}

function PriorityPanel({ priorities }: { priorities: typeof initialPriorities }) {
  return (
    <section className="group/queue relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white via-slate-50/90 to-slate-100/80 p-5 shadow-[0_15px_40px_-15px_rgba(6,182,212,0.08)] transition-all duration-500 hover:-translate-y-2 hover:scale-[1.012] hover:border-cyan-400/90 hover:shadow-[0_32px_85px_-15px_rgba(6,182,212,0.38),0_0_42px_-5px_rgba(139,92,246,0.24)] dark:border-slate-800/80 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-950 dark:hover:border-cyan-400/80 sm:p-6">
      {/* Ambient Radial Glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl transition-all duration-700 group-hover/queue:scale-150 group-hover/queue:opacity-100 dark:bg-cyan-500/25" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-violet-500/15 blur-3xl transition-all duration-700 group-hover/queue:scale-150 group-hover/queue:opacity-100 dark:bg-violet-500/20" />

      {/* Top Luminous Border Beam */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/80 via-violet-500/80 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.8)] transition-all duration-500 group-hover/queue:h-[3px] group-hover/queue:shadow-[0_0_30px_rgba(6,182,212,1)]" />

      <div className="relative z-10 flex items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-cyan-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-700 shadow-xs backdrop-blur-md dark:border-cyan-400/30 dark:text-cyan-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500" />
            </span>
            Mission Control
          </div>
          <div className="mt-2.5 flex items-center gap-2.5">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Priority Queue
            </h2>
            <span className="rounded-full border border-slate-300/80 bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {priorities.length} Active
            </span>
          </div>
        </div>

        <button
          type="button"
          className="group/btn inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white/80 text-slate-700 shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-cyan-400 hover:bg-cyan-500/15 hover:text-cyan-600 hover:shadow-[0_0_20px_rgba(6,182,212,0.35)] dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-cyan-400/60 dark:hover:text-cyan-300"
          aria-label="Open priority queue"
          title="Open priority queue"
        >
          <ArrowUpRight size={18} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </button>
      </div>

      <div className="relative z-10 mt-5 space-y-3">
        {priorities.map((item) => {
          const isHigh = item.tone === 'High';
          const isMedium = item.tone === 'Medium';

          return (
            <motion.div
              layout
              key={item.title}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className={`group flex items-center justify-between gap-3 rounded-2xl border bg-white/90 p-3.5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:scale-[1.015] dark:bg-slate-900/80 ${
                isHigh
                  ? 'border-l-4 border-slate-200/80 border-l-rose-500 hover:border-rose-400/80 hover:bg-gradient-to-r hover:from-rose-500/10 hover:via-white hover:to-rose-500/5 hover:shadow-[0_12px_30px_-8px_rgba(244,63,94,0.35)] dark:border-slate-800/80 dark:border-l-rose-500 dark:hover:border-rose-400/70 dark:hover:from-rose-500/20 dark:hover:via-slate-900 dark:hover:to-rose-950/40'
                  : isMedium
                  ? 'border-l-4 border-slate-200/80 border-l-amber-500 hover:border-amber-400/80 hover:bg-gradient-to-r hover:from-amber-500/10 hover:via-white hover:to-amber-500/5 hover:shadow-[0_12px_30px_-8px_rgba(245,158,11,0.35)] dark:border-slate-800/80 dark:border-l-amber-500 dark:hover:border-amber-400/70 dark:hover:from-amber-500/20 dark:hover:via-slate-900 dark:hover:to-amber-950/40'
                  : 'border-l-4 border-slate-200/80 border-l-cyan-500 hover:border-cyan-400/80 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:via-white hover:to-cyan-500/5 hover:shadow-[0_12px_30px_-8px_rgba(6,182,212,0.35)] dark:border-slate-800/80 dark:border-l-cyan-500 dark:hover:border-cyan-400/70 dark:hover:from-cyan-500/20 dark:hover:via-slate-900 dark:hover:to-cyan-950/40'
              }`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <button
                  type="button"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-slate-50 text-slate-400 transition-all duration-300 hover:scale-125 hover:rotate-6 hover:border-emerald-500 hover:bg-emerald-500/20 hover:text-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] dark:border-slate-700 dark:bg-slate-800 dark:hover:border-emerald-400 dark:hover:text-emerald-300"
                  aria-label={`Mark "${item.title}" complete`}
                >
                  <CheckCircle2 size={15} />
                </button>

                <div className="min-w-0">
                  <p className={`truncate text-sm font-semibold text-slate-800 transition-colors duration-300 dark:text-slate-100 ${
                    isHigh ? 'group-hover:text-rose-600 dark:group-hover:text-rose-300' :
                    isMedium ? 'group-hover:text-amber-600 dark:group-hover:text-amber-300' :
                    'group-hover:text-cyan-600 dark:group-hover:text-cyan-300'
                  }`}>
                    {item.title}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <Clock3 size={12} className="text-slate-400" />
                    <span>{item.time}</span>
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-bold transition-all duration-300 group-hover:scale-105 ${
                    isHigh
                      ? 'border-rose-400/40 bg-rose-500/10 text-rose-700 shadow-[0_0_12px_rgba(244,63,94,0.15)] dark:border-rose-400/30 dark:text-rose-300'
                      : isMedium
                      ? 'border-amber-400/40 bg-amber-500/10 text-amber-700 dark:border-amber-400/30 dark:text-amber-300'
                      : 'border-cyan-400/40 bg-cyan-500/10 text-cyan-700 dark:border-cyan-400/30 dark:text-cyan-300'
                  }`}
                >
                  {isHigh ? <Flame size={11} className="text-rose-500" /> : null}
                  {item.tone}
                </span>

                <ArrowRight size={14} className="text-slate-400 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 group-hover:text-cyan-500 dark:text-slate-400 dark:group-hover:text-cyan-300" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Live AI Optimization Footer */}
      <div className="relative z-10 mt-5 flex items-center justify-between border-t border-slate-200/60 pt-3.5 text-xs font-medium text-slate-500 dark:border-slate-800/60 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <Sparkles size={13} className="text-cyan-500" />
          <span>AI Queue Optimization: <strong className="text-slate-700 dark:text-slate-200">Active</strong></span>
        </div>
        <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">100% Synced</span>
      </div>
    </section>
  );
}

function CoursesGrid({ 
  courses, 
  onContinue 
}: { 
  courses: typeof initialCourses, 
  onContinue: (id: string) => void 
}) {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'In progress', 'Next sprint', 'Practice', 'Review'];

  const displayedCourses = useMemo(() => {
    if (activeFilter === 'All') return courses;
    return courses.filter((c) => c.status.toLowerCase() === activeFilter.toLowerCase());
  }, [courses, activeFilter]);

  return (
    <section 
      aria-labelledby="courses-heading"
      className="group/roadmap relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white via-slate-50/95 to-slate-100/90 p-6 shadow-[0_18px_45px_-15px_rgba(6,182,212,0.12)] transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] hover:border-cyan-400/90 hover:shadow-[0_35px_90px_-15px_rgba(6,182,212,0.38),0_0_45px_-5px_rgba(6,182,212,0.22)] dark:border-slate-800/80 dark:from-slate-900/95 dark:via-slate-900 dark:to-slate-950 dark:hover:border-cyan-400/80 sm:p-7"
    >
      {/* Ambient Radial Glows */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl transition-all duration-700 group-hover/roadmap:scale-150 group-hover/roadmap:opacity-100 dark:bg-cyan-500/25" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-violet-500/15 blur-3xl transition-all duration-700 group-hover/roadmap:scale-150 group-hover/roadmap:opacity-100 dark:bg-violet-500/20" />

      {/* Top Luminous Border Beam */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/80 via-teal-500/80 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.8)] transition-all duration-500 group-hover/roadmap:h-[3px] group-hover/roadmap:shadow-[0_0_30px_rgba(6,182,212,1)]" />

      {/* Header */}
      <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-cyan-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-cyan-700 shadow-xs backdrop-blur-md dark:border-cyan-400/30 dark:text-cyan-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            Active Tracks
          </div>
          <h2 id="courses-heading" className="mt-2.5 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Learning{' '}
            <span className="bg-gradient-to-r from-cyan-600 via-teal-500 to-violet-600 bg-clip-text text-transparent dark:from-cyan-400 dark:via-teal-300 dark:to-violet-400">
              roadmap
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button 
            type="button" 
            onClick={() => router.push('/courses')}
            className="group/btn inline-flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white/90 px-4 py-2.5 text-xs font-bold text-slate-700 shadow-xs backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-cyan-400 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-teal-500/10 hover:text-cyan-700 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-300 dark:hover:border-cyan-400/60 dark:hover:text-cyan-300"
          >
            <span>View all tracks</span>
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </button>
        </div>
      </div>

      {/* Interactive Track Filter Strip */}
      <div className="relative z-10 mt-6 flex flex-wrap items-center gap-2 border-b border-slate-200/60 pb-5 dark:border-slate-800/60">
        {filters.map((filter) => {
          const count = filter === 'All' 
            ? courses.length 
            : courses.filter((c) => c.status.toLowerCase() === filter.toLowerCase()).length;
          
          if (filter !== 'All' && count === 0) return null;
          
          const isSelected = activeFilter === filter;
          
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all duration-300 ${
                isSelected
                  ? 'border border-cyan-400/60 bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-[0_0_18px_rgba(6,182,212,0.4)] scale-105'
                  : 'border border-slate-200/80 bg-white/70 text-slate-600 hover:border-cyan-400/40 hover:bg-white hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:border-cyan-400/40 dark:hover:bg-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <span>{filter}</span>
              <span className={`rounded-full px-1.5 py-0.2 text-[10px] font-extrabold ${
                isSelected
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid of Cards */}
      <div className="relative z-10 mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {displayedCourses.map((course, idx) => (
          <CourseTile
            key={course.id}
            id={course.id}
            title={course.title}
            progress={course.progress}
            iconName={course.icon_name}
            index={idx}
            status={course.status}
            duration={course.duration}
            accent={course.accent}
            onContinue={onContinue}
          />
        ))}
      </div>
    </section>
  );
}

export default function Dashboard() {
  const [courses, setCourses] = useState(initialCourses);
  const [searchQuery, setSearchQuery] = useState('');
  const [metrics, setMetrics] = useState(initialMetrics);
  const [priorities, setPriorities] = useState(initialPriorities);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [firstName, setFirstName] = useState("Alex");
  const [currentDate, setCurrentDate] = useState('Thursday, Jun 4');

  useEffect(() => {
    const loadProfile = () => {
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        try {
          const parsed = JSON.parse(savedProfile);
          if (parsed.firstName !== undefined) setFirstName(parsed.firstName);
        } catch (e) {}
      }
    };
    loadProfile();
    window.addEventListener('profileUpdated', loadProfile);
    window.addEventListener('storage', loadProfile);
    return () => {
      window.removeEventListener('profileUpdated', loadProfile);
      window.removeEventListener('storage', loadProfile);
    };
  }, []);

  useEffect(() => {
    setCurrentDate(
      new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
      })
    );
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const handleSearchSubmit = () => {
    if (!searchQuery.trim()) return;
    setRecentSearches((prev) => {
      const updated = [searchQuery.trim(), ...prev.filter(q => q !== searchQuery.trim())].slice(0, 5);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      return updated;
    });
    setIsSearchFocused(false);
  };

  const filteredCourses = useMemo(() => {
    return courses.filter((course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [courses, searchQuery]);

  const router = useRouter();

  const handleContinueCourse = (id: string) => {
    router.push(`/courses/${id}`);
  };

  const handleOptimize = () => {
    if (isOptimizing) return;
    setIsOptimizing(true);
    
    // Simulate AI optimization delay
    setTimeout(() => {
      setPriorities((prev) => {
        const toneOrder: Record<string, number> = { High: 1, Medium: 2, Low: 3 };
        return [...prev].sort((a, b) => toneOrder[a.tone] - toneOrder[b.tone]);
      });
      setIsOptimizing(false);
    }, 1200);
  };

  const tasksRemaining = courses.filter(c => c.progress < 100).length;

  return (
    <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-6 px-4 py-4 sm:px-6 lg:px-8">
      <header className="group/header relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white via-slate-50/95 to-slate-100/90 p-6 shadow-[0_20px_55px_-15px_rgba(6,182,212,0.14)] transition-all duration-500 hover:-translate-y-1.5 hover:border-cyan-400/90 hover:bg-gradient-to-br hover:from-white hover:via-cyan-500/[0.03] hover:to-violet-500/[0.04] hover:shadow-[0_30px_80px_-12px_rgba(6,182,212,0.35)] dark:border-slate-800/80 dark:from-slate-900/95 dark:via-slate-900 dark:to-slate-950 dark:hover:border-cyan-400/80 dark:hover:from-slate-900 dark:hover:via-cyan-950/20 dark:hover:to-violet-950/20 dark:hover:shadow-[0_30px_80px_-12px_rgba(6,182,212,0.4)] sm:p-8">
        {/* Ambient Radial Auroras */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl transition-all duration-700 group-hover/header:scale-150 group-hover/header:opacity-100 dark:bg-cyan-500/25" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-violet-500/15 blur-3xl transition-all duration-700 group-hover/header:scale-150 group-hover/header:opacity-100 dark:bg-violet-500/20" />

        {/* Top Luminous Border Accent Beam */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/80 via-violet-500/80 to-transparent shadow-[0_0_20px_rgba(6,182,212,0.85)] transition-all duration-500 group-hover/header:h-[3px] group-hover/header:shadow-[0_0_30px_rgba(6,182,212,1)]" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            {/* Top Badge Strip */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-700 shadow-xs backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:border-cyan-400 hover:bg-cyan-500/20 hover:shadow-[0_0_18px_rgba(6,182,212,0.35)] dark:border-cyan-400/30 dark:text-cyan-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                </span>
                <Cpu size={13} className="text-cyan-500" />
                Next-Gen Dashboard
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700 shadow-2xs backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:border-violet-400 hover:bg-violet-500/10 hover:text-violet-700 hover:shadow-[0_0_18px_rgba(139,92,246,0.25)] dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:text-violet-300">
                <CalendarCheck size={13} className="text-violet-500" />
                {currentDate}
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:border-emerald-400 hover:bg-emerald-500/20 hover:shadow-[0_0_18px_rgba(16,185,129,0.35)] dark:border-emerald-400/30 dark:text-emerald-300">
                <Activity size={13} className="text-emerald-500" />
                Live Workspace
              </span>
            </div>

            {/* Headline */}
            <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              Student{' '}
              <span className="bg-gradient-to-r from-cyan-600 via-teal-500 to-violet-600 bg-clip-text text-transparent dark:from-cyan-400 dark:via-teal-300 dark:to-violet-400">
                command center
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
              Track progress, choose the next action, and keep every learning signal in one focused workspace.
            </p>
          </div>

          {/* Right Action Controls */}
          <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center">
            {/* Search Bar HUD */}
            <div className="relative z-50 group">
              <label className="flex items-center rounded-2xl border border-slate-200/80 bg-white/90 px-3.5 py-2.5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-cyan-400 hover:shadow-[0_12px_30px_-5px_rgba(6,182,212,0.3)] focus-within:border-cyan-500 focus-within:ring-4 focus-within:ring-cyan-500/15 dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-cyan-400/80 dark:focus-within:border-cyan-400">
                <Search size={16} className="text-slate-400 transition-colors group-focus-within:text-cyan-500 shrink-0" />
                <span className="sr-only">Search courses</span>
                <input
                  type="search"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearchSubmit();
                  }}
                  className="w-full bg-transparent px-2.5 text-sm font-medium text-slate-800 placeholder-slate-400 outline-none transition-all duration-300 sm:w-48 sm:focus:w-64 dark:text-slate-100 dark:placeholder-slate-500"
                />
                <span className="hidden rounded-lg border border-slate-200 bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 sm:inline-block">
                  ⌘K
                </span>
              </label>

              {isSearchFocused && (searchQuery ? (
                <div className="absolute top-full left-0 z-50 mt-2.5 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 p-2 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95 w-full sm:min-w-[340px]">
                  {filteredCourses.length > 0 ? (
                    <ul className="flex max-h-80 flex-col overflow-y-auto space-y-1">
                      {filteredCourses.map((course) => (
                        <li key={course.id}>
                          <button
                            type="button"
                            className="group/item flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-slate-700 transition-all duration-300 hover:scale-[1.015] hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-violet-500/10 hover:text-cyan-700 dark:text-slate-300 dark:hover:from-cyan-500/20 dark:hover:to-violet-500/20 dark:hover:text-cyan-300"
                            onClick={() => {
                              setSearchQuery(course.title);
                              router.push(`/courses/${course.id}`);
                            }}
                          >
                            <Search size={14} className="text-slate-400 shrink-0 transition-all duration-300 group-hover/item:scale-110 group-hover/item:text-cyan-500" />
                            <span className="truncate font-semibold">{course.title}</span>
                            <span className="ml-auto rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                              {course.status}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-4 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
                      No results found for "{searchQuery}"
                    </div>
                  )}
                </div>
              ) : recentSearches.length > 0 && (
                <div className="absolute top-full left-0 z-50 mt-2.5 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 p-2 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95 w-full sm:min-w-[340px]">
                  <div className="px-3 py-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Recent Searches
                  </div>
                  <ul className="flex max-h-48 flex-col overflow-y-auto space-y-1">
                    {recentSearches.map((term, i) => (
                      <li key={i}>
                        <button
                          type="button"
                          className="group/item flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 transition-all duration-300 hover:scale-[1.015] hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-violet-500/10 hover:text-cyan-700 dark:text-slate-300 dark:hover:from-cyan-500/20 dark:hover:to-violet-500/20 dark:hover:text-cyan-300"
                          onClick={() => {
                            setSearchQuery(term);
                          }}
                        >
                          <Search size={14} className="text-slate-400 shrink-0 transition-all duration-300 group-hover/item:scale-110 group-hover/item:text-cyan-500" />
                          <span className="truncate">{term}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Optimize Button HUD */}
            <button
              type="button"
              onClick={handleOptimize}
              disabled={isOptimizing}
              className="group/opt relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-[0_0_25px_rgba(139,92,246,0.45)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-gradient-to-r hover:from-cyan-500 hover:via-indigo-600 hover:to-violet-600 hover:shadow-[0_15px_35px_rgba(6,182,212,0.7)] active:scale-95 disabled:opacity-75"
            >
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 opacity-0 transition-opacity duration-300 group-hover/opt:opacity-100" />
              {isOptimizing ? (
                <Loader2 size={17} className="animate-spin" />
              ) : (
                <Sparkles size={17} className="transition-transform duration-300 group-hover/opt:rotate-12 group-hover/opt:scale-125" />
              )}
              <span>{isOptimizing ? 'Optimizing...' : 'Optimize'}</span>
            </button>
          </div>
        </div>
      </header>

      <Suspense fallback={<LoadingSkeletons />}>
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="flex min-w-0 flex-col gap-6">
            <HeroTile userName={firstName} streakDays={12} />
            <MetricStrip metrics={metrics} />
            <CoursesGrid courses={filteredCourses} onContinue={handleContinueCourse} />
          </div>

          <aside className="flex min-w-0 flex-col gap-6">
            <ActivityTile />
            <PriorityPanel priorities={priorities} />
            <motion.section 
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group/milestone relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white via-emerald-50/40 to-slate-50/90 p-5 shadow-[0_15px_40px_-15px_rgba(16,185,129,0.12)] transition-all duration-500 hover:-translate-y-2 hover:scale-[1.012] hover:border-emerald-400/90 hover:shadow-[0_32px_85px_-15px_rgba(16,185,129,0.38),0_0_42px_-5px_rgba(20,184,166,0.24)] dark:border-slate-800/80 dark:from-slate-900 dark:via-emerald-950/25 dark:to-slate-950 dark:hover:border-emerald-400/80 sm:p-6"
            >
              {/* Ambient Radial Auroras */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-emerald-500/15 blur-3xl transition-all duration-700 group-hover/milestone:scale-150 group-hover/milestone:opacity-100 dark:bg-emerald-500/25" />
              <div className="pointer-events-none absolute -bottom-16 -left-16 h-52 w-52 rounded-full bg-teal-500/15 blur-3xl transition-all duration-700 group-hover/milestone:scale-150 group-hover/milestone:opacity-100 dark:bg-teal-500/20" />

              {/* Top Luminous Border Beam */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/80 via-teal-500/80 to-transparent shadow-[0_0_15px_rgba(16,185,129,0.8)] transition-all duration-500 group-hover/milestone:h-[3px] group-hover/milestone:shadow-[0_0_30px_rgba(16,185,129,1)]" />

              {/* Header Strip */}
              <div className="relative z-10 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/40 bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-transparent text-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.22)] backdrop-blur-md transition-all duration-300 group-hover/milestone:scale-110 group-hover/milestone:rotate-6 dark:border-emerald-400/30 dark:text-emerald-400">
                    <GraduationCap size={22} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                        Next milestone
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-700 shadow-2xs dark:border-emerald-400/30 dark:text-emerald-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Target Badge
                      </span>
                    </div>
                    <h3 className="mt-1 text-lg font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-xl">
                      Frontend Architecture badge
                    </h3>
                  </div>
                </div>
              </div>

              {/* Progress & Stat Strip */}
              <div className="relative z-10 mt-6 rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-inner backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Remaining Work
                    </span>
                    <div className="mt-1 flex items-baseline gap-2">
                      <motion.span 
                        key={tasksRemaining}
                        initial={{ scale: 1.4 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 bg-clip-text text-4xl font-black text-transparent dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400"
                      >
                        {tasksRemaining}
                      </motion.span>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        tasks remaining
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-gradient-to-r from-emerald-500/15 to-teal-500/15 px-3 py-1.5 text-xs font-bold text-emerald-700 shadow-xs dark:border-emerald-400/30 dark:text-emerald-300">
                    <TrendingUp size={15} className="text-emerald-500" />
                    <span>On pace</span>
                  </div>
                </div>

                {/* Animated progress bar toward badge completion */}
                <div className="mt-4 border-t border-slate-200/60 pt-3 dark:border-slate-800/60">
                  <div className="mb-1.5 flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    <span>Milestone Completion</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">75%</span>
                  </div>
                  <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-400 shadow-[0_0_12px_rgba(16,185,129,0.6)]"
                    />
                  </div>
                </div>
              </div>
            </motion.section>
          </aside>
        </div>
      </Suspense>
    </div>
  );
}
