'use client';

import { motion } from 'framer-motion';
import { Orchid } from '@/data/orchids';
import OrchidCard from './OrchidCard';

interface OrchidGridProps {
  orchids: Orchid[];
  className?: string;
}

export default function OrchidGrid({ orchids, className = '' }: OrchidGridProps) {
  return (
    <motion.div 
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {orchids.map((orchid, index) => (
        <OrchidCard key={orchid.id} orchid={orchid} index={index} />
      ))}
    </motion.div>
  );
} 