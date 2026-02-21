import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  memo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuantumBackground from "./QuantumBackground";
import { useInView } from "../hooks/useScrollAnimations";
import "../styles/animations.css";

// Quantum-inspired Tech Tag with holographic effect
const TechTag = memo(({ tech, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="px-3 py-1.5 text-xs font-semibold backdrop-blur-md bg-gradient-to-r from-violet-500/20 to-cyan-500/20 text-violet-200 rounded-lg border border-violet-400/30 hover:border-violet-400/60 transition-all duration-300 cursor-default hover-scale"
      style={{
        opacity: 0,
        animation: `fadeIn 0.3s ease forwards ${index * 0.05}s`,
        transform: isHovered ? "scale(1.05)" : "scale(1)",
        backgroundColor: isHovered ? "rgba(139, 92, 246, 0.3)" : undefined,
        boxShadow: isHovered ? "0 0 20px rgba(139, 92, 246, 0.4)" : undefined,
      }}
    >
      {tech}
    </span>
  );
});

// Neural Network GitHub Button
const GitHubButton = memo(({ githubUrl }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  return (
    <a
      href={githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl backdrop-blur-xl bg-gradient-to-r from-violet-600/20 to-cyan-600/20 border border-violet-400/30 text-white font-semibold overflow-hidden transition-all duration-300"
      style={{
        transform: isActive
          ? "scale(0.98)"
          : isHovered
          ? "scale(1.05)"
          : "scale(1)",
        borderColor: isHovered ? "rgba(139, 92, 246, 0.6)" : undefined,
      }}
    >
      {/* Animated background pulse */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-violet-500/30 to-cyan-500/0"
        style={{
          animation: "slideRight 2s linear infinite",
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

      <svg
        className="w-4 h-4 relative z-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        style={{
          animation: "arrowMove 1.5s ease-in-out infinite",
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>

      <style>{`
        @keyframes slideRight {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes arrowMove {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(3px); }
        }
      `}</style>
    </a>
  );
});

// Holographic Progress Indicator
const ProgressIndicator = memo(
  ({ index, projectIndex, onPageChange, totalProjects }) => {
    const isActive = index === projectIndex;
    const [isHovered, setIsHovered] = useState(false);

    return (
      <button
        className="group relative"
        onClick={() => onPageChange(index)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={`Go to project ${index + 1}`}
        style={{
          minWidth: "32px",
          minHeight: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: isHovered ? "scale(1.2)" : "scale(1)",
          transition: "transform 0.3s ease",
        }}
      >
        {/* Outer glow ring */}
        <div
          className={`absolute inset-0 rounded-full ${
            isActive ? "bg-violet-500/30" : "bg-white/10"
          } blur-md`}
          style={{
            animation: isActive ? "pulse 2s ease-in-out infinite" : "none",
          }}
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
          <div
            className="absolute inset-0 rounded-full border-2 border-violet-400"
            style={{
              animation: "ringPulse 2s ease-in-out infinite",
            }}
          />
        )}

        <style>{`
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.3); }
          }
          @keyframes ringPulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.6); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </button>
    );
  }
);

// Quantum Navigation Button with neural network effect
const NavigationButton = memo(({ direction, onClick, children }) => {
  const isLeft = direction === "left";
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      className="absolute top-1/2 p-3 sm:p-4 rounded-xl backdrop-blur-xl bg-gradient-to-r from-violet-600/20 to-cyan-600/20 border border-violet-400/30 hover:border-violet-400/60 z-50 transition-all duration-300 overflow-hidden touch-manipulation select-none"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      style={{
        [isLeft ? "left" : "right"]: "5rem",
        transform: `translateY(-50%) scale(${
          isActive ? 0.98 : isHovered ? 1.05 : 1
        })`,
        minWidth: "48px",
        minHeight: "48px",
        willChange: "transform",
        pointerEvents: "auto",
      }}
    >
      {/* Animated background pulse */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-violet-500/30 to-cyan-500/0"
        style={{
          animation: isHovered
            ? isLeft
              ? "slideLeft 2s linear infinite"
              : "slideRight 2s linear infinite"
            : "none",
        }}
      />

      <div className="relative z-10">{children}</div>

      <style>{`
        @keyframes slideLeft {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes slideRight {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </button>
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

  // Use Intersection Observer instead of scroll-based transforms
  const { ref: sectionRef, hasBeenInView } = useInView({ threshold: 0.1 });

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
        title: "Joblink press - Hiring Agency App",
        period: "2024",
        description: "JavaFX Desktop Application",
        details:
          "Designed a multi-client recruitment platform for companies and job seekers. Enabled job postings and interactive journals.",
        tech: ["JavaFX", "MySQL", "IntelliJ IDEA"],
        image: "/images/Joblink_press.png",
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
        github: "https://github.com/iliasofir/Portfolio2025",
        color: "from-amber-400 to-orange-600",
        bgAccent: "bg-amber-200/20",
        accentColor: "rgb(16, 185, 120)",
      },
      {
        title: "Ntlakaw – Event Management & Booking Platform",
        period: "2025",
        description: "Web-based Event Management System",
        details:
          "Designed a multi-client event management platform for companies and customers. Enabled event creation, booking, and payment processing.",
        tech: ["Spring Boot", "React.js", "MySQL", "Stripe API", "Chakra-UI"],
        image: "/images/Ntlakaw.png",
        github: "https://github.com/AhmedDevST/Ntlakaw",
        color: "from-emerald-400 to-teal-600",
        bgAccent: "bg-emerald-500/20",
        accentColor: "rgb(16, 185, 129)",
      },
      {
        title: "LogGuard",
        period: "2025",
        description: "AI-Powered Log Anomaly Detection System",
        details:
          "Designed an AI-powered system to detect anomalies in system logs. Implemented machine learning models for log analysis and pattern recognition.",
        tech: ["SpringBoot", "FastAPI", "NextJs", "TimeScaleDB","Grafana", "Docker"],
        image: "/images/LogGuard.png",
        github: "https://github.com/iliasofir/smart-log-anomaly-java",
        color: "from-emerald-400 to-teal-600",
        bgAccent: "bg-emerald-500/20",
        accentColor: "rgb(16, 185, 129)",
      }
    
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
      <div
        ref={sectionRef}
        className={`max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-800 ${
          hasBeenInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{ willChange: "transform, opacity" }}
      >
        <div
          className="absolute inset-0 flex justify-center items-center -z-10"
          style={{
            animation: "quantum-pulse 4s ease-in-out infinite",
          }}
        >
          <div className="w-full h-24 bg-gradient-to-r from-transparent via-violet-500/20 to-transparent blur-2xl rounded-full" />
        </div>

        <h2
          className="text-5xl md:text-7xl font-black relative text-center"
          style={{
            animation: "textGlow 3s ease-in-out infinite",
          }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-200 to-cyan-200">
            Featured Projects
          </span>
        </h2>

        <div
          className={`h-0.5 bg-gradient-to-r from-transparent via-violet-400 to-transparent mx-auto mt-6 rounded-full transition-all duration-1000 ${
            hasBeenInView ? "w-3/5 opacity-100" : "w-0 opacity-0"
          }`}
          style={{ transitionDelay: "500ms" }}
        />

        <p
          className={`mt-6 text-gray-300 text-lg font-light max-w-2xl mx-auto text-center transition-opacity duration-1000 ${
            hasBeenInView ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          A portfolio of deployed full-stack applications, integrating modern
          frameworks with cloud infrastructure for scalable solutions.
        </p>

        <style>{`
          @keyframes quantum-pulse {
            0%, 100% { transform: scale(1); opacity: 0.4; }
            50% { transform: scale(1.1); opacity: 0.7; }
          }
          @keyframes textGlow {
            0%, 100% { text-shadow: 0 0 20px rgba(139, 92, 246, 0.5); }
            50% { text-shadow: 0 0 40px rgba(139, 92, 246, 0.8); }
          }
        `}</style>
      </div>

      <div
        className={`relative h-[580px] sm:h-[620px] md:h-[600px] lg:h-[650px] overflow-hidden rounded-2xl transition-all duration-800 ${
          hasBeenInView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
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
              className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-4 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Quantum Card with Neural Network Border */}
              <div
                className="relative h-[500px] sm:h-[520px] md:h-[480px] lg:h-[500px] rounded-3xl overflow-hidden backdrop-blur-lg bg-gradient-to-br from-violet-950/30 via-purple-900/20 to-cyan-950/30 border-2 border-violet-500/30 shadow-2xl group hover-scale-sm"
                style={{ animation: "borderGlow 3s ease-in-out infinite" }}
              >
                <div className="relative h-full grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 p-4 sm:p-6 lg:p-8">
                  {/* Project Image with Holographic Effect */}
                  <div className="lg:col-span-7 relative rounded-2xl overflow-hidden aspect-[16/9] group/image transition-transform duration-300 hover:scale-[1.02]">
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
                    <div
                      className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/30 to-transparent blur-2xl"
                      style={{
                        animation: "pulse-glow 3s ease-in-out infinite",
                      }}
                    />
                  </div>

                  {/* Project Info with Quantum Styling */}
                  <div className="lg:col-span-5 flex flex-col py-2 sm:py-4 h-full">
                    <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-violet-500/30 hover:scrollbar-thumb-violet-500/50 pr-3 space-y-4">
                      {/* Title & Period with Glow */}
                      <div
                        className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3"
                        style={{
                          opacity: 0,
                          animation: "fadeInUp 0.4s ease forwards",
                        }}
                      >
                        <h3
                          className="text-2xl sm:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-200 to-cyan-200 leading-tight break-words min-w-0 flex-1"
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            animation: "textGlow 2s ease-in-out infinite",
                          }}
                        >
                          {projects[projectIndex].title}
                        </h3>

                        <div className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl backdrop-blur-md bg-gradient-to-r from-violet-500/30 to-cyan-500/30 border border-violet-400/40 text-xs sm:text-sm font-semibold text-violet-100 whitespace-nowrap self-start sm:self-auto flex-shrink-0 hover-scale transition-all duration-300">
                          {projects[projectIndex].period}
                        </div>
                      </div>

                      {/* Description with quantum styling */}
                      <p
                        className="text-base sm:text-lg text-gray-100 font-medium leading-relaxed"
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          opacity: 0,
                          animation: "fadeIn 0.4s ease forwards 0.2s",
                        }}
                      >
                        {projects[projectIndex].description}
                      </p>

                      <p
                        className="text-sm sm:text-base text-gray-300 leading-relaxed"
                        style={{
                          opacity: 0,
                          animation: "fadeIn 0.4s ease forwards 0.3s",
                        }}
                      >
                        {projects[projectIndex].details}
                      </p>
                    </div>

                    {/* Tech Stack & GitHub Button */}
                    <div className="mt-4 pt-4 space-y-3 flex-shrink-0 border-t border-violet-500/20">
                      <div
                        className="flex flex-wrap gap-2 max-h-20 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-violet-500/30"
                        style={{
                          opacity: 0,
                          animation: "fadeInUp 0.4s ease forwards 0.4s",
                        }}
                      >
                        {projects[projectIndex].tech.map((tech, idx) => (
                          <TechTag key={tech} tech={tech} index={idx} />
                        ))}
                      </div>

                      {/* GitHub Button */}
                      <div
                        style={{
                          opacity: 0,
                          animation: "fadeInUp 0.4s ease forwards 0.5s",
                        }}
                      >
                        <GitHubButton
                          githubUrl={projects[projectIndex].github}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <style>{`
                  @keyframes borderGlow {
                    0%, 100% {
                      box-shadow: 0 0 20px rgba(139, 92, 246, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.1);
                    }
                    50% {
                      box-shadow: 0 0 40px rgba(139, 92, 246, 0.5), inset 0 0 40px rgba(139, 92, 246, 0.2);
                    }
                  }
                  @keyframes pulse-glow {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(1.2); }
                  }
                  @keyframes fadeInUp {
                    from {
                      opacity: 0;
                      transform: translateY(20px);
                    }
                    to {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }
                `}</style>
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
          <div
            className="flex items-center gap-4 px-6 py-3 rounded-full backdrop-blur-xl bg-gradient-to-r from-violet-950/50 to-cyan-950/50 border border-violet-500/30"
            style={{
              opacity: 0,
              animation: "fadeInUp 0.5s ease forwards 0.6s",
            }}
          >
            {/* Animated background glow */}
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/0 via-violet-500/20 to-cyan-500/0"
              style={{
                animation: "slideRight 3s linear infinite",
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

            <style>{`
              @keyframes slideRight {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
              }
            `}</style>
          </div>
        </div>
      </div>
    </QuantumBackground>
  );
};

export default Projects;
