import { useRef, useState, useMemo, memo } from "react";
import {
  FaGraduationCap,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaAward,
} from "react-icons/fa";
import QuantumBackground from "./QuantumBackground";
import "../styles/animations.css";

// Modern Education Card Component
const EducationCard = memo(({ edu, index, isActive, onHover, onLeave }) => {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`relative flex flex-col lg:flex-row gap-8 items-center animate-slide-in-bottom stagger-${
        index + 1
      }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Timeline Connector */}
      <div className="hidden lg:flex absolute left-1/2 top-0 -translate-x-1/2 flex-col items-center">
        <div
          className={`w-6 h-6 rounded-full ${
            isActive
              ? "bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/50"
              : "bg-slate-700 border-2 border-slate-600"
          } transition-all duration-500 z-10`}
        >
          {isActive && (
            <div className="w-full h-full rounded-full bg-gradient-to-br from-violet-400 to-cyan-400 animate-pulse" />
          )}
        </div>
      </div>

      {/* Card Container */}
      <div
        className={`w-full lg:w-[calc(50%-2rem)] ${
          isEven ? "lg:pr-8 lg:text-right" : "lg:pl-8 lg:ml-auto"
        }`}
      >
        <div
          className={`group relative rounded-2xl overflow-hidden transition-all duration-500 hover-lift ${
            isActive ? "scale-105" : ""
          }`}
        >
          {/* Glowing Border Effect */}
          <div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${edu.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
          />

          {/* Card Content */}
          <div className="relative backdrop-blur-xl bg-slate-900/50 border border-slate-700/50 group-hover:border-violet-500/50 rounded-2xl p-8 transition-all duration-500">
            {/* Status Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 ${
                edu.status === "Current"
                  ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border border-blue-500/30"
              }`}
            >
              {edu.status === "Current" && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              )}
              {edu.status === "Current" ? <FaAward /> : <FaGraduationCap />}
              {edu.status}
            </div>

            {/* University Image */}
            <div className="relative mb-6 rounded-xl overflow-hidden aspect-video group-hover:shadow-2xl group-hover:shadow-violet-500/20 transition-shadow duration-500">
              <img
                src={edu.image}
                alt={edu.school}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-br ${edu.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
              />

              {/* Overlay Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60" />
            </div>

            {/* Degree Title */}
            <h3 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {edu.degree}
            </h3>

            {/* School Name */}
            <div className="flex items-center gap-2 mb-4 text-gray-300">
              <FaMapMarkerAlt
                className={`text-transparent bg-clip-text bg-gradient-to-r ${edu.color}`}
              />
              <p
                className={`text-lg font-medium bg-gradient-to-r ${edu.color} bg-clip-text text-transparent`}
              >
                {edu.school}
              </p>
            </div>

            {/* Period */}
            <div className="flex items-center gap-2 mb-6 text-gray-400">
              <FaCalendarAlt className="text-violet-400" />
              <span className="text-sm font-medium">{edu.period}</span>
            </div>

            {/* Divider */}
            <div
              className={`h-px w-full bg-gradient-to-r ${edu.color} opacity-20 mb-6`}
            />

            {/* Key Points */}
            <div className="space-y-3">
              {edu.points.map((point, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 text-gray-300 hover:text-white transition-colors duration-300 animate-fade-in stagger-${
                    idx + 3
                  }`}
                >
                  <FaCheckCircle
                    className={`mt-1 flex-shrink-0 text-transparent bg-clip-text bg-gradient-to-r ${edu.color}`}
                  />
                  <span className="text-sm leading-relaxed">{point}</span>
                </div>
              ))}
            </div>

            {/* Hover Accent Line */}
            <div
              className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-gradient-to-r ${edu.color} transition-all duration-500 rounded-full`}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

EducationCard.displayName = "EducationCard";

const Education = memo(() => {
  const containerRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);

  // Education data
  const educationData = useMemo(
    () => [
      {
        school: "Hassan 1st University - FST Settat",
        degree: "Bachelor's Degree in Software Engineering",
        period: "2023 - Present",
        image: "/images/fst_settat.jpg",
        status: "Current",
        points: [
          "Engineering studies with focus on Computer Science and Software Development",
          "Core Areas: Software Engineering, Data Structures, Algorithms, System Design",
          "Advanced Coursework: Database Systems, Web Development, Software Design Patterns",
        ],
        color: "from-cyan-400 via-blue-500 to-purple-600",
      },
      {
        school: "Hassan II University of Casablanca - FST Mohammedia",
        degree: "University Diploma for Science and Techniques",
        period: "2021 - 2023",
        image: "/images/fst_mohammedia.jpg",
        status: "Completed",
        points: [
          "Fundamental studies in Mathematics, Physics, and Computer Science",
          "Preparation for Engineering School with emphasis on problem-solving",
          "Strong foundation in Mathematics, Physics, and Computational Theory",
        ],
        color: "from-emerald-400 via-teal-500 to-cyan-600",
      },
    ],
    []
  );

  return (
    <QuantumBackground
      id="education"
      containerRef={containerRef}
      variant="blue"
      className="py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in">
          {/* Decorative Element */}
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
            <FaGraduationCap className="mx-4 text-4xl text-violet-400" />
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
          </div>

          {/* Title */}
          <h2 className="text-5xl md:text-7xl font-black mb-6 animate-slide-in-top">
            <span className="bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent">
              Education
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed animate-fade-in stagger-2">
            Academic foundation in Computer Science, establishing expertise in
            software engineering principles and computational theory
          </p>

          {/* Decorative Line */}
          <div className="mt-8 h-1 w-32 mx-auto bg-gradient-to-r from-violet-500 via-cyan-500 to-violet-500 rounded-full animate-scale-in" />
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Timeline Line - Desktop only */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-700 to-transparent -translate-x-1/2" />

          {/* Education Cards */}
          <div className="space-y-16">
            {educationData.map((edu, index) => (
              <EducationCard
                key={edu.school}
                edu={edu}
                index={index}
                isActive={activeCard === index}
                onHover={() => setActiveCard(index)}
                onLeave={() => setActiveCard(null)}
              />
            ))}
          </div>
        </div>

        {/* Bottom Decorative Element */}
        <div className="flex items-center justify-center mt-20 gap-2 animate-fade-in stagger-5">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        </div>
      </div>
    </QuantumBackground>
  );
});

Education.displayName = "Education";

export default Education;
