'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Search, ArrowUpRight, Target, Filter } from 'lucide-react';
import { CourseTile } from '@/components/CourseTile';

const activeCourses = [
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
    title: 'UI/UX Principles',
    progress: 85,
    icon_name: 'Palette',
    status: 'Review',
    duration: '4 projects',
    accent: 'amber',
  },
];

const recommendedCourses = [
  {
    id: '4',
    title: 'Fullstack Next.js 14',
    progress: 0,
    icon_name: 'Rocket',
    status: 'Not started',
    duration: '10 modules',
    accent: 'emerald',
  },
  {
    id: '5',
    title: 'Database Design Architecture',
    progress: 0,
    icon_name: 'Database',
    status: 'Not started',
    duration: '6 labs',
    accent: 'violet',
  },
  {
    id: '6',
    title: 'Advanced State Management',
    progress: 0,
    icon_name: 'Code',
    status: 'Not started',
    duration: '5 modules',
    accent: 'cyan',
  },
  {
    id: '7',
    title: 'Web Animation Techniques',
    progress: 0,
    icon_name: 'Palette',
    status: 'Not started',
    duration: '8 projects',
    accent: 'amber',
  },
];

export default function CoursesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [active, setActive] = useState(activeCourses);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleContinueCourse = (id: string) => {
    setActive((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, progress: Math.min(100, c.progress + 5) } : c
      )
    );
  };

  const filteredRecommended = recommendedCourses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const searchResults = [...activeCourses, ...recommendedCourses].filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-6 px-4 py-4 sm:px-6 lg:px-8">
      <header className="dashboard-panel flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-2 rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 text-cyan-300">
              <BookOpen size={14} />
              Courses
            </span>
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-normal text-slate-900 dark:text-slate-50 md:text-4xl">
            Learning Catalog
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 md:text-base">
            Explore available courses and manage your learning tracks.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div ref={searchContainerRef} className="relative z-50">
            <label className="search-control group">
              <Search size={17} className="text-slate-900 dark:text-slate-500 transition-colors group-focus-within:text-cyan-400" />
              <span className="sr-only">Search catalog</span>
              <input
                type="search"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full transition-all duration-300 sm:w-48 sm:focus:w-64"
              />
            </label>
            
            {isSearchFocused && searchQuery && (
              <div className="absolute top-full left-0 z-50 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white/95 p-2 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/95 w-full sm:min-w-[320px]">
                {searchResults.length > 0 ? (
                  <ul className="flex max-h-80 flex-col overflow-y-auto">
                    {searchResults.map((course) => (
                      <li key={course.id}>
                        <button
                          type="button"
                          className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-700 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-violet-500/10 hover:text-cyan-700 hover:shadow-md dark:text-slate-300 dark:hover:from-cyan-500/20 dark:hover:to-violet-500/20 dark:hover:text-cyan-300"
                          onClick={() => {
                            setSearchQuery(course.title);
                            setIsSearchFocused(false);
                            router.push(`/courses/${course.id}`);
                          }}
                        >
                          <Search size={14} className="text-slate-400 opacity-70 shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:text-cyan-500 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                          <span className="truncate font-medium">{course.title}</span>
                          <span className="ml-auto text-xs whitespace-nowrap text-slate-400 dark:text-slate-500 transition-colors duration-300 group-hover:text-cyan-600/70 dark:group-hover:text-cyan-400/70">{course.status}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-center text-sm text-slate-500 dark:text-slate-400">
                    No results found for "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>
          <button type="button" className="secondary-button" aria-label="Filter courses">
            <Filter size={17} />
            Filter
          </button>
        </div>
      </header>

      <div className="flex flex-col gap-8">
        <section 
          aria-labelledby="active-courses"
          className="group/sec relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white via-slate-50/95 to-slate-100/90 p-6 shadow-[0_18px_45px_-15px_rgba(6,182,212,0.12)] transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400/80 hover:shadow-[0_28px_65px_-12px_rgba(6,182,212,0.3)] dark:border-slate-800/80 dark:from-slate-900/95 dark:via-slate-900 dark:to-slate-950 dark:hover:border-cyan-400/60 sm:p-7"
        >
          {/* Ambient Radial Auroras */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl transition-all duration-700 group-hover/sec:scale-125 group-hover/sec:opacity-100 dark:bg-cyan-500/25" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/80 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.8)] transition-all duration-500 group-hover/sec:h-[3px]" />

          <div className="relative z-10 mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-cyan-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-cyan-700 shadow-xs backdrop-blur-md dark:border-cyan-400/30 dark:text-cyan-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                </span>
                In Progress
              </div>
              <h2 id="active-courses" className="mt-2 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                Pick up where you left off
              </h2>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-slate-300/80 bg-slate-100/90 px-3 py-1 text-xs font-bold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              <Target size={15} className="text-cyan-500" />
              <span>{active.length} active tracks</span>
            </div>
          </div>
          <div className="relative z-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {active.map((course, idx) => (
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
                onContinue={handleContinueCourse}
              />
            ))}
          </div>
        </section>

        <section 
          aria-labelledby="recommended-courses"
          className="group/sec2 relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white via-slate-50/95 to-slate-100/90 p-6 shadow-[0_18px_45px_-15px_rgba(16,185,129,0.12)] transition-all duration-500 hover:-translate-y-1 hover:border-emerald-400/80 hover:shadow-[0_28px_65px_-12px_rgba(16,185,129,0.3)] dark:border-slate-800/80 dark:from-slate-900/95 dark:via-slate-900 dark:to-slate-950 dark:hover:border-emerald-400/60 sm:p-7"
        >
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl transition-all duration-700 group-hover/sec2:scale-125 group-hover/sec2:opacity-100 dark:bg-emerald-500/25" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/80 to-transparent shadow-[0_0_15px_rgba(16,185,129,0.8)] transition-all duration-500 group-hover/sec2:h-[3px]" />

          <div className="relative z-10 mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 shadow-xs backdrop-blur-md dark:border-emerald-400/30 dark:text-emerald-300">
                Discover
              </div>
              <h2 id="recommended-courses" className="mt-2 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                Recommended for you
              </h2>
            </div>
            <button type="button" className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white px-3.5 py-1.5 text-xs font-bold text-emerald-600 shadow-2xs transition-all hover:scale-105 hover:border-emerald-400 dark:border-slate-800 dark:bg-slate-900 dark:text-emerald-400">
              <span>Browse all catalog</span>
              <ArrowUpRight size={15} />
            </button>
          </div>
          <div className="relative z-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {filteredRecommended.map((course, idx) => (
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
              />
            ))}
            {filteredRecommended.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-900 dark:text-slate-500 font-medium">
                No courses found matching your search.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
