import React, { useRef, useState, useMemo, memo, useCallback } from "react";
import QuantumBackground from "../QuantumBackground";
import { useInView } from "../../hooks/useScrollAnimations";

// Mobile-optimized certification card with reduced complexity for better performance
const CertificationCardMobile = memo(
  ({ cert, index, hoveredCard, setHoveredCard }) => {
    const { ref, hasBeenInView } = useInView({ threshold: 0.2 });

    // Optimized hover handlers
    const handleHoverStart = useCallback(
      () => setHoveredCard(cert.id),
      [cert.id, setHoveredCard]
    );
    const handleHoverEnd = useCallback(
      () => setHoveredCard(null),
      [setHoveredCard]
    );

    const isHovered = hoveredCard === cert.id;

    return (
      <div
        ref={ref}
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
        className={`group relative transition-all duration-600 ${
          hasBeenInView
            ? "animate-fadeInUp hover:scale-[1.02]"
            : "opacity-0 translate-y-12"
        }`}
        style={{
          willChange: "transform",
          transitionDelay: `${index * 100}ms`,
        }}
      >
        {/* Simplified border effect for mobile */}
        <div
          className={`absolute inset-0 rounded-2xl p-[1px] opacity-60 transition-all duration-400 ${
            isHovered
              ? "bg-gradient-to-br from-violet-500/30 to-cyan-500/20"
              : "bg-gradient-to-br from-violet-500/10 to-cyan-500/5"
          }`}
        >
          <div className="w-full h-full rounded-2xl bg-gray-900/95" />
        </div>

        {/* Main card container */}
        <div
          className={`relative overflow-hidden rounded-2xl backdrop-blur-lg bg-gradient-to-br from-gray-900/50 via-gray-800/40 to-gray-900/50 p-6 h-full transition-shadow duration-300 ${
            isHovered
              ? "shadow-[0_20px_60px_-15px_rgba(139,92,246,0.3)]"
              : "shadow-[0_8px_30px_-10px_rgba(0,0,0,0.3)]"
          }`}
        >
          <div className="relative z-10">
            {/* Logo with simplified effects for mobile */}
            <div className="relative w-16 h-16 mb-4 rounded-xl p-2 overflow-hidden hover:scale-105 hover:[filter:drop-shadow(0_0_15px_rgba(139,92,246,0.4))] transition-all duration-300">
              {/* Simplified background for mobile */}
              <div
                className="absolute inset-0 rounded-xl"
                style={{
                  background:
                    "linear-gradient(45deg, rgba(139,92,246,0.15), rgba(6,182,212,0.1))",
                }}
              />

              <img
                src={cert.logo}
                alt={cert.issuer}
                className="relative z-10 w-full h-full object-contain drop-shadow-md"
              />
            </div>

            {/* Title with simplified animation */}
            <h3 className="text-lg font-bold text-white mb-3 leading-tight">
              <span className="bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent">
                {cert.title}
              </span>
            </h3>

            {/* Category badge */}
            <div className="absolute top-4 right-4">
              <div className="px-3 py-1.5 rounded-full backdrop-blur-xl bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-400/30 hover:scale-105 transition-transform duration-300">
                <span className="text-xs font-semibold bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-cyan-300">
                  {cert.category}
                </span>
              </div>
            </div>

            {/* Info section optimized for mobile */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500/15 to-cyan-500/15 backdrop-blur-sm flex items-center justify-center border border-violet-400/20 hover:scale-110 transition-transform duration-300">
                  <div className="w-2 h-2 rounded-full bg-violet-400" />
                </div>
                <p className="text-violet-300 font-semibold text-base">
                  {cert.issuer}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-500/15 to-slate-500/15 backdrop-blur-sm flex items-center justify-center border border-gray-400/20">
                  <svg
                    className="w-2.5 h-2.5 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-gray-300 font-medium text-sm">{cert.date}</p>
              </div>
            </div>

            {/* Simplified CTA button for mobile */}
            <button
              className={`relative w-full p-3 rounded-lg overflow-hidden border border-violet-400/20 backdrop-blur-sm hover:scale-[1.02] hover:shadow-[0_8px_25px_-8px_rgba(139,92,246,0.4)] active:scale-[0.98] transition-all duration-300`}
              onClick={() => window.open(cert.credentialUrl, "_blank")}
            >
              {/* Simplified button background */}
              <div
                className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                  isHovered
                    ? "bg-gradient-to-br from-violet-500/12 to-cyan-500/8"
                    : "bg-gradient-to-br from-white/4 to-white/2"
                }`}
              />

              <div className="relative flex items-center justify-center space-x-2">
                <span
                  className={`font-medium text-sm transition-colors duration-300 ${
                    isHovered ? "text-violet-300" : "text-white"
                  }`}
                >
                  View Certificate
                </span>
                <svg
                  className={`w-4 h-4 text-violet-400 transition-transform duration-300 ${
                    isHovered ? "translate-x-1" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }
);

const CertificationMobile = () => {
  const containerRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const { ref: sectionRef, hasBeenInView } = useInView({ threshold: 0.2 });

  // Certifications data
  const certifications = useMemo(
    () => [
      {
        id: 1,
        title:
          "Oracle Cloud Infrastructure Foundations 2024 Certified Associate",
        issuer: "Oracle",
        date: "Feb 2025",
        credentialUrl:
          "https://catalog-education.oracle.com/pls/certview/sharebadge?id=179EEB1994E84E7775CE1A02A09FB5756CD771CE6432B02C74E00C7184EDA076",
        logo: "/images/oracle.png",
        color: "from-red-400 to-orange-500",
        bgAccent: "bg-red-500/10",
        category: "Cloud Computing",
      },

      {
        id: 2,
        title: "Oracle Cloud Infrastructure 2025 Certified DevOps Professional",
        issuer: "Oracle",
        date: "Oct 2025",
        credentialUrl:
          "https://catalog-education.oracle.com/ords/certview/sharebadge?id=BC2817D66FE80005AE4C6DA8B5461FB2F42B7FBF434BC1B48DC36E8811CC974D",
        logo: "/images/oracle.png",
        color: "from-blue-400 to-cyan-500",
        bgAccent: "bg-blue-500/10",
        category: "Cloud Computing",
      },
      {
        id: 3,
        title: "Big Data Foundations - Level 2",
        issuer: "IBM",
        date: "May 2025",
        credentialUrl:
          "https://www.credly.com/badges/4db3fdd4-ee7f-45c2-af7c-6cb4617e2bd6/linked_in_profile",
        logo: "/images/IBM_logo.png",
        color: "from-blue-400 to-cyan-500",
        bgAccent: "bg-blue-500/10",
        category: "Data Science",
      },
      {
        id: 4,
        title: "Oracle Cloud Infrastructure 2025 Certified Architect Associate",
        issuer: "Oracle",
        date: "Dec 2025",
        credentialUrl:
          "https://catalog-education.oracle.com/ords/certview/sharebadge?id=25B257ACD9F5D0A50D1CBC16498B4442F543B8A12BF3651E16583FC9C49E66E6",
        logo: "/images/oracle.png",
        color: "from-violet-400 to-violet-600",
        bgAccent: "bg-violet-500/10",
        category: "Cloud Computing",
      },
      {
        id: 5,
        title: "MERN Stack Developer",
        issuer: "Udemy",
        date: "Aug 2024",
        credentialUrl:
          "https://www.linkedin.com/in/ilias-ofir-445b91295/details/certifications/1726409009042/single-media-viewer/?profileId=ACoAAEeLNjUBZGYFEyr2xQDond17qZWEny61fwE",
        logo: "/images/Udemy-Logo.png",
        color: "from-purple-400 to-violet-600",
        bgAccent: "bg-violet-500/10",
        category: "Web Development",
      },
    ],
    []
  );

  return (
    <QuantumBackground
      id="certifications"
      containerRef={containerRef}
      variant="purple"
    >
      <div
        ref={sectionRef}
        className={`max-w-lg mx-auto relative z-10 px-4 transition-all duration-1000 ${
          hasBeenInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Mobile-optimized title section */}
        <div className="mb-16 relative text-center">
          {/* Simplified title backdrop */}
          <div className="absolute inset-0 flex justify-center items-center -z-10">
            <div className="w-full h-16 bg-gradient-to-r from-transparent via-violet-500/15 to-transparent blur-xl rounded-full animate-pulse" />
          </div>

          <h2 className="text-5xl md:text-7xl font-black relative animate-textGlow">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-200 to-cyan-200">
              Certifications
            </span>
          </h2>

          <div
            className="h-0.5 bg-gradient-to-r from-transparent via-violet-400 to-transparent mx-auto mt-4 rounded-full animate-expand"
            style={{ animationDelay: "300ms" }}
          />

          <p
            className="mt-4 text-gray-300 text-base font-light max-w-sm mx-auto animate-fadeIn"
            style={{ animationDelay: "600ms" }}
          >
            Professional certifications across cloud, development, and data
            domains.
          </p>
        </div>

        {/* Mobile-optimized cards grid */}
        <div className="space-y-6">
          {certifications.map((cert, index) => (
            <CertificationCardMobile
              key={cert.id}
              cert={cert}
              index={index}
              hoveredCard={hoveredCard}
              setHoveredCard={setHoveredCard}
            />
          ))}
        </div>

        {/* Simplified statistics footer for mobile */}
        <div
          className="mt-16 text-center animate-fadeInUp"
          style={{ animationDelay: "300ms" }}
        >
          <div className="inline-flex items-center gap-6 px-6 py-3 rounded-xl backdrop-blur-lg bg-gradient-to-r from-violet-500/8 via-transparent to-cyan-500/8 border border-white/10">
            <div className="text-center hover:scale-105 transition-transform duration-300">
              <div className="text-xl font-bold text-white mb-1">
                {certifications.length}
              </div>
              <div className="text-xs text-gray-400">Certs</div>
            </div>
            <div className="w-px h-6 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            <div className="text-center hover:scale-105 transition-transform duration-300">
              <div className="text-xl font-bold text-white mb-1">3</div>
              <div className="text-xs text-gray-400">Domains</div>
            </div>
            <div className="w-px h-6 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            <div className="text-center hover:scale-105 transition-transform duration-300">
              <div className="text-xl font-bold text-white mb-1">100%</div>
              <div className="text-xs text-gray-400">Verified</div>
            </div>
          </div>
        </div>
      </div>
    </QuantumBackground>
  );
};

export default CertificationMobile;
