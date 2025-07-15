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

// Composant mémorisé pour un tech tag
const TechTag = memo(({ tech, bgAccent }) => (
  <motion.span
    className={`px-4 py-2 text-sm ${bgAccent} text-white rounded-full backdrop-blur-sm`}
    whileHover={{
      scale: 1.05,
      backgroundColor: "rgba(255, 255, 255, 0.15)",
    }}
    whileTap={{ scale: 0.95 }}
    style={{ willChange: "transform" }}
  >
    {tech}
  </motion.span>
));

// Composant mémorisé pour un indicateur de progression
const ProgressIndicator = memo(
  ({ index, projectIndex, onPageChange, totalProjects }) => (
    <motion.button
      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
        index === projectIndex ? "w-8 bg-white" : "bg-white/40"
      }`}
      onClick={() => onPageChange(index)}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
      animate={{
        scale: index === projectIndex ? [1, 1.1, 1] : 1,
        transition: {
          duration: 2,
          repeat: index === projectIndex ? Infinity : 0,
          repeatType: "reverse",
        },
      }}
      style={{ willChange: "transform" }}
    />
  )
);

// Composant mémorisé pour les boutons de navigation
const NavigationButton = memo(({ direction, onClick, children }) => (
  <motion.button
    className={`absolute ${
      direction === "left" ? "left-6" : "right-6"
    } top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/10 rounded-full p-4 backdrop-blur-sm z-10 border border-white/10`}
    whileHover={{
      scale: 1.1,
      backgroundColor: "rgba(255, 255, 255, 0.15)",
    }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    style={{ willChange: "transform" }}
  >
    {children}
  </motion.button>
));

const Projects = () => {
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
        tech: ["BaaS", "React.js", "Firebase", "FireStore", "TailwindCSS"],
        image: "/images/project5.png",
        color: "from-cyan-500 to-blue-600",
        bgAccent: "bg-blue-500/20",
        accentColor: "rgb(59, 130, 246)",
      },
      {
        title: "Eventure",
        period: "2024",
        description: "Event Management Platform",
        details:
          "Developed a web app for event creation and attendee management. Integrated Spring Boot for backend and Thymeleaf & TailwindCSS for UI.",
        tech: ["Spring Boot", "Thymeleaf", "MySQL", "Git", "TailwindCSS"],
        image: "/images/project4.jpeg",
        color: "from-violet-500 to-purple-600",
        bgAccent: "bg-purple-500/20",
        accentColor: "rgb(168, 85, 247)",
      },
      {
        title: "Recruiting Agency App",
        period: "2024",
        description: "JavaFX Desktop Application",
        details:
          "Designed a multi-client recruitment platform for companies and job seekers. Enabled job postings and interactive journals.",
        tech: ["JavaFX", "MySQL", "IntelliJ IDEA"],
        image: "/images/project1.jpeg",
        color: "from-emerald-400 to-teal-600",
        bgAccent: "bg-emerald-500/20",
        accentColor: "rgb(16, 185, 129)",
      },
      {
        title: "Sentiment Analysis App",
        period: "2024",
        description: "Full-Stack ML Application",
        details:
          "Developed a full-stack sentiment analysis application using FastAPI backend and Streamlit frontend. Integrated with Hugging Face Inference API for real-time text sentiment analysis.",
        tech: ["FastAPI", "Streamlit", "Hugging Face", "Python", "ML"],
        image: "/images/deployDocker.png",
        color: "from-amber-400 to-orange-600",
        bgAccent: "bg-amber-500/20",
        accentColor: "rgb(245, 158, 11)",
      },
      {
        title: "GNN Model Optimization",
        period: "2024",
        description: "Graph Neural Network Research",
        details:
          "Enhanced an existing GCN model through hyperparameter optimization and dataset augmentation using Kaggle datasets. Achieved improved accuracy through fine-tuning and cross-validation techniques.",
        tech: ["PyTorch", "Kaggle", "GNN", "Python", "Data Analysis"],
        image: "/images/final_test_results.png",
        color: "from-amber-400 to-orange-600",
        bgAccent: "bg-amber-500/20",
        accentColor: "rgb(245, 158, 11)",
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
        color: "from-amber-400 to-blue-600",
        bgAccent: "bg-red-500/20",
        accentColor: "rgb(16, 185, 129)",
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
    <div
      id="projects"
      className="relative min-h-screen py-20 "
      ref={containerRef}
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
          className="mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ willChange: "transform, opacity" }}
        >
          <h2 className="text-6xl md:text-7xl font-bold text-center">
            <span className="text-4xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Featured Projects
            </span>
          </h2>
        </motion.div>

        <motion.div
          className="relative h-[700px] md:h-[600px] lg:h-[650px] overflow-hidden rounded-2xl"
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
              <div className="w-full h-full px-4 flex items-center justify-center">
                <motion.div
                  className="w-full max-w-6xl mx-auto"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  style={{ willChange: "transform" }}
                >
                  <div className="relative rounded-2xl overflow-hidden backdrop-blur-md bg-white/[0.03] border border-white/10 shadow-2xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8">
                      <motion.div
                        className="lg:col-span-7 relative rounded-xl overflow-hidden aspect-[16/10]"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.2 }}
                        style={{ willChange: "transform" }}
                      >
                        <img
                          src={projects[projectIndex].image}
                          alt={projects[projectIndex].title}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      </motion.div>

                      <div className="lg:col-span-5 flex flex-col justify-between py-4">
                        <div>
                          <motion.div
                            className="flex items-center justify-between mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            style={{ willChange: "transform, opacity" }}
                          >
                            <h3 className="text-4xl font-bold text-white">
                              {projects[projectIndex].title}
                            </h3>
                            <div
                              className={`px-4 py-1.5 rounded-full ${projects[projectIndex].bgAccent} text-sm`}
                            >
                              {projects[projectIndex].period}
                            </div>
                          </motion.div>
                          <motion.p
                            className="text-xl text-white/90 mb-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                          >
                            {projects[projectIndex].description}
                          </motion.p>
                          <motion.p
                            className="text-base text-gray-300 leading-relaxed mb-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                          >
                            {projects[projectIndex].details}
                          </motion.p>
                        </div>
                        <motion.div
                          className="flex flex-wrap gap-2.5"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4, duration: 0.4 }}
                          style={{ willChange: "transform, opacity" }}
                        >
                          {projects[projectIndex].tech.map((tech) => (
                            <TechTag
                              key={tech}
                              tech={tech}
                              bgAccent={projects[projectIndex].bgAccent}
                            />
                          ))}
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons optimisés */}
          <NavigationButton
            direction="left"
            onClick={() => handleNavigation(-1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
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

          <NavigationButton
            direction="right"
            onClick={() => handleNavigation(1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
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

          {/* Indicateurs de progression optimisés */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
            {projects.map((_, index) => (
              <ProgressIndicator
                key={index}
                index={index}
                projectIndex={projectIndex}
                onPageChange={handlePageChange}
                totalProjects={projects.length}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Projects;
