
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
