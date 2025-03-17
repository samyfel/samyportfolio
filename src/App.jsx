import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Hero from './components/layout/Hero';
import About from './components/layout/About';
import Resume from './components/layout/Resume';
import Contact from './components/layout/Contact';
import Writing from './components/layout/Writing';
import Photography from './components/layout/Photography';
import Projects from './components/layout/Projects';
import CustomCursor from './components/layout/CustomCursor';

function App() {
    return (
        <Router>
            <CustomCursor />
            <div className="min-h-screen bg-gray-900 text-white">
                <Navbar />
                <Routes>
                    <Route path="/" element={
                        <>
                            <Hero />
                            <About />
                            <Resume />
                            <Contact />
                        </>
                    } />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/photography" element={<Photography />} />
                    <Route path="/writing" element={<Writing />} />
                    
                </Routes>
            </div>
        </Router>
    );
}

export default App;