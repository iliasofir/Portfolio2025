import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, memo, useRef } from "react";
import QuantumBackground from "./QuantumBackground";
import { useInView } from "../hooks/useScrollAnimations";

// Swipeable Card Component
const SwipeableCard = memo(({ image, index, totalCards, onSwipe }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-25, 0, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (event, info) => {
    // If swiped left beyond threshold, move to back
    if (info.offset.x < -100) {
      onSwipe(index);
    }
  };

  return (
    <motion.div
      style={{
        x,
        rotate,
        opacity,
        zIndex: totalCards - index,
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      initial={{ scale: 1 - index * 0.05, y: index * 10, x: index * 30 }}
      animate={{ scale: 1 - index * 0.05, y: index * 10, x: index * 30 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="absolute cursor-grab active:cursor-grabbing"
    >
      {/* Phone-like card container with glassmorphism */}
      <div className="relative backdrop-blur-xl bg-gradient-to-br from-gray-900/95 to-gray-800/95 p-4 pb-16 shadow-2xl rounded-3xl transform-gpu border border-white/20 w-[300px] h-[500px] overflow-hidden">
        {/* Animated border gradient */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-50"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), rgba(6, 182, 212, 0.3), transparent)",
            backgroundSize: "200% 100%",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "200% 0%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Image container - fills most of the card */}
        <div className="relative z-10 w-full h-[400px] bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl overflow-hidden border border-white/10">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='500'%3E%3Crect width='300' height='500' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20' fill='%239ca3af'%3E" +
                encodeURIComponent(image.alt) +
                "%3C/text%3E%3C/svg%3E";
            }}
          />

          {/* Swipe indicator overlay */}
          <motion.div
            style={{ opacity: useTransform(x, [-100, 0], [1, 0]) }}
            className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-transparent flex items-center justify-start pl-8"
          >
            <motion.div
              animate={{ x: [-10, 0, -10] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-white text-4xl"
            >
              ←
            </motion.div>
          </motion.div>

          {/* Scanning line effect */}
          <motion.div
            animate={{
              y: ["-100%", "200%"],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              delay: index * 0.5,
            }}
            className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent blur-sm"
          />
        </div>

        {/* Caption area at bottom */}
        <div className="absolute bottom-4 left-0 right-0 text-center px-4 z-10">
          <p className="text-base font-semibold bg-gradient-to-r from-violet-200 via-white to-cyan-200 bg-clip-text text-transparent">
            {image.caption}
          </p>
        </div>

        {/* Decorative corner accents with gradient */}
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-violet-400/60 rounded-tr-2xl z-10" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-cyan-400/60 rounded-bl-2xl z-10" />
      </div>

      {/* Enhanced glow effects with portfolio colors */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-3xl"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          boxShadow: [
            "0 20px 60px rgba(139, 92, 246, 0.4), 0 0 100px rgba(6, 182, 212, 0.2)",
            "0 25px 80px rgba(6, 182, 212, 0.5), 0 0 120px rgba(139, 92, 246, 0.3)",
            "0 20px 60px rgba(139, 92, 246, 0.4), 0 0 100px rgba(6, 182, 212, 0.2)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: index * 0.4,
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: i % 2 === 0 ? "#8b5cf6" : "#06b6d4",
              left: `${20 + i * 15}%`,
              filter: "blur(1px)",
            }}
            animate={{
              y: ["100%", "-20%"],
              x: [(i - 2) * 10, (i - 2) * 15, (i - 2) * 10],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
});

const About = () => {
  const containerRef = useRef(null);
  const { ref: sectionRef, hasBeenInView } = useInView({ threshold: 0.1 });

  const [cards, setCards] = useState([
    {
      id: 1,
      src: "/images/about/IMG_1942.webp",
      alt: "Professional Journey",
      caption: "GITEX AFRICA 2025 - Marrakech",
    },
    {
      id: 2,
      src: "/images/about/IMG_2756.webp",
      alt: "Innovation Mindset",
      caption: "Career Forum 2025 - ECC",
    },
    {
      id: 3,
      src: "/images/about/IMG_2426.webp",
      alt: "Tech Passion",
      caption: "GenAI meeting 2025 - EMSI",
    },
  ]);

  const handleSwipe = (index) => {
    setCards((prev) => {
      const newCards = [...prev];
      const swipedCard = newCards.splice(index, 1)[0];
      return [...newCards, swipedCard];
    });
  };

  return (
    <QuantumBackground id="about" containerRef={containerRef} variant="purple">
      <div
        ref={(el) => {
          containerRef.current = el;
          sectionRef.current = el;
        }}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-1000 ${
          hasBeenInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{ willChange: "transform, opacity" }}
      >
        {/* Enhanced title section */}
        <h2
          className="text-5xl md:text-7xl font-black relative text-center"
          style={{
            animation: hasBeenInView
              ? "textGlow 3s ease-in-out infinite"
              : "none",
          }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-200 to-cyan-200">
            About Me
          </span>
        </h2>
        <div
          className={`h-0.5 bg-gradient-to-r from-transparent via-violet-400 to-transparent mx-auto mt-6 rounded-full transition-all duration-1000 delay-500 ${
            hasBeenInView ? "w-3/5" : "w-0"
          }`}
        />
        <p
          className={`mt-6 text-gray-300 text-lg font-light mb-12 max-w-2xl mx-auto text-center transition-opacity duration-700 delay-700 ${
            hasBeenInView ? "opacity-100" : "opacity-0"
          }`}
        >
          Passionate developer crafting innovative solutions with modern
          technologies and creative problem-solving.
        </p>

        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">
          {/* Left Side - Text Content */}
          <div
            className={`space-y-8 h-full flex flex-col justify-center transition-all duration-800 ${
              hasBeenInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            {/* Introduction Card with enhanced glassmorphism */}
            <div
              className={`relative group transition-all duration-600 delay-300 hover:-translate-y-2 hover:scale-[1.01] ${
                hasBeenInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 shadow-2xl relative overflow-hidden transition-all duration-300">
                {/* Animated border gradient */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.4), rgba(6, 182, 212, 0.3), transparent)",
                    backgroundSize: "200% 100%",
                    animation: "shine 2.5s linear infinite",
                  }}
                />

                <div className="relative z-10">
                  <h3
                    className={`text-4xl font-bold mb-6 flex items-center gap-3 transition-opacity duration-700 delay-400 ${
                      hasBeenInView ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <span className="bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent">
                      Hello! I'm Ilias Ofir
                    </span>
                  </h3>

                  <p
                    className={`text-gray-300/95 text-lg leading-relaxed transition-opacity duration-700 delay-500 ${
                      hasBeenInView ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    Final-year{" "}
                    <span className="text-violet-400 font-semibold">
                      Software Engineering student
                    </span>{" "}
                    with hands-on experience in{" "}
                    <span className="text-cyan-400 font-semibold">
                      full-stack development and AI-driven systems
                    </span>
                    . I build modern web and mobile applications using{" "}
                    <span className="text-violet-400 font-semibold">
                      React, Spring Boot, Node.js, Laravel
                    </span>
                    , and cloud technologies{" "}
                    <span className="text-cyan-400 font-semibold">
                      (Oracle Cloud, AWS)
                    </span>
                    . Guided by clean architecture and UX-focused design, I aim
                    to craft solutions that are both{" "}
                    <span className="text-violet-400 font-semibold">
                      scalable and intuitive
                    </span>
                    . Currently seeking opportunities where I can grow,
                    innovate, and contribute to real-world engineering
                    challenges.
                  </p>
                </div>

                {/* Decorative corner elements */}
                <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-violet-500/30 rounded-tr-2xl" />
                <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-2xl" />
              </div>
            </div>
          </div>

          {/* Right Side - Swipeable Card Stack */}
          <div
            className={`relative min-h-[600px] hidden lg:flex items-center justify-center transition-all duration-800 ${
              hasBeenInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            {/* Card Stack Container */}
            <div className="relative w-[400px] h-[500px]">
              {cards.map((image, index) => (
                <SwipeableCard
                  key={image.id}
                  image={image}
                  index={index}
                  totalCards={cards.length}
                  onSwipe={handleSwipe}
                />
              ))}
            </div>

            {/* Floating decorative elements */}
            <div
              className="absolute top-12 right-12 text-7xl opacity-30 filter drop-shadow-lg"
              style={{
                animation: hasBeenInView
                  ? "float 5s ease-in-out infinite"
                  : "none",
              }}
            >
              💻
            </div>

            <div
              className="absolute bottom-16 left-8 text-6xl opacity-30 filter drop-shadow-lg"
              style={{
                animation: hasBeenInView
                  ? "float 6s ease-in-out infinite 1s"
                  : "none",
              }}
            >
              ☕
            </div>

            <div
              className="absolute top-1/2 right-4 text-5xl opacity-25 filter drop-shadow-lg"
              style={{
                animation: hasBeenInView
                  ? "floatAlt 7s ease-in-out infinite 0.5s"
                  : "none",
              }}
            >
              🚀
            </div>
          </div>
        </div>

        <style>{`
          @keyframes textGlow {
            0%, 100% { text-shadow: 0 0 20px rgba(139, 92, 246, 0.5); }
            50% { text-shadow: 0 0 40px rgba(139, 92, 246, 0.8); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
            50% { transform: translateY(-25px) rotate(10deg) scale(1.1); }
          }
          @keyframes floatAlt {
            0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
            50% { transform: translateY(-20px) translateX(10px) rotate(5deg); }
          }
        `}</style>
      </div>
    </QuantumBackground>
  );
};

export default About;
