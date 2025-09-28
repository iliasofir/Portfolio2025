import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FanHUD = ({
  isOpen,
  onToggle,
  position = { top: 20, right: 20 },
  animationType = "hover",
  children,
  className = "",
}) => {
  const [internalOpen, setInternalOpen] = useState(false);

  // Use controlled state if provided, otherwise use internal state
  const isActive = isOpen !== undefined ? isOpen : internalOpen;
  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalOpen(!internalOpen);
    }
  };

  // Convert children to array for easier manipulation
  const childArray = React.Children.toArray(children);

  // Calculate vertical formation positions for each item
  const fanPositions = useMemo(() => {
    const itemCount = childArray.length;
    const spacing = 80; // Distance between each item vertically
    const startOffset = -((itemCount - 1) * spacing) / 2; // Center the items vertically

    return childArray.map((_, index) => {
      return {
        x: -120, // Position items to the left of the button
        y: startOffset + index * spacing, // Vertical positioning
        index: index,
      };
    });
  }, [childArray.length]);

  // Animation variants
  const containerVariants = {
    closed: {
      scale: 0.8,
      opacity: 0,
    },
    open: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: {
      x: 0,
      y: 0,
      scale: 0,
      opacity: 0,
      rotate: 45,
    },
    open: (custom) => ({
      x: custom.x,
      y: custom.y,
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    }),
  };

  const centerButtonVariants = {
    closed: {
      rotate: 0,
      scale: 1,
    },
    open: {
      rotate: 180,
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  // Event handlers based on animation type
  const eventHandlers =
    animationType === "hover"
      ? {
          onMouseEnter: () => handleToggle(),
          onMouseLeave: () => handleToggle(),
        }
      : {
          onClick: handleToggle,
        };

  return (
    <div
      className={`fixed z-50 ${className}`}
      style={{
        top: `${position.top}px`,
        right: 0, // Fixed at the very right edge
      }}
      {...eventHandlers}
    >
      <div className="relative">
        {/* Elite Command Panel Trigger */}
        <motion.div
          variants={centerButtonVariants}
          animate={isActive ? "open" : "closed"}
          className="relative w-30 h-48 cursor-pointer group"
        >
          {/* Quantum energy ripple */}
          <motion.div
            animate={{
              scaleY: isActive ? 1.4 : 1.08,
              scaleX: isActive ? 2.5 : 1.5,
              opacity: isActive ? 0.9 : 0.3,
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="absolute -inset-8 rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(ellipse 40% 100% at center, rgba(147, 51, 234, 0.3), rgba(59, 130, 246, 0.25), rgba(16, 185, 129, 0.15))",
            }}
          />

          {/* Holographic aura */}
          <motion.div
            animate={{
              rotateY: isActive ? 360 : 0,
              scaleY: isActive ? 0.8 : 1,
              opacity: isActive ? 1 : 0.5,
            }}
            transition={{
              duration: 3,
              repeat: isActive ? Infinity : 0,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="absolute -inset-3 rounded-3xl bg-gradient-to-b from-purple-500/20 via-blue-500/10 to-emerald-500/20 blur-lg"
          />

          {/* Neural edge detection */}
          <motion.div
            animate={{
              scaleY: 1.1,
              opacity: 0.8,
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-2xl"
            style={{
              background:
                "linear-gradient(180deg, rgba(124, 58, 237, 0.1), rgba(37, 99, 235, 0.05), rgba(5, 150, 105, 0.1))",
              boxShadow:
                "0 0 40px rgba(147, 51, 234, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.1)",
            }}
          />

          {/* Ultra-modern command interface */}
          <div
            className="relative w-full h-full backdrop-blur-3xl border border-white/10 group-hover:border-purple-400/40 transition-all duration-700 flex flex-col items-center justify-center overflow-hidden"
            style={{
              background: `
                linear-gradient(180deg, 
                  rgba(15, 23, 42, 0.9), 
                  rgba(30, 41, 59, 0.85), 
                  rgba(15, 23, 42, 0.9)
                )
              `,
              borderRadius: "24px 4px 24px 4px",
              boxShadow: `
                0 8px 32px rgba(0, 0, 0, 0.4),
                0 1px 4px rgba(147, 51, 234, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.1),
                inset 0 -1px 0 rgba(0, 0, 0, 0.2)
              `,
            }}
          >
            {/* Neural synaptic patterns */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Vertical data streams */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`stream-${i}`}
                  animate={{
                    scaleY: 1,
                    opacity: 0.8,
                    y: 0,
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute w-px bg-gradient-to-b from-transparent via-cyan-400/60 to-transparent"
                  style={{
                    left: `${20 + i * 15}%`,
                    height: "80%",
                    top: "10%",
                  }}
                />
              ))}

              {/* Quantum interference nodes */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`node-${i}`}
                  animate={{
                    scale: 1.2,
                    opacity: 0.9,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.3,
                  }}
                  className="absolute w-1 h-1 bg-purple-400 rounded-full"
                  style={{
                    left: "50%",
                    top: `${15 + i * 12}%`,
                    transform: "translateX(-50%)",
                  }}
                />
              ))}
            </div>

            {/* Command interface icon */}
            <motion.div
              animate={{
                rotateY: isActive ? 360 : 0,
                scale: isActive ? 1.1 : 1,
              }}
              transition={{
                rotateY: {
                  duration: 2,
                  ease: "easeInOut",
                  repeat: isActive ? Infinity : 0,
                  repeatType: "loop",
                },
                scale: {
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                },
              }}
              className="relative z-10 flex items-center justify-center"
            >
              {/* Neural Network Command Interface */}
              <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
                {isActive ? (
                  // Neural collapse pattern when active
                  <g>
                    <motion.g
                      animate={{ rotate: 180, opacity: 0.3 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }}
                    >
                      <path
                        d="M8 8L24 24M24 8L8 24"
                        stroke="url(#closeGradient)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="16"
                        cy="16"
                        r="2"
                        fill="currentColor"
                        className="text-cyan-400"
                        opacity="0.8"
                      />
                    </motion.g>
                    <defs>
                      <linearGradient
                        id="closeGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#f43f5e" />
                        <stop offset="50%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </g>
                ) : (
                  // Neural network pattern when inactive
                  <g>
                    <motion.g
                      animate={{
                        opacity: 1,
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }}
                    >
                      {/* Central processing node */}
                      <circle
                        cx="16"
                        cy="16"
                        r="2.5"
                        fill="url(#centralGradient)"
                        stroke="currentColor"
                        strokeWidth="0.5"
                      />

                      {/* Neural connections */}
                      <path
                        d="M16 6 L16 13.5 M16 18.5 L16 26"
                        stroke="url(#neuralGradient)"
                        strokeWidth="1"
                        strokeLinecap="round"
                        opacity="0.8"
                      />

                      {/* Data flow indicators */}
                      <circle
                        cx="16"
                        cy="8"
                        r="1.5"
                        fill="currentColor"
                        className="text-purple-400"
                        opacity="0.6"
                      />
                      <circle
                        cx="16"
                        cy="24"
                        r="1.5"
                        fill="currentColor"
                        className="text-cyan-400"
                        opacity="0.6"
                      />

                      {/* Side neural nodes */}
                      <circle
                        cx="10"
                        cy="12"
                        r="1"
                        fill="currentColor"
                        className="text-violet-300"
                        opacity="0.5"
                      />
                      <circle
                        cx="22"
                        cy="12"
                        r="1"
                        fill="currentColor"
                        className="text-blue-300"
                        opacity="0.5"
                      />
                      <circle
                        cx="10"
                        cy="20"
                        r="1"
                        fill="currentColor"
                        className="text-emerald-300"
                        opacity="0.5"
                      />
                      <circle
                        cx="22"
                        cy="20"
                        r="1"
                        fill="currentColor"
                        className="text-indigo-300"
                        opacity="0.5"
                      />

                      {/* Connection paths */}
                      <path
                        d="M11 12 L15 15 M21 12 L17 15 M11 20 L15 17 M21 20 L17 17"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        opacity="0.3"
                      />
                    </motion.g>

                    <defs>
                      <radialGradient
                        id="centralGradient"
                        cx="50%"
                        cy="50%"
                        r="50%"
                      >
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </radialGradient>
                      <linearGradient
                        id="neuralGradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#06d6a0" />
                      </linearGradient>
                    </defs>
                  </g>
                )}
              </svg>
            </motion.div>

            {/* Quantum pulse on hover */}
            {/* Futuristic Awakening Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{
                opacity: 1,
                transition: { duration: 0.3 },
              }}
              className="absolute inset-0 pointer-events-none overflow-hidden"
              style={{ borderRadius: "24px 4px 24px 4px" }}
            >
              {/* Energy surge waves */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`energy-${i}`}
                  initial={{ scaleY: 0, opacity: 0 }}
                  whileHover={{
                    scaleY: 1,
                    opacity: 0.6,
                    transition: {
                      delay: i * 0.1,
                      duration: 0.4,
                      ease: "easeOut",
                    },
                  }}
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, transparent ${
                      i * 30
                    }%, rgba(0, 255, 255, 0.3) ${50 + i * 10}%, transparent ${
                      70 + i * 10
                    }%)`,
                    transformOrigin: "bottom",
                  }}
                />
              ))}

              {/* Scanning beam */}
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                whileHover={{
                  y: "-100%",
                  opacity: 1,
                  transition: {
                    duration: 0.8,
                    ease: "easeInOut",
                    delay: 0.2,
                  },
                }}
                className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                style={{
                  boxShadow: "0 0 20px rgba(6, 182, 212, 0.8)",
                }}
              />

              {/* Neural activation grid */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{
                  opacity: 0.4,
                  scale: 1,
                  transition: {
                    duration: 0.5,
                    delay: 0.4,
                  },
                }}
                className="absolute inset-0"
                style={{
                  background: `
                    repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 8px,
                      rgba(147, 51, 234, 0.2) 9px,
                      rgba(147, 51, 234, 0.2) 10px
                    ),
                    repeating-linear-gradient(
                      90deg,
                      transparent,
                      transparent 8px,
                      rgba(6, 182, 212, 0.2) 9px,
                      rgba(6, 182, 212, 0.2) 10px
                    )
                  `,
                }}
              />

              {/* Holographic shimmer */}
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                whileHover={{
                  x: "100%",
                  opacity: 0.8,
                  transition: {
                    duration: 1,
                    delay: 0.6,
                    ease: "easeInOut",
                  },
                }}
                className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                style={{
                  filter: "blur(1px)",
                }}
              />
            </motion.div>
          </div>

          {/* Vertical scanning bars */}
          <motion.div
            animate={{
              scaleY: isActive ? 1 : 0,
              opacity: isActive ? 0.8 : 0,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-x-0 top-2 bottom-2 border-l-2 border-r-2 border-transparent border-l-cyan-400/60 border-r-violet-400/30 rounded-xl"
          />

          {/* Corner indicators */}
          {[0, 90, 180, 270].map((rotation, i) => (
            <motion.div
              key={i}
              animate={{
                opacity: isActive ? 1 : 0.2,
                scale: isActive ? 1.2 : 1,
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="absolute w-2 h-2 bg-violet-400 rounded-full"
              style={{
                top: `${50 + 45 * Math.sin((rotation * Math.PI) / 180)}%`,
                left: `${50 + 45 * Math.cos((rotation * Math.PI) / 180)}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </motion.div>
      </div>

      <div className="relative">
        {/* Fan Items Container */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              variants={containerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute top-1/2 -translate-y-1/2 right-8"
            >
              {/* Vertical formation guide overlay */}
              <motion.div
                initial={{ opacity: 0, scaleY: 0.8 }}
                animate={{ opacity: 0.2, scaleY: 1 }}
                exit={{ opacity: 0, scaleY: 0.8 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="absolute inset-0 pointer-events-none flex items-center justify-center"
              >
                {/* Vertical guide line */}
                <motion.div
                  animate={{
                    scaleY: 1.2,
                    opacity: 0.5,
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute left-[-120px] -translate-x-0.5 w-px bg-gradient-to-b from-transparent via-violet-400/30 to-transparent"
                  style={{
                    height: `${childArray.length * 80 + 80}px`,
                    top: `-${(childArray.length * 80 + 80) / 2}px`,
                  }}
                />

                {/* Connection dots for each item position */}
                {Array.from({ length: childArray.length }).map((_, i) => {
                  const spacing = 80;
                  const startOffset = -((childArray.length - 1) * spacing) / 2;
                  const y = startOffset + i * spacing;

                  return (
                    <motion.div
                      key={i}
                      animate={{
                        scale: 1.3,
                        opacity: 0.7,
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                      className="absolute left-[-120px] -translate-x-1/2 w-2 h-2 bg-violet-400/40 rounded-full"
                      style={{
                        top: `${y}px`,
                        transform: "translateX(-50%) translateY(-50%)",
                      }}
                    />
                  );
                })}
              </motion.div>
              {childArray.map((child, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  custom={fanPositions[index]}
                  className="absolute"
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    transformOrigin: "center",
                    zIndex: 10,
                  }}
                >
                  <div className="relative group cursor-pointer">
                    {/* Quantum field awakening effect */}
                    <div className="absolute -inset-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {/* Energy rings awakening */}
                      {[...Array(3)].map((_, ringIndex) => (
                        <motion.div
                          key={`ring-${ringIndex}`}
                          initial={{ scale: 0.5, opacity: 0 }}
                          whileHover={{
                            scale: [0.5, 1.2, 1],
                            opacity: [0, 0.8, 0.3],
                            transition: {
                              duration: 0.8,
                              delay: ringIndex * 0.1,
                              times: [0, 0.4, 1],
                              ease: "easeOut",
                            },
                          }}
                          className="absolute inset-0 rounded-full border-2 blur-sm"
                          style={{
                            borderColor: `rgba(${
                              ringIndex === 0
                                ? "124, 58, 237"
                                : ringIndex === 1
                                ? "59, 130, 246"
                                : "16, 185, 129"
                            }, 0.6)`,
                            filter: `blur(${1 + ringIndex * 0.5}px)`,
                          }}
                        />
                      ))}

                      {/* Scanning pulse */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{
                          scale: [0, 1.5, 0],
                          opacity: [0, 0.6, 0],
                          transition: {
                            duration: 1.2,
                            delay: 0.2,
                            ease: "easeInOut",
                          },
                        }}
                        className="absolute inset-0 rounded-full"
                        style={{
                          background:
                            "radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)",
                        }}
                      />

                      {/* Neural activation grid */}
                      <motion.div
                        initial={{ opacity: 0, rotate: 0 }}
                        whileHover={{
                          opacity: [0, 0.5, 0.2],
                          rotate: 360,
                          transition: {
                            duration: 1.5,
                            delay: 0.3,
                            ease: "linear",
                          },
                        }}
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: `
                            repeating-conic-gradient(
                              from 0deg,
                              transparent 0deg,
                              rgba(147, 51, 234, 0.3) 10deg,
                              transparent 20deg
                            )
                          `,
                        }}
                      />
                    </div>

                    {/* Neural activity indicators */}
                    <motion.div
                      className="absolute -inset-2 opacity-30 group-hover:opacity-70 transition-opacity duration-500"
                      animate={{
                        scale: 1.1,
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{
                        background:
                          "conic-gradient(from 0deg, rgba(147, 51, 234, 0.2), rgba(59, 130, 246, 0.15), rgba(16, 185, 129, 0.1), rgba(147, 51, 234, 0.2))",
                        borderRadius: "20px",
                        filter: "blur(8px)",
                      }}
                    />

                    {/* Premium glass container */}
                    <div
                      className="relative w-24 h-16 backdrop-blur-3xl border group-hover:border-purple-400/50 transition-all duration-700 flex items-center justify-center overflow-hidden group-hover:scale-105"
                      style={{
                        background: `
                          linear-gradient(135deg, 
                            rgba(15, 23, 42, 0.95), 
                            rgba(30, 41, 59, 0.9), 
                            rgba(51, 65, 85, 0.85),
                            rgba(15, 23, 42, 0.95)
                          )
                        `,
                        borderRadius: "16px 4px 16px 4px",
                        borderColor: "rgba(255, 255, 255, 0.1)",
                        boxShadow: `
                          0 12px 40px rgba(0, 0, 0, 0.6),
                          0 2px 8px rgba(147, 51, 234, 0.15),
                          inset 0 1px 0 rgba(255, 255, 255, 0.15),
                          inset 0 -1px 0 rgba(0, 0, 0, 0.3)
                        `,
                      }}
                    >
                      {/* Data stream indicators */}
                      <div className="absolute inset-0 overflow-hidden">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={`stream-${i}`}
                            animate={{
                              x: [-30, 30],
                              opacity: 0.6,
                            }}
                            transition={{
                              duration: 2 + i * 0.5,
                              repeat: Infinity,
                              delay: i * 0.7,
                              ease: "easeInOut",
                            }}
                            className="absolute w-px h-full bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent"
                            style={{
                              left: `${30 + i * 20}%`,
                            }}
                          />
                        ))}
                      </div>

                      {/* Content container */}
                      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-xs">
                        {child}
                      </div>

                      {/* Holographic edge accent */}
                      <motion.div
                        animate={{
                          opacity: 0.7,
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0.5 rounded-xl border border-gradient-to-br opacity-40"
                        style={{
                          borderImage:
                            "linear-gradient(45deg, rgba(147, 51, 234, 0.3), rgba(59, 130, 246, 0.2), rgba(16, 185, 129, 0.3)) 1",
                        }}
                      />
                    </div>

                    {/* Connection line to center */}
                    <svg
                      className="absolute pointer-events-none"
                      width={
                        Math.max(
                          Math.abs(fanPositions[index].x),
                          Math.abs(fanPositions[index].y)
                        ) + 100
                      }
                      height={
                        Math.max(
                          Math.abs(fanPositions[index].x),
                          Math.abs(fanPositions[index].y)
                        ) + 100
                      }
                      style={{
                        left:
                          fanPositions[index].x < 0
                            ? fanPositions[index].x - 50
                            : -50,
                        top:
                          fanPositions[index].y < 0
                            ? fanPositions[index].y - 50
                            : -50,
                      }}
                    >
                      <defs>
                        <linearGradient
                          id={`connectionGrad-${index}`}
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop
                            offset="0%"
                            stopColor="rgba(139, 92, 246, 0.6)"
                          />
                          <stop
                            offset="50%"
                            stopColor="rgba(6, 182, 212, 0.4)"
                          />
                          <stop
                            offset="100%"
                            stopColor="rgba(139, 92, 246, 0.2)"
                          />
                        </linearGradient>
                      </defs>
                      <motion.line
                        x1={
                          fanPositions[index].x < 0
                            ? Math.abs(fanPositions[index].x) + 40
                            : 40
                        }
                        y1={
                          fanPositions[index].y < 0
                            ? Math.abs(fanPositions[index].y) + 40
                            : 40
                        }
                        x2={50}
                        y2={50}
                        stroke={`url(#connectionGrad-${index})`}
                        strokeWidth="2"
                        strokeDasharray="6 4"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                          pathLength: 1,
                          opacity: 0.7,
                          strokeDashoffset: [0, -10],
                        }}
                        transition={{
                          pathLength: {
                            delay: index * 0.1 + 0.3,
                            duration: 0.6,
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          },
                          opacity: {
                            delay: index * 0.1 + 0.3,
                            duration: 0.6,
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          },
                          strokeDashoffset: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          },
                        }}
                      />
                    </svg>

                    {/* Item pulse effect */}
                    <motion.div
                      animate={{
                        scale: 1.05,
                        opacity: 0.2,
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                      className="absolute inset-0 rounded-2xl border-2 border-violet-400/40"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile responsive overlay */}
        <div className="md:hidden">
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                className="absolute top-20 right-0 min-w-[200px]"
              >
                <div className="flex flex-col gap-3 p-4 backdrop-blur-xl bg-black/40 border border-white/20 rounded-2xl">
                  {childArray.map((child, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      className="flex items-center justify-center p-3 rounded-xl border border-white/10 hover:border-violet-400/50 transition-colors duration-300"
                    >
                      {child}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FanHUD;
