import React from "react";

const Certification = () => {
  const certifications = [
    {
      id: 1,
      title: "Oracle Cloud Infrastructure Foundations 2024 Certified Associate",
      issuer: "Oracle",
      date: "Feb 2024",
      credential: "OCIFA-123456",
      logo: "/images/oracle.png",
    },
    {
      id: 2,
      title: "MERN Stack Developer",
      issuer: "Udemy",
      date: "Aug 2024",
      credential: "MSD-123456",
      logo: "/images/Udemy-Logo.png",
    },
  ];

  return (
    <div id="certifications" className="relative min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold gradient-text text-center mb-16">
          Certifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="glass-effect hover-effect rounded-2xl p-6"
            >
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={cert.logo}
                      alt={`${cert.issuer} logo`}
                      className="w-12 h-12 object-contain"
                    />
                    <div className="flex flex-col">
                      <h3 className="text-xl font-bold text-gray-200 line-clamp-2">
                        {cert.title}
                      </h3>
                      <span className="text-sm text-gray-400">
                        {cert.issuer}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-400 bg-gray-800/50 py-1 px-3 rounded-full whitespace-nowrap">
                    {cert.date}
                  </span>
                </div>
                <div className="text-gray-300 pt-2 border-t border-gray-700">
                  <p className="flex items-center space-x-2">
                    <span className="font-medium text-sm">Credential ID:</span>
                    <span className="text-sm">{cert.credential}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certification;
