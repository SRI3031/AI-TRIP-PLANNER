import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, query, where, onSnapshot } from 'firebase/firestore';
import { app } from 'config/Firebase';
import { deleteDoc } from 'firebase/firestore';
export const useUserDashboardLogic = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isProfileComplete, setIsProfileComplete] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userTrips, setUserTrips] = useState([]);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState(null);

    const auth = getAuth(app);
    const db = getFirestore(app);

    useEffect(() => {
        let unsubscribeTrips = () => {};

        const unsubscribeAuth = onAuthStateChanged(auth, async (authUser) => {
            if (!authUser) {
                setUser(null);
                setUserData(null);
                setUserTrips([]);
                setLoading(false);
                return;
            }
           console.log('Current user email:', authUser.email);
            const userDocRef = doc(db, 'user', authUser.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (!userDocSnap.exists()) {
                setUser(null);
                setUserData(null);
                setUserTrips([]);
                setLoading(false);
                return;
            }

            const data = userDocSnap.data();

            if (data.role && data.role.toLowerCase() === 'admin') {
                setUser(null);
                setUserData(null);
                setUserTrips([]);
                setLoading(false);
                return;
            }

            setUser(authUser);
            setUserData(data);
            setActiveTab('dashboard');

            const requiredFields = ['username', 'city', 'country'];
            const isComplete = requiredFields.every(field => data[field] && data[field].trim() !== '');
            setIsProfileComplete(isComplete);

            const tripsCollection = collection(db, 'trips');
const userTripsQuery = query(
  collection(db, 'trips'),
  where('formInputs.userEmail', '==', authUser.email)
);

            unsubscribeTrips = onSnapshot(userTripsQuery, (querySnapshot) => {
                const trips = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                        console.log('Fetched trips:', trips);

                setUserTrips(trips);
            });

            setLoading(false);
        });

        return () => {
            unsubscribeAuth();
            unsubscribeTrips();
        };
    }, [auth, db]);

    const handleEditProfile = () => {
        setIsEditingProfile(true);
        setActiveTab('profile');
    };

    const handleCancelEdit = () => {
        setIsEditingProfile(false);
    };

    const handleSaveProfile = async (updatedData) => {
        if (!user) return;
        try {
            const userDocRef = doc(db, 'user', user.uid);
            await setDoc(userDocRef, updatedData, { merge: true });
            setUserData(updatedData);
            setIsEditingProfile(false);
            console.log("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    // make sure this is imported

const handleDeleteTrip = async (tripId) => {
  if (!tripId) return;
  try {
    const tripRef = doc(db, 'trips', tripId);
    await deleteDoc(tripRef);
    console.log(`Trip with ID ${tripId} deleted successfully.`);
  } catch (error) {
    console.error('Error deleting trip:', error);
  }
};

const handleTripDetailsView = async (trip) => {
    try {
        const tripRef = doc(db, 'trips', trip.id);
        const tripSnap = await getDoc(tripRef);

        if (tripSnap.exists()) {
            const fullTrip = { id: trip.id, ...tripSnap.data() };
            setSelectedTrip(fullTrip);
            setActiveTab('tripDetails');
        } else {
            console.error('Trip not found in Firestore');
        }
    } catch (error) {
        console.error('Error fetching trip details:', error);
    }
};

    return {
        activeTab, setActiveTab,
        user, userData, isProfileComplete, loading,
        userTrips, isEditingProfile, selectedTrip,
        handleEditProfile, handleSaveProfile, handleDeleteTrip, handleTripDetailsView,
        handleCancelEdit
    };
};