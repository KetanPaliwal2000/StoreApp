import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { getCart, updateCart } from '../firebase';
import { Alert } from 'react-native';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });

  const refreshCart = async (userId) => {
    if (!userId) return;
    const cartData = await getCart(userId);
    setCart(cartData);
  };

const addToCart = async (product, quantity = 1) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert('Login Required', 'Please login to add items to cart');
        return false;
      }
  
      // Check if product already exists in cart
      const existingItemIndex = cart.items.findIndex(item => 
        item.id === product.id
      );
  
      let newItems = [...cart.items];
      
      if (existingItemIndex >= 0) {
        // Item exists - increment quantity
        newItems[existingItemIndex].quantity += quantity;
      } else {
        // New item - add to cart
        newItems.push({
          id: product.id,
          title: product.title,
          price: parseFloat(product.price),
          image: product.image,
          quantity: quantity,
        });
      }
  
      const newTotal = parseFloat(newItems.reduce(
        (sum, item) => sum + (item.price * item.quantity), 0
      )).toFixed(2);
      
      const newCart = { items: newItems, total: newTotal };
      await updateCart(user.uid, newCart);
      setCart(newCart);
      
      return true;
    } catch (error) {
      console.error("Error adding to cart:", error);
      return false;
    }
  };

  const removeFromCart = async (productId) => {
    const user = auth.currentUser;
    if (!user) return;

    const newItems = cart.items.filter(item => item.id !== productId);
    const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const newCart = { items: newItems, total: newTotal };

    await updateCart(user.uid, newCart);
    setCart(newCart);
  };

  const clearCart = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const newCart = { items: [], total: 0 };
    await updateCart(user.uid, newCart);
    setCart(newCart);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) refreshCart(user.uid);
    });
    return unsubscribe;
  }, []);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);