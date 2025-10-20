import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useMemo, memo } from "react";
import QuantumBackground from "./QuantumBackground";

// Composant mémorisé pour une expérience dans la timeline
const ExperienceCard = memo(({ experience, index, isLeft }) => (
  <motion.div
    initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: index * 0.2 }}
    viewport={{ once: true }}
    className={`relative flex ${
      isLeft ? "justify-start" : "justify-end"
    } mb-12`}
  >
    {/* Timeline dot */}
    <motion.div
      whileHover={{ scale: 1.3 }}
      className={`absolute ${isLeft ? "right-0" : "left-0"} top-8 transform ${
        isLeft ? "translate-x-1/2" : "-translate-x-1/2"
      } w-5 h-5 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full border-4 border-gray-900 z-20 shadow-lg shadow-violet-500/30`}
    />

    {/* Experience Card */}
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className={`w-full max-w-md backdrop-blur-xl bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-3xl p-8 border border-violet-400/30 hover:border-violet-400/60 transition-all duration-500 shadow-2xl hover:shadow-violet-500/20 hover:shadow-2xl ${
        isLeft ? "mr-8" : "ml-8"
      } before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-violet-500/10 before:via-purple-500/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 relative overflow-hidden`}
    >
      {/* Header with logo and status */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center border border-gray-200 shadow-lg"
        >
          <img
            src={experience.logo}
            alt={`${experience.company} Logo`}
            className="w-14 h-14 object-contain rounded-lg"
          />
        </motion.div>
        <motion.span
          whileHover={{ scale: 1.05 }}
          className={`px-4 py-2 rounded-xl text-xs font-semibold backdrop-blur-sm ${
            experience.status === "En cours"
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shadow-emerald-500/20"
              : "bg-violet-500/20 text-violet-300 border border-violet-400/40 shadow-violet-500/20"
          } shadow-lg`}
        >
          {experience.status}
        </motion.span>
      </div>

      {/* Company and role */}
      <motion.h3
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-bold text-white mb-2 relative z-10"
      >
        {experience.role}
      </motion.h3>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-3 mb-3 relative z-10"
      >
        <div className="w-5 h-5 rounded-lg bg-violet-500/20 border border-violet-400/30 flex items-center justify-center">
          <svg
            className="w-3 h-3 text-violet-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <p className="text-violet-300 text-base font-semibold">
          {experience.company}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center gap-3 mb-3 relative z-10"
      >
        <div className="w-5 h-5 rounded-lg bg-gray-600/20 border border-gray-500/30 flex items-center justify-center">
          <svg
            className="w-3 h-3 text-gray-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <p className="text-gray-300 text-base">{experience.location}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-3 mb-5 relative z-10"
      >
        <div className="w-5 h-5 rounded-lg bg-gray-600/20 border border-gray-500/30 flex items-center justify-center">
          <svg
            className="w-3 h-3 text-gray-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <p className="text-gray-300 text-base">{experience.period}</p>
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-gray-200 text-sm leading-relaxed mb-5 relative z-10"
      >
        {experience.description}
      </motion.p>

      {/* Technologies */}
      {experience.technologies && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap gap-2 relative z-10"
        >
          {experience.technologies.map((tech, techIndex) => (
            <motion.span
              key={techIndex}
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(139, 92, 246, 0.4)",
              }}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-violet-500/15 text-violet-300 border border-violet-400/30 backdrop-blur-sm shadow-lg hover:shadow-violet-500/20 transition-all duration-300"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      )}
    </motion.div>
  </motion.div>
));

const Experience = () => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Timeline scroll progress for the moving point
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });

  const springConfig = useMemo(() => ({ stiffness: 100, damping: 30 }), []);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.9, 1],
    [0.8, 1, 1, 0.8]
  );

  // Calculate the moving point position (constrained to timeline edges)
  const pointY = useTransform(timelineProgress, [0, 1], ["0%", "100%"]);
  const springPointY = useSpring(pointY, { stiffness: 400, damping: 40 });

  // Données des expériences
  const experiences = useMemo(
    () => [
      {
        role: "Full Stack Java/Angular Engineering Intern",
        company: "Attijariwafa Bank",
        location: "Casablanca, Maroc",
        period: "August 2025 - September 2025",
        status: "Completed",
        logo: "/images/AWF.png",
        description:
          "Built a general assembly application using Spring Boot (Java) and PostgreSQL. Developing a modern Angular + TailwindCSS frontend with a fluid user experience. Integrating advanced features such as JWT authentication, OTP-based login, and automated voting and quorum tracking.",
        technologies: [
          "Java",
          "Spring Boot",
          "Angular",
          "PostgreSQL",
          "SMTP",
        ],
      },
      {
        role: "QA Automation Engineering Intern",
        company: "ONCF Group",
        location: "Rabat, Maroc",
        period: "June 2025 - July 2025",
        status: "Completed",
        logo: "/images/oncf.png",
        description:
          "Analyzed and mapped the Source-to-Contract (S2C) financial process in Oracle ERP. Designed detailed test cases and executed functional test campaigns. Explored feasibility of automation using Oracle Application Testing Suite (OATS).",
        technologies: ["Oracle ERP", "OATS", "Test Automation", "QA"],
      },
      {
        role: "Data Science & Software Engineering Intern",
        company: "Hassania School of Public Works",
        location: "Casablanca, Maroc",
        period: "June 2024 - July 2024",
        status: "Completed",
        logo: "/images/ehtp.png",
        description:
          "Built an e-learning platform using Django & PostgreSQL. Applied data clustering/cleaning on structured datasets. Gained hands-on experience in full-stack development (React.js, Node.js, Django).",
        technologies: [
          "Django",
          "PostgreSQL",
          "React.js",
          "Node.js",
          "Data Science",
        ],
      },
       
    ],
    []
  );

  return (
    <QuantumBackground
      id="experience"
      containerRef={containerRef}
      variant="purple"
      className="py-20"
    >
      <motion.div
        style={{
          opacity: useSpring(opacity, springConfig),
          scale: useSpring(scale, springConfig),
        }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          className="mb-20 relative text-center"
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
            className="text-5xl md:text-7xl font-black relative"
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
              Experiences
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
            className="mt-6 text-gray-300 text-lg font-light max-w-2xl mx-auto"
          >
            Proven track record of delivering full-stack web applications and
            data-driven solutions for enterprise clients.
          </motion.p>
        </motion.div>

        {/* Timeline container */}
        <div className="relative" ref={timelineRef}>
          {/* Vertical timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-violet-400 via-purple-500 to-violet-400 opacity-40 rounded-full shadow-lg shadow-violet-500/20"
            style={{ originY: 0 }}
          />

          {/* Animated scroll point */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-violet-300 to-purple-400 rounded-full border-2 border-white z-30 shadow-xl shadow-violet-500/50"
            style={{
              top: springPointY,
              opacity: useTransform(
                timelineProgress,
                [0, 0.1, 0.9, 1],
                [0, 1, 1, 0]
              ),
            }}
          >
            {/* Glowing effect */}
            <motion.div
              className="absolute inset-0 bg-violet-400 rounded-full -z-10"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 0.3, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Experience cards */}
          <div className="relative">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={index}
                experience={experience}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </QuantumBackground>
  );
};

export default Experience;
