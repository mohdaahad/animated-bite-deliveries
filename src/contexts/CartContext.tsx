
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

// Define the cart item type
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  restaurantId: string;
  restaurantName?: string;
  customizations?: Record<string, string | string[]>;
}

// Define the cart context type
interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  getDeliveryFee: () => number;
  getTotal: () => number;
}

// Create the cart context with default values
const CartContext = createContext<CartContextType>({
  items: [],
  isOpen: false,
  openCart: () => {},
  closeCart: () => {},
  toggleCart: () => {},
  addItem: () => {},
  updateQuantity: () => {},
  removeItem: () => {},
  clearCart: () => {},
  getItemCount: () => 0,
  getSubtotal: () => 0,
  getDeliveryFee: () => 0,
  getTotal: () => 0,
});

// Define the props for the cart provider
interface CartProviderProps {
  children: ReactNode;
}

// Create the cart provider
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  // Open the cart
  const openCart = () => setIsOpen(true);

  // Close the cart
  const closeCart = () => setIsOpen(false);

  // Toggle the cart
  const toggleCart = () => setIsOpen(prev => !prev);

  // Add an item to the cart
  const addItem = (item: CartItem) => {
    setItems(prevItems => {
      // Check if the item already exists in the cart
      const existingItemIndex = prevItems.findIndex(i => i.id === item.id);

      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + item.quantity,
        };
        toast.success(`Updated ${item.name} quantity in cart`);
        return updatedItems;
      } else {
        // Item doesn't exist, add it
        toast.success(`Added ${item.name} to cart`);
        return [...prevItems, item];
      }
    });
    openCart();
  };

  // Update the quantity of an item
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Remove an item from the cart
  const removeItem = (id: string) => {
    const itemToRemove = items.find(item => item.id === id);
    setItems(prevItems => prevItems.filter(item => item.id !== id));
    if (itemToRemove) {
      toast.info(`Removed ${itemToRemove.name} from cart`);
    }
  };

  // Clear the cart
  const clearCart = () => {
    setItems([]);
    toast.info('Cart cleared');
  };

  // Get the total number of items in the cart
  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  // Get the subtotal of all items in the cart
  const getSubtotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Get the delivery fee
  const getDeliveryFee = () => {
    const subtotal = getSubtotal();
    // Free delivery for orders over $35
    return subtotal > 35 ? 0 : 2.99;
  };

  // Get the total price including delivery fee
  const getTotal = () => {
    return getSubtotal() + getDeliveryFee();
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        getItemCount,
        getSubtotal,
        getDeliveryFee,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Create a hook to use the cart context
export const useCart = () => useContext(CartContext);
