'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Clock,
  PlayCircle,
  BookOpen,
  Code,
  Database,
  Palette,
  Rocket
} from 'lucide-react';
import { initialCourses } from '@/lib/mockData';
import { ProgressIndicator } from '@/components/ProgressIndicator';

function CourseIcon({ iconName, size = 24 }: { iconName: string, size?: number }) {
  switch (iconName) {
    case 'BookOpen': return <BookOpen size={size} />;
    case 'Code': return <Code size={size} />;
    case 'Database': return <Database size={size} />;
    case 'Palette': return <Palette size={size} />;
    default: return <Rocket size={size} />;
  }
}

export default function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  
  const courseData = initialCourses.find(c => c.id === id);
  const [course, setCourse] = useState(courseData);

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8 text-center text-slate-600 dark:text-slate-400">
        <div>
          <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-slate-100">Course not found</h2>
          <button onClick={() => router.push('/')} className="primary-button">
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleToggleModule = (moduleId: string) => {
    setCourse(prev => {
      if (!prev) return prev;
      const updatedModules = prev.modules.map(m => 
        m.id === moduleId ? { ...m, completed: !m.completed } : m
      );
      const completedCount = updatedModules.filter(m => m.completed).length;
      const newProgress = Math.round((completedCount / updatedModules.length) * 100);
      
      return {
        ...prev,
        modules: updatedModules,
        progress: newProgress
      };
    });
  };

  const accentColors: Record<string, string> = {
    cyan: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.15)]',
    violet: 'text-violet-400 bg-violet-400/10 border-violet-400/30 shadow-[0_0_15px_rgba(139,92,246,0.15)]',
    emerald: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30 shadow-[0_0_15px_rgba(52,211,153,0.15)]',
    amber: 'text-amber-400 bg-amber-400/10 border-amber-400/30 shadow-[0_0_15px_rgba(251,191,36,0.15)]',
  };

  const currentAccent = accentColors[course.accent] || accentColors.cyan;

  return (
    <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-6 px-4 py-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <button
          onClick={() => router.push('/')}
          className="group flex w-fit items-center gap-2 rounded-lg py-2 pl-2 pr-4 text-sm font-medium text-slate-600 dark:text-slate-400 transition-colors hover:bg-slate-100 dark:bg-slate-800/50 hover:text-slate-900 dark:text-slate-100"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back to Dashboard
        </button>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_400px]">
        {/* Main Content Area */}
        <div className="flex min-w-0 flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="dashboard-panel p-6 sm:p-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border ${currentAccent}`}>
                <CourseIcon iconName={course.icon_name} size={32} />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-md border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 px-2 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 backdrop-blur-md">
                    {course.status}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                    <Clock size={14} />
                    {course.duration}
                  </span>
                </div>
                <h1 className="mt-3 text-3xl font-semibold tracking-normal text-slate-900 dark:text-slate-50 md:text-4xl">
                  {course.title}
                </h1>
                <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400 leading-relaxed">
                  {course.description}
                </p>
                <div className="mt-4 text-sm text-slate-900 dark:text-slate-500">
                  Instructor: <span className="font-medium text-slate-700 dark:text-slate-300">{course.instructor}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Video Player Placeholder */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="dashboard-panel aspect-video w-full overflow-hidden relative group cursor-pointer border-slate-300 dark:border-slate-700/50"
          >
            <div className="absolute inset-0 bg-white dark:bg-slate-900/80 flex items-center justify-center transition-colors group-hover:bg-white dark:bg-slate-900/60 z-10">
              <div className="h-20 w-20 rounded-full bg-cyan-500/20 flex items-center justify-center backdrop-blur-sm border border-cyan-400/30 transition-transform group-hover:scale-110">
                <PlayCircle size={40} className="text-cyan-400 ml-1" />
              </div>
            </div>
            {/* Mock abstract background for the video */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950 opacity-50" />
            <div className="absolute inset-0" style={{ 
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.1) 0%, transparent 50%)' 
            }} />
          </motion.div>
        </div>

        {/* Sidebar */}
        <aside className="flex min-w-0 flex-col gap-6">
          <motion.section 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="dashboard-panel p-6"
          >
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Course Progress</h2>
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">{course.progress}% Completed</span>
                <span className="font-medium text-slate-900 dark:text-slate-100">{course.progress === 100 ? 'Done' : 'In Progress'}</span>
              </div>
              <ProgressIndicator progress={course.progress} size="large" />
            </div>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="dashboard-panel flex-1 p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Curriculum</h2>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">{course.modules.length} items</span>
            </div>
            
            <div className="space-y-3">
              {course.modules.map((module, idx) => (
                <button
                  key={module.id}
                  onClick={() => handleToggleModule(module.id)}
                  className={`w-full flex items-start gap-4 rounded-xl border p-4 text-left transition-all duration-300 hover:scale-[1.02] ${
                    module.completed 
                      ? 'border-emerald-400/20 bg-emerald-400/5' 
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:bg-slate-800'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {module.completed ? (
                      <CheckCircle2 size={20} className="text-emerald-400" />
                    ) : (
                      <Circle size={20} className="text-slate-600" />
                    )}
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${module.completed ? 'text-slate-700 dark:text-slate-300' : 'text-slate-800 dark:text-slate-200'}`}>
                      {idx + 1}. {module.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-900 dark:text-slate-500">
                      {module.completed ? 'Completed' : 'Pending'}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </motion.section>
        </aside>
      </div>
    </div>
  );
}
