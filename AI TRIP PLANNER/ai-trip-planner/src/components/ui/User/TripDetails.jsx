import React from 'react';

const TripDetails = ({ trip, onClose }) => {
  if (!trip) return null;

  const form = trip.formInputs || {};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-800">Trip Details</h2>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 font-semibold text-sm"
          >
            ✖ Close
          </button>
        </div>

        {/* 📝 Form Inputs */}
        <div className="space-y-2 text-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">📝 Trip Info</h3>
          <p><span className="font-semibold">Destination:</span> {form.destination || trip.destination || 'Not provided'}</p>
          <p><span className="font-semibold">Start Date:</span> {form.startDate || 'Not provided'}</p>
          <p><span className="font-semibold">End Date:</span> {form.endDate || 'Not provided'}</p>
          <p><span className="font-semibold">Travelers:</span> {form.travelerType || trip.travelers || 'Not specified'}</p>
          <p><span className="font-semibold">Budget:</span> ₹{form.budget || trip.budgetPerPersonUSD || 'Not specified'}</p>
          {form.feelingInput && (
            <p><span className="font-semibold">Feeling:</span> {form.feelingInput}</p>
          )}
        </div>

        {/* 🌟 Overview */}
        {trip.overview && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">🌟 Overview</h3>
            <p className="text-gray-600">{trip.overview}</p>
          </div>
        )}

        {/* 🎯 Vibe */}
        {trip.vibe && (
          <p className="mt-2"><span className="font-semibold">Trip Vibe:</span> {trip.vibe}</p>
        )}

        {/* ✅ Must-Haves */}
        {Array.isArray(trip.mustHavesIncluded) && trip.mustHavesIncluded.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">✅ Must-Haves Included</h3>
            <ul className="list-disc list-inside text-gray-600">
              {trip.mustHavesIncluded.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          </div>
        )}

        {/* 🚫 Deal Breakers Avoided */}
        {Array.isArray(trip.dealBreakersAvoided) && trip.dealBreakersAvoided.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">🚫 Deal Breakers Avoided</h3>
            <ul className="list-disc list-inside text-gray-600">
              {trip.dealBreakersAvoided.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          </div>
        )}

        {/* 🎒 Packing Suggestions */}
        {Array.isArray(trip.packingSuggestions) && trip.packingSuggestions.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">🎒 Packing Suggestions</h3>
            <ul className="list-disc list-inside text-gray-600">
              {trip.packingSuggestions.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          </div>
        )}

        {/* 💡 Tips */}
        {Array.isArray(trip.tips) && trip.tips.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">💡 Travel Tips</h3>
            <ul className="list-disc list-inside text-gray-600">
              {trip.tips.map((tip, idx) => <li key={idx}>{tip}</li>)}
            </ul>
          </div>
        )}

        {/* 🗺 Itinerary */}
        {Array.isArray(trip.itinerary) && trip.itinerary.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-bold text-blue-700 mb-4">🗺 Trip Itinerary</h3>
            {trip.itinerary.map((dayPlan, index) => (
              <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-lg font-semibold text-blue-600 mb-2">
                  {dayPlan.day} – {dayPlan.date}
                </h4>

                {Array.isArray(dayPlan.activities) && (
                  <div className="mb-2">
                    <p className="font-medium text-gray-700">Activities:</p>
                    <ul className="list-disc list-inside text-gray-600">
                      {dayPlan.activities.map((act, i) => <li key={i}>{act}</li>)}
                    </ul>
                  </div>
                )}

                {Array.isArray(dayPlan.diningSuggestions) && (
                  <div className="mb-2">
                    <p className="font-medium text-gray-700">Dining Suggestions:</p>
                    <ul className="list-disc list-inside text-gray-600">
                      {dayPlan.diningSuggestions.map((place, i) => <li key={i}>{place}</li>)}
                    </ul>
                  </div>
                )}

                {dayPlan.notes && (
                  <p className="text-sm text-gray-500 italic">Note: {dayPlan.notes}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TripDetails;