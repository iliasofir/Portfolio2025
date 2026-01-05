import { useRef, useMemo, memo, useState } from "react";
import QuantumBackground from "./QuantumBackground";
import { useInView } from "../hooks/useScrollAnimations";
import "../styles/animations.css";

// Optimized Skill Item with CSS animations
const SkillItem = memo(({ skill, skillIdx }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, hasBeenInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group transition-all duration-400 ${
        hasBeenInView ? 'opacity-100 scale-100' : 'opacity-0 scale-80'
      }`}
      style={{
        transitionDelay: `${skillIdx * 50}ms`,
      }}
    >
      <div className="flex flex-col items-center p-4 rounded-xl bg-white/5 hover:bg-white/8 transition-all duration-200 hover-scale">
        <div className="h-12 mb-3 relative flex items-center justify-center">
          {/* Glow effect */}
          <div
            className={`absolute inset-0 bg-blue-500/20 rounded-full transition-all duration-300`}
            style={{
              opacity: isHovered ? 0.6 : 0.2,
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              filter: 'blur(8px)',
            }}
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
    </div>
  );
});

SkillItem.displayName = "SkillItem";

// Optimized Skill Category with CSS animations
const SkillCategory = memo(({ category, idx }) => {
  const { ref, hasBeenInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-400 ${
        hasBeenInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
      style={{
        transitionDelay: `${idx * 80}ms`,
      }}
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
    </div>
  );
});

SkillCategory.displayName = "SkillCategory";

const Skills = () => {
  const containerRef = useRef(null);
  const { ref: headerRef, hasBeenInView: headerInView } = useInView({ threshold: 0.1 });

  // Mémorisation des catégories de compétences
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={headerRef}>
          {/* Title with text shadow animation */}
          <h2 
            className="text-5xl md:text-7xl font-black relative text-center"
            style={{
              animation: headerInView ? 'textGlow 3s ease-in-out infinite' : 'none',
            }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-200 to-cyan-200">
              Skills & Technologies
            </span>
          </h2>

          {/* Animated underline */}
          <div
            className={`h-0.5 bg-gradient-to-r from-transparent via-violet-400 to-transparent mx-auto mt-6 rounded-full transition-all duration-1000 ${
              headerInView ? 'w-3/5 opacity-100' : 'w-0 opacity-0'
            }`}
            style={{ transitionDelay: '500ms' }}
          />

          {/* Subtitle */}
          <p
            className={`mt-6 text-gray-300 text-lg font-light mb-16 max-w-2xl mx-auto text-center transition-opacity duration-1000 ${
              headerInView ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            A diverse technical arsenal spanning full-stack development
            frameworks, cloud infrastructure management, and data science.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <SkillCategory key={category.title} category={category} idx={idx} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes textGlow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
          }
          50% {
            text-shadow: 0 0 40px rgba(139, 92, 246, 0.8);
          }
        }
      `}</style>
    </QuantumBackground>
  );
};

export default Skills;
