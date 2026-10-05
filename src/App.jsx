import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import ScrollToTop from './components/layout/ScrollToTop';
import Hero from './components/layout/Hero';
import TimelineStory from './components/layout/TimelineStory';
import Contact from './components/layout/Contact';
import Writing from './components/layout/Writing';
import Photography from './components/layout/Photography';
import ResumeModal from './components/layout/ResumeModal';

function App() {
    const [resumeOpen, setResumeOpen] = useState(false);
    const openResume = () => setResumeOpen(true);

    return (
        <Router>
            <ScrollToTop />
            <div className="min-h-screen bg-paper text-ink">
                <Navbar onOpenResume={openResume} />
                <Routes>
                    <Route path="/" element={
                        <>
                            <Hero onOpenResume={openResume} />
                            <TimelineStory />
                            <Contact />
                        </>
                    } />
                    <Route path="/photography" element={<Photography />} />
                    <Route path="/writing" element={<Writing />} />

                </Routes>
                <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
            </div>
        </Router>
    );
}

export default App;