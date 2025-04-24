import React, { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, LogOut, User } from 'lucide-react';
import Button from './ui/Button';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isDashboard = location.pathname === '/dashboard';

  // Close mobile menu when path changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Add shadow to header on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header 
        className={`fixed top-0 z-40 w-full transition-all duration-200 ${
          isScrolled ? 'bg-white/80 backdrop-blur-sm shadow-sm dark:bg-slate-900/80' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white"
            >
              <span className="font-semibold">L</span>
            </motion.div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">LinkHub</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-4 md:flex">
            {user ? (
              <>
                {!isDashboard && (
                  <>
                    <Link to="/dashboard">
                      <Button variant="ghost" size="sm" className="text-white">Dashboard</Button>
                    </Link>
                  </>
                )}
                <div className="flex items-center space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-white">{user.email?.split('@')[0]}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSignOut}
                  className="flex items-center text-white hover:text-slate-900 dark:hover:text-white"
                >
                  <LogOut className="mr-1 h-4 w-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/signin">
                  <Button variant="outline" size="sm" className="text-white hover:text-slate-900 dark:hover:text-white">Sign In</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="text-white">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="rounded p-2 text-slate-600 hover:bg-slate-100 md:hidden dark:text-slate-300 dark:hover:bg-slate-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-b border-slate-200 bg-white px-4 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:hidden"
            >
              <div className="flex flex-col space-y-3">
                {!isDashboard && user && (
                  <>
                    <Link to="/dashboard" className="py-2 text-white">
                      Dashboard
                    </Link>
                  </>
                )}
                
                {user ? (
                  <>
                    <div className="flex items-center space-x-2 py-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                        <User className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium text-white">{user.email?.split('@')[0]}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={handleSignOut}
                      className="flex items-center justify-center text-white hover:text-slate-900 dark:hover:text-white"
                    >
                      <LogOut className="mr-1 h-4 w-4" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/signin" className="w-full">
                      <Button variant="outline" className="w-full text-white hover:text-slate-900 dark:hover:text-white">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/signup" className="w-full">
                      <Button className="w-full text-white">Sign Up</Button>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="container mx-auto pt-16">
            {children}
      </main>

      <footer className="border-t border-slate-200 bg-white py-8 dark:border-slate-800 dark:bg-slate-950">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} LinkHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}