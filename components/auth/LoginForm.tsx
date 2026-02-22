'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import SocialAuth from './SocialAuth';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

const LoginForm = () => {
  const router = useRouter();
  const { login } = useAuth();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const success = await login(formData.email, formData.password);
    setLoading(false);

    if (success) {
      toast.showToast('success', 'Login successful!');
      router.push('/doctors');
    } else {
      toast.showToast('error', 'Invalid email or password');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gradient mb-2"
        >
          Welcome Back!
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white/60"
        >
          Please enter your details to sign in
        </motion.p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email or Username"
          type="text"
          placeholder="Enter your email or username"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          icon={<FiMail className="w-5 h-5" />}
          required
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            icon={<FiLock className="w-5 h-5" />}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[42px] text-white/40 hover:text-white/60"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        <div className="flex justify-end">
          <Link 
            href="/forgot-password" 
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              toast.showToast('info', 'Password reset coming soon!');
            }}
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
        >
          SIGN IN
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
        <SocialAuth />

        {/* Sign Up Link */}
        <p className="text-center text-white/60 text-sm mt-6">
          Don't have an account?{' '}
          <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-semibold">
            Sign up
          </Link>
        </p>
      </form>
    </motion.div>
  );
};

export default LoginForm;