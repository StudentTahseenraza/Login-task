'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import lottie from 'lottie-web';

interface LottieAnimationProps {
  animationPath: string;
  className?: string;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({ 
  animationPath, 
  className = '' 
}) => {
  const animationContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (animationContainer.current) {
      const anim = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: animationPath,
      });

      return () => anim.destroy();
    }
  }, [animationPath]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      ref={animationContainer}
      className={`w-full h-full ${className}`}
    />
  );
};

export default LottieAnimation;