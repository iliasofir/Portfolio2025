import Typewriter from "typewriter-effect";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";

const Hero = () => {
  return (
    <div
      id="home"
      className="relative w-full min-h-screen flex items-center code-bg"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 -left-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 right-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="glass-effect rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Photo with animated border */}
            <div className="relative group animate-float">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] rounded-full opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient blur"></div>
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden">
                <img
                  src="/images/your-photo.jpeg"
                  alt="Ilias Ofir"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-1">
              <div className="space-y-6">
                <p className="text-blue-400 font-medium text-xl">Hello, I'm</p>
                <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-4">
                  Ilias Ofir
                </h1>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-400">
                  <Typewriter
                    options={{
                      strings: [
                        "Software Engineer",
                        "Full Stack Developer",
                        "Problem Solver",
                      ],
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 50,
                      delay: 50,
                    }}
                  />
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed opacity-0 animate-fadeIn">
                  I am a passionate software engineer dedicated to developing
                  innovative and high-performance applications. I combine
                  creativity and technical expertise to create efficient
                  solutions.
                </p>

                {/* Social Links */}
                <div className="flex gap-4 pt-4">
                  {[
                    {
                      name: "GitHub",
                      icon: <FaGithub className="mr-2" />,
                      href: "https://github.com/iliasofir",
                    },
                    {
                      name: "LinkedIn",
                      icon: <FaLinkedin className="mr-2" />,
                      href: "https://www.linkedin.com/in/ilias-ofir-445b91295/",
                    },
                    {
                      name: "Resume",
                      icon: <HiDownload className="mr-2" />,
                      href: "/Resume.pdf",
                    },
                  ].map((platform) => (
                    <a
                      key={platform.name}
                      href={platform.href}
                      download={platform.name === "Resume"}
                      target={platform.name !== "Resume" ? "_blank" : undefined}
                      rel={
                        platform.name !== "Resume"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="glass-effect p-3 rounded-lg hover:bg-white/20 transition-colors flex items-center"
                    >
                      {platform.icon}
                      <span className="gradient-text">{platform.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
