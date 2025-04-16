import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence, useScroll } from "framer-motion";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange(() => setIsScrolled(scrollY.get() > 0));
  }, [scrollY]);

  const menuItems = [
    { id: "home", name: "Home" },
    { id: "skills", name: "Skills" },
    { id: "certifications", name: "Certifications" },
    { id: "projects", name: "Projects" },
    { id: "education", name: "Education" },
    { id: "experience", name: "Experience" },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setNav(false);
    }
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full z-50"
    >
      <motion.div
        className={`glass-effect mx-4 my-4 rounded-2xl transition-all duration-300 ${
          isScrolled ? "shadow-lg shadow-purple-500/10 bg-white/10" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.h1
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold gradient-text cursor-pointer"
              onClick={() => scrollToSection("home")}
            >
              IO.
            </motion.h1>

            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-8">
              {menuItems.map((item) => (
                <motion.li
                  key={item.id}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-300 hover:text-white cursor-pointer transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-purple-500 transition-all duration-300 group-hover:w-full" />
                </motion.li>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setNav(!nav)}
              className="md:hidden cursor-pointer text-gray-300 p-2"
            >
              {!nav ? <FaBars size={20} /> : <FaTimes size={20} />}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {nav && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden"
          >
            <div className="glass-effect mx-4 rounded-2xl py-4">
              {menuItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ x: 10 }}
                  onClick={() => scrollToSection(item.id)}
                  className="px-4 py-3 text-center text-gray-300 hover:text-white cursor-pointer hover:bg-white/5 transition-colors"
                >
                  {item.name}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;
