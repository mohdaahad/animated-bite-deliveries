
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
}

const LazyImage = ({ 
  src, 
  alt, 
  className, 
  placeholderClassName,
  ...props 
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');

  useEffect(() => {
    // Reset loading state when src changes
    setIsLoaded(false);
    
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setIsLoaded(true);
      setCurrentSrc(src);
    };
    
    return () => {
      img.onload = null;
    };
  }, [src]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {!isLoaded && (
        <div 
          className={cn(
            "absolute inset-0 bg-muted animate-pulse rounded",
            placeholderClassName
          )} 
        />
      )}
      <img
        src={currentSrc || src}
        alt={alt}
        className={cn(
          className,
          !isLoaded && "opacity-0",
          isLoaded && "opacity-100 transition-opacity duration-300"
        )}
        {...props}
      />
    </div>
  );
};

export default LazyImage;
