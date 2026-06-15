import { Bell, Info, AlertTriangle, CheckCircle, Clock, Calendar, Check, X } from 'lucide-react';

export default function AlertsPage() {
  const alerts = [
    {
      id: 1,
      title: 'Upcoming Assignment Deadline',
      description: 'Your Advanced React Patterns final project is due in 24 hours.',
      time: '2 hours ago',
      type: 'warning',
      icon: AlertTriangle,
      read: false,
    },
    {
      id: 2,
      title: 'Course Completed',
      description: 'Congratulations! You have successfully completed the UI/UX Fundamentals course.',
      time: '5 hours ago',
      type: 'success',
      icon: CheckCircle,
      read: false,
    },
    {
      id: 3,
      title: 'System Maintenance',
      description: 'The platform will be undergoing scheduled maintenance on Sunday at 2 AM EST.',
      time: '1 day ago',
      type: 'info',
      icon: Info,
      read: true,
    },
    {
      id: 4,
      title: 'New Course Available',
      description: 'A new course "Introduction to Next.js 14" has been added to your learning path.',
      time: '2 days ago',
      type: 'default',
      icon: Bell,
      read: true,
    },
    {
      id: 5,
      title: 'Live Workshop Reminder',
      description: 'Don\'t forget about the live Q&A session with your instructor starting in 30 minutes.',
      time: '3 days ago',
      type: 'info',
      icon: Calendar,
      read: true,
    }
  ];

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'warning':
        return { bg: 'bg-amber-400/10', border: 'border-amber-500/30', text: 'text-amber-400', icon: 'text-amber-400' };
      case 'success':
        return { bg: 'bg-emerald-400/10', border: 'border-emerald-500/30', text: 'text-emerald-400', icon: 'text-emerald-400' };
      case 'info':
        return { bg: 'bg-blue-400/10', border: 'border-blue-500/30', text: 'text-blue-400', icon: 'text-blue-400' };
      default:
        return { bg: 'bg-slate-400/10', border: 'border-slate-500/30', text: 'text-slate-300', icon: 'text-slate-400' };
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-6 px-4 py-4 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="dashboard-panel flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
            <span className="flex items-center gap-2 rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 text-cyan-300">
              <Bell size={14} />
              Alerts
            </span>
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-normal text-slate-50 md:text-4xl">
            Notifications
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 md:text-base">
            Stay updated with priority events, deadlines, and messages.
          </p>
        </div>
        <div className="flex items-center gap-3 mt-4 lg:mt-0">
          <button className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white">
            <Check size={16} />
            Mark all as read
          </button>
        </div>
      </header>

      <div className="dashboard-panel p-6">
        <div className="flex flex-col gap-4">
          {alerts.map((alert) => {
            const styles = getTypeStyles(alert.type);
            return (
              <div 
                key={alert.id} 
                className={`group relative flex flex-col sm:flex-row gap-4 rounded-xl border border-slate-700/50 bg-slate-800/20 p-5 transition-all hover:bg-slate-800/50 hover:border-slate-600 ${!alert.read ? 'before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-12 before:w-1 before:rounded-r-md before:bg-cyan-400' : ''}`}
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border ${styles.bg} ${styles.border}`}>
                  <alert.icon size={20} className={styles.icon} />
                </div>
                
                <div className="flex flex-1 flex-col justify-center">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className={`font-semibold ${!alert.read ? 'text-slate-100' : 'text-slate-300'}`}>
                      {alert.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock size={12} />
                      <span>{alert.time}</span>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-slate-400">
                    {alert.description}
                  </p>
                </div>

                <div className="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100 sm:static sm:opacity-100 flex items-center justify-end sm:w-12">
                  <button className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-700/50 hover:text-slate-300 transition-colors">
                    <X size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
