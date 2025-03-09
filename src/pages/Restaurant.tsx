
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Clock, Info, MapPin } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { Motion, MotionGroup } from '@/components/ui/motion';
import FoodItem from '@/components/restaurant/FoodItem';
import CartDrawer from '@/components/cart/CartDrawer';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import LazyImage from '@/components/ui/LazyImage';

// Demo restaurant data
const restaurant = {
  id: '1',
  name: 'Burger House',
  image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=2072',
  cuisine: 'American, Burgers',
  rating: 4.8,
  deliveryTime: '15-25 min',
  address: '123 Main St, Anytown, USA',
  description: 'Serving the juiciest, most flavorful burgers in town since 2010. Our beef is locally sourced and our buns are baked fresh daily.',
};

// Demo food items
const foodItems = [
  {
    id: '1',
    name: 'Classic Cheeseburger',
    description: 'Angus beef patty, American cheese, lettuce, tomato, onion, pickles, and our special sauce on a toasted brioche bun.',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2899',
  },
  {
    id: '2',
    name: 'Bacon Deluxe Burger',
    description: 'Angus beef patty, crispy bacon, cheddar cheese, lettuce, tomato, and mayo on a toasted brioche bun.',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=2768',
  },
  {
    id: '3',
    name: 'Mushroom Swiss Burger',
    description: 'Angus beef patty, sautéed mushrooms, Swiss cheese, caramelized onions, and truffle aioli on a toasted brioche bun.',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=2415',
  },
  {
    id: '4',
    name: 'Double Trouble Burger',
    description: 'Two Angus beef patties, double American cheese, lettuce, tomato, onion, pickles, and our special sauce on a toasted brioche bun.',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?q=80&w=2622',
  },
  {
    id: '5',
    name: 'Veggie Burger',
    description: 'Plant-based patty, lettuce, tomato, onion, pickles, and vegan mayo on a toasted whole grain bun.',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?q=80&w=2490',
  },
];

// Demo categories for the restaurant menu
const menuCategories = [
  { id: 'burgers', name: 'Burgers' },
  { id: 'sides', name: 'Sides' },
  { id: 'drinks', name: 'Drinks' },
  { id: 'desserts', name: 'Desserts' },
];

const Restaurant = () => {
  const { id } = useParams<{ id: string }>();
  const [activeCategory, setActiveCategory] = useState('burgers');
  const { isOpen, closeCart, addItem } = useCart();

  const handleAddToCart = (itemId: string) => {
    const foodItem = foodItems.find(item => item.id === itemId);
    
    if (foodItem) {
      addItem({
        id: foodItem.id,
        name: foodItem.name,
        price: foodItem.price,
        quantity: 1,
        image: foodItem.image,
        restaurantId: id || '1',
        restaurantName: restaurant.name
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar showBackButton title={restaurant.name} />

      <div className="relative">
        <div className="h-64 w-full relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-10" />
          <LazyImage
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="layout-container relative -mt-20 z-20">
          <Motion animation="slide-up" className="bg-background rounded-2xl p-6 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h1 className="text-2xl font-display font-semibold mb-1">{restaurant.name}</h1>
                <p className="text-muted-foreground">{restaurant.cuisine}</p>
              </div>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium">{restaurant.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <MapPin className="w-4 h-4" />
              <span>{restaurant.address}</span>
            </div>

            <p className="text-sm text-muted-foreground">{restaurant.description}</p>
          </Motion>

          <div className="mt-6">
            <Motion animation="slide-up" className="mb-4">
              <div className="flex items-center gap-4 overflow-x-auto py-2">
                {menuCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={cn(
                      "whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium",
                      "transition-all duration-200",
                      activeCategory === category.id
                        ? "bg-primary text-white shadow-md"
                        : "bg-secondary/60 text-foreground hover:bg-secondary"
                    )}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </Motion>

            <div className="space-y-4">
              <MotionGroup animation="slide-up" staggerDelay={100}>
                {foodItems.map((item) => (
                  <FoodItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                    restaurantId={id || '1'}
                    restaurantName={restaurant.name}
                    onAddToCart={() => handleAddToCart(item.id)}
                  />
                ))}
              </MotionGroup>
            </div>
          </div>
        </div>
      </div>

      <CartDrawer isOpen={isOpen} onClose={closeCart} />
    </div>
  );
};

export default Restaurant;
