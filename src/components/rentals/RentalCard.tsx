'use client';

import { useState } from 'react';
import Image from 'next/image';
import { DollarSign, Calendar, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Rental } from '@/data/rentals';
import { type Product } from '@/lib/cart-context';
import AddToCart from '@/components/shared/AddToCart';
import Lightbox from '@/components/ui/Lightbox';

interface RentalCardProps {
  rental: Rental;
}

export default function RentalCard({ rental }: RentalCardProps) {
  const [selectedDuration, setSelectedDuration] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const getCurrentRate = () => {
    switch (selectedDuration) {
      case 'daily':
        return rental.dailyRate;
      case 'weekly':
        return rental.weeklyRate;
      case 'monthly':
        return rental.monthlyRate;
      default:
        return rental.dailyRate;
    }
  };

  const handleRequestQuote = () => {
    // Redirect to contact page with rental info
    const message = `I'm interested in renting: ${rental.name} (${selectedDuration} rate: $${getCurrentRate()})`;
    window.location.href = `/contact?message=${encodeURIComponent(message)}`;
  };

  // Convert Rental to Product for cart compatibility
  const productForCart: Product = {
    id: parseInt(rental.id.replace(/\D/g, '')) || Math.floor(Math.random() * 10000),
    name: `${rental.name} (${selectedDuration} rental)`,
    slug: rental.id,
    image: rental.image,
    description: `${rental.description} - ${selectedDuration} rental rate`,
    category: rental.category,
    featured: rental.featured,
    inStock: true, // Assume rentals are available
    price: getCurrentRate(),
    type: rental.type,
  };

  return (
    <>
      <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="h-full"
        >
        <div className="relative h-64 overflow-hidden">
          <Image
            src={rental.image}
            alt={rental.name}
            fill
            className="object-cover transition-all duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-4 left-4 flex gap-2">
            {rental.featured && (
              <Badge variant="default" className="bg-primary-600 text-white">
                Featured
              </Badge>
            )}
            <Badge variant="secondary" className="bg-white/90 text-gray-800">
              {rental.type === 'indoor' ? '🏠' : rental.type === 'outdoor' ? '🌿' : '🌲'} {rental.type}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-300"
            onClick={() => setIsLightboxOpen(true)}
          >
            <Info className="h-4 w-4" />
          </Button>
        </div>

        <CardContent className="p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
              {rental.name}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-3">
              {rental.description}
            </p>
          </div>

          <div className="space-y-3">
            {/* Duration Selection */}
            <div className="flex gap-1">
              {(['daily', 'weekly', 'monthly'] as const).map((duration) => (
                <Button
                  key={duration}
                  variant={selectedDuration === duration ? "default" : "outline"}
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => setSelectedDuration(duration)}
                >
                  {duration.charAt(0).toUpperCase() + duration.slice(1)}
                </Button>
              ))}
            </div>

            {/* Price Display */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-primary-600" />
                <span className="text-lg font-bold text-primary-600">
                  ${getCurrentRate()}
                </span>
                <span className="text-sm text-gray-500">
                  /{selectedDuration === 'daily' ? 'day' : selectedDuration === 'weekly' ? 'week' : 'month'}
                </span>
              </div>
            </div>

            {/* Add to Cart Section */}
            <AddToCart 
              product={productForCart}
              className="mb-3"
            />

            {/* Request Quote Button */}
            <Button 
              onClick={handleRequestQuote}
              variant="outline"
              className="w-full border-primary-600 text-primary-600 hover:bg-primary-50"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Request Custom Quote
            </Button>
          </div>
        </CardContent>
        </motion.div>
      </Card>

      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        image={{
          src: rental.image,
          alt: rental.name,
          title: rental.name,
          description: rental.description
        }}
      />
    </>
  );
} 