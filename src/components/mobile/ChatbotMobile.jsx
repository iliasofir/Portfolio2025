import React, { useState, useRef, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Fonction pour améliorer le formatage des réponses
const formatResponse = (text) => {
  if (!text) return text;

  return (
    text
      // Remplacer les tableaux malformés par des listes
      .replace(
        /\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|/g,
        "• $1: $2 - $3"
      )
      .replace(/\|\s*-+\s*\|\s*-+\s*\|\s*-+\s*\|/g, "")
      .replace(/\|\s*([^|]+)\s*\|/g, "• $1")

      // Améliorer les séparateurs
      .replace(/\*\*([^*]+)\*\*/g, "$1:") // **Title** -> Title:
      .replace(/--+/g, "") // Enlever les séparateurs

      // Nettoyer les espaces multiples
      .replace(/\s+/g, " ")
      .replace(/\n\s*\n/g, "\n\n")
      .trim()
  );
};

// Composant mémorisé pour un message de chat mobile
const ChatMessageMobile = memo(({ message, isBot, isTyping }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    className={`flex items-start gap-2 ${
      isBot ? "justify-start" : "justify-end"
    } px-2`}
  >
    {isBot && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1 }}
        className="w-6 h-6 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg flex-shrink-0 p-1"
      >
        <img
          src="/images/bot.png"
          alt="AI Assistant"
          className="w-full h-full object-contain"
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </motion.div>
    )}

    <motion.div
      className={`max-w-[85%] p-2.5 rounded-2xl ${
        isBot
          ? "bg-gradient-to-r from-violet-50 to-cyan-50 text-gray-800 rounded-bl-md border border-violet-100"
          : "bg-gradient-to-r from-violet-500 to-cyan-500 text-white rounded-br-md"
      } shadow-md`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {isTyping ? (
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 bg-gray-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      ) : (
        <p className="text-xs leading-relaxed">{message}</p>
      )}
    </motion.div>

    {!isBot && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1 }}
        className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold shadow-lg flex-shrink-0"
      >
        👤
      </motion.div>
    )}
  </motion.div>
));

