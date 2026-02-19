'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';

interface PopupMessageProps {
  type: 'success' | 'error' | 'info';
  message: string;
  onClose: () => void;
  duration?: number;
}

const PopupMessage: React.FC<PopupMessageProps> = ({
  type,
  message,
  onClose,
  duration = 3000
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <FiCheckCircle className="w-5 h-5" />,
    error: <FiAlertCircle className="w-5 h-5" />,
    info: <FiInfo className="w-5 h-5" />
  };

  const colors = {
    success: 'bg-green-500/20 border-green-500/50 text-green-400',
    error: 'bg-red-500/20 border-red-500/50 text-red-400',
    info: 'bg-blue-500/20 border-blue-500/50 text-blue-400'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, x: '-50%' }}
      animate={{ opacity: 1, y: 0, x: '-50%' }}
      exit={{ opacity: 0, y: -50, x: '-50%' }}
      className={`fixed top-5 left-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl ${colors[type]}`}
    >
      {icons[type]}
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-4 hover:opacity-70 transition-opacity"
      >
        <FiX className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default PopupMessage;