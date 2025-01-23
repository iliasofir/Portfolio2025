import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CustomArrow = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className={`absolute ${
      direction === "left" ? "-left-16" : "-right-16"
    } top-1/2 -translate-y-1/2 z-10 p-4 glass-effect rounded-full text-gray-300 hover:text-white transition-colors ${
      !onClick && "hidden"
    }`}
  >
    {direction === "left" ? (
      <FaChevronLeft className="w-6 h-6" />
    ) : (
      <FaChevronRight className="w-6 h-6" />
    )}
  </button>
);

const Projects = () => {
  const projects = [
    {
      title: "Sentiment Analysis App",
      image: "/images/deployDocker.png",
      description:
        "Deployed a containerized Sentiment Analysis application using Docker. The app combines FastAPI for the backend and Streamlit for the frontend, integrated with a HuggingFace transformer model for sentiment analysis. The architecture ensures scalability and efficient inference through API endpoints, providing real-time sentiment analysis capabilities.",
      technologies: [
        "Docker",
        "FastAPI",
        "Streamlit",
        "Python",
        "HuggingFace",
        "Inference API",
      ],
      status: "Completed",
      statusColor: "bg-green-500",
    },
    {
      title: "ChatWithMe",
      image: "/images/project5.png",
      description:
        "A real-time chat application built with the MERN stack (MongoDB, Express.js, React.js) and styled with Tailwind CSS. Features include real-time messaging, user authentication, message history, and a responsive design. The app demonstrates modern web development practices and real-time communication implementation.",
      technologies: [
        "React.js",
        "Express.js",
        "MongoDB",
        "TailwindCSS",
        "Socket.io",
        "Node.js",
      ],
      status: "Ongoing",
      statusColor: "bg-yellow-500",
    },
    {
      title: "Eventure App",
      image: "/images/project4.jpeg",
      description:
        "A dynamic event management application built with Spring Boot and Thymeleaf. The app features a modern, responsive UI styled with Tailwind CSS, allowing users to create, manage, and participate in events. Implements secure user authentication, real-time updates, and an intuitive dashboard for event organizers.",
      technologies: [
        "Spring Boot",
        "Thymeleaf",
        "TailwindCSS",
        "MySQL",
        "Java",
      ],
      status: "Completed",
      statusColor: "bg-green-500",
    },
    {
      title: "Recruiting Agency",
      image: "/images/project1.jpeg",
      description:
        "A Java desktop application designed to provide flexible functionalities to meet the needs of businesses in hiring. The application allows for efficient recruitment processes and manages job applications and candidate profiles with ease.",
      technologies: [
        "Java",
        "JavaFX",
        "CSS",
        "Git",
        "UML",
        "IntelliJ IDEA",
        "MYSQL",
      ],
      status: "Completed",
      statusColor: "bg-green-500",
    },
    {
      title: "E-learning School Website",
      image: "/images/yop2.png",
      description:
        "A project designed to simplify management tasks in primary schools. Built with Python and Django, it ensures flexibility and accessibility for all users, including admins, students, teachers, and parents. The system streamlines administrative tasks, facilitates communication, and enhances the overall educational experience.",
      technologies: ["Django", "CSS", "PostgreSQL", "UML", "PyCharm"],
      status: "Ongoing",
      statusColor: "bg-yellow-500",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    prevArrow: <CustomArrow direction="left" />,
    nextArrow: <CustomArrow direction="right" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    appendDots: (dots) => (
      <div className="bottom-[-50px]">
        <ul className="flex justify-center gap-2"> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 rounded-full bg-gray-500 hover:bg-blue-400 transition-colors" />
    ),
    adaptiveHeight: false,
  };

  return (
    <div id="projects" className="relative min-h-screen py-20 code-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-20 lg:px-32">
        <h2 className="text-4xl md:text-6xl font-bold gradient-text text-center mb-16">
          My Projects
        </h2>

        <div className="relative">
          <Slider {...settings}>
            {projects.map((project) => (
              <div key={project.title} className="px-4 h-full">
                <div className="glass-effect card-hover rounded-2xl overflow-hidden h-[700px] flex flex-col">
                  {/* Project Image */}
                  <div className="relative h-56 overflow-hidden flex-shrink-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  {/* Project Content */}
                  <div className="p-8 space-y-6 flex-grow flex flex-col">
                    <h3 className="text-2xl font-bold text-gray-200">
                      {project.title}
                    </h3>

                    <p className="text-gray-400 leading-relaxed flex-grow">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-3 mt-auto">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-1.5 text-sm glass-effect rounded-full text-blue-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Status Badge */}
                    <div
                      className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${project.statusColor} text-white mt-2`}
                    >
                      {project.status}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Projects;
