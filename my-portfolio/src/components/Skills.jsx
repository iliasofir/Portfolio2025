const Skills = () => {
  const mainSkills = [
    { name: "C", icon: "💻" },
    { name: "Java", icon: "☕" },
    { name: "Python", icon: "🐍" },
    { name: "ReactJS", icon: "⚛️" },
    { name: "Spring Boot", icon: "🍃" },
    { name: "NodeJS", icon: "📦" },
  ];
  const otherSkills = [
    { name: "SQL", icon: "🗄️" },
    { name: "Docker", icon: "🐳" },
    { name: "Machine Learning", icon: "🤖" },
    { name: "Scrum", icon: "📊" },
    { name: "Cloud", icon: "☁️" },
  ];

  return (
    <div id="skills" className="relative min-h-screen py-20 code-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-6xl font-bold gradient-text text-center mb-16">
          Skills
        </h2>

        <div className="space-y-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-200 text-center mb-12">
              Main Skills
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {mainSkills.map(({ name, icon }, index) => (
                <div
                  key={name}
                  className="glass-effect card-hover rounded-2xl p-8"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="text-5xl mb-4 text-center animate-bounce-slow">
                    {icon}
                  </div>
                  <p className="text-center text-gray-200 font-semibold">
                    {name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-200 text-center mb-8">
              Other Skills
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {otherSkills.map(({ name, icon }) => (
                <div
                  key={name}
                  className="glass-effect hover-effect rounded-2xl p-6"
                >
                  <div className="text-4xl mb-3 text-center">{icon}</div>
                  <p className="text-center text-gray-200">{name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
