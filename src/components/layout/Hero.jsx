import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ParticleField = () => {
    const canvasRef = useRef(null);
    const particles = useRef([]);
    const mousePosition = useRef({ x: 0, y: 0 });
    const animationFrameId = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        // Initialize particles
        const initParticles = () => {
            particles.current = [];
            const numParticles = Math.min((width * height) / 15000, 100); // Adjust density, cap at 100
            
            for (let i = 0; i < numParticles; i++) {
                particles.current.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 2 + 1,
                    vx: Math.random() * 0.5 - 0.25,
                    vy: Math.random() * 0.5 - 0.25,
                    originalRadius: Math.random() * 2 + 1
                });
            }
        };

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#111827';
            ctx.fillRect(0, 0, width, height);

            particles.current.forEach(particle => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Bounce off edges
                if (particle.x < 0 || particle.x > width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > height) particle.vy *= -1;

                // Mouse interaction
                const dx = mousePosition.current.x - particle.x;
                const dy = mousePosition.current.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 120;

                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    particle.x -= dx * force * 0.02;
                    particle.y -= dy * force * 0.02;
                    particle.radius = particle.originalRadius * (1 + force * 0.5);
                } else {
                    particle.radius = particle.originalRadius;
                }

                // Draw particle with gradient
                const gradient = ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, particle.radius
                );
                gradient.addColorStop(0, '#3B82F6');
                gradient.addColorStop(1, 'rgba(59, 130, 246, 0.2)');
                
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
            });

            // Connect nearby particles
            particles.current.forEach((particle, i) => {
                for (let j = i + 1; j < particles.current.length; j++) {
                    const dx = particle.x - particles.current[j].x;
                    const dy = particle.y - particles.current[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 80) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 * (1 - distance / 80)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(particles.current[j].x, particles.current[j].y);
                        ctx.stroke();
                    }
                }
            });

            animationFrameId.current = requestAnimationFrame(animate);
        };

        // Handle resize
        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initParticles();
        };

        // Handle mouse movement
        const handleMouseMove = (e) => {
            mousePosition.current = {
                x: e.clientX,
                y: e.clientY
            };
        };

        // Initialize
        initParticles();
        animate();

        // Event listeners
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ background: '#111827' }}
        />
    );
};

const Hero = () => {
    return (
        <div className="relative min-h-screen bg-gray-900 overflow-hidden">
            <ParticleField />

            {/* Content */}
            <div className="relative z-10 h-screen flex items-center justify-center text-center px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="max-w-3xl"
                >
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ 
                            duration: 0.8,
                            delay: 0.5,
                            type: "spring",
                            stiffness: 100
                        }}
                        className="text-5xl md:text-7xl font-extrabold mb-6 text-white leading-tight"
                    >
                        Welcome, I'm <span className="text-blue-500">Samy</span>
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ 
                            duration: 0.8,
                            delay: 0.7,
                            type: "spring",
                            stiffness: 100
                        }}
                        className="text-lg md:text-2xl text-gray-300 font-light mb-8"
                    >
                        A <span className="text-blue-500">Thinker</span> and
                        <span className="text-blue-500"> Entrepreneur</span> with a passion for creating, exploring, and building.
                    </motion.p>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ 
                            duration: 0.8,
                            delay: 0.9,
                            type: "spring",
                            stiffness: 100
                        }}
                    >
                        <Link
                            to="/projects"
                            className="group relative inline-block bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium px-8 py-3 rounded-full transition-all duration-300 overflow-hidden"
                        >
                            <motion.span
                                className="relative z-10 inline-block"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Explore my work
                            </motion.span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
