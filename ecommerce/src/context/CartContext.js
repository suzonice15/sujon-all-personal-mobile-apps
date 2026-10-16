import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { getCart, addToCart, incrementCartItem, decrementCartItem, removeCartItem } from '../api/cartApi';
import { api_image } from '../config/url';

const CartContext = createContext({
  items: [], count: 0, loading: true,
  addItem: () => {}, removeItem: () => {}, updateQty: () => {}, clearCart: () => {}, refresh: () => {},
});

const toFullUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = api_image.endsWith('/') ? api_image.slice(0, -1) : api_image;
  const rel = path.startsWith('/') ? path.slice(1) : path;
  return base + '/products/' + rel;
};

const normalize = (carts) =>
  (Array.isArray(carts) ? carts : []).map((c) => ({
    cart_id: c.cart_id,
    product_id: c.product_id,
    id: c.product_id,
    name: c.product_name,
    image: toFullUrl(c.product_image),
    price: Number(c.price) || 0,
    qty: Number(c.qty) || 1,
  }));

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await getCart();
      setItems(normalize(res?.carts));
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addItem = useCallback(async (product, qty = 1) => {
    const pid = product.product_id || product.id;
    await addToCart(pid, qty);
    await refresh();
  }, [refresh]);

  const removeItem = useCallback(async (cartId) => {
    await removeCartItem(cartId);
    await refresh();
  }, [refresh]);

  const updateQty = useCallback(async (cartId, delta) => {
    if (delta > 0) await incrementCartItem(cartId);
    else await decrementCartItem(cartId);
    await refresh();
  }, [refresh]);

  const clearCart = useCallback(async () => {
    try {
      await Promise.all(items.map((i) => removeCartItem(i.cart_id)));
    } catch {
      // server may have already cleared the cart (e.g. after checkout)
    }
    await refresh();
  }, [items, refresh]);

  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, count, loading, addItem, removeItem, updateQty, clearCart, refresh }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
