const Experience = () => {
  return (
    <div id="experience" className="relative min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold gradient-text text-center mb-16">
          Experience
        </h2>

        <div className="glass-effect hover-effect rounded-2xl p-8">
  <div className="flex items-center justify-between space-x-6">
    <div className="flex items-center space-x-3">
      <div className="text-4xl">💼</div>
      <h3 className="text-2xl font-bold text-gray-200">
        FullStack Developer, Academic Internship
      </h3>
    </div>
    <span className="text-sm font-medium text-gray-400 bg-gray-800 py-1 px-3 rounded-full">
      JUN 2024 - JUL 2024
    </span>
  </div>
  <ul className="text-gray-300 leading-relaxed list-disc list-inside mt-4 ml-6">
    <li>Mastering data fundamentals, including conception techniques and visualization for actionable insights.</li>
    <li>Exploring cutting-edge web development technologies while understanding the complete development lifecycle.</li>
    <li>Building a functional school web app to streamline management processes and enhance user experience.</li>
    <li>Implemented user authentication and authorization using JWT.</li>
  </ul>
</div>
      </div>
    </div>
  );
};

export default Experience;
