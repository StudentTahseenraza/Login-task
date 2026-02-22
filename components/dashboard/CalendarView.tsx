'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface CalendarViewProps {
  onSelectDate?: (date: Date) => void;
  selectedDate?: Date;
}

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
];

const CalendarView: React.FC<CalendarViewProps> = ({
  onSelectDate,
  selectedDate
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <Card className="p-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white mb-1">Dr. Kumar Das</h2>
        <p className="text-sm text-blue-400">Cardiologist - Dombivali</p>
        <p className="text-xs text-white/60">MBBS, MD (Internal Medicine)</p>
      </div>

      {/* Calendar */}
      <div className="mb-6">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <FiChevronLeft className="w-5 h-5 text-white/60" />
          </button>
          <h3 className="text-lg font-semibold text-white">
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
          <button onClick={nextMonth} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <FiChevronRight className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {/* Week Days */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
            <div key={day} className="text-center text-xs font-medium text-white/40">
              {day}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            
            return (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelectDate?.(day)}
                className={cn(
                  "w-10 h-10 rounded-xl text-sm font-medium transition-all",
                  isSelected
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "hover:bg-white/10 text-white/80"
                )}
              >
                {format(day, 'd')}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Time Slots */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Select Hour</h3>
        <div className="grid grid-cols-3 gap-2">
          {timeSlots.map(slot => (
            <motion.button
              key={slot}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedTime(slot)}
              className={cn(
                "px-3 py-2 rounded-xl text-sm transition-all",
                selectedTime === slot
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                  : "bg-white/5 hover:bg-white/10 text-white/60"
              )}
            >
              {slot}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <Button
        variant="primary"
        size="lg"
        fullWidth
        className="mt-6"
        onClick={() => console.log('Book appointment')}
      >
        View My Appointment
      </Button>
    </Card>
  );
};

export default CalendarView;