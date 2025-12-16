import React, { useRef, useState, useMemo, memo, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import QuantumBackground from "./QuantumBackground";

// High-performance certification card with modern glassmorphism and neural network inspired design
const CertificationCard = memo(
  ({ cert, index, hoveredCard, setHoveredCard, mousePosition }) => {
    const cardRef = useRef(null);

    // Optimized hover handlers
    const handleHoverStart = useCallback(
      () => setHoveredCard(cert.id),
      [cert.id, setHoveredCard]
    );
    const handleHoverEnd = useCallback(
      () => setHoveredCard(null),
      [setHoveredCard]
    );

    const isHovered = hoveredCard === cert.id;

    // Neural network nodes animation
    const networkNodes = useMemo(
      () =>
        Array.from({ length: 4 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 2,
        })),
      []
    );

    return (
      <motion.div
        ref={cardRef}
        initial={{
          opacity: 0,
          rotateX: -15,
          y: 100,
          rotateY: 0,
          scale: 1,
          z: 0,
        }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
        transition={{
          delay: index * 0.15,
          duration: 0.8,
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
        viewport={{ once: true, margin: "-50px" }}
        whileHover={{
          rotateX: 5,
          rotateY: mousePosition.x * 0.02,
          scale: 1.02,
          z: 50,
        }}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        className="group relative perspective-1000"
        style={{
          willChange: "transform",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Holographic border effect */}
        <div
          className="absolute inset-0 rounded-3xl p-[1px] opacity-70"
          style={{
            background: isHovered
              ? "linear-gradient(145deg, rgba(139,92,246,0.3), rgba(6,182,212,0.2))"
              : "linear-gradient(145deg, rgba(139,92,246,0.2), rgba(6,182,212,0.1))",
            transition: "background 0.6s",
          }}
        >
          <div className="w-full h-full rounded-3xl bg-gray-900/90" />
        </div>

        {/* Main card container */}
        <motion.div
          animate={{
            boxShadow: isHovered
              ? "0 25px 80px -15px rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(255,255,255,0.05)"
              : "0 10px 40px -15px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255,255,255,0.02)",
          }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-3xl backdrop-blur-xl bg-gradient-to-br from-gray-900/40 via-gray-800/30 to-gray-900/40 border-0 p-8 h-full"
        >
          {/* Neural network background */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full">
              {networkNodes.map((node) => (
                <circle
                  key={node.id}
                  cx={`${node.x}%`}
                  cy={`${node.y}%`}
                  r="2"
                  fill="#8b5cf6"
                  opacity={isHovered ? "0.6" : "0.3"}
                  style={{ transition: "opacity 0.3s" }}
                />
              ))}
              {/* Connecting lines */}
              {networkNodes.map((node, i) =>
                networkNodes
                  .slice(i + 1)
                  .map((nextNode, j) => (
                    <line
                      key={`${i}-${j}`}
                      x1={`${node.x}%`}
                      y1={`${node.y}%`}
                      x2={`${nextNode.x}%`}
                      y2={`${nextNode.y}%`}
                      stroke="url(#gradient)"
                      strokeWidth="0.5"
                      opacity={isHovered ? "0.3" : "0"}
                      style={{ transition: "opacity 0.3s" }}
                    />
                  ))
              )}
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Floating particles - static decoration */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                style={{
                  left: Math.random() * 100 + "%",
                  top: Math.random() * 100 + "%",
                  opacity: isHovered ? 0.6 : 0,
                  transition: "opacity 0.5s",
                }}
                className="absolute w-1 h-1 bg-violet-400/60 rounded-full blur-[0.5px]"
              />
            ))}
          </div>

          <div className="relative z-10">
            {/* Logo with quantum effect */}
            <motion.div
              initial={{ rotateZ: 0, scale: 1 }}
              whileHover={{
                scale: 1.1,
                rotateZ: [0, -5, 5, 0],
                filter: "drop-shadow(0 0 20px rgba(139, 92, 246, 0.6))",
              }}
              transition={{ duration: 0.6 }}
              className="relative w-20 h-20 mb-6 rounded-2xl p-3 overflow-hidden"
            >
              {/* Animated background */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(45deg, rgba(139,92,246,0.2), rgba(6,182,212,0.2))",
                }}
              />

              {/* Scanning line effect */}
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={{
                  x: isHovered ? ["-100%", "100%"] : "-100%",
                  opacity: isHovered ? [0, 1, 0] : 0,
                }}
                transition={{
                  duration: 1.5,
                  repeat: isHovered ? Infinity : 0,
                  ease: "easeInOut",
                }}
                style={{ opacity: 0 }}
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"
              />

              <img
                src={cert.logo}
                alt={cert.issuer}
                className="relative z-10 w-full h-full object-contain drop-shadow-lg"
              />
            </motion.div>

            {/* Title with typewriter effect */}
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-xl font-bold text-white mb-4 leading-tight"
            >
              <span className="bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent">
                {cert.title}
              </span>
            </motion.h3>
            {/* Category badge */}
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 1 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute top-4 right-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-full backdrop-blur-xl bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-400/30"
              >
                <span className="text-xs font-semibold bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-cyan-300">
                  {cert.category}
                </span>
              </motion.div>
            </motion.div>
            {/* Info section with enhanced styling */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-3 mb-6"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 backdrop-blur-sm flex items-center justify-center border border-violet-400/30"
                >
                  <div className="w-3 h-3 rounded-full bg-violet-400" />
                </motion.div>
                <p className="text-violet-300 font-semibold text-lg">
                  {cert.issuer}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-500/20 to-slate-500/20 backdrop-blur-sm flex items-center justify-center border border-gray-400/30">
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
                <p className="text-gray-300 font-medium">{cert.date}</p>
              </div>
            </motion.div>

            {/* Enhanced CTA button */}
            <motion.button
              initial={{ scale: 1 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 15px 35px -5px rgba(139, 92, 246, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full p-4 rounded-xl overflow-hidden group border border-violet-400/20 backdrop-blur-sm"
              onClick={() => window.open(cert.credentialUrl, "_blank")}
            >
              {/* Button background animation */}
              <motion.div
                animate={{
                  background: isHovered
                    ? "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(6,182,212,0.1))"
                    : "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 rounded-xl"
              />

              {/* Shimmer effect */}
              {isHovered && (
                <motion.div
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{
                    x: "100%",
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 1.2,
                    ease: "easeInOut",
                  }}
                  className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12"
                />
              )}

              <div className="relative flex items-center justify-center space-x-3">
                <motion.span
                  animate={{
                    color: isHovered ? "#a78bfa" : "#ffffff",
                  }}
                  transition={{ duration: 0.3 }}
                  className="font-semibold"
                >
                  View Certificate
                </motion.span>
                <motion.svg
                  animate={{
                    x: isHovered ? 5 : 0,
                    rotate: isHovered ? 45 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-5 h-5 text-violet-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </motion.svg>
              </div>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  }
);

const Certification = () => {
  const containerRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Optimized spring configuration
  const springConfig = useMemo(
    () => ({ stiffness: 120, damping: 30, mass: 0.5 }),
    []
  );

  // Enhanced scroll-based animations
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.9, 1, 1, 0.9]
  );
  const backgroundY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);

  // Optimized mouse movement handler
  const handleMouseMove = useCallback((e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 15;
    const y = (clientY / innerHeight - 0.5) * 15;
    setMousePosition({ x, y });
  }, []);

  // Certifications data with enhanced metadata
  const certifications = useMemo(
    () => [
      {
        id: 1,
        title:
          "Oracle Cloud Infrastructure Foundations 2024 Certified Associate",
        issuer: "Oracle",
        date: "Feb 2025",
        credentialUrl:
          "https://catalog-education.oracle.com/pls/certview/sharebadge?id=179EEB1994E84E7775CE1A02A09FB5756CD771CE6432B02C74E00C7184EDA076",
        logo: "/images/oracle.png",
        color: "from-red-400 to-orange-500",
        bgAccent: "bg-red-500/10",
        category: "Cloud Computing",
      },

      {
        id: 2,
        title: "Oracle Cloud Infrastructure 2025 Certified DevOps Professional",
        issuer: "Oracle",
        date: "Oct 2025",
        credentialUrl:
          "https://catalog-education.oracle.com/ords/certview/sharebadge?id=BC2817D66FE80005AE4C6DA8B5461FB2F42B7FBF434BC1B48DC36E8811CC974D",
        logo: "/images/oracle.png",
        color: "from-blue-400 to-cyan-500",
        bgAccent: "bg-blue-500/10",
        category: "Devops",
      },
      {
        id: 3,
        title: "Big Data Foundations - Level 2",
        issuer: "IBM",
        date: "May 2025",
        credentialUrl:
          "https://www.credly.com/badges/4db3fdd4-ee7f-45c2-af7c-6cb4617e2bd6/linked_in_profile",
        logo: "/images/IBM_logo.png",
        color: "from-blue-400 to-cyan-500",
        bgAccent: "bg-blue-500/10",
        category: "Data Science",
      },
      {
        id: 4,
        title: "Oracle Cloud Infrastructure 2025 Certified Architect Associate",
        issuer: "Oracle",
        date: "Dec 2025",
        credentialUrl:
          "https://catalog-education.oracle.com/ords/certview/sharebadge?id=25B257ACD9F5D0A50D1CBC16498B4442F543B8A12BF3651E16583FC9C49E66E6",
        logo: "/images/oracle.png",
        color: "from-violet-400 to-violet-600",
        bgAccent: "bg-violet-500/10",
        category: "Cloud Computing",
      },
      {
        id: 5,
        title: "MERN Stack Developer",
        issuer: "Udemy",
        date: "Aug 2024",
        credentialUrl:
          "https://www.linkedin.com/in/ilias-ofir-445b91295/details/certifications/1726409009042/single-media-viewer/?profileId=ACoAAEeLNjUBZGYFEyr2xQDond17qZWEny61fwE",
        logo: "/images/Udemy-Logo.png",
        color: "from-purple-400 to-violet-600",
        bgAccent: "bg-violet-500/10",
        category: "Web Development",
      },
    ],
    []
  );

  return (
    <QuantumBackground
      id="certifications"
      containerRef={containerRef}
      variant="purple"
    >
      <div onMouseMove={handleMouseMove}>
        <motion.div
          style={{
            opacity: useSpring(opacity, springConfig),
            scale: useSpring(scale, springConfig),
          }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          {/* Enhanced title section */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            className="mb-20 relative text-center"
          >
            {/* Title backdrop effect - static */}
            <div className="absolute inset-0 flex justify-center items-center -z-10">
              <div className="w-full h-24 bg-gradient-to-r from-transparent via-violet-500/20 to-transparent blur-2xl rounded-full opacity-40" />
            </div>

            <h2
              className="text-5xl md:text-7xl font-black relative"
              style={{
                textShadow: "0 0 30px rgba(139, 92, 246, 0.6)",
              }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-200 to-cyan-200">
                Certifications
              </span>
            </h2>

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
              Professional certifications showcasing expertise across cloud
              computing, full-stack development, and data science domains.
            </motion.p>
          </motion.div>

          {/* Enhanced cards grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <CertificationCard
                key={cert.id}
                cert={cert}
                index={index}
                hoveredCard={hoveredCard}
                setHoveredCard={setHoveredCard}
                mousePosition={mousePosition}
              />
            ))}
          </div>

          {/* Quantum statistics footer */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 text-center"
          >
            <div className="inline-flex items-center gap-8 px-8 py-4 rounded-2xl backdrop-blur-xl bg-gradient-to-r from-violet-500/10 via-transparent to-cyan-500/10 border border-white/10">
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-white mb-1">
                  {certifications.length}
                </div>
                <div className="text-sm text-gray-400">Certifications</div>
              </motion.div>
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-white mb-1">3</div>
                <div className="text-sm text-gray-400">Tech Domains</div>
              </motion.div>
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-white mb-1">100%</div>
                <div className="text-sm text-gray-400">Verified</div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </QuantumBackground>
  );
};

export default Certification;
