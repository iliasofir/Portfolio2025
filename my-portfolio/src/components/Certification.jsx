import React, { useRef, useState, useMemo, memo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";

// Composant mémorisé pour une certification
const CertificationCard = memo(
  ({ cert, index, hoveredCard, setHoveredCard }) => (
    <motion.div
      key={cert.id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setHoveredCard(cert.id)}
      onHoverEnd={() => setHoveredCard(null)}
      className="group relative"
      style={{ willChange: "transform, opacity" }}
    >
      <motion.div
        animate={{
          boxShadow:
            hoveredCard === cert.id
              ? `0 20px 50px rgba(139, 92, 246, 0.3)`
              : `0 10px 30px rgba(0, 0, 0, 0.1)`,
        }}
        className={`relative overflow-hidden rounded-3xl ${cert.bgAccent} backdrop-blur-xl border border-white/10 p-8 h-full`}
      >
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${cert.color
              .replace("from-", "")
              .replace("to-", ", ")})`,
            filter: "blur(100px)",
          }}
        />

        <div className="relative z-10">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br p-3 shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${cert.color
                .replace("from-", "")
                .replace("to-", ", ")})`,
              willChange: "transform",
            }}
          >
            <img
              src={cert.logo}
              alt={cert.issuer}
              className="w-full h-full object-contain filter brightness-0 invert"
            />
          </motion.div>

          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-bold text-white mb-3 leading-tight"
          >
            {cert.title}
          </motion.h3>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-2 mb-6"
          >
            <p className="text-violet-300 font-medium">{cert.issuer}</p>
            <p className="text-gray-400 text-sm">{cert.date}</p>
            <p className="text-gray-500 text-xs font-mono">{cert.credential}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium text-white border border-white/20"
            style={{ willChange: "transform" }}
          >
            <span>View Certificate</span>
            <motion.svg
              animate={{ x: hoveredCard === cert.id ? 5 : 0 }}
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </motion.svg>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
);

