import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Bookmark, User, Layers } from 'lucide-react';
import Button from '../components/ui/Button';

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl">
      {/* Hero Section */}
      <section className="py-16 text-center md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl px-4"
        >
          <motion.h1 
            className="mb-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Your personal dashboard for all your favorite links
          </motion.h1>
          <motion.p 
            className="mb-8 text-lg text-slate-600 md:text-xl dark:text-slate-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Save, organize, and access your most important websites from one beautiful dashboard.
            Get started for free.
          </motion.p>
          <motion.div 
            className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link to="/signup" className="w-full sm:w-auto">
              <Button size="lg" className="w-full min-w-[150px] text-white">Get Started</Button>
            </Link>
            <Link to="/signin" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full min-w-[150px] text-white hover:text-slate-900 dark:hover:text-white">
                Sign In
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">
            Organize Your Online Life
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Compass className="h-10 w-10 text-blue-500" />,
                title: "Discover",
                description: "Find and save your favorite websites in one place."
              },
              {
                icon: <Bookmark className="h-10 w-10 text-purple-500" />,
                title: "Organize",
                description: "Categorize your links for easy access and organization."
              },
              {
                icon: <Layers className="h-10 w-10 text-indigo-500" />,
                title: "Personalize",
                description: "Customize your dashboard to fit your preferences."
              },
              {
                icon: <User className="h-10 w-10 text-green-500" />,
                title: "Share",
                description: "Share your collection with friends or keep it private."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm dark:bg-slate-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-4 rounded-full bg-slate-100 p-3 dark:bg-slate-800">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16 text-white md:py-24 rounded-xl">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to organize your online world?</h2>
          <p className="mb-8 text-lg text-blue-100">
            Join thousands of users who have simplified their digital life with LinkHub.
          </p>
          <Link to="/signup">
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-800/90"
            >
              Sign Up Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}