'use client';

import React from 'react';
import { motion } from 'framer-motion';
import LottieAnimation from '@/components/ui/LottieAnimation';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -150, 0],
            y: [0, 150, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-600/20 blur-3xl"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-6xl"
        >
          <div className="glass rounded-3xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Left Side - Lottie Animation */}
              <div className="lg:w-1/2 p-8 lg:p-12 bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm">
                <div className="h-full flex flex-col items-center justify-center">
                  <div className="w-full max-w-md mx-auto">
                    <LottieAnimation 
                      animationPath="/animations/animation.json"
                      className="w-full h-auto"
                    />
                  </div>
                  
                  {/* Animated Text */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-center mt-8"
                  >
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {title}
                    </h2>
                    <p className="text-white/60">
                      {subtitle}
                    </p>
                  </motion.div>

                  {/* Floating Features */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 grid grid-cols-2 gap-4"
                  >
                    {[
                      { icon: '🔒', text: 'Secure' },
                      { icon: '⚡', text: 'Fast' },
                      { icon: '🛡️', text: 'Private' },
                      { icon: '📱', text: 'Mobile' },
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 text-white/80 bg-white/5 rounded-xl px-3 py-2"
                      >
                        <span>{feature.icon}</span>
                        <span className="text-sm">{feature.text}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="lg:w-1/2 p-8 lg:p-12">
                {children}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;