import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Projects from "./components/Projects";
import Certification from "./components/Certification";

function App() {
  return (
    <Router>
      <div className="bg-[#0a192f] text-gray-300">
        <Navbar />
        <Hero />
        <Skills />
        <Certification/>
        <Projects />
        <Education />
        <Experience />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
