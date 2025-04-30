import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

interface CarouselProps {
  items: ReactNode[];
  leftArrow?: ReactNode;
  rightArrow?: ReactNode;
}

const Carousel = ({ items, leftArrow, rightArrow }: CarouselProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  
  const carouselRef = useRef<HTMLDivElement>(null);

  // Update arrow visibility based on scroll position
  const updateArrowVisibility = () => {
    if (!carouselRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
    setScrollPosition(scrollLeft);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', updateArrowVisibility);
      // Initial check
      updateArrowVisibility();
    }
    
    return () => {
      if (carousel) {
        carousel.removeEventListener('scroll', updateArrowVisibility);
      }
    };
  }, []);

  // Handle scroll
  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    
    const { clientWidth } = carouselRef.current;
    const scrollAmount = direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
    
    carouselRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative">
      <div 
        ref={carouselRef}
        className="flex overflow-x-auto pb-8 space-x-6 scrollbar-hide justify-center sm:justify-start"
      >
        {items}
      </div>
      
      {/* Carousel Controls */}
      {showLeftArrow && (
        <Button
          variant="secondary"
          size="icon"
          className="carousel-arrow carousel-arrow-left"
          onClick={() => scroll('left')}
        >
          {leftArrow || (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          )}
        </Button>
      )}
      
      {showRightArrow && (
        <Button
          variant="secondary"
          size="icon"
          className="carousel-arrow carousel-arrow-right"
          onClick={() => scroll('right')}
        >
          {rightArrow || (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          )}
        </Button>
      )}
    </div>
  );
};

export default Carousel;
