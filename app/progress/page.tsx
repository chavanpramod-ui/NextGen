import { BarChart2 } from 'lucide-react';

export default function ProgressPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-6 px-4 py-4 sm:px-6 lg:px-8">
      <header className="dashboard-panel flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
            <span className="flex items-center gap-2 rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 text-cyan-300">
              <BarChart2 size={14} />
              Progress
            </span>
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-normal text-slate-50 md:text-4xl">
            Performance & Stats
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 md:text-base">
            Detailed analytics and learning metrics to track your journey.
          </p>
        </div>
      </header>

      <div className="dashboard-panel p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
        <BarChart2 size={48} className="text-slate-600 mb-4" />
        <h2 className="text-xl font-semibold text-slate-200">Analytics are syncing</h2>
        <p className="text-slate-400 mt-2 max-w-md">Your detailed performance charts and progression metrics will appear here once the data is processed.</p>
      </div>
    </div>
  );
}
