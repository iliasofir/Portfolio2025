// Performance Optimization Utilities
// Use these utilities to improve portfolio performance
import React from "react";

/**
 * Hook to detect if user prefers reduced motion
 */
export const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
};

/**
 * Hook to detect if element is in viewport
 * Use this to pause animations when off-screen
 */
export const useInViewport = (ref, rootMargin = "0px") => {
  const [isInViewport, setIsInViewport] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting),
      { rootMargin }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, rootMargin]);

  return isInViewport;
};

/**
 * Lazy load images
 */
export const LazyImage = ({ src, alt, className, ...props }) => {
  const [imageSrc, setImageSrc] = React.useState(null);
  const imgRef = React.useRef();

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setImageSrc(src);
          observer.unobserve(entry.target);
        }
      });
    });

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src]);

  return (
    <img
      ref={imgRef}
      src={
        imageSrc ||
        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"%3E%3C/svg%3E'
      }
      alt={alt}
      className={className}
      loading="lazy"
      {...props}
    />
  );
};

/**
 * Performance monitoring
 */
export const logPerformance = () => {
  if (typeof window !== "undefined" && window.performance) {
    const perfData = window.performance.getEntriesByType("navigation")[0];
    console.log("📊 Performance Metrics:");
    console.log(
      `  DOM Content Loaded: ${
        perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart
      }ms`
    );
    console.log(
      `  Page Load Time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`
    );

    const paintEntries = window.performance.getEntriesByType("paint");
    paintEntries.forEach((entry) => {
      console.log(`  ${entry.name}: ${entry.startTime}ms`);
    });
  }
};
