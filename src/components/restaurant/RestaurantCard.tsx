
import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { applyMicroInteraction } from '@/utils/animations';

interface RestaurantCardProps {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  className?: string;
}

const RestaurantCard = ({
  id,
  name,
  image,
  cuisine,
  rating,
  deliveryTime,
  className,
}: RestaurantCardProps) => {
  return (
    <Link
      to={`/restaurant/${id}`}
      className={cn(
        "w-full overflow-hidden rounded-2xl neo-card hover:shadow-lg",
        "transition-all duration-300 group",
        applyMicroInteraction('hover'),
        className
      )}
    >
      <div className="relative w-full h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30 z-10" />
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center z-20">
          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
          <span className="text-xs font-medium">{rating}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground">{cuisine}</p>
        <div className="flex items-center mt-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4 mr-1" />
          <span>{deliveryTime}</span>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
