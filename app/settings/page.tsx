"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Mail,
  Lock,
  LogOut,
  Check,
  KeyRound,
  Sun,
  Moon,
  Monitor,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  X,
  Laptop,
  Eye,
  RefreshCw,
  AlertTriangle,
  ChevronRight,
  Search,
  Plus,
  Camera,
  Smartphone,
  Sliders,
  Download,
  CheckSquare,
  Square
} from 'lucide-react';
import {
  sidebarThemeList,
  sidebarThemes,
  SidebarThemePreset,
} from '@/components/sidebarThemes';

const avatarGradients = [
  { id: 'cyan-blue', name: 'Ocean Cyan', bg: 'from-cyan-400 to-blue-600', text: 'text-cyan-400' },
  { id: 'violet-pink', name: 'Neon Aurora', bg: 'from-violet-500 via-purple-500 to-pink-500', text: 'text-violet-400' },
  { id: 'emerald-teal', name: 'Cyber Mint', bg: 'from-emerald-400 to-teal-600', text: 'text-emerald-400' },
  { id: 'amber-rose', name: 'Sunset Gold', bg: 'from-amber-400 via-orange-500 to-rose-600', text: 'text-amber-400' },
  { id: 'indigo-slate', name: 'Midnight Blue', bg: 'from-indigo-600 to-slate-900', text: 'text-indigo-400' },
  { id: 'fuchsia-cyan', name: 'Cyberpunk', bg: 'from-fuchsia-500 via-violet-600 to-cyan-400', text: 'text-fuchsia-400' },
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Navigation State
  const [activeTab, setActiveTab] = useState<'profile' | 'appearance' | 'notifications' | 'security'>('profile');
  const [searchQuery, setSearchQuery] = useState("");

  // Profile States
  const [firstName, setFirstName] = useState("Pramod");
  const [lastName, setLastName] = useState("Chavan");
  const [email, setEmail] = useState("pramod@gmail.com");
  const [roleTitle, setRoleTitle] = useState("Full-Stack Developer & Pro Learner");
  const [bio, setBio] = useState("Pro learner trying to master full-stack development. I enjoy building beautiful and responsive web applications.");
  const [avatarColor, setAvatarColor] = useState("cyan-blue");
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  // Appearance States
  const [sidebarTheme, setSidebarTheme] = useState<SidebarThemePreset>('classic');

  // Notifications States
  const [notifications, setNotifications] = useState({
    courseUpdates: true,
    assignmentDeadlines: true,
    weeklyProgress: true,
    communityMentions: true,
    securityAlerts: true,
  });
  const [sampleAlertSent, setSampleAlertSent] = useState(false);

  // Security States
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorActive, setTwoFactorActive] = useState(true);
  const [activeSessions, setActiveSessions] = useState([
    { id: '1', device: 'Windows PC · Chrome', location: 'Mumbai, IN', ip: '192.168.1.42', current: true, lastActive: 'Active Now' },
    { id: '2', device: 'MacBook Air · Safari', location: 'Pune, IN', ip: '192.168.1.105', current: false, lastActive: '3 hours ago' },
  ]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Save / Feedback States
  const [isSaving, setIsSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const loadData = () => {
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        try {
          const parsed = JSON.parse(savedProfile);
          if (parsed.firstName !== undefined) setFirstName(parsed.firstName);
          if (parsed.lastName !== undefined) setLastName(parsed.lastName);
          if (parsed.email !== undefined) setEmail(parsed.email);
          if (parsed.bio !== undefined) setBio(parsed.bio);
          if (parsed.roleTitle !== undefined) setRoleTitle(parsed.roleTitle);
          if (parsed.avatarColor !== undefined) setAvatarColor(parsed.avatarColor);
        } catch (e) {
          console.error("Failed to parse profile data", e);
        }
      }

      const savedTheme = localStorage.getItem('sidebarTheme') as SidebarThemePreset;
      if (savedTheme && sidebarThemes[savedTheme]) {
        setSidebarTheme(savedTheme);
      }

      const savedNotifs = localStorage.getItem('notificationPrefs');
      if (savedNotifs) {
        try {
          setNotifications(JSON.parse(savedNotifs));
        } catch (e) {}
      }
    };
    loadData();
    window.addEventListener('sidebarThemeUpdated', loadData);
    window.addEventListener('storage', loadData);
    return () => {
      window.removeEventListener('sidebarThemeUpdated', loadData);
      window.removeEventListener('storage', loadData);
    };
  }, []);

  const handleSelectSidebarTheme = (themeId: SidebarThemePreset) => {
    setSidebarTheme(themeId);
    localStorage.setItem('sidebarTheme', themeId);
    window.dispatchEvent(new Event('sidebarThemeUpdated'));
    showToast(`Sidebar theme changed to ${sidebarThemes[themeId].name}`);
  };

  const handleToggleNotification = (key: keyof typeof notifications) => {
    const updated = { ...notifications, [key]: !notifications[key] };
    setNotifications(updated);
    localStorage.setItem('notificationPrefs', JSON.stringify(updated));
    showToast("Notification preference updated");
  };

  const showToast = (message: string) => {
    setSavedMessage(message);
    setTimeout(() => {
      setSavedMessage(null);
    }, 3500);
  };

  const handleSaveProfile = () => {
    setIsSaving(true);
    setTimeout(() => {
      const profileData = { firstName, lastName, email, bio, roleTitle, avatarColor };
      localStorage.setItem('userProfile', JSON.stringify(profileData));
      window.dispatchEvent(new Event('profileUpdated'));
      setIsSaving(false);
      showToast("Profile settings saved successfully");
    }, 600);
  };

  const handleRevokeSession = (sessionId: string) => {
    setActiveSessions((prev) => prev.filter((s) => s.id !== sessionId));
    showToast("Session revoked successfully");
  };

  const handleTestNotification = () => {
    setSampleAlertSent(true);
    showToast("🔔 Sample alert triggered! Check your desktop notifications.");
    setTimeout(() => setSampleAlertSent(false), 3000);
  };

  const currentAvatarStyle = avatarGradients.find((g) => g.id === avatarColor) || avatarGradients[0];
  const initials = `${firstName.charAt(0) || ''}${lastName.charAt(0) || ''}`.toUpperCase();
  const activeSidebarConfig = sidebarThemes[sidebarTheme] || sidebarThemes.classic;

  const calculatePasswordStrength = (pwd: string) => {
    if (!pwd) return { label: 'None', score: 0, color: 'bg-slate-300 dark:bg-slate-700' };
    if (pwd.length < 6) return { label: 'Weak', score: 25, color: 'bg-red-500' };
    if (pwd.length < 10) return { label: 'Medium', score: 60, color: 'bg-amber-500' };
    return { label: 'Strong', score: 100, color: 'bg-emerald-400' };
  };

  const pwdStrength = calculatePasswordStrength(newPassword);

  const tabs = [
    { id: 'profile', label: 'Profile details', icon: User, badge: 'Info' },
    { id: 'appearance', label: 'Appearance & Themes', icon: Palette, badge: '4 Presets' },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: `${Object.values(notifications).filter(Boolean).length} Active` },
    { id: 'security', label: 'Security & Privacy', icon: ShieldCheck, badge: 'Secured' },
  ] as const;

  return (
    <div className="mx-auto flex w-full max-w-[1550px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {savedMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-cyan-400/40 bg-slate-900/95 dark:bg-slate-950/95 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_12px_35px_rgba(6,182,212,0.35)] backdrop-blur-2xl"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-400/20 text-cyan-300">
              <CheckCircle2 size={18} strokeWidth={2.5} />
            </span>
            <span>{savedMessage}</span>
            <button onClick={() => setSavedMessage(null)} className="ml-2 text-slate-400 hover:text-white">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Banner */}
      <header className="dashboard-panel relative overflow-hidden flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 via-violet-500/5 to-transparent">
        {/* Decorative Background Glows */}
        <div className="absolute -right-20 -top-20 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -bottom-20 w-60 h-60 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="min-w-0 relative z-10">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold tracking-wider text-slate-600 dark:text-slate-400 uppercase">
            <span className="flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-cyan-400/15 px-3 py-1 text-cyan-600 dark:text-cyan-300 shadow-sm">
              <Sparkles size={13} className="animate-pulse" />
              Settings & Preferences
            </span>
            <span className="text-slate-400 dark:text-slate-600">•</span>
            <span>Syncs across all devices</span>
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-4xl flex items-center gap-3">
            Account Preferences
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 md:text-base">
            Customize your personal identity, app lighting, neon navigation presets, and high-security options.
          </p>
        </div>

        {/* Quick Search & Status Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 relative z-10 shrink-0">
          <div className="search-control !rounded-2xl !min-h-12 border-slate-300 dark:border-slate-800 shadow-sm">
            <Search size={18} className="text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Filter settings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="!w-44 text-sm"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X size={14} />
              </button>
            )}
          </div>

          <button
            onClick={() => handleSelectSidebarTheme('cyber')}
            title="Instant Cyberpunk theme preset"
            className="hidden xl:flex items-center gap-2 px-4 py-3 rounded-2xl border border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-300 text-xs font-semibold hover:bg-violet-500/20 transition-all shadow-sm shrink-0"
          >
            <Sliders size={14} />
            Quick Preset: Cyber
          </button>
        </div>
      </header>

      {/* Main Layout: Sidebar Tabs + Content Area */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Navigation Sidebar */}
        <div className="w-full lg:w-72 shrink-0 flex flex-col gap-3 sticky top-6">
          <div className="dashboard-panel p-3.5 flex flex-col gap-2">
            <p className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 select-none">
              Navigation Menu
            </p>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`group flex items-center justify-between px-4 py-3.5 rounded-2xl font-medium transition-all duration-300 text-left relative overflow-hidden ${
                    isSelected
                      ? 'border border-cyan-500/40 bg-gradient-to-r from-cyan-500/15 via-cyan-500/5 to-transparent text-cyan-600 dark:text-cyan-300 font-semibold shadow-[0_8px_20px_-6px_rgba(6,182,212,0.25)] scale-[1.01]'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/80 dark:hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  {isSelected && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                  )}
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon size={19} className={`shrink-0 transition-transform duration-300 group-hover:scale-110 ${isSelected ? 'text-cyan-500 dark:text-cyan-300' : 'text-slate-400 dark:text-slate-500'}`} />
                    <span className="truncate text-sm">{tab.label}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-colors shrink-0 ${
                    isSelected
                      ? 'bg-cyan-400/20 border-cyan-400/40 text-cyan-600 dark:text-cyan-300'
                      : 'bg-slate-200/60 dark:bg-slate-800/60 border-slate-300/60 dark:border-slate-700/60 text-slate-500 dark:text-slate-400'
                  }`}>
                    {tab.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mini Status Card */}
          <div className="dashboard-panel p-4 flex items-center gap-3 bg-gradient-to-br from-slate-100/50 dark:from-slate-900/50 to-transparent border-slate-300/60 dark:border-slate-800/60">
            <div className={`h-10 w-10 shrink-0 rounded-xl bg-gradient-to-tr ${currentAvatarStyle.bg} flex items-center justify-center font-bold text-white shadow-sm`}>
              {initials || '?'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{firstName} {lastName}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{email}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">Online & Synchronized</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0 w-full">
          <AnimatePresence mode="wait">
            {/* TAB 1: PROFILE DETAILS */}
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-6"
              >
                <div className="dashboard-panel p-6 sm:p-8 flex flex-col gap-8">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
                    <div className="relative group shrink-0">
                      <div className={`h-28 w-28 rounded-full bg-gradient-to-tr ${currentAvatarStyle.bg} p-1 shadow-[0_10px_30px_rgba(6,182,212,0.25)] transition-all duration-300 group-hover:scale-105`}>
                        <div className="h-full w-full rounded-full bg-white dark:bg-slate-950 flex items-center justify-center text-4xl font-extrabold transition-all duration-300">
                          <span className={`bg-gradient-to-tr ${currentAvatarStyle.bg} bg-clip-text text-transparent`}>
                            {initials || '?'}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                        className="absolute bottom-0 right-0 h-9 w-9 rounded-full bg-cyan-500 text-slate-950 shadow-lg flex items-center justify-center hover:scale-110 transition-transform border-2 border-white dark:border-slate-950"
                        title="Customize Avatar Style"
                      >
                        <Camera size={16} strokeWidth={2.5} />
                      </button>
                    </div>

                    <div className="flex-1 text-center sm:text-left flex flex-col justify-center">
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{firstName} {lastName}</h2>
                        <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-bold">
                          Pro Member
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{roleTitle}</p>
                      
                      <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                        <button
                          onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                          className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1.5"
                        >
                          <Palette size={14} />
                          {showAvatarPicker ? 'Hide Avatar Swatches' : 'Customize Avatar Theme'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Avatar Picker Swatches Drawer */}
                  <AnimatePresence>
                    {showAvatarPicker && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden rounded-2xl bg-slate-100/80 dark:bg-slate-900/50 border border-slate-300/80 dark:border-slate-800 p-4 -mt-4"
                      >
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-3 flex items-center gap-1.5">
                          <Sparkles size={14} className="text-cyan-500" />
                          Select Avatar Halo Gradient
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                          {avatarGradients.map((g) => {
                            const isSelected = avatarColor === g.id;
                            return (
                              <button
                                key={g.id}
                                onClick={() => setAvatarColor(g.id)}
                                className={`flex flex-col items-center gap-2 p-2.5 rounded-xl border transition-all ${
                                  isSelected
                                    ? 'border-cyan-400 bg-white dark:bg-slate-800 shadow-md scale-105'
                                    : 'border-transparent hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white/50 dark:hover:bg-slate-800/40'
                                }`}
                              >
                                <div className={`h-10 w-10 rounded-full bg-gradient-to-tr ${g.bg} flex items-center justify-center text-white font-bold text-sm shadow-sm`}>
                                  {initials}
                                </div>
                                <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 truncate w-full text-center">{g.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Profile Form Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                        First Name
                        <span className="text-[10px] text-slate-400 font-normal">Required</span>
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-white/80 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                        Last Name
                        <span className="text-[10px] text-slate-400 font-normal">Required</span>
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full bg-white/80 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                      <div className="relative">
                        <Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-white/80 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 rounded-xl pl-10 pr-4 py-3 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Professional Title / Role</label>
                      <div className="relative">
                        <Sliders size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          value={roleTitle}
                          onChange={(e) => setRoleTitle(e.target.value)}
                          className="w-full bg-white/80 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 rounded-xl pl-10 pr-4 py-3 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Bio</label>
                      <span className="text-xs text-slate-400">{bio.length}/300 characters</span>
                    </div>
                    <textarea
                      rows={4}
                      maxLength={300}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Write a short summary about your learning journey..."
                      className="w-full bg-white/80 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 transition-all resize-none"
                    />
                  </div>

                  <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
                      Changes are synchronized across your student dashboard immediately upon saving.
                    </p>
                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                        className="primary-button !px-8"
                      >
                        {isSaving ? (
                          <>
                            <RefreshCw size={16} className="animate-spin" />
                            Saving Profile...
                          </>
                        ) : (
                          <>
                            <Check size={16} strokeWidth={2.5} />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: APPEARANCE & THEMES */}
            {activeTab === 'appearance' && (
              <motion.div
                key="appearance"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-6"
              >
                {/* Lighting & Color Scheme */}
                <div className="dashboard-panel p-6 sm:p-8 flex flex-col gap-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                      <Sun size={22} className="text-amber-500" />
                      App Lighting & Color Scheme
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Choose between bright aurora light mode, deep cosmic dark mode, or follow your operating system preferences.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    {[
                      { id: 'light', label: 'Light Mode', icon: Sun, desc: 'Crisp white glass & subtle slate borders', color: 'text-amber-500' },
                      { id: 'dark', label: 'Dark Mode', icon: Moon, desc: 'Deep obsidian with neon glow highlights', color: 'text-cyan-400' },
                      { id: 'system', label: 'System Default', icon: Monitor, desc: 'Matches device time & OS theme setting', color: 'text-violet-400' },
                    ].map((m) => {
                      const isSelected = mounted && theme === m.id;
                      const Icon = m.icon;
                      return (
                        <button
                          key={m.id}
                          onClick={() => setTheme(m.id)}
                          className={`flex flex-col items-start gap-3 p-5 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden group ${
                            isSelected
                              ? 'border-cyan-400 bg-cyan-500/10 dark:bg-cyan-500/10 shadow-[0_10px_30px_rgba(6,182,212,0.2)] scale-[1.02]'
                              : 'border-slate-300 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 hover:border-slate-400 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-900/80'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className={`flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 ${m.color} group-hover:scale-110 transition-transform`}>
                              <Icon size={20} />
                            </span>
                            {isSelected && (
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400 text-slate-950 font-bold">
                                <Check size={14} strokeWidth={3} />
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white text-base">{m.label}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{m.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sidebar Navigation Theme Presets */}
                <div className="dashboard-panel p-6 sm:p-8 flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                        <Palette size={22} className="text-cyan-500" />
                        Sidebar Navigation Presets
                      </h2>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Personalize the side navigation panel with 4 curated glassmorphism neon presets.
                      </p>
                    </div>
                    <span className="self-start sm:self-center text-xs font-bold px-3 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30">
                      Active: {activeSidebarConfig.name}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                    {sidebarThemeList.map((t) => {
                      const isSelected = sidebarTheme === t.id;
                      return (
                        <div
                          key={t.id}
                          onClick={() => handleSelectSidebarTheme(t.id)}
                          className={`cursor-pointer rounded-3xl border p-6 flex flex-col gap-4 transition-all duration-300 relative overflow-hidden group ${
                            isSelected
                              ? 'border-cyan-400 bg-cyan-500/10 dark:bg-cyan-500/10 shadow-[0_12px_35px_rgba(6,182,212,0.25)] scale-[1.01]'
                              : 'border-slate-300 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/50 hover:border-slate-400 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-900/90'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <span className={`h-3 w-3 rounded-full bg-gradient-to-r ${t.swatchGradient}`} />
                              <span className="font-bold text-slate-900 dark:text-white text-base">{t.name}</span>
                            </div>
                            {isSelected ? (
                              <span className="flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-300 bg-cyan-400/20 px-3 py-1 rounded-full border border-cyan-400/40">
                                <Check size={13} strokeWidth={3} /> Selected
                              </span>
                            ) : (
                              <span className="text-xs font-semibold text-slate-400 group-hover:text-cyan-500 transition-colors">
                                Click to Apply →
                              </span>
                            )}
                          </div>

                          <div className={`h-16 w-full rounded-2xl border bg-gradient-to-br ${t.swatchGradient} ${t.swatchBorder} shadow-md flex items-center justify-center relative overflow-hidden`}>
                            <div className="absolute inset-0 bg-black/20 backdrop-blur-3xs" />
                            <span className="relative z-10 text-xs font-extrabold text-white tracking-widest uppercase px-3 py-1 rounded-lg bg-black/50 backdrop-blur-md border border-white/20 shadow-sm">
                              {t.name} Aesthetic
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                            {t.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Live Navigation & Panel Preview Mockup */}
                <div className="dashboard-panel p-6 sm:p-8 flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Eye size={19} className="text-violet-500" />
                        Live Interface Preview
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Previewing how {activeSidebarConfig.name} preset looks alongside main application panels.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 rounded-2xl border border-slate-300 dark:border-slate-800 bg-slate-100/80 dark:bg-[#070a12] flex flex-col sm:flex-row gap-4 overflow-hidden">
                    {/* Mock Sidebar */}
                    <div className={`${activeSidebarConfig.asideClassName} !w-full sm:!w-56 shrink-0 !relative !left-0 !top-0 !h-auto p-4 rounded-2xl flex flex-col gap-3 border shadow-md`}>
                      <div className="flex items-center gap-2.5">
                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold text-xs ${activeSidebarConfig.logoBoxClassName}`}>
                          NG
                        </div>
                        <div>
                          <p className="text-xs font-bold tracking-tight">NextGen Learn</p>
                          <p className="text-[9px] opacity-70">Student Dashboard</p>
                        </div>
                      </div>
                      <div className="h-px w-full bg-white/10 my-1" />
                      <div className="space-y-1">
                        <div className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs ${activeSidebarConfig.activeLinkClassName}`}>
                          <span className="flex items-center gap-2">
                            <Settings size={14} /> Settings
                          </span>
                          <span className={`h-1.5 w-1.5 rounded-full ${activeSidebarConfig.activeDotClassName}`} />
                        </div>
                        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs ${activeSidebarConfig.inactiveLinkClassName}`}>
                          <User size={14} /> Profile
                        </div>
                      </div>
                      <div className={`mt-4 p-2 rounded-xl flex items-center gap-2 text-xs ${activeSidebarConfig.profileBoxClassName}`}>
                        <div className="h-6 w-6 rounded-md bg-gradient-to-tr from-emerald-400 to-cyan-500 text-slate-950 font-bold flex items-center justify-center text-[10px]">
                          {initials.charAt(0) || 'P'}
                        </div>
                        <span className="truncate font-semibold">{firstName} {lastName}</span>
                      </div>
                    </div>

                    {/* Mock Main Panel Content */}
                    <div className="flex-1 flex flex-col gap-3 min-w-0">
                      <div className="dashboard-panel p-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                          <span className="text-xs font-bold">Synchronized Workspace</span>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-400 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded">
                          Live Render
                        </span>
                      </div>
                      <div className="dashboard-panel p-5 flex-1 flex flex-col justify-center gap-2">
                        <p className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                          Preset Applied: {activeSidebarConfig.name}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          Your chosen theme instantly styles all navigation links, indicator dots, glassmorphic blur levels, and profile tiles across all routes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: NOTIFICATIONS */}
            {activeTab === 'notifications' && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-6"
              >
                <div className="dashboard-panel p-6 sm:p-8 flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                        <Bell size={22} className="text-cyan-500" />
                        Notification Preferences
                      </h2>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Control how and when you receive course updates, reminders, and community interaction alerts.
                      </p>
                    </div>
                    <button
                      onClick={handleTestNotification}
                      className="secondary-button shrink-0 !text-xs !py-2"
                    >
                      <Bell size={14} /> Send Sample Alert
                    </button>
                  </div>

                  <div className="divide-y divide-slate-200/80 dark:divide-slate-800/80 mt-2">
                    {[
                      { key: 'courseUpdates' as const, title: 'Course Updates & New Lessons', desc: 'Get notified instantly when instructors publish new lectures or study resources.' },
                      { key: 'assignmentDeadlines' as const, title: 'Assignment & Quiz Deadlines', desc: 'Receive automated reminder alerts 24 hours prior to upcoming assignment submission windows.' },
                      { key: 'weeklyProgress' as const, title: 'Weekly Progress & Analytics Digest', desc: 'A personalized summary of your learning streaks, completed modules, and achievements delivered every Monday.' },
                      { key: 'communityMentions' as const, title: 'Community & Forum Mentions', desc: 'Alerts when classmates or instructors reply to your forum posts or @mention your username.' },
                      { key: 'securityAlerts' as const, title: 'Security & New Login Alerts', desc: 'High-priority alerts sent when a new device signs into your student dashboard.' },
                    ].map((item) => {
                      const isEnabled = notifications[item.key];
                      return (
                        <div key={item.key} className="py-5 flex items-center justify-between gap-4 first:pt-2 last:pb-2">
                          <div className="min-w-0 pr-4">
                            <p className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">{item.title}</p>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                          </div>
                          <button
                            onClick={() => handleToggleNotification(item.key)}
                            aria-label={`Toggle ${item.title}`}
                            className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 shrink-0 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 ${
                              isEnabled ? 'bg-cyan-500' : 'bg-slate-300 dark:bg-slate-800'
                            }`}
                          >
                            <motion.div
                              layout
                              className="bg-white h-6 w-6 rounded-full shadow-md flex items-center justify-center text-slate-950"
                              animate={{ x: isEnabled ? 24 : 0 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            >
                              {isEnabled ? <Check size={12} strokeWidth={3} className="text-cyan-600" /> : <X size={12} className="text-slate-400" />}
                            </motion.div>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 4: SECURITY & PRIVACY */}
            {activeTab === 'security' && (
              <motion.div
                key="security"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-6"
              >
                {/* Password & Authentication */}
                <div className="dashboard-panel p-6 sm:p-8 flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                        <Lock size={22} className="text-cyan-500" />
                        Password & Authentication
                      </h2>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Manage your account credentials and enable two-factor verification.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowPasswordForm(!showPasswordForm)}
                      className="secondary-button shrink-0 !text-xs !py-2.5"
                    >
                      <KeyRound size={15} />
                      {showPasswordForm ? 'Close Password Form' : 'Update Password'}
                    </button>
                  </div>

                  <AnimatePresence>
                    {showPasswordForm && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden rounded-2xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-800 p-5 space-y-4"
                      >
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                          Change Account Password
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Current Password</label>
                            <input
                              type="password"
                              placeholder="••••••••"
                              value={currentPassword}
                              onChange={(e) => setCurrentPassword(e.target.value)}
                              className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-sm"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">New Password</label>
                            <input
                              type="password"
                              placeholder="••••••••"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-sm"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Confirm New Password</label>
                            <input
                              type="password"
                              placeholder="••••••••"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-sm"
                            />
                          </div>
                        </div>

                        {/* Password Strength Indicator */}
                        {newPassword && (
                          <div className="flex items-center gap-3 pt-1">
                            <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div className={`h-full transition-all duration-300 ${pwdStrength.color}`} style={{ width: `${pwdStrength.score}%` }} />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                              Strength: {pwdStrength.label}
                            </span>
                          </div>
                        )}

                        <div className="flex justify-end pt-2">
                          <button
                            onClick={() => {
                              if (!newPassword || newPassword !== confirmPassword) {
                                showToast("Passwords do not match or are empty!");
                                return;
                              }
                              setShowPasswordForm(false);
                              setCurrentPassword("");
                              setNewPassword("");
                              setConfirmPassword("");
                              showToast("Password updated successfully");
                            }}
                            className="primary-button !py-2 !text-xs"
                          >
                            Save New Password
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* 2FA Toggle */}
                  <div className="flex items-center justify-between gap-4 p-5 rounded-2xl border border-slate-300 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-900/30">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="h-12 w-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
                        <ShieldCheck size={24} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-slate-900 dark:text-white text-base">Two-Factor Authentication (2FA)</p>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase">
                            Recommended
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          Adds an extra layer of protection requiring a time-based verification code when logging in from new devices.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setTwoFactorActive(!twoFactorActive);
                        showToast(twoFactorActive ? "2FA disabled" : "2FA enabled and secured");
                      }}
                      className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 shrink-0 ${
                        twoFactorActive ? 'bg-cyan-500' : 'bg-slate-300 dark:bg-slate-800'
                      }`}
                    >
                      <motion.div
                        layout
                        className="bg-white h-6 w-6 rounded-full shadow-md flex items-center justify-center text-slate-950"
                        animate={{ x: twoFactorActive ? 24 : 0 }}
                      >
                        {twoFactorActive ? <Check size={12} strokeWidth={3} className="text-cyan-600" /> : <X size={12} className="text-slate-400" />}
                      </motion.div>
                    </button>
                  </div>

                  {/* SSO & Premium Auth Portal */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border border-cyan-500/40 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-transparent">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <KeyRound size={18} className="text-cyan-500" />
                        Premium Auth Portal & Theme Preview
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        Access the ultra-premium login, sign-up & SSO gateway styled with responsive light & dark themes.
                      </p>
                    </div>
                    <Link
                      href="/login"
                      className="primary-button shrink-0 !py-2.5 !text-xs shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                    >
                      Go to Login Portal →
                    </Link>
                  </div>
                </div>

                {/* Active Sessions & Devices */}
                <div className="dashboard-panel p-6 sm:p-8 flex flex-col gap-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                      <Laptop size={22} className="text-violet-500" />
                      Active Devices & Sessions
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Review all devices currently authenticated to your student account. Revoke access anytime.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {activeSessions.map((s) => (
                      <div key={s.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-slate-300 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40">
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${
                            s.current ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}>
                            <Laptop size={20} />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-bold text-slate-900 dark:text-white text-sm truncate">{s.device}</p>
                              {s.current && (
                                <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                                  Current Session
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                              {s.location} · IP: {s.ip} · {s.lastActive}
                            </p>
                          </div>
                        </div>

                        {!s.current && (
                          <button
                            onClick={() => handleRevokeSession(s.id)}
                            className="text-xs font-semibold text-red-500 hover:text-red-400 hover:bg-red-500/10 px-3.5 py-2 rounded-xl border border-red-500/20 transition-colors self-start sm:self-center shrink-0"
                          >
                            Revoke Session
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="dashboard-panel p-6 sm:p-8 flex flex-col gap-6 border-red-500/30 bg-red-500/5">
                  <div>
                    <h2 className="text-xl font-bold text-red-500 dark:text-red-400 flex items-center gap-2.5">
                      <AlertTriangle size={22} />
                      Danger Zone
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Irreversible actions regarding your account history, courses, and data.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-red-500/20 bg-white/40 dark:bg-slate-950/40">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white text-base">Delete Account & Course Records</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
                        Permanently removes your profile data, course progress, certificates, and community posts. This action cannot be undone.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="shrink-0 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold px-5 py-2.5 text-xs shadow-lg transition-all"
                    >
                      Delete Account...
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Delete Account Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="dashboard-panel max-w-md w-full p-6 sm:p-8 space-y-5 border-red-500/40 bg-slate-900 text-white"
            >
              <div className="flex items-center gap-3 text-red-400">
                <AlertTriangle size={26} />
                <h3 className="text-xl font-bold">Confirm Account Deletion</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Are you completely sure you want to delete <span className="font-semibold text-white">{email}</span>? All enrolled courses, certificates, and progress will be erased immediately.
              </p>
              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="secondary-button !py-2 !text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    showToast("Deletion request canceled for safety in demonstration mode.");
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

