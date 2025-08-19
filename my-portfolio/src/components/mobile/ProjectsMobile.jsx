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

// Composant mémorisé pour un tech tag mobile
const TechTagMobile = memo(({ tech, bgAccent }) => (
  <motion.span
    className={`px-2 py-1 text-xs ${bgAccent} text-white rounded-full backdrop-blur-sm cursor-default flex-shrink-0`}
    whileHover={{
      scale: 1.02,
      backgroundColor: "rgba(255, 255, 255, 0.15)",
    }}
    style={{ willChange: "transform" }}
    transition={{ duration: 0.15 }}
  >
    {tech}
  </motion.span>
));

// Composant mémorisé pour le bouton GitHub mobile
const GitHubButtonMobile = memo(({ githubUrl, projectTitle }) => (
  <motion.a
    href={githubUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-gray-800/80 to-black/80 hover:from-gray-700/90 hover:to-black/90 backdrop-blur-sm border border-white/20 text-white font-medium transition-all duration-300 group text-xs flex-shrink-0"
    whileHover={{
      scale: 1.02,
      boxShadow: `0 8px 20px -5px rgba(0, 0, 0, 0.3)`,
    }}
    whileTap={{ scale: 0.98 }}
    style={{ willChange: "transform, box-shadow" }}
    transition={{ duration: 0.2 }}
  >
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
    <span>GitHub</span>
    <motion.svg
      className="w-2.5 h-2.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      animate={{ x: 0 }}
      whileHover={{ x: 2 }}
      transition={{ duration: 0.2 }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </motion.svg>
  </motion.a>
));

// Composant mémorisé pour un indicateur de progression mobile
const ProgressIndicatorMobile = memo(
  ({ index, projectIndex, onPageChange, totalProjects }) => (
    <motion.button
      className={`w-2 h-2 rounded-full transition-all duration-300 touch-manipulation ${
        index === projectIndex ? "w-6 bg-white" : "bg-white/40"
      }`}
      onClick={() => onPageChange(index)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1.05 }}
      animate={{
        scale: index === projectIndex ? [1, 1.05, 1] : 1,
        transition: {
          duration: 2,
          repeat: index === projectIndex ? Infinity : 0,
          repeatType: "reverse",
        },
      }}
      style={{
        willChange: "transform",
        minWidth: "20px",
        minHeight: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
  )
);

// Composant mémorisé pour les boutons de navigation mobile
const NavigationButtonMobile = memo(({ direction, onClick, children }) => (
  <motion.button
    className={`absolute ${
      direction === "left" ? "left-2" : "right-2"
    } top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-2.5 backdrop-blur-sm z-20 border border-white/10 touch-manipulation`}
    whileHover={{
      backgroundColor: "rgba(255, 255, 255, 0.25)",
      borderColor: "rgba(255, 255, 255, 0.3)",
    }}
    whileTap={{
      backgroundColor: "rgba(255, 255, 255, 0.35)",
    }}
    onClick={onClick}
    style={{
      willChange: "background-color, border-color",
      minWidth: "40px",
      minHeight: "40px",
      transformOrigin: "center",
    }}
    transition={{ duration: 0.2, ease: "easeInOut" }}
  >
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.15 }}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  </motion.button>
));

const ProjectsMobile = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);

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
        tech: ["React.js", "Firebase", "TailwindCSS"],
        image: "/images/project5.png",
        github: "https://github.com/iliasofir/ChatWithMeV2",
        color: "from-cyan-500 to-blue-600",
        bgAccent: "bg-blue-500/20",
      },
      {
        title: "Eventure",
        period: "2024",
        description: "Event Management Platform",
        details:
          "Developed a web app for event creation and attendee management. Integrated Spring Boot for backend and Thymeleaf & TailwindCSS for UI.",
        tech: ["Spring Boot", "MySQL", "TailwindCSS"],
        image: "/images/project4.jpeg",
        github: "https://github.com/iliasofir/Eventure_BLOG",
        color: "from-violet-500 to-purple-600",
        bgAccent: "bg-purple-500/20",
      },
      {
        title: "Recruiting Agency App",
        period: "2024",
        description: "JavaFX Desktop Application",
        details:
          "Designed a multi-client recruitment platform for companies and job seekers. Enabled job postings and interactive journals.",
        tech: ["JavaFX", "MySQL"],
        image: "/images/project1.jpeg",
        github: "https://github.com/AhmedDevST/AgenceRecrutement",
        color: "from-emerald-400 to-teal-600",
        bgAccent: "bg-emerald-500/20",
      },
      {
        title: "Sentiment Analysis App",
        period: "2024",
        description: "Full-Stack ML Application",
        details:
          "Developed a full-stack sentiment analysis application using FastAPI backend and Streamlit frontend. Integrated with Hugging Face Inference API for real-time text sentiment analysis.",
        tech: ["FastAPI", "Streamlit", "Python", "ML"],
        image: "/images/deployDocker.png",
        github: "https://github.com/iliasofir/Sentiment_Analysis",
        color: "from-amber-400 to-orange-600",
        bgAccent: "bg-amber-500/20",
      },
      {
        title: "GNN Model Optimization",
        period: "2024",
        description: "Graph Neural Network Research",
        details:
          "Enhanced an existing GCN model through hyperparameter optimization and dataset augmentation using Kaggle datasets. Achieved improved accuracy through fine-tuning and cross-validation techniques.",
        tech: ["PyTorch", "Python", "Data Analysis"],
        image: "/images/final_test_results.png",
        github: "#",
        color: "from-amber-400 to-orange-600",
        bgAccent: "bg-amber-500/20",
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
      <motion.div
        className="max-w-full mx-auto px-3"
        style={{
          opacity: useSpring(opacity, springConfig),
          scale: useSpring(scale, springConfig),
          willChange: "transform, opacity",
        }}
      >
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ willChange: "transform, opacity" }}
        >
          <h2 className="text-3xl font-bold text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Featured Projects
            </span>
          </h2>
        </motion.div>

        <motion.div
          className="relative h-[520px] overflow-hidden rounded-xl mx-2"
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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
              <motion.div
                className="w-full max-w-sm mx-auto"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
                style={{ willChange: "transform" }}
              >
                <div className="relative rounded-xl overflow-hidden backdrop-blur-lg bg-white/[0.02] border border-white/10 shadow-xl h-full">
                  {/* Image du projet */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={projects[projectIndex].image}
                      alt={projects[projectIndex].title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute top-3 right-3">
                      <div
                        className={`px-2 py-1 rounded-full ${projects[projectIndex].bgAccent} text-xs font-medium`}
                      >
                        {projects[projectIndex].period}
                      </div>
                    </div>
                  </div>

                  {/* Contenu du projet */}
                  <div className="p-4 space-y-3">
                    <motion.h3
                      className="text-xl font-bold text-white leading-tight"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      {projects[projectIndex].title}
                    </motion.h3>

                    <motion.p
                      className="text-sm text-white/80 font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                    >
                      {projects[projectIndex].description}
                    </motion.p>

                    <motion.p
                      className="text-xs text-gray-300 leading-relaxed line-clamp-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {projects[projectIndex].details}
                    </motion.p>

                    {/* Tech tags */}
                    <motion.div
                      className="flex flex-wrap gap-1.5 max-h-12 overflow-hidden"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      {projects[projectIndex].tech.slice(0, 4).map((tech) => (
                        <TechTagMobile
                          key={tech}
                          tech={tech}
                          bgAccent={projects[projectIndex].bgAccent}
                        />
                      ))}
                      {projects[projectIndex].tech.length > 4 && (
                        <span className="text-xs text-white/60 px-2 py-1">
                          +{projects[projectIndex].tech.length - 4}
                        </span>
                      )}
                    </motion.div>

                    {/* Bouton GitHub */}
                    <motion.div
                      className="flex justify-center pt-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                    >
                      <GitHubButtonMobile
                        githubUrl={projects[projectIndex].github}
                        projectTitle={projects[projectIndex].title}
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
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
        </motion.div>

        {/* Indicateurs de progression repositionnés */}
        <div className="flex justify-center mt-6 space-x-2">
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
      </motion.div>
    </div>
  );
};

export default ProjectsMobile;
