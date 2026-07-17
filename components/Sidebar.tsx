'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart2,
  Bell,
  BookOpen,
  Check,
  Home,
  LogIn,
  PanelLeftClose,
  Palette,
  Settings,
  User,
  Sparkles,
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import {
  sidebarThemes,
  sidebarThemeList,
  SidebarThemePreset,
} from './sidebarThemes';

interface NavSection {
  title: string;
  items: { label: string; href: string; icon: any }[];
}

const navSections: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', href: '/', icon: Home },
      { label: 'Progress', href: '/progress', icon: BarChart2 },
      { label: 'Alerts', href: '/alerts', icon: Bell },
    ],
  },
  {
    title: 'Learning & Community',
    items: [
      { label: 'Courses', href: '/courses', icon: BookOpen },
      { label: 'Profile', href: '/profile', icon: User },
    ],
  },
  {
    title: 'System & Preferences',
    items: [
      { label: 'Settings', href: '/settings', icon: Settings },
      { label: 'Sign In / Auth', href: '/login', icon: LogIn },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [firstName, setFirstName] = useState("Alex");
  const [lastName, setLastName] = useState("Morgan");
  const [sidebarTheme, setSidebarTheme] = useState<SidebarThemePreset>('classic');
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setShowThemeMenu(false);
      }
    };
    if (showThemeMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showThemeMenu]);

  const handleSelectTheme = (themeId: SidebarThemePreset) => {
    setSidebarTheme(themeId);
    localStorage.setItem('sidebarTheme', themeId);
    window.dispatchEvent(new Event('sidebarThemeUpdated'));
    setShowThemeMenu(false);
  };

  const currentTheme = sidebarThemes[sidebarTheme] || sidebarThemes.classic;

  const navigation = (
    <div className="flex h-full flex-col relative">
      {/* Header & Brand */}
      <div className="flex items-center justify-between gap-3 pb-2">
        <Link href="/" className="flex min-w-0 items-center gap-3 group">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-sm font-bold transition-all duration-300 group-hover:scale-105 ${currentTheme.logoBoxClassName}`}>
            NG
          </div>
          {!isCollapsed && (
            <div className="min-w-0 flex flex-col justify-center">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-sm font-bold text-slate-900 dark:text-slate-50 tracking-tight">NextGen Learn</p>
                <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border border-cyan-500/25 tracking-widest uppercase">
                  OS
                </span>
              </div>
              <p className="truncate text-[11px] text-slate-500 dark:text-slate-400 font-medium">Student Dashboard</p>
            </div>
          )}
        </Link>
        <button
          type="button"
          className="h-8 w-8 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/10 transition-all hidden lg:flex items-center justify-center shrink-0"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          onClick={() => setIsCollapsed((value) => !value)}
        >
          <PanelLeftClose size={18} className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Categorized & Motion Navigation Links */}
      <nav className="mt-4 flex-1 space-y-5 overflow-y-auto pr-1 -mr-1" aria-label="Primary navigation">
        {navSections.map((section) => (
          <div key={section.title} className="space-y-1">
            {!isCollapsed ? (
              <p className="px-3 text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-2 select-none">
                {section.title}
              </p>
            ) : (
              <div className="h-[1px] w-8 mx-auto bg-slate-200 dark:bg-slate-800 my-3" />
            )}
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  title={item.label}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? currentTheme.activeLinkClassName
                      : currentTheme.inactiveLinkClassName
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon
                    size={18}
                    className={`shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5 ${
                      isActive ? 'text-cyan-500 dark:text-cyan-300 scale-105' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-100'
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="truncate transition-transform duration-200 ease-out group-hover:translate-x-1">
                      {item.label}
                    </span>
                  )}
                  {isActive && !isCollapsed && (
                    <span className={`ml-auto h-1.5 w-1.5 rounded-full shrink-0 ${currentTheme.activeDotClassName}`} />
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Floating Theme Selector Popover */}
      <AnimatePresence>
        {showThemeMenu && (
          <motion.div
            ref={popoverRef}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className={`absolute ${isCollapsed ? 'left-20 bottom-4' : 'left-4 bottom-20'} z-50 w-64 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-[#0c101e]/95 p-3.5 shadow-[0_15px_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl`}
          >
            <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-slate-200/60 dark:border-slate-800/60">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Sparkles size={14} className="text-cyan-500" />
                Sidebar Presets
              </span>
              <span className="text-[10px] font-semibold text-cyan-500 bg-cyan-500/10 px-2 py-0.5 rounded-md">
                {currentTheme.name}
              </span>
            </div>
            <div className="space-y-1.5">
              {sidebarThemeList.map((t) => {
                const isSelected = sidebarTheme === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleSelectTheme(t.id)}
                    className={`w-full flex items-center gap-3 p-2 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-cyan-400/60 bg-cyan-500/10 text-slate-900 dark:text-white font-semibold'
                        : 'border-transparent hover:border-slate-200 dark:hover:border-slate-800 hover:bg-slate-100/60 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <div className={`h-6 w-6 shrink-0 rounded-lg bg-gradient-to-br ${t.swatchGradient} border ${t.swatchBorder} shadow-2xs`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium truncate">{t.name}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{t.description}</p>
                    </div>
                    {isSelected && <Check size={14} className="text-cyan-500 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clean & Compact Bottom Profile / Control Bar */}
      <div className="mt-auto pt-3 border-t border-slate-200/60 dark:border-slate-800/60">
        {!isCollapsed ? (
          <div className="flex items-center justify-between gap-2">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className={`flex-1 min-w-0 flex items-center gap-3 rounded-xl p-2 transition-all duration-200 group ${currentTheme.profileBoxClassName}`}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-tr from-emerald-400 to-cyan-500 text-sm font-bold text-slate-950 shadow-sm group-hover:scale-105 transition-transform">
                {firstName ? firstName.charAt(0).toUpperCase() : 'A'}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-cyan-500 transition-colors">
                  {firstName} {lastName}
                </p>
                <p className="truncate text-[11px] text-slate-500 dark:text-slate-400 font-medium">Pro Learner</p>
              </div>
            </Link>

            <div className="flex items-center gap-1 shrink-0 pl-1 border-l border-slate-200/60 dark:border-slate-800/60">
              <button
                type="button"
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                title="Customize Sidebar Style"
                className={`h-9 w-9 rounded-xl flex items-center justify-center transition-all ${
                  showThemeMenu
                    ? 'bg-cyan-500 text-slate-950 shadow-sm scale-105'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/10'
                }`}
              >
                <Palette size={17} />
              </button>
              <ThemeToggle />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              title={`${firstName} ${lastName} - Profile`}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-emerald-400 to-cyan-500 text-sm font-bold text-slate-950 shadow-sm hover:scale-110 transition-transform"
            >
              {firstName ? firstName.charAt(0).toUpperCase() : 'A'}
            </Link>
            <button
              type="button"
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              title="Customize Sidebar Style"
              className={`h-9 w-9 rounded-xl flex items-center justify-center transition-all ${
                showThemeMenu
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/10'
              }`}
            >
              <Palette size={17} />
            </button>
            <ThemeToggle />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          className="fixed inset-0 z-40 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? 88 : 280,
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 30 }}
        className={`${currentTheme.asideClassName} fixed left-4 top-4 z-50 h-[calc(100vh-2rem)] p-4 lg:relative lg:left-auto lg:top-auto lg:z-20 lg:!translate-x-0 transition-all duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-[120%]'
        }`}
      >
        {navigation}
      </motion.aside>
    </>
  );
}

