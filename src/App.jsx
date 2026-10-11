import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import ScrollToTop from './components/layout/ScrollToTop';
import PageMeta from './components/layout/PageMeta';
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
                            <PageMeta
                                title="Samy Fallah"
                                description="Samy Fallah — BCG Associate, builder of Blai (AI crypto research & trading), and film photographer. Portfolio, career timeline, and photography."
                                path="/"
                            />
                            <Hero onOpenResume={openResume} />
                            <TimelineStory />
                            <Contact />
                        </>
                    } />
                    <Route path="/photography" element={
                        <>
                            <PageMeta
                                title="Photography — Samy Fallah"
                                description="Film photography by Samy Fallah — 35mm frames shot across Sicily and beyond."
                                path="/photography"
                            />
                            <Photography />
                        </>
                    } />
                    <Route path="/writing" element={
                        <>
                            <PageMeta
                                title="Writing — Samy Fallah"
                                description="Personal writing by Samy Fallah."
                                path="/writing"
                                noindex
                            />
                            <Writing />
                        </>
                    } />

                </Routes>
                <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
            </div>
        </Router>
    );
}

export default App;