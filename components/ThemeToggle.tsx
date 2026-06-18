'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-10 w-10 shrink-0" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="icon-button relative overflow-hidden shrink-0"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <div className={`transition-all duration-500 absolute inset-0 flex items-center justify-center ${theme === 'dark' ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <Moon size={18} />
      </div>
      <div className={`transition-all duration-500 absolute inset-0 flex items-center justify-center ${theme === 'light' ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}>
        <Sun size={18} />
      </div>
    </button>
  );
}
