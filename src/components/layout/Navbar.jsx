import { useState } from 'react';
import { Camera, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav
            className="fixed w-full bg-gray-800/80 backdrop-blur-sm shadow-lg z-50 opacity-75 hover:opacity-100 transition-opacity duration-300">
            <div className="w-full px-6">
                <div className="flex justify-between items-center h-20">
                    <div className="flex-shrink-0 flex items-center">
                        <img src="public/AF.png" alt="Logo" className="h-12 w-12"/>
                    </div>


                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-md hover:bg-gray-700"
                        >
                            {isMenuOpen ? <X/> : <Menu/>}
                        </button>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <a href="#about" className="hover:text-blue-500 transition-colors">About</a>
                        <a href="#projects" className="hover:text-blue-500 transition-colors">Projects</a>
                        <a href="#contact" className="hover:text-blue-500 transition-colors">Contact</a>
                    </div>
                </div>
            </div>

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
    );
};

export default Navbar;