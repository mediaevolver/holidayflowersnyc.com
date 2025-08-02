'use client';

import { motion } from 'framer-motion';
import { Plant } from '@/data/plants';
import PlantCard from './PlantCard';

interface PlantGridProps {
  plants: Plant[];
  className?: string;
}

export default function PlantGrid({ plants, className = '' }: PlantGridProps) {
  if (plants.length === 0) {
    return (
      <motion.div 
        className="text-center py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <p className="text-gray-500 text-lg mb-4">🌱 No plants found</p>
          <p className="text-gray-400 text-sm">Try adjusting your search or browse all categories</p>
        </motion.div>
      </motion.div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <motion.div 
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {plants.map((plant, index) => (
        <motion.div
          key={plant.id}
          variants={itemVariants}
          custom={index}
        >
          <PlantCard plant={plant} />
        </motion.div>
      ))}
    </motion.div>
  );
} 