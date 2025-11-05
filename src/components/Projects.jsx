import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  memo,
} from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import QuantumBackground from "./QuantumBackground";

// Quantum-inspired Tech Tag with holographic effect
const TechTag = memo(({ tech, index }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.05 }}
    className="px-3 py-1.5 text-xs font-semibold backdrop-blur-md bg-gradient-to-r from-violet-500/20 to-cyan-500/20 text-violet-200 rounded-lg border border-violet-400/30 hover:border-violet-400/60 transition-all duration-300 cursor-default"
    whileHover={{
      scale: 1.05,
      backgroundColor: "rgba(139, 92, 246, 0.3)",
      boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)",
    }}
  >
    {tech}
  </motion.span>
));

// Neural Network GitHub Button
const GitHubButton = memo(({ githubUrl }) => (
  <motion.a
    href={githubUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl backdrop-blur-xl bg-gradient-to-r from-violet-600/20 to-cyan-600/20 border border-violet-400/30 text-white font-semibold overflow-hidden"
    whileHover={{ scale: 1.05, borderColor: "rgba(139, 92, 246, 0.6)" }}
    whileTap={{ scale: 0.98 }}
  >
    {/* Animated background pulse */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-violet-500/30 to-cyan-500/0"
      animate={{
        x: ["-100%", "100%"],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "linear",
      }}
    />

    <svg
      className="w-5 h-5 relative z-10"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>

    <span className="relative z-10">View Source</span>

    <motion.svg
      className="w-4 h-4 relative z-10"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      animate={{ x: [0, 3, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </motion.svg>
  </motion.a>
));

// Holographic Progress Indicator
const ProgressIndicator = memo(
  ({ index, projectIndex, onPageChange, totalProjects }) => {
    const isActive = index === projectIndex;

    return (
      <motion.button
        className="group relative"
        onClick={() => onPageChange(index)}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        aria-label={`Go to project ${index + 1}`}
        style={{
          minWidth: "32px",
          minHeight: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Outer glow ring */}
        <motion.div
          className={`absolute inset-0 rounded-full ${
            isActive ? "bg-violet-500/30" : "bg-white/10"
          } blur-md`}
          animate={isActive ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Main dot */}
        <div
          className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
            isActive
              ? "bg-gradient-to-r from-violet-400 to-cyan-400"
              : "bg-white/30 group-hover:bg-white/50"
          }`}
        />

        {/* Active indicator ring */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-violet-400"
            animate={{ scale: [1, 1.6, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>
    );
  }
);

// Quantum Navigation Button with neural network effect
const NavigationButton = memo(({ direction, onClick, children }) => {
  const isLeft = direction === "left";

  return (
    <motion.button
      className="absolute top-1/2 p-3 sm:p-4 rounded-xl backdrop-blur-xl bg-gradient-to-r from-violet-600/20 to-cyan-600/20 border border-violet-400/30 hover:border-violet-400/60 z-50 transition-all duration-300 overflow-hidden touch-manipulation select-none"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      layout={false}
      style={{
        [isLeft ? "left" : "right"]: "5rem",
        transform: "translateY(-50%)",
        minWidth: "48px",
        minHeight: "48px",
        willChange: "transform",
        pointerEvents: "auto",
      }}
    >
      {/* Animated background pulse */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-violet-500/30 to-cyan-500/0"
        animate={{
          x: isLeft ? ["100%", "-100%"] : ["-100%", "100%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="relative z-10">{children}</div>
    </motion.button>
  );
});

const Projects = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);

  // Ajouter les styles pour les scrollbars
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .scrollbar-thin {
        scrollbar-width: thin;
      }
      .scrollbar-track-transparent {
        scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
      }
      .scrollbar-thumb-white\\/20 {
        /* Webkit browsers */
      }
      .scrollbar-thin::-webkit-scrollbar {
        width: 4px;
        height: 4px;
      }
      .scrollbar-track-transparent::-webkit-scrollbar-track {
        background: transparent;
      }
      .scrollbar-thumb-white\\/20::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 2px;
      }
      .scrollbar-thumb-white\\/20::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.4);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Mémorisation de la configuration du spring
  const springConfig = useMemo(() => ({ stiffness: 100, damping: 30 }), []);

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.9, 1],
    [0.8, 1, 1, 0.8]
  );

  // Mémorisation des projets
  const projects = useMemo(
    () => [
      {
        title: "ChatWithMe",
        period: "2025",
        description: "Real-Time Chat Web App",
        details:
          "Built a real-time messaging platform for seamless communication. Implemented WebSockets for instant message updates.",
        tech: ["BaaS", "React.js", "Firebase", "FireStore", "TailwindCSS"],
        image: "/images/project5.png",
        github: "https://github.com/iliasofir/ChatWithMeV2",
        color: "from-cyan-500 to-blue-600",
        bgAccent: "bg-blue-500/20",
        accentColor: "rgb(59, 130, 246)",
      },
      {
        title: "Recruiting Agency App",
        period: "2024",
        description: "JavaFX Desktop Application",
        details:
          "Designed a multi-client recruitment platform for companies and job seekers. Enabled job postings and interactive journals.",
        tech: ["JavaFX", "MySQL", "IntelliJ IDEA"],
        image: "/images/project1.jpeg",
        github: "https://github.com/AhmedDevST/AgenceRecrutement",
        color: "from-emerald-400 to-teal-600",
        bgAccent: "bg-emerald-500/20",
        accentColor: "rgb(16, 185, 129)",
      },
      {
        title: ".IO ASSISTANT",
        period: "2025",
        description: "My Personal Assistant",
        details:
          "Developed a personal assistant using the AI model Qwen/Qwen2-VL-7B-Instruct for text and image processing. Integrated with a web app for seamless interaction.",
        tech: [
          "Python",
          "FastAPI",
          "React.js",
          "HuggingFaces",
          "Inference API",
          "Qwen/Qwen2-VL-7B-Instruct",
        ],
        image: "/images/io_assistant.png",
        github: "https://github.com/iliasofir/.IO_Assistant",
        color: "from-violet-500 to-purple-600",

        bgAccent: "bg-purple-500/20",
        accentColor: "rgb(168, 90, 134)",
      },
      {
        title: "KOURAZONE",
        period: "2025",
        description: "Sport Field Booking App",
        details:
          "Developed a mobile app for booking sport fields with real-time availability and payment integration.",
        tech: ["Flutter", "Laravel", "MySQL", "Material-UI"],
        image: "/images/KouraZone.png",
        github: "https://github.com/AhmedDevST/play-match-reservation",
        color: "from-amber-400 to-blue-600",
        bgAccent: "bg-red-500/20",
        accentColor: "rgb(16, 185, 129)",
      },
      {
        title: "DevOps CI/CD Pipeline with Spring Boot, Railway & UptimeRobot",
        period: "2025",
        description: "DevOps CI/CD Pipeline",
        details:
          "Implemented a CI/CD pipeline for a Spring Boot application using Railway for deployment and UptimeRobot for monitoring.",
        tech: ["Spring Boot", "Railway", "UptimeRobot", "Docker", "CI/CD"],
        image: "/images/projectOPS.png",
        github:
          "https://github.com/iliasofir/DevOps-CI-CD-Pipeline-with-Spring-Boot-Railway-UptimeRobot",
        color: "from-amber-400 to-orange-600",
        bgAccent: "bg-amber-500/20",
        accentColor: "rgb(16, 185, 129)",
      },
            {
        title: "PORTFOLIO WEBSITE",
        period: "2025",
        description: "Personal Portfolio Website",
        details:
          "Developed a personal portfolio website to showcase my projects and skills. Implemented a responsive design with modern UI/UX principles.",
        tech: ["React.js", "TailwindCSS", "NETLIFY", "Framer Motion"],
        image: "/images/Portfolio.png",
        github:
          "https://github.com/iliasofir/Portfolio2025",
        color: "from-amber-400 to-orange-600",
        bgAccent: "bg-amber-200/20",
        accentColor: "rgb(16, 185, 120)",
      },
    ],
    []
  );

  // Mémorisation des variantes d'animation
  const variants = useMemo(
    () => ({
      enter: (direction) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.95,
      }),
      center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1,
      },
      exit: (direction) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.95,
      }),
    }),
    []
  );

  // Fonctions optimisées avec useCallback
  const swipePower = useCallback((offset, velocity) => {
    return Math.abs(offset) * velocity;
  }, []);

  const wrap = useCallback((min, max, v) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
  }, []);

  const paginate = useCallback(
    (newDirection) => {
      setPage([page + newDirection, newDirection]);
    },
    [page]
  );

  const swipeConfidenceThreshold = 10000;
  const projectIndex = wrap(0, projects.length, page);

  const handlePageChange = useCallback(
    (index) => {
      const newDirection = index - projectIndex;
      setPage([index, newDirection]);
      setIsPaused(true);
      setTimeout(() => setIsPaused(false), 3000);
    },
    [projectIndex, setPage]
  );

  const handleNavigation = useCallback(
    (direction) => {
      if (!isDragging) {
        paginate(direction);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 3000);
      }
    },
    [isDragging, paginate]
  );

  // Auto-scroll effect optimisé
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        paginate(1);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused, page, paginate]);

  return (
    <QuantumBackground
      id="projects"
      containerRef={containerRef}
      variant="green"
      className="py-20"
    >
      <motion.div
        className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8"
        style={{
          opacity: useSpring(opacity, springConfig),
          scale: useSpring(scale, springConfig),
          willChange: "transform, opacity",
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 flex justify-center items-center -z-10"
        >
          <div className="w-full h-24 bg-gradient-to-r from-transparent via-violet-500/20 to-transparent blur-2xl rounded-full" />
        </motion.div>

        <motion.h2
          className="text-5xl md:text-7xl font-black relative text-center"
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
            Featured Projects
          </span>
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "60%" }}
          transition={{ duration: 2, delay: 0.5 }}
          className="h-0.5 bg-gradient-to-r from-transparent via-violet-400 to-transparent mx-auto mt-6 rounded-full"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-gray-300 text-lg font-light max-w-2xl mx-auto text-center"
        >
          A portfolio of deployed full-stack applications, integrating modern
          frameworks with cloud infrastructure for scalable solutions.
        </motion.p>
      </motion.div>

      <motion.div
        className="relative h-[580px] sm:h-[620px] md:h-[600px] lg:h-[650px] overflow-hidden rounded-2xl"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ willChange: "transform, opacity" }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragStart={() => {
              setIsDragging(true);
              setIsPaused(true);
            }}
            onDragEnd={(e, { offset, velocity }) => {
              setIsDragging(false);
              setIsPaused(false);
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full h-full flex items-center justify-center"
            style={{ willChange: "transform, opacity" }}
          >
            <motion.div
              className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              {/* Quantum Card with Neural Network Border */}
              <div className="relative h-[500px] sm:h-[520px] md:h-[480px] lg:h-[500px] rounded-3xl overflow-hidden backdrop-blur-2xl bg-gradient-to-br from-violet-950/30 via-purple-900/20 to-cyan-950/30 border-2 border-violet-500/30 shadow-2xl group">
                {/* Animated border glow */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(139, 92, 246, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.1)",
                      "0 0 40px rgba(139, 92, 246, 0.5), inset 0 0 40px rgba(139, 92, 246, 0.2)",
                      "0 0 20px rgba(139, 92, 246, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.1)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                <div className="relative h-full grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 p-4 sm:p-6 lg:p-8">
                  {/* Project Image with Holographic Effect */}
                  <motion.div
                    className="lg:col-span-7 relative rounded-2xl overflow-hidden aspect-[16/9] group/image"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Neural network overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 via-violet-500/10 to-cyan-500/0 opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 z-10" />

                    <img
                      src={projects[projectIndex].image}
                      alt={projects[projectIndex].title}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover/image:scale-105"
                    />

                    {/* Quantum gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-violet-950/90 via-purple-900/40 to-transparent" />

                    {/* Holographic corner accent */}
                    <motion.div
                      className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/30 to-transparent blur-2xl"
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </motion.div>

                  {/* Project Info with Quantum Styling */}
                  <div className="lg:col-span-5 flex flex-col py-2 sm:py-4 h-full">
                    <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-violet-500/30 hover:scrollbar-thumb-violet-500/50 pr-3 space-y-4">
                      {/* Title & Period with Glow */}
                      <motion.div
                        className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <motion.h3
                          className="text-2xl sm:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-200 to-cyan-200 leading-tight break-words min-w-0 flex-1"
                          animate={{
                            textShadow: [
                              "0 0 10px rgba(139, 92, 246, 0.3)",
                              "0 0 20px rgba(139, 92, 246, 0.5)",
                              "0 0 10px rgba(139, 92, 246, 0.3)",
                            ],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {projects[projectIndex].title}
                        </motion.h3>

                        <motion.div
                          className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl backdrop-blur-md bg-gradient-to-r from-violet-500/30 to-cyan-500/30 border border-violet-400/40 text-xs sm:text-sm font-semibold text-violet-100 whitespace-nowrap self-start sm:self-auto flex-shrink-0"
                          whileHover={{
                            scale: 1.05,
                            borderColor: "rgba(139, 92, 246, 0.6)",
                          }}
                        >
                          {projects[projectIndex].period}
                        </motion.div>
                      </motion.div>

                      {/* Description with quantum styling */}
                      <motion.p
                        className="text-base sm:text-lg text-gray-100 font-medium leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {projects[projectIndex].description}
                      </motion.p>

                      <motion.p
                        className="text-sm sm:text-base text-gray-300 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                      >
                        {projects[projectIndex].details}
                      </motion.p>
                    </div>

                    {/* Tech Stack & GitHub Button */}
                    <div className="mt-4 pt-4 space-y-3 flex-shrink-0 border-t border-violet-500/20">
                      <motion.div
                        className="flex flex-wrap gap-2 max-h-20 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-violet-500/30"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                      >
                        {projects[projectIndex].tech.map((tech, idx) => (
                          <TechTag key={tech} tech={tech} index={idx} />
                        ))}
                      </motion.div>

                      {/* GitHub Button */}
                      <motion.div
                        className="flex justify-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                      >
                        <GitHubButton
                          githubUrl={projects[projectIndex].github}
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons - Left */}
        <NavigationButton direction="left" onClick={() => handleNavigation(-1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </NavigationButton>

        {/* Navigation buttons - Right */}
        <NavigationButton direction="right" onClick={() => handleNavigation(1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </NavigationButton>

        {/* Holographic Progress Indicators */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center z-20">
          <motion.div
            className="flex items-center gap-4 px-6 py-3 rounded-full backdrop-blur-xl bg-gradient-to-r from-violet-950/50 to-cyan-950/50 border border-violet-500/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {/* Animated background glow */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/0 via-violet-500/20 to-cyan-500/0"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {projects.map((_, index) => (
              <ProgressIndicator
                key={index}
                index={index}
                projectIndex={projectIndex}
                onPageChange={handlePageChange}
                totalProjects={projects.length}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </QuantumBackground>
  );
};

export default Projects;
