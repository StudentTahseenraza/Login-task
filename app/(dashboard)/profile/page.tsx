'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { FiUser, FiMail, FiPhone, FiCalendar, FiLogOut, FiSettings, FiCreditCard } from 'react-icons/fi';

export default function ProfilePage() {
  const { user, logout } = useAuth();

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <div className="w-24 h-24 mx-auto mb-4 rounded-3xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
          <span className="text-4xl font-bold text-white">
            {user?.name?.charAt(0) || 'U'}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-white">{user?.name}</h1>
        <p className="text-sm text-blue-400 capitalize">{user?.role}</p>
      </motion.div>

      {/* Profile Info */}
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-xl">
                  <FiMail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-white/40">Email</p>
                  <p className="text-white">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-xl">
                  <FiPhone className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-white/40">Phone</p>
                  <p className="text-white">{user?.phone || '+91 98765 43210'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-xl">
                  <FiCalendar className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <p className="text-xs text-white/40">Member Since</p>
                  <p className="text-white">Feb 2026</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-3"
        >
          <Card interactive className="p-4 text-center">
            <FiSettings className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <span className="text-sm text-white">Settings</span>
          </Card>
          <Card interactive className="p-4 text-center">
            <FiCreditCard className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <span className="text-sm text-white">Payments</span>
          </Card>
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="danger"
            size="lg"
            fullWidth
            icon={<FiLogOut className="w-5 h-5" />}
            onClick={logout}
          >
            Logout
          </Button>
        </motion.div>
      </div>
    </div>
  );
}