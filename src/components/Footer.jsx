import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useMemo, memo, useRef } from "react";
import QuantumBackground from "./QuantumBackground";

// Composant mémorisé pour un lien social
const SocialLink = memo(({ link, index }) => (
  <motion.a
    whileHover={{
      scale: 1.1,
      backgroundColor: "rgba(255,255,255,0.1)",
    }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.3,
      delay: index * 0.1,
    }}
    href={link.href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-4 glass-effect rounded-2xl hover:text-violet-400 transition-all duration-300 border border-transparent hover:border-violet-400/30"
    style={{ willChange: "transform" }}
  >
    {link.icon}
  </motion.a>
));

const Footer = () => {
  const containerRef = useRef(null);

  // Mémorisation des liens sociaux
  const socialLinks = useMemo(
    () => [
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
        name: "Email",
        icon: <FaEnvelope className="w-6 h-6" />,
        href: "mailto:iliassmilodon@gmail.com",
      },
    ],
    []
  );

  // Mémorisation de l'année courante
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <QuantumBackground
      containerRef={containerRef}
      variant="default"
      className="py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-effect rounded-3xl p-12 text-center shadow-xl border border-[rgba(255,255,255,0.1)] backdrop-blur-md">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black relative text-center mb-10 tracking-tight"
            animate={{
              opacity: 1,
              y: 0,
              textShadow: [
                "0 0 15px rgba(139, 92, 246, 0.4)",
                "0 0 25px rgba(139, 92, 246, 0.6)",
                "0 0 15px rgba(139, 92, 246, 0.4)",
              ],
            }}
            transition={{
              opacity: { duration: 0.6 },
              y: { duration: 0.6 },
              textShadow: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            style={{ willChange: "transform, opacity" }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-200 to-cyan-200">
              Let's Connect
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center space-x-8 mb-10"
            style={{ willChange: "transform, opacity" }}
          >
            {socialLinks.map((link, index) => (
              <SocialLink key={link.name} link={link} index={index} />
            ))}
          </motion.div>

          <div className="space-y-3">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="text-gray-300 font-medium"
            >
              Built with React & TailwindCSS
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="text-gray-400 text-sm"
            >
              © {currentYear} Ilias Ofir. All rights reserved.
            </motion.p>
          </div>
        </div>
      </div>
    </QuantumBackground>
  );
};

export default Footer;
