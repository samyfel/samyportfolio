import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
            <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="max-w-3xl"
                >
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="text-5xl md:text-7xl font-extrabold mb-6 text-white leading-tight"
                    >
                        Welcome, I'm <span className="text-blue-500">Samy</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.1 }}
                        className="text-lg md:text-2xl text-gray-300 font-light mb-8"
                    >
                        A <span className="text-blue-500">Thinker</span> and
                        <span className="text-blue-500"> Entrepreneur</span> with a passion for creating, exploring, and building.
                    </motion.p>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.4 }}
                    >
                        <Link
                            to="/projects"
                            className="inline-block bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                        >
                            Explore my work
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
