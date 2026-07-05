'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  User,
  Sun,
  Moon,
  Laptop,
  ArrowLeft,
  Flame,
  BookOpen,
  Check,
  X,
  HelpCircle,
  AtSign,
  UserPlus
} from 'lucide-react';
import { useTheme } from 'next-themes';

export default function LoginPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Form Mode: 'signin' | 'signup' | 'magic'
  const [mode, setMode] = useState<'signin' | 'signup' | 'magic'>('signin');
  
  // Form State
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  // Interactive UI States
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined' && window.location.search.includes('created=true')) {
      const savedProfileRaw = localStorage.getItem('userProfile');
      if (savedProfileRaw) {
        try {
          const profile = JSON.parse(savedProfileRaw);
          if (profile.username) setUsername(profile.username);
          if (profile.email) setEmail(profile.email);
          setSuccessMsg('🎉 Student account created! Enter your password below to log into the platform.');
          setMode('signin');
        } catch (e) {}
      }
    }
  }, []);

  // Password Strength Calculation for Sign Up
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score; // 0 to 4
  };

  const strength = getPasswordStrength(password);
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong', 'Ultra Secure'];
  const strengthColors = [
    'bg-red-500',
    'bg-amber-500',
    'bg-yellow-400',
    'bg-cyan-400',
    'bg-emerald-500'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (mode === 'signup' && !username.trim()) {
      setErrorMsg('Please choose a username for your student account.');
      return;
    }
    if (mode === 'signin' && !email && !username) {
      setErrorMsg('Please enter your Username or Student Email address.');
      return;
    }
    if (mode !== 'signin' && !email.includes('@')) {
      setErrorMsg('Please enter a valid student email address.');
      return;
    }
    if (mode !== 'magic' && password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (mode === 'signin') {
        setSuccessMsg('Authentication successful! Launching Student Command Center...');
        // Check if user exists in localStorage
        const loginId = (username || email).toLowerCase().trim();
        const existingProfileRaw = localStorage.getItem('userProfile');
        let matchedProfile: any = null;
        if (existingProfileRaw) {
          try {
            const p = JSON.parse(existingProfileRaw);
            if ((p.username && p.username.toLowerCase() === loginId) || (p.email && p.email.toLowerCase() === loginId)) {
              matchedProfile = p;
            }
          } catch (e) {}
        }
        if (!matchedProfile) {
          const regRaw = localStorage.getItem('registeredAccounts');
          if (regRaw) {
            try {
              const list = JSON.parse(regRaw);
              matchedProfile = list.find((item: any) => 
                (item.username && item.username.toLowerCase() === loginId) || 
                (item.email && item.email.toLowerCase() === loginId)
              );
            } catch (e) {}
          }
        }

        if (matchedProfile) {
          localStorage.setItem('userProfile', JSON.stringify(matchedProfile));
        } else {
          // Fallback demo session
          const fbId = username || email;
          localStorage.setItem('userProfile', JSON.stringify({
            username: username || fbId.split('@')[0] || 'alex_morgan',
            firstName: fbId.split('@')[0].split('.')[0].replace(/^\w/, (c) => c.toUpperCase()) || 'Alex',
            lastName: 'Morgan',
            email: email || `${username || 'alex'}@university.edu`,
            studentId: 'NG-2026-8841',
            university: 'Global Tech University',
            course: 'Computer Science & AI',
            yearOfStudy: '3rd Year'
          }));
        }
        window.dispatchEvent(new Event('profileUpdated'));
        setTimeout(() => router.push('/'), 1200);
      } else if (mode === 'signup') {
        setSuccessMsg('Account created successfully! Welcome to NextGen Learn.');
        localStorage.setItem('userProfile', JSON.stringify({
          username: username || 'alex_morgan',
          firstName: name ? name.split(' ')[0] : 'Alex',
          lastName: name ? name.split(' ').slice(1).join(' ') || 'Morgan' : 'Morgan',
          email: email,
          studentId: studentId || 'NG-2026-8841',
          university: 'Global Tech University',
          course: 'Computer Science & AI',
          yearOfStudy: '1st Year'
        }));
        window.dispatchEvent(new Event('profileUpdated'));
        setTimeout(() => setMode('signin'), 1500);
      } else {
        setSuccessMsg('Magic link sent! Check your student inbox to log in instantly.');
      }
    }, 1200);
  };

  const handleQuickDemo = () => {
    setUsername('alex_morgan');
    setEmail('alex.morgan@university.edu');
    setPassword('ProStudent2026!');
    setMode('signin');
    setErrorMsg('');
    setSuccessMsg('Demo credentials loaded! Signing you in...');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem('userProfile', JSON.stringify({
        username: 'alex_morgan',
        firstName: 'Alex',
        lastName: 'Morgan',
        email: 'alex.morgan@university.edu',
        studentId: 'NG-2026-8841',
        university: 'Global Tech University',
        course: 'Computer Science & AI',
        yearOfStudy: '3rd Year',
        bio: 'Pro learner trying to master full-stack development & AI systems.',
        skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Python', 'AI Agents'],
        portfolioUrl: 'https://github.com/pramodchavan',
        linkedinUrl: 'https://linkedin.com/in/pramodchavan',
        leetcodeUrl: 'https://leetcode.com/u/pramodchavan'
      }));
      window.dispatchEvent(new Event('profileUpdated'));
      router.push('/');
    }, 1000);
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.includes('@')) return;
    setResetSent(true);
    setTimeout(() => {
      setResetSent(false);
      setShowForgotModal(false);
      setSuccessMsg('Password reset instructions sent to ' + resetEmail);
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-slate-50 dark:bg-[#030409] text-slate-900 dark:text-slate-100 relative overflow-hidden transition-colors duration-500 selection:bg-cyan-400/30">
      {/* Background Ambient Mesh & Grid Overlay for both Dark & Light Themes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dark theme radial glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-violet-600/20 via-purple-600/10 to-transparent blur-[120px] dark:opacity-100 opacity-0 transition-opacity duration-700" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tl from-cyan-500/20 via-blue-600/10 to-transparent blur-[120px] dark:opacity-100 opacity-0 transition-opacity duration-700" />
        
        {/* Light theme radial glows */}
        <div className="absolute top-[-10%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-violet-400/25 via-indigo-300/20 to-transparent blur-[100px] dark:opacity-0 opacity-100 transition-opacity duration-700" />
        <div className="absolute bottom-[-10%] right-[10%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-tl from-cyan-400/25 via-sky-300/20 to-transparent blur-[100px] dark:opacity-0 opacity-100 transition-opacity duration-700" />

        {/* Crisp grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* Top Header Bar */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/30 dark:border-cyan-400/30 bg-white/80 dark:bg-slate-900/80 shadow-[0_4px_20px_rgba(34,211,238,0.15)] backdrop-blur-xl group-hover:scale-105 transition-all">
            <span className="bg-gradient-to-br from-violet-600 to-cyan-500 dark:from-cyan-300 dark:to-violet-400 bg-clip-text text-base font-bold text-transparent">
              NG
            </span>
            <div className="absolute inset-0 rounded-xl border border-cyan-400/40 opacity-0 group-hover:opacity-100 animate-ping transition-opacity" />
          </div>
          <div>
            <span className="block text-base font-bold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
              NextGen Learn
            </span>
            <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">
              Student Command Center
            </span>
          </div>
        </Link>

        {/* Theme Switcher & Back Pill */}
        <div className="flex items-center gap-3">
          {mounted && (
            <div className="flex items-center rounded-full border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 p-1 shadow-sm backdrop-blur-xl">
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  theme === 'light'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Light Theme"
              >
                <Sun size={14} />
                <span className="hidden sm:inline">Light</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Dark Theme"
              >
                <Moon size={14} />
                <span className="hidden sm:inline">Dark</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme('system')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  theme === 'system' || (!theme && mounted)
                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="System Theme"
              >
                <Laptop size={14} />
                <span className="hidden md:inline">System</span>
              </button>
            </div>
          )}

          <Link
            href="/"
            className="flex items-center gap-2 rounded-full border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm backdrop-blur-xl hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-white transition-all"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Back to App</span>
          </Link>
        </div>
      </header>

      {/* Main Content Layout (Bento / Split Showcase) */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex-1 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Premium Feature & Aesthetic Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col justify-center space-y-8"
          >
            {/* AI Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 dark:border-cyan-400/30 bg-cyan-500/10 dark:bg-cyan-400/10 text-cyan-700 dark:text-cyan-300 text-xs font-semibold w-fit shadow-[0_0_20px_rgba(34,211,238,0.15)]">
              <Sparkles size={14} className="animate-spin text-cyan-500" style={{ animationDuration: '4s' }} />
              <span>NextGen 2.0 • Unified Academic Intelligence</span>
            </div>

            {/* Headline */}
            <div className="space-y-4 max-w-xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                Your Academic Life, <br />
                <span className="bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500 dark:from-cyan-400 dark:via-violet-400 dark:to-pink-400 bg-clip-text text-transparent">
                  Supercharged.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
                Log in to access your personalized courses, AI study assistants, real-time assignment analytics, and verified learning streaks—all engineered in ultra-responsive dark and light themes.
              </p>
            </div>

            {/* Interactive Live Mini-Widgets Preview (Shows off Theme Harmonization) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 max-w-xl">
              {/* Widget 1: Streak & Activity */}
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 p-5 shadow-lg shadow-slate-900/5 dark:shadow-black/40 backdrop-blur-2xl hover:border-cyan-500/40 dark:hover:border-cyan-400/30 transition-all group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Live Activity</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500 dark:text-orange-400 font-bold">
                    <Flame size={18} className="animate-pulse" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">14 Days</span>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">+2 from last week</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Consistency is in the 99th percentile 🔥</p>
              </div>

              {/* Widget 2: Course Progress */}
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 p-5 shadow-lg shadow-slate-900/5 dark:shadow-black/40 backdrop-blur-2xl hover:border-violet-500/40 dark:hover:border-violet-400/30 transition-all group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Current Course</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400 font-bold">
                    <BookOpen size={18} />
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-bold text-slate-900 dark:text-white truncate">AI Architecture</span>
                  <span className="text-xs font-extrabold text-violet-600 dark:text-violet-400">92%</span>
                </div>
                {/* Progress bar */}
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mt-2.5 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>
            </div>

            {/* Testimonial Badge */}
            <div className="flex items-center gap-4 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 max-w-xl">
              <div className="flex -space-x-2 overflow-hidden">
                <div className="inline-block h-9 w-9 rounded-full ring-2 ring-white dark:ring-slate-900 bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-md">
                  AM
                </div>
                <div className="inline-block h-9 w-9 rounded-full ring-2 ring-white dark:ring-slate-900 bg-gradient-to-tr from-violet-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white shadow-md">
                  JK
                </div>
                <div className="inline-block h-9 w-9 rounded-full ring-2 ring-white dark:ring-slate-900 bg-gradient-to-tr from-emerald-400 to-teal-600 flex items-center justify-center text-xs font-bold text-white shadow-md">
                  SR
                </div>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                <p className="font-semibold text-slate-900 dark:text-white flex items-center gap-1">
                  Over 12,500+ Students & Faculty <ShieldCheck size={14} className="text-cyan-500" />
                </p>
                <p>Trusted across top global universities for daily workflow.</p>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Premium Authentication Console Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none"
          >
            <div className="relative rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/85 dark:bg-[#0c0e19]/80 p-6 sm:p-8 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.15)] dark:shadow-[0_25px_80px_-15px_rgba(0,0,0,0.7)] backdrop-blur-3xl overflow-hidden transition-all duration-500">
              
              {/* Card Top Border Glow Shimmer */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-violet-600 to-pink-500" />
              <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-cyan-500/10 dark:bg-cyan-400/10 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-violet-500/10 dark:bg-violet-400/10 blur-3xl pointer-events-none" />

              {/* Prominent New Student Registration Banner */}
              <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-indigo-500/15 border border-cyan-500/30 dark:border-cyan-400/20 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shrink-0 shadow-md">
                    <UserPlus size={20} className="animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>New Student? No Account?</span> <Sparkles size={14} className="text-cyan-500" />
                    </h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-tight">
                      Create your account first, then log in to access the platform!
                    </p>
                  </div>
                </div>
                <Link
                  href="/signup"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl font-extrabold text-xs text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-1.5 shrink-0 transition-transform hover:scale-105 active:scale-95"
                >
                  <span>Sign Up Here</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* Mode Switcher Tabs */}
              <div className="grid grid-cols-3 gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 mb-6 relative z-10">
                <button
                  type="button"
                  onClick={() => { setMode('signin'); setErrorMsg(''); setSuccessMsg(''); }}
                  className={`relative py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    mode === 'signin'
                      ? 'text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {mode === 'signin' && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute inset-0 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200/50 dark:border-slate-700/50"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">Sign In</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setMode('signup'); setErrorMsg(''); setSuccessMsg(''); }}
                  className={`relative py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    mode === 'signup'
                      ? 'text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {mode === 'signup' && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute inset-0 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200/50 dark:border-slate-700/50"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">Register</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setMode('magic'); setErrorMsg(''); setSuccessMsg(''); }}
                  className={`relative py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    mode === 'magic'
                      ? 'text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {mode === 'magic' && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute inset-0 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200/50 dark:border-slate-700/50"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">Magic Link</span>
                </button>
              </div>

              {/* Title & Description */}
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  {mode === 'signin' && <span>Welcome Back 👋</span>}
                  {mode === 'signup' && <span>Create Student ID ✨</span>}
                  {mode === 'magic' && <span>Passwordless SSO ⚡</span>}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {mode === 'signin' && 'Enter your university email and password to access your dashboard.'}
                  {mode === 'signup' && 'Join thousands of students optimizing their study workflow today.'}
                  {mode === 'magic' && 'Receive an instant one-click authentication link directly to your student inbox.'}
                </p>
              </div>

              {/* Alerts (Error / Success) */}
              <AnimatePresence>
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-4 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-medium flex items-center gap-2.5"
                  >
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}
                {successMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-4 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-medium flex items-center gap-2.5 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                  >
                    <CheckCircle2 size={16} className="shrink-0 text-emerald-500" />
                    <span>{successMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Social / Single Sign-On (SSO) Row */}
              <div className="grid grid-cols-3 gap-2.5 mb-6">
                <button
                  type="button"
                  onClick={() => { setErrorMsg(''); setSuccessMsg('Redirecting to Google Workspace SSO...'); }}
                  className="flex items-center justify-center gap-2 h-11 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
                  title="Sign in with Google Workspace"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setErrorMsg(''); setSuccessMsg('Redirecting to GitHub Student Developer Pack...'); }}
                  className="flex items-center justify-center gap-2 h-11 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
                  title="Sign in with GitHub"
                >
                  <svg className="w-4 h-4 fill-current text-slate-800 dark:text-slate-100" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  <span>GitHub</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setErrorMsg(''); setSuccessMsg('Redirecting to Microsoft Azure AD / Campus SSO...'); }}
                  className="flex items-center justify-center gap-2 h-11 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
                  title="Sign in with Microsoft Campus ID"
                >
                  <svg className="w-4 h-4 fill-current text-[#00A4EF]" viewBox="0 0 23 23">
                    <path fill="#f35325" d="M1 1h10v10H1z"/>
                    <path fill="#81bc06" d="M12 1h10v10H12z"/>
                    <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                    <path fill="#ffba08" d="M12 12h10v10H12z"/>
                  </svg>
                  <span>Campus</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                </div>
                <span className="relative bg-white dark:bg-[#0c0e19] px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Or continue with student credentials
                </span>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Username Input (For New Users & Sign In) */}
                {mode === 'signup' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                      <AtSign size={13} className="text-cyan-500" /> Student Username <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-3 text-slate-400 dark:text-slate-500 font-bold text-sm">@</span>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_.]/g, ''))}
                        placeholder="alex_morgan"
                        required={mode === 'signup'}
                        className="w-full h-11 pl-9 pr-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white font-mono font-bold text-xs sm:text-sm placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500/20 transition-all shadow-inner"
                      />
                      {username.length >= 3 && (
                        <Check size={16} className="absolute right-3.5 top-3 text-emerald-500 animate-in zoom-in" />
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Email or Username Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {mode === 'signin' ? 'Username or University Email' : 'University Email Address'} {mode === 'signup' && <span className="text-red-500">*</span>}
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-3 text-slate-400 dark:text-slate-500" />
                    <input
                      type={mode === 'signin' ? 'text' : 'email'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={mode === 'signin' ? 'alex_morgan or student@university.edu' : 'student.name@university.edu'}
                      required
                      className="w-full h-11 pl-10 pr-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500/20 transition-all shadow-inner"
                    />
                    {email.includes('@') && email.includes('.') && (
                      <Check size={16} className="absolute right-3.5 top-3 text-emerald-500" />
                    )}
                  </div>
                </div>

                {/* Password Input (Hidden in Magic Link mode) */}
                {mode !== 'magic' && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                        Password {mode === 'signup' && <span className="text-red-500">*</span>}
                      </label>
                      {mode === 'signin' && (
                        <button
                          type="button"
                          onClick={() => setShowForgotModal(true)}
                          className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3.5 top-3 text-slate-400 dark:text-slate-500" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        required
                        className="w-full h-11 pl-10 pr-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500/20 transition-all shadow-inner"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>

                    {/* Dynamic Password Strength Meter for Sign Up */}
                    {mode === 'signup' && password.length > 0 && (
                      <div className="mt-2.5 space-y-1.5 p-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between text-[11px] font-semibold">
                          <span className="text-slate-500 dark:text-slate-400">Security Strength:</span>
                          <span className={`font-bold ${
                            strength <= 1 ? 'text-red-500' : strength === 2 ? 'text-yellow-500' : 'text-emerald-500'
                          }`}>
                            {strengthLabels[strength]}
                          </span>
                        </div>
                        <div className="grid grid-cols-4 gap-1.5">
                          {[1, 2, 3, 4].map((step) => (
                            <div
                              key={step}
                              className={`h-1.5 rounded-full transition-all duration-300 ${
                                step <= strength
                                  ? strengthColors[strength]
                                  : 'bg-slate-200 dark:bg-slate-800'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Extra fields for Register mode (Full Name & Student ID) */}
                {mode === 'signup' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-2 gap-3 pt-1"
                  >
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <User size={16} className="absolute left-3.5 top-3 text-slate-400 dark:text-slate-500" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Alex Morgan"
                          required={mode === 'signup'}
                          className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500/20 transition-all shadow-inner"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Student ID #
                      </label>
                      <div className="relative">
                        <KeyRound size={16} className="absolute left-3.5 top-3 text-slate-400 dark:text-slate-500" />
                        <input
                          type="text"
                          value={studentId}
                          onChange={(e) => setStudentId(e.target.value)}
                          placeholder="NG-2026-XXXX"
                          required={mode === 'signup'}
                          className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500/20 transition-all shadow-inner"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Remember Me & Terms */}
                {mode === 'signin' && (
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-cyan-500 focus:ring-cyan-500/20 bg-slate-100 dark:bg-slate-900"
                      />
                      <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Remember 30 days</span>
                    </label>
                  </div>
                )}

                {mode === 'signup' && (
                  <div className="pt-1">
                    <label className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400 font-normal select-none cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        defaultChecked
                        className="mt-0.5 w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-cyan-500 focus:ring-cyan-500/20 bg-slate-100 dark:bg-slate-900 shrink-0"
                      />
                      <span>
                        I agree to the <a href="#" className="text-cyan-600 dark:text-cyan-400 hover:underline">Academic Honor Code</a> and <a href="#" className="text-cyan-600 dark:text-cyan-400 hover:underline">Student Terms</a>.
                      </span>
                    </label>
                  </div>
                )}

                {/* Primary Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white font-bold text-sm shadow-[0_0_25px_rgba(139,92,246,0.35)] hover:shadow-[0_0_35px_rgba(34,211,238,0.5)] hover:scale-[1.01] active:scale-98 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 group"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Authenticating...</span>
                    </div>
                  ) : (
                    <>
                      <span>
                        {mode === 'signin' && 'Sign In to Command Center'}
                        {mode === 'signup' && 'Create Student Account'}
                        {mode === 'magic' && 'Send Instant Magic Link'}
                      </span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Quick Demo Login Banner */}
              <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col items-center gap-2">
                <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Reviewing the theme? Try Demo Access
                </span>
                <button
                  type="button"
                  onClick={handleQuickDemo}
                  className="w-full py-2.5 px-4 rounded-xl border border-cyan-500/30 dark:border-cyan-400/20 bg-cyan-500/10 dark:bg-cyan-400/10 hover:bg-cyan-500/20 dark:hover:bg-cyan-400/20 text-cyan-700 dark:text-cyan-300 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm group"
                >
                  <Sparkles size={14} className="text-cyan-500 group-hover:rotate-12 transition-transform" />
                  <span>⚡ Quick Demo Login (Alex Morgan Pro)</span>
                </button>
              </div>

            </div>

            {/* Bottom Security Footer */}
            <div className="mt-6 text-center">
              <p className="text-xs text-slate-500 dark:text-slate-500 flex items-center justify-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span>256-bit SSL Encrypted • Powered by NextGen Auth Engine</span>
              </p>
            </div>
          </motion.div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
        <p>© 2026 NextGen Learn Student OS. All rights reserved.</p>
        <div className="flex items-center gap-6 font-medium">
          <a href="#" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">Security Audit</a>
          <a href="#" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">System Status: 🟢 Normal</a>
        </div>
      </footer>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c0e19] p-6 sm:p-8 shadow-2xl text-slate-900 dark:text-slate-100"
            >
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-500 mb-4">
                <HelpCircle size={24} />
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Reset Account Password</h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 mb-6">
                Enter your registered university email. We will send a 2FA recovery link with temporary login credentials.
              </p>

              {resetSent ? (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-semibold flex items-center gap-3">
                  <CheckCircle2 size={20} className="shrink-0 text-emerald-500" />
                  <span>Recovery instructions sent! Check your student inbox.</span>
                </div>
              ) : (
                <form onSubmit={handleResetSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Student Email Address
                    </label>
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="student@university.edu"
                      required
                      className="w-full h-11 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full h-11 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-sm shadow-md hover:opacity-95 transition-all"
                  >
                    Send Recovery Email
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
