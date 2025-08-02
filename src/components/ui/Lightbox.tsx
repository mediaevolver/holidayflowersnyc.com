'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  image: {
    src: string;
    alt: string;
    title?: string;
    description?: string;
  };
  images?: Array<{
    src: string;
    alt: string;
    title?: string;
    description?: string;
  }>;
  currentIndex?: number;
  onNavigate?: (index: number) => void;
}

export default function Lightbox({ 
  isOpen, 
  onClose, 
  image, 
  images = [], 
  currentIndex = 0, 
  onNavigate 
}: LightboxProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const currentImage = images.length > 0 ? images[currentIndex] : image;
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (hasMultipleImages && onNavigate && currentIndex > 0) {
            onNavigate(currentIndex - 1);
          }
          break;
        case 'ArrowRight':
          if (hasMultipleImages && onNavigate && currentIndex < images.length - 1) {
            onNavigate(currentIndex + 1);
          }
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentIndex, hasMultipleImages, images.length, onNavigate, onClose]);

  useEffect(() => {
    if (isOpen) {
      setImageLoaded(false);
      setIsZoomed(false);
    }
  }, [isOpen, currentIndex]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" as const }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" as const }
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1] as const,
        delay: 0.1
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.9,
      y: 30,
      transition: { 
        duration: 0.2,
        ease: "easeIn" as const
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.3,
        ease: "easeOut" as const,
        delay: 0.2
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.1,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const navButtonVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, delay: 0.4 }
    },
    hover: { 
      scale: 1.1,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      transition: { duration: 0.2 }
    }
  };

  const infoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, delay: 0.5 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop with blur effect */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />
          
          {/* Main modal */}
          <motion.div
            className="relative z-10 max-w-7xl max-h-[90vh] w-full flex flex-col"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header with controls */}
            <motion.div 
              className="flex items-center justify-between mb-4 px-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <div className="flex items-center space-x-3">
                {hasMultipleImages && (
                  <div className="text-white/80 text-sm font-medium bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                    {currentIndex + 1} of {images.length}
                  </div>
                )}
                <motion.button
                  className="text-white/80 hover:text-white p-2 rounded-full bg-white/10 backdrop-blur-sm"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => setIsZoomed(!isZoomed)}
                  title={isZoomed ? "Zoom out" : "Zoom in"}
                >
                  <ZoomIn className="w-5 h-5" />
                </motion.button>
              </div>
              
              <motion.button
                className="text-white/80 hover:text-white p-2 rounded-full bg-white/10 backdrop-blur-sm"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={onClose}
              >
                <X className="w-6 h-6" />
              </motion.button>
            </motion.div>

            {/* Image container */}
            <div className="relative flex-1 flex items-center justify-center px-8 py-12">
              <motion.div
                className={`relative ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                variants={imageVariants}
                initial="hidden"
                animate={imageLoaded ? "visible" : "hidden"}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <motion.div
                  animate={{
                    scale: isZoomed ? 1.5 : 1,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                  className="relative"
                >
                                      <Image
                      src={currentImage.src}
                      alt={currentImage.alt}
                      width={800}
                    height={600}
                    className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-2xl"
                    onLoad={() => setImageLoaded(true)}
                    quality={95}
                    priority
                  />
                  
                  {/* Loading indicator */}
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    </div>
                  )}
                </motion.div>
              </motion.div>

              {/* Navigation arrows */}
              {hasMultipleImages && onNavigate && (
                <>
                  {currentIndex > 0 && (
                    <motion.button
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white/80 hover:text-white"
                      variants={navButtonVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onNavigate(currentIndex - 1)}
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </motion.button>
                  )}
                  
                  {currentIndex < images.length - 1 && (
                    <motion.button
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white/80 hover:text-white"
                      variants={navButtonVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onNavigate(currentIndex + 1)}
                    >
                      <ChevronRight className="w-6 h-6" />
                    </motion.button>
                  )}
                </>
              )}
            </div>

            {/* Image info */}
            {(currentImage.title || currentImage.description) && (
              <motion.div
                className="mt-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg text-white"
                variants={infoVariants}
                initial="hidden"
                animate="visible"
              >
                {currentImage.title && (
                  <h3 className="text-lg font-semibold mb-2">{currentImage.title}</h3>
                )}
                {currentImage.description && (
                  <p className="text-white/80 text-sm">{currentImage.description}</p>
                )}
              </motion.div>
            )}

            {/* Thumbnail navigation for multiple images */}
            {hasMultipleImages && images.length > 1 && (
              <motion.div
                className="flex space-x-2 mt-4 justify-center overflow-x-auto pb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                {images.map((img, index) => (
                  <motion.button
                    key={index}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === currentIndex 
                        ? 'border-white shadow-lg' 
                        : 'border-white/30 hover:border-white/60'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onNavigate && onNavigate(index)}
                  >
                                          <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                      className="object-cover"
                      sizes="64px"
                    />
                    {index === currentIndex && (
                      <div className="absolute inset-0 bg-white/20" />
                    )}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 