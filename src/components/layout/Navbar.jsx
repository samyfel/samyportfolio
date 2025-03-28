import { useState } from 'react';
import { Camera, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/AF.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    const handleLogoClick = () => {
        setIsMenuOpen(false);
        navigate('/');
    };

    return (
        <nav
            className="fixed w-full bg-gray-800/80 backdrop-blur-sm shadow-lg z-50 opacity-75 hover:opacity-100 transition-opacity duration-300">
            <div className="w-full px-6">
                <div className="flex justify-between items-center h-20">
                    <div className="flex-shrink-0 flex items-center">
                        <button 
                            onClick={handleLogoClick}
                            className="focus:outline-none"
                        >
                            <img src={logo} alt="Logo" className="h-12 w-12"/>
                        </button>
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
                        <Link to="/" onClick={handleLinkClick} className="hover:text-blue-500 transition-colors">Home</Link>
                        <Link to="/projects" onClick={handleLinkClick} className="hover:text-blue-500 transition-colors">Projects</Link>
                        <Link to="/photography" onClick={handleLinkClick} className="hover:text-blue-500 transition-colors">Photography</Link>
                        <Link to="/writing" onClick={handleLinkClick} className="hover:text-blue-500 transition-colors">Writing</Link>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link to="/" onClick={handleLinkClick} className="block px-3 py-2 hover:bg-gray-700 rounded-md">Home</Link>
                        <Link to="/projects" onClick={handleLinkClick} className="block px-3 py-2 hover:bg-gray-700 rounded-md">Projects</Link>
                        <Link to="/photography" onClick={handleLinkClick} className="block px-3 py-2 hover:bg-gray-700 rounded-md">Photography</Link>
                        <Link to="/writing" onClick={handleLinkClick} className="block px-3 py-2 hover:bg-gray-700 rounded-md">Writing</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;