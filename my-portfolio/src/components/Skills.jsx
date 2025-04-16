import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const Skills = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 30 };
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.9, 1],
    [0.8, 1, 1, 0.8]
  );

  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { name: "Python", image: "/images/tech/python.png" },
        { name: "Java", image: "/images/tech/java.png" },
        { name: "JavaScript", image: "/images/tech/javascript.png" },
      ],
    },
    {
      title: "Web Development",
      skills: [
        { name: "React.js", image: "/images/tech/react.webp" },
        { name: "Node.js", image: "/images/tech/nodejs.png" },
        { name: "Spring Boot", image: "/images/tech/spring-boot.png" },
        { name: "Django", image: "/images/tech/django.svg" },
        { name: "Express.js", image: "/images/tech/expressjs.png" },
        { name: "GraphQL", image: "/images/tech/graphql.png" },
      ],
    },
    {
      title: "Databases",
      skills: [
        { name: "MySQL", image: "/images/tech/mysql.svg" },
        { name: "PostgreSQL", image: "/images/tech/postgresql.png" },
        { name: "MongoDB", image: "/images/tech/mongodb.webp" },
      ],
    },
    {
      title: "Machine Learning",
      skills: [
        { name: "PyTorch", image: "/images/tech/pytorch.png" },
        { name: "Neural Networks", image: "/images/tech/neural.png" },
        { name: "Data Clustering", image: "/images/tech/clustering.png" },
      ],
    },
    {
      title: "Tools & DevOps",
      skills: [
        { name: "Git", image: "/images/tech/git.png" },
        { name: "Docker", image: "/images/tech/docker.png" },
        { name: "REST APIs", image: "/images/tech/rest.png" },
        { name: "WebSockets", image: "/images/tech/websocket.png" },
        { name: "Oracle Cloud", image: "/images/tech/oracle.png" },
        { name: "Jenkins", image: "/images/tech/jenkins.png" },
      ],
    },
    {
      title: "Software Architecture",
      skills: [
        { name: "MVC", image: "/images/tech/mvc.png" },
        { name: "Microservices", image: "/images/tech/microservice.png" },
        { name: "System Design", image: "/images/tech/system-design.png" },
      ],
    },
  ];

  return (
    <div
      id="skills"
      className="relative min-h-screen py-20 overflow-hidden"
      ref={containerRef}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent animate-pulse" />
      </div>

      <motion.div
        style={{
          opacity: useSpring(opacity, springConfig),
          scale: useSpring(scale, springConfig),
        }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold gradient-text text-center mb-16"
        >
          Skills & Technologies
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="skill-card-glow glass-effect rounded-3xl p-6 backdrop-blur-xl"
            >
              <h3 className="text-2xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  {category.title}
                </span>
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {category.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: skillIdx * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="group"
                  >
                    <div className="flex flex-col items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                      <div className="h-12 mb-3 relative flex items-center justify-center">
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"
                        />
                        <img
                          src={skill.image}
                          alt={skill.name}
                          className="max-h-full w-auto object-contain filter-white"
                        />
                      </div>
                      <p className="text-center text-gray-300 text-sm font-medium group-hover:text-white transition-colors">
                        {skill.name}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Skills;
