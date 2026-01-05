import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WelcomeModal = ({ isOpen, onClose, onStartChat }) => {
  const [currentText, setCurrentText] = useState("");
  const [showButtons, setShowButtons] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const containerRef = useRef(null);

  const welcomeMessage =
    "Welcome to Ilias's digital universe! I'm his AI companion, ready to guide you through his creative journey and technical expertise. What would you like to discover?";

  // Neural network particles with violet/cyan theme
  const particles = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        delay: Math.random() * 3,
        duration: Math.random() * 3 + 4,
        color: i % 2 === 0 ? "violet" : "cyan",
      })),
    []
  );

  // Typing animation
  useEffect(() => {
    if (!isOpen) {
      setCurrentText("");
      setShowButtons(false);
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    let index = 0;
    const timer = setInterval(() => {
      if (index < welcomeMessage.length) {
        setCurrentText((prev) => welcomeMessage.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setIsTyping(false);
        setTimeout(() => setShowButtons(true), 600);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [isOpen, welcomeMessage]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.12) 0%, rgba(0, 0, 0, 0.95) 70%)",
          }}
        >
          {/* Quantum Neural Network Particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className={`absolute rounded-full ${
                particle.color === "violet"
                  ? "bg-gradient-to-r from-violet-500/40 to-violet-400/30"
                  : "bg-gradient-to-r from-cyan-500/40 to-cyan-400/30"
              }`}
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                filter: "blur(1px)",
              }}
              animate={{
                y: [-20, -60, -20],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.8, 1.5, 0.8],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Neural Network Connecting Lines */}
          <svg
            className="absolute inset-0 w-full h-full opacity-10"
            style={{ pointerEvents: "none" }}
          >
            {particles.slice(0, 8).map((particle, i) => {
              const nextParticle = particles[(i + 1) % 8];
              return (
                <motion.line
                  key={`line-${i}`}
                  x1={`${particle.x}%`}
                  y1={`${particle.y}%`}
                  x2={`${nextParticle.x}%`}
                  y2={`${nextParticle.y}%`}
                  stroke={particle.color === "violet" ? "#8b5cf6" : "#06b6d4"}
                  strokeWidth="0.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0.1, 0.3, 0.1] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              );
            })}
          </svg>

          {/* Main Modal Container */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -30 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-[90vw] sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-4"
          >
            {/* Holographic Border Effect */}
            <motion.div
              className="absolute inset-0 rounded-3xl p-[1px]"
              style={{
                background:
                  "linear-gradient(145deg, rgba(139, 92, 246, 0.5), rgba(6, 182, 212, 0.3), rgba(139, 92, 246, 0.5))",
                backgroundSize: "200% 200%",
              }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-full h-full rounded-3xl bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-xl" />
            </motion.div>

            {/* Quantum Glow Effects */}
            <motion.div
              className="absolute -inset-2 rounded-3xl opacity-40 pointer-events-none"
              animate={{
                boxShadow: [
                  "0 0 60px rgba(139, 92, 246, 0.3), 0 0 100px rgba(6, 182, 212, 0.2)",
                  "0 0 80px rgba(6, 182, 212, 0.4), 0 0 120px rgba(139, 92, 246, 0.3)",
                  "0 0 60px rgba(139, 92, 246, 0.3), 0 0 100px rgba(6, 182, 212, 0.2)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Top Glow Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-20 sm:w-56 sm:h-28 md:w-64 md:h-32 bg-gradient-to-r from-violet-500/30 via-cyan-500/30 to-violet-500/30 rounded-full blur-3xl pointer-events-none" />

            {/* Content Container */}
            <div className="relative p-4 sm:p-6 md:p-8 lg:p-12">
              {/* Close Button with Quantum Style */}
              <motion.button
                onClick={onClose}
                className="absolute top-3 right-3 sm:top-6 sm:right-6 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-violet-500/10 to-cyan-500/10 backdrop-blur-sm hover:from-violet-500/20 hover:to-cyan-500/20 flex items-center justify-center text-gray-400 hover:text-white border border-violet-400/20 hover:border-violet-400/40 transition-all duration-300 group z-20"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.8, type: "spring" }}
              >
                <span className="text-lg sm:text-xl font-light group-hover:text-violet-300 transition-colors">
                  ×
                </span>
              </motion.button>

              {/* AI Avatar with Quantum Halo */}
              <motion.div
                className="flex justify-center mb-4 sm:mb-6 md:mb-8"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                <div className="relative">
                  {/* Rotating Quantum Halo */}
                  <motion.div
                    className="absolute -inset-4 sm:-inset-6 rounded-full"
                    style={{
                      background:
                        "conic-gradient(from 0deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.3), rgba(139, 92, 246, 0.2))",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  {/* Inner Glow Ring */}
                  <motion.div
                    className="absolute -inset-2 sm:-inset-3 rounded-full bg-gradient-to-r from-violet-500/20 to-cyan-500/20 blur-xl"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Avatar Container */}
                  <motion.div
                    className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-violet-400/30 overflow-hidden"
                    animate={{
                      y: [-5, 5, -5],
                      boxShadow: [
                        "0 0 30px rgba(139, 92, 246, 0.3)",
                        "0 0 50px rgba(6, 182, 212, 0.4)",
                        "0 0 30px rgba(139, 92, 246, 0.3)",
                      ],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {/* Robot Lottie Animation */}
                    <iframe
                      src="https://lottie.host/embed/49e71320-d0f3-4051-8356-b5e63a3b0858/iNrI4nLQ80.lottie"
                      style={{
                        width: "80px",
                        height: "80px",
                        border: "none",
                        background: "transparent",
                      }}
                      className="sm:!w-[90px] sm:!h-[90px] md:!w-[100px] md:!h-[100px]"
                      title="AI Assistant Robot Animation"
                      loading="lazy"
                    />

                    {/* Scanning Line Effect */}
                    <motion.div
                      className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent"
                      animate={{
                        top: ["0%", "100%"],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    {/* Pulse Rings */}
                    <motion.div
                      className="absolute inset-0 border-2 border-violet-400/40 rounded-full"
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  </motion.div>

                  {/* Corner Accents */}
                  <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-l-2 border-violet-400/50 rounded-tl-lg" />
                  <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-r-2 border-cyan-400/50 rounded-br-lg" />
                </div>
              </motion.div>

              {/* Title Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-center mb-4 sm:mb-6 md:mb-8"
              >
                <motion.h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-2 sm:mb-3">
                  <span className="bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent">
                    Hello there!
                  </span>
                  <motion.span
                    className="ml-2 inline-block"
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  >
                    👋
                  </motion.span>
                </motion.h1>

                {/* Message Box with Quantum Border */}
                <motion.div
                  className="relative bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-2xl p-3 sm:p-4 md:p-6 border border-violet-400/20 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  {/* Animated Corner Borders */}
                  <motion.div
                    className="absolute top-0 left-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-t-2 border-l-2 border-violet-400/40 rounded-tl-2xl"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                  />
                  <motion.div
                    className="absolute bottom-0 right-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-b-2 border-r-2 border-cyan-400/40 rounded-br-2xl"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 }}
                  />

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      className="absolute top-2 right-2 sm:top-4 sm:right-4 flex gap-1 sm:gap-1.5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.4, 1, 0.4],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </motion.div>
                  )}

                  <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed min-h-[80px] sm:min-h-[100px] md:min-h-[120px] flex items-center justify-center text-center relative z-10">
                    {currentText}
                    {isTyping && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="ml-1 text-cyan-400 font-bold"
                      >
                        |
                      </motion.span>
                    )}
                  </p>
                </motion.div>
              </motion.div>

              {/* Action Buttons */}
              <AnimatePresence>
                {showButtons && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                  >
                    {/* Start Chat Button */}
                    <motion.button
                      onClick={() => {
                        onStartChat();
                        onClose();
                      }}
                      className="relative flex-1 group overflow-hidden rounded-xl"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {/* Animated Background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600"
                        animate={{
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        style={{ backgroundSize: "200% 100%" }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />

                      {/* Shine Effect */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                          backgroundSize: "200% 100%",
                        }}
                        animate={{
                          backgroundPosition: ["-200% 0%", "200% 0%"],
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />

                      <span className="relative z-10 flex items-center justify-center gap-2 text-white font-semibold py-2.5 px-4 sm:py-3 sm:px-5 md:py-3.5 md:px-6 text-sm sm:text-base">
                        <span className="text-lg sm:text-xl">💬</span>
                        Let's Chat!
                      </span>
                    </motion.button>

                    {/* Explore Button */}
                    <motion.button
                      onClick={onClose}
                      className="relative flex-1 group rounded-xl overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-violet-400/30 hover:border-violet-400/50 transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {/* Hover Glow */}
                      <motion.div className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-violet-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <span className="relative z-10 flex items-center justify-center gap-2 text-white font-semibold py-2.5 px-4 sm:py-3 sm:px-5 md:py-3.5 md:px-6 text-sm sm:text-base">
                        <span className="text-lg sm:text-xl">🚀</span>
                        Explore Portfolio
                      </span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Decorative Quantum Nodes */}
            <motion.div
              className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-gradient-to-br from-violet-500/40 to-violet-600/30 border border-violet-400/50"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-3 -right-3 w-5 h-5 rounded-full bg-gradient-to-br from-cyan-500/40 to-cyan-600/30 border border-cyan-400/50"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            />
            <motion.div
              className="absolute top-1/2 -right-4 w-4 h-4 rounded-full bg-gradient-to-br from-violet-500/30 to-cyan-500/30 border border-violet-400/40"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeModal;
