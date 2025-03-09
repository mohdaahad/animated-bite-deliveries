
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Motion, MotionGroup } from '@/components/ui/motion';
import { applyMicroInteraction } from '@/utils/animations';

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const categories: Category[] = [
  { id: 'burgers', name: 'Burgers', icon: '🍔', color: 'bg-amber-100 dark:bg-amber-900/40' },
  { id: 'pizza', name: 'Pizza', icon: '🍕', color: 'bg-red-100 dark:bg-red-900/40' },
  { id: 'sushi', name: 'Sushi', icon: '🍣', color: 'bg-blue-100 dark:bg-blue-900/40' },
  { id: 'salad', name: 'Salad', icon: '🥗', color: 'bg-green-100 dark:bg-green-900/40' },
  { id: 'dessert', name: 'Dessert', icon: '🍰', color: 'bg-pink-100 dark:bg-pink-900/40' },
  { id: 'drinks', name: 'Drinks', icon: '🍹', color: 'bg-purple-100 dark:bg-purple-900/40' },
];

interface CategoriesProps {
  onSelectCategory?: (categoryId: string) => void;
  className?: string;
}

const Categories = ({ onSelectCategory, className }: CategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    const newSelected = selectedCategory === categoryId ? null : categoryId;
    setSelectedCategory(newSelected);
    if (onSelectCategory) {
      onSelectCategory(newSelected || '');
    }
  };

  return (
    <Motion animation="slide-up" className={cn("w-full", className)}>
      <div className="flex items-center gap-2 w-full pb-2 overflow-x-auto scrollbar-hide">
        <MotionGroup animation="fade-in" staggerDelay={50}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-all duration-300",
                "min-w-20 px-2 py-3 rounded-xl",
                applyMicroInteraction('hover'),
                selectedCategory === category.id
                  ? "ring-2 ring-primary/40 shadow-lg scale-105"
                  : "hover:bg-secondary/60",
                category.color
              )}
            >
              <div className="text-2xl mb-1 transform transition-transform duration-500 hover:scale-110 hover:rotate-12">
                {category.icon}
              </div>
              <span className="text-xs font-medium text-foreground/80">
                {category.name}
              </span>
            </button>
          ))}
        </MotionGroup>
      </div>
    </Motion>
  );
};

export default Categories;
