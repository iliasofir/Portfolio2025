import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useMemo, memo, useRef } from "react";
import QuantumBackground from "./QuantumBackground";
import "../styles/animations.css";

// Simplified social link component
const SocialLink = memo(({ link, index }) => (
  <a
    href={link.href}
    target="_blank"
    rel="noopener noreferrer"
    className={`p-4 glass-effect rounded-2xl hover:text-violet-400 transition-all duration-300 border border-transparent hover:border-violet-400/30 hover-scale animate-slide-in-bottom stagger-${
      index + 1
    }`}
  >
    {link.icon}
  </a>
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
          <h2 className="text-4xl md:text-5xl font-black relative text-center mb-10 tracking-tight animate-fade-in">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-200 to-cyan-200">
              Let's Connect
            </span>
          </h2>

          <div className="flex justify-center space-x-8 mb-10">
            {socialLinks.map((link, index) => (
              <SocialLink key={link.name} link={link} index={index} />
            ))}
          </div>

          <div className="space-y-3">
            <p className="text-gray-300 font-medium animate-fade-in stagger-4">
              Built with React & TailwindCSS
            </p>

            <p className="text-gray-400 text-sm animate-fade-in stagger-5">
              © {currentYear} Ilias Ofir. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </QuantumBackground>
  );
};

export default Footer;
