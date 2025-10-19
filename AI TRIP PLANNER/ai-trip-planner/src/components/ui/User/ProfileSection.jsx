// src/components/ui/User/ProfileSection.jsx
import React from 'react';
import { FaUserCircle, FaEnvelope, FaMapMarkerAlt, FaGlobe, FaStar, FaEdit } from 'react-icons/fa';

const ProfileSection = ({ user, userData, onEditProfile }) => {
  const displayName = userData?.username || user?.displayName || 'Traveler';
  const email = user?.email || userData?.email || 'Not Provided';
  const role = userData?.role || 'user';
  const city = userData?.city || 'Unknown';
  const country = userData?.country || 'Unknown';

  const userInitial = displayName ? displayName.charAt(0).toUpperCase() : '?';

  return (
    <div className="bg-amber-50 p-8 rounded-xl shadow-2xl max-w-1/2 w-full mx-auto border border-amber-50 transition-all duration-300 transform hover:scale-[1.01]">
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="relative w-28 h-28 mb-4">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-600 to-indigo-800 text-black flex items-center justify-center text-5xl font-bold border-4 border-white shadow-lg">
            {userInitial}
          </div>
          <div className="absolute bottom-0 right-0 p-1.5 bg-yellow-400 rounded-full text-white shadow-md">
            <FaStar className="text-sm" />
          </div>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">{displayName}</h2>
        <p className="text-lg text-gray-500 mt-1 capitalize">{role}</p>
      </div>

      <div className="bg-amber-50 p-6 rounded-lg border border-gray-200 shadow-inner mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 text-left">User Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-gray-700">
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-xl text-purple-600" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-500">Email Address</span>
              <span className="text-base font-medium truncate">{email}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-xl text-purple-600" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-500">City</span>
              <span className="text-base font-medium">{city}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FaGlobe className="text-xl text-purple-600" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-500">Country</span>
              <span className="text-base font-medium">{country}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={onEditProfile}
          className="flex items-center gap-2 bg-purple-600 text-white font-semibold py-3 px-6 rounded-full text-lg shadow-lg hover:bg-purple-700 transition-colors duration-300 transform hover:-translate-y-1"
        >
          <FaEdit className="text-lg" /> Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;