import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import profilePic from '../../assets/images/portfoliopic.png';
import './About.css';

const About = () => {
    const [typedText, setTypedText] = useState("");
    const [isInView, setIsInView] = useState(false);
    const fullText = "About Me. ";
    const typingSpeed = 300; // Speed of typing animation in milliseconds
    const aboutRef = useRef(null); // Reference to the About section

    useEffect(() => {
        // Start animation immediately on mobile devices
        if (window.innerWidth <= 768) {
            setIsInView(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true); // Start typing animation when in view
                }
            },
            { 
                threshold: 0.1, // Lower threshold to trigger earlier
                rootMargin: "0px 0px -10% 0px" // Trigger before element is fully in view
            }
        );

        if (aboutRef.current) {
            observer.observe(aboutRef.current);
        }

        return () => {
            if (aboutRef.current && observer) {
                observer.unobserve(aboutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (isInView) {
            setTypedText(""); // Reset the text before typing starts
            let index = 0;
            const interval = setInterval(() => {
                if (index < fullText.length) {
                    setTypedText(fullText.slice(0, index + 1)); // Use slice to avoid repeated appending
                    index++;
                } else {
                    clearInterval(interval); // Stop interval when typing is complete
                }
            }, typingSpeed);

            return () => clearInterval(interval); // Cleanup interval
        }
    }, [isInView]); // Start animation only when in view

    return (
        <section
            id="about"
            ref={aboutRef} // Attach the ref to this section
            className="relative py-24 bg-transparent"
        >
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-8 px-4 lg:px-8">
                {/* Text Content */}
                <div className="flex-1 lg:pr-8">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 flex items-center">
                        {typedText}
                        <span className="ml-1 w-1 bg-white h-7 animate-blink"></span> {/* Blinking cursor */}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                        i'm a CS & Fintech student at Northeastern University with a passion for innovation and building 👨‍🍳.

                    </p> <br></br><br></br>
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                        currently, i'm working on <a href="https://blaiapp.io/" className="text-blue-500">blai</a>, an AI-powered solution that makes crypto research and investing easy and accessible 🚀🟢.
                    </p> <br></br><br></br>
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                        explore the website to explore some of my other passions outside of work 🌐👁️‍🗨️.
                    </p>
                    <div className="mt-6 about-buttons">
                        <Link to="/projects" className="primary-button">
                            See my work
                        </Link>
                        <a
                        href="/Samy_Fallah_CV.pdf" // Correct file path for download
                        download="SamyFallah_Resume.pdf" // Desired file name for download
                        className="secondary-button"
                    >
                            Download Resume
                        </a>
                    </div>
                </div>

                {/* Image/Icon Content */}
                <div className="flex-1 flex justify-center items-center">
                    <div className="relative group">
                        <div className="rounded-3xl border-8 border-gray-600 group-hover:border-blue-500 transition-all duration-300 shadow-lg p-2">
                            <img
                                src={profilePic}
                                alt="About Me"
                                className="w-full max-w-sm rounded-2xl"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
