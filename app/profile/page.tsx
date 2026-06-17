"use client";

import { useState } from 'react';
import { User, Mail, Check } from 'lucide-react';

export default function ProfilePage() {
  const [firstName, setFirstName] = useState("Alex");
  const [lastName, setLastName] = useState("Morgan");
  const [email, setEmail] = useState("alex.morgan@example.com");
  const [bio, setBio] = useState("Pro learner trying to master full-stack development. I enjoy building beautiful and responsive web applications.");
  
  // Student Details State
  const [studentId, setStudentId] = useState("STU-849201");
  const [university, setUniversity] = useState("Tech Global University");
  const [course, setCourse] = useState("B.S. Computer Science");
  const [yearOfStudy, setYearOfStudy] = useState("Junior");

  
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const initials = `${firstName.charAt(0) || ''}${lastName.charAt(0) || ''}`.toUpperCase();

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 800);
  };

  return (
    <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-6 px-4 py-4 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="dashboard-panel flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
            <span className="flex items-center gap-2 rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 text-cyan-300">
              <User size={14} />
              Profile
            </span>
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-normal text-slate-50 md:text-4xl">
            My Profile
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 md:text-base">
            Update your personal information and biography.
          </p>
        </div>
      </header>

      <div className="dashboard-panel p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-8">
          <div className="flex flex-col items-center gap-4 shrink-0">
            <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 p-1">
              <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center text-3xl font-bold text-cyan-400 transition-all duration-300">
                {initials || '?'}
              </div>
            </div>
            <button className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
              Change avatar
            </button>
          </div>
          
          <div className="flex-1 flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-400">First Name</label>
                <input 
                  type="text" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-400">Last Name</label>
                <input 
                  type="text" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-400">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg pl-10 pr-4 py-2.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-400">Bio</label>
              <textarea 
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all resize-none"
              />
            </div>

            <div className="mt-4 mb-2">
              <h3 className="text-lg font-medium text-slate-200 border-b border-slate-800 pb-2">Student Details</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-400">Student ID</label>
                <input 
                  type="text" 
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-400">University</label>
                <input 
                  type="text" 
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-400">Course / Major</label>
                <input 
                  type="text" 
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-400">Year of Study</label>
                <select 
                  value={yearOfStudy}
                  onChange={(e) => setYearOfStudy(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all appearance-none"
                >
                  <option value="Freshman" className="bg-slate-900">Freshman</option>
                  <option value="Sophomore" className="bg-slate-900">Sophomore</option>
                  <option value="Junior" className="bg-slate-900">Junior</option>
                  <option value="Senior" className="bg-slate-900">Senior</option>
                  <option value="Graduate" className="bg-slate-900">Graduate</option>
                </select>
              </div>
            </div>

            <div className="pt-6 mt-2 border-t border-slate-800 flex justify-end items-center gap-4">
              {saved && (
                <span className="text-emerald-400 text-sm flex items-center gap-1.5 animate-in fade-in zoom-in duration-300">
                  <Check size={16} /> Saved successfully
                </span>
              )}
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-medium px-6 py-2.5 rounded-lg transition-all disabled:opacity-70 flex items-center gap-2"
              >
                {isSaving ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
