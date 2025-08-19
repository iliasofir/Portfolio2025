import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect, useMemo, useCallback, memo } from "react";

// Composant mémorisé pour les particules flottantes
const FloatingParticles = memo(({ isActive, accent, count = 10 }) => {
  const particles = useMemo(() => Array(count).fill(null), [count]);

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 z-10">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            scale: 0,
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
          }}
          animate={{
            opacity: [0, 0.7, 0],
            scale: [0, 1, 0],
            x: [
              Math.random() * 100 - 50,
              Math.random() * 200 - 100,
              Math.random() * 100 - 50,
            ],
            y: [
              Math.random() * 100 - 50,
              Math.random() * 200 - 100,
              Math.random() * 100 - 50,
            ],
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            duration: 2 + Math.random() * 3,
            delay: i * 0.2,
            repeat: Infinity,
          }}
          className="absolute h-2 w-2 rounded-full"
          style={{
            background: `radial-gradient(circle, ${accent}80 0%, transparent 70%)`,
            left: `${50 + (Math.random() * 40 - 20)}%`,
            top: `${50 + (Math.random() * 40 - 20)}%`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
});

// Composant mémorisé pour les indicateurs de coin
const CornerIndicators = memo(({ isActive, accent }) => {
  const positions = useMemo(
    () => [
      "top-0 left-0",
      "top-0 right-0",
      "bottom-0 left-0",
      "bottom-0 right-0",
    ],
    []
  );

  const rotations = useMemo(
    () => ["rotate(0deg)", "rotate(90deg)", "rotate(-90deg)", "rotate(180deg)"],
    []
  );

  return (
    <>
      {positions.map((position, i) => (
        <motion.div
          key={i}
          className={`absolute w-8 h-8 pointer-events-none ${position}`}
          animate={{
            opacity: isActive ? [0.4, 0.8, 0.4] : 0.4,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
          style={{ willChange: "opacity" }}
        >
          <svg
            viewBox="0 0 100 100"
            fill="none"
            className="w-full h-full"
            style={{ transform: rotations[i] }}
          >
            <path d="M0,20 L0,0 L20,0" stroke={accent} strokeWidth="5" />
          </svg>
        </motion.div>
      ))}
    </>
  );
});

// Composant mémorisé pour les points éducatifs
const EducationPoint = memo(({ point, index, isActive, color, accent }) => (
  <motion.li
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.2 }}
    className="flex items-start gap-3 group/item"
    whileHover={{ x: 5 }}
    style={{ willChange: "transform" }}
  >
    <motion.div
      className="relative mt-1 w-4 h-4 flex-shrink-0"
      animate={{
        rotate: isActive ? [0, 180, 360] : 0,
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        delay: index * 0.5,
      }}
      style={{ willChange: "transform" }}
    >
      <svg
        viewBox="0 0 24 24"
        className={`w-full h-full text-transparent fill-current bg-clip-text bg-gradient-to-r ${color}`}
      >
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    </motion.div>

    <motion.span
      className="text-gray-300 relative group-hover/item:text-white transition-colors duration-300"
      whileHover={{ x: 2 }}
      style={{ willChange: "transform, color" }}
    >
      {point}
      <AnimatePresence>
        {isActive && (
          <motion.span
            initial={{ left: "-10%", width: "0%" }}
            animate={{
              left: ["0%", "100%"],
              width: ["0%", "10%", "0%"],
            }}
            exit={{ left: "100%", width: "0%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: index * 0.3,
            }}
            className="absolute inset-y-0 h-full bg-white/20 mix-blend-overlay pointer-events-none"
            style={{ willChange: "transform, width" }}
          />
        )}
      </AnimatePresence>
    </motion.span>
  </motion.li>
));

// Composant mémorisé pour les effets d'aberration chromatique
const ChromaticEffect = memo(({ isActive }) => {
  if (!isActive) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-red-500 mix-blend-screen"
        style={{ transform: "translateX(-5px)", willChange: "opacity" }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-blue-500 mix-blend-screen"
        style={{ transform: "translateX(5px)", willChange: "opacity" }}
      />
    </>
  );
});

