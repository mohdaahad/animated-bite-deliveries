
import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Motion, MotionGroup } from '@/components/ui/motion';
import { applyMicroInteraction } from '@/utils/animations';

interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  featured?: boolean;
}

const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Burger House',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=2072',
    cuisine: 'American, Burgers',
    rating: 4.8,
    deliveryTime: '15-25 min',
    featured: true,
  },
  {
    id: '2',
    name: 'Pizza Palace',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070',
    cuisine: 'Italian, Pizza',
    rating: 4.6,
    deliveryTime: '20-30 min',
    featured: true,
  },
  {
    id: '3',
    name: 'Sushi Express',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070',
    cuisine: 'Japanese, Sushi',
    rating: 4.9,
    deliveryTime: '25-35 min',
  },
  {
    id: '4',
    name: 'Green Basket',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=2084',
    cuisine: 'Healthy, Salads',
    rating: 4.5,
    deliveryTime: '15-25 min',
  },
];

interface FeaturedRestaurantsProps {
  className?: string;
  title?: string;
  subtitle?: string;
  featured?: boolean;
}

const FeaturedRestaurants = ({
  className,
  title = "Featured Restaurants",
  subtitle = "Discover the best food in your area",
  featured = true,
}: FeaturedRestaurantsProps) => {
  const filteredRestaurants = featured
    ? restaurants.filter(restaurant => restaurant.featured)
    : restaurants;

  return (
    <div className={cn("w-full", className)}>
      <Motion animation="slide-up" className="mb-4">
        <h2 className="text-xl font-display font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </Motion>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
        <MotionGroup animation="scale-in" staggerDelay={100}>
          {filteredRestaurants.map((restaurant) => (
            <Link
              key={restaurant.id}
              to={`/restaurant/${restaurant.id}`}
              className={cn(
                "w-full overflow-hidden rounded-2xl neo-card hover:shadow-lg",
                "transition-all duration-300 group",
                applyMicroInteraction('hover')
              )}
            >
              <div className="relative w-full h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30 z-10" />
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center z-20">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="text-xs font-medium">{restaurant.rating}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg mb-1">{restaurant.name}</h3>
                <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
                <div className="flex items-center mt-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </MotionGroup>
      </div>
    </div>
  );
};

export default FeaturedRestaurants;
