'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiPhone } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import SocialAuth from './SocialAuth';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { cn } from '@/lib/utils';

const SignUpForm = () => {
  const router = useRouter();
  const { signup } = useAuth();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'patient' as 'patient' | 'doctor'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.showToast('error', 'Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      toast.showToast('error', 'Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    const success = await signup(formData);
    setLoading(false);

    if (success) {
      toast.showToast('success', 'Account created successfully!');
      router.push('/doctors');
    } else {
      toast.showToast('error', 'Email already exists');
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
          Create Account
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white/60"
        >
          Join us to book appointments with top doctors
        </motion.p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          icon={<FiUser className="w-5 h-5" />}
          required
        />

        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          icon={<FiMail className="w-5 h-5" />}
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          icon={<FiPhone className="w-5 h-5" />}
          required
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
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

        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            icon={<FiLock className="w-5 h-5" />}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-[42px] text-white/40 hover:text-white/60"
          >
            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        {/* Role Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/80">I am a</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'patient' })}
              className={cn(
                "py-3 rounded-xl font-medium transition-all",
                formData.role === 'patient'
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                  : "bg-white/10 text-white/60 hover:bg-white/20"
              )}
            >
              Patient
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'doctor' })}
              className={cn(
                "py-3 rounded-xl font-medium transition-all",
                formData.role === 'doctor'
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                  : "bg-white/10 text-white/60 hover:bg-white/20"
              )}
            >
              Doctor
            </button>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
        >
          SIGN UP
        </Button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-transparent text-white/40">
              Or sign up with
            </span>
          </div>
        </div>

        {/* Social Login */}
        <SocialAuth />

        {/* Login Link */}
        <p className="text-center text-white/60 text-sm mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-400 hover:text-blue-300 font-semibold">
            Sign in
          </Link>
        </p>
      </form>
    </motion.div>
  );
};

export default SignUpForm;