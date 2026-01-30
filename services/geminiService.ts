import { GoogleGenAI, Type } from "@google/genai";
import { AIResponse } from '../types';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Helper to clean JSON string if Markdown code blocks are present
const cleanJsonString = (str: string) => {
  return str.replace(/```json/g, '').replace(/```/g, '').trim();
};

export const analyzeTextLog = async (text: string): Promise<AIResponse> => {
  if (!apiKey) throw new Error("API Key missing");

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are NURA, a lifestyle nutrition coach focused on consistency and flow. Analyze this food log: "${text}". 
      Return a JSON object with:
      - foodName (string, overall summary name)
      - calories (number, total)
      - macros (object with p, c, f as numbers for protein, carbs, fats in grams)
      - items (array of objects with: name (string), quantity (string, e.g. '1 large', '100g'), calories (number))
      - message (string, a short motivational phrase in Portuguese about maintaining the flow, e.g. "Boa refeição para manter o flow!", "Continue firme no seu ritmo!", "Energia constante!")
      Approximate values if needed.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            foodName: { type: Type.STRING },
            calories: { type: Type.NUMBER },
            macros: {
              type: Type.OBJECT,
              properties: {
                p: { type: Type.NUMBER },
                c: { type: Type.NUMBER },
                f: { type: Type.NUMBER },
              }
            },
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  quantity: { type: Type.STRING },
                  calories: { type: Type.NUMBER }
                }
              }
            },
            message: { type: Type.STRING }
          }
        }
      }
    });

    const jsonStr = response.text;
    if (!jsonStr) throw new Error("Empty response");

    return JSON.parse(cleanJsonString(jsonStr)) as AIResponse;
  } catch (error) {
    console.error("Gemini Text Error:", error);
    throw error;
  }
};

export const analyzeImageLog = async (base64Image: string): Promise<AIResponse> => {
  if (!apiKey) throw new Error("API Key missing");

  try {
    // Determine mime type from base64 string header or default to png
    const mimeType = base64Image.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)?.[1] || 'image/png';
    const data = base64Image.split(',')[1]; // Remove header

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [
          { inlineData: { mimeType, data } },
          { text: "You are NURA, a lifestyle nutrition coach. Identify the food in this image. Return strict JSON: { \"foodName\": string, \"calories\": number, \"macros\": { \"p\": number, \"c\": number, \"f\": number }, \"items\": [{ \"name\": string, \"quantity\": string, \"calories\": number }], \"message\": string (a short motivational phrase in Portuguese like 'Boa escolha para manter o flow!') }." }
        ]
      }
    });

    let text = response.text || "{}";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      text = jsonMatch[0];
    }

    return JSON.parse(cleanJsonString(text)) as AIResponse;
  } catch (error) {
    console.error("Gemini Image Error:", error);
    throw error;
  }
};