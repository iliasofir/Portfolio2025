const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");

// Fonction pour extraire le contenu du CV
async function getResumeContent() {
  try {
    const resumePath = path.join(process.cwd(), "public", "Resume.pdf");

    if (!fs.existsSync(resumePath)) {
      console.log("CV non trouve, utilisation des donnees par defaut");
      return null;
    }

    const pdfBuffer = fs.readFileSync(resumePath);
    const pdfData = await pdfParse(pdfBuffer);

    return pdfData.text.replace(/\s+/g, " ").replace(/\n+/g, "\n").trim();
  } catch (error) {
    console.error("Erreur lors de extraction du CV:", error);
    return null;
  }
}

// Fonction pour extraire la réponse finale du modèle de raisonnement
function extractFinalResponse(response) {
  if (response.choices && response.choices[0]) {
    const choice = response.choices[0];

    // Si il y a du contenu direct, l'utiliser
    if (choice.message.content && choice.message.content.trim()) {
      return choice.message.content;
    }

    // Sinon, extraire du reasoning_content
    if (choice.message.reasoning_content) {
      const reasoning = choice.message.reasoning_content;

      // Chercher des patterns de réponse finale
      const patterns = [
        /answer in French: "(.*?)"/i,
        /réponse en français: "(.*?)"/i,
        /Bonjour[^.]*[.!]/i,
        /Salut[^.]*[.!]/i,
      ];

      for (const pattern of patterns) {
        const match = reasoning.match(pattern);
        if (match) {
          return match[1] || match[0];
        }
      }

      // Extraire une réponse depuis le reasoning si possible
      const sentences = reasoning.split(/[.!?]+/);
      const meaningfulSentences = sentences.filter(
        (s) =>
          s.trim().length > 20 &&
          !s.includes("thinking") &&
          !s.includes("reasoning")
      );

      if (meaningfulSentences.length > 0) {
        return meaningfulSentences[0].trim() + ".";
      }
    }
  }

  return "Sorry, I couldn't generate an appropriate response.";
}

async function query(data) {
  const response = await fetch(
    "https://router.huggingface.co/v1/chat/completions",
    {
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

exports.handler = async (event, context) => {
  // Gérer les requêtes OPTIONS (CORS preflight)
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: "",
    };
  }

  // Seules les requêtes POST sont autorisées
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Méthode non autorisée" }),
    };
  }

  try {
    // Extraire le contenu du CV
    const resumeContent = await getResumeContent();

    // Parser le body de la requête
    const {
      messages,
      model = "openai/gpt-oss-20b:hyperbolic",
      max_tokens = 300,
      temperature = 0.6,
    } = JSON.parse(event.body || "{}");

    if (!messages || !Array.isArray(messages)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Messages requis (array)" }),
      };
    }

    // Enrichir le prompt système avec les données du CV
    const enrichedMessages = messages.map((message, index) => {
      if (index === 0 && message.role === "system") {
        let enhancedContent = message.content;

        if (resumeContent) {
          enhancedContent += `\n\nCONTENU COMPLET DU CV D'ILIAS:\n${resumeContent}\n\nINSTRUCTIONS STRICTES:
- You are an AI assistant presenting ILIAS SOFIR's professional profile to visitors
- ALWAYS respond in ENGLISH only
- CRITICAL: Only mention projects, experiences, and skills that are EXPLICITLY listed in the CV content above
- NEVER invent or make up projects, companies, or experiences that are not in the CV
- If you don't have specific information about something, say "I'd need to check his portfolio for more details"
- Be friendly and conversational, not robotic or formal
- Your role is to inform visitors about Ilias's REAL skills, experience, projects, and background from his CV
- You do NOT help visitors with their own projects or problems
- Keep responses SHORT and natural (maximum 80 words)
- Use simple, engaging language like introducing a friend
- Be warm and personable but FACTUALLY ACCURATE only`;
        }

        return {
          ...message,
          content: enhancedContent,
        };
      }
      return message;
    });

    const response = await query({
      messages: enrichedMessages,
      model,
      max_tokens,
      temperature,
    });

    // Gérer les erreurs de l'API
    if (response.error) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ error: response.error.message }),
      };
    }

    // Extraire la réponse finale du modèle de raisonnement
    if (response.choices && response.choices[0]) {
      const originalChoice = response.choices[0];
      const finalContent = extractFinalResponse(response);

      // Reformater la réponse pour qu'elle soit compatible avec les clients
      const formattedResponse = {
        ...response,
        choices: [
          {
            ...originalChoice,
            message: {
              ...originalChoice.message,
              content: finalContent,
              // Garder le reasoning_content séparément si nécessaire
              reasoning_content: originalChoice.message.reasoning_content,
            },
          },
        ],
        hasResumeData: !!resumeContent,
      };

      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
        },
        body: JSON.stringify(formattedResponse),
      };
    }
  } catch (error) {
    console.error("Erreur dans la fonction chat:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
};
