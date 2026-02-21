import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  memo,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "../../hooks/useScrollAnimations";

// Quantum-inspired Tech Tag mobile with holographic effect
const TechTagMobile = memo(({ tech, index }) => (
  <span
    className="px-2.5 py-1 text-xs font-semibold backdrop-blur-md bg-gradient-to-r from-violet-500/20 to-cyan-500/20 text-violet-200 rounded-lg border border-violet-400/30 hover:border-violet-400/60 transition-all duration-300 cursor-default hover:scale-105 hover:bg-violet-500/30 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] animate-fadeIn"
    style={{ animationDelay: `${index * 50}ms` }}
  >
    {tech}
  </span>
));

// Neural Network GitHub Button mobile
const GitHubButtonMobile = memo(({ githubUrl }) => (
  <a
    href={githubUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative inline-flex items-center gap-1.5 px-4 py-2 rounded-lg backdrop-blur-xl bg-gradient-to-r from-violet-600/20 to-cyan-600/20 border border-violet-400/30 text-white text-xs font-semibold overflow-hidden hover:scale-105 hover:border-violet-400/60 active:scale-[0.98] transition-all duration-300"
  >
    {/* Animated background pulse */}
    <div className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-violet-500/30 to-cyan-500/0 animate-shimmer" />

    <svg
      className="w-4 h-4 relative z-10"
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
      className="w-3 h-3 relative z-10 group-hover:translate-x-1 transition-transform duration-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  </a>
));

// Holographic Progress Indicator mobile
const ProgressIndicatorMobile = memo(
  ({ index, projectIndex, onPageChange, totalProjects }) => {
    const isActive = index === projectIndex;

    return (
      <button
        className="group relative hover:scale-120 active:scale-90 transition-transform duration-300"
        onClick={() => onPageChange(index)}
        aria-label={`Go to project ${index + 1}`}
        style={{
          minWidth: "28px",
          minHeight: "28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Outer glow ring */}
        <div
          className={`absolute inset-0 rounded-full blur-md transition-all duration-300 ${
            isActive ? "bg-violet-500/30 animate-pulse" : "bg-white/10"
          }`}
        />

        {/* Main dot */}
        <div
          className={`relative w-2.5 h-2.5 rounded-full transition-all duration-300 ${
            isActive
              ? "bg-gradient-to-r from-violet-400 to-cyan-400"
              : "bg-white/30 group-hover:bg-white/50"
          }`}
        />

        {/* Active indicator ring */}
        {isActive && (
          <div className="absolute inset-0 rounded-full border-2 border-violet-400 animate-ping" />
        )}
      </button>
    );
  }
);

// Quantum Navigation Button mobile with neural network effect
const NavigationButtonMobile = memo(({ direction, onClick, children }) => {
  const isLeft = direction === "left";

  return (
    <button
      className="absolute top-1/2 p-3 rounded-xl backdrop-blur-xl bg-gradient-to-r from-violet-600/20 to-cyan-600/20 border border-violet-400/30 hover:border-violet-400/60 z-30 transition-all duration-300 overflow-hidden touch-manipulation select-none hover:scale-105 active:scale-[0.98]"
      onClick={onClick}
      style={{
        [isLeft ? "left" : "right"]: "0.5rem",
        transform: "translateY(-50%)",
        minWidth: "40px",
        minHeight: "40px",
        willChange: "transform",
        pointerEvents: "auto",
      }}
    >
      {/* Animated background pulse */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-violet-500/30 to-cyan-500/0 animate-shimmer"
        style={{ animationDirection: isLeft ? "reverse" : "normal" }}
      />

      <div className="relative z-10">{children}</div>
    </button>
  );
});

const ProjectsMobile = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const { ref: sectionRef, hasBeenInView } = useInView({ threshold: 0.2 });

  // Mémorisation des projets
  const projects = useMemo(
    () => [
      {
        title: "ChatWithMe",
        period: "2025",
        description: "Real-Time Chat Web App",
        details:
          "Built a real-time messaging platform for seamless communication. Implemented WebSockets for instant message updates.",
        tech: ["React.js", "Firebase", "TailwindCSS"],
        image: "/images/project5.png",
        github: "https://github.com/iliasofir/ChatWithMeV2",
        color: "from-cyan-500 to-blue-600",
        bgAccent: "bg-blue-500/20",
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
      },

      {
        title: ".IO ASSISTANT",
        period: "2025",
        description: "My Personal Assistant",
        details:
          "Developed a personal assistant using the AI model Qwen/Qwen2-VL-7B-Instruct for text and image processing. Integrated with a web app for seamless interaction.",
        tech: ["Python", "FastAPI", "React.js", "AI"],
        image: "/images/io_assistant.png",
        github: "https://github.com/iliasofir/.IO_Assistant",
        color: "from-violet-500 to-purple-600",
        bgAccent: "bg-purple-500/20",
      },
      {
        title: "KOURAZONE",
        period: "2025",
        description: "Sport Field Booking App",
        details:
          "Developed a mobile app for booking sport fields with real-time availability and payment integration.",
        tech: ["Flutter", "Laravel", "MySQL"],
        image: "/images/KouraZone.png",
        github: "https://github.com/AhmedDevST/play-match-reservation",
        color: "from-amber-400 to-blue-600",
        bgAccent: "bg-red-500/20",
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
      }
    
    ],
    []
  );

  // Mémorisation des variantes d'animation
  const variants = useMemo(
    () => ({
      enter: (direction) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
        scale: 0.9,
      }),
      center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1,
      },
      exit: (direction) => ({
        zIndex: 0,
        x: direction < 0 ? 300 : -300,
        opacity: 0,
        scale: 0.9,
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

  const swipeConfidenceThreshold = 5000;
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
    <div
      id="projects-mobile"
      className="relative min-h-screen py-16"
      ref={containerRef}
    >
      <div
        ref={sectionRef}
        className={`max-w-full mx-auto px-3 transition-all duration-1000 ${
          hasBeenInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{ willChange: "transform, opacity" }}
      >
        <h2 className="text-5xl md:text-7xl font-black relative text-center animate-textGlow">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-200 to-cyan-200">
            Projects
          </span>
        </h2>

        <div
          className="h-0.5 bg-gradient-to-r from-transparent via-violet-400 to-transparent mx-auto mt-4 rounded-full animate-expand"
          style={{ animationDelay: "300ms" }}
        />

        <p
          className="mt-4 text-gray-300 text-base font-light max-w-sm mx-auto mb-24 text-center animate-fadeIn"
          style={{ animationDelay: "600ms" }}
        >
          A portfolio of deployed full-stack applications, integrating modern
          frameworks with cloud infrastructure for scalable solutions.{" "}
        </p>

        <div
          className="relative h-[600px] overflow-hidden rounded-xl mx-2"
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          style={{ willChange: "transform, opacity" }}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
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
                scale: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
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
              className="absolute w-full h-full flex items-center justify-center px-10"
              style={{ willChange: "transform, opacity" }}
            >
              <div
                className="w-full max-w-sm mx-auto hover:scale-[1.01] transition-transform duration-300"
                style={{ willChange: "transform" }}
              >
                {/* Quantum Card with Neural Network Border */}
                <div className="relative rounded-2xl overflow-hidden backdrop-blur-lg bg-gradient-to-br from-violet-950/30 via-purple-900/20 to-cyan-950/30 border-2 border-violet-500/30 shadow-2xl flex flex-col h-[540px]">
                  {/* Animated border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    animate={{
                      boxShadow: [
                        "0 0 15px rgba(139, 92, 246, 0.3), inset 0 0 15px rgba(139, 92, 246, 0.1)",
                        "0 0 30px rgba(139, 92, 246, 0.5), inset 0 0 30px rgba(139, 92, 246, 0.2)",
                        "0 0 15px rgba(139, 92, 246, 0.3), inset 0 0 15px rgba(139, 92, 246, 0.1)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  {/* Project Image with Holographic Effect */}
                  <div className="relative h-44 flex-shrink-0 overflow-hidden flex items-center justify-center group/image">
                    {/* Neural network overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 via-violet-500/10 to-cyan-500/0 opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 z-10" />

                    <img
                      src={projects[projectIndex].image}
                      alt={projects[projectIndex].title}
                      className="object-contain w-full h-full transition-transform duration-500 group-hover/image:scale-105"
                    />

                    {/* Quantum gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-violet-950/90 via-purple-900/40 to-transparent" />

                    {/* Period badge */}
                    <div className="absolute top-3 right-3 px-3 py-1.5 rounded-lg backdrop-blur-md bg-gradient-to-r from-violet-500/30 to-cyan-500/30 border border-violet-400/40 text-xs font-semibold text-violet-100 hover:scale-105 transition-transform duration-300">
                      {projects[projectIndex].period}
                    </div>

                    {/* Holographic corner accent */}
                    <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-cyan-400/30 to-transparent blur-2xl animate-pulse" />
                  </div>

                  {/* Project Content */}
                  <div className="relative p-4 flex flex-col flex-1 min-h-0">
                    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-violet-500/30 space-y-2.5 pr-2">
                      {/* Title with Glow */}
                      <h3
                        className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-200 to-cyan-200 leading-tight break-words min-w-0 animate-textGlow"
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {projects[projectIndex].title}
                      </h3>

                      {/* Description */}
                      <p
                        className="text-sm text-gray-100 font-medium leading-relaxed animate-fadeIn"
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          animationDelay: "100ms",
                        }}
                      >
                        {projects[projectIndex].description}
                      </p>

                      {/* Details */}
                      <p
                        className="text-xs text-gray-300 leading-relaxed animate-fadeIn"
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          animationDelay: "200ms",
                        }}
                      >
                        {projects[projectIndex].details}
                      </p>
                    </div>

                    {/* Tech Stack & GitHub Button */}
                    <div className="mt-3 pt-3 space-y-2.5 flex-shrink-0 border-t border-violet-500/20">
                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-1.5 max-h-16 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-violet-500/30">
                        {projects[projectIndex].tech.map((tech, idx) => (
                          <TechTagMobile key={tech} tech={tech} index={idx} />
                        ))}
                      </div>

                      {/* GitHub Button */}
                      <div className="flex justify-center">
                        <GitHubButtonMobile
                          githubUrl={projects[projectIndex].github}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Boutons de navigation */}
          <NavigationButtonMobile
            direction="left"
            onClick={() => handleNavigation(-1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </NavigationButtonMobile>

          <NavigationButtonMobile
            direction="right"
            onClick={() => handleNavigation(1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </NavigationButtonMobile>
        </div>

        {/* Holographic Progress Indicators */}
        <div
          className="flex justify-center mt-8 gap-3 px-4 py-2.5 rounded-full backdrop-blur-xl bg-gradient-to-r from-violet-950/50 to-cyan-950/50 border border-violet-500/30 mx-auto w-fit relative animate-fadeInUp"
          style={{ animationDelay: "600ms" }}
        >
          {/* Animated background glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/0 via-violet-500/20 to-cyan-500/0 animate-shimmer" />

          {projects.map((_, index) => (
            <ProgressIndicatorMobile
              key={index}
              index={index}
              projectIndex={projectIndex}
              onPageChange={handlePageChange}
              totalProjects={projects.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsMobile;
