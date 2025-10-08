import Typewriter from "typewriter-effect";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import { useState, useMemo, useCallback, useRef, memo, useEffect } from "react";
import QuantumBackground from "./QuantumBackground";

// Hook pour throttling des événements
const useThrottledCallback = (callback, delay) => {
  const lastRun = useRef(Date.now());

  return useCallback(
    (...args) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = Date.now();
      }
    },
    [callback, delay]
  );
};

// Enhanced quantum field background with neural network patterns
const QuantumField = memo(({ scrollY }) => {
  // Neural network connection points
  const networkNodes = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        connections: Math.floor(Math.random() * 3) + 1,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Quantum energy fields */}
      <motion.div style={{ y: scrollY }} className="absolute inset-0">
        {/* Primary energy core */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-conic from-violet-500/20 via-cyan-500/20 to-violet-500/20 rounded-full blur-3xl"
        />

        {/* Secondary energy fields */}
        <motion.div
          animate={{
            scale: [1.2, 0.8, 1.2],
            opacity: [0.15, 0.35, 0.15],
            rotate: [360, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-blue-500/25 via-purple-500/15 to-transparent rounded-full blur-2xl"
        />

        <motion.div
          animate={{
            scale: [0.9, 1.4, 0.9],
            opacity: [0.25, 0.45, 0.25],
            x: [-20, 20, -20],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-gradient-radial from-cyan-400/20 via-violet-500/10 to-transparent rounded-full blur-3xl"
        />
      </motion.div>

      {/* Neural network grid */}
      <div className="absolute inset-0 opacity-15">
        <svg className="w-full h-full">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient
              id="neural-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>

          {/* Dynamic network nodes */}
          {networkNodes.map((node) => (
            <motion.g key={node.id}>
              <motion.circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r="3"
                fill="url(#neural-gradient)"
                filter="url(#glow)"
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />

              {/* Connection lines */}
              {networkNodes.slice(0, node.connections).map((target, i) => (
                <motion.line
                  key={i}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${target.x}%`}
                  y2={`${target.y}%`}
                  stroke="url(#neural-gradient)"
                  strokeWidth="0.5"
                  opacity="0.4"
                  animate={{
                    strokeDasharray: ["0 10", "5 5", "10 0"],
                    opacity: [0.2, 0.6, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                  }}
                />
              ))}
            </motion.g>
          ))}

          {/* Scanning lines */}
          <motion.line
            x1="0%"
            y1="50%"
            x2="100%"
            y2="50%"
            stroke="rgba(139, 92, 246, 0.3)"
            strokeWidth="1"
            animate={{
              y1: ["0%", "100%", "0%"],
              y2: ["0%", "100%", "0%"],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>

      {/* Floating data particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-violet-400/60 rounded-full"
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
            ],
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: "blur(0.5px)",
          }}
        />
      ))}
    </div>
  );
});

// Composant pour un logo flottant individual
const FloatingLogo = memo(({ logo, index, isHovered }) => {
  // Mémorisation des valeurs aléatoires
  const randomValues = useMemo(
    () => ({
      floatX: (Math.random() - 0.5) * 50,
      floatY: (Math.random() - 0.5) * 50,
      particles: [...Array(4)].map(() => ({
        x: (Math.random() - 0.5) * 50,
        y: (Math.random() - 0.5) * 50,
      })),
    }),
    []
  );

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      initial={{
        x: 0,
        y: 0,
        opacity: 0,
      }}
      animate={{
        x: isHovered ? logo.position.x : 0,
        y: isHovered ? logo.position.y : 0,
        opacity: isHovered ? 1 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: index * 0.1,
      }}
      style={{ willChange: "transform, opacity" }}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4 + index,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        style={{ willChange: "transform" }}
      >
        <div className="relative">
          {/* Effet de halo lumineux */}
          <motion.div
            className="absolute -inset-4 rounded-2xl"
            animate={{
              boxShadow: [
                "0 0 25px 8px rgba(139, 92, 246, 0.4)",
                "0 0 35px 12px rgba(139, 92, 246, 0.6)",
                "0 0 25px 8px rgba(139, 92, 246, 0.4)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="relative w-16 h-16 rounded-2xl bg-slate-800/80 p-2.5 flex items-center justify-center"
            style={{
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <motion.img
              src={logo.src}
              alt={logo.name}
              className="w-full h-full object-contain"
              style={{
                filter: "contrast(5) brightness(1.1)",
              }}
              whileHover={{
                scale: 1.2,
                filter:
                  "contrast(5) brightness(1.2) drop-shadow(0 0 16px rgba(139, 92, 246, 0.8))",
              }}
            />
          </motion.div>

          {/* Effet de trainée énergétique optimisé */}
          <motion.div
            className="absolute inset-0 -z-10"
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ willChange: "transform, opacity" }}
          >
            <div className="w-full h-full rounded-2xl bg-gradient-to-r from-violet-500/40 to-blue-500/40 blur-lg" />
          </motion.div>

          {/* Effet de particules avec valeurs mémorisées */}
          {randomValues.particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-violet-400"
              animate={{
                x: [0, particle.x],
                y: [0, particle.y],
                opacity: [1, 0],
                scale: [1.2, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeOut",
              }}
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                boxShadow: "0 0 10px rgba(139, 92, 246, 0.6)",
                willChange: "transform, opacity",
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
});

// Composant pour les particules autour de l'image
const ImageParticles = memo(({ isHovered }) => {
  const particles = useMemo(
    () =>
      [...Array(8)].map((_, i) => ({
        id: i,
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 2 + Math.random() * 2,
      })),
    []
  );

  return (
    <motion.div
      className="absolute inset-0 z-20"
      animate={{
        opacity: isHovered ? 1 : 0,
      }}
      transition={{ duration: 0.4 }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full bg-violet-400/30"
          animate={{
            x: [0, particle.x],
            y: [0, particle.y],
            scale: [0, 1.5, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </motion.div>
  );
});

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scrollY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const springConfig = useMemo(
    () => ({ damping: 20, stiffness: 150, mass: 0.5 }),
    []
  );
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const rotateX = useTransform(y, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-15deg", "15deg"]);

  // Optimisation du handleMouseMove avec throttling
  const handleMouseMoveThrottled = useThrottledCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = event.clientX - rect.left;
    const mouseYPos = event.clientY - rect.top;
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  }, 16); // ~60fps

  // Mémorisation des logos techniques
  const techLogos = useMemo(
    () => [
      {
        src: "/images/tech/javascript.png",
        name: "JavaScript",
        position: { x: -160, y: -120 },
      },
      {
        src: "/images/tech/java.png",
        name: "Java",
        position: { x: 120, y: 0 },
      },
      {
        src: "/images/tech/python.png",
        name: "Python",
        position: { x: 0, y: -160 },
      },
      {
        src: "/images/tech/react.webp",
        name: "React",
        position: { x: -160, y: -20 },
      },
      {
        src: "/images/tech/spring-boot.png",
        name: "Spring Boot",
        position: { x: 110, y: -120 },
      },
    ],
    []
  );

  // Mémorisation des plateformes sociales
  const socialPlatforms = useMemo(
    () => [
      {
        name: "GitHub",
        icon: <FaGithub className="w-6 h-6" />,
        href: "https://github.com/iliasofir",
      },
      {
        name: "LinkedIn",
        icon: <FaLinkedin className="w-6 h-6" />,
        href: "https://www.linkedin.com/in/ilias-ofir-445b91295/",
      },
      {
        name: "Resume",
        icon: <HiDownload className="w-6 h-6" />,
        href: "/Resume.pdf",
      },
    ],
    []
  );

  return (
    <QuantumBackground
      id="home"
      containerRef={containerRef}
      variant="default"
      className="flex items-center justify-center py-20 px-4 overflow-hidden"
    >
      {/* Enhanced quantum field */}
      <QuantumField scrollY={scrollY} />

      {/* Mobile HUD - Top compact version */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-8 left-8 right-8 z-30 md:hidden"
      >
        <div className="flex justify-between items-center backdrop-blur-xl bg-black/20 border border-white/10 rounded-2xl px-4 py-3">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50"
            />
            <span className="text-green-400 font-mono text-xs">ONLINE</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-12 h-1 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full">
              <motion.div
                animate={{ x: [-16, 32, -16] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-3 h-1 bg-white rounded-full shadow-lg"
              />
            </div>
            <span className="text-xs text-gray-400 font-mono">SCAN</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="max-w-7xl w-full relative z-10"
      >
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Enhanced holographic portrait container */}
          <motion.div
            className="relative w-80 h-80 md:w-[450px] md:h-[450px]"
            onMouseMove={handleMouseMoveThrottled}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            {/* Holographic frame */}
            <motion.div
              animate={{
                boxShadow: isHovered
                  ? [
                      "0 0 60px 20px rgba(139, 92, 246, 0.3)",
                      "0 0 80px 30px rgba(6, 182, 212, 0.3)",
                      "0 0 60px 20px rgba(139, 92, 246, 0.3)",
                    ]
                  : "0 0 40px 15px rgba(139, 92, 246, 0.15)",
              }}
              transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
              className="absolute -inset-8 rounded-3xl"
            />

            {/* Scanning frame effect */}
            <motion.div
              animate={{
                rotate: isHovered ? [0, 360] : 0,
              }}
              transition={{
                duration: 8,
                repeat: isHovered ? Infinity : 0,
                ease: "linear",
              }}
              className="absolute -inset-4 rounded-3xl border border-violet-400/30 opacity-60"
            >
              <motion.div
                animate={{
                  background: [
                    "conic-gradient(from 0deg, rgba(139,92,246,0.8), transparent, transparent, transparent)",
                    "conic-gradient(from 90deg, rgba(139,92,246,0.8), transparent, transparent, transparent)",
                    "conic-gradient(from 180deg, rgba(139,92,246,0.8), transparent, transparent, transparent)",
                    "conic-gradient(from 270deg, rgba(139,92,246,0.8), transparent, transparent, transparent)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-full h-full rounded-3xl"
              />
            </motion.div>
            {/* Effet de halo lumineux optimisé */}
            <motion.div
              className="absolute -inset-4 rounded-2xl"
              animate={{
                boxShadow: isHovered
                  ? "0 0 80px 30px rgba(139, 92, 246, 0.15)"
                  : "0 0 40px 15px rgba(139, 92, 246, 0.1)",
              }}
              transition={{ duration: 0.8 }}
            />

            {/* Logos flottants optimisés */}
            <motion.div
              className="absolute inset-0 z-30"
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.8,
              }}
              transition={{ duration: 0.4 }}
              style={{ willChange: "transform, opacity" }}
            >
              {techLogos.map((logo, index) => (
                <FloatingLogo
                  key={logo.name}
                  logo={logo}
                  index={index}
                  isHovered={isHovered}
                />
              ))}
            </motion.div>

            {/* Holographic display container */}
            <motion.div
              className="relative w-full h-full rounded-3xl overflow-hidden"
              style={{ transform: "translateZ(30px)" }}
            >
              {/* Multi-layer holographic background */}
              <motion.div
                animate={{
                  background: [
                    "radial-gradient(circle at 30% 30%, rgba(139,92,246,0.15), transparent 50%)",
                    "radial-gradient(circle at 70% 70%, rgba(6,182,212,0.15), transparent 50%)",
                    "radial-gradient(circle at 30% 70%, rgba(139,92,246,0.15), transparent 50%)",
                  ],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute inset-0 backdrop-blur-xl"
              />

              {/* Glassmorphism container */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl" />

              {/* Holographic grid overlay */}
              <motion.div
                animate={{
                  opacity: isHovered ? 0.3 : 0.1,
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgMEg0MFY0MEgwVjB6IiBzdHJva2U9InJnYmEoMTM5LCA5MiwgMjQ2LCAwLjMpIiBzdHJva2Utd2lkdGg9IjAuNSIvPgo8L3N2Zz4=')] rounded-3xl"
              />

              {/* Main portrait */}
              <motion.div
                className="relative w-full h-full flex items-center justify-center"
                animate={{
                  scale: isHovered ? 1.02 : 1,
                }}
                transition={{ duration: 0.6 }}
                style={{ transform: "translateZ(50px)" }}
              >
                <motion.img
                  src="/images/your_photo.png"
                  alt="Ilias Ofir - Software Engineer"
                  className="w-[85%] h-[85%] object-contain relative z-10"
                  style={{
                    filter: isHovered
                      ? "drop-shadow(0 0 30px rgba(139, 92, 246, 0.6)) contrast(1.1) brightness(1.1)"
                      : "drop-shadow(0 0 20px rgba(139, 92, 246, 0.4))",
                    willChange: "transform, filter",
                  }}
                />

                {/* Holographic scan lines */}
                <motion.div
                  animate={{
                    y: isHovered ? ["-100%", "100%"] : "-100%",
                    opacity: isHovered ? [0, 0.6, 0] : 0,
                  }}
                  transition={{
                    duration: 2,
                    repeat: isHovered ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                />

                <motion.div
                  animate={{
                    y: isHovered ? ["-100%", "100%"] : "-100%",
                    opacity: isHovered ? [0, 0.4, 0] : 0,
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: isHovered ? Infinity : 0,
                    ease: "easeInOut",
                    delay: 0.3,
                  }}
                  className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-violet-400 to-transparent"
                />
              </motion.div>

              {/* Enhanced particle system */}
              <ImageParticles isHovered={isHovered} />

              {/* Corner indicators */}
              {[
                { position: "top-4 left-4", rotate: 0 },
                { position: "top-4 right-4", rotate: 90 },
                { position: "bottom-4 left-4", rotate: 270 },
                { position: "bottom-4 right-4", rotate: 180 },
              ].map((corner, i) => (
                <motion.div
                  key={i}
                  className={`absolute ${corner.position} w-6 h-6`}
                  style={{ rotate: `${corner.rotate}deg` }}
                  animate={{
                    opacity: isHovered ? [0.3, 0.8, 0.3] : 0.3,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-full h-full"
                  >
                    <path
                      d="M3 3h6m0 0v6m0-6l6 6"
                      stroke="rgba(139, 92, 246, 0.8)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced content section */}
          <div className="flex-1 text-center md:text-left relative">
            {/* Data stream visualization */}
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-violet-400 to-transparent hidden md:block"
            />

            {/* Greeting with terminal effect */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex items-center gap-3 mb-6"
            >
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50"
              />
              <span className="text-green-400 font-mono text-lg tracking-wide">
                &gt; INITIALIZING_PROFILE...
              </span>
            </motion.div>

            {/* Enhanced name display */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="relative"
            >
              <span className="text-6xl md:text-8xl font-black bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent mb-4 block">
                ILIAS OFIR
              </span>

              {/* Glitch effect overlay */}
              <motion.span
                animate={{
                  opacity: [0, 0.7, 0],
                  x: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                className="absolute top-0 left-0 text-6xl md:text-8xl font-black text-cyan-400 mix-blend-screen"
              >
                ILIAS OFIR
              </motion.span>
            </motion.h1>

            {/* Enhanced role display with holographic effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="relative mb-8"
            >
              <div className="text-3xl md:text-5xl font-bold text-gray-300 mb-2">
                <motion.div
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="bg-gradient-to-r from-violet-400 via-cyan-400 to-violet-400 bg-[length:200%_100%] bg-clip-text text-transparent"
                >
                  <Typewriter
                    options={{
                      strings: [
                        "SOFTWARE_ENGINEER.exe",
                        "FULLSTACK_DEV.js",
                        "PROBLEM_SOLVER.py",
                        "CODE_ARCHITECT.java",
                      ],
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 30,
                      delay: 80,
                    }}
                  />
                </motion.div>
              </div>

              {/* Status indicators */}
              <div className="flex items-center gap-4 text-sm font-mono">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center gap-2"
                >
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span className="text-blue-400">LEARNING</span>
                </motion.div>
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-green-400">BUILDING</span>
                </motion.div>
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-2 h-2 bg-violet-400 rounded-full" />
                  <span className="text-violet-400">INNOVATING</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Enhanced description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="relative mb-10"
            >
              <motion.p
                className="text-gray-300 text-lg leading-relaxed max-w-2xl"
                animate={{
                  filter: [
                    "drop-shadow(0 0 0px rgba(139, 92, 246, 0))",
                    "drop-shadow(0 0 8px rgba(139, 92, 246, 0.3))",
                    "drop-shadow(0 0 0px rgba(139, 92, 246, 0))",
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                Crafting the future through code. I architect scalable
                solutions, engineer robust applications, and transform
                innovative ideas into digital realities. Every line of code is a
                step toward tomorrow.
              </motion.p>

              {/* Code snippet decoration */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 2, duration: 1.5 }}
                className="h-px bg-gradient-to-r from-violet-400 via-cyan-400 to-transparent mt-4"
              />
            </motion.div>

            {/* Enhanced action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="flex flex-wrap justify-center md:justify-start gap-4"
            >
              {socialPlatforms.map((platform, index) => (
                <motion.a
                  key={platform.name}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  href={platform.href}
                  download={platform.name === "Resume"}
                  target={platform.name !== "Resume" ? "_blank" : undefined}
                  rel={
                    platform.name !== "Resume"
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="relative group"
                  style={{ willChange: "transform" }}
                >
                  {/* Button background with holographic effect */}
                  <motion.div
                    animate={{
                      background: [
                        "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(139,92,246,0.1))",
                        "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(6,182,212,0.1))",
                        "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(139,92,246,0.1))",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                    className="absolute inset-0 rounded-xl backdrop-blur-xl border border-white/20"
                  />

                  {/* Scanning line effect */}
                  <motion.div
                    animate={{
                      x: ["-100%", "100%"],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                      delay: index * 0.3,
                    }}
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 rounded-xl"
                  />

                  <div className="relative px-8 py-4 flex items-center gap-3 rounded-xl">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                    >
                      {platform.icon}
                    </motion.div>
                    <span className="font-semibold bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent">
                      {platform.name}
                    </span>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Custom styles */}
      <style jsx>{`
        .bg-gradient-conic {
          background-image: conic-gradient(var(--tw-gradient-stops));
        }

        .bg-gradient-radial {
          background-image: radial-gradient(var(--tw-gradient-stops));
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .perspective {
          perspective: 1000px;
        }

        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        .scan-line {
          animation: scan 2s ease-in-out infinite;
        }
      `}</style>
    </QuantumBackground>
  );
};

export default Hero;
