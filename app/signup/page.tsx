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
  AtSign,
  UserPlus,
  GraduationCap,
  Building2,
  Award,
  QrCode,
  CheckCircle
} from 'lucide-react';
import { useTheme } from 'next-themes';

export default function SignUpPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [course, setCourse] = useState('Computer Science & AI');
  const [yearOfStudy, setYearOfStudy] = useState('1st Year');
  const [studentId, setStudentId] = useState('');
  const [university, setUniversity] = useState('');
  const [bio, setBio] = useState('');
  const [skillsInput, setSkillsInput] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [leetcodeUrl, setLeetcodeUrl] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Interactive UI States
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Password Strength Calculation
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

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase().replace(/[^a-z0-9_.]/g, '');
    setUsername(val);
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!username.trim() || username.length < 3) {
      setErrorMsg('Username must be at least 3 characters long (alphanumeric, underscores, or dots).');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please enter a valid university email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify your password confirmation.');
      return;
    }
    if (!agreeTerms) {
      setErrorMsg('You must agree to the Student Code of Conduct & Academic Integrity Guidelines.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      
      // Save created account into localStorage
      const newAccount = {
        username: username,
        firstName: name.split(' ')[0] || 'Student',
        lastName: name.split(' ').slice(1).join(' ') || 'User',
        email: email,
        password: password, // For simulation verification on login page
        studentId: studentId.trim() || 'STU-ID-PENDING',
        university: university.trim() || 'University Not Specified',
        course: course,
        yearOfStudy: yearOfStudy,
        bio: bio.trim(),
        skills: skillsInput.trim() ? skillsInput.split(',').map(s => s.trim()).filter(Boolean) : [],
        portfolioUrl: portfolioUrl.trim(),
        linkedinUrl: linkedinUrl.trim(),
        leetcodeUrl: leetcodeUrl.trim(),
        createdAt: new Date().toISOString()
      };

      // Store as the active userProfile and in registeredAccounts array
      localStorage.setItem('userProfile', JSON.stringify(newAccount));
      
      const existingAccountsRaw = localStorage.getItem('registeredAccounts');
      const existingAccounts = existingAccountsRaw ? JSON.parse(existingAccountsRaw) : [];
      existingAccounts.push(newAccount);
      localStorage.setItem('registeredAccounts', JSON.stringify(existingAccounts));

      // Notify any active listeners
      window.dispatchEvent(new Event('profileUpdated'));

      setSuccessMsg('🎉 Account Created Successfully! Initializing your student workspace...');
      
      setTimeout(() => {
        router.push('/login?created=true');
      }, 1600);
    }, 1200);
  };

  const getInitials = (fullName: string) => {
    if (!fullName) return 'ST';
    const parts = fullName.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return fullName.slice(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070913] text-slate-900 dark:text-slate-100 flex flex-col justify-between relative overflow-hidden transition-colors duration-500 font-sans">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tl from-purple-500/15 via-indigo-500/10 to-transparent blur-[120px] pointer-events-none" />

      {/* Header / Navigation Bar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30 group-hover:scale-105 transition-transform">
            <GraduationCap size={22} className="animate-pulse" />
          </div>
          <div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
              NextGen Learn
            </span>
            <span className="block text-[10px] font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
              Student Registration Portal
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-800 px-4 py-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-all"
          >
            <ArrowLeft size={14} />
            <span>Back to Login</span>
          </Link>

          {mounted && (
            <div className="flex items-center rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 p-1 shadow-sm backdrop-blur-md">
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`p-2 rounded-lg text-xs font-semibold transition-all ${
                  theme === 'light'
                    ? 'bg-cyan-500 text-white shadow-md'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Light Mode"
              >
                <Sun size={15} />
              </button>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`p-2 rounded-lg text-xs font-semibold transition-all ${
                  theme === 'dark'
                    ? 'bg-cyan-500 text-white shadow-md'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Dark Mode"
              >
                <Moon size={15} />
              </button>
              <button
                type="button"
                onClick={() => setTheme('system')}
                className={`p-2 rounded-lg text-xs font-semibold transition-all ${
                  theme === 'system'
                    ? 'bg-cyan-500 text-white shadow-md'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="System Theme"
              >
                <Laptop size={15} />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Interactive Account Creation Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 w-full"
          >
            <div className="relative rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/85 dark:bg-[#0c0e19]/85 p-6 sm:p-8 lg:p-10 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.15)] dark:shadow-[0_25px_80px_-15px_rgba(0,0,0,0.7)] backdrop-blur-3xl overflow-hidden">
              
              {/* Shimmer Top Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600" />

              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 dark:bg-cyan-400/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
                  <UserPlus size={14} />
                  <span>Student Onboarding Portal</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Create Your Student Account
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Enter your information below to establish your permanent campus identity and unlock AI pair programming tools.
                </p>
              </div>

              {/* Error & Success Banners */}
              <AnimatePresence mode="wait">
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs sm:text-sm font-semibold flex items-center gap-3 shadow-sm"
                  >
                    <AlertCircle size={18} className="shrink-0 text-red-500" />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}

                {successMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-semibold flex items-center gap-3 shadow-sm animate-pulse"
                  >
                    <CheckCircle2 size={18} className="shrink-0 text-emerald-500" />
                    <span>{successMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Row 1: Full Name & Username */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <User size={14} className="text-cyan-500" /> Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => { setName(e.target.value); setErrorMsg(''); }}
                        placeholder="Alex Morgan"
                        required
                        className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white font-medium text-sm placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <AtSign size={14} className="text-cyan-500" /> Student Username <span className="text-red-500">*</span>
                      </span>
                      {username.length >= 3 && (
                        <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                          <Check size={12} /> Available
                        </span>
                      )}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-3.5 text-slate-400 dark:text-slate-500 font-bold text-sm">@</span>
                      <input
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        placeholder="alex_morgan26"
                        required
                        className="w-full h-12 pl-9 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white font-mono font-bold text-sm placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: University Email */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Mail size={14} className="text-cyan-500" /> University Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setErrorMsg(''); }}
                      placeholder="student.name@university.edu"
                      required
                      className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white font-medium text-sm placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
                    />
                    {email.includes('@') && email.includes('.') && (
                      <CheckCircle size={18} className="absolute right-3.5 top-3.5 text-emerald-500" />
                    )}
                  </div>
                </div>

                {/* Row 3: Password & Confirm Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Lock size={14} className="text-cyan-500" /> Password <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setErrorMsg(''); }}
                        placeholder="••••••••••••"
                        required
                        className="w-full h-12 pl-4 pr-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white font-medium text-sm placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Lock size={14} className="text-cyan-500" /> Confirm Password <span className="text-red-500">*</span>
                      </span>
                      {confirmPassword && password === confirmPassword && (
                        <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                          <Check size={12} /> Match
                        </span>
                      )}
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => { setConfirmPassword(e.target.value); setErrorMsg(''); }}
                        placeholder="••••••••••••"
                        required
                        className={`w-full h-12 pl-4 pr-10 rounded-xl border bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white font-medium text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all shadow-inner ${
                          confirmPassword && password !== confirmPassword
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-slate-200 dark:border-slate-800 focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-cyan-500/20'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Password Strength Meter */}
                {password.length > 0 && (
                  <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1.5 transition-all">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                        <ShieldCheck size={14} className="text-cyan-500" /> Password Security Level:
                      </span>
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

                {/* Row 4: Academic Department & Year of Study */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <Building2 size={14} className="text-cyan-500" /> Academic Department
                    </label>
                    <select
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white font-medium text-sm focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
                    >
                      <option value="Computer Science & AI">Computer Science & AI</option>
                      <option value="Data Science & Big Data">Data Science & Big Data</option>
                      <option value="Software Engineering">Software Engineering</option>
                      <option value="Cybersecurity & Networks">Cybersecurity & Networks</option>
                      <option value="Electrical & Electronics">Electrical & Electronics</option>
                      <option value="Mechanical Engineering">Mechanical Engineering</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <Award size={14} className="text-cyan-500" /> Academic Standing
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {['1st Year', '2nd Year', '3rd Year', '4th Year'].map((year) => (
                        <button
                          key={year}
                          type="button"
                          onClick={() => setYearOfStudy(year)}
                          className={`h-12 rounded-xl text-xs font-bold transition-all flex items-center justify-center border ${
                            yearOfStudy === year
                              ? 'bg-cyan-500 text-white border-cyan-500 shadow-md shadow-cyan-500/20 scale-[1.02]'
                              : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-cyan-500/50'
                          }`}
                        >
                          {year.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Row 5: University Name & Student ID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <Building2 size={14} className="text-cyan-500" /> University / Institution <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      placeholder="e.g. Stanford University, IIT Bombay, Harvard"
                      required
                      className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white font-medium text-sm placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <KeyRound size={14} className="text-cyan-500" /> Student ID / Roll Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      placeholder="e.g. STU-2026-8841 or Roll No."
                      required
                      className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white font-mono font-medium text-sm placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
                    />
                  </div>
                </div>

                {/* Row 6: Personal Biography & Skills */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <BookOpen size={14} className="text-cyan-500" /> Personal Biography / Career Vision
                    </label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={2}
                      placeholder="Tell us about your academic goals, projects, and career aspirations..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white font-medium text-sm placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Award size={14} className="text-cyan-500" /> Skills & Technologies (Comma Separated)
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal">e.g. React, Python, JavaScript, SQL</span>
                    </label>
                    <input
                      type="text"
                      value={skillsInput}
                      onChange={(e) => setSkillsInput(e.target.value)}
                      placeholder="React, Next.js, Python, TypeScript, Problem Solving"
                      className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white font-medium text-sm placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
                    />
                  </div>
                </div>

                {/* Personal Connected Profiles Section (Optional) */}
                <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                      <span>Personal Connected Profiles</span>
                    </h4>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Optional • Give & Edit Your Own Links</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">GitHub Profile</label>
                      <input
                        type="url"
                        value={portfolioUrl}
                        onChange={(e) => setPortfolioUrl(e.target.value)}
                        placeholder="https://github.com/..."
                        className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 transition-all shadow-inner"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">LinkedIn Profile</label>
                      <input
                        type="url"
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                        placeholder="https://linkedin.com/in/..."
                        className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 transition-all shadow-inner"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase mb-1">LeetCode Profile</label>
                      <input
                        type="url"
                        value={leetcodeUrl}
                        onChange={(e) => setLeetcodeUrl(e.target.value)}
                        placeholder="https://leetcode.com/u/..."
                        className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 transition-all shadow-inner"
                      />
                    </div>
                  </div>
                </div>

                {/* Terms Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer select-none group">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-cyan-500 focus:ring-cyan-500/20 bg-slate-100 dark:bg-slate-900"
                    />
                    <span className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
                      I certify that I am a registered student and agree to abide by the{' '}
                      <span className="font-semibold text-cyan-600 dark:text-cyan-400 hover:underline">Student Code of Conduct</span>,{' '}
                      <span className="font-semibold text-cyan-600 dark:text-cyan-400 hover:underline">Academic Integrity Policy</span>, and NextGen Terms of Service.
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="relative w-full h-13 py-3.5 px-6 rounded-2xl font-extrabold text-sm text-white shadow-xl shadow-cyan-500/25 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5 active:translate-y-0 overflow-hidden group mt-2"
                >
                  {/* Subtle Background Shimmer */}
                  <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-20deg] -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000" />
                  
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Creating Student Account...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} className="text-cyan-200 animate-bounce" />
                        <span>Create Account & Launch Platform</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </button>

              </form>

              {/* Bottom Login Redirect Banner */}
              <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 text-center">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Already have an active student account?{' '}
                  <Link
                    href="/login"
                    className="font-extrabold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 underline underline-offset-4 transition-all"
                  >
                    Sign In to Command Center
                  </Link>
                </p>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Live Interactive Holographic Credential Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 w-full lg:sticky lg:top-8"
          >
            <div className="space-y-6">
              
              {/* Preview Header */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-cyan-500" /> Live Campus ID Preview
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold uppercase tracking-wider border border-emerald-500/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> Active Pass
                </span>
              </div>

              {/* Holographic ID Card */}
              <div className="relative rounded-3xl p-6 sm:p-7 overflow-hidden border border-white/20 dark:border-slate-700/60 bg-gradient-to-br from-slate-900 via-[#11162b] to-indigo-950 text-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] transform transition-all duration-500 hover:scale-[1.02] group">
                
                {/* Holographic Shimmer Bar & Glows */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400" />
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-cyan-500/20 blur-2xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-purple-500/20 blur-2xl pointer-events-none" />

                <div className="relative z-10 flex flex-col justify-between h-full min-h-[240px]">
                  
                  {/* Top Row of Card */}
                  <div className="flex items-start justify-between border-b border-white/10 pb-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-extrabold text-lg text-white shadow-lg ring-2 ring-white/20">
                        {getInitials(name)}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-base sm:text-lg text-white tracking-tight leading-tight">
                          {name.trim() || 'Alex Morgan'}
                        </h3>
                        <p className="text-xs font-mono text-cyan-300 flex items-center gap-1 mt-0.5 font-bold">
                          <span>@</span>{username.trim() || 'alex_morgan26'}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="inline-block px-2.5 py-1 rounded-lg bg-white/10 text-[10px] font-extrabold uppercase tracking-wider text-cyan-300 border border-white/10">
                        STUDENT ID
                      </span>
                      <p className="text-[11px] font-mono text-slate-300 mt-1 font-semibold">
                        {studentId.trim() || 'STU-ID-PENDING'}
                      </p>
                    </div>
                  </div>

                  {/* Middle Details */}
                  <div className="grid grid-cols-2 gap-4 my-2">
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        University
                      </span>
                      <span className="font-bold text-xs sm:text-sm text-white flex items-center gap-1 mt-0.5 truncate">
                        <Building2 size={13} className="text-cyan-400 shrink-0" /> {university.trim() || 'Your University'}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Department
                      </span>
                      <span className="font-bold text-xs sm:text-sm text-white truncate block mt-0.5">
                        {course}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Row / Security QR */}
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Academic Standing
                      </span>
                      <span className="inline-block mt-0.5 px-2.5 py-0.5 rounded-md bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 font-extrabold text-xs">
                        {yearOfStudy} • Full-Time
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-white/10 border border-white/10 text-cyan-300">
                        <QrCode size={28} />
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* What You Unlock Feature Box */}
              <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/85 dark:bg-[#0c0e19]/80 p-6 sm:p-7 shadow-lg backdrop-blur-3xl">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Sparkles size={16} className="text-cyan-500" />
                  <span>Instant Student Benefits Included</span>
                </h4>

                <div className="space-y-3.5">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-xl bg-cyan-500/10 dark:bg-cyan-400/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={14} className="stroke-[3]" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white">AI Pair Programming Tutor</h5>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                        Access 24/7 intelligent code debugging and algorithm explanation tools.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-xl bg-purple-500/10 dark:bg-purple-400/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={14} className="stroke-[3]" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white">Campus SSO & Verified Credentials</h5>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                        Seamlessly sync with university assignments, LeetCode, and GitHub Student Pack.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-xl bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={14} className="stroke-[3]" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white">Interactive Problem Sandbox</h5>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                        Run and test Next.js, React, and TypeScript code in real-time browser VMs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
        <p>© 2026 NextGen Learn Student OS. All rights reserved.</p>
        <div className="flex items-center gap-6 font-medium">
          <Link href="/login" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">Sign In</Link>
          <a href="#" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">Campus Support</a>
        </div>
      </footer>

    </div>
  );
}
