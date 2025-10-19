//reviews


// Reviewspage.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, addDoc, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from 'config/db'; // <-- This is where your Firebase Firestore instance is connected
import { MessageSquare, MapPin, Sparkles, Send, Star, ChevronDown, ChevronUp } from 'lucide-react';
import clsx from 'clsx'; // For conditional classes

const Review = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null); // New state for success messages

    // State for new review inputs: { tripId: { text: '', rating: 0, reviewerName: '' } }
    const [newReviewInputs, setNewReviewInputs] = useState({});
    const [submittingReview, setSubmittingReview] = useState({}); // Tracks submission state per trip

    // State for expanded reviews (for 'View Reviews' toggle): { tripId: true/false }
    const [expandedReviews, setExpandedReviews] = useState({});

    // Utility function to format Firestore Timestamps and regular Date strings
    const formatDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        }).format(date);
    };

    // Utility function to truncate text to a specified word limit
    const truncateText = (text, wordLimit) => {
        if (!text) return '';
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    };

    // Memoized function to fetch trips and their reviews
    const fetchTrips = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            setSuccessMessage(null); // Clear success message on new fetch

            const tripsCollectionRef = collection(db, "trips"); // Reference to the 'trips' collection in Firestore
            const q = query(tripsCollectionRef, orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q); // Fetch trips from Firestore

            const fetchedTrips = [];
            for (const docSnapshot of querySnapshot.docs) {
                const tripData = { id: docSnapshot.id, ...docSnapshot.data() };

                // Fetch reviews for the current trip from its sub-collection in Firestore
                const reviewsCollectionRef = collection(db, "trips", docSnapshot.id, "reviews");
                const reviewsQuery = query(reviewsCollectionRef, orderBy("createdAt", "asc"));
                const reviewsSnapshot = await getDocs(reviewsQuery);
                tripData.reviews = reviewsSnapshot.docs.map(reviewDoc => ({
                    id: reviewDoc.id,
                    ...reviewDoc.data()
                }));

                fetchedTrips.push(tripData);

                // Initialize input states for new reviews for this trip
                setNewReviewInputs(prev => ({
                    ...prev,
                    [docSnapshot.id]: prev[docSnapshot.id] || { text: '', rating: 0, reviewerName: '' }
                }));
            }
            setTrips(fetchedTrips);
        } catch (err) {
            console.error("Error fetching trips and reviews:", err);
            setError("Failed to load trips and reviews. Please try again later. Details: " + err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Effect hook to call fetchTrips on component mount
    useEffect(() => {
        fetchTrips();
    }, [fetchTrips]);

    // Handler for updating review input fields (text, rating, reviewerName)
    const handleReviewInputChange = (tripId, field, value) => {
        setNewReviewInputs(prev => ({
            ...prev,
            [tripId]: {
                ...prev[tripId],
                [field]: value
            }
        }));
    };

    // Handler for submitting a new review to Firestore
    const handleReviewSubmit = async (tripId) => {
        const reviewData = newReviewInputs[tripId];

        // Clear previous messages
        setError(null);
        setSuccessMessage(null);

        // Validation
        if (!reviewData || reviewData.text.trim() === '') {
            setError("Please write a review before submitting!");
            return;
        }
        if (reviewData.rating === 0) {
            setError("Please select a star rating!");
            return;
        }

        setSubmittingReview(prev => ({ ...prev, [tripId]: true }));

        try {
            // Reference to the 'reviews' sub-collection for the specific trip in Firestore
            const reviewsCollectionRef = collection(db, "trips", tripId, "reviews");
            await addDoc(reviewsCollectionRef, { // <-- This line writes the review data to Firestore
                comment: reviewData.text.trim(),
                rating: reviewData.rating,
                reviewer: reviewData.reviewerName.trim() || 'Anonymous', // Default to 'Anonymous' if no name
                createdAt: serverTimestamp(), // Use Firestore's server timestamp
            });

            // Re-fetch all trips to update the UI with the new review
            await fetchTrips();

            // Clear review input fields for the submitted trip
            setNewReviewInputs(prev => ({
                ...prev,
                [tripId]: { text: '', rating: 0, reviewerName: '' }
            }));

            // Provide temporary success feedback
            setSuccessMessage(`Review submitted successfully for ${trips.find(t => t.id === tripId)?.destination}!`);
            setTimeout(() => setSuccessMessage(null), 3000); // Clear success message after 3 seconds

        } catch (err) {
            console.error("Error submitting review:", err);
            setError(`Failed to submit review for trip ${tripId}. (Error: ${err.message})`);
        } finally {
            setSubmittingReview(prev => ({ ...prev, [tripId]: false }));
        }
    };

    // Handler for toggling existing reviews expansion
    const toggleReviews = (tripId) => {
        setExpandedReviews(prev => ({
            ...prev,
            [tripId]: !prev[tripId]
        }));
    };

    // Helper function to render star icons
    const renderStars = (rating, isInteractive = false, onRatingClick = null) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Star
                    key={i}
                    size={isInteractive ? 18 : 12} // Interactive stars are slightly larger
                    className={clsx(
                        "transition-transform duration-150",
                        i <= rating ? "fill-yellow-500 text-yellow-500" : "fill-gray-300 text-gray-300",
                        isInteractive ? "cursor-pointer hover:scale-110" : ""
                    )}
                    onClick={isInteractive ? () => onRatingClick(i) : null}
                />
            );
        }
        return <div className="flex gap-0.5">{stars}</div>;
    };


    return (
        <div
            className="min-h-screen w-full bg-cover bg-center font-sans p-4 sm:p-8"
            style={{backgroundImage: "url('https://images.unsplash.com/photo-1526772662000-3f88f10405ff')"}}
        >
            <div className="absolute inset-0 bg-black/10"></div>  {/* Very light black */}



            <header className="text-center mb-10 relative z-10">
                <h1 className="font-['Playfair_Display'] text-5xl sm:text-6xl font-bold text-white drop-shadow-lg">
                    Ŧ𝕣เρ รＥ𝐕єŘє𝓘𝐆ℕ ♙
                </h1>
                <h4 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-white drop-shadow-lg mt-2">
                    Guest Impressions
                </h4>
                <p className="text-base sm:text-lg text-white/90 mt-2 max-w-2xl mx-auto drop-shadow-md">
                    <u>Concise overviews of AI-curated journeys, alongside valuable guest feedback.</u>
                </p>
            </header>

            <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-3xl border border-white/5 rounded-xl shadow-2xl p-4 relative z-10"> {/* Reduced max-width, padding, more translucent */}
                {/* Global Error Message */}
                {error && (
                    <p className="text-center text-sm font-bold py-2 px-3 rounded-lg mb-4 bg-red-100 text-red-800">
                        {error}
                    </p>
                )}
                {/* Global Success Message */}
                {successMessage && (
                    <p className="text-center text-sm font-bold py-2 px-3 rounded-lg mb-4 bg-emerald-100 text-emerald-800">
                        {successMessage}
                    </p>
                )}

                {loading && (
                    <div className="text-center text-xl text-white animate-pulse flex items-center justify-center gap-3 py-8"> {/* Adjusted text color for contrast */}
                        <Sparkles className="animate-spin-slow" size={32} />
                        Loading bespoke journeys...
                    </div>
                )}

                {!loading && !error && trips.length === 0 && (
                    <div className="text-center text-lg text-white p-6 bg-white/5 rounded-lg shadow-inner"> {/* Adjusted text color, padding */}
                        <p className="mb-3">It appears no luxurious trips have been curated yet.</p>
                        <p>Begin your dream journey by crafting one on the main page!</p>
                    </div>
                )}

                <div className="space-y-4"> {/* Reduced space between cards */}
                    {trips.map((trip) => (
                        <div key={trip.id} className="bg-white/15 p-3 rounded-lg shadow-sm border border-white/10 transform hover:scale-[1.005] transition-transform duration-200 ease-out"> {/* Reduced padding, rounded, shadow, opacity */}
                            <h3 className="font-['Playfair_Display'] text-xl font-bold text-black mb-1 flex items-center gap-2">
                                <MapPin size={20} className="text-black"/> {trip.destination}
                            </h3>
                            <p className="text-black text-sm leading-snug mb-3">
                                {truncateText(trip.overview, 50)}
                            </p>

                            {/* Add Review Form */}
                            <div className="mt-2 flex flex-col gap-2 p-3 bg-white/20 rounded-md border border-white/15 shadow-inner"> {/* Very compact form */}
                                <h5 className="font-bold text-sm text-black mb-1">Share Your Experience:</h5>
                                <div className="flex justify-start mb-1 text-black">
                                    {renderStars(newReviewInputs[trip.id]?.rating || 0, true, (rating) =>
                                        handleReviewInputChange(trip.id, 'rating', rating)
                                    )}
                                </div>
                                <input
                                    type="text"
                                    className="w-full p-2 bg-white/20 border border-white/30 rounded-md text-black placeholder:text-black focus:outline-none focus:ring-1 focus:ring-teal-400 text-xs"
                                    placeholder="Your Name (Optional)"
                                    value={newReviewInputs[trip.id]?.reviewerName || ''}
                                    onChange={(e) => handleReviewInputChange(trip.id, 'reviewerName', e.target.value)}
                                    disabled={submittingReview[trip.id]}
                                />
                                <textarea
                                    className="w-full p-2 bg-white/20 border border-white/30 rounded-md text-black placeholder:text-black focus:outline-none focus:ring-1 focus:ring-teal-400 text-xs"
                                    rows="2"
                                    placeholder="Your feedback..."
                                    value={newReviewInputs[trip.id]?.text || ''}
                                    onChange={(e) => handleReviewInputChange(trip.id, 'text', e.target.value)}
                                    disabled={submittingReview[trip.id]}
                                ></textarea>
                                <button
                                    onClick={() => handleReviewSubmit(trip.id)}
                                    className={clsx(
                                        "flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md font-semibold text-white text-xs transition-all duration-200 ease-in-out",
                                        submittingReview[trip.id]
                                            ? "bg-gray-500 cursor-not-allowed"
                                            : "bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                    )}
                                    disabled={submittingReview[trip.id]}
                                >
                                    {submittingReview[trip.id] ? (
                                        <>Submitting...</>
                                    ) : (
                                        <><Send size={14} /> Submit</>
                                    )}
                                </button>
                            </div>

                            {/* View Reviews Toggle */}
                            {trip.reviews && trip.reviews.length > 0 && (
                                <div className="mt-3 border-t border-white/10 pt-3">
                                    <button
                                        onClick={() => toggleReviews(trip.id)}
                                        className="text-teal-300 hover:text-teal-100 font-medium flex items-center gap-1 transition-colors duration-150 text-xs"
                                    >
                                        {expandedReviews[trip.id] ? (
                                            <>Hide Reviews ({trip.reviews.length}) <ChevronUp size={12}/></>
                                        ) : (
                                            <>View Reviews ({trip.reviews.length}) <ChevronDown size={12}/></>
                                        )}
                                    </button>

                                    {expandedReviews[trip.id] && (
                                        <div className="space-y-2 mt-3 max-h-32 overflow-y-auto pr-1 custom-scrollbar"> {/* Very compact reviews list */}
                                            {trip.reviews.map((review) => (
                                                <div key={review.id} className="bg-white/10 p-2 rounded-md shadow-inner border border-white/15">
                                                    <div className="flex items-center justify-between mb-0.5">
                                                        {renderStars(review.rating)}
                                                        <span className="text-xs text-gray-300">
                                                            {review.createdAt ? formatDate(review.createdAt) : 'N/A'}
                                                        </span>
                                                    </div>
                                                    <p className="text-white/90 text-xs leading-snug mb-0.5">{review.comment}</p>
                                                    <p className="text-xs text-gray-400 font-semibold">- {review.reviewer}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {/* Custom Scrollbar and Animation Styles */}
            <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600;700&display=swap');
            .custom-scrollbar::-webkit-scrollbar {
                width: 4px; /* Even thinner scrollbar */
            }
            .custom-scrollbar::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.05); /* Even lighter track */
                border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #0f766e;
                border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #0d9488;
            }
            /* Custom animation for sparkling effect */
            @keyframes spin-slow {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            .animate-spin-slow {
              animation: spin-slow 8s linear infinite;
            }
            `}</style>
        </div>
    );
};

export default Review;