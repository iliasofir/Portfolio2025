import React, { useMemo } from "react";
import { motion, useTransform, useScroll } from "framer-motion";

// Code Rain Effect Component
const CodeRain = () => {
  const codeChars = useMemo(
    () => [
      "0",
      "1",
      "{",
      "}",
      "<",
      ">",
      "/",
      "*",
      "+",
      "-",
      "=",
      ";",
      "(",
      ")",
    ],
    []
  );

  const streams = useMemo(
    () =>
      [...Array(30)].map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 5 + Math.random() * 5,
        chars: [...Array(8)].map(
          () => codeChars[Math.floor(Math.random() * codeChars.length)]
        ),
      })),
    [codeChars]
  );

  return (
    <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
      {streams.map((stream) => (
        <motion.div
          key={stream.id}
          className="absolute top-0 text-xs font-mono text-cyan-400"
          style={{ left: `${stream.left}%` }}
          animate={{
            y: ["-100%", "100vh"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: stream.duration,
            repeat: Infinity,
            delay: stream.delay,
            ease: "linear",
          }}
        >
          {stream.chars.map((char, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            >
              {char}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

const QuantumBackground = ({
  containerRef,
  children,
  className = "",
  id,
  variant = "default",
}) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);

  // Different color schemes based on variant
  const getColorScheme = () => {
    switch (variant) {
      case "purple":
        return {
          primary: "violet-600/15",
          secondary: "cyan-500/12",
          conic: "violet-500/8",
          conicTo: "cyan-500/8",
          orbs: "from-violet-400 to-cyan-400",
          gridPrimary: "rgba(139, 92, 246, 0.3)",
          gridSecondary: "rgba(139, 92, 246, 0.1)",
          gridTertiary: "rgba(6, 182, 212, 0.1)",
        };
      case "blue":
        return {
          primary: "blue-600/15",
          secondary: "teal-500/12",
          conic: "blue-500/8",
          conicTo: "teal-500/8",
          orbs: "from-blue-400 to-teal-400",
          gridPrimary: "rgba(59, 130, 246, 0.3)",
          gridSecondary: "rgba(59, 130, 246, 0.1)",
          gridTertiary: "rgba(20, 184, 166, 0.1)",
        };
      case "green":
        return {
          primary: "emerald-600/15",
          secondary: "lime-500/12",
          conic: "emerald-500/8",
          conicTo: "lime-500/8",
          orbs: "from-emerald-400 to-lime-400",
          gridPrimary: "rgba(16, 185, 129, 0.3)",
          gridSecondary: "rgba(16, 185, 129, 0.1)",
          gridTertiary: "rgba(132, 204, 22, 0.1)",
        };
      case "orange":
        return {
          primary: "orange-600/15",
          secondary: "amber-500/12",
          conic: "orange-500/8",
          conicTo: "amber-500/8",
          orbs: "from-orange-400 to-amber-400",
          gridPrimary: "rgba(249, 115, 22, 0.3)",
          gridSecondary: "rgba(249, 115, 22, 0.1)",
          gridTertiary: "rgba(245, 158, 11, 0.1)",
        };
      default:
        return {
          primary: "violet-600/15",
          secondary: "cyan-500/12",
          conic: "violet-500/8",
          conicTo: "cyan-500/8",
          orbs: "from-violet-400 to-cyan-400",
          gridPrimary: "rgba(139, 92, 246, 0.3)",
          gridSecondary: "rgba(139, 92, 246, 0.1)",
          gridTertiary: "rgba(6, 182, 212, 0.1)",
        };
    }
  };

  const colors = getColorScheme();

  return (
    <div
      id={id}
      className={`relative min-h-screen py-24 overflow-hidden ${className}`}
      ref={containerRef}
    >
      {/* Code Rain Effect */}
      <CodeRain />

      {/* Quantum field background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary energy field */}
        <motion.div
          style={{
            y: backgroundY,
            rotateX: rotateX,
          }}
          className="absolute inset-0"
        >
          <div
            className={`absolute top-20 left-1/4 w-96 h-96 bg-gradient-radial from-${
              colors.primary
            } via-${colors.primary.replace(
              "/15",
              "/5"
            )} to-transparent rounded-full blur-3xl`}
          />
          <div
            className={`absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-radial from-${
              colors.secondary
            } via-${colors.secondary.replace(
              "/12",
              "/4"
            )} to-transparent rounded-full blur-3xl`}
          />
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-conic from-${colors.conic} via-transparent to-${colors.conicTo} rounded-full blur-2xl animate-spin-slow`}
          />
        </motion.div>

        {/* Neural network grid */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full">
            <defs>
              <pattern
                id={`neural-grid-${variant}`}
                x="0"
                y="0"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="50" cy="50" r="1" fill={colors.gridPrimary} />
                <path
                  d="M 0 50 Q 25 25 50 50 T 100 50"
                  stroke={colors.gridSecondary}
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M 50 0 Q 75 25 50 50 T 50 100"
                  stroke={colors.gridTertiary}
                  strokeWidth="0.5"
                  fill="none"
                />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill={`url(#neural-grid-${variant})`}
            />
          </svg>
        </div>

        {/* Floating energy orbs */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
            className={`absolute w-4 h-4 rounded-full bg-gradient-to-r ${colors.orbs} blur-sm`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>

      <style>{`
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }

        .bg-gradient-conic {
          background-image: conic-gradient(var(--tw-gradient-stops));
        }

        .bg-gradient-radial {
          background-image: radial-gradient(var(--tw-gradient-stops));
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default QuantumBackground;
