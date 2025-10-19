import React, { useCallback } from 'react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

// Particle imports
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

// --- TEAM MEMBER DATA ---
const teamMembers = [
    {
        name: 'SRIJEETA BISWAS',
        title: 'FOUNDER & CEO',
        description: 'Charting the course for our journey, turning bold visions into cosmic realities.',
        image: '/public/srijeeta.jpg',
        social: {
            instagram: 'https://www.instagram.com/sri_biswas103/',
            linkedin: 'https://www.linkedin.com/in/srijeeta-biswas-663b1a2a6/',
        },
    },
    {
        name: 'ANUSHKA BANIK',
        title: 'HEAD OF TRIP PLANNING & DESIGN',
        description: 'Designing the elegant and flawless itineraries that make every voyage unforgettable.',
        image: '/public/anushka.jpg',
        social: {
            instagram: 'https://www.instagram.com/anushka.banik.33/',
            linkedin: 'https://www.linkedin.com/in/anushka-banik-9423a32a8/',
        },
    },
    {
        name: 'ANKITA PAUL',
        title: 'Lead Propulsion Engineer & Developer',
        description: 'Building the powerful, high-performance engine that propels our entire platform.',
        image: '/public/ankita.jpg',
        social: {
            instagram: 'https://www.instagram.com/ankita_paul2005/',
            linkedin: 'https://www.linkedin.com/in/ankita-paul-9b9961347/',
        },
    },
];

const AboutUs = () => {
    // Particle engine initialization
    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);
    
    // Particle options JSON
    const particlesOptions = {
        background: {
            color: {
                value: 'transparent',
            },
        },
        fpsLimit: 60,
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: 'grab',
                },
            },
            modes: {
                grab: {
                    distance: 150,
                    line_linked: {
                        opacity: 1,
                    },
                },
            },
        },
        particles: {
            color: {
                value: '#ffffff',
            },
            links: {
                color: '#ffffff',
                distance: 150,
                enable: false,
                opacity: 0.5,
                width: 1,
            },
            move: {
                direction: 'none',
                enable: true,
                outModes: 'out',
                random: false,
                speed: 0.1,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 80,
            },
            opacity: {
                value: { min: 0.1, max: 0.5 },
            },
            shape: {
                type: 'circle',
            },
            size: {
                value: { min: 1, max: 3 },
            },
        },
        detectRetina: true,
    };


    return (
        <main className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden bg-gray-900">
            {/* Layer 1: Interactive Particle Background */}
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={particlesOptions}
                className="absolute inset-0 z-0"
            />
            
            {/* Layer 2: Slow-panning Nebula Image */}
            <div className="absolute inset-0 z-10 animate-pan-bg" style={{
            //  backgroundImage: url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format&fit=crop'),
                backgroundSize: '150% 150%', // Zoom in to allow for panning
                opacity: 0.4
            }}></div>

            {/* Layer 3: Main Glass Content Card */}
            <div className="relative z-20 w-full max-w-6xl rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl p-8 md:p-12">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
                    {/* Left Side: Title and Introduction */}
                    <div className="lg:w-1/3 text-center lg:text-left text-white">
                        <h1 className="text-5xl md:text-6xl font-extrabold text-shadow-glow">
                            OUR TEAM
                        </h1>
                        <p className="mt-4 text-gray-300 text-lg">
                            Dear Team, your dedication has turned dreams into destinations. Each trip planned reflects your passion, precision, and care. You don’t just organize journeys — you craft lifelong memories. Thank you for your tireless efforts, innovative ideas, and unwavering teamwork. Together, we’re not just planning trips — we’re inspiring exploration. Let’s continue to make every traveler’s journey truly unforgettable.
                        </p>
                    </div>

                    {/* Right Side: Team Member Cards */}
                    <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8" style={{ perspective: '1000px' }}>
                        {teamMembers.map((member) => (
                            <div key={member.name} className="group text-center transition-all duration-500" style={{ transformStyle: 'preserve-3d' }}>
                                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden shadow-lg transition-all duration-500 group-hover:shadow-cyan-400/30 group-hover:shadow-2xl group-hover:-translate-y-2 group-hover:rotate-x-10 group-hover:rotate-y-[-10deg]">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={member.image}
                                        alt={`Profile of ${member.name}`}
                                    />
                                    {/* Subtle overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-lg font-bold text-white">{member.name}</h3>
                                    <p className="mt-1 text-cyan-400 font-semibold">{member.title}</p>
                                    <div className="mt-3 flex justify-center space-x-4">
                                        <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                                            <FaInstagram size={22} />
                                        </a>
                                        <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                                            <FaLinkedin size={22} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AboutUs;