'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  BarChart2, 
  Clock, 
  Trophy, 
  Target, 
  Zap, 
  ChevronRight, 
  BookOpen, 
  Sparkles, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  Flame,
  ArrowUpRight,
  Layers,
  Star
} from 'lucide-react';

export default function ProgressPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'frontend' | 'backend' | 'design'>('all');

  const stats = [
    { 
      label: 'Total Hours Learned', 
      value: '124.5', 
      unit: 'hrs',
      change: '+14.2% this month',
      trend: 'up',
      icon: Clock, 
      gradient: 'from-sky-500/20 via-blue-500/10 to-transparent',
      border: 'border-sky-400/30 dark:border-sky-400/20',
      iconBg: 'bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-[0_0_20px_rgba(56,189,248,0.4)]',
      textColor: 'text-sky-600 dark:text-sky-300'
    },
    { 
      label: 'Courses Completed', 
      value: '12', 
      unit: 'courses',
      change: '2 completed this week',
      trend: 'up',
      icon: BookOpen, 
      gradient: 'from-violet-500/20 via-purple-500/10 to-transparent',
      border: 'border-violet-400/30 dark:border-violet-400/20',
      iconBg: 'bg-gradient-to-br from-violet-400 to-purple-600 text-white shadow-[0_0_20px_rgba(167,139,250,0.4)]',
      textColor: 'text-violet-600 dark:text-violet-300'
    },
    { 
      label: 'Average Assessment Score', 
      value: '94', 
      unit: '%',
      change: '+4% vs top 10% peers',
      trend: 'up',
      icon: Target, 
      gradient: 'from-teal-500/20 via-emerald-500/10 to-transparent',
      border: 'border-emerald-400/30 dark:border-emerald-400/20',
      iconBg: 'bg-gradient-to-br from-teal-400 to-emerald-600 text-white shadow-[0_0_20px_rgba(52,211,153,0.4)]',
      textColor: 'text-emerald-600 dark:text-emerald-300'
    },
    { 
      label: 'Learning Streak', 
      value: '7', 
      unit: 'Days',
      change: 'Personal best: 14 days',
      trend: 'hot',
      icon: Flame, 
      gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
      border: 'border-amber-400/30 dark:border-amber-400/20',
      iconBg: 'bg-gradient-to-br from-amber-400 to-orange-600 text-white shadow-[0_0_20px_rgba(251,191,36,0.4)]',
      textColor: 'text-amber-600 dark:text-amber-300'
    },
  ];

  const skills = [
    { 
      name: 'Frontend Development & React 19', 
      category: 'frontend' as const,
      progress: 88, 
      level: 'Advanced Mastery',
      color: 'from-sky-400 via-blue-500 to-indigo-500', 
      glowColor: 'rgba(56,189,248,0.5)',
      badgeBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-300 border-sky-400/20',
      modules: '24/28 Modules'
    },
    { 
      name: 'Modern UI/UX Design & Systems', 
      category: 'design' as const,
      progress: 94, 
      level: 'Expert Level',
      color: 'from-teal-400 via-emerald-500 to-cyan-500', 
      glowColor: 'rgba(52,211,153,0.5)',
      badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-400/20',
      modules: '18/18 Modules'
    },
    { 
      name: 'Node.js & Microservices Architecture', 
      category: 'backend' as const,
      progress: 72, 
      level: 'Intermediate Proficient',
      color: 'from-violet-400 via-purple-500 to-fuchsia-500', 
      glowColor: 'rgba(168,85,247,0.5)',
      badgeBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-300 border-purple-400/20',
      modules: '15/22 Modules'
    },
    { 
      name: 'Cloud DevOps, Docker & CI/CD Pipelines', 
      category: 'backend' as const,
      progress: 58, 
      level: 'Active Learning',
      color: 'from-amber-400 via-orange-500 to-rose-500', 
      glowColor: 'rgba(251,146,60,0.5)',
      badgeBg: 'bg-orange-500/10 text-orange-600 dark:text-orange-300 border-orange-400/20',
      modules: '8/16 Modules'
    },
    { 
      name: 'TypeScript Strict Patterns & Generics', 
      category: 'frontend' as const,
      progress: 95, 
      level: 'Expert Level',
      color: 'from-blue-400 via-indigo-500 to-violet-600', 
      glowColor: 'rgba(99,102,241,0.5)',
      badgeBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border-indigo-400/20',
      modules: '12/12 Modules'
    },
  ];

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(s => s.category === selectedCategory);

  const achievements = [
    { 
      title: 'React 19 Architect', 
      date: '2 days ago', 
      xp: '+500 XP',
      description: 'Completed Advanced Server Actions and Concurrent Rendering mastery path.',
      badgeColor: 'from-sky-400 to-blue-600',
      ringColor: 'ring-sky-400/30'
    },
    { 
      title: 'Speed Demon Learner', 
      date: '1 week ago', 
      xp: '+350 XP',
      description: 'Finished 5 full interactive modules with 100% accuracy in a single 24h sprint.',
      badgeColor: 'from-amber-400 to-orange-600',
      ringColor: 'ring-amber-400/30'
    },
    { 
      title: 'Flawless TypeScript Assessment', 
      date: '2 weeks ago', 
      xp: '+750 XP',
      description: 'Achieved a perfect 100% score on the Senior TypeScript architectural review.',
      badgeColor: 'from-violet-400 to-purple-600',
      ringColor: 'ring-purple-400/30'
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 26 } }
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
        <div className="absolute left-1/3 -bottom-24 h-48 w-48 rounded-full bg-gradient-to-tr from-emerald-400/15 to-teal-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-600 dark:text-sky-300 shadow-2xs">
                <Sparkles size={14} className="text-sky-500 animate-pulse" />
                Learning Analytics & Soft Theme
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-300">
                <TrendingUp size={13} />
                Top 5% Student Tier
              </span>
            </div>

            <h1 className="mt-3.5 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
              Performance & <span className="bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">Journey Stats</span>
            </h1>
            <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
              Deep analytics, real-time skill progression tracking, and verified milestone certificates tailored to accelerate your mastery.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-300/80 dark:border-white/15 bg-white/80 dark:bg-white/5 px-5 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm hover:scale-[1.02] hover:bg-white dark:hover:bg-white/10 transition-all active:scale-95">
              <Award size={17} className="text-amber-500" />
              Download Report
            </button>
            <button className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_25px_-4px_rgba(14,165,233,0.4)] hover:scale-[1.02] hover:shadow-[0_12px_30px_-4px_rgba(14,165,233,0.6)] transition-all active:scale-95">
              <Zap size={17} className="fill-white" />
              Start Next Module
            </button>
          </div>
        </div>
      </motion.header>

      {/* Soft Glass Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            variants={itemVariants}
            whileHover={{ y: -6, scale: 1.015 }}
            className={`relative overflow-hidden rounded-3xl border ${stat.border} bg-white/80 dark:bg-[#0c1222]/75 p-6 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.06)] dark:shadow-[0_15px_35px_-10px_rgba(0,0,0,0.4)] backdrop-blur-2xl transition-all duration-300 group`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

            <div className="flex items-start justify-between">
              <div className={`flex h-13 w-13 items-center justify-center rounded-2xl ${stat.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                <stat.icon size={26} />
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 dark:bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-white/10">
                {stat.trend === 'up' && <TrendingUp size={12} className="text-emerald-500" />}
                {stat.trend === 'hot' && <Flame size={12} className="text-orange-500" />}
                {stat.change}
              </span>
            </div>

            <div className="mt-5">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <div className="mt-1 flex items-baseline gap-1.5">
                <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {stat.value}
                </h3>
                <span className={`text-base font-bold ${stat.textColor}`}>
                  {stat.unit}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Skill Progression Panel */}
        <motion.div 
          variants={itemVariants}
          className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#0c1222]/80 p-6 sm:p-8 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.4)] backdrop-blur-3xl lg:col-span-2 flex flex-col gap-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 dark:border-white/10 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <Layers size={20} className="text-sky-500" />
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Skill Progression & Mastery</h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Live assessment data across your active learning tracks.
              </p>
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 rounded-2xl bg-slate-100 dark:bg-white/5 p-1 border border-slate-200/60 dark:border-white/10 self-start sm:self-auto">
              {[
                { id: 'all', label: 'All Tracks' },
                { id: 'frontend', label: 'Frontend' },
                { id: 'backend', label: 'Backend' },
                { id: 'design', label: 'UI/UX' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    selectedCategory === tab.id
                      ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-300 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6 pt-1">
            {filteredSkills.map((skill, i) => (
              <div key={skill.name} className="group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="font-bold text-sm text-slate-800 dark:text-slate-100 truncate">
                      {skill.name}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${skill.badgeBg} shrink-0`}>
                      {skill.level}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {skill.modules}
                    </span>
                    <span className="text-sm font-extrabold text-slate-900 dark:text-white bg-slate-100 dark:bg-white/10 px-2.5 py-0.5 rounded-lg border border-slate-200/60 dark:border-white/10">
                      {skill.progress}%
                    </span>
                  </div>
                </div>

                <div className="h-3 w-full bg-slate-100 dark:bg-slate-900/80 rounded-full overflow-hidden p-[2px] border border-slate-200/60 dark:border-white/5 shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.progress}%` }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative overflow-hidden`}
                    style={{ boxShadow: `0 0 16px ${skill.glowColor}` }}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] animate-[shimmer_2s_infinite]" />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2 pt-5 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Next milestone evaluation available in <strong className="text-slate-800 dark:text-slate-200">3 days</strong></span>
            <button className="inline-flex items-center gap-1 font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-500 transition-colors">
              Explore Skill Paths <ArrowUpRight size={14} />
            </button>
          </div>
        </motion.div>

        {/* Soft Theme Recent Achievements Timeline */}
        <motion.div 
          variants={itemVariants}
          className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#0c1222]/80 p-6 sm:p-8 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.4)] backdrop-blur-3xl flex flex-col gap-6"
        >
          <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-white/10 pb-5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-[0_0_15px_rgba(251,191,36,0.4)]">
                <Trophy size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Trophies</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Verified certificates & XP</p>
              </div>
            </div>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-400/20 px-2.5 py-1 rounded-xl">
              18 Total
            </span>
          </div>

          <div className="space-y-6 pt-1 relative">
            {achievements.map((achievement, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 4 }}
                className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-800 pb-2 last:pb-0 transition-transform duration-200 group"
              >
                <div className={`absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-gradient-to-tr ${achievement.badgeColor} ring-4 ${achievement.ringColor} dark:ring-slate-900 shadow-sm flex items-center justify-center`}>
                  <div className="h-1.5 w-1.5 rounded-full bg-white" />
                </div>

                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors">
                    {achievement.title}
                  </h4>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-400/20 shrink-0">
                    {achievement.xp}
                  </span>
                </div>

                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                  <Clock size={12} className="text-slate-400" />
                  {achievement.date}
                </p>

                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed bg-slate-50/80 dark:bg-white/5 p-3 rounded-2xl border border-slate-200/60 dark:border-white/5">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-auto pt-4 border-t border-slate-200/60 dark:border-white/10">
            <div className="rounded-2xl bg-gradient-to-r from-sky-500/10 via-purple-500/10 to-pink-500/10 border border-sky-400/20 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-400 to-indigo-600 text-white shadow-sm">
                  <Star size={18} className="fill-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Next Trophy Unlock</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Complete 2 more modules to claim</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-400" />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
