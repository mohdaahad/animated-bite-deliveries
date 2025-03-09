
import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Motion } from '@/components/ui/motion';
import { cn } from '@/lib/utils';
import { applyMicroInteraction } from '@/utils/animations';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  onSearch?: (value: string) => void;
  className?: string;
  placeholder?: string;
}

// Mock data for search results
const searchData = [
  { id: '1', type: 'restaurant', name: 'Burger House', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=2072' },
  { id: '2', type: 'restaurant', name: 'Pizza Palace', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070' },
  { id: '3', type: 'restaurant', name: 'Sushi Express', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070' },
  { id: '1', type: 'food', name: 'Classic Cheeseburger', restaurantId: '1', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2899' },
  { id: '2', type: 'food', name: 'Bacon Deluxe Burger', restaurantId: '1', image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=2768' },
  { id: '5', type: 'food', name: 'Veggie Burger', restaurantId: '1', image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?q=80&w=2490' },
];

const SearchBar = ({ onSearch, className, placeholder = "Search for restaurants, dishes..." }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchValue.length > 1) {
      // Filter mock data based on search value
      const filtered = searchData.filter(item => 
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setResults(filtered);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [searchValue]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchValue);
    }
    // Close the results after search submission
    setShowResults(false);
  };

  const clearSearch = () => {
    setSearchValue('');
    setShowResults(false);
    if (onSearch) {
      onSearch('');
    }
  };

  const handleResultClick = (item: any) => {
    if (item.type === 'restaurant') {
      navigate(`/restaurant/${item.id}`);
    } else if (item.type === 'food') {
      navigate(`/food/${item.restaurantId}/${item.id}`);
    }
    setShowResults(false);
    setSearchValue(item.name);
  };

  const handleClickOutside = () => {
    setShowResults(false);
    setIsFocused(false);
  };

  return (
    <Motion animation="slide-down" className={cn("w-full relative", className)}>
      <div 
        className={cn(
          "relative w-full rounded-xl overflow-hidden transition-all duration-300",
          isFocused ? "ring-2 ring-primary/30" : "ring-1 ring-border/50",
          "neo-card p-0 hover:shadow-lg"
        )}
      >
        <form onSubmit={handleSearch} className="flex items-center">
          <div className="pl-4 flex items-center justify-center text-muted-foreground">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder={placeholder}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => handleClickOutside(), 200)}
            className="flex-1 bg-transparent px-2 py-3 text-foreground outline-none placeholder:text-muted-foreground/70"
          />
          {searchValue && (
            <button
              type="button"
              onClick={clearSearch}
              className={cn(
                "p-2 mr-2 rounded-full text-muted-foreground hover:bg-secondary/70",
                applyMicroInteraction('click')
              )}
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background rounded-xl border border-border/50 shadow-lg z-50 max-h-64 overflow-y-auto">
          <div className="p-2 space-y-1">
            {results.map((item, index) => (
              <button
                key={`${item.type}-${item.id}-${index}`}
                className={cn(
                  "w-full text-left p-2 rounded-lg flex items-center gap-3 hover:bg-secondary/50",
                  applyMicroInteraction('hover')
                )}
                onClick={() => handleResultClick(item)}
              >
                <div className="w-10 h-10 rounded-md overflow-hidden bg-muted">
                  <LazyImage src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{item.type}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </Motion>
  );
};

export default SearchBar;
