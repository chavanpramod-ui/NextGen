'use client';

import { Suspense, useState, useMemo } from 'react';
import {
  ArrowUpRight,
  CalendarCheck,
  Clock3,
  Cpu,
  GraduationCap,
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

const initialCourses = [
  {
    id: '1',
    title: 'Advanced React Patterns',
    progress: 75,
    icon_name: 'Code',
    status: 'In progress',
    duration: '8 modules',
    accent: 'cyan',
  },
  {
    id: '2',
    title: 'TypeScript Deep Dive',
    progress: 45,
    icon_name: 'BookOpen',
    status: 'Next sprint',
    duration: '12 lessons',
    accent: 'violet',
  },
  {
    id: '3',
    title: 'Database Design',
    progress: 60,
    icon_name: 'Database',
    status: 'Practice',
    duration: '6 labs',
    accent: 'emerald',
  },
  {
    id: '4',
    title: 'UI/UX Principles',
    progress: 85,
    icon_name: 'Palette',
    status: 'Review',
    duration: '4 projects',
    accent: 'amber',
  },
];

const initialMetrics = [
  { label: 'Focus score', value: '94%', detail: '+12% this week', icon: Target },
  { label: 'Study time', value: '18.5h', detail: '4h 20m today', icon: Clock3 },
  { label: 'Completed', value: '27', detail: 'certified skills', icon: ShieldCheck },
];

const initialPriorities = [
  { title: 'Ship portfolio case study', time: 'Today, 4:30 PM', tone: 'High' },
  { title: 'Database schema checkpoint', time: 'Tomorrow, 10:00 AM', tone: 'Medium' },
  { title: 'Design critique recap', time: 'Friday, 2:00 PM', tone: 'Low' },
];

function MetricStrip({ metrics }: { metrics: typeof initialMetrics }) {
  return (
    <section className="grid gap-3 md:grid-cols-3" aria-label="Learning metrics">
      {metrics.map((metric) => {
        const Icon = metric.icon;

        return (
          <article key={metric.label} className="dashboard-panel p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {metric.label}
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-50">{metric.value}</p>
                <p className="mt-1 text-sm text-slate-400">{metric.detail}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-cyan-300">
                <Icon size={18} />
              </div>
            </div>
          </article>
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
          <p className="text-xs font-medium uppercase tracking-wide text-cyan-300">
            Mission control
          </p>
          <h2 className="mt-2 text-lg font-semibold text-slate-50">Priority queue</h2>
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
          <div
            key={item.title}
            className="flex items-center justify-between gap-4 rounded-lg border border-slate-800 bg-slate-950/60 p-3"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-100">{item.title}</p>
              <p className="mt-1 text-xs text-slate-500">{item.time}</p>
            </div>
            <span className="rounded-md border border-slate-700 px-2 py-1 text-xs font-medium text-slate-300">
              {item.tone}
            </span>
          </div>
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
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Active tracks
          </p>
          <h2 id="courses-heading" className="mt-1 text-xl font-semibold text-slate-50">
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

  const filteredCourses = useMemo(() => {
    return courses.filter((course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [courses, searchQuery]);

  const handleContinueCourse = (id: string) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, progress: Math.min(100, c.progress + 5) } : c
      )
    );
  };

  const handleOptimize = () => {
    // Shuffle priorities to simulate optimization
    setPriorities((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-slate-100">
      <div className="dashboard-shell">
        <Sidebar />

        <main className="min-w-0 flex-1">
          <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-6 px-4 py-4 sm:px-6 lg:px-8">
            <header className="dashboard-panel flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
                  <span className="flex items-center gap-2 rounded-md border border-cyan-400/20 bg-cyan-400/10 px-2 py-1 text-cyan-200">
                    <Cpu size={14} />
                    Next-Gen Dashboard
                  </span>
                  <span className="flex items-center gap-2">
                    <CalendarCheck size={15} />
                    Thursday, Jun 4
                  </span>
                </div>
                <h1 className="mt-3 text-3xl font-semibold tracking-normal text-slate-50 md:text-4xl">
                  Student command center
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 md:text-base">
                  Track progress, choose the next action, and keep every learning signal in one focused workspace.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <label className="search-control">
                  <Search size={17} className="text-slate-500" />
                  <span className="sr-only">Search dashboard</span>
                  <input
                    type="search"
                    placeholder="Search courses"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </label>
                <button type="button" className="primary-button" onClick={handleOptimize}>
                  <Sparkles size={17} />
                  Optimize
                </button>
              </div>
            </header>

            <Suspense fallback={<LoadingSkeletons />}>
              <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
                <div className="flex min-w-0 flex-col gap-6">
                  <HeroTile userName="Alex" streakDays={12} />
                  <MetricStrip metrics={metrics} />
                  <CoursesGrid courses={filteredCourses} onContinue={handleContinueCourse} />
                </div>

                <aside className="flex min-w-0 flex-col gap-6">
                  <ActivityTile />
                  <PriorityPanel priorities={priorities} />
                  <section className="dashboard-panel p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                        <GraduationCap size={19} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-100">Next milestone</p>
                        <p className="text-xs text-slate-500">Frontend Architecture badge</p>
                      </div>
                    </div>
                    <div className="mt-5 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-3xl font-semibold text-slate-50">3</p>
                        <p className="text-sm text-slate-400">tasks remaining</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm font-medium text-emerald-300">
                        <TrendingUp size={16} />
                        On pace
                      </div>
                    </div>
                  </section>
                </aside>
              </div>
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}
