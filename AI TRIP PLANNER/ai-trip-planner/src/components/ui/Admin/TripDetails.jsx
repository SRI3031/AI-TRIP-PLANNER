// src/TripDetails.js

import React, { useState, useEffect } from "react";
import { MdTravelExplore } from "react-icons/md";
import { FaAngleDown, FaAngleUp, FaUserFriends, FaRupeeSign } from "react-icons/fa";
import { fetchTrips } from "controllers/FetchTrips"; // Import the new function

export default function TripDetails() {
  const [tripData, setTripData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedTrip, setExpandedTrip] = useState(null);

  useEffect(() => {
    const getTrips = async () => {
      setLoading(true);
      setError(null);
      try {
        const trips = await fetchTrips();
        setTripData(trips);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getTrips();
  }, []);

  const toggleDetails = (id) => {
    setExpandedTrip(expandedTrip === id ? null : id);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 animate-pulse">
        <p className="text-2xl text-indigo-600 dark:text-indigo-400 font-bold">Loading your adventures...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-red-50 dark:bg-red-900">
        <p className="text-xl text-red-600 font-medium">Error: {error}</p>
      </div>
    );
  if (tripData.length === 0)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800">
        <p className="text-2xl text-gray-700 dark:text-gray-300">No planned trips found. Start a new journey!</p>
      </div>
    );

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 min-h-screen py-12 px-4 sm:px-6 lg:px-8"
    style={{backgroundImage: "url('https://cdn.vectorstock.com/i/500p/35/13/digital-grid-technology-dashboard-vector-53463513.jpg')"}}
   >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-6 mb-12">
          <MdTravelExplore className="text-white  w-12 h-12 animate-bounce" />
          <h1 className="text-4xl font-extrabold text-white  tracking-tight leading-tight">
            Your Planned Trips
          </h1>
        </div>
        <div className="space-y-8">
          {tripData.map((trip) => {
            const email = trip.userEmail || trip.formInputs?.userEmail || "N/A";
            const destination = trip.destination || "N/A";
            const feeling = trip.formInputs?.feelingInput || "N/A";
            const vibe = trip.vibe || "N/A";
            const travelers = trip.formInputs?.travelerType || "N/A";
            const startDate = trip.startDate || trip.dates?.startDate || "N/A";
            const endDate = trip.endDate || trip.dates?.endDate || "N/A";
            const budget = trip.formInputs?.budget || trip.budget || "N/A";

            const mustHaves = Array.isArray(trip?.formInputs?.mustHaves)
              ? trip.formInputs.mustHaves.join(", ")
              : typeof trip.formInputs?.mustHaves === "string" &&
                trip.formInputs.mustHaves.trim()
              ? trip.formInputs.mustHaves
              : "None listed";

            const dealBreakers = Array.isArray(trip?.formInputs?.dealBreakers)
              ? trip.formInputs.dealBreakers.join(", ")
              : typeof trip.formInputs?.dealBreakers === "string" &&
                trip.formInputs.dealBreakers.trim()
              ? trip.formInputs.dealBreakers
              : "None listed";

            const budgetPerPersonUSD = trip.budgetPerPersonUSD ? `$${trip.budgetPerPersonUSD}` : "N/A";

            return (
              <div
                key={trip.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 overflow-hidden border-2 border-transparent hover:border-indigo-500"
              >
                <div className="px-6 py-6 sm:p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-snug">
                    Trip to <span className="text-indigo-600 dark:text-indigo-400">{destination}</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2 col-span-full">
                      <span className="text-purple-600 dark:text-purple-400 text-lg">📧</span>
                      <div>
                        <strong>User Email:</strong>{" "}
                        <span className="font-medium text-gray-900 dark:text-white break-all">{email}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-indigo-500 dark:text-indigo-400 text-lg">📍</span>
                      <div>
                        <strong>Destination:</strong> <span className="font-medium text-gray-900 dark:text-white">{destination}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-pink-500 dark:text-pink-400 text-lg">📅</span>
                      <div>
                        <strong>Dates:</strong> <span className="font-medium text-gray-900 dark:text-white">{startDate} to {endDate}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaUserFriends className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                      <div>
                        <strong>Travelers:</strong> <span className="font-medium text-gray-900 dark:text-white">{travelers}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-orange-500 dark:text-orange-400 text-lg">🧘</span>
                      <div>
                        <strong>Feeling:</strong> <span className="font-medium text-gray-900 dark:text-white">{feeling}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-teal-500 dark:text-teal-400 text-lg">🌈</span>
                      <div>
                        <strong>Vibe:</strong> <span className="font-medium text-gray-900 dark:text-white">{vibe}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaRupeeSign className="w-5 h-5 text-green-500 dark:text-green-400" />
                      <div>
                        <strong>Budget:</strong> <span className="font-medium text-gray-900 dark:text-white">{budget}</span>
                      </div>
                    </div>
                    <div className="col-span-full sm:col-span-2 md:col-span-1 flex items-center gap-2">
                      <span className="text-blue-500 dark:text-blue-400 text-lg">✅</span>
                      <div>
                        <strong>Must Haves:</strong> <span className="font-medium">{mustHaves}</span>
                      </div>
                    </div>
                    <div className="col-span-full sm:col-span-2 md:col-span-1 flex items-center gap-2">
                      <span className="text-red-500 dark:text-red-400 text-lg">❌</span>
                      <div>
                        <strong>Deal Breakers:</strong> <span className="font-medium">{dealBreakers}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500 dark:text-yellow-400 text-lg">💵</span>
                      <div>
                        <strong>Budget Per Person (USD):</strong> <span className="font-medium text-gray-900 dark:text-white">{budgetPerPersonUSD}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <button
                      onClick={() => toggleDetails(trip.id)}
                      className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      {expandedTrip === trip.id ? (
                        <>Hide Details <FaAngleUp className="ml-2 w-5 h-5" /></>
                      ) : (
                        <>View Details <FaAngleDown className="ml-2 w-5 h-5" /></>
                      )}
                    </button>
                  </div>
                </div>

                {expandedTrip === trip.id && (
                  <div className="bg-gray-50 dark:bg-gray-700 px-6 py-6 sm:p-8 border-t-2 border-gray-200 dark:border-gray-600 animate-fade-in-down">
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Detailed Itinerary</h4>
                    <div className="space-y-6">
                      {trip.itinerary?.map((day, idx) => (
                        <div key={idx} className="border-l-4 border-indigo-500 dark:border-indigo-400 pl-4 py-2 relative">
                          <h5 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                            {day.day} ({new Date(day.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })})
                          </h5>
                          <p className="text-gray-700 dark:text-gray-300 mb-2">
                            <strong>Accommodation:</strong> <span className="font-medium">{day.accommodation || "Not specified"}</span>
                          </p>
                          {day.activities && day.activities.length > 0 && (
                            <>
                              <p className="text-gray-700 dark:text-gray-300 font-semibold mt-4 mb-1">Activities:</p>
                              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 ml-4 space-y-1">
                                {day.activities.map((act, i) => (
                                  <li key={i} className="flex items-start">
                                    <span className="mr-2 text-indigo-500 dark:text-indigo-400">•</span>
                                    {act}
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}
                          {day.diningSuggestions && day.diningSuggestions.length > 0 && (
                            <>
                              <p className="text-gray-700 dark:text-gray-300 font-semibold mt-4 mb-1">Dining Suggestions:</p>
                              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 ml-4 space-y-1">
                                {day.diningSuggestions.map((dine, i) => (
                                  <li key={i} className="flex items-start">
                                    <span className="mr-2 text-pink-500 dark:text-pink-400">•</span>
                                    {dine}
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}
                          {day.notes && (
                            <p className="text-gray-600 dark:text-gray-400 italic mt-4">
                              <span className="mr-2 text-yellow-500 dark:text-yellow-400">📝</span>
                              {day.notes}
                            </p>
                          )}
                        </div>
                      ))}
                      <div className="space-y-3 pt-4">
                        {Array.isArray(trip.mustHavesIncluded) && trip.mustHavesIncluded.length > 0 && (
                          <p className="text-gray-700 dark:text-gray-300">
                            <strong><span className="text-blue-500 dark:text-blue-400">✅</span> Must Haves Included:</strong> {trip.mustHavesIncluded.join(", ")}
                          </p>
                        )}
                        {Array.isArray(trip.dealBreakersAvoided) && trip.dealBreakersAvoided.length > 0 && (
                          <p className="text-gray-700 dark:text-gray-300">
                            <strong><span className="text-red-500 dark:text-red-400">❌</span> Deal Breakers Avoided:</strong> {trip.dealBreakersAvoided.join(", ")}
                          </p>
                        )}
                        {Array.isArray(trip.packingSuggestions) && trip.packingSuggestions.length > 0 && (
                          <p className="text-gray-700 dark:text-gray-300">
                            <strong><span className="text-orange-500 dark:text-orange-400">📦</span> Packing Suggestions:</strong> {trip.packingSuggestions.join(", ")}
                          </p>
                        )}
                        {Array.isArray(trip.tips) && trip.tips.length > 0 && (
                          <p className="text-gray-700 dark:text-gray-300">
                            <strong><span className="text-green-500 dark:text-green-400">💡</span> Tips:</strong> {trip.tips.join(", ")}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
