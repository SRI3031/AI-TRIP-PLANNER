// src/components/ui/User/UserDashboard.jsx
import React from 'react';
import { FaUserCircle, FaPlaneDeparture, FaPlus, FaTachometerAlt, FaStar, FaEdit, FaSignOutAlt } from 'react-icons/fa';
import ProfileSection from './ProfileSection';
import PlannedTrips from './PlannedTrips';
import NewTripPlanButton from './NewTripPlanButton';
import ProfileForm from './ProfileForm';
import TripDetails from './TripDetails';
import Review from './Review';
import { useUserDashboardLogic } from 'controllers/userdashboard';

const BACKGROUND_IMAGE_URL = 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?q=80&w=1974&auto=format&fit=crop';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
  </div>
);

const DashboardMessage = ({ title, subtitle, buttons }) => (
  <div className="bg-white/95 p-8 sm:p-12 rounded-3xl shadow-2xl max-w-2xl w-full text-center border border-gray-100 backdrop-blur-sm transform transition-transform duration-300 hover:scale-[1.01]">
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight leading-tight">
      {title}
    </h2>
    <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-10 font-light max-w-prose mx-auto">
      {subtitle}
    </p>
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={button.onClick}
          className={`flex-1 flex items-center justify-center gap-3 font-semibold py-4 px-8 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl
            ${button.primary ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
        >
          {button.icon} {button.label}
        </button>
      ))}
    </div>
  </div>
);

const UserDashboard = () => {
  const {
    activeTab, setActiveTab,
    user, userData, isProfileComplete, loading,
    userTrips, isEditingProfile, selectedTrip,
    handleEditProfile, handleSaveProfile, handleDeleteTrip,
    handleTripDetailsView, handleCancelEdit
  } = useUserDashboardLogic();

  const renderMainContent = () => {
    if (loading) return <LoadingSpinner />;

    if (activeTab === 'dashboard') {
      if (user && !isProfileComplete) {
        return (
          <DashboardMessage
            title={`Welcome, ${userData?.username || user?.email.split('@')[0] || 'Traveler'}!`}
            subtitle="Your adventure awaits. Begin by completing your profile or get straight to planning your first extraordinary journey."
            buttons={[
              { label: 'Plan Your First Trip', onClick: () => setActiveTab('newTrip'), icon: <FaPlaneDeparture className="text-xl" />, primary: true },
              { label: 'Complete Your Profile', onClick: () => setActiveTab('profile'), icon: <FaEdit className="text-xl" />, primary: false },
            ]}
          />
        );
      } else if (user && isProfileComplete) {
        return (
          <DashboardMessage
            title={`Welcome back, ${userData?.username || userData?.displayName || user?.email.split('@')[0] || 'Traveler'}!`}
            subtitle="Ready for your next great adventure? Your personalized dashboard is waiting for you."
            buttons={[
              { label: 'View My Profile', onClick: () => setActiveTab('profile'), icon: <FaUserCircle className="text-xl" />, primary: true },
            ]}
          />
        );
      }
    }

    switch (activeTab) {
      case 'profile':
        return isEditingProfile
          ? <ProfileForm userData={userData} onSave={handleSaveProfile} onCancel={handleCancelEdit} />
          : <ProfileSection user={user} userData={userData} onEditProfile={handleEditProfile} />;
      case 'plannedTrips':
        return (
          <PlannedTrips
            trips={userTrips}
            onDeleteTrip={handleDeleteTrip}
            onTripDetailsView={handleTripDetailsView}
          />
        );
      case 'newTrip':
        return <NewTripPlanButton />;
      case 'tripDetails':
        return (
          <TripDetails
            trip={selectedTrip}
            onClose={() => setActiveTab('plannedTrips')}
          />
        );
      case 'review':
        return <Review />;
      default:
        return (
          <div className="bg-white/80 p-8 rounded-2xl shadow-xl backdrop-blur-md max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-gray-900">Your Dashboard</h2>
            <p className="mt-4 text-gray-700">Explore your planned trips or create a new one!</p>
          </div>
        );
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaTachometerAlt },
    { id: 'profile', label: 'My Profile', icon: FaUserCircle },
    { id: 'plannedTrips', label: 'All Planned Trips', icon: FaPlaneDeparture },
    { id: 'newTrip', label: 'Get New Trip Plans', icon: FaPlus },
    { id: 'review', label: 'Review', icon: FaStar },
  ];

  const handleLogout = () => {
    // In a real application, you would clear user session/token here.
    console.log('Logging out...');
    window.location.href = '/';
  };

  return (
    <div
      className="flex h-screen font-sans text-gray-800 w-full relative overflow-hidden"
      
    >
      <div className="absolute inset-0  bg-opacity-60 z-0" style={{
        backgroundImage: `url('${BACKGROUND_IMAGE_URL}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}></div>

      {/* Sidebar Navigation */}
      <nav className="w-64 h-screen bg-gray-900 text-white flex-shrink-0 relative z-10 p-6 overflow-y-auto shadow-2xl transition-all duration-300">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-white leading-tight">
            Ŧ𝕣เρ รＥ𝐕єŘє𝓘𝐆ℕ ♙
          </h1>
          <p className="text-sm text-gray-400 mt-2">Your Ultimate Travel Planner</p>
        </div>
        <ul className="space-y-3">
          {navItems.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <button
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-4 py-3 px-4 rounded-lg text-lg transition-colors duration-200
                  ${activeTab === id ? 'bg-purple-600 font-semibold shadow-lg' : 'hover:bg-gray-700'}`}
              >
                <Icon className="text-xl" />
                {label}
              </button>
            </li>
          ))}
          <li className="mt-auto pt-6"> {/* Use mt-auto to push to bottom if necessary */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 py-3 px-4 rounded-lg text-lg transition-colors duration-200 text-gray-300 hover:bg-purple-600 hover:text-white"
            >
              <FaSignOutAlt className="text-xl" />
              Logout
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content Area */}
<main
  className={`flex-1 relative z-10 h-screen overflow-y-auto px-6 py-8 scroll-py-8 ${
    ['dashboard', 'profile','newTrip'].includes(activeTab) ? 'flex items-center justify-center' : ''
  }`}
>
  {renderMainContent()}
</main>
    </div>
  );
};

export default UserDashboard;