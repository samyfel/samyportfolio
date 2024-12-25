import Navbar from './components/layout/Navbar';
import Hero from './components/layout/Hero';
import About from './components/layout/About';
import Resume from './components/layout/Resume'; // Import Resume Section
import Projects from './components/layout/Projects';
import Contact from './components/layout/Contact';

function App() {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />
            <Hero />
            <About />
            <Resume />
            <Projects />
            <Contact />
        </div>
    );
}

export default App;