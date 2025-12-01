import Typewriter from "typewriter-effect";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  HiDownload,
  HiCode,
  HiLightningBolt,
  HiSparkles,
} from "react-icons/hi";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  AnimatePresence,
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

// Component for bouncing logos inside the circle
const BouncingLogo = memo(({ logo, index, circleRadius = 180 }) => {
  const logoSize = 30; // Logo size in pixels - decrease to make smaller
  const maxRadius = circleRadius - logoSize / 2;
  const minRadius = circleRadius * 0.5; // Inner boundary - logos stay in outer ring only

  // Random initial position and velocity in outer ring
  const initialState = useMemo(() => {
    const angle = Math.random() * Math.PI * 2;
    const distance = minRadius + Math.random() * (maxRadius - minRadius);
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      vx: (Math.random() - 0.5) * 2, // Velocity multiplier - increase to make faster
      vy: (Math.random() - 0.5) * 2, // Velocity multiplier - increase to make faster
    };
  }, [maxRadius, minRadius]);

  const [position, setPosition] = useState(initialState);

  useEffect(() => {
    let animationFrameId;
    let lastTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const deltaTime = (currentTime - lastTime) / 16.67; // Normalize to 60fps
      lastTime = currentTime;

      setPosition((prev) => {
        let { x, y, vx, vy } = prev;

        // Update position
        x += vx * deltaTime;
        y += vy * deltaTime;

        // Calculate distance from center
        const distance = Math.sqrt(x * x + y * y);

        // Bounce off outer circle boundary
        if (distance + logoSize / 2 > maxRadius) {
          // Normalize position to circle boundary
          const angle = Math.atan2(y, x);
          x = Math.cos(angle) * (maxRadius - logoSize / 2);
          y = Math.sin(angle) * (maxRadius - logoSize / 2);

          // Reflect velocity (bounce)
          const normalX = x / distance;
          const normalY = y / distance;
          const dotProduct = vx * normalX + vy * normalY;
          vx = vx - 2 * dotProduct * normalX;
          vy = vy - 2 * dotProduct * normalY;

          // Add some damping/energy
          const damping = 0.95;
          vx *= damping;
          vy *= damping;
        }

        // Bounce off inner circle boundary (prevent overlapping portrait center)
        if (distance - logoSize / 2 < minRadius) {
          // Push out to inner boundary
          const angle = Math.atan2(y, x);
          x = Math.cos(angle) * (minRadius + logoSize / 2);
          y = Math.sin(angle) * (minRadius + logoSize / 2);

          // Reflect velocity (bounce outward)
          const normalX = x / distance;
          const normalY = y / distance;
          const dotProduct = vx * normalX + vy * normalY;
          vx = vx - 2 * dotProduct * normalX;
          vy = vy - 2 * dotProduct * normalY;

          // Add some damping
          const damping = 0.95;
          vx *= damping;
          vy *= damping;
        }

        return { x, y, vx, vy };
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [maxRadius, logoSize]);

  return (
    <motion.div
      className="absolute rounded-xl backdrop-blur-md bg-slate-800/80 border border-white/20 p-1 shadow-lg"
      style={{
        width: logoSize,
        height: logoSize,
        left: "50%",
        top: "50%",
        x: position.x,
        y: position.y,
        transform: "translate(-50%, -50%)",
      }}
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        rotate: {
          duration: 10 + index * 2,
          repeat: Infinity,
          ease: "linear",
        },
      }}
    >
      <img
        src={logo.src}
        alt={logo.name}
        className="w-full h-full object-contain"
        style={{
          filter:
            "brightness(10) drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))",
        }}
      />
    </motion.div>
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
      [...Array(60)].map((_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 300,
        y: (Math.random() - 0.5) * 300,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 2 + Math.random() * 3,
        scale: Math.random() * 1.2 + 0.3,
        delay: Math.random() * 2,
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
          className="absolute rounded-full"
          animate={{
            x: [0, particle.x, 0],
            y: [0, particle.y, 0],
            scale: [0, particle.scale, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeOut",
            delay: particle.delay,
          }}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: Math.random() * 2.5 + 1.5,
            height: Math.random() * 2.5 + 1.5,
            background:
              particle.id % 3 === 0
                ? "linear-gradient(135deg, rgba(139, 92, 246, 0.8), rgba(6, 182, 212, 0.8))"
                : particle.id % 3 === 1
                ? "linear-gradient(135deg, rgba(6, 182, 212, 0.8), rgba(236, 72, 153, 0.8))"
                : "linear-gradient(135deg, rgba(236, 72, 153, 0.8), rgba(139, 92, 246, 0.8))",
            boxShadow: "0 0 15px currentColor",
            willChange: "transform, opacity",
          }}
        />
      ))}
    </motion.div>
  );
});

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const containerRef = useRef(null);
  const photoRef = useRef(null);

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
    () => ({ damping: 30, stiffness: 200, mass: 0.3 }),
    []
  );
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const rotateX = useTransform(y, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-8deg", "8deg"]);

  // Track Hero section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only show buttons when Hero section is significantly visible
        setIsHeroVisible(entry.isIntersecting && entry.intersectionRatio > 0.2);
      },
      {
        threshold: [0, 0.2, 0.5, 1],
        rootMargin: "-50px 0px -50px 0px",
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Magnetic attraction effect for photo
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (photoRef.current) {
        const rect = photoRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        if (distance < 300) {
          const strength = (300 - distance) / 300;
          mouseX.set((distX / rect.width) * strength * 0.3);
          mouseY.set((distY / rect.height) * strength * 0.3);
        } else {
          mouseX.set(0);
          mouseY.set(0);
        }
      }

      setMousePos({ x: e.clientX, y: e.clientY });

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setSpotlightPos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Optimisation du handleMouseMove avec throttling
  const handleMouseMoveThrottled = useThrottledCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = event.clientX - rect.left;
    const mouseYPos = event.clientY - rect.top;
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
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
        gradient: "from-violet-500 to-purple-600",
        hoverGlow: "rgba(139, 92, 246, 0.4)",
      },
      {
        name: "LinkedIn",
        icon: <FaLinkedin className="w-6 h-6" />,
        href: "https://www.linkedin.com/in/ilias-ofir-445b91295/",
        gradient: "from-cyan-500 to-blue-600",
        hoverGlow: "rgba(6, 182, 212, 0.4)",
      },
      {
        name: "Resume",
        icon: (
          <img
            src="/images/readdotcv.png"
            alt="Resume"
            className="w-6 h-6 object-contain"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        ),
        href: "/Resume.pdf",
        gradient: "from-violet-400 to-cyan-400",
        hoverGlow: "rgba(139, 92, 246, 0.4)",
      },
    ],
    []
  );

  return (
    <QuantumBackground
      id="home"
      containerRef={containerRef}
      variant="default"
      className="flex items-center justify-center py-20 px-4 overflow-hidden relative"
    >
      {/* Fixed positioned buttons at left border - only visible when Hero is in view and hidden on mobile */}
      <motion.div
        className="fixed left-0 top-1/3 -translate-y-1/2 flex-col gap-5 z-50 hidden lg:flex"
        animate={{
          opacity: isHeroVisible ? 1 : 0,
          x: isHeroVisible ? 0 : -100,
          pointerEvents: isHeroVisible ? "auto" : "none",
        }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: isHeroVisible ? "auto" : "none" }}
      >
        {socialPlatforms.map((platform, index) => (
          <motion.a
            key={platform.name}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isHeroVisible ? 1 : 0, x: 0 }}
            transition={{ delay: 2 + index * 0.15, duration: 0.6 }}
            whileHover={{ scale: 1.08, x: 8 }}
            whileTap={{ scale: 0.95 }}
            href={platform.href}
            download={platform.name === "Resume"}
            target={platform.name !== "Resume" ? "_blank" : undefined}
            rel={platform.name !== "Resume" ? "noopener noreferrer" : undefined}
            className="group relative overflow-hidden"
            title={platform.name}
          >
            {/* Gradient background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${platform.gradient} opacity-90 rounded-r-2xl`}
            />

            {/* Glass effect overlay */}
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm rounded-r-2xl border-l-0 border-r border-t border-b border-white/20" />

            {/* Hover glow effect */}
            <motion.div
              className="absolute inset-0 rounded-r-2xl opacity-0 group-hover:opacity-100"
              style={{
                background: `radial-gradient(circle at center, ${platform.hoverGlow}, transparent 70%)`,
                boxShadow: `0 0 30px ${platform.hoverGlow}`,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Shimmer effect on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 1,
              }}
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                width: "50%",
              }}
            />

            <div className="relative p-5 flex items-center justify-center">
              <div className="text-white group-hover:scale-110 transition-transform duration-300 w-7 h-7 flex items-center justify-center">
                {platform.icon}
              </div>
            </div>
          </motion.a>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="max-w-7xl w-full relative z-10"
      >
        <div className="flex flex-col md:flex-row-reverse items-center gap-16">
          {/* Integrated Photo - No Card */}
          <motion.div
            ref={photoRef}
            className="relative w-80 h-80 md:w-[400px] md:h-[400px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* Subtle ambient glow only */}
            <motion.div
              className="absolute -inset-12"
              animate={{
                opacity: isHovered ? 0.3 : 0.15,
              }}
              transition={{ duration: 0.5 }}
              style={{
                background:
                  "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)",
                filter: "blur(60px)",
              }}
            />

            {/* Bouncing Tech Logos inside circle background */}
            <div
              className="absolute inset-0 pointer-events-none overflow-hidden rounded-full"
              style={{ zIndex: 1 }}
            >
              {techLogos.map((logo, index) => (
                <BouncingLogo
                  key={logo.name}
                  logo={logo}
                  index={index}
                  circleRadius={180}
                />
              ))}
            </div>

            {
              /* Portrait Container */
              <motion.div className="relative w-full h-full">
                {/* Portrait with circular mask and solid background */}
                <motion.div className="relative w-full h-full overflow-hidden rounded-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                  <motion.img
                    src="/images/Hero_photo.png"
                    alt="Ilias Ofir - Software Engineer"
                    className="w-full h-full object-cover relative z-10"
                    style={{
                      maskImage:
                        "radial-gradient(circle at center, black 35%, transparent 85%)",
                      WebkitMaskImage:
                        "radial-gradient(circle at center, black 35%, transparent 85%)",
                      // Custom "Cyber" filter - Cool tones with enhanced clarity for futuristic look
                      filter:
                        "contrast(1.15) brightness(1.05) saturate(1.1) hue-rotate(-8deg)",
                      willChange: "transform",
                    }}
                  />

                  {/* Cyber-theme overlay - Cool blue/violet tint */}
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none mix-blend-overlay"
                    style={{
                      background:
                        "radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.08), rgba(6, 182, 212, 0.06) 60%, transparent 100%)",
                    }}
                  />

                  {/* Subtle rim lighting */}
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 50%, transparent 60%, rgba(139, 92, 246, 0.1) 85%, rgba(6, 182, 212, 0.15) 100%)",
                    }}
                  />
                </motion.div>

                {/* Enhanced particle system */}
                <ImageParticles isHovered={isHovered} />
              </motion.div>
            }
          </motion.div>

          {/* Enhanced content section with boot sequence */}
          <div className="flex-1 text-center md:text-left relative">
            {/* Data stream visualization */}
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-violet-400 to-transparent hidden md:block"
            />

            {/* Name with gradient and refined typography */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="relative mb-8"
              style={{ fontFamily: '"Syne", sans-serif' }}
            >
              <div className="flex flex-col gap-1">
                <motion.span
                  className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent block tracking-wide"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  ILIAS
                </motion.span>
                <motion.span
                  className="text-7xl md:text-8xl font-extrabold bg-gradient-to-r from-cyan-300 via-violet-400 to-purple-400 bg-clip-text text-transparent block tracking-wider relative"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                  style={{
                    textShadow: "0 0 40px rgba(139, 92, 246, 0.3)",
                    letterSpacing: "0.05em",
                  }}
                >
                  OFIR
                  {/* Animated underline */}
                  <motion.div
                    className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1.8, duration: 1 }}
                  />
                </motion.span>
              </div>

              {/* Glitch effect overlay */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 0.2,
                  repeat: Infinity,
                  repeatDelay: 5,
                }}
                style={{
                  mixBlendMode: "screen",
                  filter: "blur(1px)",
                }}
              >
                <span className="text-7xl md:text-8xl font-extrabold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent block">
                  OFIR
                </span>
              </motion.div>
            </motion.h1>

            {/* Role with typewriter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="mb-8 relative"
            >
              <div className="inline-block relative">
                <motion.div
                  className="absolute -left-3 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 to-cyan-400 rounded-full"
                  animate={{ scaleY: [0, 1] }}
                  transition={{ delay: 1.8, duration: 0.6 }}
                />
                <h2
                  className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-cyan-300 pl-6"
                  style={{ fontFamily: '"Syne", sans-serif' }}
                >
                  <Typewriter
                    options={{
                      strings: [
                        "Software Engineer",
                        "Full-Stack Developer",
                        "Problem Solver",
                        "Code Architect",
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 50,
                      deleteSpeed: 30,
                    }}
                  />
                </h2>
              </div>
            </motion.div>

            {/* Call to action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.8 }}
              className="flex items-center gap-6 text-sm mb-8"
              style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
            >
              <motion.div
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-emerald-400/10 border border-emerald-400/20"
                animate={{
                  boxShadow: [
                    "0 0 10px rgba(52, 211, 153, 0.2)",
                    "0 0 20px rgba(52, 211, 153, 0.4)",
                    "0 0 10px rgba(52, 211, 153, 0.2)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-2 h-2 border-2 border-emerald-400 border-t-transparent rounded-full"
                />
                <span className="text-emerald-400 font-medium">Creating</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-violet-400/10 border border-violet-400/20"
                animate={{
                  boxShadow: [
                    "0 0 10px rgba(139, 92, 246, 0.2)",
                    "0 0 20px rgba(139, 92, 246, 0.4)",
                    "0 0 10px rgba(139, 92, 246, 0.2)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-violet-400 rounded-full"
                />
                <span className="text-violet-400 font-medium">Innovating</span>
              </motion.div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1, duration: 0.8 }}
              className="relative mb-12"
            >
              {/* Decorative accent */}
              <motion.div
                className="absolute -left-6 top-0 w-1.5 h-full bg-gradient-to-b from-violet-500 via-cyan-400 to-purple-500 rounded-full hidden md:block"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 0.6 }}
                transition={{ delay: 2.3, duration: 1, ease: "easeOut" }}
              />

              <motion.p
                className="text-lg md:text-xl text-gray-100/90 leading-relaxed max-w-2xl mx-auto md:mx-0"
                style={{
                  fontFamily: '"IBM Plex Sans", sans-serif',
                  fontWeight: 300,
                }}
              >
                <span className="text-white font-medium">Architecting</span>{" "}
                <span className="relative inline-block">
                  <span className="text-violet-300 font-semibold">
                    elegant solutions
                  </span>
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-violet-400 to-transparent"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 2.5, duration: 0.6 }}
                  />
                </span>{" "}
                with precision and purpose.{" "}
                <span className="relative inline-block">
                  <span className="text-cyan-300 font-semibold">
                    Engineering systems
                  </span>
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 2.7, duration: 0.6 }}
                  />
                </span>{" "}
                that drive innovation and excellence.
              </motion.p>
            </motion.div>

            {/* Trusted by */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8 }}
              className="mt-16 relative"
            >
              {/* Top gradient line */}
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent mb-8"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 2.7, duration: 0.8 }}
              />

              <div className="flex items-center gap-3 mb-8">
                <motion.div
                  className="w-8 h-px bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: 32 }}
                  transition={{ delay: 2.8, duration: 0.5 }}
                />
                <h3
                  className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-cyan-300 uppercase tracking-widest"
                  style={{ fontFamily: '"Syne", sans-serif' }}
                >
                  Trusted By
                </h3>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-10">
                {/* FST Logo */}
                <motion.div
                  whileHover={{ scale: 1.08, y: -3 }}
                  className="relative group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.9, duration: 0.5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-cyan-400/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img
                    src="/images/fst.png"
                    alt="FST"
                    className="w-28 h-20 object-contain transition-all relative z-10"
                    style={{
                      filter: "brightness(0.1) invert(1)",
                    }}
                  />
                </motion.div>

                {/* ONCF Logo */}
                <motion.div
                  whileHover={{ scale: 1.08, y: -3 }}
                  className="relative group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3, duration: 0.5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-cyan-400/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img
                    src="/images/oncf.png"
                    alt="ONCF"
                    className="w-28 h-20 object-contain transition-all relative z-10"
                    style={{
                      filter: "brightness(0.1) invert(1)",
                    }}
                  />
                </motion.div>

                {/* Attijariwafa Bank Logo */}
                <motion.div
                  whileHover={{ scale: 1.08, y: -3 }}
                  className="relative group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.1, duration: 0.5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-cyan-400/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img
                    src="/images/AWB2.png"
                    alt="Attijariwafa Bank"
                    className="w-28 h-20 object-contain transition-all opacity-90 relative z-10"
                    style={{
                      filter: "contrast(1.1) brightness(1.1) saturate(1.2)",
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Mobile Social Buttons - Only visible on mobile/tablet */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2, duration: 0.8 }}
              className="mt-12 flex lg:hidden justify-center gap-4"
            >
              {socialPlatforms.map((platform, index) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 3.3 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href={platform.href}
                    download={platform.name === "Resume"}
                    target={platform.name !== "Resume" ? "_blank" : undefined}
                    rel={
                      platform.name !== "Resume"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group relative overflow-hidden rounded-2xl block"
                    title={platform.name}
                  >
                    {/* Gradient background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${platform.gradient} opacity-90`}
                    />

                    {/* Glass effect overlay */}
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm border border-white/20" />

                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(circle at center, ${platform.hoverGlow}, transparent 70%)`,
                        boxShadow: `0 0 30px ${platform.hoverGlow}`,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className="relative p-4 flex items-center justify-center">
                      <div className="text-white group-hover:scale-110 transition-transform duration-300 w-6 h-6 flex items-center justify-center">
                        {platform.icon}
                      </div>
                    </div>
                  </a>
                </motion.div>
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
