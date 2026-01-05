import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useMemo, memo } from "react";
import QuantumBackground from "./QuantumBackground";
import { useInView } from "../hooks/useScrollAnimations";
import "../styles/animations.css";

// Composant mémorisé pour une expérience dans la timeline
const ExperienceCard = memo(({ experience, index, isLeft }) => {
  const { ref, hasBeenInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`relative flex ${
        isLeft ? "justify-start" : "justify-end"
      } mb-12 transition-all duration-600 ${
        hasBeenInView
          ? "opacity-100 translate-x-0"
          : `opacity-0 ${isLeft ? "-translate-x-24" : "translate-x-24"}`
      }`}
      style={{ transitionDelay: `${index * 0.2}s` }}
    >
      {/* Timeline dot */}
      <div
        className={`absolute ${isLeft ? "right-0" : "left-0"} top-8 transform ${
          isLeft ? "translate-x-1/2" : "-translate-x-1/2"
        } w-5 h-5 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full border-4 border-gray-900 z-20 shadow-lg shadow-violet-500/30 transition-transform duration-300 hover:scale-125`}
      />

      {/* Experience Card */}
      <div
        className={`w-full max-w-md backdrop-blur-xl bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-3xl p-8 border border-violet-400/30 hover:border-violet-400/60 transition-all duration-500 shadow-2xl hover:shadow-violet-500/20 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 ${
          isLeft ? "mr-8" : "ml-8"
        } before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-violet-500/10 before:via-purple-500/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 relative overflow-hidden`}
      >
        {/* Header with logo and status */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center border border-gray-200 shadow-lg transition-transform duration-300 hover:scale-110">
            <img
              src={experience.logo}
              alt={`${experience.company} Logo`}
              className="w-14 h-14 object-contain rounded-lg"
            />
          </div>
          <span
            className={`px-4 py-2 rounded-xl text-xs font-semibold backdrop-blur-sm transition-transform duration-300 hover:scale-105 ${
              experience.status === "En cours"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shadow-emerald-500/20"
                : "bg-violet-500/20 text-violet-300 border border-violet-400/40 shadow-violet-500/20"
            } shadow-lg`}
          >
            {experience.status}
          </span>
        </div>

        {/* Company and role */}
        <h3
          className="text-xl font-bold text-white mb-2 relative z-10"
          style={{ opacity: 0, animation: "fadeIn 0.4s ease forwards 0.2s" }}
        >
          {experience.role}
        </h3>

        <div
          className="flex items-center gap-3 mb-3 relative z-10"
          style={{ opacity: 0, animation: "fadeIn 0.4s ease forwards 0.3s" }}
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
        </div>

        <div
          className="flex items-center gap-3 mb-3 relative z-10"
          style={{ opacity: 0, animation: "fadeIn 0.4s ease forwards 0.4s" }}
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
        </div>

        <div
          className="flex items-center gap-3 mb-5 relative z-10"
          style={{ opacity: 0, animation: "fadeIn 0.4s ease forwards 0.5s" }}
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
        </div>

        {/* Description */}
        <p
          className="text-gray-200 text-sm leading-relaxed mb-5 relative z-10"
          style={{ opacity: 0, animation: "fadeIn 0.4s ease forwards 0.6s" }}
        >
          {experience.description}
        </p>

        {/* Technologies */}
        {experience.technologies && (
          <div
            className="flex flex-wrap gap-2 relative z-10"
            style={{ opacity: 0, animation: "fadeIn 0.4s ease forwards 0.7s" }}
          >
            {experience.technologies.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-violet-500/15 text-violet-300 border border-violet-400/30 backdrop-blur-sm shadow-lg hover:shadow-violet-500/20 transition-all duration-300 hover:scale-110 hover:bg-violet-500/40"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

ExperienceCard.displayName = "ExperienceCard";

const Experience = () => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const { ref: sectionRef, hasBeenInView } = useInView({ threshold: 0.1 });

  // Timeline scroll progress for the moving point
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });

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
        technologies: ["Java", "Spring Boot", "Angular", "PostgreSQL", "SMTP"],
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
      <div
        ref={sectionRef}
        className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-800 ${
          hasBeenInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div
          className={`mb-20 relative text-center transition-all duration-1000 ${
            hasBeenInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-12"
          }`}
        >
          <div
            className="absolute inset-0 flex justify-center items-center -z-10"
            style={{ animation: "quantum-pulse 4s ease-in-out infinite" }}
          >
            <div className="w-full h-24 bg-gradient-to-r from-transparent via-violet-500/20 to-transparent blur-2xl rounded-full" />
          </div>

          <h2
            className="text-5xl md:text-7xl font-black relative"
            style={{ animation: "textGlow 3s ease-in-out infinite" }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-200 to-cyan-200">
              Experiences
            </span>
          </h2>

          <div
            className={`h-0.5 bg-gradient-to-r from-transparent via-violet-400 to-transparent mx-auto mt-6 rounded-full transition-all duration-1000 ${
              hasBeenInView ? "w-3/5 opacity-100" : "w-0 opacity-0"
            }`}
            style={{ transitionDelay: "500ms" }}
          />

          <p
            className={`mt-6 text-gray-300 text-lg font-light max-w-2xl mx-auto transition-opacity duration-1000 ${
              hasBeenInView ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            Proven track record of delivering full-stack web applications and
            data-driven solutions for enterprise clients.
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

        {/* Timeline container */}
        <div className="relative" ref={timelineRef}>
          {/* Vertical timeline line */}
          <div
            className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-violet-400 via-purple-500 to-violet-400 opacity-40 rounded-full shadow-lg shadow-violet-500/20 transition-transform duration-1000 origin-top ${
              hasBeenInView ? "scale-y-100" : "scale-y-0"
            }`}
            style={{ transitionDelay: "500ms" }}
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
      </div>
    </QuantumBackground>
  );
};

export default Experience;
