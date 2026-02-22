'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { FiChevronLeft, FiChevronRight, FiX, FiClock } from 'react-icons/fi';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';


interface CalendarViewProps {
  onSelectDate?: (date: Date, time: string) => void;
  onClose?: () => void;
  selectedDate?: Date;
  doctorName?: string;
  specialty?: string;
  qualification?: string;
  location?: string;
}

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
];

const CalendarView: React.FC<CalendarViewProps> = ({
  onSelectDate,
  onClose,
  selectedDate,
  doctorName = "Dr. Kumar Das",
  specialty = "Cardiologist",
  qualification = "MBBS, MD (Internal Medicine)",
  location = "Dombivali"
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [tempSelectedDate, setTempSelectedDate] = useState<Date | undefined>(selectedDate);
  const modalRef = useRef<HTMLDivElement>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = monthStart;
  const endDate = monthEnd;

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const handleDateSelect = (day: Date) => {
    setTempSelectedDate(day);
  };

  const handleBookAppointment = () => {
    if (tempSelectedDate && selectedTime) {
      if (onSelectDate) {
        onSelectDate(tempSelectedDate, selectedTime);
      }
      if (onClose) onClose();
    }
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="w-full max-w-2xl my-8"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        <Card className="relative max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {/* Close Button - Sticky */}
          <div className="sticky top-0 z-20 bg-gradient-to-b from-[#1a1a2e] to-transparent pt-4 px-6 pb-2">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-2 hover:bg-white/10 rounded-xl transition-colors z-30"
            >
              <FiX className="w-5 h-5 text-white/60" />
            </button>
          </div>

          <div className="px-6 pb-6">
            {/* Doctor Info */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-1">{doctorName}</h2>
              <p className="text-sm text-blue-400">{specialty} - {location}</p>
              <p className="text-xs text-white/60">{qualification}</p>
            </div>

            {/* Calendar Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Select Date</h3>
              
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-4">
                <button 
                  onClick={prevMonth} 
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                >
                  <FiChevronLeft className="w-5 h-5 text-white/60" />
                </button>
                <h3 className="text-lg font-semibold text-white">
                  {format(currentMonth, 'MMMM yyyy')}
                </h3>
                <button 
                  onClick={nextMonth} 
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                >
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

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => {
                  const isSelected = tempSelectedDate && isSameDay(day, tempSelectedDate);
                  const isToday = isSameDay(day, new Date());
                  const isPast = day < new Date(new Date().setHours(0,0,0,0));
                  
                  return (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => !isPast && handleDateSelect(day)}
                      disabled={isPast}
                      className={cn(
                        "w-10 h-10 rounded-xl text-sm font-medium transition-all",
                        isSelected
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                          : isToday
                          ? "border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10"
                          : isPast
                          ? "text-white/20 cursor-not-allowed"
                          : "hover:bg-white/10 text-white/80"
                      )}
                    >
                      {format(day, 'd')}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Time Slots Section */}
            {tempSelectedDate && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <FiClock className="w-5 h-5 text-blue-400" />
                  Select Time for {format(tempSelectedDate, 'MMMM d, yyyy')}
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {timeSlots.map(slot => {
                    const isPastTime = tempSelectedDate && 
                      tempSelectedDate.toDateString() === new Date().toDateString() && 
                      new Date(`2000/01/01 ${slot}`) < new Date();
                    
                    return (
                      <motion.button
                        key={slot}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => !isPastTime && setSelectedTime(slot)}
                        disabled={isPastTime}
                        className={cn(
                          "px-3 py-2 rounded-xl text-sm transition-all",
                          selectedTime === slot
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                            : isPastTime
                            ? "bg-white/5 text-white/20 cursor-not-allowed"
                            : "bg-white/5 hover:bg-white/10 text-white/60"
                        )}
                      >
                        {slot}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Selected Info Summary */}
            {tempSelectedDate && selectedTime && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-white/10"
              >
                <p className="text-sm text-white/60 mb-1">Your Appointment Summary</p>
                <p className="text-white font-medium">
                  {doctorName} • {format(tempSelectedDate, 'MMMM d, yyyy')} • {selectedTime}
                </p>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 sticky bottom-0 bg-gradient-to-t from-[#1a1a2e] to-transparent pt-4">
              <Button
                variant="secondary"
                size="lg"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={handleBookAppointment}
                disabled={!tempSelectedDate || !selectedTime}
                className="flex-1"
              >
                Book Appointment
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default CalendarView;