
import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

type AnimationVariant = 
  | 'fade-in'
  | 'slide-up'
  | 'slide-down'
  | 'slide-in-right'
  | 'scale-in'
  | 'float'
  | 'pulse';

interface MotionProps {
  children: React.ReactNode;
  animation: AnimationVariant;
  delay?: 0 | 100 | 200 | 300 | 400 | 500;
  duration?: 200 | 300 | 400 | 500 | 750 | 1000;
  className?: string;
  once?: boolean;
}

export const Motion = ({
  children,
  animation,
  delay = 0,
  duration = 400,
  className,
  once = true,
}: MotionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [once]);

  return (
    <div
      ref={ref}
      className={cn(
        isVisible ? `animate-${animation} animate-once` : 'opacity-0',
        delay > 0 && `delay-${delay}`,
        `duration-${duration}`,
        className
      )}
      style={{ 
        animationDuration: `${duration}ms`,
        animationDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

export const MotionGroup = ({
  children,
  animation,
  staggerDelay = 100,
  className,
}: {
  children: React.ReactNode[];
  animation: AnimationVariant;
  staggerDelay?: number;
  className?: string;
}) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <Motion
          animation={animation}
          delay={(index * staggerDelay) as 0 | 100 | 200 | 300 | 400 | 500}
          key={index}
        >
          {child}
        </Motion>
      ))}
    </div>
  );
};
