import { BrowserRouter as Router } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Experience from "./components/Experience";
import ExperienceMobile from "./components/mobile/ExperienceMobile";
import Footer from "./components/Footer";
import ProjectsManager from "./components/ProjectsManager";
import Certification from "./components/Certification";
import CertificationMobile from "./components/mobile/CertificationMobile";
import Chatbot from "./components/Chatbot";
import ChatbotMobile from "./components/mobile/ChatbotMobile";
import WelcomeModal from "./components/WelcomeModal";
import FanHUD from "./components/FanHUD";
import "./styles/globals.css";

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Détecter si c'est un appareil mobile
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice =
        window.innerWidth <= 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
            {isMobile ? <CertificationMobile /> : <Certification />}
            <ProjectsManager />
            <Education />
            {isMobile ? <ExperienceMobile /> : <Experience />}
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
          🤖
        </motion.button>

        {/* Chatbot - Conditional rendering based on device */}
        {isMobile ? (
          <ChatbotMobile
            isOpen={isChatOpen}
            onClose={() => setIsChatOpen(false)}
          />
        ) : (
          <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        )}

        {/* Welcome Modal */}
        <WelcomeModal
          isOpen={showWelcomeModal}
          onClose={handleWelcomeClose}
          onStartChat={handleStartChat}
        />

        {/* Global Fan HUD Panel - Always Visible (Desktop Only) */}
        {!isMobile && (
          <FanHUD
            animationType="hover"
            position={{ top: 250, right: 20 }}
            className="hidden md:block"
          >
            {/* System Status */}
            <div className="flex flex-col items-center justify-center gap-1 text-center w-full">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative w-6 h-6 flex items-center justify-center"
              >
                <div className="w-4 h-4 bg-green-400 rounded-full shadow-lg shadow-green-400/50" />
                <motion.div
                  animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute w-4 h-4 bg-green-400/30 rounded-full"
                />
              </motion.div>
              <span className="text-green-400 font-mono text-[10px] font-semibold tracking-wider">
                SYS
              </span>
              <span className="text-white font-mono text-xs font-bold">
                98%
              </span>
            </div>

            {/* Network Status */}
            <div className="flex flex-col items-center justify-center gap-1 text-center w-full">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="relative w-6 h-6 flex items-center justify-center"
              >
                <div className="w-4 h-4 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50" />
                <motion.div
                  animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute w-4 h-4 border border-cyan-400/50 rounded-full"
                />
              </motion.div>
              <span className="text-cyan-400 font-mono text-[10px] font-semibold tracking-wider">
                NET
              </span>
              <span className="text-white font-mono text-xs font-bold">
                100%
              </span>
            </div>

            {/* CPU Status */}
            <div className="flex flex-col items-center justify-center gap-1 text-center w-full">
              <motion.div
                animate={{
                  background: [
                    "conic-gradient(from 0deg, #22c55e 45%, rgba(34,197,94,0.1) 45%)",
                    "conic-gradient(from 0deg, #22c55e 60%, rgba(34,197,94,0.1) 60%)",
                    "conic-gradient(from 0deg, #22c55e 45%, rgba(34,197,94,0.1) 45%)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-6 h-6 rounded-full border-2 border-green-400/30 shadow-lg shadow-green-400/20"
              >
                <div className="w-full h-full rounded-full bg-green-400/10" />
              </motion.div>
              <span className="text-green-400 font-mono text-[10px] font-semibold tracking-wider">
                CPU
              </span>
              <span className="text-white font-mono text-xs font-bold">
                45%
              </span>
            </div>

            {/* Memory Status */}
            <div className="flex flex-col items-center justify-center gap-1 text-center w-full">
              <motion.div
                animate={{
                  background: [
                    "conic-gradient(from 0deg, #3b82f6 67%, rgba(59,130,246,0.1) 67%)",
                    "conic-gradient(from 0deg, #3b82f6 70%, rgba(59,130,246,0.1) 70%)",
                    "conic-gradient(from 0deg, #3b82f6 67%, rgba(59,130,246,0.1) 67%)",
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="w-6 h-6 rounded-full border-2 border-blue-400/30 shadow-lg shadow-blue-400/20"
              >
                <div className="w-full h-full rounded-full bg-blue-400/10" />
              </motion.div>
              <span className="text-blue-400 font-mono text-[10px] font-semibold tracking-wider">
                MEM
              </span>
              <span className="text-white font-mono text-xs font-bold">
                67%
              </span>
            </div>

            {/* Time Display */}
            <div className="flex flex-col items-center justify-center gap-1 text-center w-full">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="relative w-6 h-6 flex items-center justify-center"
              >
                <div className="w-5 h-5 border-2 border-violet-400/30 border-t-violet-400 rounded-full" />
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute w-2 h-2 bg-violet-400 rounded-full"
                />
              </motion.div>
              <span className="text-violet-400 font-mono text-[10px] font-semibold tracking-wider">
                TIME
              </span>
              <span className="text-white font-mono text-xs font-bold">
                {currentTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </FanHUD>
        )}
      </div>
    </Router>
  );
}

export default App;
