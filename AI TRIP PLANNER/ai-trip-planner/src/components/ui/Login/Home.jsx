
import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
const Home = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate=useNavigate()
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
const handleNavigate=()=>{
  navigate('/login');
}
  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/TRAVEL.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Navbar */}
      <nav className="relative z-10 bg-black/50 shadow-md p-4  top-0">
        <div className="container mx-auto flex justify-between items-center">
          <a href="#" className="text-3xl font-extrabold text-blue-200 flex items-center">
            Ŧ𝕣เρ รＥ𝐕єŘ€𝓘𝐆ℕ ♙
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/home" className="text-white hover:text-blue-300 font-medium text-lg transition">Home</Link>
            <Link to="/about" className="text-white hover:text-blue-300 font-medium text-lg transition">About Us</Link>
            <a href="/login" className="bg-yellow-600 text-white font-bold px-6 py-2 rounded-full hover:bg-yellow-700 transition shadow-lg">
              Login
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

       {/* Mobile Menu */}
   
       <div
         className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 transition-all duration-300 ${
           isMobileMenuOpen
            ? 'opacity-100 max-h-screen pointer-events-auto'
            : 'opacity-0 max-h-0 overflow-hidden pointer-events-none'
          }`}
>
         <div className="flex flex-col items-center space-y-4">
           <Link to="/home" className="text-gray-700 hover:text-blue-700 text-lg w-full text-center py-2">Home</Link>
           <Link to="/about" className="text-gray-700 hover:text-blue-700 text-lg w-full text-center py-2">About Us</Link>
           <a href="/login"
             className="bg-yellow-600 text-white font-bold px-6 py-2 rounded-full hover:bg-yellow-700 transition shadow-lg w-3/4 text-center inline-block"
           >
             Login
           </a>
         </div>
       </div>

      </nav>

      {/* Hero Section */}
      <main className="flex flex-col flex-1 relative z-10">
      <section className="flex items-center justify-start flex-grow text-white text-left p-12">
      <div>
        <h1 className="text-5xl font-extrabold tracking-wide mb-4">
            Explore The World With Us
        </h1>
        <p className="text-white font-bold px-6">
         Find your next great adventure with our handpicked travel experiences.<br/>
         Your journey begins here. Discover new places and adventures.
        </p>
        <br/>
        <div className="w-[170px] bg-yellow-600 text-white font-bold px-6 py-3 rounded hover:bg-yellow-700 transition"
        ><a href="/login"> Make Your Plan</a>
             
        </div>
       </div>
      </section>


        {/* Footer */}
        <footer className="text-white p-6 bg-black/40">
          <div className="max-w-4xl mx-auto text-center">
            <p>📧 Email: contact@travelwithus.com</p>
            <p>📞 Phone: +1 (234) 567-8901</p>
            <p>📍 Location: 123 Travel Rd, Adventure City</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Home;