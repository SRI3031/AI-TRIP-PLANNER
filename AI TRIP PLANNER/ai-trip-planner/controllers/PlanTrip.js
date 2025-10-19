// src/controllers/PlanTrip.js

// Import Firebase Firestore functions and the db instance
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// IMPORTANT: Adjust this path if 'config/db' is not correctly resolved by your project setup.
// For example, if 'db.js' is directly in a 'config' folder at the root of 'src',
// and this 'PlanTrip.js' is in 'src/controllers', you might need:
// import { db } from '../config/db';
import { db } from 'config/db'; // Assuming 'config/db' resolves correctly from your project's root or alias.

import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_API_KEY;

if (!API_KEY) {
  console.error("VITE_API_KEY is missing. Check your .env file and restart your server.");
  throw new Error("VITE_API_KEY is missing. Check your .env file and restart your server.");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

/**
 * Generates a luxury travel itinerary using AI and attempts to save it to Firestore.
 * @param {object} tripInputs - An object containing all the user's trip preferences, including userEmail.
 * @returns {Promise<{parsedJson: object, success?: boolean, firestoreId?: string, error?: string}>}
 */
export const generateItinerary = async (tripInputs) => {
  const {
    destination,
    feelingInput,
    vibe,
    mustHaves,
    dealBreakers,
    travelerType,
    budget,
    startDate,
    endDate,
    userEmail,
  } = tripInputs;

  const prompt = `
You are a luxury travel concierge AI. Your task is to craft a comprehensive travel itinerary in JSON format for a trip to ${destination}.
The primary feeling desired for this trip is: "${feelingInput}".
The overall vibe should be: ${vibe}.
Trip Details:
- Destination: ${destination}
- Traveler Type: ${travelerType}
- Budget per person: $${budget.toLocaleString()} (USD)
- Travel Dates: From ${startDate} to ${endDate}
Priorities for the trip (Must-Haves):
${mustHaves.length > 0 ? mustHaves.map(item => `- ${item}`).join('\n') : '- No specific must-haves mentioned.'}
Things to avoid (Deal-Breakers):
${dealBreakers.length > 0 ? dealBreakers.map(item => `- ${item}`).join('\n') : '- No specific deal-breakers mentioned.'}
Please provide the itinerary as a single JSON object. The JSON should adhere strictly to the following structure:
{
  "tripPlan": {
    "destination": "string",
    "overview": "string",
    "dates": {
      "startDate": "YYYY-MM-DD",
      "endDate": "YYYY-MM-DD"
    },
    "travelers": "string",
    "budgetPerPersonUSD": "number",
    "vibe": "string",
    "itinerary": [
      {
        "day": "string",
        "date": "YYYY-MM-DD",
        "theme": "string",
        "activities": [
          "string"
        ],
        "accommodation": "string",
        "diningSuggestions": [
          "string"
        ],
        "notes": "string"
      }
    ],
    "mustHavesIncluded": [
      "string"
    ],
    "dealBreakersAvoided": [
      "string"
    ],
    "packingSuggestions": [
      "string"
    ],
    "tips": [
      "string"
    ]
  }
}
Ensure the output is ONLY the JSON object, with no additional text, markdown backticks outside the JSON itself, or explanations.
The itinerary should be detailed, actionable, and include specific suggestions for accommodations, dining, and activities that align with a luxury experience in ${destination}.
`;

  console.log("--- DEBUG START (from PlanTrip.js) ---");
  console.log("Prompt sent to AI:", prompt);

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("1. Raw AI response text:", text);

    // Remove any "json" word or markdown backticks, whitespace around
    const cleanedText = text
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

    console.log("2. Cleaned text before JSON.parse:", cleanedText);

    const parsedJson = JSON.parse(cleanedText);
    console.log("3. Successfully parsed JSON:", parsedJson);

    let firestoreId = null;

    if (db && parsedJson.tripPlan) {
      try {
        const docRef = await addDoc(collection(db, "trips"), {
          ...parsedJson.tripPlan,
          createdAt: serverTimestamp(),
          formInputs: {
            destination,
            feelingInput,
            vibe,
            mustHaves,
            dealBreakers,
            travelerType,
            budget,
            startDate,
            endDate,
            userEmail,
          },
        });
        console.log("Document written with ID: ", docRef.id);
        firestoreId = docRef.id;
      } catch (firestoreError) {
        console.error("Firestore Error:", firestoreError);
        return { error: `Failed to save to database: ${firestoreError.message}` };
      }
    } else {
      console.warn("Firestore database (db) not initialized or tripPlan is missing. Skipping save to Firestore.");
      return { error: "Could not save to database: Database not ready or itinerary data is malformed." };
    }

    return { parsedJson, success: true, firestoreId };
  } catch (err) {
    console.error("Error in PlanTrip.js:", err);
    if (err instanceof SyntaxError) {
      return { error: `Failed to parse AI response as JSON. Please try again. (Raw response received: "${cleanedText.substring(0, 100)}...")` };
    }
    return { error: `Failed to generate or save itinerary: ${err.message}` };
  } finally {
    console.log("--- DEBUG END (from PlanTrip.js) ---");
  }
};
