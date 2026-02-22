'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppointmentCard from './AppointmentCard';
import { cn } from '@/lib/utils';

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  tokenNo: string;
  date: string;
  time: string;
  paymentStatus: 'paid' | 'unpaid';
  status: 'upcoming' | 'completed' | 'cancelled';
}

const mockAppointments: Appointment[] = [
  {
    id: '1',
    doctorName: 'Dr. Divya Das',
    specialty: 'Cardiologist',
    tokenNo: '12',
    date: 'Today',
    time: '12:30 PM',
    paymentStatus: 'unpaid',
    status: 'upcoming'
  },
  {
    id: '2',
    doctorName: 'Dr. Kumar Das',
    specialty: 'Neurologist',
    tokenNo: '08',
    date: 'Yesterday',
    time: '10:00 AM',
    paymentStatus: 'paid',
    status: 'completed'
  },
  {
    id: '3',
    doctorName: 'Dr. Priya Sharma',
    specialty: 'Dermatologist',
    tokenNo: '15',
    date: '23 Feb',
    time: '03:30 PM',
    paymentStatus: 'unpaid',
    status: 'cancelled'
  }
];

const AppointmentTabs = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');

  const tabs = [
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' }
  ];

  const filteredAppointments = mockAppointments.filter(apt => apt.status === activeTab);

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 mb-6 p-1 glass-dark rounded-2xl">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex-1 py-3 rounded-xl font-medium transition-all relative",
              activeTab === tab.id ? "text-white" : "text-white/40"
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Appointments List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-4"
        >
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map(appointment => (
              <AppointmentCard
                key={appointment.id}
                doctorName={appointment.doctorName}
                specialty={appointment.specialty}
                tokenNo={appointment.tokenNo}
                date={appointment.date}
                time={appointment.time}
                paymentStatus={appointment.paymentStatus}
                onPayment={() => console.log('Payment for', appointment.id)}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-white/40">No {activeTab} appointments</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AppointmentTabs;