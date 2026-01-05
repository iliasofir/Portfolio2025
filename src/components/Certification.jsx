import React, { useRef, useState, useMemo, memo, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import QuantumBackground from "./QuantumBackground";
import { useInView } from "../hooks/useScrollAnimations";

// High-performance certification card with modern glassmorphism and neural network inspired design
const CertificationCard = memo(
  ({ cert, index, hoveredCard, setHoveredCard, mousePosition }) => {
    const cardRef = useRef(null);
    const { ref, hasBeenInView } = useInView({ threshold: 0.1 });

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
      <div
        ref={(el) => {
          ref.current = el;
          cardRef.current = el;
        }}
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
        className={`group relative perspective-1000 transition-all duration-800 ${
          hasBeenInView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-24"
        }`}
        style={{
          willChange: "transform",
          transformStyle: "preserve-3d",
          transform: isHovered
            ? `rotateX(5deg) rotateY(${
                mousePosition.x * 0.02
              }deg) scale(1.02) translateZ(50px)`
            : "rotateX(-15deg) rotateY(0deg) scale(1) translateZ(0px)",
          transitionDelay: `${index * 0.15}s`,
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
        <div
          className="relative overflow-hidden rounded-3xl backdrop-blur-xl bg-gradient-to-br from-gray-900/40 via-gray-800/30 to-gray-900/40 border-0 p-8 h-full transition-shadow duration-400"
          style={{
            boxShadow: isHovered
              ? "0 25px 80px -15px rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(255,255,255,0.05)"
              : "0 10px 40px -15px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255,255,255,0.02)",
          }}
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
            <div
              className="relative w-20 h-20 mb-6 rounded-2xl p-3 overflow-hidden transition-all duration-600 hover:scale-110"
              style={{
                filter: isHovered
                  ? "drop-shadow(0 0 20px rgba(139, 92, 246, 0.6))"
                  : "none",
              }}
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
              <div
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"
                style={{
                  opacity: isHovered ? 1 : 0,
                  animation: isHovered
                    ? "shine 1.5s ease-in-out infinite"
                    : "none",
                  transform: "translateX(-100%) skewX(-12deg)",
                }}
              />

              <img
                src={cert.logo}
                alt={cert.issuer}
                className="relative z-10 w-full h-full object-contain drop-shadow-lg"
              />

              <style>{`
                @keyframes shine {
                  0% { transform: translateX(-100%) skewX(-12deg); }
                  100% { transform: translateX(100%) skewX(-12deg); }
                }
              `}</style>
            </div>

            {/* Title */}
            <h3
              className="text-xl font-bold text-white mb-4 leading-tight"
              style={{
                opacity: 0,
                animation: "fadeIn 0.4s ease forwards 0.2s",
              }}
            >
              <span className="bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent">
                {cert.title}
              </span>
            </h3>
            {/* Category badge */}
            <div
              className="absolute top-4 right-4"
              style={{
                opacity: 0,
                animation: "fadeInRight 0.4s ease forwards 0.3s",
              }}
            >
              <div className="px-4 py-2 rounded-full backdrop-blur-xl bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-400/30 transition-transform duration-300 hover:scale-105">
                <span className="text-xs font-semibold bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-cyan-300">
                  {cert.category}
                </span>
              </div>
            </div>
            {/* Issuer and date info */}
            <div
              className="space-y-3 mb-6"
              style={{
                opacity: 0,
                animation: "fadeIn 0.4s ease forwards 0.4s",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 backdrop-blur-sm flex items-center justify-center border border-violet-400/30 transition-transform duration-800 hover:rotate-360">
                  <div className="w-3 h-3 rounded-full bg-violet-400" />
                </div>
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
            </div>

            {/* Enhanced CTA button */}
            <button
              className="relative w-full p-4 rounded-xl overflow-hidden group border border-violet-400/20 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]"
              onClick={() => window.open(cert.credentialUrl, "_blank")}
              style={{
                boxShadow: isHovered
                  ? "0 15px 35px -5px rgba(139, 92, 246, 0.4)"
                  : "none",
              }}
            >
              {/* Button background animation */}
              <div
                className="absolute inset-0 rounded-xl transition-all duration-400"
                style={{
                  background: isHovered
                    ? "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(6,182,212,0.1))"
                    : "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                }}
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

              <style>{`
                @keyframes buttonShine {
                  0% { transform: translateX(-100%) skewX(-12deg); opacity: 0; }
                  50% { opacity: 0.5; }
                  100% { transform: translateX(100%) skewX(-12deg); opacity: 0; }
                }
              `}</style>
            </button>
          </div>
        </div>
      </div>
    );
  }
);

CertificationCard.displayName = "CertificationCard";

const Certification = () => {
  const containerRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { ref: sectionRef, hasBeenInView } = useInView({ threshold: 0.1 });

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
      <div onMouseMove={handleMouseMove} ref={sectionRef}>
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-800 ${
            hasBeenInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* Enhanced title section */}
          <div
            className={`mb-20 relative text-center transition-all duration-1000 ${
              hasBeenInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-12"
            }`}
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
              Professional certifications showcasing expertise across cloud
              computing, full-stack development, and data science domains.
            </p>
          </div>

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
          <div
            className={`mt-20 text-center transition-all duration-800 ${
              hasBeenInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <div className="inline-flex items-center gap-8 px-8 py-4 rounded-2xl backdrop-blur-xl bg-gradient-to-r from-violet-500/10 via-transparent to-cyan-500/10 border border-white/10">
              <div className="text-center transition-transform duration-300 hover:scale-110">
                <div className="text-2xl font-bold text-white mb-1">
                  {certifications.length}
                </div>
                <div className="text-sm text-gray-400">Certifications</div>
              </div>
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              <div className="text-center transition-transform duration-300 hover:scale-110">
                <div className="text-2xl font-bold text-white mb-1">3</div>
                <div className="text-sm text-gray-400">Tech Domains</div>
              </div>
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              <div className="text-center transition-transform duration-300 hover:scale-110">
                <div className="text-2xl font-bold text-white mb-1">100%</div>
                <div className="text-sm text-gray-400">Verified</div>
              </div>
            </div>
          </div>
        </div>
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
