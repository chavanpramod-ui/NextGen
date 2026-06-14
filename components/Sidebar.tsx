'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart2,
  Bell,
  BookOpen,
  Home,
  Menu,
  PanelLeftClose,
  Settings,
  X,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/', icon: Home },
  { label: 'Courses', href: '/courses', icon: BookOpen },
  { label: 'Progress', href: '/progress', icon: BarChart2 },
  { label: 'Alerts', href: '/alerts', icon: Bell },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigation = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3">
        <Link href="#" className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-sm font-semibold text-cyan-200">
            NG
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-50">NextGen Learn</p>
              <p className="truncate text-xs text-slate-500">Student OS</p>
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
        <button
          type="button"
          className="icon-button lg:hidden"
          aria-label="Close navigation"
          title="Close navigation"
          onClick={() => setIsOpen(false)}
        >
          <X size={18} />
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
                  ? 'border-cyan-300/20 bg-cyan-300/10 text-cyan-100'
                  : 'border-transparent text-slate-400 hover:border-slate-800 hover:bg-slate-900 hover:text-slate-100'
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

      <div className="mt-auto border-t border-slate-800 pt-4">
        <div className="flex items-center gap-3 rounded-lg bg-slate-950/70 p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-300 text-sm font-semibold text-slate-950">
            A
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-100">Alex Morgan</p>
              <p className="truncate text-xs text-slate-500">Pro Learner</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="icon-button fixed left-4 top-4 z-50 lg:hidden"
          aria-label="Open navigation"
          title="Open navigation"
        >
          <Menu size={20} />
        </button>
      )}

      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden"
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
