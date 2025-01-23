import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  const menuItems = [
    { id: "home", name: "Home" },
    { id: "skills", name: "Skills" },
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
    <div className="fixed w-full z-50">
      <div className="glass-effect mx-4 my-4 rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold gradient-text">IO.</h1>

            {/* Menu */}
            <ul className="hidden md:flex space-x-8">
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-300 hover:text-white cursor-pointer transition-colors"
                >
                  {item.name}
                </li>
              ))}
            </ul>

            {/* Hamburger */}
            <div
              onClick={handleClick}
              className="md:hidden cursor-pointer text-gray-300"
            >
              {!nav ? <FaBars /> : <FaTimes />}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${!nav ? "hidden" : "block"} md:hidden`}>
        <div className="glass-effect mx-4 rounded-2xl py-4">
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="px-4 py-3 text-center text-gray-300 hover:text-white cursor-pointer"
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
