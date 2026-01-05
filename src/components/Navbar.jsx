import { useState, useEffect, useMemo, useCallback, memo } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

// Simplified menu item components without motion
const DesktopMenuItem = memo(({ item, scrollToSection }) => (
  <li
    onClick={() => scrollToSection(item.id)}
    className="text-gray-300 hover:text-white cursor-pointer transition-all duration-300 hover-scale relative group"
  >
    {item.name}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-purple-500 transition-all duration-300 group-hover:w-full" />
  </li>
));

const MobileMenuItem = memo(({ item, scrollToSection }) => (
  <div
    onClick={() => scrollToSection(item.id)}
    className="px-4 py-3 text-center text-gray-300 hover:text-white cursor-pointer hover:bg-white/5 transition-all duration-300"
  >
    {item.name}
  </div>
));

const Navbar = () => {
  const [nav, setNav] = useState(false);
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

  // Smart hide/show navbar on scroll with direction detection - Using native scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed w-full z-50 transition-transform duration-300 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div
        className={`glass-effect mx-4 my-4 rounded-2xl transition-all duration-300 ${
          isScrolled
            ? "shadow-lg shadow-purple-500/20 bg-white/10"
            : "bg-white/5"
        }`}
        style={{
          transform: isScrolled ? "scale(0.98)" : "scale(1)",
          backdropFilter: isScrolled ? "blur(20px)" : "blur(10px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="flex items-center justify-between transition-all duration-300"
            style={{ height: isScrolled ? "56px" : "64px" }}
          >
            <h1
              className="font-bold gradient-text cursor-pointer transition-all duration-300 hover-scale"
              onClick={() => scrollToSection("home")}
              style={{ fontSize: isScrolled ? "1.25rem" : "1.5rem" }}
            >
              IO.
            </h1>

            {/* Desktop Menu */}
            <ul
              className="hidden md:flex transition-all duration-300"
              style={{
                opacity: isScrolled ? 0.95 : 1,
                gap: isScrolled ? "1.5rem" : "2rem",
              }}
            >
              {menuItems.map((item) => (
                <DesktopMenuItem
                  key={item.id}
                  item={item}
                  scrollToSection={scrollToSection}
                />
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <div
              onClick={toggleNav}
              className="md:hidden cursor-pointer text-gray-300 p-2 hover-scale transition-transform duration-300"
            >
              {!nav ? <FaBars size={20} /> : <FaTimes size={20} />}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {nav && (
        <div className="md:hidden animate-slide-in-top">
          <div className="glass-effect mx-4 rounded-2xl py-4">
            {menuItems.map((item) => (
              <MobileMenuItem
                key={item.id}
                item={item}
                scrollToSection={scrollToSection}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
