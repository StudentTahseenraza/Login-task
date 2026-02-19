'use client';

import React, { useEffect } from 'react';
import LoginForm from './auth/login/components/LoginForm';
import AnimationSection from './auth/login/components/AnimationSection';
import BackgroundAnimation from './auth/login/components/BackgroundAnimation';

export default function Home() {
  useEffect(() => {
    // Initialize with demo users if no users exist
    const users = localStorage.getItem('users');
    if (!users) {
      const demoUsers = [
        {
          id: 1,
          email: 'demo@example.com',
          username: 'demo',
          password: 'Demo@123',  // Make sure this matches exactly
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          email: 'john@example.com',
          username: 'john_doe',
          password: 'John@123',  // Make sure this matches exactly
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('users', JSON.stringify(demoUsers));
      console.log('Demo users initialized:', demoUsers); // For debugging
    } else {
      console.log('Existing users:', JSON.parse(users)); // For debugging
    }
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <BackgroundAnimation />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen w-full">
        <div className="flex min-h-screen flex-col lg:flex-row">
          {/* Left Side - Animation */}
          <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
            <AnimationSection />
          </div>
          
          {/* Right Side - Login Form */}
          <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
            <div className="w-full max-w-md">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}