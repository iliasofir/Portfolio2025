import { useState, useEffect, useMemo, useCallback, memo } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence, useScroll } from "framer-motion";

// Composant mémorisé pour les éléments de menu desktop
const DesktopMenuItem = memo(({ item, scrollToSection }) => (
  <motion.li
    whileHover={{ scale: 1.1 }}
    onClick={() => scrollToSection(item.id)}
    className="text-gray-300 hover:text-white cursor-pointer transition-colors relative group"
    style={{ willChange: "transform" }}
  >
    {item.name}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-purple-500 transition-all duration-300 group-hover:w-full" />
  </motion.li>
));

// Composant mémorisé pour les éléments de menu mobile
const MobileMenuItem = memo(({ item, scrollToSection }) => (
  <motion.div
    whileHover={{ x: 10 }}
    onClick={() => scrollToSection(item.id)}
    className="px-4 py-3 text-center text-gray-300 hover:text-white cursor-pointer hover:bg-white/5 transition-colors"
    style={{ willChange: "transform" }}
  >
    {item.name}
  </motion.div>
));

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Mémorisation des éléments de menu
  const menuItems = useMemo(
    () => [
      { id: "about", name: "About" },
      { id: "skills", name: "Skills" },
      { id: "certifications", name: "Certifications" },
      { id: "projects", name: "Projects" },
      { id: "education", name: "Education" },
      { id: "experience", name: "Experiences" },
    ],
    []
  );

  // Optimisation de la fonction scrollToSection avec useCallback
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setNav(false);
    }
  }, []);

  // Optimisation du toggle nav avec useCallback
  const toggleNav = useCallback(() => setNav((prev) => !prev), []);

  // Smart hide/show navbar on scroll with direction detection
  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);

      // Hide navbar when scrolling down, show when scrolling up
      if (latest > lastScrollY && latest > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      setLastScrollY(latest);
    });
  }, [scrollY, lastScrollY]);

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: isHidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed w-full z-50"
    >
      <motion.div
        animate={{
          scale: isScrolled ? 0.98 : 1,
          backdropFilter: isScrolled ? "blur(20px)" : "blur(10px)",
        }}
        transition={{ duration: 0.3 }}
        className={`glass-effect mx-4 my-4 rounded-2xl transition-all duration-300 ${
          isScrolled
            ? "shadow-lg shadow-purple-500/20 bg-white/10"
            : "bg-white/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            animate={{
              height: isScrolled ? 56 : 64,
            }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between"
          >
            <motion.h1
              whileHover={{ scale: 1.05 }}
              animate={{
                fontSize: isScrolled ? "1.25rem" : "1.5rem",
              }}
              transition={{ duration: 0.3 }}
              className="font-bold gradient-text cursor-pointer"
              onClick={() => scrollToSection("home")}
              style={{ willChange: "transform" }}
            >
              IO.
            </motion.h1>

            {/* Desktop Menu with smooth fade */}
            <motion.ul
              animate={{
                opacity: isScrolled ? 0.95 : 1,
                gap: isScrolled ? "1.5rem" : "2rem",
              }}
              transition={{ duration: 0.3 }}
              className="hidden md:flex"
            >
              {menuItems.map((item) => (
                <DesktopMenuItem
                  key={item.id}
                  item={item}
                  scrollToSection={scrollToSection}
                />
              ))}
            </motion.ul>

            {/* Mobile Menu Button optimisé */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleNav}
              className="md:hidden cursor-pointer text-gray-300 p-2"
              style={{ willChange: "transform" }}
            >
              {!nav ? <FaBars size={20} /> : <FaTimes size={20} />}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile Menu optimisé */}
      <AnimatePresence>
        {nav && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden"
            style={{ willChange: "transform, opacity" }}
          >
            <div className="glass-effect mx-4 rounded-2xl py-4">
              {menuItems.map((item) => (
                <MobileMenuItem
                  key={item.id}
                  item={item}
                  scrollToSection={scrollToSection}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;
