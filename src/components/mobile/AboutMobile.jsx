import { useRef, useState } from "react";
import QuantumBackground from "../QuantumBackground";
import { useInView } from "../../hooks/useScrollAnimations";

const AboutMobile = () => {
  const containerRef = useRef(null);
  const { ref: sectionRef, hasBeenInView } = useInView({ threshold: 0.2 });

  const [activeImage, setActiveImage] = useState(0);

  const images = [
    {
      id: 1,
      src: "/images/about/IMG_1942.webp",
      alt: "Professional Journey",
      caption: "GITEX AFRICA 2025 - Marrakech",
    },
    {
      id: 2,
      src: "/images/about/IMG_2756.webp",
      alt: "Innovation Mindset",
      caption: "Career Forum 2025 - ECC",
    },
    {
      id: 3,
      src: "/images/about/IMG_2426.webp",
      alt: "Tech Passion",
      caption: "GenAI meeting 2025 - EMSI",
    },
  ];

  return (
    <QuantumBackground
      id="about"
      containerRef={containerRef}
      variant="purple"
      className="py-16"
    >
      <div
        ref={sectionRef}
        className={`relative z-10 px-4 transition-all duration-1000 ${
          hasBeenInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Title Section */}
        <h2 className="text-4xl font-black text-center mb-3 animate-textGlow">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-200 to-cyan-200">
            About Me
          </span>
        </h2>
        <div
          className="h-0.5 bg-gradient-to-r from-transparent via-violet-400 to-transparent mx-auto mb-8 rounded-full animate-expand"
          style={{ animationDelay: "500ms" }}
        />

        {/* Profile Image Carousel */}
        <div className="relative mb-8 mx-auto max-w-sm animate-fadeInUp">
          {/* Image Container */}
          <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-2xl">
            {/* Image Slider */}
            <div className="relative w-full h-full">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className={`absolute inset-0 transition-all duration-500 ${
                    activeImage === index
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95"
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400'%3E%3Crect width='300' height='400' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20' fill='%239ca3af'%3EImage%3C/text%3E%3C/svg%3E";
                    }}
                  />

                  {/* Image Overlay Info */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 transition-all duration-500 ${
                      activeImage === index
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-5"
                    }`}
                  >
                    <h3 className="text-xl font-bold text-white mb-1">
                      {image.caption}
                    </h3>
                    <p className="text-gray-300 text-sm">{image.location}</p>
                  </div>

                  {/* Scanning line effect */}
                  <div
                    className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent blur-sm animate-scan"
                    style={{ animationDelay: `${index * 500}ms` }}
                  />
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() =>
                setActiveImage((prev) =>
                  prev === 0 ? images.length - 1 : prev - 1
                )
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-10"
            >
              ←
            </button>
            <button
              onClick={() =>
                setActiveImage((prev) =>
                  prev === images.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-10"
            >
              →
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeImage === index
                      ? "bg-white w-8"
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>

            {/* Decorative corner accents */}
            <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-violet-400/60 rounded-tr-2xl z-10" />
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-cyan-400/60 rounded-bl-2xl z-10" />
          </div>

          {/* Enhanced glow effects */}
          <div className="absolute inset-0 -z-10 rounded-3xl animate-quantum-pulse" />
        </div>

        {/* Introduction Card */}
        <div
          className="relative group mb-6 animate-fadeInUp"
          style={{ animationDelay: "300ms" }}
        >
          <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-6 border border-white/20 shadow-2xl relative overflow-hidden">
            {/* Animated border gradient */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent bg-[length:200%_100%] animate-shimmer" />

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent">
                  Hello! I'm Ilias Ofir
                </span>
              </h3>

              <p className="text-gray-300/95 text-base leading-relaxed">
                Final-year{" "}
                <span className="text-violet-400 font-semibold">
                  Software Engineering student
                </span>{" "}
                with hands-on experience in{" "}
                <span className="text-cyan-400 font-semibold">
                  full-stack development and AI-driven systems
                </span>
                . I build modern web and mobile applications using{" "}
                <span className="text-violet-400 font-semibold">
                  React, Spring Boot, Node.js, Laravel
                </span>
                , and cloud technologies{" "}
                <span className="text-cyan-400 font-semibold">
                  (Oracle Cloud, AWS)
                </span>
                . Guided by clean architecture and UX-focused design, I aim to
                craft solutions that are both{" "}
                <span className="text-violet-400 font-semibold">
                  scalable and intuitive
                </span>
                . Currently seeking opportunities where I can grow, innovate,
                and contribute to real-world engineering challenges.
              </p>
            </div>

            {/* Decorative corner elements */}
            <div className="absolute top-3 right-3 w-12 h-12 border-t-2 border-r-2 border-violet-500/30 rounded-tr-2xl" />
            <div className="absolute bottom-3 left-3 w-12 h-12 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-2xl" />
          </div>
        </div>

        {/* Floating emoji decorations */}
        <div className="absolute top-32 right-8 text-5xl opacity-30 animate-float">
          💻
        </div>

        <div
          className="absolute bottom-32 left-8 text-4xl opacity-30 animate-floatAlt"
          style={{ animationDelay: "1s" }}
        >
          🚀
        </div>

        <div
          className="absolute top-1/2 left-4 text-3xl opacity-25 animate-float"
          style={{ animationDelay: "500ms" }}
        >
          ☕
        </div>
      </div>
    </QuantumBackground>
  );
};

export default AboutMobile;
