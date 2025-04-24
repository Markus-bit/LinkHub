import { Category } from '../types/database';
import { Lightbulb, GraduationCap, ShoppingBag, BookOpen, Globe, Play, Coffee } from 'lucide-react';

export const defaultCategories: Category[] = [
  {
    id: 'ai-tools',
    name: 'AI Tools',
    icon: 'Lightbulb',
    description: 'Artificial intelligence tools and platforms',
  },
  {
    id: 'learning',
    name: 'Learning',
    icon: 'GraduationCap',
    description: 'Educational websites and learning platforms',
  },
  {
    id: 'shopping',
    name: 'Shopping',
    icon: 'ShoppingBag',
    description: 'Online stores and marketplaces',
  },
  {
    id: 'reading',
    name: 'Reading',
    icon: 'BookOpen',
    description: 'News, blogs, and articles',
  },
  {
    id: 'social',
    name: 'Social',
    icon: 'Globe',
    description: 'Social media platforms',
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: 'Play',
    description: 'Videos, music, and streaming services',
  },
  {
    id: 'productivity',
    name: 'Productivity',
    icon: 'Coffee',
    description: 'Tools to boost your productivity',
  },
];

export const getCategoryIcon = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
    Lightbulb,
    GraduationCap,
    ShoppingBag,
    BookOpen,
    Globe,
    Play,
    Coffee,
  };
  
  return icons[iconName] || Globe;
};