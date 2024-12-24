import React, { useState, useEffect, useRef } from "react";

const About = () => {
    const [typedText, setTypedText] = useState("");
    const [isInView, setIsInView] = useState(false);
    const fullText = "About Me. ";
    const typingSpeed = 300; // Speed of typing animation in milliseconds
    const aboutRef = useRef(null); // Reference to the About section

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true); // Start typing animation when in view
                }
            },
            { threshold: 0.5 } // Trigger when 50% of the section is in view
        );

        if (aboutRef.current) {
            observer.observe(aboutRef.current);
        }

        return () => {
            if (aboutRef.current) {
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
                        I'm a passionate <span className="text-blue-500">developer</span> and
                        <span className="text-blue-500"> entrepreneur</span> with a focus on crafting
                        innovative solutions to solve real-world problems. With a deep
                        interest in technology and design, I bring ideas to life through
                        cutting-edge tools and creativity. Whether building intuitive user
                        experiences or developing efficient back-end systems, my goal is to
                        push the boundaries of what's possible.
                    </p>
                    <div className="mt-6">
                        <a
                            href="#projects"
                            className="inline-block bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium px-6 py-3 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
                        >
                            See My Work
                        </a>
                    </div>
                </div>

                {/* Image/Icon Content */}
                <div className="flex-1 flex justify-center items-center">
                    <div className="relative group">
                        <div className="rounded-3xl border-8 border-gray-600 group-hover:border-blue-500 transition-all duration-300 shadow-lg p-2">
                            <img
                                src="public/portfoliopic.png" // Replace with your image path
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
