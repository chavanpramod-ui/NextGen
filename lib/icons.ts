import {
  BookOpen,
  Code,
  Database,
  Zap,
  Palette,
  BarChart,
  Award,
  Rocket,
  Brain,
  Globe,
  LucideIcon,
} from 'lucide-react';

export const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  Code,
  Database,
  Zap,
  Palette,
  BarChart,
  Award,
  Rocket,
  Brain,
  Globe,
};

export function getIconComponent(iconName: string): LucideIcon | null {
  return iconMap[iconName] || null;
}
