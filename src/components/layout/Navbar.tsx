
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ShoppingBag, Home, Search, User, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Motion } from '@/components/ui/motion';

interface NavbarProps {
  transparent?: boolean;
  showBackButton?: boolean;
  title?: string;
}

const Navbar = ({ transparent = false, showBackButton = false, title }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isHomePage = location.pathname === '/';
  const navbarClass = cn(
    'fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 py-4',
    isScrolled || !transparent ? 'bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm' : 'bg-transparent',
    isMenuOpen && 'bg-background/80 backdrop-blur-md'
  );

  const navIconClass = "w-6 h-6 text-foreground opacity-80 transition-all duration-200 hover:opacity-100";

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <header className={navbarClass}>
      <div className="layout-container flex items-center justify-between h-12">
        <div className="flex items-center gap-3">
          {showBackButton ? (
            <button 
              onClick={() => window.history.back()}
              className="p-2 -ml-2 rounded-full bg-background/80 border border-border/40 hover:bg-secondary transition-all duration-200"
              aria-label="Go back"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="font-display font-bold text-xl">
              {isHomePage ? (
                <Link to="/" className="flex items-center gap-2">
                  <span className="text-primary">Bite</span>
                </Link>
              ) : (
                <span>{title || 'Bite'}</span>
              )}
            </div>
          )}
          
          {title && <h1 className="text-lg font-medium">{title}</h1>}
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="relative group py-2">
            <Home className={navIconClass} />
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transform -translate-x-1/2 transition-all duration-200 group-hover:w-full" />
          </Link>
          <Link to="/search" className="relative group py-2">
            <Search className={navIconClass} />
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transform -translate-x-1/2 transition-all duration-200 group-hover:w-full" />
          </Link>
          <Link to="/cart" className="relative group py-2">
            <ShoppingBag className={navIconClass} />
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transform -translate-x-1/2 transition-all duration-200 group-hover:w-full" />
          </Link>
          <Link to="/profile" className="relative group py-2">
            <User className={navIconClass} />
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transform -translate-x-1/2 transition-all duration-200 group-hover:w-full" />
          </Link>
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-full hover:bg-secondary/80 transition-all duration-200"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-[calc(100%+1px)] left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border/50 shadow-lg">
          <Motion animation="slide-down" className="px-4 py-4 flex flex-col space-y-3">
            <Link 
              to="/" 
              className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-secondary/80 transition-all duration-200"
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
            <Link 
              to="/search" 
              className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-secondary/80 transition-all duration-200"
            >
              <Search className="w-5 h-5" />
              <span>Search</span>
            </Link>
            <Link 
              to="/cart" 
              className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-secondary/80 transition-all duration-200"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Cart</span>
            </Link>
            <Link 
              to="/profile" 
              className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-secondary/80 transition-all duration-200"
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </Link>
          </Motion>
        </div>
      )}
    </header>
  );
};

export default Navbar;