const Certification = () => {
  const containerRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Mémorisation de la configuration du spring
  const springConfig = useMemo(
    () => ({ stiffness: 100, damping: 30, mass: 0.8 }),
    []
  );

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.9, 1],
    [0.8, 1, 1, 0.8]
  );

  // Mémorisation des certifications
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
        color: "from-red-300 to-red-600 ",
        bgAccent: "bg-blue-500/20",
      },
      {
        id: 2,
        title: "MERN Stack Developer",
        issuer: "Udemy",
        date: "Aug 2024",
        credentialUrl: "https://www.linkedin.com/in/ilias-ofir-445b91295/details/certifications/1726409009042/single-media-viewer/?profileId=ACoAAEeLNjUBZGYFEyr2xQDond17qZWEny61fwE",
        logo: "/images/Udemy-Logo.png",
        color: "from-fuchsia-500 to-purple-600",
        bgAccent: "bg-violet-500/20",
      },
      {
        id: 3,
        title: "Big Data Foundations - Level 2",
        issuer: "IBM",
        date: "May 2025",
        credentialUrl: "https://www.credly.com/badges/4db3fdd4-ee7f-45c2-af7c-6cb4617e2bd6/linked_in_profile",
        logo: "/images/IBM_logo.png",
        color: "from-blue-500 to-cyan-400",
        bgAccent: "bg-blue-500/20",
      },
    ],
    []
  );

  const float = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);

  // Parallax effect for background elements
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const backgroundOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.2, 0.6, 0.6, 0.2]
  );

  // Mouse parallax for cards
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePosition({ x, y });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 60,
      rotateX: -15,
      scale: 0.95,
    },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 1.2,
      },
    },
  };

  return (
    <div
      id="certifications"
      className="relative min-h-screen py-24"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* Keep the gradient you wanted to preserve */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent animate-pulse" />

      {/* Modern 2025-style background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating mesh gradients */}
        <motion.div
          style={{ y: backgroundY, opacity: backgroundOpacity }}
          className="absolute -top-1/2 -left-1/4 w-full h-full"
        >
          <div className="absolute w-full h-full bg-gradient-radial from-violet-600/10 via-transparent to-transparent blur-3xl" />
        </motion.div>

        <motion.div
          style={{ y: float }}
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-400/5 blur-3xl"
        />

        <motion.div
          style={{
            y: useTransform(scrollYProgress, [0, 1], [100, -100]),
            rotate: useTransform(scrollYProgress, [0, 1], [0, 10]),
          }}
          className="absolute bottom-0 left-0 w-full h-1/2"
        >
          <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_rgba(79,_70,_229,_0.05)_0%,_transparent_50%)] blur-2xl" />
        </motion.div>

        {/* Mesh grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxkZWZzPgogICAgPHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxwYXRoIGQ9Ik0gNTAgMCBMIDAgMCAwIDUwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPgogICAgPC9wYXR0ZXJuPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPgo8L3N2Zz4=')]" />
      </div>

      <motion.div
        style={{
          opacity: useSpring(opacity, springConfig),
          scale: useSpring(scale, springConfig),
        }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="mb-24 relative"
        >
          <motion.div
            animate={{
              filter: ["blur(4px)", "blur(0px)", "blur(4px)"],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute -z-10 inset-0 flex justify-center items-center"
          >
            <div className="w-2/3 h-32 bg-gradient-conic from-violet-500/20 via-blue-500/20 to-violet-500/20 rounded-full blur-3xl" />
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold text-center relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 drop-shadow-[0_0_35px_rgba(167,139,250,0.3)]">
              Certifications
            </span>
          </h2>

          <motion.div
            initial={{ opacity: 0, width: "0%" }}
            whileInView={{ opacity: 1, width: "40%" }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="h-px bg-gradient-to-r from-transparent via-violet-400/30 to-transparent mx-auto mt-6"
          />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 perspective-1000"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              variants={item}
              whileHover={{
                scale: 1.02,
                rotateY: 5,
                translateZ: 20,
              }}
              onHoverStart={() => setHoveredCard(cert.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className="group relative w-full min-h-[280px] rounded-2xl p-1 transition-all duration-500 overflow-hidden"
              style={{
                transformStyle: "preserve-3d",
                transform: `perspective(1000px) rotateX(${
                  mousePosition.y * 0.02
                }deg) rotateY(${mousePosition.x * 0.02}deg)`,
              }}
            >
              {/* Ambient light effect */}
              <motion.div
                animate={{
                  boxShadow:
                    hoveredCard === cert.id
                      ? `0 0 80px 10px rgba(139, 92, 246, 0.15)`
                      : `0 0 40px 5px rgba(139, 92, 246, 0.07)`,
                }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0 rounded-2xl"
              />

              {/* Animated border */}
              <div className="absolute inset-0 p-px rounded-2xl bg-gradient-to-br from-violet-500/50 via-transparent to-blue-500/50 opacity-30 group-hover:opacity-100 transition-all duration-500" />

              {/* Glass effect */}
              <div className="absolute inset-0 rounded-2xl backdrop-blur-lg bg-white/[0.03]" />

              {/* Particle system */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      x: `${Math.random() * 100}%`,
                      y: `${Math.random() * 100}%`,
                      opacity: 0.2,
                      scale: 0.5,
                    }}
                    animate={{
                      x: `${Math.random() * 100}%`,
                      y: `${Math.random() * 100}%`,
                      opacity: [0.2, 0.8, 0.2],
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 5 + Math.random() * 10,
                      repeat: Infinity,
                      repeatType: "mirror",
                    }}
                    className={`absolute w-2 h-2 rounded-full ${cert.bgAccent}`}
                    style={{ filter: "blur(1px)" }}
                  />
                ))}
              </div>

              {/* Card content container */}
              <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <motion.div
                      whileHover={{ rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`relative w-16 h-16 rounded-2xl overflow-hidden backdrop-blur-sm bg-gradient-to-br ${cert.bgAccent}`}
                    >
                      <motion.div
                        animate={{
                          rotate: [0, 360],
                          opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute inset-0 rounded-full bg-gradient-conic from-white/20 via-transparent to-white/20"
                      />

                      <img
                        src={cert.logo}
                        alt={`${cert.issuer} logo`}
                        className="relative z-10 w-full h-full object-contain p-2 drop-shadow-xl"
                      />
                    </motion.div>

                    <div className="space-y-1 flex-1">
                      <motion.h3
                        layout
                        className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 drop-shadow-sm leading-tight"
                      >
                        {cert.title}
                      </motion.h3>

                      <div className="flex items-center gap-3">
                        <motion.span
                          layout
                          className={`text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r ${cert.color}`}
                        >
                          {cert.issuer}
                        </motion.span>

                        <motion.span
                          className={`text-sm font-medium py-1 px-4 rounded-full border border-white/10 shadow-lg ${cert.bgAccent} backdrop-blur-md`}
                        >
                          {cert.date}
                        </motion.span>
                      </div>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{
                    y: -2,
                    boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="relative mt-6 w-full p-3 rounded-xl border border-white/20 backdrop-blur-sm bg-gradient-to-br from-white/[0.07] to-transparent hover:from-white/[0.12] transition-all duration-300 group"
                  onClick={() => window.open(cert.credentialUrl, "_blank")}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <motion.span className="text-sm font-medium text-white group-hover:text-violet-300 transition-colors">
                      Get Crendential
                    </motion.span>
                    <motion.svg
                      animate={{
                        x: hoveredCard === cert.id ? 3 : 0,
                        rotate: hoveredCard === cert.id ? 45 : 0,
                      }}
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

                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: hoveredCard === cert.id ? "100%" : "0%" }}
                    transition={{ duration: 0.8 }}
                    className={`absolute bottom-0 left-0 h-px bg-gradient-to-r ${cert.color} opacity-50`}
                  />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .bg-gradient-conic {
          background-image: conic-gradient(var(--tw-gradient-stops));
        }
        .bg-gradient-radial {
          background-image: radial-gradient(var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
};

export default Certification;
