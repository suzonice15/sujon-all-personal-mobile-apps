import React, { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext({ items: [], count: 0, addItem: () => {}, removeItem: () => {}, updateQty: () => {}, clearCart: () => {} });

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const getId = (item) => item.product_id || item.id;

  const addItem = useCallback((product) => {
    const pid = product.product_id || product.id;
    setItems((prev) => {
      const existing = prev.find((i) => getId(i) === pid);
      if (existing) {
        return prev.map((i) => getId(i) === pid ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((i) => getId(i) !== id));
  }, []);

  const updateQty = useCallback((id, delta) => {
    setItems((prev) => prev.map((i) => getId(i) === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, count, addItem, removeItem, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
