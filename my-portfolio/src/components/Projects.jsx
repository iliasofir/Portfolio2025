import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

const Projects = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 30 };
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.9, 1],
    [0.8, 1, 1, 0.8]
  );

  const projects = [
    {
      title: "ChatWithMe",
      period: "2024, Ongoing",
      description: "Real-Time Chat Web App",
      details:
        "Built a real-time messaging platform for seamless communication. Implemented WebSockets for instant message updates.",
      tech: ["Node.js", "React.js", "WebSocket", "TailwindCSS"],
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
      title: "Sentiment Analysis & GNN",
      period: "2024",
      description: "ML Research Project",
      details:
        "Developed a sentiment analysis app for text classification. Improved a Graph Neural Network (GNN) model for higher accuracy using PyTorch.",
      tech: ["PyTorch", "Machine Learning", "Data Processing"],
      image: "/images/deployDocker.png",
      color: "from-amber-400 to-orange-600",
      bgAccent: "bg-amber-500/20",
      accentColor: "rgb(245, 158, 11)",
    },
  ];

  const variants = {
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
  };

  // Auto-scroll effect
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        paginate(1);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused, page]);

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const wrap = (min, max, v) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
  };

  const projectIndex = wrap(0, projects.length, page);

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
        }}
      >
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-6xl md:text-7xl font-bold text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
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
            >
              <div className="w-full h-full px-4 flex items-center justify-center">
                <motion.div
                  className="w-full max-w-6xl mx-auto"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative rounded-2xl overflow-hidden backdrop-blur-md bg-white/[0.03] border border-white/10 shadow-2xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8">
                      <motion.div
                        className="lg:col-span-7 relative rounded-xl overflow-hidden aspect-[16/10]"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.2 }}
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
                        >
                          {projects[projectIndex].tech.map((tech) => (
                            <motion.span
                              key={tech}
                              className={`px-4 py-2 text-sm ${projects[projectIndex].bgAccent} text-white rounded-full backdrop-blur-sm`}
                              whileHover={{
                                scale: 1.05,
                                backgroundColor: "rgba(255, 255, 255, 0.15)",
                              }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons avec design moderne */}
          <motion.button
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/10 rounded-full p-4 backdrop-blur-sm z-10 border border-white/10"
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgba(255, 255, 255, 0.15)",
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (!isDragging) {
                paginate(-1);
                setIsPaused(true);
                setTimeout(() => setIsPaused(false), 3000);
              }
            }}
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
          </motion.button>

          <motion.button
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/10 rounded-full p-4 backdrop-blur-sm z-10 border border-white/10"
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgba(255, 255, 255, 0.15)",
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (!isDragging) {
                paginate(1);
                setIsPaused(true);
                setTimeout(() => setIsPaused(false), 3000);
              }
            }}
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
          </motion.button>

          {/* Indicateurs de progression modernisés */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
            {projects.map((_, index) => (
              <motion.button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === projectIndex ? "w-8 bg-white" : "bg-white/40"
                }`}
                onClick={() => {
                  const newDirection = index - projectIndex;
                  setPage([index, newDirection]);
                  setIsPaused(true);
                  setTimeout(() => setIsPaused(false), 3000);
                }}
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
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Projects;
