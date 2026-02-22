'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { FiClock, FiCreditCard, FiCalendar } from 'react-icons/fi';

interface AppointmentCardProps {
  doctorName: string;
  specialty: string;
  tokenNo: string;
  date: string;
  time: string;
  paymentStatus: 'paid' | 'unpaid';
  onPayment?: () => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  doctorName,
  specialty,
  tokenNo,
  date,
  time,
  paymentStatus,
  onPayment
}) => {
  return (
    <Card interactive className="overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl" />
      
      <div className="relative">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">{doctorName}</h3>
            <p className="text-sm text-blue-400">{specialty}</p>
          </div>
          <div className="bg-purple-500/20 px-3 py-1 rounded-full">
            <span className="text-sm text-purple-400">Token #{tokenNo}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-white/60">
            <FiCalendar className="w-4 h-4" />
            <span className="text-sm">{date}</span>
          </div>
          <div className="flex items-center gap-2 text-white/60">
            <FiClock className="w-4 h-4" />
            <span className="text-sm font-semibold text-blue-400">{time}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/60">Payment Status</span>
            <span className={cn(
              "text-sm font-semibold px-2 py-1 rounded-full",
              paymentStatus === 'paid' 
                ? "bg-green-500/20 text-green-400" 
                : "bg-yellow-500/20 text-yellow-400"
            )}>
              {paymentStatus === 'paid' ? 'Paid ✓' : 'Not paid'}
            </span>
          </div>
          
          {paymentStatus === 'unpaid' && (
            <p className="text-xs text-white/40 mb-3">
              Reduce your waiting time by paying the consulting fee upfront
            </p>
          )}
        </div>

        {paymentStatus === 'unpaid' && (
          <Button
            variant="primary"
            size="sm"
            fullWidth
            icon={<FiCreditCard className="w-4 h-4" />}
            onClick={onPayment}
          >
            Make Payment
          </Button>
        )}
      </div>
    </Card>
  );
};

export default AppointmentCard;