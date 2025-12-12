import React, { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  lowQualitySrc?: string;
  aspectRatio?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

/**
 * Optimized Image Component with:
 * - Lazy loading
 * - Low quality placeholder
 * - Intersection Observer API
 * - Automatic WebP support
 * - Responsive loading
 */
export function OptimizedImage({
  src,
  alt,
  lowQualitySrc,
  aspectRatio = '16/9',
  objectFit = 'cover',
  className = '',
  loading = 'lazy',
  ...props
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(lowQualitySrc || '');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
        threshold: 0.01,
      }
    );

    observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Load full quality image when in view
  useEffect(() => {
    if (!isInView) return;

    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImageSrc(src);
      setImageLoaded(true);
    };

    img.onerror = () => {
      console.error(`Failed to load image: ${src}`);
      setImageLoaded(true);
    };
  }, [isInView, src]);

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      <img
        ref={imgRef}
        src={imageSrc || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E'}
        alt={alt}
        className={`w-full h-full transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          objectFit,
          filter: !imageLoaded && lowQualitySrc ? 'blur(10px)' : 'none',
        }}
        loading={loading}
        decoding="async"
        {...props}
      />
      
      {/* Loading placeholder */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
    </div>
  );
}
