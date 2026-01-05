/**
 * Performance Configuration
 * Control animation behavior globally for performance optimization
 */

// Detect if device prefers reduced motion
export const prefersReducedMotion = () => {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Detect if device is low-end (mobile or slow CPU)
export const isLowEndDevice = () => {
  // Check if mobile
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  // Check CPU cores (if available)
  const cpuCores = navigator.hardwareConcurrency || 4;
  const isSlowCPU = cpuCores < 4;

  // Check memory (if available)
  const memory = navigator.deviceMemory || 8;
  const isLowMemory = memory < 4;

  return isMobile || isSlowCPU || isLowMemory;
};

// Animation configuration based on device capabilities
export const getAnimationConfig = () => {
  const shouldReduceMotion = prefersReducedMotion();
  const isLowEnd = isLowEndDevice();

  return {
    // Disable animations completely if user prefers reduced motion
    enabled: !shouldReduceMotion,

    // Use simpler animations on low-end devices
    useSimpleAnimations: isLowEnd || shouldReduceMotion,

    // Animation durations (shorter on low-end devices)
    duration: {
      fast: isLowEnd ? 0.2 : 0.3,
      normal: isLowEnd ? 0.3 : 0.6,
      slow: isLowEnd ? 0.5 : 1.0,
    },

    // Spring configurations (less bouncy on low-end)
    spring: {
      stiffness: isLowEnd ? 200 : 120,
      damping: isLowEnd ? 50 : 40,
      mass: isLowEnd ? 0.5 : 0.8,
    },

    // Scroll animation thresholds
    scroll: {
      threshold: isLowEnd ? 0.3 : 0.15, // Start animations later on low-end
      useParallax: !isLowEnd, // Disable parallax on low-end
    },

    // Particle/effect counts (reduce on low-end)
    effects: {
      maxParticles: isLowEnd ? 4 : 8,
      maxStreams: isLowEnd ? 4 : 8,
      maxOrbs: isLowEnd ? 2 : 4,
    },
  };
};

// Get transition config for Framer Motion (if still using it)
export const getMotionTransition = (type = "normal") => {
  const config = getAnimationConfig();

  if (!config.enabled) {
    return { duration: 0 };
  }

  return {
    duration: config.duration[type] || config.duration.normal,
    ease: config.useSimpleAnimations ? "linear" : "easeOut",
  };
};

// Get spring config for Framer Motion (if still using it)
export const getMotionSpring = () => {
  const config = getAnimationConfig();
  return config.spring;
};

// CSS class helper - returns animation class or empty string
export const getAnimationClass = (animationName) => {
  const config = getAnimationConfig();
  return config.enabled ? animationName : "";
};

// Intersection Observer options for scroll animations
export const getObserverOptions = () => {
  const config = getAnimationConfig();

  return {
    threshold: config.scroll.threshold,
    rootMargin: "0px 0px -10% 0px", // Trigger slightly before element is fully visible
  };
};

export default {
  getAnimationConfig,
  getMotionTransition,
  getMotionSpring,
  getAnimationClass,
  getObserverOptions,
  prefersReducedMotion,
  isLowEndDevice,
};
