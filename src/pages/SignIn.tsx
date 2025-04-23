import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });
  const { signIn, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const errors = { email: '', password: '' };
    let hasError = false;
    
    if (!email) {
      errors.email = 'Email is required';
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address';
      hasError = true;
    }
    
    if (!password) {
      errors.password = 'Password is required';
      hasError = true;
    }
    
    if (hasError) {
      setFormErrors(errors);
      return;
    }
    
    await signIn(email, password);
    
    // If successful and no error, navigate to dashboard
    if (!error) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="mx-auto flex min-h-[85vh] max-w-md items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Sign in to your account to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={formErrors.email}
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={formErrors.password}
              />
              
              {error && (
                <div className="rounded-md bg-red-50 p-3 dark:bg-red-900/30">
                  <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full"
                isLoading={loading}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex-col space-y-4">
            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
              Don't have an account yet?{' '}
              <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}