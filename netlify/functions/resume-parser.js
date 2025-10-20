const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");

exports.handler = async (event, context) => {
  // Configurer les headers CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };

  // Gérer les requêtes OPTIONS (preflight)
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
    };
  }

  try {
    // Chemin vers le CV dans le dossier public
    const resumePath = path.join(process.cwd(), "public", "Resume.pdf");

    // Vérifier si le fichier existe
    if (!fs.existsSync(resumePath)) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          error: "CV non trouvé",
          path: resumePath,
        }),
      };
    }

    // Lire le fichier PDF
    const pdfBuffer = fs.readFileSync(resumePath);

    // Extraire le texte du PDF
    const pdfData = await pdfParse(pdfBuffer);
    const resumeText = pdfData.text;

    // Nettoyer et structurer le texte
    const cleanedText = resumeText
      .replace(/\s+/g, " ") // Remplacer les espaces multiples
      .replace(/\n+/g, "\n") // Remplacer les sauts de ligne multiples
      .trim();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        text: cleanedText,
        pages: pdfData.numpages,
        info: pdfData.info,
      }),
    };
  } catch (error) {
    console.error("Erreur lors de extraction du CV:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Erreur lors de extraction du PDF",
        details: error.message,
      }),
    };
  }
};
