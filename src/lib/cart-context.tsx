'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// Generic product interface that can handle any product type
export interface Product {
  id: number;
  name: string;
  slug?: string;
  image: string;
  description: string;
  category: string;
  featured?: boolean;
  inStock?: boolean;
  price?: number;
  type?: string; // For rentals, orchids, etc.
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

function calculateCartTotals(items: CartItem[]): { total: number; itemCount: number } {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + ((item.product.price || 0) * item.quantity), 0);
  return { total, itemCount };
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === action.payload.product.id
      );

      let newItems: CartItem[];
      if (existingItemIndex >= 0) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
            : item
        );
      } else {
        newItems = [
          ...state.items,
          { product: action.payload.product, quantity: action.payload.quantity || 1 }
        ];
      }

      const { total, itemCount } = calculateCartTotals(newItems);
      return { items: newItems, total, itemCount };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.product.id !== action.payload.productId);
      const { total, itemCount } = calculateCartTotals(newItems);
      return { items: newItems, total, itemCount };
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.product.id === action.payload.productId
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0);

      const { total, itemCount } = calculateCartTotals(newItems);
      return { items: newItems, total, itemCount };
    }

    case 'CLEAR_CART':
      return { items: [], total: 0, itemCount: 0 };

    case 'LOAD_CART': {
      const { total, itemCount } = calculateCartTotals(action.payload);
      return { items: action.payload, total, itemCount };
    }

    default:
      return state;
  }
}

interface CartContextType extends CartState {
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: number) => boolean;
  getItemQuantity: (productId: number) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('holiday-flowers-cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartItems });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('holiday-flowers-cart', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (product: Product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
  };

  const removeItem = (productId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const isInCart = (productId: number) => {
    return state.items.some(item => item.product.id === productId);
  };

  const getItemQuantity = (productId: number) => {
    const item = state.items.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  const value: CartContextType = {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

// Legacy support for Plant interface
export interface Plant {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
  category: 'succulents' | 'ficus' | 'tropical' | 'topiary' | 'flowering';
  featured: boolean;
  inStock: boolean;
  price?: number;
}

// Backward compatibility function
export function addPlantToCart(addItem: (product: Product, quantity?: number) => void) {
  return (plant: Plant, quantity = 1) => {
    const product: Product = {
      id: plant.id,
      name: plant.name,
      slug: plant.slug,
      image: plant.image,
      description: plant.description,
      category: plant.category,
      featured: plant.featured,
      inStock: plant.inStock,
      price: plant.price,
    };
    addItem(product, quantity);
  };
} 