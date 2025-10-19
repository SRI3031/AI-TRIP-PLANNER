// src/components/ui/User/ProfileForm.jsx
import React, { useState } from 'react';

const ProfileForm = ({ userData, onSave, onCancel }) => {
    // Local state to manage the form inputs, initialized with current user data
    const [formData, setFormData] = useState(userData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); // Call the onSave function from the parent
    };

    return (
        <div className="bg-white/90 p-8 rounded-2xl shadow-xl backdrop-blur-sm w-full max-w-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="displayName">
                        Name
                    </label>
                    <input
                        type="text"
                        id="displayName"
                        name="displayName"
                        value={formData.displayName || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your full name"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="city">
                        City
                    </label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your city"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="country">
                        Country
                    </label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your country"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="preferences">
                        Travel Preferences
                    </label>
                    <textarea
                        id="preferences"
                        name="preferences"
                        value={formData.preferences || ''}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 'Love hiking and cultural tours'"
                    />
                </div>
                <div className="flex gap-4 mt-6">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-md hover:bg-blue-700 transition-colors"
                    >
                        Save Changes
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-full shadow-md hover:bg-gray-300 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileForm;