'use client';

import React from 'react';
import { motion } from 'framer-motion';
import AppointmentTabs from '@/components/dashboard/AppointmentTabs';
import { FiCalendar } from 'react-icons/fi';

export default function AppointmentsPage() {
  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl">
          <FiCalendar className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Appointments</h1>
          <p className="text-sm text-white/60">Manage your appointments</p>
        </div>
      </motion.div>

      {/* Appointments */}
      <AppointmentTabs />
    </div>
  );
}