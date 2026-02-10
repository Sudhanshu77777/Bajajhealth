import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in .env");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function askAI(question) {
  if (typeof question !== "string" || question.trim().length < 3) {
    throw new Error("AI question must be a meaningful string");
  }

  try {
    const result = await model.generateContent(
      `Answer in **only one word** (the most accurate single word answer). No explanation. Question: ${question}`
    );

    let answer = result.response.text().trim();

    // Clean up common junk (Gemini sometimes adds punctuation)
    answer = answer.replace(/[.,!?]$/, '').trim();

    // Fallback if model disobeys → take first word
    if (answer.split(" ").length > 1) {
      answer = answer.split(" ")[0];
    }

    return answer;
  } catch (err) {
  console.error("Gemini full error:", err);
  console.error("Error name:", err.name);
  console.error("Error message:", err.message);
  if (err.response) {
    console.error("Response data:", err.response);
  }
  throw new Error("AI service unavailable");  // keep for now
}
}