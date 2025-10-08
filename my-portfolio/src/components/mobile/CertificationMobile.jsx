import React, { useRef, useState, useMemo, memo, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// Mobile-optimized certification card with reduced complexity for better performance
const CertificationCardMobile = memo(
  ({ cert, index, hoveredCard, setHoveredCard }) => {
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

    // Simplified network nodes for mobile (fewer elements)
    const networkNodes = useMemo(
      () =>
        Array.from({ length: 4 }, (_, i) => ({
          id: i,
          x: 20 + i * 25,
          y: 20 + (i % 2) * 60,
        })),
      []
    );

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: index * 0.1,
          duration: 0.6,
          type: "spring",
          stiffness: 80,
        }}
        viewport={{ once: true, margin: "-20px" }}
        whileHover={{ scale: 1.02 }}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        className="group relative"
        style={{ willChange: "transform" }}
      >
        {/* Simplified border effect for mobile */}
        <motion.div
          animate={{
            background: isHovered
              ? "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(6,182,212,0.2))"
              : "linear-gradient(135deg, rgba(139,92,246,0.1), rgba(6,182,212,0.05))",
          }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 rounded-2xl p-[1px] opacity-60"
        >
          <div className="w-full h-full rounded-2xl bg-gray-900/95" />
        </motion.div>

        {/* Main card container */}
        <motion.div
          animate={{
            boxShadow: isHovered
              ? "0 20px 60px -15px rgba(139, 92, 246, 0.3)"
              : "0 8px 30px -10px rgba(0, 0, 0, 0.3)",
          }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden rounded-2xl backdrop-blur-xl bg-gradient-to-br from-gray-900/50 via-gray-800/40 to-gray-900/50 p-6 h-full"
        >
          {/* Simplified network background for mobile */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full">
              {networkNodes.map((node) => (
                <motion.circle
                  key={node.id}
                  cx={`${node.x}%`}
                  cy={`${node.y}%`}
                  r="1.5"
                  fill="#8b5cf6"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: node.id * 0.5,
                  }}
                />
              ))}
              {/* Simplified connecting lines */}
              {networkNodes.map((node, i) => (
                <motion.line
                  key={i}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${networkNodes[(i + 1) % networkNodes.length].x}%`}
                  y2={`${networkNodes[(i + 1) % networkNodes.length].y}%`}
                  stroke="#8b5cf6"
                  strokeWidth="0.5"
                  animate={{
                    opacity: isHovered ? [0, 0.2, 0] : 0,
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />
              ))}
            </svg>
          </div>

          {/* Reduced floating particles for mobile performance */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: `${20 + i * 15}%`,
                  y: `${30 + (i % 2) * 40}%`,
                }}
                animate={{
                  x: [`${20 + i * 15}%`, `${25 + i * 15}%`, `${20 + i * 15}%`],
                  y: [
                    `${30 + (i % 2) * 40}%`,
                    `${25 + (i % 2) * 40}%`,
                    `${30 + (i % 2) * 40}%`,
                  ],
                  opacity: isHovered ? [0, 0.4, 0] : 0,
                }}
                transition={{
                  duration: 6 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-1 h-1 bg-violet-400/40 rounded-full"
              />
            ))}
          </div>

          <div className="relative z-10">
            {/* Logo with simplified effects for mobile */}
            <motion.div
              whileHover={{
                scale: 1.05,
                filter: "drop-shadow(0 0 15px rgba(139, 92, 246, 0.4))",
              }}
              transition={{ duration: 0.3 }}
              className="relative w-16 h-16 mb-4 rounded-xl p-2 overflow-hidden"
            >
              {/* Simplified background for mobile */}
              <motion.div
                animate={{
                  background: [
                    "linear-gradient(45deg, rgba(139,92,246,0.15), rgba(6,182,212,0.1))",
                    "linear-gradient(135deg, rgba(6,182,212,0.1), rgba(139,92,246,0.15))",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-xl"
              />

              <img
                src={cert.logo}
                alt={cert.issuer}
                className="relative z-10 w-full h-full object-contain drop-shadow-md"
              />
            </motion.div>

            {/* Title with simplified animation */}
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-lg font-bold text-white mb-3 leading-tight"
            >
              <span className="bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent">
                {cert.title}
              </span>
            </motion.h3>

            {/* Info section optimized for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-2 mb-4"
            >
              <div className="flex items-center gap-2">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500/15 to-cyan-500/15 backdrop-blur-sm flex items-center justify-center border border-violet-400/20"
                >
                  <div className="w-2 h-2 rounded-full bg-violet-400" />
                </motion.div>
                <p className="text-violet-300 font-semibold text-base">
                  {cert.issuer}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-500/15 to-slate-500/15 backdrop-blur-sm flex items-center justify-center border border-gray-400/20">
                  <svg
                    className="w-2.5 h-2.5 text-gray-300"
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
                <p className="text-gray-300 font-medium text-sm">{cert.date}</p>
              </div>

              {/* Category badge for mobile */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center px-3 py-1 rounded-lg bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-400/20"
              >
                <span className="text-xs font-medium text-violet-300">
                  {cert.category}
                </span>
              </motion.div>
            </motion.div>

            {/* Simplified CTA button for mobile */}
            <motion.button
              whileHover={{
                scale: 1.02,
                boxShadow: "0 8px 25px -8px rgba(139, 92, 246, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full p-3 rounded-lg overflow-hidden border border-violet-400/20 backdrop-blur-sm"
              onClick={() => window.open(cert.credentialUrl, "_blank")}
            >
              {/* Simplified button background */}
              <motion.div
                animate={{
                  background: isHovered
                    ? "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(6,182,212,0.08))"
                    : "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 rounded-lg"
              />

              <div className="relative flex items-center justify-center space-x-2">
                <motion.span
                  animate={{
                    color: isHovered ? "#a78bfa" : "#ffffff",
                  }}
                  transition={{ duration: 0.3 }}
                  className="font-medium text-sm"
                >
                  View Certificate
                </motion.span>
                <motion.svg
                  animate={{
                    x: isHovered ? 3 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-4 h-4 text-violet-400"
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

const CertificationMobile = () => {
  const containerRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Lighter spring configuration for mobile
  const springConfig = useMemo(
    () => ({ stiffness: 100, damping: 25, mass: 0.3 }),
    []
  );

  // Simplified scroll animations for mobile
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.95, 1, 1, 0.95]
  );
  const backgroundY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  // Certifications data
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
    ],
    []
  );

  return (
    <div
      id="certifications"
      className="relative min-h-screen py-16 px-4 overflow-hidden"
      ref={containerRef}
    >
      {/* Simplified background for mobile performance */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Reduced complexity energy field */}
        <motion.div style={{ y: backgroundY }} className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-radial from-violet-600/10 via-violet-600/3 to-transparent rounded-full blur-2xl" />
          <div className="absolute bottom-20 right-1/4 w-56 h-56 bg-gradient-radial from-cyan-500/8 via-cyan-500/2 to-transparent rounded-full blur-2xl" />
        </motion.div>

        {/* Simplified grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full">
            <defs>
              <pattern
                id="mobile-grid"
                x="0"
                y="0"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="40"
                  cy="40"
                  r="0.5"
                  fill="rgba(139, 92, 246, 0.4)"
                />
                <path
                  d="M 0 40 Q 20 20 40 40 T 80 40"
                  stroke="rgba(139, 92, 246, 0.1)"
                  strokeWidth="0.3"
                  fill="none"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mobile-grid)" />
          </svg>
        </div>

        {/* Reduced floating orbs for mobile */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i,
            }}
            className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400 blur-sm"
            style={{
              left: `${30 + i * 20}%`,
              top: `${40 + (i % 2) * 20}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        style={{
          opacity: useSpring(opacity, springConfig),
          scale: useSpring(scale, springConfig),
        }}
        className="max-w-lg mx-auto relative z-10"
      >
        {/* Mobile-optimized title section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
          className="mb-16 relative text-center"
        >
          {/* Simplified title backdrop */}
          <motion.div
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 flex justify-center items-center -z-10"
          >
            <div className="w-full h-16 bg-gradient-to-r from-transparent via-violet-500/15 to-transparent blur-xl rounded-full" />
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-black relative"
            animate={{
              textShadow: [
                "0 0 15px rgba(139, 92, 246, 0.4)",
                "0 0 25px rgba(139, 92, 246, 0.6)",
                "0 0 15px rgba(139, 92, 246, 0.4)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-200 to-cyan-200">
              Certifications
            </span>
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "70%" }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="h-0.5 bg-gradient-to-r from-transparent via-violet-400 to-transparent mx-auto mt-4 rounded-full"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 text-gray-300 text-base font-light max-w-sm mx-auto"
          >
            Professional certifications across cloud, development, and data
            domains.
          </motion.p>
        </motion.div>

        {/* Mobile-optimized cards grid */}
        <div className="space-y-6">
          {certifications.map((cert, index) => (
            <CertificationCardMobile
              key={cert.id}
              cert={cert}
              index={index}
              hoveredCard={hoveredCard}
              setHoveredCard={setHoveredCard}
            />
          ))}
        </div>

        {/* Simplified statistics footer for mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-6 px-6 py-3 rounded-xl backdrop-blur-lg bg-gradient-to-r from-violet-500/8 via-transparent to-cyan-500/8 border border-white/10">
            <motion.div whileHover={{ scale: 1.05 }} className="text-center">
              <div className="text-xl font-bold text-white mb-1">
                {certifications.length}
              </div>
              <div className="text-xs text-gray-400">Certs</div>
            </motion.div>
            <div className="w-px h-6 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            <motion.div whileHover={{ scale: 1.05 }} className="text-center">
              <div className="text-xl font-bold text-white mb-1">3</div>
              <div className="text-xs text-gray-400">Domains</div>
            </motion.div>
            <div className="w-px h-6 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            <motion.div whileHover={{ scale: 1.05 }} className="text-center">
              <div className="text-xl font-bold text-white mb-1">100%</div>
              <div className="text-xs text-gray-400">Verified</div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .bg-gradient-radial {
          background-image: radial-gradient(var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
};

export default CertificationMobile;
