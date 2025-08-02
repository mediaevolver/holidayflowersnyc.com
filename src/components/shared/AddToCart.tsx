'use client';

import { useState } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useCart, type Product } from '@/lib/cart-context';

interface AddToCartProps {
  product: Product;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  showQuantitySelector?: boolean;
  defaultQuantity?: number;
  maxQuantity?: number;
}

export default function AddToCart({ 
  product, 
  className = '',
  size = 'default',
  showQuantitySelector = true,
  defaultQuantity = 1,
  maxQuantity = 20
}: AddToCartProps) {
  const [quantity, setQuantity] = useState(defaultQuantity);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem, isInCart, getItemQuantity } = useCart();

  const handleAddToCart = async () => {
    if (!product.inStock) return;
    
    setIsAdding(true);
    addItem(product, quantity);
    
    // Reset quantity after adding and show feedback
    setTimeout(() => {
      setQuantity(defaultQuantity);
      setIsAdding(false);
    }, 500);
  };

  const incrementQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, maxQuantity));
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  const currentCartQuantity = getItemQuantity(product.id);

  // Don't render if product is out of stock
  if (!product.inStock) {
    return (
      <div className={`text-center ${className}`}>
        <Button disabled size={size} className="w-full">
          Out of Stock
        </Button>
      </div>
    );
  }

  return (
    <motion.div 
      className={`space-y-3 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Quantity Selector */}
      {showQuantitySelector && (
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Quantity:</span>
          <div className="flex items-center space-x-2">
            <motion.button
              onClick={decrementQuantity}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
              disabled={quantity <= 1}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              type="button"
            >
              <Minus className="h-4 w-4 text-gray-600" />
            </motion.button>
            <motion.span 
              className="w-8 text-center font-medium"
              key={quantity}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {quantity}
            </motion.span>
            <motion.button
              onClick={incrementQuantity}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
              disabled={quantity >= maxQuantity}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              type="button"
            >
              <Plus className="h-4 w-4 text-gray-600" />
            </motion.button>
          </div>
        </div>
      )}

      {/* Add to Cart Button */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        animate={isAdding ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="w-full"
          size={size}
        >
          <motion.div
            animate={isAdding ? { rotate: 360 } : {}}
            transition={{ duration: 0.5 }}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
          </motion.div>
          {isAdding ? 'Adding...' : 'Add to Cart'}
        </Button>
      </motion.div>

      {/* Already in cart indicator */}
      {currentCartQuantity > 0 && (
        <motion.p 
          className="text-sm text-center text-primary-600 font-medium"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          🛒 {currentCartQuantity} in cart
        </motion.p>
      )}
    </motion.div>
  );
} 