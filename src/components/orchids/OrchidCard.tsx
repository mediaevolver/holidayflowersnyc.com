'use client';

import { useState } from 'react';
import { Eye } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Orchid } from '@/data/orchids';
import { type Product } from '@/lib/cart-context';
import AddToCart from '@/components/shared/AddToCart';
import Lightbox from '@/components/ui/Lightbox';

interface OrchidCardProps {
  orchid: Orchid;
  index: number;
}

export default function OrchidCard({ orchid, index }: OrchidCardProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Convert orchid to Product for cart compatibility
  const productForCart: Product = {
    id: parseInt(orchid.id.replace(/\D/g, '')) || Math.floor(Math.random() * 10000),
    name: orchid.name,
    slug: orchid.id,
    image: orchid.image,
    description: orchid.description,
    category: 'flowering',
    featured: orchid.featured,
    inStock: true, // Assume orchids are in stock
    price: 89.99 // Default price for orchids
  };

  const lightboxImage = {
    src: `/images/${orchid.image}`,
    alt: orchid.name,
    title: orchid.name,
    description: orchid.description
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 0.5, 
          delay: index * 0.1,
          ease: "easeOut"
        }}
        whileHover={{ y: -5 }}
        className="h-full"
      >
        <Card className="overflow-hidden group border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-[580px] flex flex-col">
          <motion.div 
            className="h-full flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
          >
            {/* Image Section */}
            <div className="relative h-64 bg-gray-100 overflow-hidden flex-shrink-0">
              <div className="relative w-full h-full cursor-pointer" onClick={() => setIsLightboxOpen(true)}>
                <Image
                  src={`/images/${orchid.image}`}
                  alt={orchid.name}
                  fill
                  className="object-cover"
                />
                
                {/* Hover Overlay */}
                <motion.div 
                  className="absolute inset-0 bg-black/30 backdrop-blur-[1px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <motion.div 
                    className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    tabIndex={0}
                  >
                    <Eye className="w-6 h-6 text-white drop-shadow-lg" />
                  </motion.div>
                  
                  <motion.div 
                    className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-sm rounded-lg p-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-white text-sm font-medium text-center drop-shadow">
                      Click to view larger image
                    </p>
                  </motion.div>
                </motion.div>
              </div>

              {/* Featured Badge */}
              {orchid.featured && (
                <motion.div 
                  className="absolute top-3 left-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg"
                  initial={{ opacity: 0, x: -20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
                >
                  ✨ Featured
                </motion.div>
              )}

              {/* Quick View Button */}
              <motion.button
                onClick={() => setIsLightboxOpen(true)}
                className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/30"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0, scale: 0.8 }}
                whileInView={{ 
                  opacity: [0, 1],
                  scale: [0.8, 1],
                  transition: { duration: 0.3, delay: index * 0.1 + 0.5 }
                }}
                tabIndex={0}
              >
                <Eye className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Content Section */}
            <CardContent className="p-6 flex flex-col flex-grow">
              <motion.h3 
                className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
              >
                {orchid.name}
              </motion.h3>
              
              <motion.p 
                className="text-gray-600 text-sm mb-4 line-clamp-3 min-h-[4.5rem]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
              >
                {orchid.description}
              </motion.p>

              <motion.div 
                className="flex items-center justify-between mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
              >
                <div>
                  <Badge variant="secondary" className="capitalize">
                    {orchid.category}
                  </Badge>
                </div>
              </motion.div>

              {/* Spacer */}
              <div className="flex-grow"></div>

              {/* Cart Controls */}
              {/* Add to Cart Component */}
              <AddToCart 
                product={productForCart}
                className="mt-auto"
              />
            </CardContent>
          </motion.div>
        </Card>
      </motion.div>

      {/* Lightbox */}
      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        image={lightboxImage}
      />
    </>
  );
} 