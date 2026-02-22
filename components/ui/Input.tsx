'use client';

import React, { forwardRef, useId } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface InputProps extends HTMLMotionProps<'input'> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, id, disabled, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-white/80 mb-2"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none">
              {icon}
            </div>
          )}

          <motion.input
            ref={ref}
            id={inputId}
            whileFocus={!disabled ? { scale: 1.01 } : undefined}
            className={cn(
              'w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl',
              'text-white placeholder-white/40',
              'focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
              'transition-all duration-300',
              icon && 'pl-10',
              error &&
                'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              disabled && 'opacity-50 cursor-not-allowed',
              className
            )}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
        </div>

        {error && (
          <motion.p
            id={`${inputId}-error`}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
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