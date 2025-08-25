import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

const WelcomeModal = ({ isOpen, onClose, onStartChat }) => {
  const [currentText, setCurrentText] = useState("");
  const [showButtons, setShowButtons] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const controls = useAnimation();
  const containerRef = useRef(null);

  const welcomeMessage =
    "Welcome to Ilias's digital universe! I'm his AI companion, ready to guide you through his creative journey and technical expertise. What would you like to discover?";

  // Génération de particules flottantes optimisée
  const particles = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 2,
        delay: Math.random() * 3,
        duration: Math.random() * 2 + 3,
      })),
    []
  );

  // Animation de typing optimisée
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

  // Animations variants optimisées
  const containerVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        scale: 0.95,
        y: 20,
      },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 30,
          staggerChildren: 0.1,
          delayChildren: 0.1,
        },
      },
      exit: {
        opacity: 0,
        scale: 0.95,
        y: -20,
        transition: { duration: 0.3 },
      },
    }),
    []
  );

  const avatarVariants = useMemo(
    () => ({
      hidden: { scale: 0, opacity: 0 },
      visible: {
        scale: 1,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 25,
        },
      },
      floating: {
        y: [-3, 3, -3],
        transition: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    }),
    []
  );

  const buttonVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.1,
          type: "spring",
          stiffness: 300,
          damping: 25,
        },
      }),
      hover: {
        scale: 1.02,
        y: -1,
        transition: { type: "spring", stiffness: 400, damping: 20 },
      },
      tap: { scale: 0.98 },
    }),
    []
  );

  const particleVariants = {
    animate: {
      y: [-20, -40, -20],
      opacity: [0.3, 0.8, 0.3],
      scale: [0.8, 1.2, 0.8],
    },
  };

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
              "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.15) 0%, rgba(0, 0, 0, 0.9) 70%)",
          }}
        >
          {/* Particules flottantes */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
              variants={particleVariants}
              animate="animate"
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Container principal */}
          <motion.div
            ref={containerRef}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-2xl mx-4"
          >
            {/* Fond glassmorphism avancé */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl" />

            {/* Effets lumineux */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-50" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-20 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-2xl" />

            {/* Contenu */}
            <div className="relative p-8 lg:p-12">
              {/* Bouton de fermeture stylé */}
              <motion.button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 group z-20"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
              >
                <span className="text-xl font-light group-hover:text-red-400 transition-colors">
                  ×
                </span>
              </motion.button>

              {/* Avatar avec robot Lottie optimisé */}
              <motion.div
                className="flex justify-center mb-8"
                variants={avatarVariants}
                initial="hidden"
                animate={["visible", "floating"]}
              >
                <div className="relative">
                  {/* Halo simplifié */}
                  <motion.div
                    className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-400/15 via-purple-500/15 to-pink-500/15"
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  {/* Container du robot simplifié */}
                  <motion.div
                    className="relative w-28 h-28 bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl border border-white/10"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(59, 130, 246, 0.2)",
                        "0 0 30px rgba(168, 85, 247, 0.3)",
                        "0 0 20px rgba(59, 130, 246, 0.2)",
                      ],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {/* Robot Lottie Animation */}
                    <iframe
                      src="https://lottie.host/embed/49e71320-d0f3-4051-8356-b5e63a3b0858/iNrI4nLQ80.lottie"
                      style={{
                        width: "90px",
                        height: "90px",
                        border: "none",
                        background: "transparent",
                      }}
                      title="AI Assistant Robot Animation"
                      loading="lazy"
                    />

                    {/* Anneau de pulse simplifié */}
                    <motion.div
                      className="absolute inset-0 border border-white/10 rounded-full"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Titre optimisé */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-center mb-8"
              >
                <motion.h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4">
                  Hello there!
                  <motion.span
                    className="ml-2 inline-block"
                    animate={{ rotate: [0, 15, 0] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  >
                    👋
                  </motion.span>
                </motion.h1>

                {/* Zone de texte optimisée */}
                <motion.div
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {/* Indicateur de typing simplifié */}
                  {isTyping && (
                    <motion.div
                      className="absolute top-4 right-4 flex gap-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </motion.div>
                  )}

                  <p className="text-white/90 text-lg leading-relaxed min-h-[100px] flex items-center justify-center text-center">
                    {currentText}
                    {isTyping && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="ml-1 text-blue-400"
                      >
                        |
                      </motion.span>
                    )}
                  </p>
                </motion.div>
              </motion.div>

              {/* Boutons d'action modernisés */}
              <AnimatePresence>
                {showButtons && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col sm:flex-row gap-4 lg:gap-6"
                  >
                    <motion.button
                      onClick={() => {
                        onStartChat();
                        onClose();
                      }}
                      custom={0}
                      variants={buttonVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      whileTap="tap"
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg"
                    >
                      <span className="flex items-center justify-center gap-2">
                        💬 Let's Chat!
                      </span>
                    </motion.button>

                    <motion.button
                      onClick={onClose}
                      custom={1}
                      variants={buttonVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      whileTap="tap"
                      className="flex-1 bg-white/10 backdrop-blur-sm text-white font-semibold py-3 px-6 rounded-xl border border-white/20 hover:bg-white/20 transition-colors duration-300"
                    >
                      <span className="flex items-center justify-center gap-2">
                        🚀 Explore Portfolio
                      </span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Éléments décoratifs simplifiés */}
            <motion.div
              className="absolute -top-2 -left-2 w-4 h-4 bg-blue-400/20 rounded-full"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-2 -right-2 w-3 h-3 bg-purple-400/20 rounded-full"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeModal;
