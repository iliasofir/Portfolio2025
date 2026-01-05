import { useRef, useMemo, memo } from "react";
import { useInView } from "../../hooks/useScrollAnimations";

// Mobile-optimized Experience Card
const ExperienceCardMobile = memo(({ experience, index, isLast }) => {
  const { ref, hasBeenInView } = useInView({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-700 ${
        hasBeenInView ? "animate-fadeInUp" : "opacity-0 translate-y-5"
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      {/* Timeline connector */}
      <div
        className="absolute left-4 top-0 w-0.5 bg-gradient-to-b from-violet-400 to-purple-500 opacity-30 transform -translate-x-1/2"
        style={{ height: isLast ? "100%" : "calc(100% + 4rem)" }}
      />

      {/* Timeline dot */}
      <div className="absolute left-4 top-6 w-4 h-4 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full border-2 border-gray-900 z-20 shadow-lg shadow-violet-500/30 transform -translate-x-1/2 hover:scale-110 transition-transform duration-300" />

      {/* Experience Card */}
      <div className="ml-12 backdrop-blur-xl bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-2xl p-6 border border-violet-400/30 hover:border-violet-400/60 transition-all duration-500 shadow-xl hover:shadow-violet-500/20 relative overflow-hidden hover:scale-[1.02]">
        {/* Header with logo and status */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-gray-200 shadow-lg flex-shrink-0 hover:scale-110 transition-transform duration-300">
            <img
              src={experience.logo}
              alt={`${experience.company} Logo`}
              className="w-10 h-10 object-contain rounded-lg"
            />
          </div>
          <span
            className={`px-3 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm hover:scale-105 transition-transform duration-300 ${
              experience.status === "En cours"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40"
                : "bg-violet-500/20 text-violet-300 border border-violet-400/40"
            } shadow-lg`}
          >
            {experience.status}
          </span>
        </div>

        {/* Job title */}
        <h3 className="text-lg font-bold text-white mb-3">{experience.role}</h3>

        {/* Company info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-violet-500/20 border border-violet-400/30 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-2.5 h-2.5 text-violet-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-violet-300 text-sm font-semibold">
              {experience.company}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-600/20 border border-gray-500/30 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-2.5 h-2.5 text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-gray-300 text-sm">{experience.location}</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-600/20 border border-gray-500/30 flex items-center justify-center flex-shrink-0">
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
            <p className="text-gray-300 text-sm">{experience.period}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-200 text-sm leading-relaxed mb-4">
          {experience.description}
        </p>

        {/* Technologies */}
        {experience.technologies && (
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-2 py-1 rounded-lg text-xs font-medium bg-violet-500/15 text-violet-300 border border-violet-400/30 backdrop-blur-sm hover:scale-105 hover:bg-violet-500/30 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

const ExperienceMobile = () => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const { ref: sectionRef, hasBeenInView } = useInView({ threshold: 0.2 });

  // Experience data
  const experiences = useMemo(
    () => [
      {
        role: "Full Stack Java/Angular Engineering Intern",
        company: "Attijariwafa Bank",
        location: "Casablanca, Maroc",
        period: "August 2025 - September 2025",
        status: "Completed",
        logo: "/images/AWF.png",
        description:
          "Built a general assembly application using Spring Boot (Java) and PostgreSQL. Developing a modern Angular + TailwindCSS frontend with a fluid user experience. Integrating advanced features such as JWT authentication, OTP-based login, and automated voting and quorum tracking.",
        technologies: ["Java", "Spring Boot", "Angular", "PostgreSQL", "SMTP"],
      },
      {
        role: "QA Automation Engineering Intern",
        company: "ONCF Group",
        location: "Rabat, Maroc",
        period: "June 2025 - July 2025",
        status: "Completed",
        logo: "/images/oncf.png",
        description:
          "Analyzed and mapped the Source-to-Contract (S2C) financial process in Oracle ERP. Designed detailed test cases and executed functional test campaigns. Explored feasibility of automation using Oracle Application Testing Suite (OATS).",
        technologies: ["Oracle ERP", "OATS", "Test Automation", "QA"],
      },
      {
        role: "Data Science & Software Engineering Intern",
        company: "Hassania School of Public Works",
        location: "Casablanca, Maroc",
        period: "June 2024 - July 2024",
        status: "Completed",
        logo: "/images/ehtp.png",
        description:
          "Built an e-learning platform using Django & PostgreSQL. Applied data clustering/cleaning on structured datasets. Gained hands-on experience in full-stack development (React.js, Node.js, Django).",
        technologies: [
          "Django",
          "PostgreSQL",
          "React.js",
          "Node.js",
          "Data Science",
        ],
      },
    ],
    []
  );

  return (
    <div
      id="experience"
      className="relative min-h-screen py-20 px-6"
      ref={containerRef}
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent animate-pulse" />
      </div>

      <div
        ref={sectionRef}
        className={`max-w-xl mx-auto relative z-10 px-2 transition-all duration-1000 ${
          hasBeenInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <h2 className="text-5xl md:text-7xl font-black relative text-center animate-textGlow">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-200 to-cyan-200">
            Experiences
          </span>
        </h2>

        <div
          className="h-0.5 bg-gradient-to-r from-transparent via-violet-400 to-transparent mx-auto mt-4 rounded-full animate-expand"
          style={{ animationDelay: "300ms" }}
        />

        <p
          className="mt-4 text-gray-300 text-base font-light max-w-sm mx-auto mb-24 text-center animate-fadeIn"
          style={{ animationDelay: "600ms" }}
        >
          Proven track record of delivering full-stack web applications and
          data-driven solutions for enterprise clients.
        </p>

        {/* Timeline container */}
        <div className="relative" ref={timelineRef}>
          {/* Experience cards */}
          <div className="space-y-16">
            {experiences.map((experience, index) => (
              <ExperienceCardMobile
                key={index}
                experience={experience}
                index={index}
                isLast={index === experiences.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceMobile;
