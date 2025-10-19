// src/components/ui/User/PlannedTrips.jsx
import React from 'react';
import { MapPin, Calendar, Compass, Trash2 } from 'lucide-react';

const PlannedTrips = ({ trips, onTripDetailsView, onDeleteTrip }) => {
  if (!trips || trips.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-20">
        <Compass className="mx-auto mb-4 text-blue-500" size={48} />
        <p className="text-lg">No trips planned yet. Start your journey today!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 p-4 pt-8">
      {trips.map(trip => {
        const form = trip.formInputs || {};
        const destination = form.destination || trip.destination || 'Unknown destination';
        const startDate = form.startDate || trip.startDate || 'Start date not set';
        const endDate = form.endDate || trip.endDate || 'End date not set';

        return (
          <div key={trip.id} className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
            {/* 🏞 Destination */}
            <h2 className="text-xl font-bold text-blue-700 mb-1">{destination}</h2>

            {/* 📍 Location */}
            <p className="flex items-center text-sm text-gray-600 mb-1">
              <MapPin className="w-4 h-4 mr-2 text-blue-500" /> {destination}
            </p>

            {/* 📅 Dates */}
            <p className="flex items-center text-sm text-gray-500 mb-2">
              <Calendar className="w-4 h-4 mr-2 text-blue-400" /> {startDate} – {endDate}
            </p>

            {/* ✨ Overview (optional) */}
            {trip.overview && (
              <p className="text-gray-700 mb-4">{trip.overview}</p>
            )}

            {/* 👀 View + 🗑 Delete Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => onTripDetailsView(trip)}
                className="bg-green-300 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
              >
                View
              </button>
              {onDeleteTrip && (
                <button
                  onClick={() => {
                    if (window.confirm(`Delete trip to ${destination}? This action cannot be undone.`)) {
                      onDeleteTrip(trip.id);
                    }
                  }}
                  className="bg-red-400 text-white px-4 py-2 rounded hover:bg-gray-600 transition flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlannedTrips;