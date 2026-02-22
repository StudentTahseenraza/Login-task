'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiXCircle, FiAlertCircle, FiInfo } from 'react-icons/fi';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const toastStyles: Record<ToastType, string> = {
  success: 'bg-green-600',
  error: 'bg-red-600',
  warning: 'bg-yellow-600',
  info: 'bg-blue-600',
};

const toastIcons: Record<ToastType, React.ReactNode> = {
  success: <FiCheckCircle />,
  error: <FiXCircle />,
  warning: <FiAlertCircle />,
  info: <FiInfo />,
};

export const Toast: React.FC<ToastProps> = ({
  message,
  type,
  onClose,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.2 }}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-white shadow-lg ${toastStyles[type]}`}
    >
      <div className="text-lg">{toastIcons[type]}</div>
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button onClick={onClose} className="text-white/80 hover:text-white">
        ✕
      </button>
    </motion.div>
  );
};