// Composant pour les suggestions de questions mobiles
const QuickSuggestionsMobile = memo(({ suggestions, onSuggestionClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-wrap gap-1.5 mt-3 px-2"
  >
    {suggestions.map((suggestion, index) => (
      <motion.button
        key={index}
        onClick={() => onSuggestionClick(suggestion)}
        className="px-2.5 py-1.5 text-xs bg-gradient-to-r from-violet-50 to-cyan-50 hover:from-violet-100 hover:to-cyan-100 text-violet-700 rounded-full border border-violet-200 transition-all duration-200 shadow-sm hover:shadow-md"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
      >
        {suggestion}
      </motion.button>
    ))}
  </motion.div>
));

const ChatbotMobile = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [hasResumeData, setHasResumeData] = useState(false);
  const messagesEndRef = useRef(null);

  // Messages d'accueil et suggestions pour mobile
  const welcomeMessage =
    "Hi! I'm Ilias Ofir's AI assistant. I can tell you about his skills, projects, and experience. What would you like to know? 👨‍💻";

  const suggestions = [
    "His main skills?",
    "Tell me about projects",
    "His experience?",
    "Education background?",
    "Contact info?",
  ];

  // Initialiser avec le message d'accueil
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([
          {
            id: 1,
            text: welcomeMessage,
            isBot: true,
            timestamp: new Date(),
          },
        ]);
      }, 500);
    }
  }, [isOpen]);

  // Auto-scroll vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Fonction pour envoyer un message à l'API
  const sendToAPI = async (message) => {
    try {
      console.log("🚀 Sending message:", message);

      // En développement local, appeler directement HuggingFace
      if (window.location.hostname === "localhost") {
        console.log("🏠 Local development - calling HuggingFace directly");

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

        const response = await fetch(
          "https://router.huggingface.co/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_HF_TOKEN}`,
            },
            body: JSON.stringify({
              messages: [
                {
                  role: "system",
                  content: `You are Ilias Ofir's portfolio assistant with detailed knowledge about his professional background.

About Ilias Ofir:
- Student: Computer Science Engineering at FST Settat (2023-Present)
- Experience: Data Science & Software Engineering Intern at Hassania School, QA Automation Engineering Intern at ONCF
- Skills: Python, Java, JavaScript, React.js, Node.js, Spring Boot, Django, TailwindCSS, MySQL, PostgreSQL, MongoDB, Oracle Cloud (OCI Certified), Docker, Git, PyTorch, Machine Learning
- Certifications: Oracle Cloud Infrastructure Foundations Associate, IBM BIG DATA FOUNDATIONS, Mern Stack development
- Projects: ChatWithMe (real-time chat app), KouraZone (sport field reservation mobile app), Recruiting Agency App (JavaFX), Sentiment Analysis & GNN Optimization

Be helpful and informative about his background. Share specific details about his skills, projects, and experience. Keep responses under 60 words for mobile and always respond in English.`,
                },
                {
                  role: "user",
                  content: message,
                },
              ],
              model: "openai/gpt-oss-20b:hyperbolic",
              max_tokens: 200,
              temperature: 0.6,
            }),
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);
        console.log("📡 Response status:", response.status);

        if (!response.ok) {
          console.error("❌ HTTP Error:", response.status, response.statusText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("📝 Response data:", data);

        if (data.choices && data.choices[0] && data.choices[0].message) {
          console.log("✅ Success! Response:", data.choices[0].message.content);
          return data.choices[0].message.content;
        } else {
          console.error("❌ Invalid response format:", data);
          throw new Error("Invalid response format");
        }
      } else {
        // En production, utiliser la fonction Netlify
        console.log("🌐 Production - calling Netlify function");

        const response = await fetch("/.netlify/functions/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [
              {
                role: "system",
                content: `You are Ilias Ofir's portfolio assistant with detailed knowledge about his professional background.

About Ilias Ofir:
- Student: Computer Science Engineering at FST Settat (2023-Present)
- Experience: Data Science & Software Engineering Intern at Hassania School, QA Automation Engineering Intern at ONCF
- Skills: Python, Java, JavaScript, React.js, Node.js, Spring Boot, Django, TailwindCSS, MySQL, PostgreSQL, MongoDB, Oracle Cloud (OCI Certified), Docker, Git, PyTorch, Machine Learning
- Certifications: Oracle Cloud Infrastructure Foundations Associate, IBM BIG DATA FOUNDATIONS, Mern Stack development
- Projects: ChatWithMe (real-time chat app), KouraZone (sport field reservation mobile app), Recruiting Agency App (JavaFX), Sentiment Analysis & GNN Optimization

Be helpful and informative about his background. Share specific details about his skills, projects, and experience. Keep responses under 60 words for mobile and always respond in English.`,
              },
              {
                role: "user",
                content: message,
              },
            ],
            model: "openai/gpt-oss-20b:hyperbolic",
            max_tokens: 200,
            temperature: 0.6,
          }),
        });

        console.log("📡 Netlify response status:", response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            "❌ Netlify function error:",
            response.status,
            errorText
          );
          throw new Error(
            `Netlify function error: ${response.status} - ${errorText}`
          );
        }

        const data = await response.json();
        console.log("📝 Netlify response data:", data);

        if (data.error) {
          console.error("❌ API returned error:", data.error);
          throw new Error(
            `API Error: ${data.error}${
              data.details ? ` (${data.details})` : ""
            }`
          );
        }

        if (data.choices && data.choices[0]) {
          // Vérifier si les données du CV sont disponibles
          if (data.hasResumeData !== undefined) {
            setHasResumeData(data.hasResumeData);
          }
          return data.choices[0].message.content;
        } else {
          console.error("❌ Invalid response format:", data);
          throw new Error("No response from API - invalid format");
        }
      }
    } catch (error) {
      console.error("❌ Chat API Error:", error);

      // Messages d'erreur plus spécifiques
      if (error.name === "AbortError") {
        return "⏱️ Timeout. Please try again.";
      } else if (error.message.includes("HTTP error")) {
        return "🔌 Connection issue. Try again.";
      } else if (error.message.includes("fetch")) {
        return "🌐 Network error. Check connection.";
      } else {
        return "😅 Having trouble. Contact Ilias directly.";
      }
    }
  };

  // Gérer l'envoi de message
  const handleSendMessage = async (messageText = inputValue) => {
    if (!messageText.trim() || isTyping) return;

    console.log("📤 Processing message:", messageText);

    const userMessage = {
      id: Date.now(),
      text: messageText,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setShowSuggestions(false);
    setIsTyping(true);

    try {
      const botResponse = await sendToAPI(messageText);

      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      };

      console.log("📨 Bot response ready:", botResponse);
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("❌ Error in handleSendMessage:", error);

      const errorMessage = {
        id: Date.now() + 1,
        text: "😅 Something went wrong. Please try again.",
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Gérer les suggestions
  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  // Gérer l'appui sur Entrée
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* Mobile Chat Window - Full Screen Centered */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 w-full max-w-sm h-[70vh] max-h-[600px] flex flex-col overflow-hidden mx-auto"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Mobile Header */}
          <div className="bg-gradient-to-r from-violet-500 to-cyan-500 p-3 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                  className="w-7 h-7 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center p-1.5"
                >
                  <img
                    src="/images/bot.png"
                    alt="AI Assistant"
                    className="w-full h-full object-contain"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </motion.div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm">AI Assistant</h3>
                    {hasResumeData && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="px-1.5 py-0.5 bg-cyan-400 text-white text-xs rounded-full flex items-center gap-1 shadow-lg"
                        title="Enhanced with CV data"
                      >
                        <span className="w-1 h-1 bg-white rounded-full animate-pulse"></span>
                        CV
                      </motion.div>
                    )}
                  </div>
                  <p className="text-xs opacity-80">
                    {hasResumeData ? "Enhanced responses" : "Ready to help"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={onClose}
                  className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors text-sm"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto py-3 space-y-3 min-h-0">
            {messages.map((message) => (
              <ChatMessageMobile
                key={message.id}
                message={formatResponse(message.text)}
                isBot={message.isBot}
              />
            ))}

            {isTyping && <ChatMessageMobile isBot={true} isTyping={true} />}

            {/* Suggestions */}
            {showSuggestions && messages.length === 1 && (
              <QuickSuggestionsMobile
                suggestions={suggestions}
                onSuggestionClick={handleSuggestionClick}
              />
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Mobile Input */}
          <div className="border-t border-gray-200/50 bg-white/90 backdrop-blur-sm p-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about Ilias..."
                className="flex-1 px-3 py-2 rounded-xl border border-violet-200 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-200 transition-all text-sm bg-white/90 backdrop-blur-sm text-black placeholder-gray-400"
                disabled={isTyping}
              />
              <motion.button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isTyping}
                className="w-8 h-8 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: inputValue.trim() ? 1.05 : 1 }}
                whileTap={{ scale: inputValue.trim() ? 0.95 : 1 }}
              >
                {isTyping ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-3 h-3 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatbotMobile;
