import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req:NextRequest){
    const body = await req.json();
    const { text, title } = body;

    const prompt = `
You are a highly accurate legal document summarization assistant.

Your task is to analyze the following legal document and return the result strictly in valid JSON format using the following schema:

{
  "executiveSummary": "A concise 3–5 sentence overview of the purpose and scope of the document.",
  "keyPoints": ["Point 1", "Point 2", ..., "Point 5–10"],
  "partiesInvolved": ["Party 1 (Role)", "Party 2 (Role)", ...],
  "importantDatesAndDeadlines": ["Date 1 - Context", "Date 2 - Context", ...],
  "risksAndLiabilities": ["Risk or Liability 1", "Risk or Liability 2", ...],
  "legalTags": ["A list of legal concepts or categories relevant to the contract (e.g., "Confidentiality", "Termination Clause", "Intellectual Property")."],
  "fullSummaryText": ["A comprehensive text of the Enhancing and summarizing the entire document in plain English."],
  "accuracyScore": A numeric field (0–100%) estimating the accuracy of the extracted summary based on the document’s complexity and clarity. 
}

Strictly follow this format:
- Only return valid JSON.
- All keys must always be present in the response.
- All values must be concise, relevant, and directly derived from the input.
- Do not include extra commentary, markdown, or explanations.

Analyze this legal document accordingly:

---
TEXT: ${text}
TITLE: ${title}
---
`;
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });

      
      const responseText = response.text;
      // Ensure you're returning a valid NextResponse object
      return NextResponse.json({ response: responseText });
    
}