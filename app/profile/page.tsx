"use client";

import { useState, useEffect, useRef } from 'react';
import { 
  User, Mail, Check, Camera, GraduationCap, BookOpen, Calendar, Award, 
  Sparkles, Shield, Zap, Share2, Copy, Edit3, X, Plus, ExternalLink, 
  Palette, Star, CheckCircle2, Globe, QrCode, CreditCard, Code, Terminal, Layers
} from 'lucide-react';

// Define theme options for the profile banner and accents
const THEMES = [
  { id: 'cyber', name: 'Cyber Neon', gradient: 'from-cyan-500 via-blue-600 to-indigo-600', border: 'border-cyan-400/50', text: 'text-cyan-400', bg: 'bg-cyan-500/10', glow: 'shadow-[0_0_30px_rgba(34,211,238,0.3)]' },
  { id: 'obsidian', name: 'Emerald Frost', gradient: 'from-emerald-500 via-teal-600 to-cyan-600', border: 'border-emerald-400/50', text: 'text-emerald-400', bg: 'bg-emerald-500/10', glow: 'shadow-[0_0_30px_rgba(16,185,129,0.3)]' },
  { id: 'sunset', name: 'Sunset Glow', gradient: 'from-amber-500 via-rose-500 to-purple-600', border: 'border-rose-400/50', text: 'text-rose-400', bg: 'bg-rose-500/10', glow: 'shadow-[0_0_30px_rgba(244,63,94,0.3)]' },
  { id: 'violet', name: 'Royal Violet', gradient: 'from-violet-600 via-purple-600 to-pink-500', border: 'border-purple-400/50', text: 'text-purple-400', bg: 'bg-purple-500/10', glow: 'shadow-[0_0_30px_rgba(168,85,247,0.3)]' },
  { id: 'crimson', name: 'Crimson Pulse', gradient: 'from-red-500 via-rose-600 to-orange-500', border: 'border-red-400/50', text: 'text-red-400', bg: 'bg-red-500/10', glow: 'shadow-[0_0_30px_rgba(239,68,68,0.3)]' },
];