const Education = memo(() => {
  const containerRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHydrated, setIsHydrated] = useState(false);

  // Fonction de gestion de la souris optimisée avec throttling
  const handleMouseMove = useCallback((e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
    setMousePosition({
      x: (e.clientX / window.innerWidth - 0.5) * 20,
      y: (e.clientY / window.innerHeight - 0.5) * 20,
    });
  }, []);

  // Gestionnaire de carte active optimisé
  const handleCardHover = useCallback((index) => {
    setActiveCard(index);
  }, []);

  const handleCardLeave = useCallback(() => {
    setActiveCard(null);
  }, []);

  // Tracker de glassmorphisme optimisé
  useEffect(() => {
    setIsHydrated(true);
    let ticking = false;

    const throttledMouseMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleMouseMove(e);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("mousemove", throttledMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", throttledMouseMove);
  }, [handleMouseMove]);

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

  // Mémorisation des données d'éducation
  const educationData = useMemo(
    () => [
      {
        school: "Hassan 1st University - FST Settat",
        degree: "Bachelor's Degree in Software Engineering",
        period: "2023 - Present",
        image: "/images/fst_settat.jpg",
        status: "Current",
        points: [
          "Engineering studies with a focus on Computer Science and Software Development",
          "Focus Areas: Software Engineering, Data Structures, Algorithms",
          "Relevant Coursework: Database Systems, Web Development, Software Design Patterns",
        ],
        color: "from-cyan-400 via-blue-500 to-purple-600",
        bgAccent: "bg-blue-500/20",
        accent: "#8B5CF6",
      },
      {
        school: "Hassan II University of Casablanca - FST Mohammedia",
        degree: "The University Diploma for Science and Techniques",
        period: "2021 - 2023",
        image: "/images/fst_mohammedia.jpg",
        status: "Completed",
        points: [
          "Fundamental studies in Mathematics, Physics, and Computer Science",
          "Preparation for Engineering School",
          "Strong background in Mathematics and Physics",
        ],
        color: "from-emerald-400 via-teal-500 to-cyan-600",
        bgAccent: "bg-emerald-500/20",
        accent: "#10B981",
      },
    ],
    []
  );

  return (
    <div
      id="education"
      className="relative min-h-screen py-20 overflow-hidden"
      ref={containerRef}
    >
      {/* Preserved Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(0,0,0,0))]" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(99,102,241,0.05) 0%, transparent 8%)",
          backgroundSize: "3rem 3rem",
        }}
      />

      {/* Dynamic cursor follower - 2025 trend */}
      {isHydrated && (
        <motion.div
          className="fixed w-64 h-64 rounded-full pointer-events-none z-0 mix-blend-difference"
          animate={{
            x: cursorPosition.x - 128,
            y: cursorPosition.y - 128,
            scale: activeCard !== null ? 1.5 : 1,
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 200,
            mass: 0.8,
          }}
          style={{
            background:
              "radial-gradient(circle, rgba(111, 66, 193, 0.15) 0%, transparent 70%)",
            filter: "blur(10px)",
          }}
        />
      )}

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        style={{
          opacity: useSpring(opacity, springConfig),
          scale: useSpring(scale, springConfig),
          willChange: "transform, opacity",
        }}
      >
        {/* Section d'en-tête optimisée */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-28"
          style={{ willChange: "transform, opacity" }}
        >
          {/* Animation de blob liquide optimisée */}
          <motion.div
            animate={{
              filter: ["blur(20px)", "blur(25px)", "blur(20px)"],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "mirror",
            }}
            className="absolute -z-10 inset-0 flex justify-center items-center"
            style={{ willChange: "transform, filter" }}
          >
            <div className="w-3/4 h-32 bg-gradient-to-r from-violet-600/20 via-fuchsia-500/20 to-indigo-600/20 rounded-full blur-3xl" />
          </motion.div>

          {/* En-tête typographique moderne optimisé */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-violet-400 to-purple-600 bg-clip-text text-transparent text-center mb-16"
            style={{ willChange: "transform, opacity" }}
          >
            Education
          </motion.h2>

          {/* Séparateur de ligne animé optimisé */}
          <div className="relative h-6 flex justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ width: "0%" }}
                whileInView={{
                  width: ["0%", "40%", i === 1 ? "60%" : "40%", "40%"],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatType: "mirror",
                  repeatDelay: 2,
                }}
                className={`h-px absolute bg-gradient-to-r from-transparent via-violet-400/${
                  30 - i * 5
                } to-transparent mx-auto`}
                style={{
                  top: `${i * 4}px`,
                  willChange: "width",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Rail de timeline optimisé */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px">
          <motion.div
            initial={{ height: "0%" }}
            animate={{ height: "100%" }}
            transition={{ duration: 2, delay: 0.5 }}
            className="h-full w-full bg-gradient-to-b from-transparent via-violet-500/20 to-transparent"
            style={{ willChange: "height" }}
          />

          {/* Points animés sur la timeline optimisés */}
          {educationData.map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-3 h-3 rounded-full bg-violet-500"
              style={{
                top: `${(index + 0.5) * 33}%`,
                willChange: "transform, opacity, box-shadow",
              }}
              animate={{
                scale: activeCard === index ? [1, 1.5, 1] : 1,
                opacity: activeCard === index ? [0.7, 1, 0.7] : 0.7,
                boxShadow:
                  activeCard === index
                    ? [
                        "0 0 0px rgba(139, 92, 246, 0)",
                        "0 0 20px rgba(139, 92, 246, 0.7)",
                        "0 0 0px rgba(139, 92, 246, 0)",
                      ]
                    : "none",
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          ))}
        </div>

        <div className="relative space-y-32">
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              onHoverStart={() => handleCardHover(index)}
              onHoverEnd={handleCardLeave}
              className="relative group"
              style={{ willChange: "transform, opacity" }}
            >
              <motion.div
                style={{
                  perspective: "1000px",
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                }}
                animate={{
                  rotateX: activeCard === index ? mousePosition.y * 0.05 : 0,
                  rotateY: activeCard === index ? mousePosition.x * 0.05 : 0,
                  z: activeCard === index ? 20 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative"
              >
                {/* Effet d'attraction magnétique optimisé */}
                <AnimatePresence>
                  {activeCard === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute -inset-12 pointer-events-none"
                      style={{ willChange: "opacity" }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-fuchsia-500/5 rounded-3xl blur-xl" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bordure animée optimisée */}
                <motion.div
                  animate={{
                    background:
                      activeCard === index
                        ? [
                            `linear-gradient(90deg, transparent, ${edu.accent}40, transparent)`,
                            `linear-gradient(180deg, transparent, ${edu.accent}40, transparent)`,
                            `linear-gradient(270deg, transparent, ${edu.accent}40, transparent)`,
                            `linear-gradient(0deg, transparent, ${edu.accent}40, transparent)`,
                            `linear-gradient(90deg, transparent, ${edu.accent}40, transparent)`,
                          ]
                        : "none",
                    backgroundSize: "300% 300%",
                    backgroundPosition:
                      activeCard === index
                        ? ["0% 0%", "0% 100%", "100% 100%", "100% 0%", "0% 0%"]
                        : "0% 0%",
                  }}
                  transition={{ duration: 4, repeat: Infinity, repeatDelay: 0 }}
                  className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    willChange: "background, background-position, opacity",
                  }}
                />

                {/* Carte principale - Interface en verre optimisée */}
                <div className="relative rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/10 p-8 transition-all duration-500 group-hover:bg-white/[0.06] overflow-hidden">
                  {/* Texture de grain optimisée */}
                  <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" />

                  {/* Aberration chromatique dynamique optimisée */}
                  <AnimatePresence>
                    <ChromaticEffect isActive={activeCard === index} />
                  </AnimatePresence>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Section de gauche avec image 3D optimisée */}
                    <div className="relative overflow-hidden rounded-xl">
                      <motion.div
                        className="relative aspect-video"
                        animate={{
                          rotateX: activeCard === index ? [0, 2, 0] : 0,
                          rotateY: activeCard === index ? [0, 5, 0] : 0,
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                        style={{ willChange: "transform" }}
                      >
                        {/* Éléments de particules flottantes optimisés */}
                        <AnimatePresence>
                          <FloatingParticles
                            isActive={activeCard === index}
                            accent={edu.accent}
                            count={6}
                          />
                        </AnimatePresence>

                        {/* Image optimisée */}
                        <div className="relative w-full h-full rounded-xl overflow-hidden">
                          <img
                            src={edu.image}
                            alt={edu.school}
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                          />

                          {/* Superposition cybernétique optimisée */}
                          <motion.div
                            className={`absolute inset-0 bg-gradient-to-br ${edu.color} mix-blend-soft-light`}
                            animate={{
                              opacity:
                                activeCard === index ? [0.3, 0.6, 0.3] : 0.3,
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{ willChange: "opacity" }}
                          />

                          {/* Effet de scan optimisé */}
                          <AnimatePresence>
                            {activeCard === index && (
                              <motion.div
                                initial={{ top: "-100%" }}
                                animate={{ top: ["100%", "0%", "-100%"] }}
                                exit={{ top: "-100%" }}
                                transition={{
                                  duration: 2,
                                  times: [0, 0.5, 1],
                                  repeat: Infinity,
                                  repeatDelay: 1,
                                }}
                                className="absolute left-0 right-0 h-1/3 pointer-events-none"
                                style={{
                                  background: `linear-gradient(to bottom, 
                                    transparent 0%, 
                                    ${edu.accent}30 50%, 
                                    transparent 100%)`,
                                  willChange: "top",
                                }}
                              />
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>

                      {/* Indicateurs de coin futuristes optimisés */}
                      <CornerIndicators
                        isActive={activeCard === index}
                        accent={edu.accent}
                      />
                    </div>

                    {/* Section de contenu avec profondeur en couches optimisée */}
                    <div className="relative">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                        style={{ willChange: "opacity" }}
                      >
                        {/* En-tête avec étiquette flottante optimisée */}
                        <div className="space-y-2 relative">
                          <motion.div
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                            animate={{
                              x: activeCard === index ? [0, 3, 0] : 0,
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                            style={{ willChange: "transform" }}
                          >
                            {/* Diplôme avec texte de largeur variable optimisé */}
                            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 relative">
                              {edu.degree}

                              {/* Effet de surbrillance au survol optimisé */}
                              <AnimatePresence>
                                {activeCard === index && (
                                  <motion.span
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    exit={{ width: "0%" }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                    style={{ willChange: "width" }}
                                  />
                                )}
                              </AnimatePresence>
                            </h3>

                            {/* Indicateur de statut avec pulsation optimisé */}
                            <motion.div
                              className={`px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2
                                ${
                                  edu.status === "Current"
                                    ? "bg-emerald-500/10 text-emerald-400"
                                    : "bg-blue-500/10 text-blue-400"
                                }`}
                              whileHover={{ scale: 1.05 }}
                              style={{ willChange: "transform" }}
                            >
                              {edu.status === "Current" && (
                                <motion.div
                                  className="w-2 h-2 rounded-full bg-emerald-400"
                                  animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.7, 1, 0.7],
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                  }}
                                  style={{ willChange: "transform, opacity" }}
                                />
                              )}
                              {edu.status}
                            </motion.div>
                          </motion.div>

                          {/* Nom de l'école avec arrière-plan dynamique optimisé */}
                          <motion.div
                            className="relative inline-block"
                            animate={{
                              opacity:
                                activeCard === index ? [0.8, 1, 0.8] : 0.8,
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{ willChange: "opacity" }}
                          >
                            {/* Lueur d'arrière-plan optimisée */}
                            <AnimatePresence>
                              {activeCard === index && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{
                                    opacity: 0.1,
                                    scale: 1,
                                    filter: [
                                      "blur(8px)",
                                      "blur(12px)",
                                      "blur(8px)",
                                    ],
                                  }}
                                  exit={{ opacity: 0, scale: 0.9 }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                  className={`absolute -inset-2 rounded-full bg-gradient-to-r ${edu.color}`}
                                  style={{
                                    willChange: "opacity, transform, filter",
                                  }}
                                />
                              )}
                            </AnimatePresence>

                            <p
                              className={`text-xl bg-clip-text text-transparent bg-gradient-to-r ${edu.color} relative z-10`}
                            >
                              {edu.school}
                            </p>
                          </motion.div>
                        </div>

                        {/* Séparateur avec animation lumineuse optimisé */}
                        <motion.div className="relative h-px w-full overflow-hidden">
                          <motion.div
                            initial={{ x: "-100%" }}
                            animate={{
                              x:
                                activeCard === index
                                  ? ["100%", "-100%"]
                                  : "-100%",
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              repeatType: "loop",
                              ease: "linear",
                            }}
                            className={`absolute inset-0 h-px bg-gradient-to-r ${edu.color}`}
                            style={{ willChange: "transform" }}
                          />
                          <div
                            className={`absolute inset-0 h-px bg-gradient-to-r ${edu.color} opacity-20`}
                          />
                        </motion.div>

                        {/* Points avec icônes interactives optimisés */}
                        <ul className="space-y-4">
                          {edu.points.map((point, idx) => (
                            <EducationPoint
                              key={idx}
                              point={point}
                              index={idx}
                              isActive={activeCard === index}
                              color={edu.color}
                              accent={edu.accent}
                            />
                          ))}
                        </ul>

                        {/* Période avec icône animée optimisée */}
                        <motion.div
                          className="inline-flex items-center gap-2 text-sm relative"
                          whileHover={{ x: 5 }}
                          style={{ willChange: "transform" }}
                        >
                          <span
                            className={`text-transparent bg-clip-text bg-gradient-to-r ${edu.color}`}
                          >
                            {edu.period}
                          </span>

                          {/* Flèche animée optimisée */}
                          <motion.div
                            animate={{
                              x: activeCard === index ? [0, 5, 0] : 0,
                              opacity:
                                activeCard === index ? [0.7, 1, 0.7] : 0.7,
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatType: "mirror",
                            }}
                            style={{ willChange: "transform, opacity" }}
                          >
                            <svg
                              className="w-4 h-4 text-violet-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </motion.div>

                          {/* Particules de traînée optimisées */}
                          <AnimatePresence>
                            {activeCard === index && (
                              <motion.div
                                className="absolute -right-2 inset-y-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{ willChange: "opacity" }}
                              >
                                {[0, 1, 2].map((i) => (
                                  <motion.div
                                    key={i}
                                    initial={{
                                      opacity: 0,
                                      x: 0,
                                      y: 0,
                                    }}
                                    animate={{
                                      opacity: [0, 0.8, 0],
                                      x: [0, 20 + i * 5],
                                      y: [0, (i - 1) * 3],
                                    }}
                                    transition={{
                                      duration: 1.5,
                                      repeat: Infinity,
                                      delay: i * 0.3,
                                    }}
                                    className="absolute w-1 h-1 rounded-full"
                                    style={{
                                      background: `radial-gradient(circle, ${edu.accent} 0%, transparent 70%)`,
                                      top: "50%",
                                      transform: "translateY(-50%)",
                                      willChange: "transform, opacity",
                                    }}
                                  />
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
});

Education.displayName = "Education";

export default Education;
