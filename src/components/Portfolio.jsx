import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { Camera, Mail, Github, Linkedin, Menu, X } from 'lucide-react';

// Point component
const Point = ({ position, color }) => {
    return (
        <Sphere position={position} args={[0.1, 10, 10]}>
            <meshStandardMaterial
                emissive={color}
                emissiveIntensity={0.5}
                roughness={0.5}
                color={color}
            />
        </Sphere>
    );
};

// PointCircle component
const PointCircle = () => {
    const ref = useRef(null);
    useFrame(({ clock }) => {
        if (ref.current?.rotation) {
            ref.current.rotation.z = clock.getElapsedTime() * 0.05;
        }
    });

    // Utils constants and functions
    const MIN_RADIUS = 7.5;
    const MAX_RADIUS = 15;
    const DEPTH = 2;
    const LEFT_COLOR = "6366f1";
    const RIGHT_COLOR = "8b5cf6";
    const NUM_POINTS = 2500;

    const getGradientStop = (ratio) => {
        ratio = ratio > 1 ? 1 : ratio < 0 ? 0 : ratio;
        const c0 = LEFT_COLOR.match(/.{1,2}/g).map(
            (oct) => parseInt(oct, 16) * (1 - ratio)
        );
        const c1 = RIGHT_COLOR.match(/.{1,2}/g).map(
            (oct) => parseInt(oct, 16) * ratio
        );
        const ci = [0, 1, 2].map((i) => Math.min(Math.round(c0[i] + c1[i]), 255));
        const color = ci
            .reduce((a, v) => (a << 8) + v, 0)
            .toString(16)
            .padStart(6, "0");
        return `#${color}`;
    };

    const calculateColor = (x) => {
        const maxDiff = MAX_RADIUS * 2;
        const distance = x + MAX_RADIUS;
        const ratio = distance / maxDiff;
        return getGradientStop(ratio);
    };

    const randomFromInterval = (min, max) => {
        return Math.random() * (max - min) + min;
    };

    const pointsInner = Array.from(
        { length: NUM_POINTS },
        (v, k) => k + 1
    ).map((num) => {
        const randomRadius = randomFromInterval(MIN_RADIUS, MAX_RADIUS);
        const randomAngle = Math.random() * Math.PI * 2;
        const x = Math.cos(randomAngle) * randomRadius;
        const y = Math.sin(randomAngle) * randomRadius;
        const z = randomFromInterval(-DEPTH, DEPTH);
        const color = calculateColor(x);
        return {
            idx: num,
            position: [x, y, z],
            color,
        };
    });

    const pointsOuter = Array.from(
        { length: NUM_POINTS / 4 },
        (v, k) => k + 1
    ).map((num) => {
        const randomRadius = randomFromInterval(MIN_RADIUS / 2, MAX_RADIUS * 2);
        const angle = Math.random() * Math.PI * 2;
        const x = Math.cos(angle) * randomRadius;
        const y = Math.sin(angle) * randomRadius;
        const z = randomFromInterval(-DEPTH * 10, DEPTH * 10);
        const color = calculateColor(x);
        return {
            idx: num,
            position: [x, y, z],
            color,
        };
    });

    return (
        <group ref={ref}>
            {pointsInner.map((point) => (
                <Point key={point.idx} position={point.position} color={point.color} />
            ))}
            {pointsOuter.map((point) => (
                <Point key={point.idx} position={point.position} color={point.color} />
            ))}
        </group>
    );
};

const Portfolio = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const projects = [
        {
            title: "Project 1",
            description: "A brief description of your first project",
            tags: ["React", "Three.js", "Tailwind"]
        },
        {
            title: "Project 2",
            description: "A brief description of your second project",
            tags: ["React", "Node.js", "MongoDB"]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Navigation */}
            <nav className="fixed w-full bg-gray-800/80 backdrop-blur-sm shadow-lg z-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex-shrink-0 flex items-center">
                            <Camera className="h-8 w-8 text-blue-500" />
                            <span className="ml-2 text-xl font-bold">Your Name</span>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 rounded-md hover:bg-gray-700"
                            >
                                {isMenuOpen ? <X /> : <Menu />}
                            </button>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-4">
                            <a href="#about" className="hover:text-blue-500 transition-colors">About</a>
                            <a href="#projects" className="hover:text-blue-500 transition-colors">Projects</a>
                            <a href="#contact" className="hover:text-blue-500 transition-colors">Contact</a>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <a href="#about" className="block px-3 py-2 hover:bg-gray-700 rounded-md">About</a>
                            <a href="#projects" className="block px-3 py-2 hover:bg-gray-700 rounded-md">Projects</a>
                            <a href="#contact" className="block px-3 py-2 hover:bg-gray-700 rounded-md">Contact</a>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section with ParticleRing */}
            <div className="relative h-screen">
                <Canvas
                    camera={{
                        position: [10, -7.5, -5],
                    }}
                    className="bg-gray-900"
                >
                    <OrbitControls maxDistance={20} minDistance={10} />
                    <directionalLight />
                    <pointLight position={[-30, 0, -30]} power={10.0} />
                    <PointCircle />
                </Canvas>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <h1 className="text-6xl font-bold mb-4 text-white pointer-events-none">Your Name</h1>
                    <p className="text-xl text-gray-300 pointer-events-none">Full Stack Developer & 3D Artist</p>
                </div>
            </div>

            {/* Projects Section */}
            <section id="projects" className="py-20 bg-gray-800">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {projects.map((project, index) => (
                            <div key={index} className="bg-gray-700 rounded-lg p-6 hover:transform hover:scale-105 transition-transform">
                                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                                <p className="text-gray-300 mb-4">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, tagIndex) => (
                                        <span key={tagIndex} className="bg-blue-500 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-12 text-center">Get In Touch</h2>
                    <div className="flex justify-center space-x-6">
                        <a href="mailto:your@email.com" className="hover:text-blue-500 transition-colors">
                            <Mail className="h-8 w-8" />
                        </a>
                        <a href="https://github.com/yourusername" className="hover:text-blue-500 transition-colors">
                            <Github className="h-8 w-8" />
                        </a>
                        <a href="https://linkedin.com/in/yourusername" className="hover:text-blue-500 transition-colors">
                            <Linkedin className="h-8 w-8" />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Portfolio;