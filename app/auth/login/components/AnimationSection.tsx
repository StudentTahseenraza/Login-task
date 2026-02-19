'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamically import Lottie with no SSR
const Lottie = dynamic(() => import('lottie-react'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-64 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
    </div>
  )
});

const AnimationSection = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Fetch animation data
    fetch('/animations/login-animation.json')
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error('Failed to load animation:', err));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative w-full max-w-lg"
    >
      {/* Glowing Background */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-3xl" />
      
      {/* Lottie Animation */}
      <div className="relative">
        {animationData ? (
          <Lottie
            animationData={animationData}
            loop={true}
            className="w-full h-auto"
          />
        ) : (
          <div className="w-full h-64 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Animated Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-8 text-center"
      >
        <h2 className="text-3xl font-bold text-white mb-2">
          Welcome Back!
        </h2>
        <p className="text-white/60">
          Secure access to your account
        </p>
      </motion.div>

      {/* Feature List */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-8 space-y-4"
      >
        {[
          { icon: '🔒', text: '256-bit Encryption' },
          { icon: '⚡', text: 'Lightning Fast Access' },
          { icon: '🛡️', text: 'Advanced Security' },
          { icon: '📱', text: 'Multi-device Sync' }
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + index * 0.1 }}
            className="flex items-center gap-3 text-white/80"
          >
            <span className="text-xl">{feature.icon}</span>
            <span>{feature.text}</span>
          </motion.div> */}
        {/* ))}
      </motion.div> */}
    </motion.div>
  );
};

export default AnimationSection;