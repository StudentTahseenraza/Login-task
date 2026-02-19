'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BackgroundAnimation = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [particles, setParticles] = useState<Array<{ id: number }>>([]);

  useEffect(() => {
    // Set dimensions after component mounts (client-side only)
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });

    // Create particles array
    setParticles(Array.from({ length: 20 }, (_, i) => ({ id: i })));
  }, []);

  // Don't render particles until we have dimensions
  if (dimensions.width === 0) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-purple-600/30 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-blue-600/30 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-600/20 blur-3xl" />
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Cpath d='M0 0h60v1H0zM0 0h1v60H0z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 100, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-purple-600/30 blur-3xl"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -150, 0],
          y: [0, 150, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-blue-600/30 blur-3xl"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-600/20 blur-3xl"
      />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Cpath d='M0 0h60v1H0zM0 0h1v60H0z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}
      />

      {/* Floating Particles - Only render when dimensions are available */}
      {dimensions.width > 0 && particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          animate={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            scale: [0, 1, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
          className="absolute h-1 w-1 rounded-full bg-white/30"
        />
      ))}
    </div>
  );
};

export default BackgroundAnimation;