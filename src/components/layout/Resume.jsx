import React from "react";

const Resume = () => {
    return (
        <section id="resume" className="py-24 bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-center">My Resume</h2>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 text-center">
                    Here’s a detailed look at my skills, experience, and achievements. Feel free to browse through it.
                </p>

                {/* Resume Image Section */}
                <div className="bg-gray-800 rounded-lg border-4 border-gray-600 hover:border-blue-500 transition-all duration-300 shadow-lg mb-8">
                    <div className="relative group">
                        <img
                            src="Resume.png"  // Replace with the correct image path
                            alt="Samy Fallah Resume"
                            className="w-full h-auto rounded-lg object-contain"  // This ensures the image fits nicely
                        />
                    </div>
                </div>

                {/* Download Button */}
                <div className="text-center mt-6">
                    <a
                        href="/Samy_Fallah_CV.pdf" // Correct file path for download
                        download="SamyFallah_Resume.pdf" // Desired file name for download
                        className="inline-block bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium px-6 py-3 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
                    >
                        Download My Resume
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Resume;
