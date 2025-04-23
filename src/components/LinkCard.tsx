import React from 'react';
import { motion } from 'framer-motion';
import { Link as LinkType } from '../types/database';
import { ExternalLink, Edit, Trash2 } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/Card';

interface LinkCardProps {
  link: LinkType;
  onEdit: (link: LinkType) => void;
  onDelete: (id: string) => void;
}

export default function LinkCard({ link, onEdit, onDelete }: LinkCardProps) {
  // Extract domain for favicon
  const getDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return domain;
    } catch {
      return 'example.com';
    }
  };

  const domain = getDomain(link.url);
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

  return (
    <Card className="h-full transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <img src={faviconUrl} alt={link.title} className="h-8 w-8" />
          <CardTitle className="text-lg">{link.title}</CardTitle>
        </div>
        <CardDescription className="line-clamp-2 min-h-10">
          {link.description || `A link to ${domain}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-slate-500 dark:text-slate-400">
        <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center overflow-hidden text-ellipsis whitespace-nowrap text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
          <span className="overflow-hidden text-ellipsis">{domain}</span>
          <ExternalLink className="ml-1 h-3 w-3" />
        </a>
      </CardContent>
      <CardFooter className="justify-between">
        <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-800 dark:bg-slate-800 dark:text-slate-200">
          {link.category}
        </div>
        <div className="flex items-center space-x-2">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onEdit(link)}
            className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <Edit className="h-4 w-4" />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(link.id)}
            className="rounded p-1 text-red-500 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
          >
            <Trash2 className="h-4 w-4" />
          </motion.button>
        </div>
      </CardFooter>
    </Card>
  );
}