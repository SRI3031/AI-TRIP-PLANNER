// src/api.js

import { collection, getDocs } from "firebase/firestore";
import { db } from "config/db"; // Adjust the path as needed

/**
 * Fetches all trip documents from the 'trips' collection in Firestore.
 * @returns {Promise<Array>} A promise that resolves to an array of trip data.
 * @throws {Error} If the data fetching fails.
 */
export async function fetchTrips() {
  try {
    const tripsCol = collection(db, "trips");
    const tripSnapshot = await getDocs(tripsCol);
    const tripsList = tripSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return tripsList;
  } catch (err) {
    console.error("Error fetching trips:", err);
    throw new Error("Failed to fetch trips");
  }
}