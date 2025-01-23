const Education = () => {
  const educations = [
    {
      school: "FST Settat",
      period: "2023 - Present",
      degree: "Software Engineering Student",
      description: `Currently pursuing a Computer Science Engineering degree at FST Settat, I've been immersed in a rigorous academic program since 2023. My coursework has delved into core computer science concepts, including programming languages (Python, Java, C++), data structures and algorithms, software engineering principles, and database management. I've also had the opportunity to explore specialized areas like artificial intelligence, machine learning, and web development. Through hands-on projects and practical assignments, I've honed my problem-solving skills and gained valuable experience in applying theoretical knowledge to real-world challenges.`,
      icon: "🎓",
    },
    {
      school: "FST Mohammedia",
      period: "2021 - 2023",
      degree: "The University Diploma for Science and Techniques",
      description: `My two-year study at FST Mohammedia in the Mathematics-Physics and Computer Science program equipped me with a deep understanding of science as a series of algorithmic processes. This rigorous curriculum solidified my grasp of higher-level mathematics and physics fundamentals. Beyond this core knowledge, I also gained valuable insights into the interconnectedness of these disciplines, fostering a holistic perspective on scientific inquiry.`,
      icon: "📚",
    },
  ];

  return (
    <div id="education" className="relative min-h-screen py-20 code-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-6xl font-bold gradient-text text-center mb-16">
          Education
        </h2>

        <div className="space-y-8">
          {educations.map(({ school, period, degree, description, icon }) => (
            <div
              key={school}
              className="glass-effect card-hover rounded-2xl p-8"
            >
              <div className="flex items-start space-x-6">
                <div className="text-4xl animate-float">{icon}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-200 mb-2">
                    {school}
                  </h3>
                  <p className="text-blue-400 mb-2">{period}</p>
                  <p className="text-gray-300 font-medium mb-2">{degree}</p>
                  {description && (
                    <p className="text-gray-400 leading-relaxed mt-4 opacity-0 animate-fadeIn">
                      {description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
