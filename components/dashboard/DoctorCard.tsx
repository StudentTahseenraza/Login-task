'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { FiClock, FiMapPin, FiStar } from 'react-icons/fi';

interface DoctorCardProps {
  name: string;
  specialty: string;
  qualification: string;
  location: string;
  rating: number;
  available: boolean;
  image?: string;
  onBook?: () => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  name,
  specialty,
  qualification,
  location,
  rating,
  available,
  image,
  onBook
}) => {
  return (
    <Card interactive className="overflow-hidden">
      <div className="flex gap-4">
        {/* Doctor Image */}
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt={name} className="w-full h-full object-cover rounded-2xl" />
            ) : (
              <span className="text-2xl font-bold text-white">
                {name.charAt(0)}
              </span>
            )}
          </div>
          {available && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black" />
          )}
        </div>

        {/* Doctor Info */}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white">{name}</h3>
          <p className="text-sm text-blue-400">{specialty}</p>
          <p className="text-xs text-white/60 mb-2">{qualification}</p>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-1 text-yellow-400">
              <FiStar className="w-3 h-3 fill-current" />
              <span className="text-xs">{rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1 text-white/60">
              <FiMapPin className="w-3 h-3" />
              <span className="text-xs truncate">{location}</span>
            </div>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={onBook}
            fullWidth
          >
            Book Appointment
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default DoctorCard;