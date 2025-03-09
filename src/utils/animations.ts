
type TimingFunction = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';

interface TransitionOptions {
  property?: string;
  duration?: number;
  delay?: number;
  timing?: TimingFunction;
}

export const createTransition = (options: TransitionOptions = {}): string => {
  const {
    property = 'all',
    duration = 300,
    delay = 0,
    timing = 'ease-out',
  } = options;

  return `${property} ${duration}ms ${timing} ${delay > 0 ? `${delay}ms` : ''}`;
};

export const transitions = {
  default: createTransition(),
  fast: createTransition({ duration: 150 }),
  slow: createTransition({ duration: 500 }),
  bounce: createTransition({ timing: 'ease-in-out', duration: 400 }),
  springy: 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
};

export const hoverTransform = 'hover:scale-[1.02] active:scale-[0.98]';
export const clickTransform = 'active:scale-95';

export const applyMicroInteraction = (type: 'hover' | 'click' | 'both'): string => {
  switch (type) {
    case 'hover':
      return `transition-transform ${transitions.springy} ${hoverTransform}`;
    case 'click':
      return `transition-transform ${transitions.fast} ${clickTransform}`;
    case 'both':
      return `transition-transform ${transitions.springy} ${hoverTransform} ${clickTransform}`;
    default:
      return '';
  }
};

export const getStaggeredDelay = (index: number, baseDelay: number = 50): number => {
  return index * baseDelay;
};

// Add shimmer animation
export const shimmerAnimation = `
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

// Add skeleton loader classes
export const skeletonClass = "bg-gradient-to-r from-muted/60 via-muted/80 to-muted/60 bg-[length:400%_100%] animate-[shimmer_1.5s_infinite]";

// Add pulse animation for loading states
export const pulseAnimation = "animate-pulse";

// Add responsive sizing classes
export const responsiveContainer = "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
export const responsiveGrid = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4";
export const responsiveText = {
  title: "text-xl sm:text-2xl md:text-3xl font-bold",
  subtitle: "text-sm sm:text-base md:text-lg text-muted-foreground",
  body: "text-sm sm:text-base",
};
