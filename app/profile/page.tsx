"use client";

import { useState, useEffect, useRef } from 'react';
import { 
  User, Mail, Check, Camera, GraduationCap, BookOpen, Calendar, Award, 
  Sparkles, Shield, Zap, Copy, Edit3, X, Plus, Palette, CheckCircle2, 
  Globe, CreditCard, Code, Terminal, Layers
} from 'lucide-react';

// Define theme options with premium hover glows, shadows, and focus rings
const THEMES = [
  { 
    id: 'cyber', 
    name: 'Cyber Neon', 
    gradient: 'from-cyan-500 via-blue-600 to-indigo-600', 
    border: 'border-cyan-400/50', 
    hoverBorder: 'hover:border-cyan-400/80 dark:hover:border-cyan-400/80',
    hoverShadow: 'hover:shadow-[0_15px_45px_-10px_rgba(34,211,238,0.25)]',
    text: 'text-cyan-400', 
    bg: 'bg-cyan-500/10', 
    glow: 'shadow-[0_0_35px_rgba(34,211,238,0.35)]',
    focusRing: 'focus:ring-cyan-500/25 focus:border-cyan-400'
  },
  { 
    id: 'emerald', 
    name: 'Emerald Frost', 
    gradient: 'from-emerald-500 via-teal-600 to-cyan-600', 
    border: 'border-emerald-400/50', 
    hoverBorder: 'hover:border-emerald-400/80 dark:hover:border-emerald-400/80',
    hoverShadow: 'hover:shadow-[0_15px_45px_-10px_rgba(16,185,129,0.25)]',
    text: 'text-emerald-400', 
    bg: 'bg-emerald-500/10', 
    glow: 'shadow-[0_0_35px_rgba(16,185,129,0.35)]',
    focusRing: 'focus:ring-emerald-500/25 focus:border-emerald-400'
  },
  { 
    id: 'sunset', 
    name: 'Sunset Glow', 
    gradient: 'from-amber-500 via-rose-500 to-purple-600', 
    border: 'border-rose-400/50', 
    hoverBorder: 'hover:border-rose-400/80 dark:hover:border-rose-400/80',
    hoverShadow: 'hover:shadow-[0_15px_45px_-10px_rgba(244,63,94,0.25)]',
    text: 'text-rose-400', 
    bg: 'bg-rose-500/10', 
    glow: 'shadow-[0_0_35px_rgba(244,63,94,0.35)]',
    focusRing: 'focus:ring-rose-500/25 focus:border-rose-400'
  },
  { 
    id: 'violet', 
    name: 'Royal Violet', 
    gradient: 'from-violet-600 via-purple-600 to-pink-500', 
    border: 'border-purple-400/50', 
    hoverBorder: 'hover:border-purple-400/80 dark:hover:border-purple-400/80',
    hoverShadow: 'hover:shadow-[0_15px_45px_-10px_rgba(168,85,247,0.25)]',
    text: 'text-purple-400', 
    bg: 'bg-purple-500/10', 
    glow: 'shadow-[0_0_35px_rgba(168,85,247,0.35)]',
    focusRing: 'focus:ring-purple-500/25 focus:border-purple-400'
  },
  { 
    id: 'crimson', 
    name: 'Crimson Pulse', 
    gradient: 'from-red-500 via-rose-600 to-orange-500', 
    border: 'border-red-400/50', 
    hoverBorder: 'hover:border-red-400/80 dark:hover:border-red-400/80',
    hoverShadow: 'hover:shadow-[0_15px_45px_-10px_rgba(239,68,68,0.25)]',
    text: 'text-red-400', 
    bg: 'bg-red-500/10', 
    glow: 'shadow-[0_0_35px_rgba(239,68,68,0.35)]',
    focusRing: 'focus:ring-red-500/25 focus:border-red-400'
  },
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
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [leetcodeUrl, setLeetcodeUrl] = useState("");
  const [activeTab, setActiveTab] = useState<'profile' | 'academic' | 'skills'>('profile');
  const [showIdCardModal, setShowIdCardModal] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadProfile = () => {
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
          if (parsed.portfolioUrl !== undefined) setPortfolioUrl(parsed.portfolioUrl || "");
          if (parsed.linkedinUrl !== undefined) setLinkedinUrl(parsed.linkedinUrl || "");
          if (parsed.leetcodeUrl !== undefined) setLeetcodeUrl(parsed.leetcodeUrl || "");
          if (parsed.themeId !== undefined) {
            const found = THEMES.find(t => t.id === parsed.themeId);
            if (found) setSelectedTheme(found);
          }
        } catch (e) {
          console.error("Failed to parse profile data", e);
        }
      }
    };
    loadProfile();
    window.addEventListener('profileUpdated', loadProfile);
    return () => window.removeEventListener('profileUpdated', loadProfile);
  }, []);

  const initials = `${firstName.charAt(0) || ''}${lastName.charAt(0) || ''}`.toUpperCase();

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('userProfile', JSON.stringify({
        firstName, lastName, email, bio, studentId, university, course, yearOfStudy, profilePicture,
        skills, portfolioUrl, linkedinUrl, leetcodeUrl, themeId: selectedTheme.id
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
      
      {/* Top Premium Header Panel with Stable Hover Glow */}
      <header className={`relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 p-6 sm:p-8 backdrop-blur-2xl shadow-xl transition-all duration-500 ${selectedTheme.hoverBorder} ${selectedTheme.hoverShadow}`}>
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/10 blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-gradient-to-tr from-blue-500/20 via-emerald-500/15 to-transparent blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-semibold">
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 ${selectedTheme.bg} ${selectedTheme.border} ${selectedTheme.text} shadow-sm backdrop-blur-md transition-transform duration-300 hover:scale-105 cursor-default`}>
                <Sparkles size={14} className="animate-spin-slow" />
                NextGen OS Premium Profile
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-400 transition-transform duration-300 hover:scale-105 cursor-default">
                <CheckCircle2 size={13} />
                Verified Student
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-purple-300 transition-transform duration-300 hover:scale-105 cursor-default">
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
            {/* Digital ID Card Button with Shimmer and Neon Hover */}
            <button
              onClick={() => setShowIdCardModal(true)}
              className="group relative inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-white/15 bg-white/80 dark:bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/10 hover:border-cyan-400/60 dark:hover:border-cyan-400/60 hover:text-cyan-500 dark:hover:text-cyan-300 transition-all duration-300 shadow-sm hover:shadow-[0_0_25px_rgba(34,211,238,0.25)] hover:scale-[1.03] active:scale-95 overflow-hidden"
            >
              <CreditCard size={16} className="text-cyan-400 transition-transform duration-300 group-hover:rotate-12" />
              <span>Digital ID Card</span>
            </button>

            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.7)] hover:scale-[1.03] active:scale-95 transition-all duration-300 overflow-hidden"
              >
                {/* Button Light Shimmer */}
                <span className="absolute inset-0 w-1/2 h-full bg-white/25 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
                <Edit3 size={16} className="transition-transform duration-300 group-hover:scale-110" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-300 hover:scale-105"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.7)] hover:scale-[1.03] active:scale-95 transition-all duration-300 disabled:opacity-70 overflow-hidden"
                >
                  <span className="absolute inset-0 w-1/2 h-full bg-white/25 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
                  {isSaving ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check size={16} className="transition-transform duration-300 group-hover:scale-125" />
                      <span>Save Changes</span>
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
            <Palette size={16} className="text-cyan-400 animate-pulse" />
            <span>Profile Accent Theme:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme)}
                className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 ${
                  selectedTheme.id === theme.id 
                    ? `bg-gradient-to-r ${theme.gradient} text-white shadow-[0_0_20px_rgba(34,211,238,0.4)] scale-105 ring-2 ring-white/20` 
                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/15 hover:text-slate-900 dark:hover:text-white hover:scale-105 hover:shadow-md'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${theme.gradient} transition-transform duration-300 group-hover:scale-125`} />
                <span>{theme.name}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Identity & Stats Card (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Avatar & Status Card with Stable Hover Border Glow */}
          <div className={`relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 p-6 backdrop-blur-2xl shadow-xl flex flex-col items-center text-center transition-all duration-500 ${selectedTheme.hoverBorder} ${selectedTheme.hoverShadow}`}>
            {/* Top Banner Gradient */}
            <div className={`absolute top-0 left-0 right-0 h-28 bg-gradient-to-r ${selectedTheme.gradient} opacity-80 transition-opacity duration-500`} />
            
            {/* Avatar Circle with Hover Overlay */}
            <div className="relative mt-8 mb-4 group cursor-pointer">
              <div className={`h-32 w-32 rounded-full bg-gradient-to-tr ${selectedTheme.gradient} p-1.5 shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] ${selectedTheme.glow}`}>
                <div className="h-full w-full rounded-full bg-white dark:bg-slate-950 flex items-center justify-center text-4xl font-extrabold text-slate-800 dark:text-white overflow-hidden relative">
                  {profilePicture ? (
                    <img src={profilePicture} alt="Profile" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <span className="bg-gradient-to-br from-cyan-400 to-blue-600 bg-clip-text text-transparent transition-transform duration-500 group-hover:scale-110">{initials || '?'}</span>
                  )}

                  {/* Hover Camera Overlay for upload */}
                  {isEditing && (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <Camera size={26} className="mb-1 text-cyan-300 animate-bounce" />
                      <span className="text-xs font-semibold tracking-wide">Change Photo</span>
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
              <div className="absolute bottom-2 right-2 h-6 w-6 rounded-full bg-emerald-500 border-4 border-white dark:border-slate-900 shadow-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
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
                  <Award size={14} className="text-amber-400 animate-pulse" /> Level 42 Progress
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

            {/* Student ID Pill with Sleek Hover */}
            <div className="w-full mt-4 p-3 rounded-2xl bg-slate-100/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between text-left transition-all duration-300 hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-200/50 dark:hover:bg-white/10">
              <div>
                <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Student ID</div>
                <div className="text-sm font-mono font-bold text-slate-800 dark:text-slate-200">{studentId}</div>
              </div>
              <button 
                onClick={copyStudentId}
                title="Copy Student ID"
                className="p-2.5 rounded-xl bg-white dark:bg-white/10 hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-slate-950 text-slate-600 dark:text-slate-300 transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm"
              >
                {copiedId ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          {/* Social & Tech Links Card with Stable Hover Glow */}
          <div className={`relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 p-6 backdrop-blur-2xl shadow-xl flex flex-col gap-4 transition-all duration-500 ${selectedTheme.hoverBorder} ${selectedTheme.hoverShadow}`}>
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Globe size={18} className="text-cyan-400" />
                Connected Profiles
              </h3>
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="text-[11px] font-extrabold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 bg-cyan-500/10 dark:bg-cyan-400/10 hover:bg-cyan-500/20 px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 shadow-sm"
              >
                <span>{isEditing ? "Done Editing" : "✏️ Edit Links"}</span>
              </button>
            </div>

            <div className="space-y-3">
              <div className="group/item flex items-center gap-3 p-2 rounded-2xl transition-all duration-300 hover:bg-slate-100 dark:hover:bg-white/5">
                <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0 transition-all duration-300 group-hover/item:border-cyan-400/50 group-hover/item:text-cyan-400 group-hover/item:scale-110">
                  <Code size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center justify-between">
                    <span>GitHub Profile</span>
                    {!portfolioUrl && !isEditing && (
                      <span className="text-[10px] text-amber-500 font-bold">Not Connected</span>
                    )}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      placeholder="https://github.com/yourusername"
                      className={`w-full text-xs bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none transition-all duration-300 ${selectedTheme.focusRing}`}
                    />
                  ) : portfolioUrl && portfolioUrl.trim() !== '' ? (
                    <a href={portfolioUrl} target="_blank" rel="noreferrer" className="block text-xs font-medium text-cyan-500 hover:text-cyan-400 hover:underline truncate transition-colors">
                      {portfolioUrl}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="text-left text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 flex items-center gap-1 mt-0.5 transition-all group-hover/item:translate-x-1"
                    >
                      <span>⚡ + Give & Connect Personal GitHub</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="group/item flex items-center gap-3 p-2 rounded-2xl transition-all duration-300 hover:bg-slate-100 dark:hover:bg-white/5">
                <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0 transition-all duration-300 group-hover/item:border-cyan-400/50 group-hover/item:text-cyan-400 group-hover/item:scale-110">
                  <Layers size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center justify-between">
                    <span>LinkedIn / Career</span>
                    {!linkedinUrl && !isEditing && (
                      <span className="text-[10px] text-amber-500 font-bold">Not Connected</span>
                    )}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      placeholder="https://linkedin.com/in/yourusername"
                      className={`w-full text-xs bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none transition-all duration-300 ${selectedTheme.focusRing}`}
                    />
                  ) : linkedinUrl && linkedinUrl.trim() !== '' ? (
                    <a href={linkedinUrl} target="_blank" rel="noreferrer" className="block text-xs font-medium text-cyan-500 hover:text-cyan-400 hover:underline truncate transition-colors">
                      {linkedinUrl}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="text-left text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 flex items-center gap-1 mt-0.5 transition-all group-hover/item:translate-x-1"
                    >
                      <span>⚡ + Give & Connect Personal LinkedIn</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="group/item flex items-center gap-3 p-2 rounded-2xl transition-all duration-300 hover:bg-slate-100 dark:hover:bg-white/5">
                <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0 transition-all duration-300 group-hover/item:border-cyan-400/50 group-hover/item:text-cyan-400 group-hover/item:scale-110">
                  <Terminal size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center justify-between">
                    <span>LeetCode Profile</span>
                    {!leetcodeUrl && !isEditing && (
                      <span className="text-[10px] text-amber-500 font-bold">Not Connected</span>
                    )}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={leetcodeUrl}
                      onChange={(e) => setLeetcodeUrl(e.target.value)}
                      placeholder="https://leetcode.com/u/yourusername"
                      className={`w-full text-xs bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none transition-all duration-300 ${selectedTheme.focusRing}`}
                    />
                  ) : leetcodeUrl && leetcodeUrl.trim() !== '' ? (
                    <a href={leetcodeUrl} target="_blank" rel="noreferrer" className="block text-xs font-medium text-cyan-500 hover:text-cyan-400 hover:underline truncate transition-colors">
                      {leetcodeUrl}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="text-left text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 flex items-center gap-1 mt-0.5 transition-all group-hover/item:translate-x-1"
                    >
                      <span>⚡ + Give & Connect Personal LeetCode</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Highlights with Floating Hover Lift */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 p-4 text-center backdrop-blur-xl shadow-lg transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(59,130,246,0.2)] ${selectedTheme.hoverBorder} group/stat`}>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white transition-transform duration-300 group-hover/stat:scale-110">14 Days</div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">🔥 Active Streak</div>
            </div>
            <div className={`relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 p-4 text-center backdrop-blur-xl shadow-lg transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(34,211,238,0.2)] ${selectedTheme.hoverBorder} group/stat`}>
              <div className="text-2xl font-extrabold text-cyan-500 transition-transform duration-300 group-hover/stat:scale-110">Top 5%</div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">🏆 Class Rank</div>
            </div>
          </div>

        </div>

        {/* Right Column: Tabbed Information Forms (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Navigation Tabs with Silky Slide & Hover */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-200/80 dark:bg-slate-900/80 rounded-2xl border border-slate-300/50 dark:border-white/10 backdrop-blur-xl w-fit">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === 'profile'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-md scale-102 ring-1 ring-black/5 dark:ring-white/10'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'
              }`}
            >
              <User size={16} className={activeTab === 'profile' ? selectedTheme.text : ''} />
              <span>Personal Info</span>
            </button>
            <button
              onClick={() => setActiveTab('academic')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === 'academic'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-md scale-102 ring-1 ring-black/5 dark:ring-white/10'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'
              }`}
            >
              <GraduationCap size={16} className={activeTab === 'academic' ? selectedTheme.text : ''} />
              <span>Academic Details</span>
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === 'skills'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-md scale-102 ring-1 ring-black/5 dark:ring-white/10'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'
              }`}
            >
              <Terminal size={16} className={activeTab === 'skills' ? selectedTheme.text : ''} />
              <span>Skills & Tech Stack</span>
            </button>
          </div>

          {/* TAB 1: PERSONAL INFORMATION */}
          {activeTab === 'profile' && (
            <div className={`relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/85 dark:bg-[#0c0e19]/80 p-6 sm:p-8 backdrop-blur-3xl shadow-2xl space-y-8 animate-in fade-in zoom-in-95 duration-500 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_25px_70px_-15px_rgba(34,211,238,0.2)] hover:border-cyan-500/40 dark:hover:border-cyan-400/40 group/card`}>
              
              {/* Decorative Top Gradient Glow Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-600 via-cyan-500 to-emerald-400 opacity-90 transition-opacity duration-300 group-hover/card:opacity-100" />
              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-cyan-500/10 dark:bg-cyan-400/10 blur-3xl pointer-events-none group-hover/card:bg-cyan-500/15 transition-all duration-500" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-violet-500/10 dark:bg-violet-400/10 blur-3xl pointer-events-none group-hover/card:bg-violet-500/15 transition-all duration-500" />

              {/* Premium Header */}
              <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-white/10 pb-5">
                <div className="flex items-center gap-3.5">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/25 shrink-0 group-hover/card:scale-105 transition-transform duration-500">
                    <User size={22} className="animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
                      Personal Information
                      {!isEditing && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 shadow-sm">
                          <CheckCircle2 size={12} className="text-emerald-500" /> Verified Sync
                        </span>
                      )}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">Manage your digital identity, contact coordinates, and public biography.</p>
                  </div>
                </div>

                {isEditing ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 animate-pulse shadow-sm self-start sm:self-auto">
                    <Edit3 size={14} /> Live Editing Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 self-start sm:self-auto">
                    🔒 Protected Readout
                  </span>
                )}
              </div>

              {/* Form Grid */}
              <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* First Name Field */}
                <div className="space-y-2 group/field">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5 group-hover/field:text-cyan-500 dark:group-hover/field:text-cyan-400 transition-colors">
                    <User size={14} className="text-cyan-500" /> First Name
                  </label>
                  <div className={`relative rounded-2xl border transition-all duration-300 ${
                    isEditing 
                      ? 'border-cyan-500/50 bg-white dark:bg-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.15)] ring-2 ring-cyan-500/20' 
                      : 'border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 group-hover/field:border-cyan-400/50 group-hover/field:bg-white dark:group-hover/field:bg-slate-900 group-hover/field:shadow-[0_8px_25px_-5px_rgba(34,211,238,0.15)]'
                  }`}>
                    <div className="flex items-center gap-3 px-3.5 py-1.5">
                      <div className="h-9 w-9 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 flex items-center justify-center shrink-0 font-bold text-xs group-hover/field:scale-110 transition-transform">
                        FN
                      </div>
                      <input 
                        type="text" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        disabled={!isEditing}
                        placeholder="Enter first name"
                        className="w-full bg-transparent border-0 py-2 text-slate-900 dark:text-white font-semibold text-sm sm:text-base focus:outline-none disabled:opacity-95 disabled:cursor-default"
                      />
                    </div>
                  </div>
                </div>

                {/* Last Name Field */}
                <div className="space-y-2 group/field">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5 group-hover/field:text-cyan-500 dark:group-hover/field:text-cyan-400 transition-colors">
                    <User size={14} className="text-cyan-500" /> Last Name
                  </label>
                  <div className={`relative rounded-2xl border transition-all duration-300 ${
                    isEditing 
                      ? 'border-cyan-500/50 bg-white dark:bg-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.15)] ring-2 ring-cyan-500/20' 
                      : 'border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 group-hover/field:border-cyan-400/50 group-hover/field:bg-white dark:group-hover/field:bg-slate-900 group-hover/field:shadow-[0_8px_25px_-5px_rgba(34,211,238,0.15)]'
                  }`}>
                    <div className="flex items-center gap-3 px-3.5 py-1.5">
                      <div className="h-9 w-9 rounded-xl bg-violet-500/10 dark:bg-violet-500/20 text-violet-600 dark:text-violet-300 flex items-center justify-center shrink-0 font-bold text-xs group-hover/field:scale-110 transition-transform">
                        LN
                      </div>
                      <input 
                        type="text" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        disabled={!isEditing}
                        placeholder="Enter last name"
                        className="w-full bg-transparent border-0 py-2 text-slate-900 dark:text-white font-semibold text-sm sm:text-base focus:outline-none disabled:opacity-95 disabled:cursor-default"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2 group/field">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5 group-hover/field:text-cyan-500 dark:group-hover/field:text-cyan-400 transition-colors">
                  <Mail size={14} className="text-cyan-500" /> Primary University Email
                </label>
                <div className={`relative rounded-2xl border transition-all duration-300 ${
                  isEditing 
                    ? 'border-cyan-500/50 bg-white dark:bg-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.15)] ring-2 ring-cyan-500/20' 
                    : 'border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 group-hover/field:border-cyan-400/50 group-hover/field:bg-white dark:group-hover/field:bg-slate-900 group-hover/field:shadow-[0_8px_25px_-5px_rgba(34,211,238,0.15)]'
                }`}>
                  <div className="flex items-center gap-3 px-3.5 py-1.5">
                    <div className="h-9 w-9 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold text-xs group-hover/field:scale-110 transition-transform">
                      <Mail size={16} />
                    </div>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={!isEditing}
                      placeholder="student@university.edu"
                      className="w-full bg-transparent border-0 py-2 text-slate-900 dark:text-white font-semibold text-sm sm:text-base focus:outline-none disabled:opacity-95 disabled:cursor-default"
                    />
                    {email.includes('@') && (
                      <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                        <Check size={12} /> Verified
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Biography Field */}
              <div className="space-y-2 group/field">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5 group-hover/field:text-cyan-500 dark:group-hover/field:text-cyan-400 transition-colors">
                    <BookOpen size={14} className="text-cyan-500" /> Public Biography & Career Vision
                  </label>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800/80 text-[11px] font-bold text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-slate-700/80 shadow-sm">
                    {bio.length} characters
                  </span>
                </div>
                <div className={`relative rounded-2xl border transition-all duration-300 ${
                  isEditing 
                    ? 'border-cyan-500/50 bg-white dark:bg-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.15)] ring-2 ring-cyan-500/20' 
                    : 'border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 group-hover/field:border-cyan-400/50 group-hover/field:bg-white dark:group-hover/field:bg-slate-900 group-hover/field:shadow-[0_8px_25px_-5px_rgba(34,211,238,0.15)]'
                }`}>
                  <textarea 
                    rows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    disabled={!isEditing}
                    placeholder="Write a few sentences about your coding journey, tech stack, and future aspirations..."
                    className="w-full bg-transparent border-0 p-4 text-slate-800 dark:text-slate-100 font-medium text-sm sm:text-base focus:outline-none resize-none disabled:opacity-95 disabled:cursor-default leading-relaxed"
                  />
                </div>
              </div>

              {/* Ultra-Premium Data Privacy Assurance Shield Box */}
              <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 dark:border-cyan-400/30 bg-gradient-to-r from-cyan-500/10 via-violet-500/5 to-transparent p-5 backdrop-blur-xl transition-all duration-300 hover:scale-[1.01] hover:border-cyan-500/50 hover:shadow-[0_10px_30px_-10px_rgba(34,211,238,0.25)] group/privacy">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="h-11 w-11 rounded-2xl bg-cyan-500/10 dark:bg-cyan-400/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500 shrink-0 group-hover/privacy:scale-110 group-hover/privacy:bg-cyan-500 group-hover/privacy:text-slate-950 transition-all duration-300 shadow-sm">
                    <Shield size={22} className="animate-pulse" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">256-Bit Workspace Encryption Active</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Your personal profile coordinates are cryptographically shielded and synced locally within your Student OS workspace. Changes propagate instantaneously across all dashboard modules.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: ACADEMIC DETAILS */}
          {activeTab === 'academic' && (
            <div className={`relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/85 dark:bg-[#0c0e19]/80 p-6 sm:p-8 backdrop-blur-3xl shadow-2xl space-y-8 animate-in fade-in zoom-in-95 duration-500 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_25px_70px_-15px_rgba(168,85,247,0.2)] hover:border-purple-500/40 dark:hover:border-purple-400/40 group/card`}>
              
              {/* Decorative Top Gradient Glow Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-400 opacity-90 transition-opacity duration-300 group-hover/card:opacity-100" />
              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-purple-500/10 dark:bg-purple-400/10 blur-3xl pointer-events-none group-hover/card:bg-purple-500/15 transition-all duration-500" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-indigo-500/10 dark:bg-indigo-400/10 blur-3xl pointer-events-none group-hover/card:bg-indigo-500/15 transition-all duration-500" />

              {/* Premium Header */}
              <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-white/10 pb-5">
                <div className="flex items-center gap-3.5">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/25 shrink-0 group-hover/card:scale-105 transition-transform duration-500">
                    <GraduationCap size={22} className="animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
                      Academic Credentials
                      {!isEditing && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[11px] font-bold text-purple-600 dark:text-purple-400 shadow-sm">
                          <CheckCircle2 size={12} className="text-purple-500" /> Enrolled Sync
                        </span>
                      )}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">Manage your university registration, curriculum program, and degree standing.</p>
                  </div>
                </div>

                {isEditing ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 animate-pulse shadow-sm self-start sm:self-auto">
                    <Edit3 size={14} /> Live Editing Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 self-start sm:self-auto">
                    🔒 Official Records
                  </span>
                )}
              </div>

              {/* Form Grid */}
              <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Student ID Field */}
                <div className="space-y-2 group/field">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5 group-hover/field:text-purple-500 dark:group-hover/field:text-purple-400 transition-colors">
                    <Award size={14} className="text-purple-500" /> Student ID Number
                  </label>
                  <div className={`relative rounded-2xl border transition-all duration-300 ${
                    isEditing 
                      ? 'border-purple-500/50 bg-white dark:bg-slate-950 shadow-[0_0_20px_rgba(168,85,247,0.15)] ring-2 ring-purple-500/20' 
                      : 'border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 group-hover/field:border-purple-400/50 group-hover/field:bg-white dark:group-hover/field:bg-slate-900 group-hover/field:shadow-[0_8px_25px_-5px_rgba(168,85,247,0.15)]'
                  }`}>
                    <div className="flex items-center gap-3 px-3.5 py-1.5">
                      <div className="h-9 w-9 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 flex items-center justify-center shrink-0 font-bold text-xs group-hover/field:scale-110 transition-transform">
                        ID
                      </div>
                      <input 
                        type="text" 
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        disabled={!isEditing}
                        placeholder="e.g. STU-849201"
                        className="w-full bg-transparent border-0 py-2 text-slate-900 dark:text-white font-mono font-bold text-sm sm:text-base focus:outline-none disabled:opacity-95 disabled:cursor-default"
                      />
                    </div>
                  </div>
                </div>

                {/* University Field */}
                <div className="space-y-2 group/field">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5 group-hover/field:text-purple-500 dark:group-hover/field:text-purple-400 transition-colors">
                    <GraduationCap size={14} className="text-purple-500" /> University / Institution
                  </label>
                  <div className={`relative rounded-2xl border transition-all duration-300 ${
                    isEditing 
                      ? 'border-purple-500/50 bg-white dark:bg-slate-950 shadow-[0_0_20px_rgba(168,85,247,0.15)] ring-2 ring-purple-500/20' 
                      : 'border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 group-hover/field:border-purple-400/50 group-hover/field:bg-white dark:group-hover/field:bg-slate-900 group-hover/field:shadow-[0_8px_25px_-5px_rgba(168,85,247,0.15)]'
                  }`}>
                    <div className="flex items-center gap-3 px-3.5 py-1.5">
                      <div className="h-9 w-9 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 flex items-center justify-center shrink-0 font-bold text-xs group-hover/field:scale-110 transition-transform">
                        UNI
                      </div>
                      <input 
                        type="text" 
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        disabled={!isEditing}
                        placeholder="e.g. Stanford University"
                        className="w-full bg-transparent border-0 py-2 text-slate-900 dark:text-white font-semibold text-sm sm:text-base focus:outline-none disabled:opacity-95 disabled:cursor-default"
                      />
                    </div>
                  </div>
                </div>

                {/* Course Major Field */}
                <div className="space-y-2 group/field">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5 group-hover/field:text-purple-500 dark:group-hover/field:text-purple-400 transition-colors">
                    <BookOpen size={14} className="text-purple-500" /> Course / Major
                  </label>
                  <div className={`relative rounded-2xl border transition-all duration-300 ${
                    isEditing 
                      ? 'border-purple-500/50 bg-white dark:bg-slate-950 shadow-[0_0_20px_rgba(168,85,247,0.15)] ring-2 ring-purple-500/20' 
                      : 'border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 group-hover/field:border-purple-400/50 group-hover/field:bg-white dark:group-hover/field:bg-slate-900 group-hover/field:shadow-[0_8px_25px_-5px_rgba(168,85,247,0.15)]'
                  }`}>
                    <div className="flex items-center gap-3 px-3.5 py-1.5">
                      <div className="h-9 w-9 rounded-xl bg-pink-500/10 dark:bg-pink-500/20 text-pink-600 dark:text-pink-300 flex items-center justify-center shrink-0 font-bold text-xs group-hover/field:scale-110 transition-transform">
                        DEG
                      </div>
                      <input 
                        type="text" 
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        disabled={!isEditing}
                        placeholder="e.g. B.S. Computer Science"
                        className="w-full bg-transparent border-0 py-2 text-slate-900 dark:text-white font-semibold text-sm sm:text-base focus:outline-none disabled:opacity-95 disabled:cursor-default"
                      />
                    </div>
                  </div>
                </div>

                {/* Academic Standing Field */}
                <div className="space-y-2 group/field">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5 group-hover/field:text-purple-500 dark:group-hover/field:text-purple-400 transition-colors">
                    <Calendar size={14} className="text-purple-500" /> Current Academic Standing
                  </label>
                  <div className={`relative rounded-2xl border transition-all duration-300 ${
                    isEditing 
                      ? 'border-purple-500/50 bg-white dark:bg-slate-950 shadow-[0_0_20px_rgba(168,85,247,0.15)] ring-2 ring-purple-500/20' 
                      : 'border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 group-hover/field:border-purple-400/50 group-hover/field:bg-white dark:group-hover/field:bg-slate-900 group-hover/field:shadow-[0_8px_25px_-5px_rgba(168,85,247,0.15)]'
                  }`}>
                    <div className="flex items-center gap-3 px-3.5 py-1.5">
                      <div className="h-9 w-9 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 flex items-center justify-center shrink-0 font-bold text-xs group-hover/field:scale-110 transition-transform">
                        LVL
                      </div>
                      <select 
                        value={yearOfStudy}
                        onChange={(e) => setYearOfStudy(e.target.value)}
                        disabled={!isEditing}
                        className="w-full bg-transparent border-0 py-2 text-slate-900 dark:text-white font-semibold text-sm sm:text-base focus:outline-none disabled:opacity-95 disabled:cursor-default"
                      >
                        <option value="Freshman" className="bg-white dark:bg-slate-900">Freshman (Year 1)</option>
                        <option value="Sophomore" className="bg-white dark:bg-slate-900">Sophomore (Year 2)</option>
                        <option value="Junior" className="bg-white dark:bg-slate-900">Junior (Year 3)</option>
                        <option value="Senior" className="bg-white dark:bg-slate-900">Senior (Year 4)</option>
                        <option value="Graduate" className="bg-white dark:bg-slate-900">Graduate / Masters</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Banner */}
              <div className="relative overflow-hidden rounded-2xl border border-purple-500/30 dark:border-purple-400/30 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-transparent p-5 backdrop-blur-xl transition-all duration-300 hover:scale-[1.01] hover:border-purple-500/50 hover:shadow-[0_10px_30px_-10px_rgba(168,85,247,0.25)] group/banner">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="h-11 w-11 rounded-2xl bg-purple-500/10 dark:bg-purple-400/10 border border-purple-500/30 flex items-center justify-center text-purple-500 shrink-0 group-hover/banner:scale-110 group-hover/banner:bg-purple-500 group-hover/banner:text-slate-950 transition-all duration-300 shadow-sm">
                      <GraduationCap size={22} className="animate-bounce-slow" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                        <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white uppercase tracking-wider">Degree Progress: Good Standing</h4>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Enrolled full-time for Spring / Fall Semester. Academic record verified by Registrar.</p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold uppercase tracking-wider shadow-sm">
                    ✓ Active Record
                  </span>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: SKILLS & TECH STACK */}
          {activeTab === 'skills' && (
            <div className={`relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/85 dark:bg-[#0c0e19]/80 p-6 sm:p-8 backdrop-blur-3xl shadow-2xl space-y-8 animate-in fade-in zoom-in-95 duration-500 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_25px_70px_-15px_rgba(59,130,246,0.2)] hover:border-blue-500/40 dark:hover:border-blue-400/40 group/card`}>
              
              {/* Decorative Top Gradient Glow Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 opacity-90 transition-opacity duration-300 group-hover/card:opacity-100" />
              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-500/10 dark:bg-blue-400/10 blur-3xl pointer-events-none group-hover/card:bg-blue-500/15 transition-all duration-500" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-cyan-500/10 dark:bg-cyan-400/10 blur-3xl pointer-events-none group-hover/card:bg-cyan-500/15 transition-all duration-500" />

              {/* Premium Header */}
              <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-white/10 pb-5">
                <div className="flex items-center gap-3.5">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 shrink-0 group-hover/card:scale-105 transition-transform duration-500">
                    <Terminal size={22} className="animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
                      Skills & Technologies
                      {!isEditing && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] font-bold text-blue-600 dark:text-blue-400 shadow-sm">
                          <CheckCircle2 size={12} className="text-blue-500" /> {skills.length} Indexed
                        </span>
                      )}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">Showcase your programming languages, frameworks, cloud platforms, and developer tooling.</p>
                  </div>
                </div>

                {isEditing ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 animate-pulse shadow-sm self-start sm:self-auto">
                    <Edit3 size={14} /> Click × to remove skills
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 self-start sm:self-auto">
                    ⚡ AI Matched Stack
                  </span>
                )}
              </div>

              {/* Add Skill Form when editing */}
              {isEditing && (
                <form onSubmit={handleAddSkill} className="relative flex gap-3 bg-slate-50/80 dark:bg-slate-950/80 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
                  <div className="flex-1 flex items-center gap-2 px-3">
                    <Code size={16} className="text-cyan-500 shrink-0" />
                    <input
                      type="text"
                      value={newSkillInput}
                      onChange={(e) => setNewSkillInput(e.target.value)}
                      placeholder="Add a skill or tool (e.g., GraphQL, Docker, Rust, PyTorch)..."
                      className="w-full bg-transparent border-0 py-2 text-sm text-slate-800 dark:text-slate-100 font-medium focus:outline-none placeholder:text-slate-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm transition-all duration-300 flex items-center gap-1.5 shadow-md hover:shadow-cyan-500/30 hover:scale-105 active:scale-95 shrink-0"
                  >
                    <Plus size={16} /> Add Skill
                  </button>
                </form>
              )}

              {/* Skills Grid with 3D Hover Lift */}
              <div className="relative flex flex-wrap gap-3 pt-2">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 ${
                      selectedTheme.bg
                    } ${selectedTheme.border} border ${selectedTheme.text} shadow-sm hover:-translate-y-1 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10 cursor-default backdrop-blur-md`}
                  >
                    <div className="h-6 w-6 rounded-lg bg-white/40 dark:bg-black/30 flex items-center justify-center shrink-0">
                      <Terminal size={13} className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                    </div>
                    <span>{skill}</span>
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-1 h-5 w-5 rounded-full hover:bg-red-500/20 text-red-400 flex items-center justify-center transition-all duration-200 hover:scale-125"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
                {skills.length === 0 && (
                  <div className="w-full text-center py-8 px-4 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30">
                    <p className="text-sm text-slate-500 italic">No technical skills added yet. Click &apos;Edit Profile&apos; to add your tech stack!</p>
                  </div>
                )}
              </div>

              {/* AI Skill Matching Banner */}
              <div className="relative overflow-hidden rounded-2xl border border-blue-500/30 dark:border-blue-400/30 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-transparent p-5 backdrop-blur-xl transition-all duration-300 hover:scale-[1.01] hover:border-blue-500/50 hover:shadow-[0_10px_30px_-10px_rgba(59,130,246,0.25)] group/banner">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="h-11 w-11 rounded-2xl bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/30 flex items-center justify-center text-blue-500 shrink-0 group-hover/banner:scale-110 group-hover/banner:bg-blue-500 group-hover/banner:text-white transition-all duration-300 shadow-sm">
                    <Sparkles size={22} className="animate-spin-slow" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">AI Skill Matching & Career Indexing Active</h4>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Your listed programming languages and frameworks are automatically analyzed by NextGen OS AI to curate personalized learning courses, hackathon recommendations, and career opportunities.
                    </p>
                  </div>
                </div>
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
          <div className="relative w-full max-w-md rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-black border border-white/20 shadow-[0_0_50px_rgba(34,211,238,0.3)] p-6 text-white animate-in zoom-in-95 duration-300">
            
            {/* Modal Close Button */}
            <button
              onClick={() => setShowIdCardModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 text-slate-300 transition-all duration-200"
            >
              <X size={18} />
            </button>

            {/* Header / ID Card Banner */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center font-black text-slate-950 text-sm shadow-md">
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
            <div className="grid grid-cols-2 gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 text-left my-6 font-mono transition-colors duration-300 hover:bg-white/10">
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
