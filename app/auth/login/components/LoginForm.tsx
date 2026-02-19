'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import SocialLogin from './SocialLogin';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import { useToast } from '@/context/ToastContext';

interface FormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  createdAt: string;
}

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // Password validation function
  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
      errors: {
        length: password.length >= minLength,
        upperCase: hasUpperCase,
        lowerCase: hasLowerCase,
        number: hasNumbers,
        specialChar: hasSpecialChar
      }
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email && !formData.username) {
      newErrors.email = 'Email or username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = 'Password must contain at least 8 characters, including uppercase, lowercase, number and special character';
      }
    }

    if (!isLogin) {
      if (!formData.username) {
        newErrors.username = 'Username is required';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    return newErrors;
  };

  const handleLogin = () => {
    // Get users from localStorage
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find user
    const user = users.find((u) => 
      (u.email === formData.email || u.username === formData.email) && 
      u.password === formData.password
    );

    if (user) {
      // Store current user
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // Show success toast
      toast.success('Login successful! Redirecting to dashboard...');
      
      // Redirect to dashboard after delay
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
    } else {
      toast.error('Invalid email/username or password');
    }
  };

  const handleRegister = () => {
    // Get existing users
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    const userExists = users.some((u) => 
      u.email === formData.email || u.username === formData.username
    );

    if (userExists) {
      toast.error('User already exists! Please try a different email or username.');
      return;
    }

    // Create new user
    const newUser: User = {
      id: Date.now(),
      email: formData.email,
      username: formData.username,
      password: formData.password,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto login after registration
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    toast.success('Account created successfully! Redirecting to dashboard...');
    
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      
      // Show first error as toast
      const firstError = Object.values(newErrors)[0];
      toast.error(firstError);
      return;
    }

    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      
      if (isLogin) {
        handleLogin();
      } else {
        handleRegister();
      }
    }, 1000);
  };

  // Password strength indicator
  const PasswordStrengthIndicator = () => {
    const validation = validatePassword(formData.password);
    
    if (!formData.password) return null;

    const requirements = [
      { key: 'length', label: '8+ characters', met: validation.errors.length },
      { key: 'upperCase', label: 'Uppercase', met: validation.errors.upperCase },
      { key: 'lowerCase', label: 'Lowercase', met: validation.errors.lowerCase },
      { key: 'number', label: 'Number', met: validation.errors.number },
      { key: 'specialChar', label: 'Special', met: validation.errors.specialChar }
    ];

    const strengthPercentage = (requirements.filter(r => r.met).length / requirements.length) * 100;

    let strengthColor = 'bg-red-500';
    let strengthText = 'Weak';
    
    if (strengthPercentage >= 80) {
      strengthColor = 'bg-green-500';
      strengthText = 'Strong';
    } else if (strengthPercentage >= 60) {
      strengthColor = 'bg-yellow-500';
      strengthText = 'Medium';
    } else if (strengthPercentage >= 40) {
      strengthColor = 'bg-orange-500';
      strengthText = 'Fair';
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-2 space-y-2"
      >
        <div className="flex justify-between items-center">
          <span className="text-xs text-white/60">Password Strength</span>
          <span className={`text-xs font-medium ${strengthColor.replace('bg-', 'text-')}`}>
            {strengthText}
          </span>
        </div>
        
        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${strengthPercentage}%` }}
            className={`h-full ${strengthColor} transition-all duration-300`}
          />
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {requirements.map((req) => (
            <div
              key={req.key}
              className={`text-xs px-2 py-1 rounded-full ${
                req.met 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-white/5 text-white/40 border border-white/10'
              }`}
            >
              {req.label}
            </div>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mb-2"
        >
          {isLogin ? 'Welcome Back!' : 'Create Account'}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white/60"
        >
          {isLogin 
            ? 'Please enter your details to sign in' 
            : 'Fill in the details to get started'}
        </motion.p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? 'login' : 'register'}
            initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {!isLogin && (
              <Input
                label="Username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
                error={errors.username}
                icon={<FiUser className="w-5 h-5" />}
              />
            )}

            <Input
              label={isLogin ? "Email or Username" : "Email"}
              name="email"
              type={isLogin ? "text" : "email"}
              value={formData.email}
              onChange={handleChange}
              placeholder={isLogin ? "Enter your email or username" : "Enter your email"}
              error={errors.email}
              icon={<FiMail className="w-5 h-5" />}
            />

            <div className="relative">
              <Input
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                error={errors.password}
                icon={<FiLock className="w-5 h-5" />}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[42px] text-white/40 hover:text-white/60 transition-colors"
              >
                {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
              </button>
              
              {/* Password Strength Indicator */}
              {!isLogin && <PasswordStrengthIndicator />}
            </div>

            {!isLogin && (
              <div className="relative">
                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  error={errors.confirmPassword}
                  icon={<FiLock className="w-5 h-5" />}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-[42px] text-white/40 hover:text-white/60 transition-colors"
                >
                  {showConfirmPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Forgot Password Link */}
        {isLogin && (
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              type="button"
              onClick={() => toast.info('Password reset feature coming soon!')}
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              Forgot password?
            </motion.button>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          size="lg"
          loading={loading}
        >
          {isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}
        </Button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-transparent text-white/40">
              Or continue with
            </span>
          </div>
        </div>

        {/* Social Login */}
        <SocialLogin />

        {/* Toggle between Login and Sign Up */}
        <p className="text-center text-white/60 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <motion.button
            whileHover={{ scale: 1.05 }}
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setErrors({});
              setFormData({
                email: '',
                username: '',
                password: '',
                confirmPassword: ''
              });
            }}
            className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </motion.button>
        </p>
      </form>

      {/* Demo Credentials Hint */}
      {isLogin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10"
        >
          <p className="text-xs text-white/40 text-center">
            Demo credentials: demo@example.com / Demo@123
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default LoginForm;