import { GoogleGenAI } from "@google/genai";

// Fix: Use process.env.API_KEY as per the guidelines.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This error will be shown if the API_KEY is not set in your environment.
  throw new Error("API_KEY environment variable not set. Please set it in your project settings.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const cleanHtmlResponse = (rawResponse: string): string => {
  const match = rawResponse.match(/```html\n([\s\S]*?)\n```/);
  if (match && match[1]) {
    return match[1].trim();
  }
  // Also remove the markdown backticks if they are present without the language specifier
  return rawResponse.replace(/```/g, "").trim();
};


export const generateAppCode = async (userPrompt: string): Promise<string> => {
    const model = 'gemini-2.5-pro';

    const fullPrompt = `
      You are an expert web developer specializing in creating beautiful and functional web pages using only HTML and Tailwind CSS.
      Your task is to generate a single, complete HTML file based on the user's request.

      **Instructions:**
      1.  The output MUST be a single block of HTML code.
      2.  The HTML must be well-structured with a proper <head> and <body>.
      3.  Crucially, you MUST include the Tailwind CSS CDN script in the <head>: <script src="https://cdn.tailwindcss.com"></script>.
      4.  Use placeholder images from 'https://picsum.photos/width/height' where appropriate (e.g., product images, hero backgrounds).
      5.  The generated page must be fully responsive and use a mobile-first approach.
      6.  The design should be modern, clean, and aesthetically pleasing. Use a tasteful color palette.
      7.  Do NOT include any explanations, comments, or markdown formatting (like \`\`\`html) outside of the HTML code itself. Your entire response should be only the HTML code.

      **User's Request:**
      "${userPrompt}"
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: fullPrompt
        });
        
        const rawHtml = response.text;
        return cleanHtmlResponse(rawHtml);
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate code from Gemini API.");
    }
};
