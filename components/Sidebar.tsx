'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart2,
  Bell,
  BookOpen,
  Home,
  PanelLeftClose,
  Settings,
  User,
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { label: 'Dashboard', href: '/', icon: Home },
  { label: 'Profile', href: '/profile', icon: User },
  { label: 'Courses', href: '/courses', icon: BookOpen },
  { label: 'Progress', href: '/progress', icon: BarChart2 },
  { label: 'Alerts', href: '/alerts', icon: Bell },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [firstName, setFirstName] = useState("Alex");
  const [lastName, setLastName] = useState("Morgan");

  useEffect(() => {
    const loadProfile = () => {
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        try {
          const parsed = JSON.parse(savedProfile);
          if (parsed.firstName !== undefined) setFirstName(parsed.firstName);
          if (parsed.lastName !== undefined) setLastName(parsed.lastName);
        } catch (e) {}
      }
    };
    loadProfile();
    window.addEventListener('profileUpdated', loadProfile);
    window.addEventListener('storage', loadProfile);
    return () => {
      window.removeEventListener('profileUpdated', loadProfile);
      window.removeEventListener('storage', loadProfile);
    };
  }, []);

  const navigation = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3">
        <Link href="#" className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-400/30 dark:border-cyan-300/20 bg-cyan-400/10 dark:bg-cyan-300/10 text-sm font-semibold text-cyan-700 dark:text-cyan-200">
            NG
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-50">NextGen Learn</p>
              <p className="truncate text-xs text-slate-900 dark:text-slate-500">Student OS</p>
            </div>
          )}
        </Link>
        <button
          type="button"
          className="icon-button hidden lg:flex"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          onClick={() => setIsCollapsed((value) => !value)}
        >
          <PanelLeftClose size={17} className={isCollapsed ? 'rotate-180' : ''} />
        </button>

      </div>

      <nav className="mt-8 space-y-1" aria-label="Primary navigation">
        {navItems.map((item) => {
          const Icon = item.icon;

          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              title={item.label}
              className={`group flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'border-cyan-400/30 dark:border-cyan-300/20 bg-cyan-400/10 dark:bg-cyan-300/10 text-cyan-700 dark:text-cyan-100'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <Icon size={18} className="shrink-0" />
              {!isCollapsed && <span className="truncate">{item.label}</span>}
              {isActive && !isCollapsed && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-300" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-slate-200 dark:border-slate-800 pt-4 flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          {!isCollapsed && <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider pl-2">Theme</span>}
          <ThemeToggle />
        </div>
        <Link href="/profile" className="flex items-center gap-3 rounded-lg bg-slate-50 dark:bg-slate-950/70 p-3 hover:bg-white dark:bg-slate-900 transition-colors" onClick={() => setIsOpen(false)}>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-300 text-sm font-semibold text-slate-950">
            {firstName ? firstName.charAt(0).toUpperCase() : 'A'}
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">{firstName} {lastName}</p>
              <p className="truncate text-xs text-slate-900 dark:text-slate-500">Pro Learner</p>
            </div>
          )}
        </Link>
      </div>
    </div>
  );

  return (
    <>


      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          className="fixed inset-0 z-40 bg-slate-50 dark:bg-slate-950/70 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? 88 : 280,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        className={`dashboard-panel fixed left-4 top-4 z-50 h-[calc(100vh-2rem)] p-4 lg:relative lg:left-auto lg:top-auto lg:z-20 lg:!translate-x-0 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-[120%]'
        }`}
      >
        {navigation}
      </motion.aside>
    </>
  );
}
