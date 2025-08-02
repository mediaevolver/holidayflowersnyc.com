'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, total, itemCount } = useCart();
  const [isClearing, setIsClearing] = useState(false);

  const handleClearCart = () => {
    setIsClearing(true);
    clearCart();
    setTimeout(() => setIsClearing(false), 500);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Start shopping to add plants to your cart.</p>
          <Link
            href="/plants"
            className="btn-primary inline-flex items-center"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Shopping Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
        </h1>
        <button
          onClick={handleClearCart}
          disabled={isClearing}
          className="text-red-600 hover:text-red-700 text-sm font-medium disabled:opacity-50"
        >
          {isClearing ? 'Clearing...' : 'Clear Cart'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="card p-6">
              <div className="flex items-center space-x-4">
                {/* Image */}
                <div className="relative h-20 w-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={`/images/${item.product.image}`}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 line-clamp-2">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-primary-600 capitalize mt-1">
                    {item.product.category}
                  </p>
                  {item.product.type && (
                    <p className="text-xs text-gray-500 capitalize mt-1">
                      {item.product.type}
                    </p>
                  )}
                  {item.product.price && (
                    <p className="text-lg font-bold text-gray-900 mt-1">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  )}
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-4 w-4 text-gray-600" />
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    disabled={item.quantity >= 20}
                  >
                    <Plus className="h-4 w-4 text-gray-600" />
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                  title="Remove from cart"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({itemCount} items)</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-semibold text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                href="/checkout"
                className="w-full btn-primary text-center inline-block"
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/plants"
                className="w-full btn-secondary text-center inline-block"
              >
                Continue Shopping
              </Link>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Questions? <Link href="/contact" className="text-primary-600 hover:text-primary-700">Contact us</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 