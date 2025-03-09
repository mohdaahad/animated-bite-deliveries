
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { applyMicroInteraction } from '@/utils/animations';
import { useCart } from '@/contexts/CartContext';
import LazyImage from '@/components/ui/LazyImage';

interface FoodItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  restaurantId: string;
  restaurantName?: string;
  className?: string;
  onAddToCart?: () => void;
}

const FoodItem = ({
  id,
  name,
  description,
  price,
  image,
  restaurantId,
  restaurantName,
  className,
  onAddToCart,
}: FoodItemProps) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id,
      name,
      price,
      quantity: 1,
      image,
      restaurantId,
      restaurantName
    });
    
    if (onAddToCart) {
      onAddToCart();
    }
  };

  return (
    <Link
      to={`/food/${restaurantId}/${id}`}
      className={cn(
        "w-full overflow-hidden flex rounded-xl border border-border/40 hover:shadow-md",
        "bg-background transition-all duration-300 group",
        applyMicroInteraction('hover'),
        className
      )}
    >
      <div className="flex-1 p-4">
        <h3 className="font-medium text-base mb-1 line-clamp-1">{name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="mt-2">
          <span className="font-medium text-sm">${price.toFixed(2)}</span>
        </div>
      </div>
      <div className="w-24 h-24 relative">
        <LazyImage
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <button
          onClick={handleAddToCart}
          className={cn(
            "absolute -bottom-3 -left-3 rounded-full w-8 h-8 flex items-center justify-center",
            "bg-primary text-white shadow-md hover:bg-primary/90 active:scale-95",
            "transition-all duration-200"
          )}
          aria-label="Add to cart"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </Link>
  );
};

export default FoodItem;
