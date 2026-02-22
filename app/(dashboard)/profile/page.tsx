'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiLogOut,
  FiSettings,
  FiCreditCard,
  FiClock,
  FiEdit2,
  FiSave,
  FiX,
} from 'react-icons/fi';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const toast = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name ?? '');
  const [editedPhone, setEditedPhone] = useState(user?.phone ?? '');

  const handleLogout = () => {
    logout();
    toast.showToast('success', 'Logged out successfully');
  };

  const handleSaveProfile = () => {
    toast.showToast('success', 'Profile updated successfully');
    setIsEditing(false);
  };

  const getUserInitials = () => {
    if (user?.name) {
      return user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.charAt(0).toUpperCase() ?? 'U';
  };

  const getDateJoined = () => {
    if (user?.createdAt) {
      return new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      });
    }
    return 'February 2026';
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-6"
      >
        <button
          onClick={() => setIsEditing((prev) => !prev)}
          className="absolute right-0 top-0 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
        >
          {isEditing ? (
            <FiX className="w-5 h-5 text-white" />
          ) : (
            <FiEdit2 className="w-5 h-5 text-white" />
          )}
        </button>

        <div className="text-center">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="w-24 h-24 mx-auto mb-4 rounded-3xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-xl shadow-blue-500/25"
          >
            <span className="text-4xl font-bold text-white">
              {getUserInitials()}
            </span>
          </motion.div>

          {isEditing ? (
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="text-2xl font-bold text-white bg-white/10 rounded-lg px-3 py-1 text-center border border-white/20 focus:outline-none focus:border-blue-500"
              placeholder="Your name"
            />
          ) : (
            <h1 className="text-2xl font-bold text-white">
              {user?.name ?? 'User'}
            </h1>
          )}

          <p className="text-sm text-blue-400 capitalize mt-1">
            {user?.role ?? 'Patient'}
          </p>
        </div>
      </motion.div>

      {/* Save Button */}
      {isEditing && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Button
            variant="success"
            size="lg"
            fullWidth
            icon={<FiSave className="w-5 h-5" />}
            onClick={handleSaveProfile}
          >
            Save Changes
          </Button>
        </motion.div>
      )}

      {/* Logout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-6"
      >
        <Button
          variant="danger"
          size="lg"
          fullWidth
          icon={<FiLogOut className="w-5 h-5" />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </motion.div>
    </div>
  );
}