export default function ProfilePage() {
  const [firstName, setFirstName] = useState("Pramod");
  const [lastName, setLastName] = useState("Chavan");
  const [email, setEmail] = useState("prem@gmail.com");
  const [bio, setBio] = useState("Pro learner trying to master full-stack development. I enjoy building beautiful and responsive web applications.");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Student Details State
  const [studentId, setStudentId] = useState("STU-849201");
  const [university, setUniversity] = useState("Tech Global University");
  const [course, setCourse] = useState("B.S. Computer Science");
  const [yearOfStudy, setYearOfStudy] = useState("Junior");

  // Premium Features State
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const [skills, setSkills] = useState<string[]>(["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Python"]);
  const [newSkillInput, setNewSkillInput] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("https://github.com/pramodchavan");
  const [linkedinUrl, setLinkedinUrl] = useState("https://linkedin.com/in/pramodchavan");
  const [activeTab, setActiveTab] = useState<'profile' | 'academic' | 'skills'>('profile');
  const [showIdCardModal, setShowIdCardModal] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        if (parsed.firstName !== undefined) setFirstName(parsed.firstName);
        if (parsed.lastName !== undefined) setLastName(parsed.lastName);
        if (parsed.email !== undefined) setEmail(parsed.email);
        if (parsed.bio !== undefined) setBio(parsed.bio);
        if (parsed.studentId !== undefined) setStudentId(parsed.studentId);
        if (parsed.university !== undefined) setUniversity(parsed.university);
        if (parsed.course !== undefined) setCourse(parsed.course);
        if (parsed.yearOfStudy !== undefined) setYearOfStudy(parsed.yearOfStudy);
        if (parsed.profilePicture !== undefined) setProfilePicture(parsed.profilePicture);
        if (parsed.skills !== undefined && Array.isArray(parsed.skills)) setSkills(parsed.skills);
        if (parsed.portfolioUrl !== undefined) setPortfolioUrl(parsed.portfolioUrl);
        if (parsed.linkedinUrl !== undefined) setLinkedinUrl(parsed.linkedinUrl);
        if (parsed.themeId !== undefined) {
          const found = THEMES.find(t => t.id === parsed.themeId);
          if (found) setSelectedTheme(found);
        }
      } catch (e) {
        console.error("Failed to parse profile data", e);
      }
    }
  }, []);

  const initials = `${firstName.charAt(0) || ''}${lastName.charAt(0) || ''}`.toUpperCase();

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('userProfile', JSON.stringify({
        firstName, lastName, email, bio, studentId, university, course, yearOfStudy, profilePicture,
        skills, portfolioUrl, linkedinUrl, themeId: selectedTheme.id
      }));
      window.dispatchEvent(new Event('profileUpdated'));
      setIsSaving(false);
      setSaved(true);
      setIsEditing(false);
      setTimeout(() => setSaved(false), 3000);
    }, 600);
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkillInput.trim() && !skills.includes(newSkillInput.trim())) {
      setSkills([...skills, newSkillInput.trim()]);
      setNewSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    if (!isEditing) return;
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const copyStudentId = () => {
    navigator.clipboard.writeText(studentId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Top Premium Header Panel */}
      <header className="dashboard-panel relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/10 blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-gradient-to-tr from-blue-500/20 via-emerald-500/15 to-transparent blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-semibold">
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 ${selectedTheme.bg} ${selectedTheme.border} ${selectedTheme.text} shadow-sm backdrop-blur-md`}>
                <Sparkles size={14} className="animate-spin-slow" />
                NextGen OS Premium Profile
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-400">
                <CheckCircle2 size={13} />
                Verified Student
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-purple-300">
                <Zap size={13} />
                Level 42 Pro Learner
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {firstName} <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">{lastName}</span>
            </h1>
            <p className="max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {bio}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setShowIdCardModal(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/10 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95"
            >
              <CreditCard size={16} className="text-cyan-400" />
              Digital ID Card
            </button>

            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.6)] hover:scale-[1.03] active:scale-95 transition-all duration-300"
              >
                <Edit3 size={16} />
                Edit Profile
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.6)] hover:scale-[1.03] active:scale-95 transition-all duration-300 disabled:opacity-70"
                >
                  {isSaving ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check size={16} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Theme Selector Strip */}
        <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
            <Palette size={16} className="text-cyan-400" />
            <span>Profile Accent Theme:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                  selectedTheme.id === theme.id 
                    ? `bg-gradient-to-r ${theme.gradient} text-white shadow-lg scale-105 ring-2 ring-white/20` 
                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${theme.gradient}`} />
                {theme.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Identity & Stats Card (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Avatar & Status Card */}
          <div className="dashboard-panel rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 p-6 backdrop-blur-2xl shadow-xl flex flex-col items-center text-center relative overflow-hidden">
            {/* Top Banner Gradient */}
            <div className={`absolute top-0 left-0 right-0 h-28 bg-gradient-to-r ${selectedTheme.gradient} opacity-80`} />
            
            {/* Avatar Circle with Hover Overlay */}
            <div className="relative mt-8 mb-4 group">
              <div className={`h-32 w-32 rounded-full bg-gradient-to-tr ${selectedTheme.gradient} p-1.5 shadow-2xl transition-transform duration-300 group-hover:scale-105 ${selectedTheme.glow}`}>
                <div className="h-full w-full rounded-full bg-white dark:bg-slate-950 flex items-center justify-center text-4xl font-extrabold text-slate-800 dark:text-white overflow-hidden relative">
                  {profilePicture ? (
                    <img src={profilePicture} alt="Profile" className="h-full w-full object-cover" />
                  ) : (
                    <span className="bg-gradient-to-br from-cyan-400 to-blue-600 bg-clip-text text-transparent">{initials || '?'}</span>
                  )}

                  {/* Hover Camera Overlay for upload */}
                  {isEditing && (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <Camera size={24} className="mb-1 text-cyan-300" />
                      <span className="text-xs font-semibold">Change Photo</span>
                    </div>
                  )}
                </div>
              </div>
              
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setProfilePicture(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />

              {/* Online Status Dot */}
              <div className="absolute bottom-2 right-2 h-6 w-6 rounded-full bg-emerald-500 border-4 border-white dark:border-slate-900 shadow-lg flex items-center justify-center">
                <span className="h-2 w-2 rounded-full bg-white animate-ping" />
              </div>
            </div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-1.5 justify-center">
              {firstName} {lastName}
            </h2>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">
              {course} • {yearOfStudy}
            </p>

            {/* Quick Actions / Upload Button when editing */}
            {isEditing && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-3 text-xs font-semibold text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors"
              >
                Upload new profile picture
              </button>
            )}

            {/* XP Progress Bar */}
            <div className="w-full mt-6 pt-6 border-t border-slate-200/80 dark:border-white/10 text-left">
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-slate-600 dark:text-slate-300 flex items-center gap-1">
                  <Award size={14} className="text-amber-400" /> Level 42 Progress
                </span>
                <span className={selectedTheme.text}>8,450 / 10,000 XP</span>
              </div>
              <div className="h-2.5 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden p-0.5">
                <div 
                  className={`h-full rounded-full bg-gradient-to-r ${selectedTheme.gradient} transition-all duration-1000 w-[84%]`} 
                />
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1.5 text-center">
                🌟 1,550 XP remaining to reach Senior status
              </p>
            </div>

            {/* Student ID Pill */}
            <div className="w-full mt-4 p-3 rounded-2xl bg-slate-100/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between text-left">
              <div>
                <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Student ID</div>
                <div className="text-sm font-mono font-bold text-slate-800 dark:text-slate-200">{studentId}</div>
              </div>
              <button 
                onClick={copyStudentId}
                title="Copy Student ID"
                className="p-2 rounded-xl bg-white dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-600 dark:text-slate-300 transition-colors"
              >
                {copiedId ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          {/* Social & Tech Links Card */}
          <div className="dashboard-panel rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 p-6 backdrop-blur-2xl shadow-xl flex flex-col gap-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-3">
              <Globe size={18} className="text-cyan-400" />
              Connected Profiles
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0">
                  <Code size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">GitHub Profile</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      className="w-full text-xs bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-cyan-400"
                    />
                  ) : (
                    <a href={portfolioUrl} target="_blank" rel="noreferrer" className="block text-xs font-medium text-cyan-500 hover:underline truncate">
                      {portfolioUrl}
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0">
                  <Layers size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">LinkedIn / Career</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="w-full text-xs bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-cyan-400"
                    />
                  ) : (
                    <a href={linkedinUrl} target="_blank" rel="noreferrer" className="block text-xs font-medium text-cyan-500 hover:underline truncate">
                      {linkedinUrl}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Highlights */}
          <div className="grid grid-cols-2 gap-4">
            <div className="dashboard-panel rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 p-4 text-center">
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white">14 Days</div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">🔥 Active Streak</div>
            </div>
            <div className="dashboard-panel rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 p-4 text-center">
              <div className="text-2xl font-extrabold text-cyan-500">Top 5%</div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">🏆 Class Rank</div>
            </div>
          </div>

        </div>

        {/* Right Column: Tabbed Information Forms (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-200/80 dark:bg-slate-900/80 rounded-2xl border border-slate-300/50 dark:border-white/10 backdrop-blur-xl w-fit">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === 'profile'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <User size={16} className={activeTab === 'profile' ? selectedTheme.text : ''} />
              Personal Info
            </button>
            <button
              onClick={() => setActiveTab('academic')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === 'academic'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <GraduationCap size={16} className={activeTab === 'academic' ? selectedTheme.text : ''} />
              Academic Details
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === 'skills'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Terminal size={16} className={activeTab === 'skills' ? selectedTheme.text : ''} />
              Skills & Tech Stack
            </button>
          </div>

          {/* TAB 1: PERSONAL INFORMATION */}
          {activeTab === 'profile' && (
            <div className="dashboard-panel rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 p-6 sm:p-8 backdrop-blur-2xl shadow-xl space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Personal Information</h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Update your personal details and public biography.</p>
                </div>
                {isEditing && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse">
                    Editing Enabled
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <User size={15} className="text-cyan-400" /> First Name
                  </label>
                  <input 
                    type="text" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={!isEditing}
                    className="w-full bg-white dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 rounded-xl px-4 py-3 text-slate-800 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all disabled:opacity-75 disabled:bg-slate-50 dark:disabled:bg-slate-900/40 disabled:cursor-not-allowed shadow-inner"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <User size={15} className="text-cyan-400" /> Last Name
                  </label>
                  <input 
                    type="text" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={!isEditing}
                    className="w-full bg-white dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 rounded-xl px-4 py-3 text-slate-800 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all disabled:opacity-75 disabled:bg-slate-50 dark:disabled:bg-slate-900/40 disabled:cursor-not-allowed shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Mail size={15} className="text-cyan-400" /> Email Address
                </label>
                <div className="relative">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isEditing}
                    className="w-full bg-white dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 rounded-xl px-4 py-3 text-slate-800 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all disabled:opacity-75 disabled:bg-slate-50 dark:disabled:bg-slate-900/40 disabled:cursor-not-allowed shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Biography</span>
                  <span className="text-xs font-normal text-slate-400">{bio.length} characters</span>
                </label>
                <textarea 
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  disabled={!isEditing}
                  placeholder="Write a few sentences about your coding journey and goals..."
                  className="w-full bg-white dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 rounded-xl px-4 py-3 text-slate-800 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all resize-none disabled:opacity-75 disabled:bg-slate-50 dark:disabled:bg-slate-900/40 disabled:cursor-not-allowed shadow-inner leading-relaxed"
                />
              </div>

              <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 flex items-start gap-3">
                <Shield className="text-cyan-400 shrink-0 mt-0.5" size={18} />
                <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Data Privacy Assurance:</span> Your profile data is encrypted and synced locally within your Student OS workspace. Changes are reflected immediately across dashboard modules.
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ACADEMIC DETAILS */}
          {activeTab === 'academic' && (
            <div className="dashboard-panel rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 p-6 sm:p-8 backdrop-blur-2xl shadow-xl space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Academic Credentials</h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Manage your university registration and curriculum program.</p>
                </div>
                {isEditing && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse">
                    Editing Enabled
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Award size={15} className="text-purple-400" /> Student ID Number
                  </label>
                  <input 
                    type="text" 
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    disabled={!isEditing}
                    className="w-full font-mono bg-white dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 rounded-xl px-4 py-3 text-slate-800 dark:text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all disabled:opacity-75 disabled:bg-slate-50 dark:disabled:bg-slate-900/40 disabled:cursor-not-allowed shadow-inner"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <GraduationCap size={15} className="text-purple-400" /> University / Institution
                  </label>
                  <input 
                    type="text" 
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    disabled={!isEditing}
                    className="w-full bg-white dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 rounded-xl px-4 py-3 text-slate-800 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all disabled:opacity-75 disabled:bg-slate-50 dark:disabled:bg-slate-900/40 disabled:cursor-not-allowed shadow-inner"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <BookOpen size={15} className="text-purple-400" /> Course / Major
                  </label>
                  <input 
                    type="text" 
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    disabled={!isEditing}
                    className="w-full bg-white dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 rounded-xl px-4 py-3 text-slate-800 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all disabled:opacity-75 disabled:bg-slate-50 dark:disabled:bg-slate-900/40 disabled:cursor-not-allowed shadow-inner"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Calendar size={15} className="text-purple-400" /> Current Academic Standing
                  </label>
                  <select 
                    value={yearOfStudy}
                    onChange={(e) => setYearOfStudy(e.target.value)}
                    disabled={!isEditing}
                    className="w-full bg-white dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 rounded-xl px-4 py-3 text-slate-800 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all disabled:opacity-75 disabled:bg-slate-50 dark:disabled:bg-slate-900/40 disabled:cursor-not-allowed shadow-inner"
                  >
                    <option value="Freshman" className="bg-white dark:bg-slate-900">Freshman (Year 1)</option>
                    <option value="Sophomore" className="bg-white dark:bg-slate-900">Sophomore (Year 2)</option>
                    <option value="Junior" className="bg-white dark:bg-slate-900">Junior (Year 3)</option>
                    <option value="Senior" className="bg-white dark:bg-slate-900">Senior (Year 4)</option>
                    <option value="Graduate" className="bg-white dark:bg-slate-900">Graduate / Masters</option>
                  </select>
                </div>
              </div>

              {/* Status Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-transparent border border-purple-500/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Degree Progress: Good Standing</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Enrolled full-time for Spring / Fall 2026 Semester.</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  Verified
                </span>
              </div>
            </div>
          )}

          {/* TAB 3: SKILLS & TECH STACK */}
          {activeTab === 'skills' && (
            <div className="dashboard-panel rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 p-6 sm:p-8 backdrop-blur-2xl shadow-xl space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Skills & Technologies</h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Showcase your programming languages, frameworks, and tools.</p>
                </div>
                {isEditing && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse">
                    Click × to remove skills
                  </span>
                )}
              </div>

              {/* Add Skill Form when editing */}
              {isEditing && (
                <form onSubmit={handleAddSkill} className="flex gap-2">
                  <input
                    type="text"
                    value={newSkillInput}
                    onChange={(e) => setNewSkillInput(e.target.value)}
                    placeholder="Add a skill (e.g., GraphQL, Docker, Rust)..."
                    className="flex-1 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all flex items-center gap-1 shadow-md"
                  >
                    <Plus size={16} /> Add
                  </button>
                </form>
              )}

              {/* Skills Grid */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className={`group flex items-center gap-2 px-4 py-2.5 rounded-2xl font-semibold text-sm transition-all duration-300 ${
                      selectedTheme.bg
                    } ${selectedTheme.border} border ${selectedTheme.text} shadow-sm hover:scale-105`}
                  >
                    <Terminal size={14} className="opacity-70" />
                    <span>{skill}</span>
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-1 h-5 w-5 rounded-full hover:bg-red-500/20 text-red-400 flex items-center justify-center transition-colors"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
                {skills.length === 0 && (
                  <p className="text-sm text-slate-500 italic py-4">No skills added yet. Click edit profile to add your tech stack!</p>
                )}
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 mt-6">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles size={16} className="text-cyan-400" />
                  AI Skill Matching Active
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Your listed skills are automatically indexed by NextGen OS to recommend tailored courses, coding challenges, and career milestones.
                </p>
              </div>
            </div>
          )}

          {/* Bottom Save Notification Toast */}
          {saved && (
            <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow-2xl border border-white/20 animate-in fade-in slide-in-from-bottom-6 duration-300">
              <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                <Check size={18} />
              </div>
              <div>
                <div className="text-sm">Profile Updated Successfully</div>
                <div className="text-[11px] font-normal opacity-80">Your student preferences have been synchronized.</div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* DIGITAL STUDENT ID CARD MODAL */}
      {showIdCardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-md rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-black border border-white/20 shadow-[0_0_50px_rgba(34,211,238,0.25)] p-6 text-white animate-in zoom-in-95 duration-300">
            
            {/* Modal Close Button */}
            <button
              onClick={() => setShowIdCardModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Header / ID Card Banner */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center font-black text-slate-950 text-sm">
                  NG
                </div>
                <div>
                  <div className="font-bold text-sm tracking-wide">NEXTGEN LEARN</div>
                  <div className="text-[10px] text-cyan-400 font-mono">STUDENT OPERATING SYSTEM</div>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                2026-2027 PASS
              </span>
            </div>

            {/* ID Card Content */}
            <div className="flex flex-col items-center text-center my-6">
              <div className={`h-28 w-28 rounded-2xl bg-gradient-to-tr ${selectedTheme.gradient} p-1 shadow-2xl mb-4 ${selectedTheme.glow}`}>
                <div className="h-full w-full rounded-xl bg-slate-950 flex items-center justify-center text-3xl font-extrabold overflow-hidden">
                  {profilePicture ? (
                    <img src={profilePicture} alt="Profile" className="h-full w-full object-cover" />
                  ) : (
                    <span>{initials || '?'}</span>
                  )}
                </div>
              </div>

              <h3 className="text-2xl font-extrabold">{firstName} {lastName}</h3>
              <p className="text-cyan-400 font-medium text-sm mt-0.5">{course}</p>
              <p className="text-slate-400 text-xs mt-1">{university} • {yearOfStudy}</p>
            </div>

            {/* ID Details Strip */}
            <div className="grid grid-cols-2 gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 text-left my-6 font-mono">
              <div>
                <div className="text-[10px] text-slate-400 uppercase">STUDENT ID</div>
                <div className="text-sm font-bold text-cyan-300">{studentId}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase">STATUS</div>
                <div className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" /> ACTIVE PRO
                </div>
              </div>
            </div>

            {/* Barcode Placeholder */}
            <div className="flex flex-col items-center justify-center pt-2 border-t border-white/10">
              <div className="h-10 w-full bg-gradient-to-r from-transparent via-white/80 to-transparent flex items-center justify-center font-mono tracking-[0.4em] text-black text-xs font-bold opacity-90 rounded">
                |||| | |||||| | || | |||| ||| ||
              </div>
              <span className="text-[10px] text-slate-500 mt-2 font-mono">VERIFIED STUDENT ID CARD</span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
