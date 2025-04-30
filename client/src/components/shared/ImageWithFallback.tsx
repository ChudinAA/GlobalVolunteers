import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { ImageOff } from 'lucide-react';

// Default fallback images by category
const categoryFallbacks = {
  medical: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80',
  education: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80',
  sports: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80',
  environment: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80',
  default: 'https://images.unsplash.com/photo-1531379410502-63bfe8cdaf6f?auto=format&fit=crop&q=80'
};

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
  containerClassName?: string;
  width?: number | string;
  height?: number | string;
  loading?: 'lazy' | 'eager';
  style?: React.CSSProperties;
  priority?: boolean;
  category?: string; // Optional category for specific fallback images
}

const ImageWithFallback = ({
  src,
  alt,
  className = '',
  fallbackClassName = '',
  containerClassName = '',
  width,
  height,
  loading = 'lazy',
  style,
  priority = false,
  category = 'default'
}: ImageWithFallbackProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  // Reset the state when the src changes
  useEffect(() => {
    setIsLoading(true);
    setError(false);
    setImageSrc(src);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    // Try using a category-specific fallback if available
    const fallbackSrc = categoryFallbacks[category as keyof typeof categoryFallbacks] || categoryFallbacks.default;
    
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      // Keep loading state true to show skeleton until fallback loads
    } else {
      // If even the fallback fails, show error state
      setIsLoading(false);
      setError(true);
    }
  };

  return (
    <div 
      className={cn(
        'relative overflow-hidden w-full h-full', 
        containerClassName
      )}
      style={{
        aspectRatio: width && height ? `${width} / ${height}` : 'auto',
        ...style
      }}
    >
      {isLoading && (
        <Skeleton className="absolute inset-0 w-full h-full bg-gray-200 animate-pulse" />
      )}
      
      {error ? (
        <div 
          className={cn(
            'flex flex-col items-center justify-center w-full h-full bg-gray-100 text-gray-500',
            fallbackClassName
          )}
          style={{
            minHeight: height || '100%',
            minWidth: width || '100%'
          }}
        >
          <ImageOff className="w-8 h-8 mb-2" />
          <span className="text-xs text-center px-2">{alt}</span>
        </div>
      ) : (
        <img
          src={imageSrc}
          alt={alt}
          className={cn(
            'transition-opacity duration-300 object-cover w-full h-full',
            isLoading ? 'opacity-0' : 'opacity-100',
            className
          )}
          width={width}
          height={height}
          loading={priority ? 'eager' : loading}
          onLoad={handleLoad}
          onError={handleError}
          decoding="async"
        />
      )}
    </div>
  );
};

export default ImageWithFallback;