import { useState, useEffect } from 'react';
import './Photography.css'; // Import the CSS file for styles

function Photography() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        // Updated path to match your folder structure
        const imageModules = import.meta.glob('../../assets/photography/*.jpg', { eager: true });
        console.log('Image modules:', imageModules); // Debug log
        const imageUrls = Object.values(imageModules).map(module => module.default);
        console.log('Image URLs:', imageUrls); // Debug log
        setImages(imageUrls);
    }, []);

    return (
        <div className="photography-container container mx-auto px-4 py-16">
            <div style={{ marginTop: '60px' }}> {/* Add margin to create space from the top */}
                <h2 className="text-3xl font-bold mb-8">Photography</h2>
            </div>
            
            {/* Image Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="relative overflow-hidden cursor-pointer"
                        onClick={() => setSelectedImage(index)}
                    >
                        <img
                            src={image}
                            alt={`Gallery image ${index + 1}`}
                            className="photography-image" // Use a specific class for images
                        />
                    </div>
                ))}
            </div>

            {/* Modal for full-size image view */}
            {selectedImage !== null && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
                    onClick={() => setSelectedImage(null)}
                >
                    <button 
                        className="absolute left-4 top-1/2 text-white text-4xl"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(prev => (prev > 0 ? prev - 1 : images.length - 1));
                        }}
                    >
                        ‹
                    </button>
                    <img
                        src={images[selectedImage]}
                        alt={`Full size ${selectedImage + 1}`}
                        className="max-h-[90vh] max-w-[90vw] object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button 
                        className="absolute right-4 top-1/2 text-white text-4xl"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(prev => (prev < images.length - 1 ? prev + 1 : 0));
                        }}
                    >
                        ›
                    </button>
                </div>
            )}
        </div>
    );
}

export default Photography; 