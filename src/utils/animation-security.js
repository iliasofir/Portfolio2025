/**
 * Animation Security Configuration
 *
 * This module defines safe animation limits to prevent:
 * - CPU exhaustion from infinite animations
 * - GPU overload from excessive blur effects
 * - Memory leaks from unmanaged animation loops
 * - DoS-style performance degradation
 */

export const ANIMATION_SECURITY_CONFIG = {
  // Maximum safe particle counts
  MAX_PARTICLES: {
    background: 15, // CodeRain streams
    hero: 8, // Floating particles in hero
    card: 6, // Per certification card
    nodes: 6, // Network nodes
  },

  // Animation duration limits (in seconds)
  MAX_DURATION: {
    standard: 5, // Maximum single animation duration
    background: 30, // Slow background effects only
  },

  // Blur intensity limits (prevent GPU exhaustion)
  MAX_BLUR: {
    backdrop: "backdrop-blur-xl", // Maximum backdrop blur
    standard: "blur-xl", // Maximum standard blur
  },

  // Infinite animation policy
  INFINITE_ANIMATIONS: {
    enabled: false, // Disable all infinite animations by default
    exceptions: [], // Only allow specific cases
  },

  // Performance optimization flags
  PERFORMANCE: {
    reduceMotion:
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    useMemo: true, // Always use memoization
    useCallback: true, // Always use callback optimization
  },
};

/**
 * Validates animation configuration against security policy
 */
export const validateAnimation = (config) => {
  const warnings = [];

  if (
    config.repeat === Infinity &&
    !ANIMATION_SECURITY_CONFIG.INFINITE_ANIMATIONS.enabled
  ) {
    warnings.push(
      "SECURITY: Infinite animation detected - may cause CPU exhaustion"
    );
  }

  if (
    config.duration &&
    config.duration > ANIMATION_SECURITY_CONFIG.MAX_DURATION.standard
  ) {
    warnings.push(
      `SECURITY: Animation duration ${config.duration}s exceeds safe limit of ${ANIMATION_SECURITY_CONFIG.MAX_DURATION.standard}s`
    );
  }

  return warnings;
};

/**
 * Safe animation transition generator
 */
export const createSafeTransition = (duration, options = {}) => {
  return {
    duration: Math.min(
      duration,
      ANIMATION_SECURITY_CONFIG.MAX_DURATION.standard
    ),
    ease: options.ease || "easeInOut",
    // Never use repeat: Infinity in production
    repeat: options.repeat === Infinity ? 0 : options.repeat || 0,
    ...options,
  };
};

/**
 * Check if reduced motion is preferred
 */
export const shouldReduceMotion = () => {
  return ANIMATION_SECURITY_CONFIG.PERFORMANCE.reduceMotion;
};
