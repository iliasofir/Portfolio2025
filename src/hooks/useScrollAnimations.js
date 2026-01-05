import { useEffect, useState, useRef } from "react";
import { getObserverOptions } from "../utils/animation-config";

/**
 * Custom hook for detecting when an element enters the viewport
 * Replaces Framer Motion's whileInView for better performance
 */
export const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observerOptions = {
      ...getObserverOptions(),
      ...options,
    };

    const observer = new IntersectionObserver(([entry]) => {
      const inView = entry.isIntersecting;
      setIsInView(inView);

      // Once in view, mark as seen (for animations that should only play once)
      if (inView && !hasBeenInView) {
        setHasBeenInView(true);
      }
    }, observerOptions);

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options.threshold, options.rootMargin, hasBeenInView]);

  return { ref, isInView, hasBeenInView };
};

/**
 * Custom hook for scroll progress tracking
 * Replaces Framer Motion's useScroll for better performance
 */
export const useScrollProgress = (containerRef) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const element = containerRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how much of the element is visible
      const elementTop = rect.top;
      const elementHeight = rect.height;

      // Progress from 0 (top of element at bottom of viewport) to 1 (bottom of element at top of viewport)
      const progress = Math.max(
        0,
        Math.min(
          1,
          (windowHeight - elementTop) / (windowHeight + elementHeight)
        )
      );

      setScrollProgress(progress);
    };

    handleScroll(); // Initial calculation
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [containerRef]);

  return scrollProgress;
};

export default {
  useInView,
  useScrollProgress,
};
