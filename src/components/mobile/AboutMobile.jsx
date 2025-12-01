import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useMemo, useState } from "react";
import QuantumBackground from "../QuantumBackground";

const AboutMobile = () => {
  const containerRef = useRef(null);

  // Scroll-based fade configuration
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const springConfig = useMemo(
    () => ({
      stiffness: 120,
      damping: 40,
      mass: 0.8,
      restDelta: 0.001,
    }),
    []
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.95, 1, 1, 0.95]
  );

  const [activeImage, setActiveImage] = useState(0);

  const images = [
    {
      id: 1,
      src: "/images/about/IMG_1942.jpg",
      alt: "Professional Journey",
      caption: "GITEX AFRICA 2025",
      location: "Marrakech",
    },
    {
      id: 2,
      src: "/images/about/IMG_2756.jpg",
      alt: "Innovation Mindset",
      caption: "Career Forum 2025",
      location: "ECC",
    },
    {
      id: 3,
      src: "/images/about/IMG_2426.jpg",
      alt: "Tech Passion",
      caption: "GenAI meeting 2025",
      location: "EMSI",
    },
  ];

  return (
    <QuantumBackground
      id="about"
      containerRef={containerRef}
      variant="purple"
      className="py-16"
    >
      <motion.div
        style={{
          opacity: useSpring(opacity, springConfig),
          scale: useSpring(scale, springConfig),
          willChange: "transform, opacity",
        }}
        className="relative z-10 px-4"
      >
        {/* Title Section */}
        <motion.h2
          className="text-4xl font-black text-center mb-3"
          animate={{
            textShadow: [
              "0 0 20px rgba(139, 92, 246, 0.5)",
              "0 0 40px rgba(139, 92, 246, 0.8)",
              "0 0 20px rgba(139, 92, 246, 0.5)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-200 to-cyan-200">
            About Me
          </span>
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "60%" }}
          transition={{ duration: 2, delay: 0.5 }}
          className="h-0.5 bg-gradient-to-r from-transparent via-violet-400 to-transparent mx-auto mb-8 rounded-full"
        />

        {/* Profile Image Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative mb-8 mx-auto max-w-sm"
        >
          {/* Image Container */}
          <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-2xl">
            {/* Image Slider */}
            <div className="relative w-full h-full">
              {images.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: activeImage === index ? 1 : 0,
                    scale: activeImage === index ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400'%3E%3Crect width='300' height='400' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20' fill='%239ca3af'%3EImage%3C/text%3E%3C/svg%3E";
                    }}
                  />

                  {/* Image Overlay Info */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: activeImage === index ? 1 : 0, y: 0 }}
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6"
                  >
                    <h3 className="text-xl font-bold text-white mb-1">
                      {image.caption}
                    </h3>
                    <p className="text-gray-300 text-sm">{image.location}</p>
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
                </motion.div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() =>
                setActiveImage((prev) =>
                  prev === 0 ? images.length - 1 : prev - 1
                )
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-10"
            >
              ←
            </button>
            <button
              onClick={() =>
                setActiveImage((prev) =>
                  prev === images.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-10"
            >
              →
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeImage === index
                      ? "bg-white w-8"
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>

            {/* Decorative corner accents */}
            <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-violet-400/60 rounded-tr-2xl z-10" />
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-cyan-400/60 rounded-bl-2xl z-10" />
          </div>

          {/* Enhanced glow effects */}
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
            }}
          />
        </motion.div>

        {/* Introduction Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="relative group mb-6"
        >
          <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-6 border border-white/20 shadow-2xl relative overflow-hidden">
            {/* Animated border gradient */}
            <motion.div
              className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.4), rgba(6, 182, 212, 0.3), transparent)",
                backgroundSize: "200% 100%",
              }}
              animate={{
                backgroundPosition: ["0% 0%", "200% 0%"],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <div className="relative z-10">
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="text-2xl font-bold mb-4"
              >
                <span className="bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent">
                  Hello! I'm Ilias Ofir
                </span>
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                className="text-gray-300/95 text-base leading-relaxed"
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
                . Guided by clean architecture and UX-focused design, I aim to
                craft solutions that are both{" "}
                <span className="text-violet-400 font-semibold">
                  scalable and intuitive
                </span>
                . Currently seeking opportunities where I can grow, innovate,
                and contribute to real-world engineering challenges.
              </motion.p>
            </div>

            {/* Decorative corner elements */}
            <div className="absolute top-3 right-3 w-12 h-12 border-t-2 border-r-2 border-violet-500/30 rounded-tr-2xl" />
            <div className="absolute bottom-3 left-3 w-12 h-12 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-2xl" />
          </div>
        </motion.div>

        {/* Floating emoji decorations */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-32 right-8 text-5xl opacity-30"
        >
          💻
        </motion.div>

        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-32 left-8 text-4xl opacity-30"
        >
          🚀
        </motion.div>

        <motion.div
          animate={{
            y: [0, -10, 0],
            x: [0, 5, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute top-1/2 left-4 text-3xl opacity-25"
        >
          ☕
        </motion.div>
      </motion.div>
    </QuantumBackground>
  );
};

export default AboutMobile;
