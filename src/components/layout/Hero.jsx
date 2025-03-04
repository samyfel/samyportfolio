import { Link } from 'react-router-dom';
import profilePic from '../../assets/images/portfoliopic.png';
import logo from '../../assets/images/AF.png';
import ParticleRing from '../three/ParticleRing';

const Hero = () => {
    return (
        <div className="relative h-screen bg-gray-900">
            {/* Particle Animation */}
            <div className="absolute inset-0 z-0">
                <ParticleRing />
            </div>

            {/* Introduction Content */}
            <div
                className="relative z-10 h-full flex items-center justify-center text-center px-4 pointer-events-none"
            >
                <div className="max-w-3xl pointer-events-auto">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white leading-tight">
                        Hi, I'm <span className="text-blue-500">Samy Fallah</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-gray-300 font-light mb-8">
                        A passionate <span className="text-blue-500">Developer</span> and
                        <span className="text-blue-500"> Entrepreneur</span> crafting
                        innovative solutions and pushing the boundaries of technology.
                    </p>
                    <a
                        href="projects"
                        className="inline-block bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium px-6 py-3 rounded-full transition duration-300">
                        Explore my work
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Hero;
