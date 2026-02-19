'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCheckCircle, 
  FiAlertCircle, 
  FiInfo, 
  FiX,
  FiBell 
} from 'react-icons/fi';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

const toastIcons = {
  success: <FiCheckCircle className="w-5 h-5" />,
  error: <FiAlertCircle className="w-5 h-5" />,
  info: <FiInfo className="w-5 h-5" />,
  warning: <FiBell className="w-5 h-5" />
};

const toastColors = {
  success: {
    bg: 'bg-gradient-to-r from-green-500 to-emerald-500',
    shadow: 'shadow-green-500/25'
  },
  error: {
    bg: 'bg-gradient-to-r from-red-500 to-pink-500',
    shadow: 'shadow-red-500/25'
  },
  info: {
    bg: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    shadow: 'shadow-blue-500/25'
  },
  warning: {
    bg: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    shadow: 'shadow-yellow-500/25'
  }
};

export const Toast: React.FC<ToastProps> = ({
  id,
  type,
  message,
  duration = 3000,
  onClose
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={`
        relative flex items-center gap-3 px-4 py-3 rounded-xl
        ${toastColors[type].bg} text-white
        shadow-lg ${toastColors[type].shadow}
        backdrop-blur-xl border border-white/20
        min-w-[300px] max-w-md
      `}
    >
      {/* Progress Bar */}
      <motion.div
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: duration / 1000, ease: 'linear' }}
        className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-b-xl"
      />
      
      {/* Icon */}
      <div className="flex-shrink-0">
        {toastIcons[type]}
      </div>
      
      {/* Message */}
      <p className="flex-1 text-sm font-medium">{message}</p>
      
      {/* Close Button */}
      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 hover:opacity-70 transition-opacity"
      >
        <FiX className="w-4 h-4" />
      </button>
    </motion.div>
  );
};