import Typewriter from "typewriter-effect";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const rotateX = useTransform(y, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const techLogos = [
    {
      src: "/images/tech/javascript.png",
      name: "JavaScript",
      position: { x: -160, y: -120 },
    },
    { src: "/images/tech/java.png", name: "Java", position: { x: 120, y: 0 } },
    {
      src: "/images/tech/python.png",
      name: "Python",
      position: { x: 0, y: -160 },
    },
    {
      src: "/images/tech/react.webp",
      name: "React",
      position: { x: -160, y: -20 },
    },
    {
      src: "/images/tech/spring-boot.png",
      name: "Spring Boot",
      position: { x: 110, y: -120 },
    },
  ];

  return (
    <div
      id="home"
      className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden"
    >
      {/* Background Elements avec effet de profondeur */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-indigo-900/20 to-gray-900">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.1),transparent_50%)]"
        />
      </div>

      {/* Effet de particules amélioré */}
      <div className="absolute w-full h-full">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/30 rounded-full filter blur-3xl opacity-50"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-500/30 rounded-full filter blur-3xl opacity-50"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-violet-500/30 rounded-full filter blur-3xl opacity-50"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl w-full relative z-10"
      >
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Container de la photo avec effet de perspective */}
          <motion.div
            className="relative w-72 h-72 md:w-[400px] md:h-[400px] perspective"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Effet de halo lumineux */}
            <motion.div
              className="absolute -inset-4 rounded-2xl"
              animate={{
                boxShadow: isHovered
                  ? "0 0 80px 30px rgba(139, 92, 246, 0.15)"
                  : "0 0 40px 15px rgba(139, 92, 246, 0.1)",
              }}
              transition={{ duration: 0.8 }}
            />

            {/* Logos flottants */}
            <motion.div
              className="absolute inset-0 z-30"
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.8,
              }}
              transition={{ duration: 0.4 }}
            >
              {techLogos.map((logo, index) => (
                <motion.div
                  key={logo.name}
                  className="absolute left-1/2 top-1/2"
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 0,
                  }}
                  animate={{
                    x: isHovered ? logo.position.x : 0,
                    y: isHovered ? logo.position.y : 0,
                    opacity: isHovered ? 1 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                    delay: index * 0.1,
                  }}
                >
                  <motion.div
                    animate={{
                      y: [0, 15, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 4 + index,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                  >
                    <motion.div className="relative">
                      {/* Effet de halo lumineux */}
                      <motion.div
                        className="absolute -inset-4 rounded-2xl"
                        animate={{
                          boxShadow: [
                            "0 0 25px 8px rgba(139, 92, 246, 0.4)",
                            "0 0 35px 12px rgba(139, 92, 246, 0.6)",
                            "0 0 25px 8px rgba(139, 92, 246, 0.4)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut",
                        }}
                      />

                      <motion.div
                        className="relative w-16 h-16 rounded-2xl bg-slate-800/80 p-2.5 flex items-center justify-center"
                        style={{
                          backdropFilter: "blur(8px)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        <motion.img
                          src={logo.src}
                          alt={logo.name}
                          className="w-full h-full object-contain"
                          style={{
                            filter: "contrast(5) brightness(1.1)",
                          }}
                          whileHover={{
                            scale: 1.2,
                            filter:
                              "contrast(5) brightness(1.2) drop-shadow(0 0 16px rgba(139, 92, 246, 0.8))",
                          }}
                        />
                      </motion.div>

                      {/* Effet de trainée énergétique amélioré */}
                      <motion.div
                        className="absolute inset-0 -z-10"
                        animate={{
                          opacity: [0.4, 0.7, 0.4],
                          scale: [1, 1.4, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <div className="w-full h-full rounded-2xl bg-gradient-to-r from-violet-500/40 to-blue-500/40 blur-lg" />
                      </motion.div>

                      {/* Effet de particules amélioré */}
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 rounded-full bg-violet-400"
                          animate={{
                            x: [0, (Math.random() - 0.5) * 50],
                            y: [0, (Math.random() - 0.5) * 50],
                            opacity: [1, 0],
                            scale: [1.2, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeOut",
                          }}
                          style={{
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                            boxShadow: "0 0 10px rgba(139, 92, 246, 0.6)",
                          }}
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Conteneur de l'image avec effet de verre */}
            <motion.div
              className="relative w-full h-full rounded-2xl overflow-hidden backdrop-blur-sm bg-gradient-to-br from-white/10 to-white/5"
              style={{ transform: "translateZ(20px)" }}
            >
              {/* Bordure animée */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{
                  background: isHovered
                    ? "linear-gradient(120deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3))"
                    : "linear-gradient(120deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))",
                }}
                transition={{ duration: 0.8 }}
              />

              {/* L'image elle-même */}
              <motion.img
                src="/images/your_photo.png"
                alt="Ilias Ofir"
                className="w-full h-full object-contain relative z-10"
                style={{
                  filter: "drop-shadow(0 0 20px rgba(139, 92, 246, 0.3))",
                  transform: "translateZ(40px)",
                }}
                animate={{
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{ duration: 0.4 }}
              />

              {/* Effet de particules autour de l'image */}
              <motion.div
                className="absolute inset-0 z-20"
                animate={{
                  opacity: isHovered ? 1 : 0,
                }}
                transition={{ duration: 0.4 }}
              >
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-violet-400/30"
                    animate={{
                      x: [0, Math.random() * 100 - 50],
                      y: [0, Math.random() * 100 - 50],
                      scale: [0, 1.5, 0],
                      opacity: [0, 0.6, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                    }}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          <div className="flex-1 text-center md:text-left">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-violet-400 font-medium text-xl mb-4"
            >
              Hello, I'm
            </motion.p>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold gradient-text mb-4"
            >
              Ilias Ofir
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-3xl md:text-5xl font-bold text-gray-400 mb-6"
            >
              <Typewriter
                options={{
                  strings: [
                    "Software Engineer",
                    "Full Stack Developer",
                    "Problem Solver",
                  ],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 50,
                  delay: 50,
                }}
              />
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-300 text-lg leading-relaxed mb-8"
            >
              I am a passionate software engineer dedicated to developing
              innovative and high-performance applications. I combine creativity
              and technical expertise to create efficient solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center md:justify-start gap-4"
            >
              {[
                {
                  name: "GitHub",
                  icon: <FaGithub className="w-6 h-6" />,
                  href: "https://github.com/iliasofir",
                },
                {
                  name: "LinkedIn",
                  icon: <FaLinkedin className="w-6 h-6" />,
                  href: "https://www.linkedin.com/in/ilias-ofir-445b91295/",
                },
                {
                  name: "Resume",
                  icon: <HiDownload className="w-6 h-6" />,
                  href: "/Resume.pdf",
                },
              ].map((platform) => (
                <motion.a
                  key={platform.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={platform.href}
                  download={platform.name === "Resume"}
                  target={platform.name !== "Resume" ? "_blank" : undefined}
                  rel={
                    platform.name !== "Resume"
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="glass-effect px-6 py-3 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  {platform.icon}
                  <span className="gradient-text font-medium">
                    {platform.name}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
