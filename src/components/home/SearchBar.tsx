
import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Motion } from '@/components/ui/motion';
import { cn } from '@/lib/utils';
import { applyMicroInteraction } from '@/utils/animations';

interface SearchBarProps {
  onSearch?: (value: string) => void;
  className?: string;
}

const SearchBar = ({ onSearch, className }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  const clearSearch = () => {
    setSearchValue('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <Motion animation="slide-down" className={cn("w-full", className)}>
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
            placeholder="Search for restaurants, dishes..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
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
    </Motion>
  );
};

export default SearchBar;
