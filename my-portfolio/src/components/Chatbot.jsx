import React, { useState, useRef, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const welcomeMessage =
  "Hi! I'm here to tell you about Ilias Sofir. He's a talented developer who loves building cool stuff with code. What would you like to know about him?";

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

// Composant mémorisé pour un message de chat
const ChatMessage = memo(({ message, isBot, isTyping }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    className={`flex items-start gap-3 ${
      isBot ? "justify-start" : "justify-end"
    }`}
  >
    {isBot && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1 }}
        className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-lg"
      >
        🤖
      </motion.div>
    )}

    <motion.div
      className={`max-w-[80%] p-3 rounded-2xl ${
        isBot
          ? "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 rounded-bl-md"
          : "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md"
      } shadow-md`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {isTyping ? (
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-gray-500 rounded-full"
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
        <p className="text-sm leading-relaxed">{message}</p>
      )}
    </motion.div>

    {!isBot && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1 }}
        className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold shadow-lg"
      >
        👤
      </motion.div>
    )}
  </motion.div>
));

// Composant pour les suggestions de questions
const QuickSuggestions = memo(({ suggestions, onSuggestionClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-wrap gap-2 mt-4"
  >
    {suggestions.map((suggestion, index) => (
      <motion.button
        key={index}
        onClick={() => onSuggestionClick(suggestion)}
        className="px-3 py-1.5 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full border border-blue-200 transition-colors duration-200"
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

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [hasResumeData, setHasResumeData] = useState(false);
  const messagesEndRef = useRef(null);

  // Messages d'accueil et suggestions
  const welcomeMessage =
    "Hello! I'm Ilias Sofir's portfolio assistant. I can tell you about his technical skills, professional experience, projects, and background. Feel free to ask me anything about his profile! 👨‍💻";

  const suggestions = [
    "What are Ilias's main technical skills?",
    "Tell me about his cloud and DevOps experience",
    "What machine learning projects has he worked on?",
    "Show me his full-stack development background",
    "What is Ilias's educational background?",
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
                  content: `You are an AI assistant showcasing ILIAS SOFIR's professional profile to portfolio visitors.

YOUR ROLE:
• Present information ABOUT Ilias Sofir to visitors
• Answer questions about HIS skills, experience, projects, and background
• You do NOT help visitors with their own technical problems
• You only provide information about Ilias's professional profile
• CRITICAL: Only mention information that is REAL and from his actual CV/portfolio
• NEVER invent or make up projects, companies, or experiences
• If you don't have specific details, say "I'd need to check his portfolio for more details"

ILIAS'S TECHNICAL SKILLS:
• Languages: Python, JavaScript (Node.js, React), Java, Go
• Frameworks: Django, Flask, Spring Boot, Express, React Native  
• Databases: PostgreSQL, MySQL, MongoDB
• Cloud: AWS, Docker, Kubernetes
• AI/ML: Machine Learning, Data Science, Neural Networks

ILIAS'S PROJECTS & EXPERIENCE:
• Full-stack web applications
• Cloud infrastructure and microservices
• Machine learning and AI implementations
• Mobile app development
• System design and architecture

ILIAS'S EDUCATION & CERTIFICATIONS:
• Software Engineering background
• Multiple cloud and AI certifications
• Continuous learning in emerging technologies

RESPONSE GUIDELINES:
• ALWAYS respond in ENGLISH only
• Be friendly and conversational, not robotic
• Keep responses SHORT (maximum 80 words)
• Use simple, natural language
• Avoid technical jargon and CV-style formatting
• No complex bullet points or lists
• Speak like you're introducing a friend
• Be warm and engaging but FACTUALLY ACCURATE only
• Only mention REAL information from his actual experience`,
                },
                {
                  role: "user",
                  content: message,
                },
              ],
              model: "openai/gpt-oss-20b:hyperbolic",
              max_tokens: 300,
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
        const response = await fetch("/.netlify/functions/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [
              {
                role: "system",
                content: `You are Ilias Sofir's personal AI assistant. You have detailed knowledge about his professional profile:

TECHNICAL SKILLS:
- Languages: Python, JavaScript (Node.js, React), Java, Go
- Frameworks: Django, Flask, Spring Boot, Express, React Native
- Databases: PostgreSQL, MySQL, MongoDB
- Cloud: AWS, Docker, Kubernetes
- AI/ML: Machine Learning, Data Science, Neural Networks

PROJECTS & EXPERIENCE:
- Full-stack web applications
- Cloud infrastructure and microservices
- Machine learning and AI implementations
- Mobile app development
- System design and architecture

EDUCATION & CERTIFICATIONS:
- Software Engineering background
- Multiple cloud and AI certifications
- Continuous learning in emerging technologies

Always provide complete, helpful, and specific answers. If asked about projects, skills, or experience, give concrete examples. Keep responses under 200 words but ensure they are complete and informative. Be professional yet friendly.`,
              },
              {
                role: "user",
                content: message,
              },
            ],
            model: "openai/gpt-oss-20b:hyperbolic",
            max_tokens: 300,
            temperature: 0.6,
          }),
        });

        const data = await response.json();

        if (data.choices && data.choices[0]) {
          // Vérifier si les données du CV sont disponibles
          if (data.hasResumeData !== undefined) {
            setHasResumeData(data.hasResumeData);
          }
          return data.choices[0].message.content;
        } else {
          throw new Error("No response from API");
        }
      }
    } catch (error) {
      console.error("❌ Chat API Error:", error);

      // Messages d'erreur plus spécifiques
      if (error.name === "AbortError") {
        return "⏱️ Request timed out. Please try again with a shorter question.";
      } else if (error.message.includes("HTTP error")) {
        return "🔌 Connection issue. The AI service might be busy. Please try again in a moment.";
      } else {
        return "😅 I'm having trouble thinking right now. Please try again or contact Ilias directly for immediate assistance.";
      }
    }
  };

  // Gérer l'envoi de message
  const handleSendMessage = async (messageText = inputValue) => {
    if (!messageText.trim() || isTyping) return; // Empêcher l'envoi si déjà en cours

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
      // Délai plus réaliste pour la simulation de typing
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
        text: "😅 Something went wrong. Please try again or contact Ilias directly.",
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
      {/* Chat Window - Bottom Right Corner */}
      <motion.div
        initial={{ opacity: 0, x: 400, y: 100 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        exit={{ opacity: 0, x: 400, y: 100 }}
        className="fixed bottom-6 right-6 z-50 w-96 h-[600px] max-h-[80vh]"
      >
        <motion.div
          className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 w-full h-full flex flex-col overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          {/* Modern Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 text-white">
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
                  className="w-8 h-8 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center text-lg"
                >
                  🤖
                </motion.div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm">AI Assistant</h3>
                    {hasResumeData && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="px-1.5 py-0.5 bg-green-500 text-white text-xs rounded-full flex items-center gap-1"
                        title="Enhanced with CV data"
                      >
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                        CV
                      </motion.div>
                    )}
                  </div>
                  <p className="text-xs opacity-80">
                    {hasResumeData ? "Enhanced responses" : "Ready to chat"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={onClose}
                  className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors text-sm"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={formatResponse(message.text)}
                isBot={message.isBot}
              />
            ))}

            {isTyping && <ChatMessage isBot={true} isTyping={true} />}

            {/* Suggestions */}
            {showSuggestions && messages.length === 1 && (
              <QuickSuggestions
                suggestions={suggestions}
                onSuggestionClick={handleSuggestionClick}
              />
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Modern Input */}
          <div className="border-t border-gray-200/50 bg-white/80 backdrop-blur-sm p-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about Ilias..."
                className="flex-1 px-3 py-2 rounded-xl border border-gray-200 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-200 transition-all text-sm bg-white/90 backdrop-blur-sm text-black placeholder-gray-500"
                disabled={isTyping}
              />
              <motion.button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isTyping}
                className="w-9 h-9 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
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
                    className="w-4 h-4"
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

export default Chatbot;
