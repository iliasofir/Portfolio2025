import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useMemo, memo } from "react";

// Composant mémorisé pour une compétence
const SkillItem = memo(({ skill, index, hoveredCard }) => (
  <motion.li
    variants={{
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 },
    }}
    whileHover={{ x: 10, color: "#fff" }}
    className="flex items-center gap-3"
    style={{ willChange: "transform, color" }}
  >
    <motion.span
      animate={{
        scale: hoveredCard ? [1, 1.2, 1] : 1,
        rotate: hoveredCard ? [0, 360, 0] : 0,
      }}
      transition={{ duration: 2, repeat: Infinity }}
      className="text-violet-400"
      style={{ willChange: "transform" }}
    >
      ⚡
    </motion.span>
    <span>{skill}</span>
  </motion.li>
));

// Composant mémorisé pour un tag de technologie
const TechTag = memo(({ tech }) => (
  <motion.span
    whileHover={{
      scale: 1.1,
      backgroundColor: "rgba(139, 92, 246, 0.2)",
    }}
    className="px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-400"
    style={{ willChange: "transform" }}
  >
    {tech}
  </motion.span>
));

const Experience = () => {
  const containerRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);

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

  // Mémorisation des variantes d'animation
  const container = useMemo(
    () => ({
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
        },
      },
    }),
    []
  );

  const item = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 },
    }),
    []
  );

  // Mémorisation des compétences
  const skills = useMemo(
    () => [
      "Software Architecture and Scalable Design",
      "Full-Stack Development (React.js, Node.js, Django)",
      "Data Clustering and Data Cleaning",
      "Database Management (PostgreSQL)",
      "Agile Methodologies and Git",
    ],
    []
  );

  // Mémorisation des technologies
  const technologies = useMemo(
    () => ["Django", "React", "PostgreSQL", "Machine Learning"],
    []
  );

  return (
    <div
      id="experience"
      className="relative min-h-screen py-20"
      ref={containerRef}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent animate-pulse" />
      </div>

      <motion.div
        style={{
          opacity: useSpring(opacity, springConfig),
          scale: useSpring(scale, springConfig),
          willChange: "transform, opacity",
        }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-violet-400 to-purple-600 bg-clip-text text-transparent text-center mb-16"
          style={{ willChange: "transform, opacity" }}
        >
          Experience
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-12"
        >
          <motion.div
            variants={item}
            whileHover={{ scale: 1.02 }}
            onHoverStart={() => setHoveredCard(true)}
            onHoverEnd={() => setHoveredCard(false)}
            className="backdrop-blur-lg bg-white/5 rounded-3xl p-8 border border-violet-500/20 hover:border-violet-500/40 transition-all duration-300 shadow-2xl hover:shadow-violet-500/10"
            style={{ willChange: "transform" }}
          >
            <motion.div
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              style={{ willChange: "transform, opacity" }}
            >
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 1 }}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center"
                  style={{ willChange: "transform" }}
                >
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    src="/images/ehtp.jpg"
                    alt="EHTP Logo"
                    className="w-12 h-12 object-contain border-1 border-violet-500 rounded-full"
                    style={{ willChange: "transform" }}
                  />
                </motion.div>
                <div>
                  <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-bold text-gray-200"
                  >
                    Data Science & Software Engineering Intern
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-violet-400"
                  >
                    Hassania School of Public Works
                  </motion.p>
                </div>
              </div>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="inline-flex px-6 py-2 rounded-full text-sm font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20"
                style={{ willChange: "transform" }}
              >
                Summer 2023
              </motion.span>
            </motion.div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{ willChange: "transform, opacity" }}
              >
                <h4 className="text-xl font-semibold text-violet-400">
                  Acquired Skills
                </h4>
                <motion.ul
                  variants={container}
                  className="space-y-4 text-gray-300 leading-relaxed list-none"
                >
                  {skills.map((skill, index) => (
                    <SkillItem
                      key={index}
                      skill={skill}
                      index={index}
                      hoveredCard={hoveredCard}
                    />
                  ))}
                </motion.ul>
              </motion.div>

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{ willChange: "transform, opacity" }}
              >
                <h4 className="text-xl font-semibold text-violet-400">
                  Project Completed
                </h4>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-black/30 rounded-xl p-6 border border-violet-500/10 overflow-hidden"
                  style={{ willChange: "transform" }}
                >
                  <div className="relative group">
                    <motion.img
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                      src="/images/yop3.png"
                      alt="Plateforme E-learning"
                      className="w-full h-48 object-cover rounded-lg mb-4"
                      style={{ willChange: "transform, opacity" }}
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg flex items-end"
                    >
                      <div className="p-4 text-white">
                        <motion.span
                          initial={{ y: 20, opacity: 0 }}
                          whileHover={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          Voir plus de détails
                        </motion.span>
                      </div>
                    </motion.div>
                  </div>
                  <motion.h5
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg font-medium text-gray-200 mb-3"
                  >
                    Intelligent E-learning Platform
                  </motion.h5>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-400 mb-4"
                  >
                    An innovative platform facilitating student-teacher
                    interaction with advanced online learning features.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap gap-2"
                    style={{ willChange: "opacity" }}
                  >
                    {technologies.map((tech) => (
                      <TechTag key={tech} tech={tech} />
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Experience;
