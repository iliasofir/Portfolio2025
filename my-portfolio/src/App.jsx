import { BrowserRouter as Router } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import ProjectsManager from "./components/ProjectsManager";
import Certification from "./components/Certification";
import Chatbot from "./components/Chatbot";
import WelcomeModal from "./components/WelcomeModal";
import "./styles/globals.css";

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  // Afficher le modal de bienvenue après 3 secondes
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
    if (!hasSeenWelcome) {
      const timer = setTimeout(() => {
        setShowWelcomeModal(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleWelcomeClose = () => {
    setShowWelcomeModal(false);
    localStorage.setItem("hasSeenWelcome", "true");
  };

  const handleStartChat = () => {
    setIsChatOpen(true);
    localStorage.setItem("hasSeenWelcome", "true");
  };

  return (
    <Router>
      <div className="bg-slate-900 min-h-screen relative overflow-hidden text-gray-100">
        {/* Background gradients */}
        <div className="fixed inset-0 opacity-50">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10"
          >
            <Navbar />
            <Hero />
            <Skills />
            <Certification />
            <ProjectsManager />
            <Education />
            <Experience />
            <Footer />
          </motion.div>
        </AnimatePresence>

        {/* Floating Chat Button */}
        <motion.button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center text-white text-xl hover:scale-110 transition-transform"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(59, 130, 246, 0.7)",
              "0 0 0 20px rgba(59, 130, 246, 0)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          💬
        </motion.button>

        {/* Chatbot */}
        <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

        {/* Welcome Modal */}
        <WelcomeModal
          isOpen={showWelcomeModal}
          onClose={handleWelcomeClose}
          onStartChat={handleStartChat}
        />
      </div>
    </Router>
  );
}

export default App;
