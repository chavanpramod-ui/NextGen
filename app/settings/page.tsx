"use client";

import { useState, useEffect } from 'react';
import { Settings, User, Bell, Shield, Palette, Mail, Lock, LogOut, Check } from 'lucide-react';

export default function SettingsPage() {
  const [firstName, setFirstName] = useState("Alex");
  const [lastName, setLastName] = useState("Morgan");
  const [email, setEmail] = useState("alex.morgan@example.com");
  const [bio, setBio] = useState("Pro learner trying to master full-stack development. I enjoy building beautiful and responsive web applications.");
  
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        if (parsed.firstName !== undefined) setFirstName(parsed.firstName);
        if (parsed.lastName !== undefined) setLastName(parsed.lastName);
        if (parsed.email !== undefined) setEmail(parsed.email);
        if (parsed.bio !== undefined) setBio(parsed.bio);
      } catch (e) {
        console.error("Failed to parse profile data", e);
      }
    }
  }, []);

  const initials = `${firstName.charAt(0) || ''}${lastName.charAt(0) || ''}`.toUpperCase();

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('userProfile', JSON.stringify({ firstName, lastName, email, bio }));
      window.dispatchEvent(new Event('profileUpdated'));
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 800);
  };

  return (
    <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-6 px-4 py-4 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="dashboard-panel flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-2 rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 text-cyan-300">
              <Settings size={14} />
              Settings
            </span>
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-normal text-slate-900 dark:text-slate-50 md:text-4xl">
            Account Preferences
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 md:text-base">
            Manage your profile, theme, and application preferences.
          </p>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Navigation Sidebar */}
        <div className="lg:w-64 shrink-0 flex flex-col gap-2">
          <button className="flex items-center gap-3 px-4 py-3 bg-cyan-400/10 text-cyan-400 rounded-xl font-medium border border-cyan-500/20 transition-colors text-left">
            <User size={18} />
            Profile details
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:bg-slate-800/50 rounded-xl font-medium transition-colors text-left">
            <Bell size={18} />
            Notifications
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:bg-slate-800/50 rounded-xl font-medium transition-colors text-left">
            <Shield size={18} />
            Security & Privacy
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:bg-slate-800/50 rounded-xl font-medium transition-colors text-left">
            <Palette size={18} />
            Appearance
          </button>
        </div>

        {/* Main Settings Content */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Profile Section */}
          <div className="dashboard-panel p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="flex flex-col items-center gap-4 shrink-0">
                <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 p-1">
                  <div className="h-full w-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-3xl font-bold text-cyan-400 transition-all duration-300">
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
                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">First Name</label>
                    <input 
                      type="text" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700/50 rounded-lg px-4 py-2.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Last Name</label>
                    <input 
                      type="text" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700/50 rounded-lg px-4 py-2.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Email Address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-900 dark:text-slate-500" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700/50 rounded-lg pl-10 pr-4 py-2.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Bio</label>
                  <textarea 
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700/50 rounded-lg px-4 py-2.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all resize-none"
                  />
                </div>
                <div className="pt-4 flex justify-end items-center gap-4">
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
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Security Section */}
          <div className="dashboard-panel p-6 sm:p-8 flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Lock size={20} className="text-slate-600 dark:text-slate-400" />
              Password & Authentication
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-300 dark:border-slate-700/50 bg-slate-100 dark:bg-slate-800/30">
              <div>
                <p className="font-medium text-slate-800 dark:text-slate-200">Change Password</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">We recommend updating your password every 3 months.</p>
              </div>
              <button className="shrink-0 rounded-lg border border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:bg-slate-700 hover:text-slate-900 dark:text-white transition-colors">
                Update Password
              </button>
            </div>
          </div>
          
          {/* Danger Zone */}
          <div className="dashboard-panel p-6 sm:p-8 flex flex-col gap-6 border-red-500/20">
            <h2 className="text-xl font-semibold text-red-400 flex items-center gap-2">
              <LogOut size={20} />
              Danger Zone
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-red-500/20 bg-red-500/5">
              <div>
                <p className="font-medium text-slate-800 dark:text-slate-200">Delete Account</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Once you delete your account, there is no going back. Please be certain.</p>
              </div>
              <button className="shrink-0 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500 hover:text-slate-900 dark:text-white transition-colors">
                Delete Account
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
