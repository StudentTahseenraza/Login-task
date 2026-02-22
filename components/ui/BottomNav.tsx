'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FiHome, 
  FiCalendar, 
  FiFileText, 
  FiUser,
  FiSearch 
} from 'react-icons/fi';
import { cn } from '@/lib/utils'; // Add this import

const navItems = [
  { href: '/doctors', icon: FiSearch, label: 'Find' },
  { href: '/appointments', icon: FiCalendar, label: 'Appoint' },
  { href: '/records', icon: FiFileText, label: 'Records' },
  { href: '/profile', icon: FiUser, label: 'Profile' },
];

const BottomNav = () => {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      <div className="glass-dark border-t border-white/10 px-4 py-2">
        <div className="max-w-lg mx-auto flex justify-around items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-1"
                >
                  <div className={cn(
                    "p-2 rounded-xl transition-all",
                    isActive ? "bg-blue-500/20 text-blue-400" : "text-white/60"
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={cn(
                    "text-xs",
                    isActive ? "text-blue-400" : "text-white/40"
                  )}>
                    {item.label}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default BottomNav;