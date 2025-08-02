'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Leaf, Heart, Truck } from 'lucide-react';
import { plants } from '@/data/plants';
import { orchids } from '@/data/orchids';
import { seasonalItems } from '@/data/seasonal';
import { type Product } from '@/lib/cart-context';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AddToCart from '@/components/shared/AddToCart';

const heroImages = [
  {
    src: '/images/orchid-black.jpg',
    alt: 'Beautiful black orchid flowers'
  },
  {
    src: '/images/orchid-purple.jpg', 
    alt: 'Stunning purple orchid flowers'
  },
  {
    src: '/images/orchid-red.jpg',
    alt: 'Vibrant red orchid flowers'
  }
];

// Convert all product types to the Product interface
const convertToProducts = (): Product[] => {
  const allProducts: Product[] = [];

  // Convert plants
  plants.forEach(plant => {
    allProducts.push({
      id: plant.id,
      name: plant.name,
      slug: plant.slug,
      image: plant.image,
      description: plant.description || '',
      category: plant.category,
      featured: plant.featured,
      inStock: plant.inStock,
      price: plant.price || 45.99,
      type: 'plant'
    });
  });

  // Convert orchids
  orchids.forEach(orchid => {
    allProducts.push({
      id: parseInt(orchid.id.replace(/\D/g, '')) || Math.floor(Math.random() * 10000),
      name: orchid.name,
      slug: orchid.id,
      image: orchid.image,
      description: orchid.description,
      category: 'flowering',
      featured: orchid.featured,
      inStock: true,
      price: 89.99,
      type: 'orchid'
    });
  });

  // Convert seasonal items
  seasonalItems.forEach(seasonal => {
    allProducts.push({
      id: parseInt(seasonal.id.replace(/\D/g, '')) || Math.floor(Math.random() * 10000),
      name: seasonal.name,
      slug: seasonal.id,
      image: seasonal.image,
      description: seasonal.description,
      category: 'flowering',
      featured: seasonal.featured,
      inStock: true,
      price: 79.99,
      type: 'seasonal'
    });
  });



  return allProducts;
};

// Shuffle array function
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);

  // Get random products for display - 8 products in 2 rows of 4
  const randomProducts = useMemo(() => {
    const allProducts = convertToProducts();
    const shuffled = shuffleArray(allProducts);
    return shuffled.slice(0, 8);
  }, []);

  // Preload all carousel images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = heroImages.map((image) => {
        return new Promise((resolve, reject) => {
          const img = new window.Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = image.src;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesPreloaded(true);
      } catch (error) {
        console.error('Failed to preload some images:', error);
        setImagesPreloaded(true); // Continue anyway
      }
    };

    preloadImages();
  }, []);

  useEffect(() => {
    if (!imagesPreloaded) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % heroImages.length
      );
    }, 8000); // Change image every 8 seconds

    return () => clearInterval(interval);
  }, [imagesPreloaded]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] text-white overflow-hidden">
        {/* Background Image Carousel */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover object-center"
                style={{ objectPosition: 'center 60%' }}
                priority={true}
              />
            </div>
          ))}
        </div>
        
        {/* Carousel indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white scale-110' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Switch to image ${index + 1}`}
            />
          ))}
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex items-center min-h-[80vh]">
          <div className="text-center w-full">
            {/* Dark background box behind text */}
            <div className="bg-black/50 backdrop-blur-sm rounded-2xl px-8 py-12 mx-auto max-w-4xl">
              <h1 className="text-3xl md:text-5xl font-light mb-6 drop-shadow-lg font-serif tracking-wide">
                Beautiful Plants and Flowers for every occasion.
              </h1>
              <p className="text-lg md:text-xl mb-8 text-green-100 max-w-3xl mx-auto drop-shadow-md font-light leading-relaxed">
                Discover our carefully curated collection of houseplants, succulents, and seasonal arrangements to bring nature into your home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/plants"
                  className="btn-primary bg-white text-primary-600 hover:bg-gray-100 inline-flex items-center shadow-lg"
                >
                  Shop All Plants
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/contact"
                  className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 shadow-lg"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">Carefully selected healthy plants that thrive in your environment.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Care</h3>
              <p className="text-gray-600">Professional guidance and care tips to keep your plants flourishing.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Local Delivery</h3>
              <p className="text-gray-600">Fast and careful delivery throughout New York City.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products from All Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
                          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover our curated selection from plants, orchids, and seasonal arrangements.
              </p>
          </div>
          
          {/* Product Grid - 2 rows of 4 products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {randomProducts.map((product, index) => (
              <Card key={`${product.type}-${product.id}`} className="overflow-hidden group border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-[500px] flex flex-col">
                {/* Image */}
                <div className="relative h-48 bg-gray-100 overflow-hidden flex-shrink-0">
                  <Image
                    src={`/images/${product.image}`}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  
                                     {/* Type Badge */}
                   <div className="absolute top-3 left-3">
                     <Badge 
                       variant="default" 
                       className={`
                         ${product.type === 'plant' ? 'bg-green-600' : ''}
                         ${product.type === 'orchid' ? 'bg-purple-600' : ''}
                         ${product.type === 'seasonal' ? 'bg-orange-600' : ''}
                         text-white text-xs
                       `}
                     >
                       {product.type ? product.type.charAt(0).toUpperCase() + product.type.slice(1) : 'Product'}
                     </Badge>
                   </div>

                  {/* Featured Badge */}
                  {product.featured && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="bg-white/90 text-gray-800 text-xs">
                        ✨ Featured
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <CardContent className="p-4 flex flex-col flex-grow">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="capitalize">
                      {product.category}
                    </Badge>
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </span>
                  </div>

                  {/* Spacer to push AddToCart to bottom */}
                  <div className="flex-grow"></div>

                                     {/* Add to Cart */}
                   <AddToCart 
                     product={product}
                     className="mt-auto"
                     size="default"
                     showQuantitySelector={true}
                   />
                </CardContent>
              </Card>
            ))}
          </div>
          
                     <div className="text-center">
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
               <Link
                 href="/plants"
                 className="btn-secondary text-center inline-flex items-center justify-center"
               >
                 View Plants
               </Link>
               <Link
                 href="/orchids"
                 className="btn-secondary text-center inline-flex items-center justify-center"
               >
                 View Orchids
               </Link>
               <Link
                 href="/seasonal"
                 className="btn-secondary text-center inline-flex items-center justify-center"
               >
                 View Seasonal
               </Link>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
} 