import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, FolderPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLinks } from '../hooks/useLinks';
import Button from '../components/ui/Button';
import LinkCard from '../components/LinkCard';
import AddLinkModal from '../components/AddLinkModal';
import { Link, NewLink } from '../types/database';
import { defaultCategories, getCategoryIcon } from '../utils/defaultCategories';
import { Toaster } from 'react-hot-toast';

export default function Dashboard() {
  const { user } = useAuth();
  const { links, loading, saveLink, deleteLink } = useLinks();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);

  // If no links are loaded yet, show a welcome message
  const showWelcome = !loading && links.length === 0;

  // Filter links by search term and active category
  const filteredLinks = links.filter((link) => {
    const matchesSearch = searchTerm === '' || 
      link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (link.description && link.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = !activeCategory || link.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Group links by category
  const linksByCategory = filteredLinks.reduce<Record<string, Link[]>>((acc, link) => {
    if (!acc[link.category]) {
      acc[link.category] = [];
    }
    acc[link.category].push(link);
    return acc;
  }, {});

  // Function to handle link editing
  const handleEditLink = (link: Link) => {
    setEditingLink(link);
    setShowAddModal(true);
  };

  // Function to handle link saving
  const handleSaveLink = async (linkData: NewLink) => {
    await saveLink(linkData);
    setShowAddModal(false);
    setEditingLink(null);
  };

  // Function to handle link deletion with confirmation
  const handleDeleteLink = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this link?')) {
      await deleteLink(id);
    }
  };

  // Determine which categories to show in the sidebar
  const categoriesInUse = Array.from(new Set(links.map(link => link.category)));
  const availableCategories = defaultCategories.filter(cat => 
    !activeCategory || activeCategory === cat.id || categoriesInUse.includes(cat.id)
  );

  return (
    <div className="min-h-screen pb-8">
      <Toaster position="top-right" />
      
      {/* Dashboard Header */}
      <header className="mb-8 mt-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Your Dashboard</h1>
            <p className="text-slate-600 dark:text-slate-400">
              {user && `Welcome, ${user.email?.split('@')[0]}`}
            </p>
          </div>
          <div className="flex flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                type="search"
                placeholder="Search links..."
                className="w-full rounded-md border border-slate-300 bg-white py-2 pl-10 pr-4 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              onClick={() => {
                setEditingLink(null);
                setShowAddModal(true);
              }}
            >
              <Plus className="mr-1 h-4 w-4" />
              Add Link
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Sidebar / Categories */}
        <motion.div
          className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Categories</h2>
          
          <div className="space-y-1">
            <button
              className={`flex w-full items-center rounded-md px-3 py-2 text-left text-sm font-medium transition-colors 
                ${!activeCategory ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}`}
              onClick={() => setActiveCategory(null)}
            >
              All Links
            </button>
            
            {availableCategories.map((category) => {
              const CategoryIcon = getCategoryIcon(category.icon);
              return (
                <button
                  key={category.id}
                  className={`flex w-full items-center rounded-md px-3 py-2 text-left text-sm font-medium transition-colors 
                    ${activeCategory === category.id ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}`}
                  onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                >
                  <CategoryIcon className="mr-2 h-4 w-4" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex h-64 items-center justify-center rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600"></div>
            </div>
          ) : showWelcome ? (
            <motion.div
              className="flex h-64 flex-col items-center justify-center rounded-lg border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <FolderPlus className="mb-4 h-12 w-12 text-blue-500" />
              <h2 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">No links added yet</h2>
              <p className="mb-4 text-slate-600 dark:text-slate-400">
                Start building your collection by adding your favorite websites.
              </p>
              <Button 
                onClick={() => {
                  setEditingLink(null);
                  setShowAddModal(true);
                }}
              >
                <Plus className="mr-1 h-4 w-4" />
                Add Your First Link
              </Button>
            </motion.div>
          ) : filteredLinks.length === 0 ? (
            <motion.div
              className="flex h-64 flex-col items-center justify-center rounded-lg border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Search className="mb-4 h-12 w-12 text-slate-400" />
              <h2 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">No matches found</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Try adjusting your search or category filter to find what you're looking for.
              </p>
            </motion.div>
          ) : (
            <>
              {/* Display links by category or as a single list if a category is selected */}
              {activeCategory ? (
                <div>
                  <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
                    {defaultCategories.find(c => c.id === activeCategory)?.name || activeCategory}
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredLinks.map((link) => (
                      <LinkCard
                        key={link.id}
                        link={link}
                        onEdit={handleEditLink}
                        onDelete={handleDeleteLink}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                // Display links organized by category
                Object.entries(linksByCategory).map(([categoryId, categoryLinks]) => {
                  const category = defaultCategories.find(c => c.id === categoryId);
                  return (
                    <motion.div
                      key={categoryId}
                      className="mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mb-4 flex items-center justify-between text-white">
                        <h2 className="text-xl font-semibold ">
                          {category?.name || categoryId}
                        </h2>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setActiveCategory(categoryId)}
                        >
                          View All
                        </Button>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {categoryLinks.map((link) => (
                          <LinkCard
                            key={link.id}
                            link={link}
                            onEdit={handleEditLink}
                            onDelete={handleDeleteLink}
                          />
                        ))}
                      </div>
                    </motion.div>
                  );
                })
              )}
            </>
          )}
        </div>
      </div>

      {/* Add/Edit Link Modal */}
      <AddLinkModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingLink(null);
        }}
        onSave={handleSaveLink}
        editingLink={editingLink}
      />
    </div>
  );
}