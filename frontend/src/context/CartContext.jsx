import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('cart');
      if (!saved) return [];
      
      const parsed = JSON.parse(saved);
      // Migration: Filter out items with legacy IDs like "p1"
      // Valid MongoDB ObjectIds are 24-char hex strings
      const isValidId = (id) => /^[0-9a-fA-F]{24}$/.test(id);
      
      const migrated = parsed.filter(item => {
        const id = item.id || item._id;
        if (!isValidId(id)) {
          console.warn(`Removing legacy product with invalid ID: ${id}`);
          return false;
        }
        return true;
      });

      return migrated;
    } catch {
      return [];
    }
  });

  // Sync with localStorage on every change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        if (product.stock && existing.quantity >= product.stock) {
          alert(`Only ${product.stock} units available in stock.`);
          return prev;
        }
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, deliveryTime: '15 min' }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, change) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + change);
        if (change > 0 && item.stock && newQty > item.stock) {
          alert(`Only ${item.stock} units available in stock.`);
          return item;
        }
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      setCartItems,
      cartCount,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
