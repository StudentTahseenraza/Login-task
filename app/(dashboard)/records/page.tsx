'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import { FiFileText, FiDownload, FiEye } from 'react-icons/fi';

const records = [
  {
    id: '1',
    title: 'Blood Test Report',
    date: '15 Feb 2026',
    doctor: 'Dr. Divya Das',
    type: 'Lab Report'
  },
  {
    id: '2',
    title: 'Prescription',
    date: '10 Feb 2026',
    doctor: 'Dr. Kumar Das',
    type: 'Prescription'
  },
  {
    id: '3',
    title: 'X-Ray Report',
    date: '05 Feb 2026',
    doctor: 'Dr. Priya Sharma',
    type: 'Imaging'
  }
];

export default function RecordsPage() {
  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
          <FiFileText className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Medical Records</h1>
          <p className="text-sm text-white/60">Your health records</p>
        </div>
      </motion.div>

      {/* Records List */}
      <div className="space-y-4">
        {records.map((record, index) => (
          <motion.div
            key={record.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card interactive>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{record.title}</h3>
                  <p className="text-sm text-blue-400">{record.doctor}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-white/40">{record.date}</span>
                    <span className="text-xs bg-white/10 px-2 py-1 rounded-full text-white/60">
                      {record.type}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                    <FiEye className="w-5 h-5 text-white/60" />
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                    <FiDownload className="w-5 h-5 text-white/60" />
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}