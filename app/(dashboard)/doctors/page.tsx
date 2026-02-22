'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DoctorCard from '@/components/dashboard/DoctorCard';
import CalendarView from '@/components/dashboard/CalendarView';
import { FiSearch, FiFilter } from 'react-icons/fi';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const mockDoctors = [
  {
    id: '1',
    name: 'Dr. Divya Das',
    specialty: 'Cardiologist',
    qualification: 'MBBS, MD (Cardiology)',
    location: 'Dombivali',
    rating: 4.8,
    available: true
  },
  {
    id: '2',
    name: 'Dr. Kumar Das',
    specialty: 'Neurologist',
    qualification: 'MBBS, MD (Neurology)',
    location: 'Dombivali',
    rating: 4.9,
    available: true
  },
  {
    id: '3',
    name: 'Dr. Priya Sharma',
    specialty: 'Dermatologist',
    qualification: 'MBBS, MD (Dermatology)',
    location: 'Dombivali',
    rating: 4.7,
    available: false
  },
  {
    id: '4',
    name: 'Dr. Rajesh Kumar',
    specialty: 'Orthopedic',
    qualification: 'MBBS, MS (Ortho)',
    location: 'Dombivali',
    rating: 4.6,
    available: true
  }
];

export default function DoctorsPage() {
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDoctors = mockDoctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-white mb-2">Find a Doctor</h1>
        <p className="text-sm text-white/60">Book appointments with top specialists</p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              placeholder="Search doctors or specialties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<FiSearch className="w-5 h-5" />}
            />
          </div>
          <Button variant="secondary" size="md" icon={<FiFilter />}>
            Filter
          </Button>
        </div>
      </motion.div>

      {/* Doctor List */}
      <div className="space-y-4">
        {filteredDoctors.map((doctor, index) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedDoctor(doctor)}
          >
            <DoctorCard
              name={doctor.name}
              specialty={doctor.specialty}
              qualification={doctor.qualification}
              location={doctor.location}
              rating={doctor.rating}
              available={doctor.available}
              onBook={() => setSelectedDoctor(doctor)}
            />
          </motion.div>
        ))}
      </div>

      {/* Calendar Modal */}
      {selectedDoctor && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setSelectedDoctor(null)}
        >
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <CalendarView onSelectDate={(date) => console.log(date)} />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}