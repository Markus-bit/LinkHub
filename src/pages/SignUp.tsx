import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formErrors, setFormErrors] = useState({ email: '', password: '', confirmPassword: '' });
  const { signUp, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const errors = { email: '', password: '', confirmPassword: '' };
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
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      hasError = true;
    }
    
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
      hasError = true;
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      hasError = true;
    }
    
    if (hasError) {
      setFormErrors(errors);
      return;
    }
    
    await signUp(email, password);
    
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
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>Sign up to get started with LinkHub</CardDescription>
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
              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={formErrors.confirmPassword}
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
                <UserPlus className="mr-2 h-4 w-4" />
                Sign Up
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex-col space-y-4">
            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
              Already have an account?{' '}
              <Link to="/signin" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}