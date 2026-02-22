'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-white/80 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
              {icon}
            </div>
          )}
          <motion.input
            whileFocus={{ scale: 1.01 }}
            ref={ref}
            className={cn(
              "w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl",
              "text-white placeholder-white/40",
              "focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
              "transition-all duration-300",
              icon && "pl-10",
              error && "border-red-500",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-red-400"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;