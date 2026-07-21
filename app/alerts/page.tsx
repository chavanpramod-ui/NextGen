'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  Bell, 
  Info, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Check, 
  X, 
  Sparkles, 
  Filter, 
  CheckCheck, 
  ArrowRight, 
  BookOpen, 
  ShieldAlert, 
  SlidersHorizontal,
  Trash2
} from 'lucide-react';

interface AlertItem {
  id: number;
  title: string;
  description: string;
  time: string;
  type: 'warning' | 'success' | 'info' | 'course' | 'event';
  icon: any;
  read: boolean;
  actionText?: string;
  actionHref?: string;
  category: 'urgent' | 'system' | 'learning';
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<AlertItem[]>([
    {
      id: 1,
      title: 'Upcoming Assignment Deadline',
      description: 'Your Advanced React Patterns final project is due in 24 hours. Make sure all unit tests pass before final submission.',
      time: '2 hours ago',
      type: 'warning',
      icon: AlertTriangle,
      read: false,
      actionText: 'Submit Project Now',
      actionHref: '/courses',
      category: 'urgent',
    },
    {
      id: 2,
      title: 'Course Mastery Certificate Unlocked',
      description: 'Congratulations! You have successfully completed the UI/UX Fundamentals course with a 98% distinction score.',
      time: '5 hours ago',
      type: 'success',
      icon: CheckCircle2,
      read: false,
      actionText: 'View & Share Certificate',
      actionHref: '/progress',
      category: 'learning',
    },
    {
      id: 3,
      title: 'Scheduled Platform Maintenance & Upgrades',
      description: 'NextGen Learn will be undergoing high-speed database optimization and CDN upgrades this Sunday at 2 AM EST (approx. 45 min).',
      time: '1 day ago',
      type: 'info',
      icon: Info,
      read: true,
      category: 'system',
    },
    {
      id: 4,
      title: 'New Interactive Track Added: Next.js 16 & Turbopack',
      description: 'A brand-new 14-module architectural deep dive has been personalized and added to your active learning path.',
      time: '2 days ago',
      type: 'course',
      icon: BookOpen,
      read: true,
      actionText: 'Explore Syllabus',
      actionHref: '/courses',
      category: 'learning',
    },
    {
      id: 5,
      title: 'Live Q&A Workshop & Architecture Review',
      description: 'Don\'t forget about the live mentor session with Principal Cloud Architect starting in 30 minutes in Room 4B.',
      time: '3 days ago',
      type: 'event',
      icon: Calendar,
      read: true,
      actionText: 'Join Live Stream',
      actionHref: '/courses',
      category: 'learning',
    }
  ]);

  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'urgent' | 'learning' | 'system'>('all');

  const unreadCount = alerts.filter(a => !a.read).length;

