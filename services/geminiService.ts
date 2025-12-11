import { GoogleGenAI } from "@google/genai";
import { InventoryItem, ChartData } from '../types';

export const generateInventoryReport = async (items: InventoryItem[], trends: ChartData[]): Promise<string> => {
  try {
    // Initialize inside the function to ensure process.env is ready and prevent module loading crashes
    const apiKey = process.env.API_KEY || '';
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      You are an expert inventory analyst for "APLIKASI IONI".
      Analyze the following inventory data and weekly trend data.
      
      Current Critical/Warning Stock Items:
      ${JSON.stringify(items.filter(i => i.status !== 'Safe'))}

      Weekly Trend Data (In/Out):
      ${JSON.stringify(trends)}

      Please provide:
      1. A brief executive summary of the stock health.
      2. Specific action items for the critical items.
      3. An observation on the weekly flux (Masuk vs Keluar).
      
      Keep the tone professional and concise. Format with clear headings in Markdown.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Unable to generate report at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI service. Please check your API configuration or internet connection.";
  }
};