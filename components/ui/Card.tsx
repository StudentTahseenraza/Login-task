'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  interactive?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  glow = false,
  interactive = false
}) => {
  return (
    <motion.div
      whileHover={interactive ? { 
        scale: 1.02,
        rotateY: 5,
        rotateX: 5,
        transition: { duration: 0.3 }
      } : {}}
      className={cn(
        "glass-card rounded-2xl p-6 border border-white/10",
        "transform perspective-1000 preserve-3d",
        glow && "shadow-[0_0_30px_rgba(59,130,246,0.3)]",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default Card;