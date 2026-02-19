'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiLogOut, FiUser, FiMail, FiCalendar } from 'react-icons/fi';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      router.push('/');
    } else {
      setUser(JSON.parse(currentUser));
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Background Animation */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-purple-600/30 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-blue-600/30 blur-3xl animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold text-white"
            >
              Dashboard
            </motion.h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-2 bg-red-500/20 border border-red-500/50 text-white rounded-xl hover:bg-red-500/30 transition-all"
            >
              <FiLogOut className="w-4 h-4" />
              Logout
            </motion.button>
          </div>

          {/* Welcome Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <FiUser className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Welcome, {user.username || user.email}!
                </h2>
                <p className="text-white/60">Glad to see you again</p>
              </div>
            </div>

            {/* User Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/5 rounded-xl p-4 border border-white/10"
              >
                <div className="flex items-center gap-3 text-white/80 mb-2">
                  <FiMail className="w-4 h-4" />
                  <span className="text-sm">Email</span>
                </div>
                <p className="text-white font-medium">{user.email}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/5 rounded-xl p-4 border border-white/10"
              >
                <div className="flex items-center gap-3 text-white/80 mb-2">
                  <FiCalendar className="w-4 h-4" />
                  <span className="text-sm">Member Since</span>
                </div>
                <p className="text-white font-medium">
                  {new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="md:col-span-2 bg-white/5 rounded-xl p-4 border border-white/10"
              >
                <div className="flex items-center gap-3 text-white/80 mb-2">
                  <FiUser className="w-4 h-4" />
                  <span className="text-sm">User ID</span>
                </div>
                <p className="text-white font-mono text-sm">{user.id}</p>
              </motion.div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { label: 'Logins', value: '12' },
                { label: 'Sessions', value: '3' },
                { label: 'Security', value: 'High' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}