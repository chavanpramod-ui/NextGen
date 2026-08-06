export type SidebarThemePreset = 'classic' | 'midnight' | 'aurora' | 'cyber';

export interface SidebarThemeConfig {
  id: SidebarThemePreset;
  name: string;
  description: string;
  swatchGradient: string;
  swatchBorder: string;
  asideClassName: string;
  logoBoxClassName: string;
  activeLinkClassName: string;
  inactiveLinkClassName: string;
  activeDotClassName: string;
  profileBoxClassName: string;
}

export const sidebarThemes: Record<SidebarThemePreset, SidebarThemeConfig> = {
  classic: {
    id: 'classic',
    name: 'Classic',
    description: 'Adaptive light/dark slate glassmorphism',
    swatchGradient: 'from-slate-200 via-slate-400 to-slate-800 dark:from-slate-700 dark:to-slate-900',
    swatchBorder: 'border-zinc-400 dark:border-zinc-600',
    asideClassName: 'dashboard-panel',
    logoBoxClassName:
      'border-cyan-400/40 dark:border-cyan-300/30 bg-gradient-to-br from-cyan-400/20 to-blue-500/10 text-cyan-600 dark:text-cyan-300 shadow-sm',
    activeLinkClassName:
      'border-l-[3px] border-cyan-500 dark:border-cyan-400 bg-gradient-to-r from-cyan-500/15 via-cyan-500/5 to-transparent text-cyan-700 dark:text-cyan-100 font-semibold shadow-2xs',
    inactiveLinkClassName:
      'border-l-[3px] border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100/70 dark:hover:bg-white/5',
    activeDotClassName: 'bg-cyan-400 shadow-sm',
    profileBoxClassName:
      'bg-zinc-50/80 dark:bg-zinc-950/50 hover:bg-white dark:hover:bg-zinc-900/80 border border-zinc-200/60 dark:border-zinc-800/60 text-zinc-900 dark:text-zinc-100 shadow-sm',
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight',
    description: 'Deep obsidian & glowing violet neon accents',
    swatchGradient: 'from-violet-600 via-indigo-800 to-[#080b14]',
    swatchBorder: 'border-violet-400',
    asideClassName:
      '!bg-[#080c16]/95 !border-violet-500/25 shadow-sm !backdrop-blur-3xl !text-zinc-100 rounded-3xl border transition-colors duration-200 relative overflow-hidden',
    logoBoxClassName:
      'border-violet-400/50 bg-gradient-to-br from-violet-500/30 to-indigo-600/20 text-violet-300 shadow-sm',
    activeLinkClassName:
      'border-l-[3px] border-violet-400 bg-gradient-to-r from-violet-600/25 via-indigo-600/10 to-transparent text-violet-100 font-semibold shadow-sm',
    inactiveLinkClassName:
      'border-l-[3px] border-transparent text-zinc-400 hover:text-violet-100 hover:bg-violet-950/30',
    activeDotClassName: 'bg-violet-400 shadow-sm',
    profileBoxClassName:
      'bg-[#0c1222]/80 hover:bg-[#121930] border border-violet-500/25 text-zinc-100 shadow-sm',
  },
  aurora: {
    id: 'aurora',
    name: 'Aurora',
    description: 'Frosted acrylic with vibrant aurora indigo/pink glow',
    swatchGradient: 'from-indigo-500 via-purple-500 to-pink-500',
    swatchBorder: 'border-pink-400',
    asideClassName:
      '!bg-gradient-to-b !from-slate-900/95 !via-indigo-950/90 !to-purple-950/95 !border-indigo-400/35 shadow-sm !backdrop-blur-3xl !text-zinc-100 rounded-3xl border transition-colors duration-200 relative overflow-hidden',
    logoBoxClassName:
      'border-pink-400/40 bg-gradient-to-br from-indigo-500/30 to-pink-500/30 text-pink-200 shadow-sm',
    activeLinkClassName:
      'border-l-[3px] border-pink-400 bg-gradient-to-r from-indigo-500/25 via-purple-500/20 to-pink-500/15 text-white font-semibold shadow-sm',
    inactiveLinkClassName:
      'border-l-[3px] border-transparent text-indigo-200/75 hover:text-white hover:bg-white/10',
    activeDotClassName: 'bg-pink-400 shadow-sm',
    profileBoxClassName:
      'bg-indigo-950/60 hover:bg-indigo-900/70 border border-indigo-400/30 text-white shadow-sm',
  },
  cyber: {
    id: 'cyber',
    name: 'Cyber',
    description: 'Futuristic dark obsidian with electric cyan & magenta highlights',
    swatchGradient: 'from-cyan-400 via-blue-600 to-fuchsia-500',
    swatchBorder: 'border-cyan-400',
    asideClassName:
      '!bg-[#04070e]/95 !border-cyan-400/40 shadow-sm !backdrop-blur-3xl !text-zinc-100 rounded-3xl border transition-colors duration-200 relative overflow-hidden',
    logoBoxClassName:
      'border-cyan-400 bg-cyan-500/25 text-cyan-300 shadow-sm font-bold tracking-wider',
    activeLinkClassName:
      'border-l-[3px] border-cyan-400 bg-gradient-to-r from-cyan-500/30 via-cyan-500/10 to-transparent text-cyan-200 font-bold shadow-sm tracking-wide',
    inactiveLinkClassName:
      'border-l-[3px] border-transparent text-zinc-400 hover:text-cyan-300 hover:bg-cyan-950/30',
    activeDotClassName: 'bg-cyan-400 shadow-sm animate-pulse',
    profileBoxClassName:
      'bg-[#070d18]/90 hover:bg-cyan-950/50 border border-cyan-500/35 text-cyan-100 shadow-sm',
  },
};

export const sidebarThemeList: SidebarThemeConfig[] = [
  sidebarThemes.classic,
  sidebarThemes.midnight,
  sidebarThemes.aurora,
  sidebarThemes.cyber,
];
