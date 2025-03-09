
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Minus, ShoppingBag, Check } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { Motion } from '@/components/ui/motion';
import CartDrawer from '@/components/cart/CartDrawer';
import { cn } from '@/lib/utils';
import { applyMicroInteraction } from '@/utils/animations';
import { useCart } from '@/contexts/CartContext';

// Demo food item data
const foodItem = {
  id: '1',
  name: 'Classic Cheeseburger',
  description: 'Angus beef patty, American cheese, lettuce, tomato, onion, pickles, and our special sauce on a toasted brioche bun.',
  price: 12.99,
  image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2899',
  restaurantId: '1',
  restaurantName: 'Burger House',
};

// Demo customization options
const customizationOptions = [
  {
    id: 'patty',
    name: 'Patty Type',
    required: true,
    options: [
      { id: 'beef', name: 'Beef', price: 0 },
      { id: 'chicken', name: 'Chicken', price: 0 },
      { id: 'veggie', name: 'Veggie', price: 0 },
    ],
  },
  {
    id: 'cheese',
    name: 'Cheese',
    required: false,
    options: [
      { id: 'american', name: 'American', price: 0 },
      { id: 'cheddar', name: 'Cheddar', price: 1 },
      { id: 'swiss', name: 'Swiss', price: 1 },
      { id: 'none', name: 'No Cheese', price: 0 },
    ],
  },
  {
    id: 'extras',
    name: 'Extras',
    required: false,
    multiple: true,
    options: [
      { id: 'bacon', name: 'Bacon', price: 2 },
      { id: 'avocado', name: 'Avocado', price: 1.5 },
      { id: 'egg', name: 'Fried Egg', price: 1.5 },
      { id: 'jalapenos', name: 'Jalapeños', price: 0.5 },
    ],
  },
];

const FoodDetail = () => {
  const { id, restaurantId } = useParams<{ id: string; restaurantId: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selections, setSelections] = useState<Record<string, string | string[]>>({
    patty: 'beef',
    cheese: 'american',
    extras: [],
  });
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { isOpen, closeCart, openCart, addItem } = useCart();

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleSelectionChange = (
    categoryId: string,
    optionId: string,
    multiple: boolean = false
  ) => {
    setSelections(prev => {
      if (multiple) {
        const currentSelections = prev[categoryId] as string[] || [];
        if (currentSelections.includes(optionId)) {
          return {
            ...prev,
            [categoryId]: currentSelections.filter(id => id !== optionId),
          };
        } else {
          return {
            ...prev,
            [categoryId]: [...currentSelections, optionId],
          };
        }
      } else {
        return {
          ...prev,
          [categoryId]: optionId,
        };
      }
    });
  };

  const calculateTotalPrice = () => {
    let basePrice = foodItem.price;
    
    // Add price of selected options
    customizationOptions.forEach(category => {
      const selection = selections[category.id];
      
      if (category.multiple && Array.isArray(selection)) {
        selection.forEach(optionId => {
          const option = category.options.find(opt => opt.id === optionId);
          if (option) {
            basePrice += option.price;
          }
        });
      } else if (typeof selection === 'string') {
        const option = category.options.find(opt => opt.id === selection);
        if (option) {
          basePrice += option.price;
        }
      }
    });
    
    return basePrice * quantity;
  };

  const handleAddToCart = () => {
    const totalPrice = calculateTotalPrice();
    
    addItem({
      id: `${id}-${Date.now()}`, // Make unique in case of customizations
      name: foodItem.name,
      price: totalPrice / quantity, // Price per item with customizations
      quantity,
      image: foodItem.image,
      restaurantId: restaurantId || '1',
      restaurantName: foodItem.restaurantName,
      customizations: selections
    });
    
    setIsAddedToCart(true);
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar showBackButton title="Food Details" />

      <div className="pt-16 pb-20">
        <div className="w-full h-72 relative">
          <Motion animation="fade-in">
            <img
              src={foodItem.image}
              alt={foodItem.name}
              className="w-full h-full object-cover"
            />
          </Motion>
        </div>

        <div className="layout-container -mt-12 relative z-10">
          <Motion animation="slide-up" className="bg-background rounded-t-3xl p-6 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-display font-semibold mb-1">{foodItem.name}</h1>
                <p className="text-sm text-muted-foreground">{foodItem.restaurantName}</p>
              </div>
              <div className="text-xl font-semibold text-primary">
                ${foodItem.price.toFixed(2)}
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6">{foodItem.description}</p>

            <div className="space-y-6">
              {customizationOptions.map((category, categoryIndex) => (
                <Motion 
                  key={category.id} 
                  animation="slide-up" 
                  delay={(categoryIndex * 100) as 0 | 100 | 200 | 300 | 400 | 500}
                  className="border-b border-border pb-6 last:border-0"
                >
                  <div className="mb-3">
                    <h3 className="text-lg font-medium">{category.name}</h3>
                    {category.required && (
                      <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5 ml-2">
                        Required
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    {category.options.map(option => {
                      const isSelected = category.multiple 
                        ? (selections[category.id] as string[] || []).includes(option.id)
                        : selections[category.id] === option.id;
                      
                      return (
                        <button
                          key={option.id}
                          onClick={() => handleSelectionChange(category.id, option.id, category.multiple)}
                          className={cn(
                            "w-full flex items-center justify-between p-3 rounded-lg",
                            "transition-all duration-200",
                            isSelected 
                              ? "bg-primary/10 border border-primary/30" 
                              : "bg-secondary/40 border border-border/40 hover:bg-secondary/70"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "w-5 h-5 flex items-center justify-center rounded-full border",
                              isSelected 
                                ? "bg-primary border-primary text-white" 
                                : "border-muted-foreground"
                            )}>
                              {isSelected && <Check className="w-3 h-3" />}
                            </div>
                            <span>{option.name}</span>
                          </div>
                          {option.price > 0 && (
                            <span className="text-sm font-medium">
                              +${option.price.toFixed(2)}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </Motion>
              ))}
            </div>
          </Motion>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-30">
        <div className="layout-container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrement}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                "bg-secondary border border-border/50 text-foreground",
                applyMicroInteraction('click')
              )}
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-lg font-medium w-8 text-center">{quantity}</span>
            <button
              onClick={handleIncrement}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                "bg-secondary border border-border/50 text-foreground",
                applyMicroInteraction('click')
              )}
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <button
            onClick={handleAddToCart}
            className={cn(
              "flex-1 ml-4 py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-medium",
              "transition-all duration-300",
              isAddedToCart 
                ? "bg-green-500 text-white" 
                : "bg-primary text-white",
              applyMicroInteraction('click')
            )}
          >
            {isAddedToCart ? (
              <>
                <Check className="w-5 h-5" />
                <span>Added to Cart</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-5 h-5" />
                <span>Add to Cart - ${calculateTotalPrice().toFixed(2)}</span>
              </>
            )}
          </button>
        </div>
      </div>

      <CartDrawer isOpen={isOpen} onClose={closeCart} />
    </div>
  );
};

export default FoodDetail;
