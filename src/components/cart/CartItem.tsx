
import { Plus, Minus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { applyMicroInteraction } from '@/utils/animations';

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
  className?: string;
}

const CartItem = ({
  id,
  name,
  price,
  quantity,
  image,
  onIncrement,
  onDecrement,
  onRemove,
  className,
}: CartItemProps) => {
  const handleIncrement = () => onIncrement(id);
  const handleDecrement = () => onDecrement(id);
  const handleRemove = () => onRemove(id);

  return (
    <div
      className={cn(
        "w-full flex items-center p-3 rounded-lg border border-border/50",
        "bg-background/80 backdrop-blur-sm",
        className
      )}
    >
      <div className="w-16 h-16 rounded-md overflow-hidden mr-3">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-sm line-clamp-1">{name}</h4>
        <p className="text-sm text-primary font-medium mt-1">${price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={quantity === 1 ? handleRemove : handleDecrement}
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center",
            "bg-secondary border border-border/50 text-foreground",
            applyMicroInteraction('click')
          )}
          aria-label={quantity === 1 ? "Remove item" : "Decrease quantity"}
        >
          {quantity === 1 ? (
            <Trash2 className="w-4 h-4 text-red-500" />
          ) : (
            <Minus className="w-4 h-4" />
          )}
        </button>
        <span className="text-sm font-medium w-4 text-center">{quantity}</span>
        <button
          onClick={handleIncrement}
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center",
            "bg-primary text-white",
            applyMicroInteraction('click')
          )}
          aria-label="Increase quantity"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
