'use client';

import { useRouter } from 'next/navigation';

import { Suspense, useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  CalendarCheck,
  Clock3,
  Cpu,
  GraduationCap,
  Loader2,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
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
    <section className="grid gap-3 md:grid-cols-3" aria-label="Learning metrics">
      {metrics.map((metric, idx) => {
        const Icon = metric.icon;

        return (
          <motion.article 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            key={metric.label} 
            className="dashboard-panel p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-900 dark:text-slate-500">
                  {metric.label}
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-50">{metric.value}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{metric.detail}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
                <Icon size={18} />
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
    <section className="dashboard-panel p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-cyan-600 dark:text-cyan-400">
            Mission control
          </p>
          <h2 className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-50">Priority queue</h2>
        </div>
        <button
          type="button"
          className="icon-button"
          aria-label="Open priority queue"
          title="Open priority queue"
        >
          <ArrowUpRight size={18} />
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {priorities.map((item) => (
          <motion.div
            layout
            key={item.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="group flex items-center justify-between gap-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-3 transition-colors hover:border-slate-400 dark:border-slate-600 hover:bg-slate-100 dark:bg-slate-800/60"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100 transition-colors group-hover:text-cyan-600 dark:group-hover:text-cyan-100">{item.title}</p>
              <p className="mt-1 text-xs text-slate-900 dark:text-slate-500">{item.time}</p>
            </div>
            <span className={`rounded-md border px-2 py-1 text-xs font-medium ${
              item.tone === 'High' ? 'border-rose-400/30 text-rose-300 bg-rose-400/10' :
              item.tone === 'Medium' ? 'border-amber-400/30 text-amber-300 bg-amber-400/10' :
              'border-slate-400 dark:border-slate-600 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800'
            }`}>
              {item.tone}
            </span>
          </motion.div>
        ))}
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
  return (
    <section aria-labelledby="courses-heading">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-900 dark:text-slate-500">
            Active tracks
          </p>
          <h2 id="courses-heading" className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-50">
            Learning roadmap
          </h2>
        </div>
        <button type="button" className="secondary-button">
          View all
          <ArrowUpRight size={16} />
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {courses.map((course, idx) => (
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
      <header className="dashboard-panel flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-2 rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 text-cyan-700 dark:text-cyan-300">
              <Cpu size={14} />
              Next-Gen Dashboard
            </span>
            <span className="flex items-center gap-2">
              <CalendarCheck size={15} />
              Thursday, Jun 4
            </span>
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-normal text-slate-900 dark:text-slate-50 md:text-4xl">
            Student command center
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 md:text-base">
            Track progress, choose the next action, and keep every learning signal in one focused workspace.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative group">
            <label className="search-control flex items-center relative">
              <Search size={17} className="text-slate-900 dark:text-slate-500 transition-colors group-focus-within:text-cyan-400" />
              <span className="sr-only">Search dashboard</span>
              <input
                type="search"
                placeholder="Search courses"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearchSubmit();
                }}
                className="w-full transition-all duration-300 sm:w-48 sm:focus:w-64 bg-transparent outline-none"
              />
            </label>
            {isSearchFocused && recentSearches.length > 0 && (
              <div className="absolute top-full mt-2 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg z-50 overflow-hidden">
                <div className="px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider bg-slate-100 dark:bg-slate-800/50">
                  Recommended / Recent
                </div>
                <ul className="max-h-48 overflow-y-auto m-0 p-0 list-none">
                  {recentSearches.map((term, i) => (
                    <li key={i}>
                      <button
                        type="button"
                        className="w-full flex items-center px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:bg-slate-800 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                        onClick={() => {
                          setSearchQuery(term);
                          setIsSearchFocused(false);
                        }}
                      >
                        <Search size={14} className="mr-2 text-slate-900 dark:text-slate-500" />
                        {term}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button 
            type="button" 
            className="primary-button" 
            onClick={handleOptimize}
            disabled={isOptimizing}
          >
            {isOptimizing ? <Loader2 size={17} className="animate-spin" /> : <Sparkles size={17} />}
            {isOptimizing ? 'Optimizing...' : 'Optimize'}
          </button>
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
            <section className="dashboard-panel p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-400/30 bg-emerald-400/10 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.15)]">
                  <GraduationCap size={19} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Next milestone</p>
                  <p className="text-xs text-slate-900 dark:text-slate-500">Frontend Architecture badge</p>
                </div>
              </div>
              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <motion.p 
                    key={tasksRemaining}
                    initial={{ scale: 1.5, color: '#34d399' }}
                    animate={{ scale: 1, color: '#f8fafc' }}
                    className="text-3xl font-semibold"
                  >
                    {tasksRemaining}
                  </motion.p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">tasks remaining</p>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  <TrendingUp size={16} />
                  On pace
                </div>
              </div>
            </section>
          </aside>
        </div>
      </Suspense>
    </div>
  );
}
