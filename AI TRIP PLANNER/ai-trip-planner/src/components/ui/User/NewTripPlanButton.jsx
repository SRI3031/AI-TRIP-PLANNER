// src/components/ui/User/NewTripPlanButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NewTripPlanButton = () => {
  const navigate = useNavigate();

  const handleStartNewTrip = () => {
    // This will now navigate to your DualPathDiscovery UI
    navigate('/plan');
  };

  return (
    <div className="backdrop-blur-xl bg-white/20 p-8 md:p-10 lg:p-12 rounded-xl shadow-2xl border border-white/30 max-w-3xl mx-auto my-8 flex flex-col items-center justify-center text-center">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-6 pb-4 border-b-4 border-indigo-500 tracking-tight">
        Plan Your Next Adventure!
      </h2>
      <p className="text-xl text-gray-700 mb-8 max-w-prose">
        Ready for a new journey? Click the button below to start creating your personalized trip plan with our AI assistance.
      </p>
      <button
        onClick={handleStartNewTrip}
        className="px-10 py-4 bg-amber-950 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-xl"
      >
        Start a New Trip Plan
      </button>
    </div>
  );
};

export default NewTripPlanButton;