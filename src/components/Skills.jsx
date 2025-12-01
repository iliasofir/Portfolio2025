import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useMemo, memo, useCallback, useState } from "react";
import QuantumBackground from "./QuantumBackground";

// Composant mémorisé pour une compétence individuelle optimisé
const SkillItem = memo(({ skill, skillIdx }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: skillIdx * 0.05, duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group"
      style={{ willChange: "transform" }}
    >
      <div className="flex flex-col items-center p-4 rounded-xl bg-white/5 hover:bg-white/8 transition-colors duration-200">
        <div className="h-12 mb-3 relative flex items-center justify-center">
          {/* Animation de glow simplifiée - seulement au hover */}
          <motion.div
            animate={{
              opacity: isHovered ? 0.6 : 0.2,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-blue-500/20 rounded-full"
            style={{ willChange: "transform, opacity", filter: "blur(8px)" }}
          />
          <img
            src={skill.image}
            alt={skill.name}
            className="max-h-full w-auto object-contain filter-white relative z-10"
            loading="lazy"
          />
        </div>
        <p className="text-center text-gray-300 text-sm font-medium group-hover:text-white transition-colors duration-200">
          {skill.name}
        </p>
      </div>
    </motion.div>
  );
});

// Composant mémorisé pour une catégorie de compétences optimisé
const SkillCategory = memo(({ category, idx }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: idx * 0.08 }}
    className="bg-white/5 border border-white/10 rounded-2xl p-6"
    style={{ willChange: "transform" }}
  >
    <h3 className="text-2xl font-bold mb-6">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
        {category.title}
      </span>
    </h3>

    <div className="grid grid-cols-2 gap-4">
      {category.skills.map((skill, skillIdx) => (
        <SkillItem key={skill.name} skill={skill} skillIdx={skillIdx} />
      ))}
    </div>
  </motion.div>
));

const Skills = () => {
  const containerRef = useRef(null);

  // Configuration de scroll optimisée avec throttling
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Mémorisation de la configuration du spring optimisée
  const springConfig = useMemo(
    () => ({
      stiffness: 120,
      damping: 40,
      mass: 0.8,
      restDelta: 0.001,
    }),
    []
  );

  // Transforms optimisés avec ranges plus agressifs
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.95, 1, 1, 0.95]
  );

  // Mémorisation des catégories de compétences avec optimisation des images
  const skillCategories = useMemo(
    () => [
      {
        title: "Programming Languages",
        skills: [
          { name: "Java", image: "/images/tech/java.png" },
          { name: "JavaScript", image: "/images/tech/javascript.png" },
          { name: "TypeScript", image: "/images/tech/typescript.png" },
          { name: "Python", image: "/images/tech/python.png" },
        ],
      },
      {
        title: "Web Development",
        skills: [
          { name: "Spring Boot", image: "/images/tech/spring-boot.png" },
          { name: "React.js", image: "/images/tech/react.webp" },
          { name: "Angular.js", image: "/images/tech/Angular.png" },
          { name: "Nest.js", image: "/images/tech/nestjs.png" },
          { name: "Laravel", image: "/images/tech/Laravel.png" },
          { name: "Django", image: "/images/tech/django.svg" },
        ],
      },
      {
        title: "Databases",
        skills: [
          { name: "MySQL", image: "/images/tech/mysql.svg" },
          { name: "PostgreSQL", image: "/images/tech/postgresql.png" },
          { name: "MongoDB", image: "/images/tech/mongodb.webp" },
          { name: "Oracle DB", image: "/images/tech/OracleDB.png" },
        ],
      },
      {
        title: "Machine Learning",
        skills: [
          { name: "PyTorch", image: "/images/tech/pytorch.png" },
          { name: "Neural Networks", image: "/images/tech/neural.png" },
          { name: "Fine-Tuning", image: "/images/tech/fine.png" },
          { name: "CrewAI", image: "/images/tech/crewai.png" },
        ],
      },
      {
        title: "Tools & DevOps",
        skills: [
          { name: "Git", image: "/images/tech/git.png" },
          { name: "supabase", image: "/images/tech/supabase.png" },
          { name: "Docker", image: "/images/tech/docker.png" },
          { name: "Kubernetes", image: "/images/tech/kubernetes.png" },
          { name: "Terraform", image: "/images/tech/terraform.png" },
          { name: "Oracle Cloud", image: "/images/tech/oracle.png" },
          { name: "Jenkins", image: "/images/tech/jenkins.png" },
          { name: "AWS Cloud", image: "/images/tech/aws.png" },
        ],
      },
      {
        title: "Software Architecture",
        skills: [
          { name: "MVC", image: "/images/tech/mvc.png" },
          { name: "Microservices", image: "/images/tech/microservice.png" },
          { name: "System Design", image: "/images/tech/system-design.png" },
          { name: "Serverless Tech", image: "/images/tech/serverless.png" },

        ],
      },
    ],
    []
  );

  return (
    <QuantumBackground
      id="skills"
      containerRef={containerRef}
      variant="blue"
      className="py-20"
    >
      <motion.div
        style={{
          opacity: useSpring(opacity, springConfig),
          scale: useSpring(scale, springConfig),
          willChange: "transform, opacity",
        }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <motion.h2
          className="text-5xl md:text-7xl font-black relative text-center"
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
            Skills & Technologies
          </span>
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "60%" }}
          transition={{ duration: 2, delay: 0.5 }}
          className="h-0.5 bg-gradient-to-r from-transparent via-violet-400 to-transparent mx-auto mt-6  rounded-full"
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-gray-300 text-lg font-light mb-16 max-w-2xl mx-auto text-center"
        >
          A diverse technical arsenal spanning full-stack development
          frameworks, cloud infrastructure management, and data science .
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <SkillCategory key={category.title} category={category} idx={idx} />
          ))}
        </div>
      </motion.div>
    </QuantumBackground>
  );
};

export default Skills;
