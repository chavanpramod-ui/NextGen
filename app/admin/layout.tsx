'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/AdminSidebar';
import { motion } from 'framer-motion';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Skip auth check if we are on the login page
    if (pathname === '/admin/login' || pathname?.startsWith('/admin/login')) {
      setIsAuthorized(true);
      return;
    }

    const checkAuth = () => {
      const session = localStorage.getItem('adminSession');
      if (session === 'true') {
        setIsAuthorized(true);
      } else {
        router.push('/admin/login');
      }
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, [router, pathname]);

  if (!isAuthorized) {
    return null; // Or a sleek loading spinner
  }

  // If on login page, don't show the AdminSidebar
  if (pathname === '/admin/login' || pathname?.startsWith('/admin/login')) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300">
        {children}
      </main>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300 overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="h-full"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
