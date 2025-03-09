
import { useEffect } from 'react';
import { ShoppingCart, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Motion } from '@/components/ui/motion';
import { cn } from '@/lib/utils';
import { applyMicroInteraction } from '@/utils/animations';
import { useCart } from '@/contexts/CartContext';
import CartItem from '@/components/cart/CartItem';
import LazyImage from '@/components/ui/LazyImage';

const Cart = () => {
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    clearCart, 
    getSubtotal, 
    getDeliveryFee, 
    getTotal 
  } = useCart();
  const navigate = useNavigate();

  const handleIncrement = (id: string) => {
    const item = items.find(item => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  const handleDecrement = (id: string) => {
    const item = items.find(item => item.id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    } else {
      removeItem(id);
    }
  };

  const handleCheckout = () => {
    // In a real app, navigate to checkout page
    alert('Proceeding to checkout! This would navigate to payment page in a real app.');
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="layout-container flex items-center justify-between py-4">
          <button
            onClick={() => navigate(-1)}
            className={cn(
              "p-2 rounded-full hover:bg-secondary/70",
              applyMicroInteraction('click')
            )}
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-medium">Your Cart</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="layout-container pt-20">
        {items.length === 0 ? (
          <Motion animation="fade-in" className="flex flex-col items-center justify-center py-20 text-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Add some delicious items to your cart</p>
            <Link
              to="/"
              className={cn(
                "px-4 py-2 rounded-lg bg-primary text-white font-medium",
                applyMicroInteraction('click')
              )}
            >
              Browse Restaurants
            </Link>
          </Motion>
        ) : (
          <div className="space-y-6">
            <Motion animation="slide-up" className="rounded-xl bg-background/50 backdrop-blur-sm p-4 border border-border/40">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-medium">Your Items</h2>
                <button
                  onClick={clearCart}
                  className="text-sm text-red-500 hover:text-red-600"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-3">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    image={item.image}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                    onRemove={removeItem}
                  />
                ))}
              </div>
            </Motion>

            <Motion animation="slide-up" delay={100} className="rounded-xl bg-background/50 backdrop-blur-sm p-4 border border-border/40">
              <h3 className="text-lg font-medium mb-4">Order Summary</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${getSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>${getDeliveryFee().toFixed(2)}</span>
                </div>
                <div className="border-t border-border pt-2 mt-2 flex justify-between font-medium">
                  <span>Total</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className={cn(
                  "w-full py-3 rounded-xl bg-primary text-white font-medium",
                  "flex items-center justify-center gap-2",
                  applyMicroInteraction('click')
                )}
              >
                <ShoppingCart className="w-5 h-5" />
                Proceed to Checkout
              </button>
            </Motion>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
