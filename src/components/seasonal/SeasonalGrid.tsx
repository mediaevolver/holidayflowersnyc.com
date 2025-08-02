'use client';

import { motion } from 'framer-motion';
import { SeasonalItem } from '@/data/seasonal';
import SeasonalCard from './SeasonalCard';

interface SeasonalGridProps {
  seasonalItems: SeasonalItem[];
  className?: string;
}

export default function SeasonalGrid({ seasonalItems, className = '' }: SeasonalGridProps) {
  return (
    <motion.div 
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {seasonalItems.map((seasonal, index) => (
        <SeasonalCard key={seasonal.id} seasonal={seasonal} index={index} />
      ))}
    </motion.div>
  );
} 