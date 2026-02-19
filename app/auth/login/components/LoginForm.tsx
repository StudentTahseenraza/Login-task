'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import SocialLogin from './SocialLogin';
import PopupMessage from '@/components/ui/PopupMessage';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';

interface PopupState {
  show: boolean;
  type: 'success' | 'error' | 'info';
  message: string;
}

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState<PopupState>({
    show: false,
    type: 'info',
    message: ''
  });

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

  // Show popup message
  const showPopup = (type: 'success' | 'error' | 'info', message: string) => {
    setPopup({ show: true, type, message });
    setTimeout(() => {
      setPopup(prev => ({ ...prev, show: false }));
    }, 3000);
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

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleLogin = () => {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find user
    const user = users.find((u: any) => 
      (u.email === formData.email || u.username === formData.username) && 
      u.password === formData.password
    );

    if (user) {
      // Store current user
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // Show success message
      showPopup('success', 'Login successful! Redirecting...');
      
      // Redirect to dashboard after delay
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
    } else {
      showPopup('error', 'Invalid email/username or password');
    }
  };

  const handleRegister = () => {
    // Get existing users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    const userExists = users.some((u: any) => 
      u.email === formData.email || u.username === formData.username
    );

    if (userExists) {
      showPopup('error', 'User already exists!');
      return;
    }

    // Create new user
    const newUser = {
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
    
    showPopup('success', 'Registration successful! Redirecting...');
    
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
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
      { key: 'length', label: 'At least 8 characters', met: validation.errors.length },
      { key: 'upperCase', label: 'Uppercase letter', met: validation.errors.upperCase },
      { key: 'lowerCase', label: 'Lowercase letter', met: validation.errors.lowerCase },
      { key: 'number', label: 'Number', met: validation.errors.number },
      { key: 'specialChar', label: 'Special character', met: validation.errors.specialChar }
    ];

    const strengthPercentage = (requirements.filter(r => r.met).length / requirements.length) * 100;

    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-2 space-y-2"
      >
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${strengthPercentage}%` }}
            className={`h-full ${
              strengthPercentage <= 40 ? 'bg-red-500' :
              strengthPercentage <= 70 ? 'bg-yellow-500' :
              'bg-green-500'
            }`}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {requirements.map((req) => (
            <div key={req.key} className="flex items-center gap-2 text-xs">
              <span className={req.met ? 'text-green-500' : 'text-white/40'}>
                {req.met ? '✓' : '○'}
              </span>
              <span className={req.met ? 'text-green-500/80' : 'text-white/40'}>
                {req.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <>
      {/* Popup Message */}
      <AnimatePresence>
        {popup.show && (
          <PopupMessage
            type={popup.type}
            message={popup.message}
            onClose={() => setPopup(prev => ({ ...prev, show: false }))}
          />
        )}
      </AnimatePresence>

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
            {isLogin ? 'Login Now' : 'Create Account'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/60"
          >
            {isLogin 
              ? 'Welcome back! Please enter your details' 
              : 'Sign up for a new account'}
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
                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  error={errors.confirmPassword}
                  icon={<FiLock className="w-5 h-5" />}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Forgot Password Link */}
          {isLogin && (
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                type="button"
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
            {isLogin ? 'LOGIN' : 'SIGN UP'}
          </Button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-white/40">
                Or login with
              </span>
            </div>
          </div>

          {/* Social Login */}
          <SocialLogin />

          {/* Toggle between Login and Sign Up */}
          <p className="text-center text-white/60 mt-6">
            {isLogin ? "Not a member?" : "Already have an account?"}{' '}
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
              {isLogin ? 'Sign up now' : 'Login now'}
            </motion.button>
          </p>
        </form>
      </motion.div>
    </>
  );
};

export default LoginForm;