  const filteredAlerts = alerts.filter(alert => {
    if (activeTab === 'unread') return !alert.read;
    if (activeTab === 'urgent') return alert.category === 'urgent';
    if (activeTab === 'learning') return alert.category === 'learning';
    if (activeTab === 'system') return alert.category === 'system';
    return true;
  });

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, read: true })));
  };

  const toggleRead = (id: number) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: !a.read } : a));
  };

  const dismissAlert = (id: number) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const getTypeStyles = (type: AlertItem['type']) => {
    switch (type) {
      case 'warning':
        return {
          gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
          border: 'border-amber-400/30 dark:border-amber-400/20',
          iconBg: 'bg-gradient-to-br from-amber-400 to-orange-600 text-white shadow-[0_0_15px_rgba(251,191,36,0.4)]',
          badgeBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-300 border-amber-400/20',
          badgeText: 'Action Required',
          pillColor: 'bg-amber-500/15 text-amber-700 dark:text-amber-200 border-amber-400/30 hover:bg-amber-500/25'
        };
      case 'success':
        return {
          gradient: 'from-teal-500/20 via-emerald-500/10 to-transparent',
          border: 'border-emerald-400/30 dark:border-emerald-400/20',
          iconBg: 'bg-gradient-to-br from-teal-400 to-emerald-600 text-white shadow-[0_0_15px_rgba(52,211,153,0.4)]',
          badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-400/20',
          badgeText: 'Achievement',
          pillColor: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-200 border-emerald-400/30 hover:bg-emerald-500/25'
        };
      case 'course':
        return {
          gradient: 'from-violet-500/20 via-purple-500/10 to-transparent',
          border: 'border-violet-400/30 dark:border-violet-400/20',
          iconBg: 'bg-gradient-to-br from-violet-400 to-purple-600 text-white shadow-[0_0_15px_rgba(167,139,250,0.4)]',
          badgeBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-300 border-purple-400/20',
          badgeText: 'New Track',
          pillColor: 'bg-purple-500/15 text-purple-700 dark:text-purple-200 border-purple-400/30 hover:bg-purple-500/25'
        };
      case 'event':
        return {
          gradient: 'from-sky-500/20 via-blue-500/10 to-transparent',
          border: 'border-sky-400/30 dark:border-sky-400/20',
          iconBg: 'bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-[0_0_15px_rgba(56,189,248,0.4)]',
          badgeBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-300 border-sky-400/20',
          badgeText: 'Live Workshop',
          pillColor: 'bg-sky-500/15 text-sky-700 dark:text-sky-200 border-sky-400/30 hover:bg-sky-500/25'
        };
      default:
        return {
          gradient: 'from-blue-500/15 via-slate-500/5 to-transparent',
          border: 'border-slate-300/80 dark:border-white/10',
          iconBg: 'bg-gradient-to-br from-blue-400 to-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]',
          badgeBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-300 border-blue-400/20',
          badgeText: 'System Notice',
          pillColor: 'bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-white/15 hover:bg-slate-200 dark:hover:bg-white/15'
        };
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 320, damping: 26 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto flex w-full max-w-[1550px] flex-col gap-6 px-4 py-4 sm:px-6 lg:px-8"
    >
      {/* Soft & Elevated Hero Banner */}
      <motion.header 
        variants={itemVariants}
        className="relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-white/10 bg-gradient-to-r from-white/90 via-slate-50/90 to-sky-50/80 dark:from-[#0c1222]/90 dark:via-[#0f172a]/90 dark:to-[#111827]/90 p-6 sm:p-8 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.4)] backdrop-blur-3xl"
      >
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-sky-400/20 via-indigo-500/15 to-purple-500/10 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 -bottom-24 h-48 w-48 rounded-full bg-gradient-to-tr from-teal-400/15 to-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-600 dark:text-sky-300 shadow-2xs">
                <Sparkles size={14} className="text-sky-500 animate-pulse" />
                Notification Center & Soft Theme
              </span>
              {unreadCount > 0 ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />
                  {unreadCount} Unread Priority Alert{unreadCount > 1 ? 's' : ''}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-300">
                  <CheckCircle2 size={13} />
                  All caught up
                </span>
              )}
            </div>

            <h1 className="mt-3.5 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
              Activity & <span className="bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">Alert Feed</span>
            </h1>
            <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
              Stay synchronized with your course deadlines, verified certificates, mentor feedback, and platform upgrades in real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="inline-flex items-center gap-2 rounded-2xl border border-sky-400/30 bg-sky-500/10 hover:bg-sky-500/20 dark:bg-sky-400/15 dark:hover:bg-sky-400/25 px-5 py-3 text-sm font-semibold text-sky-600 dark:text-sky-200 shadow-sm transition-all active:scale-95"
              >
                <CheckCheck size={17} className="text-sky-500" />
                Mark all as read
              </button>
            )}
            <button 
              onClick={() => {
                if (confirm('Clear all read notifications from your feed?')) {
                  setAlerts(prev => prev.filter(a => !a.read));
                }
              }}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300/80 dark:border-white/15 bg-white/80 dark:bg-white/5 px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-all active:scale-95"
              title="Clear read alerts"
            >
              <Trash2 size={16} />
              Clear Read
            </button>
          </div>
        </div>
      </motion.header>

      {/* Interactive Tabs & Filter Bar */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#0c1222]/80 p-3 sm:px-5 sm:py-3.5 shadow-sm backdrop-blur-2xl"
      >
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: `All Alerts (${alerts.length})` },
            { id: 'unread', label: `Unread (${unreadCount})` },
            { id: 'urgent', label: 'Deadlines' },
            { id: 'learning', label: 'Courses & XP' },
            { id: 'system', label: 'System' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-[0_4px_15px_-2px_rgba(14,165,233,0.4)] scale-[1.02]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pl-2 sm:pl-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200/60 dark:border-white/10">
          <SlidersHorizontal size={14} className="text-sky-500 shrink-0" />
          <span>Showing <strong className="text-slate-800 dark:text-slate-200">{filteredAlerts.length}</strong> notification{filteredAlerts.length !== 1 ? 's' : ''}</span>
        </div>
      </motion.div>

      {/* Soft Glass Notifications Feed */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredAlerts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#0c1222]/80 p-12 text-center shadow-sm backdrop-blur-2xl flex flex-col items-center justify-center gap-4"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-sky-500/10 text-sky-500 border border-sky-400/20 shadow-sm">
                <Bell size={32} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">No notifications found</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                  There are currently no notifications matching this filter view. Check back soon for new learning milestones!
                </p>
              </div>
              {activeTab !== 'all' && (
                <button
                  onClick={() => setActiveTab('all')}
                  className="mt-2 text-xs font-semibold text-sky-600 dark:text-sky-400 underline underline-offset-4 hover:text-sky-500"
                >
                  Reset filters and view all
                </button>
              )}
            </motion.div>
          ) : (
            filteredAlerts.map((alert) => {
              const styles = getTypeStyles(alert.type);
              const Icon = alert.icon;

              return (
                <motion.div
                  key={alert.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                  whileHover={{ y: -3 }}
                  onClick={() => toggleRead(alert.id)}
                  className={`group relative overflow-hidden rounded-3xl border ${
                    !alert.read 
                      ? 'border-sky-400/50 dark:border-sky-400/40 bg-white/95 dark:bg-[#0e1628]/95 shadow-[0_15px_35px_-10px_rgba(14,165,233,0.12)] dark:shadow-[0_15px_35px_-10px_rgba(14,165,233,0.3)]' 
                      : 'border-slate-200/80 dark:border-white/10 bg-white/75 dark:bg-[#0c1222]/70 shadow-[0_10px_25px_-10px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_25px_-10px_rgba(0,0,0,0.3)]'
                  } p-6 backdrop-blur-2xl transition-all duration-300 cursor-pointer`}
                >
                  {/* Subtle Gradient Hover Aura */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                  {/* Left Accent Glow for Unread */}
                  {!alert.read && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-sky-400 via-blue-500 to-indigo-500 shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
                  )}

                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 relative z-10">
                    <div className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl ${styles.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                      <Icon size={26} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${styles.badgeBg}`}>
                            {styles.badgeText}
                          </span>
                          {!alert.read && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-sky-600 dark:text-sky-300 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-400/20">
                              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
                              New
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                            <Clock size={12} className="text-slate-400" />
                            {alert.time}
                          </span>

                          <button 
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              dismissAlert(alert.id);
                            }}
                            title="Dismiss notification"
                            className="h-8 w-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors shrink-0"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>

                      <h3 className={`mt-2 text-base font-bold ${!alert.read ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'} group-hover:text-sky-500 dark:group-hover:text-sky-300 transition-colors`}>
                        {alert.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        {alert.description}
                      </p>

                      {/* Optional Action Pill */}
                      {alert.actionText && (
                        <div className="mt-4 flex items-center gap-3">
                          <a
                            href={alert.actionHref || '#'}
                            onClick={(e) => e.stopPropagation()}
                            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${styles.pillColor}`}
                          >
                            <span>{alert.actionText}</span>
                            <ArrowRight size={14} />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
