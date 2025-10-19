// AdminReviewsPage.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from 'config/db'; // Your Firebase Firestore connection
import { MapPin, Sparkles, Star } from 'lucide-react';
import clsx from 'clsx'; // For conditional classes

const AdminReview = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Utility function to format Firestore Timestamps and regular Date strings
    const formatDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        }).format(date);
    };

    // Memoized function to fetch trips and their reviews
    const fetchTripsAndReviews = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const tripsCollectionRef = collection(db, "trips");
            const q = query(tripsCollectionRef, orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);

            const fetchedTrips = [];
            for (const docSnapshot of querySnapshot.docs) {
                const tripData = { id: docSnapshot.id, ...docSnapshot.data() };

                // Fetch reviews for the current trip from its sub-collection
                const reviewsCollectionRef = collection(db, "trips", docSnapshot.id, "reviews");
                const reviewsQuery = query(reviewsCollectionRef, orderBy("createdAt", "asc")); // Order reviews by creation time
                const reviewsSnapshot = await getDocs(reviewsQuery);
                tripData.reviews = reviewsSnapshot.docs.map(reviewDoc => ({
                    id: reviewDoc.id,
                    ...reviewDoc.data()
                }));

                fetchedTrips.push(tripData);
            }
            setTrips(fetchedTrips);
        } catch (err) {
            console.error("Error fetching trips and reviews for admin:", err);
            setError("Failed to load trips and reviews for admin. Please try again later. Details: " + err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Effect hook to call fetchTripsAndReviews on component mount
    useEffect(() => {
        fetchTripsAndReviews();
    }, [fetchTripsAndReviews]);

    // Helper function to render star icons
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Star
                    key={i}
                    size={12} // Smaller stars for display
                    className={clsx(
                        i <= rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"
                    )}
                />
            );
        }
        return <div className="flex gap-0.5">{stars}</div>;
    };

    return (
        <div
            className="min-h-screen w-full  bg-cover font-sans p-4 sm:p-8 dark:bg-[url('https://e0.pxfuel.com/wallpapers/390/58/desktop-wallpaper-blue-aesthetic-blue-glow-blue-aesthetic-dark-blue-aesthetic-blue-aesthetic-grunge.jpg')]
            bg-[url('https://w0.peakpx.com/wallpaper/146/911/HD-wallpaper-blue-abstract-waves-creative-blue-wavy-background-blue-backgrounds-abstract-waves-waves-textures.jpg')]"
       
            
        >
            <div className=" "></div> {/* Slightly darker overlay for admin page */}

            <header className="text-center mb-10 relative z-10">
                <h1 className="font-['Playfair_Display'] text-5xl sm:text-6xl font-bold text-white drop-shadow-lg">
                    Ŧ𝕣เρ รＥ𝐕єŘє𝓘𝐆ℕ ♙
                </h1>
                <h4 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-white drop-shadow-lg mt-2">
                    Admin Review Dashboard
                </h4>
                <p className="text-base sm:text-lg text-white/90 mt-2 max-w-2xl mx-auto drop-shadow-md">
                    <u>Overview of all submitted guest feedback across bespoke journeys.</u>
                </p>
            </header>

            <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-3xl border border-white/5 rounded-xl shadow-2xl p-6 relative z-10"> {/* Wider for more content */}
                {/* Global Error Message */}
                {error && (
                    <p className="text-center text-sm font-bold py-2 px-3 rounded-lg mb-4 bg-red-100 text-red-800">
                        {error}
                    </p>
                )}

                {loading && (
                    <div className="text-center text-xl text-white animate-pulse flex items-center justify-center gap-3 py-8">
                        <Sparkles className="animate-spin-slow" size={32} />
                        Loading all reviews...
                    </div>
                )}

                {!loading && !error && trips.length === 0 && (
                    <div className="text-center text-lg text-white p-6 bg-white/5 rounded-lg shadow-inner">
                        <p className="mb-3">No trips found in the database yet.</p>
                        <p>Once trips are added, their reviews will appear here.</p>
                    </div>
                )}

                {!loading && !error && trips.length > 0 && (
                    <div className="space-y-6"> {/* More space between trip cards */}
                        {trips.map((trip) => (
                            <div key={trip.id} className="bg-white/15 p-5 dark:bg-white/40 rounded-lg shadow-md border border-white/10">
                                <h3 className="font-['Playfair_Display'] text-2xl font-bold dark:text-blue-950 text-black mb-2 flex items-center gap-2">
                                    <MapPin size={24} className="text-black "/> {trip.destination}
                                </h3>
                                <p className="text-black dark:text-blue-900 font-bold text-base leading-snug mb-4">
                                    {trip.overview}
                                </p>

                                {trip.reviews && trip.reviews.length > 0 ? (
                                    <div className="mt-4 border-t border-white/20 pt-4">
                                        <h5 className="font-bold text-lg text-black mb-3 flex items-center gap-2">
                                            <Sparkles size={18} className="text-yellow-300"/> Guest Reviews ({trip.reviews.length})
                                        </h5>
                                        <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar"> {/* Increased height for reviews */}
                                            {trip.reviews.map((review) => (
                                                <div key={review.id} className="bg-white/10 p-3 rounded-md shadow-inner border border-white/15">
                                                    <div className="flex items-center justify-between mb-1">
                                                        {renderStars(review.rating)}
                                                        <span className="text-xs text-gray-300">
                                                            {review.createdAt ? formatDate(review.createdAt) : 'N/A'}
                                                        </span>
                                                    </div>
                                                    <p className="text-black text-sm leading-normal mb-1">{review.comment}</p>
                                                    <p className="text-xs text-black font-semibold">- {review.reviewer}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-white/60 dark:text-black text-sm mt-3 border-t border-white/20 pt-3">No reviews submitted for this trip yet.</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* Custom Scrollbar and Animation Styles */}
            <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600;700&display=swap');
            .custom-scrollbar::-webkit-scrollbar {
                width: 6px; /* Slightly wider scrollbar for admin page */
            }
            .custom-scrollbar::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.1); /* Slightly more visible track */
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

export default AdminReview;