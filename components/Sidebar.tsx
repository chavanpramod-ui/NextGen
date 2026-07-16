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
  LogIn,
  PanelLeftClose,
  Palette,
  Settings,
  User,
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import {
  sidebarThemes,
  sidebarThemeList,
  SidebarThemePreset,
} from './sidebarThemes';

const navItems = [
  { label: 'Dashboard', href: '/', icon: Home },
  { label: 'Profile', href: '/profile', icon: User },
  { label: 'Courses', href: '/courses', icon: BookOpen },
  { label: 'Progress', href: '/progress', icon: BarChart2 },
  { label: 'Alerts', href: '/alerts', icon: Bell },
  { label: 'Settings', href: '/settings', icon: Settings },
  { label: 'Sign In / Auth', href: '/login', icon: LogIn },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [firstName, setFirstName] = useState("Alex");
  const [lastName, setLastName] = useState("Morgan");
  const [sidebarTheme, setSidebarTheme] = useState<SidebarThemePreset>('classic');

  if (pathname === '/login' || pathname?.startsWith('/login')) {
    return null;
  }

  useEffect(() => {
    const loadProfileAndTheme = () => {
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        try {
          const parsed = JSON.parse(savedProfile);
          if (parsed.firstName !== undefined) setFirstName(parsed.firstName);
          if (parsed.lastName !== undefined) setLastName(parsed.lastName);
        } catch (e) {}
      }

      const savedTheme = localStorage.getItem('sidebarTheme') as SidebarThemePreset;
      if (savedTheme && sidebarThemes[savedTheme]) {
        setSidebarTheme(savedTheme);
      }
    };
    loadProfileAndTheme();
    window.addEventListener('profileUpdated', loadProfileAndTheme);
    window.addEventListener('sidebarThemeUpdated', loadProfileAndTheme);
    window.addEventListener('storage', loadProfileAndTheme);
    return () => {
      window.removeEventListener('profileUpdated', loadProfileAndTheme);
      window.removeEventListener('sidebarThemeUpdated', loadProfileAndTheme);
      window.removeEventListener('storage', loadProfileAndTheme);
    };
  }, []);

  const handleSelectTheme = (themeId: SidebarThemePreset) => {
    setSidebarTheme(themeId);
    localStorage.setItem('sidebarTheme', themeId);
    window.dispatchEvent(new Event('sidebarThemeUpdated'));
  };

  const currentTheme = sidebarThemes[sidebarTheme] || sidebarThemes.classic;

  const navigation = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3">
        <Link href="#" className="flex min-w-0 items-center gap-3">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-sm font-semibold transition-all duration-300 ${currentTheme.logoBoxClassName}`}>
            NG
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-50">NextGen Learn</p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">Student OS</p>
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
              className={`group flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? currentTheme.activeLinkClassName
                  : currentTheme.inactiveLinkClassName
              }`}
              onClick={() => setIsOpen(false)}
            >
              <Icon size={18} className="shrink-0" />
              {!isCollapsed && <span className="truncate">{item.label}</span>}
              {isActive && !isCollapsed && (
                <span className={`ml-auto h-1.5 w-1.5 rounded-full ${currentTheme.activeDotClassName}`} />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-slate-200/80 dark:border-slate-800/80 pt-4 flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          {!isCollapsed && <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider pl-1">App Theme</span>}
          <ThemeToggle />
        </div>

        {!isCollapsed ? (
          <div className="flex flex-col gap-2 px-1 py-1.5 rounded-xl bg-slate-100/60 dark:bg-slate-900/40 p-2.5 border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-md transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Palette size={13} className="text-cyan-500 shrink-0" />
                Sidebar Theme
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-2xs">
                {currentTheme.name}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2 pt-1">
              {sidebarThemeList.map((t) => {
                const isSelected = sidebarTheme === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleSelectTheme(t.id)}
                    title={`${t.name}: ${t.description}`}
                    className={`relative h-7 rounded-lg border bg-gradient-to-br ${t.swatchGradient} transition-all duration-300 flex items-center justify-center ${
                      isSelected
                        ? `ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-100 dark:ring-offset-slate-900 scale-105 shadow-md ${t.swatchBorder}`
                        : 'border-white/20 opacity-70 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    {isSelected && (
                      <span className="h-1.5 w-1.5 rounded-full bg-white shadow-sm" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const currentIndex = sidebarThemeList.findIndex((t) => t.id === sidebarTheme);
                const nextIndex = (currentIndex + 1) % sidebarThemeList.length;
                handleSelectTheme(sidebarThemeList[nextIndex].id);
              }}
              title={`Sidebar Theme: ${currentTheme.name} (Click to cycle presets)`}
              className={`icon-button relative overflow-hidden shrink-0 border transition-all ${currentTheme.swatchBorder}`}
            >
              <div className={`absolute inset-1 rounded-lg bg-gradient-to-br ${currentTheme.swatchGradient} opacity-90`} />
              <Palette size={15} className="relative z-10 text-white drop-shadow-sm" />
            </button>
          </div>
        )}

        <Link
          href="/profile"
          className={`flex items-center gap-3 rounded-xl p-3 transition-all duration-300 ${currentTheme.profileBoxClassName}`}
          onClick={() => setIsOpen(false)}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-300 text-sm font-semibold text-slate-950 shadow-sm">
            {firstName ? firstName.charAt(0).toUpperCase() : 'A'}
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{firstName} {lastName}</p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">Pro Learner</p>
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
        className={`${currentTheme.asideClassName} fixed left-4 top-4 z-50 h-[calc(100vh-2rem)] p-4 lg:relative lg:left-auto lg:top-auto lg:z-20 lg:!translate-x-0 transition-all duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-[120%]'
        }`}
      >
        {navigation}
      </motion.aside>
    </>
  );
}

