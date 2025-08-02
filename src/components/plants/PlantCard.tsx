'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Plant } from '@/data/plants';
import { useCart, type Product } from '@/lib/cart-context';
import Lightbox from '@/components/ui/Lightbox';
import AddToCart from '@/components/shared/AddToCart';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PlantCardProps {
  plant: Plant;
}

export default function PlantCard({ plant }: PlantCardProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Convert Plant to Product for cart compatibility
  const productForCart: Product = {
    id: plant.id,
    name: plant.name,
    slug: plant.slug,
    image: plant.image,
    description: plant.description || '',
    category: plant.category,
    featured: plant.featured,
    inStock: plant.inStock,
    price: plant.price,
  };

  const lightboxImage = {
    src: `/images/${plant.image}`,
    alt: plant.name,
    title: plant.name,
    description: plant.description
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" as const }
    }
  };

  return (
    <>
      <Card className="overflow-hidden group border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-[580px] flex flex-col">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="h-full flex flex-col"
        >
        {/* Image */}
        <div className="relative h-64 bg-gray-100 overflow-hidden flex-shrink-0">
          <motion.div
            className="relative w-full h-full cursor-pointer"
            onClick={() => setIsLightboxOpen(true)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={`/images/${plant.image}`}
              alt={plant.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            
            {/* Hover overlay with glass effect */}
            <motion.div 
              className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            />

            {/* Featured badge */}
            {plant.featured && (
              <motion.div 
                className="absolute top-3 left-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg z-10"
                initial={{ opacity: 0, x: -20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                ✨ Featured
              </motion.div>
            )}
          </motion.div>

          <motion.button
            className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/30"
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(true);
            }}
            whileHover={{ 
              scale: 1.1, 
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              rotate: 5
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0, scale: 1 }}
            whileInView={{ opacity: 1 }}
          >
            <Eye className="w-4 h-4" />
          </motion.button>
          
          {!plant.inStock && (
            <motion.div 
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-white font-semibold bg-red-600 px-4 py-2 rounded-lg">
                Out of Stock
              </span>
            </motion.div>
          )}
        </div>

        {/* Content */}
        <CardContent className="p-6 flex flex-col flex-grow">
          <motion.h3 
            className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            {plant.name}
          </motion.h3>
          
          {plant.description && (
            <motion.p 
              className="text-gray-600 text-sm mb-4 line-clamp-3 min-h-[4.5rem]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {plant.description}
            </motion.p>
          )}

          {!plant.description && (
            <div className="mb-4 min-h-[4.5rem]"></div>
          )}

          <motion.div 
            className="flex items-center justify-between mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <motion.div whileHover={{ scale: 1.05 }}>
              <Badge variant="secondary" className="capitalize">
                {plant.category}
              </Badge>
            </motion.div>
            {plant.price && (
              <motion.span 
                className="text-lg font-bold text-gray-900"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                ${plant.price}
              </motion.span>
            )}
          </motion.div>

          {/* Spacer to push content to bottom */}
          <div className="flex-grow"></div>

          {/* Add to Cart Component */}
          <AddToCart 
            product={productForCart}
            className="mt-auto"
          />
        </CardContent>
        </motion.div>
      </Card>

      {/* Lightbox */}
      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        image={lightboxImage}
      />
    </>
  );
} 