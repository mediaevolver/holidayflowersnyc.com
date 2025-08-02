'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function CheckoutPage() {
  const { items, total, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some products to your cart before proceeding to checkout.</p>
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
        <p className="text-gray-600">Review your order and contact us to complete your purchase</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Items */}
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Order Summary ({itemCount} {itemCount === 1 ? 'item' : 'items'})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item, index) => (
                <div key={item.product.id}>
                  <div className="flex items-center space-x-4">
                    {/* Image */}
                    <div className="relative h-16 w-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={`/images/${item.product.image}`}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 line-clamp-2">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-600 capitalize">
                        {item.product.category}
                        {item.product.type && ` • ${item.product.type}`}
                      </p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                        {item.product.price && (
                          <span className="text-sm font-medium text-gray-900">
                            ${item.product.price.toFixed(2)} each
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Total for this item */}
                    {item.product.price && (
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {index < items.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Order Total & Contact Info */}
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Order Total</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Sales Tax</span>
                  <span>Calculated on order</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span>Calculated on order</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>Estimated Total</span>
                <span>${total.toFixed(2)}+</span>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-primary-50 border-primary-200">
            <CardHeader>
              <CardTitle className="text-primary-700">Complete Your Order</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700">
                To place your order, please contact us using one of the methods below. 
                We'll confirm availability, calculate final pricing with tax and delivery, 
                and arrange your order details.
              </p>

              {/* Phone Contact */}
              <div className="space-y-3">
                <a 
                  href="tel:+12126754300"
                  className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-primary-200 hover:border-primary-300 transition-colors group"
                >
                  <div className="bg-primary-100 p-2 rounded-full group-hover:bg-primary-200 transition-colors">
                    <Phone className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Call Us</p>
                    <p className="text-primary-600 font-medium">(212) 675-4300</p>
                    <p className="text-xs text-gray-500">Mon-Sat 9AM-6PM</p>
                  </div>
                </a>

                {/* Email Contact */}
                <a 
                  href="mailto:holidayfoliage@aol.com?subject=Order Inquiry - Cart Total: $${total.toFixed(2)}"
                  className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-primary-200 hover:border-primary-300 transition-colors group"
                >
                  <div className="bg-primary-100 p-2 rounded-full group-hover:bg-primary-200 transition-colors">
                    <Mail className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email Us</p>
                    <p className="text-primary-600 font-medium">holidayfoliage@aol.com</p>
                    <p className="text-xs text-gray-500">We'll respond within 24 hours</p>
                  </div>
                </a>
              </div>

              <div className="bg-white p-4 rounded-lg border border-primary-200">
                <h4 className="font-semibold text-gray-900 mb-2">📍 Visit Our Store</h4>
                <p className="text-sm text-gray-700">
                  118 W 28th St<br />
                  New York, NY 10001
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Continue Shopping */}
          <Link
            href="/plants"
            className="w-full btn-secondary text-center inline-block"
          >
            <ArrowLeft className="mr-2 h-4 w-4 inline" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
} 