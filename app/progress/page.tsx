import { BarChart2, Clock, Trophy, Target, Zap, ChevronRight, BookOpen } from 'lucide-react';

export default function ProgressPage() {
  const stats = [
    { label: 'Total Hours', value: '124.5', icon: Clock, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Courses Completed', value: '12', icon: BookOpen, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Average Score', value: '94%', icon: Target, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { label: 'Current Streak', value: '7 Days', icon: Zap, color: 'text-amber-400', bg: 'bg-amber-400/10' },
  ];

  const skills = [
    { name: 'Frontend Development', progress: 85, color: 'bg-blue-500' },
    { name: 'Backend Architecture', progress: 65, color: 'bg-purple-500' },
    { name: 'UI/UX Design', progress: 92, color: 'bg-emerald-500' },
    { name: 'DevOps & CI/CD', progress: 45, color: 'bg-amber-500' },
  ];

  const achievements = [
    { title: 'React Master', date: '2 days ago', description: 'Completed Advanced React Patterns course' },
    { title: 'Fast Learner', date: '1 week ago', description: 'Finished 5 modules in a single day' },
    { title: 'Perfect Score', date: '2 weeks ago', description: 'Achieved 100% on the TypeScript assessment' },
  ];

  return (
    <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-6 px-4 py-4 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="dashboard-panel flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-2 rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 text-cyan-300">
              <BarChart2 size={14} />
              Progress
            </span>
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-normal text-slate-900 dark:text-slate-50 md:text-4xl">
            Performance & Stats
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 md:text-base">
            Detailed analytics and learning metrics to track your journey.
          </p>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="dashboard-panel p-5 flex items-center gap-4 hover:border-slate-300 dark:border-slate-700/50 transition-colors">
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skills Breakdown */}
        <div className="dashboard-panel p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Skill Progression</h2>
            <button className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors">
              View All <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-6">
            {skills.map((skill, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-slate-800 dark:text-slate-200">{skill.name}</span>
                  <span className="text-slate-600 dark:text-slate-400">{skill.progress}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${skill.color} rounded-full transition-all duration-1000 ease-out`} 
                    style={{ width: `${skill.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="dashboard-panel p-6">
          <div className="flex items-center gap-2 mb-6">
            <Trophy size={20} className="text-yellow-400" />
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Recent Achievements</h2>
          </div>
          <div className="space-y-4">
            {achievements.map((achievement, i) => (
              <div key={i} className="relative pl-4 border-l-2 border-slate-300 dark:border-slate-700 pb-4 last:border-0 last:pb-0">
                <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-cyan-400 ring-4 ring-slate-900" />
                <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">{achievement.title}</h4>
                <p className="text-xs text-slate-900 dark:text-slate-500 mt-1">{achievement.date}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
