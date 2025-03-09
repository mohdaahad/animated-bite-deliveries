
import { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import SearchBar from '@/components/home/SearchBar';
import Categories from '@/components/home/Categories';
import FeaturedRestaurants from '@/components/home/FeaturedRestaurants';
import { Motion } from '@/components/ui/motion';
import CartDrawer from '@/components/cart/CartDrawer';
import { applyMicroInteraction } from '@/utils/animations';
import { cn } from '@/lib/utils';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    // Simulate loading delay for animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (searchValue: string) => {
    console.log('Searching for:', searchValue);
    // Implement search functionality
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    console.log('Selected category:', categoryId);
    // Filter restaurants by category
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <ShoppingBag className="w-10 h-10 text-primary animate-float" />
          </div>
          <h1 className="text-2xl font-display font-semibold mb-1">Bite</h1>
          <p className="text-muted-foreground">Delicious food delivered</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar transparent />

      <main className="pt-24 pb-20 layout-container">
        <Motion animation="fade-in" className="mb-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold mb-2">
              Delicious Food <span className="text-primary">Delivered</span>
            </h1>
            <p className="text-muted-foreground">
              Find the best restaurants near you
            </p>
          </div>
          
          <SearchBar onSearch={handleSearch} className="mb-6" />
          
          <Categories 
            onSelectCategory={handleCategorySelect} 
            className="mb-8" 
          />
        </Motion>

        <Motion animation="slide-up" className="mb-10">
          <FeaturedRestaurants 
            title="Featured Restaurants" 
            subtitle="Handpicked by our team" 
            featured={true} 
          />
        </Motion>

        <Motion animation="slide-up" delay={200}>
          <FeaturedRestaurants 
            title="Popular Near You" 
            subtitle="Based on orders in your area" 
            featured={false} 
          />
        </Motion>
      </main>

      <div className="fixed bottom-4 right-4 md:hidden">
        <button
          onClick={() => setIsCartOpen(true)}
          className={cn(
            "w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg",
            "relative",
            applyMicroInteraction('click')
          )}
          aria-label="Open cart"
        >
          <ShoppingBag className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-black text-white text-xs flex items-center justify-center">
            2
          </span>
        </button>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Index;
