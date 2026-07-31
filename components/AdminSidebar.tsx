'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Database,
  Settings,
  LogOut,
  PanelLeftClose,
  ShieldCheck
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { sidebarThemes, SidebarThemePreset } from './sidebarThemes';

interface NavSection {
  title: string;
  items: { label: string; href: string; icon: any }[];
}

const navSections: NavSection[] = [
  {
    title: 'Admin Console',
    items: [
      { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
      { label: 'User Management', href: '/admin/users', icon: Users },
      { label: 'Data Hub', href: '/admin/data', icon: Database },
    ],
  },
  {
    title: 'System',
    items: [
      { label: 'Settings', href: '/admin/settings', icon: Settings },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sidebarTheme, setSidebarTheme] = useState<SidebarThemePreset>('classic');

  if (pathname === '/admin/login' || pathname?.startsWith('/admin/login')) {
    return null;
  }

  useEffect(() => {
    const loadTheme = () => {
      const savedTheme = localStorage.getItem('sidebarTheme') as SidebarThemePreset;
      if (savedTheme && sidebarThemes[savedTheme]) {
        setSidebarTheme(savedTheme);
      }
    };
    loadTheme();
    window.addEventListener('sidebarThemeUpdated', loadTheme);
    window.addEventListener('storage', loadTheme);
    return () => {
      window.removeEventListener('sidebarThemeUpdated', loadTheme);
      window.removeEventListener('storage', loadTheme);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    router.push('/admin/login');
  };

  const currentTheme = sidebarThemes[sidebarTheme];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-40 lg:hidden p-2 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-xl border border-white/20 shadow-lg text-slate-800 dark:text-slate-200"
      >
        <ShieldCheck size={24} />
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col \${
          isCollapsed ? 'w-20' : 'w-72'
        } \${currentTheme.container} border-r \${
          currentTheme.border
        } lg:relative lg:translate-x-0 shadow-2xl overflow-visible`}
        animate={{
          x: isOpen || typeof window === 'undefined' || window.innerWidth >= 1024 ? 0 : -320,
          width: isCollapsed ? 80 : 288,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        {/* Header */}
        <div className="h-20 flex items-center justify-between px-6 flex-shrink-0">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <ShieldCheck className="text-white w-6 h-6" />
              </div>
              <div>
                <h2 className={`font-bold text-lg leading-tight \${currentTheme.textPrimary}`}>
                  Admin Panel
                </h2>
                <p className={`text-xs font-medium \${currentTheme.textSecondary}`}>
                  Command Center
                </p>
              </div>
            </motion.div>
          )}

          {isCollapsed && (
            <div className="w-10 h-10 mx-auto rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
              <ShieldCheck className="text-white w-5 h-5" />
            </div>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`hidden lg:flex p-1.5 rounded-lg \${currentTheme.hover} \${currentTheme.textSecondary} hover:\${currentTheme.textPrimary} transition-colors absolute -right-4 top-7 bg-inherit border \${currentTheme.border} shadow-sm z-10`}
          >
            <PanelLeftClose
              size={16}
              className={`transition-transform duration-300 \${
                isCollapsed ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-4 space-y-8 scrollbar-hide">
          {navSections.map((section, idx) => (
            <div key={idx}>
              {!isCollapsed && (
                <h3
                  className={`px-3 mb-3 text-xs font-bold uppercase tracking-wider \${currentTheme.textSecondary} opacity-70`}
                >
                  {section.title}
                </h3>
              )}
              <ul className="space-y-1.5">
                {section.items.map((item, itemIdx) => {
                  const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));
                  const Icon = item.icon;

                  return (
                    <li key={itemIdx}>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative \${
                          isActive
                            ? \`\${currentTheme.activeBg} \${currentTheme.activeText} shadow-sm font-medium\`
                            : \`\${currentTheme.hover} \${currentTheme.textSecondary} hover:\${currentTheme.textPrimary}\`
                        }`}
                        title={isCollapsed ? item.label : undefined}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="admin-active-nav"
                            className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-r-full"
                            initial={false}
                            transition={{
                              type: 'spring',
                              stiffness: 300,
                              damping: 30,
                            }}
                          />
                        )}
                        <Icon
                          size={20}
                          className={`flex-shrink-0 transition-transform group-hover:scale-110 \${
                            isActive ? 'text-indigo-500' : ''
                          }`}
                        />
                        {!isCollapsed && (
                          <span className="whitespace-nowrap">{item.label}</span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className={`p-4 border-t \${currentTheme.border} flex flex-col gap-2`}>
          <div className="flex items-center justify-between px-2 py-2">
            {!isCollapsed && (
              <span className={`text-sm font-medium \${currentTheme.textSecondary}`}>
                Theme
              </span>
            )}
            <ThemeToggle />
          </div>
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group \${currentTheme.hover} text-red-500/80 hover:text-red-600 dark:hover:text-red-400`}
            title={isCollapsed ? 'Log out' : undefined}
          >
            <LogOut size={20} className="flex-shrink-0 transition-transform group-hover:scale-110" />
            {!isCollapsed && <span className="font-medium">Sign Out</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
}
