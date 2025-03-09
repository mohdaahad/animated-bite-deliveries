
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
  onLoad?: () => void;
}

const LazyImage = ({ 
  src, 
  alt, 
  className, 
  placeholderClassName,
  onLoad,
  ...props 
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');

  useEffect(() => {
    // Reset loading state when src changes
    setIsLoaded(false);
    setError(false);
    
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setIsLoaded(true);
      setCurrentSrc(src);
      if (onLoad) onLoad();
    };
    
    img.onerror = () => {
      setError(true);
      console.error(`Failed to load image: ${src}`);
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, onLoad]);

  return (
    <div className={cn("relative overflow-hidden w-full h-full", className)}>
      {!isLoaded && (
        <div 
          className={cn(
            "absolute inset-0 bg-muted animate-pulse flex items-center justify-center",
            placeholderClassName
          )} 
        >
          <div className="w-full h-full bg-gradient-to-r from-muted to-muted/80 animate-shimmer" 
               style={{ backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 bg-muted/80 flex items-center justify-center text-muted-foreground text-sm">
          Failed to load image
        </div>
      )}
      
      <img
        src={currentSrc || src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover",
          !isLoaded && "opacity-0",
          isLoaded && "opacity-100 transition-opacity duration-300"
        )}
        {...props}
      />
    </div>
  );
};

export default LazyImage;
