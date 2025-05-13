import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

const Certification = () => {
  const containerRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 30, mass: 0.8 };
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0.8, 1, 1, 0.8]);

  const certifications = [
    {
      id: 1,
      title: "Oracle Cloud Infrastructure Foundations 2024 Certified Associate",
      issuer: "Oracle",
      date: "Feb 2025",
      credential: "OCIFA-123456",
      logo: "/images/oracle.png",
      color: "from-cyan-500 to-blue-600",
      bgAccent: "bg-blue-500/20",
    },
    {
      id: 2,
      title: "MERN Stack Developer",
      issuer: "Udemy",
      date: "Aug 2024",
      credential: "MSD-123456",
      logo: "/images/Udemy-Logo.png",
      color: "from-fuchsia-500 to-purple-600",
      bgAccent: "bg-violet-500/20",
    },
  ];

  const float = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);

  // Parallax effect for background elements
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.2, 0.6, 0.6, 0.2]);

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
    <div id="certifications" className="relative min-h-screen py-24" ref={containerRef} onMouseMove={handleMouseMove}>
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
            rotate: useTransform(scrollYProgress, [0, 1], [0, 10]) 
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
            transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
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
                transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg)`,
              }}
            >
              {/* Ambient light effect */}
              <motion.div
                animate={{
                  boxShadow: hoveredCard === cert.id 
                    ? `0 0 80px 10px rgba(139, 92, 246, 0.15)`
                    : `0 0 40px 5px rgba(139, 92, 246, 0.07)`
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
                      scale: 0.5
                    }}
                    animate={{ 
                      x: `${Math.random() * 100}%`, 
                      y: `${Math.random() * 100}%`,
                      opacity: [0.2, 0.8, 0.2],
                      scale: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 5 + Math.random() * 10, 
                      repeat: Infinity,
                      repeatType: "mirror"
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
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
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

                <motion.div
                  initial={false}
                  whileHover={{ y: -5, boxShadow: "0 15px 30px -10px rgba(139, 92, 246, 0.2)" }}
                  className="relative mt-6 p-4 rounded-xl border border-white/10 backdrop-blur-sm bg-gradient-to-br from-white/[0.07] to-transparent"
                >
                  <AnimatePresence>
                    {hoveredCard === cert.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="absolute -right-2 -top-2 p-1.5 rounded-full bg-gradient-to-br from-violet-500/80 to-blue-500/80 text-xs font-medium"
                      >
                        Verified
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div className="flex items-center space-x-2">
                    <motion.span 
                      animate={{ 
                        textShadow: hoveredCard === cert.id ? "0 0 8px rgba(139, 92, 246, 0.7)" : "none" 
                      }}
                      className="text-sm font-medium text-violet-300"
                    >
                      Credential ID:
                    </motion.span>
                    <span className="text-sm text-white/80 font-mono tracking-wider">
                      {cert.credential}
                    </span>
                  </div>
                  
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: hoveredCard === cert.id ? "100%" : "0%" }}
                    transition={{ duration: 0.8 }}
                    className={`absolute bottom-0 left-0 h-px bg-gradient-to-r ${cert.color} opacity-50`}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <style jsx>{`
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