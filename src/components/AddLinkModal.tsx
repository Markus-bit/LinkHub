import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Button from './ui/Button';
import Input from './ui/Input';
import { Link, NewLink } from '../types/database';
import { defaultCategories } from '../utils/defaultCategories';

interface AddLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (link: NewLink) => Promise<void>;
  editingLink: Link | null;
}

export default function AddLinkModal({ isOpen, onClose, onSave, editingLink }: AddLinkModalProps) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({ title: '', url: '', category: '' });
  const [loading, setLoading] = useState(false);

  // Reset form when modal opens/closes or when editing a different link
  useEffect(() => {
    if (isOpen) {
      if (editingLink) {
        setTitle(editingLink.title);
        setUrl(editingLink.url);
        setCategory(editingLink.category);
        setDescription(editingLink.description || '');
      } else {
        setTitle('');
        setUrl('');
        setCategory(defaultCategories[0].id);
        setDescription('');
      }
      setErrors({ title: '', url: '', category: '' });
    }
  }, [isOpen, editingLink]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = { title: '', url: '', category: '' };
    let hasError = false;
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
      hasError = true;
    }
    
    if (!url.trim()) {
      newErrors.url = 'URL is required';
      hasError = true;
    } else {
      try {
        // Try to validate the URL
        new URL(url);
      } catch (error) {
        newErrors.url = 'Please enter a valid URL';
        hasError = true;
      }
    }
    
    if (!category) {
      newErrors.category = 'Category is required';
      hasError = true;
    }
    
    if (hasError) {
      setErrors(newErrors);
      return;
    }
    
    try {
      setLoading(true);
      
      const linkData: NewLink = {
        ...(editingLink?.id ? { id: editingLink.id } : {}), // Only include id if editing
        title: title.trim(),
        url: url.trim().startsWith('http') ? url.trim() : `https://${url.trim()}`,
        category,
        description: description.trim() || null,
        user_id: '', // Will be filled by the onSave function
      };
      
      await onSave(linkData);
      onClose();
    } catch (error) {
      console.error('Error saving link:', error);
    } finally {
      setLoading(false);
    }
  };

  // If the modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-slate-900"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                {editingLink ? 'Edit Link' : 'Add New Link'}
              </h2>
              <button
                onClick={onClose}
                className="rounded-full p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="My Favorite Website"
                error={errors.title}
              />
              
              <Input
                label="URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                error={errors.url}
              />
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                >
                  <option value="">Select a category</option>
                  {defaultCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Description (optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="A brief description of the website"
                  rows={3}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={onClose} disabled={loading}>
                  Cancel
                </Button>
                <Button type="submit" isLoading={loading}>
                  {editingLink ? 'Update' : 'Add'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}