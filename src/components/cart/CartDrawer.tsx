
import { useState, useEffect } from 'react';
import { ShoppingBag, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import CartItem from './CartItem';
import { Motion } from '@/components/ui/motion';
import { applyMicroInteraction } from '@/utils/animations';

// Demo cart items
const initialCartItems = [
  {
    id: '1',
    name: 'Cheeseburger Deluxe',
    price: 12.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2899',
  },
  {
    id: '2',
    name: 'Margherita Pizza',
    price: 14.99,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070',
  },
];

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsAnimatingOut(false);
      onClose();
    }, 300);
  };

  const handleIncrement = (id: string) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id: string) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const handleRemove = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = 2.99;
  const total = subtotal + deliveryFee;

  if (!isOpen && !isAnimatingOut) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={handleClose}>
      <div 
        className={cn(
          "fixed inset-0 bg-foreground/30 backdrop-blur-sm transition-opacity duration-300",
          isAnimatingOut ? "opacity-0" : "opacity-100"
        )} 
        aria-hidden="true" 
      />
      <div 
        className={cn(
          "fixed top-0 right-0 h-full w-full sm:w-[400px] bg-background",
          "shadow-lg flex flex-col transition-transform duration-300 ease-in-out transform",
          isAnimatingOut ? "translate-x-full" : "translate-x-0"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-border flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            <h2 className="text-lg font-medium">Your Cart</h2>
            <div className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-sm">
              {cartItems.length}
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-secondary/80 transition-colors duration-200"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length > 0 ? (
            <MotionCartItems 
              items={cartItems} 
              onIncrement={handleIncrement} 
              onDecrement={handleDecrement} 
              onRemove={handleRemove} 
            />
          ) : (
            <Motion animation="fade-in" className="flex flex-col items-center justify-center h-full">
              <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 text-muted-foreground/50" />
              </div>
              <p className="text-lg font-medium mb-1">Your cart is empty</p>
              <p className="text-muted-foreground text-sm text-center max-w-[250px]">
                Add items to your cart to start your order
              </p>
            </Motion>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-4 border-t border-border">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center font-medium pt-2 border-t border-border">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <button
              className={cn(
                "w-full bg-primary text-white font-medium py-3 px-4 rounded-xl",
                "flex items-center justify-center gap-2",
                applyMicroInteraction('click')
              )}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper component to animate cart items
const MotionCartItems = ({ 
  items, 
  onIncrement, 
  onDecrement, 
  onRemove 
}: { 
  items: typeof initialCartItems,
  onIncrement: (id: string) => void,
  onDecrement: (id: string) => void,
  onRemove: (id: string) => void,
}) => {
  return (
    <>
      {items.map((item, index) => (
        <Motion 
          key={item.id} 
          animation="scale-in" 
          delay={(index * 100) as 0 | 100 | 200 | 300 | 400 | 500}
        >
          <CartItem
            id={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            image={item.image}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onRemove={onRemove}
          />
        </Motion>
      ))}
    </>
  );
};

export default CartDrawer;
