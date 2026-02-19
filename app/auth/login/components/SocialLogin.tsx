'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

const SocialLogin = () => {
  const socialButtons = [
    {
      name: 'Google',
      icon: FcGoogle,
      bgColor: 'bg-white/10',
      hoverColor: 'hover:bg-white/20',
      onClick: () => console.log('Google login')
    },
    {
      name: 'Facebook',
      icon: FaFacebook,
      bgColor: 'bg-[#1877F2]/20',
      hoverColor: 'hover:bg-[#1877F2]/30',
      iconColor: 'text-[#1877F2]',
      onClick: () => console.log('Facebook login')
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {socialButtons.map((button, index) => {
        const Icon = button.icon;
        return (
          <motion.button
            key={button.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={button.onClick}
            className={`
              flex items-center justify-center gap-2 px-4 py-3
              ${button.bgColor} ${button.hoverColor}
              border border-white/10 rounded-xl
              text-white font-medium
              transition-all duration-300
              backdrop-blur-sm
            `}
          >
            <Icon className={`w-5 h-5 ${button.iconColor || ''}`} />
            <span>{button.name}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default SocialLogin;