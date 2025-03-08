import React from 'react';
import './Projects.css';
import { FaGithub, FaExternalLinkAlt, FaAward } from 'react-icons/fa';

const Projects = () => {
    const projects = [
        {
            title: "Blai - AI-Powered Crypto Research Platform",
            description: "Working with a team of Northeastern students to develop 'one-click crypto' - a swarm of AI agents that conducts comprehensive crypto research and analysis both on and off-chain. Blai significantly reduces the barrier to entry for crypto-curious individuals by automating complex research processes and providing actionable insights.",
            technologies: ["React", "Node.js", "ElizaOS Framework", "AI/ML", "Blockchain"],
            link: "https://blaiapp.io",
            image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2832&auto=format&fit=crop",
            featured: true,
            category: "Development"
        },
        {
            title: "McKinsey & Company - Procurement Transformation",
            description: "Led the development of a comprehensive spend categorization framework for a national utility company, enhancing organizational spend efficiency by 65%. Analyzed and classified over $25 billion in expenditure data using Spendscape, delivering key procurement strategies across 10+ industries.",
            technologies: ["Data Analysis", "Spendscape", "Procurement Strategy", "Client Management"],
            image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2671&auto=format&fit=crop",
            featured: true,
            category: "Consulting"
        },
        {
            title: "BCG - Energy Sector Transformation",
            description: "As a Summer Associate Consultant, worked on multiple high-impact cases with a major energy company. Reduced customer support wait times through the development and rollout of an AI-RAG chatbot. Created a wildfire risk model to better calculate associated costs with wildfire disasters.",
            technologies: ["AI/ML", "RAG Systems", "Risk Modeling", "Organizational Design"],
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop",
            featured: true,
            category: "Consulting"
        },
        {
            title: "DripDropLearning - iOS Educational App",
            description: "Developed an iOS application for a Mobile Development course using Swift. The app serves as an educational platform for parents and babysitters to discover and share engaging activities for children. Features include activity sharing, progress tracking, and a community-driven content library.",
            technologies: ["Swift", "iOS Development", "UI/UX Design", "Firebase"],
            image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=2670&auto=format&fit=crop",
            github: "https://github.com/kaylatrinh/DripDropLearning",
            category: "Development"
        },
        {
            title: "Samyfel.com - Personal Portfolio",
            description: "Designed and developed a personal portfolio website using React to showcase photography, writing, and professional projects. Implemented modern web design principles, responsive layouts, and interactive elements to create an engaging user experience.",
            technologies: ["React", "JavaScript", "CSS", "Responsive Design"],
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2670&auto=format&fit=crop",
            link: "https://samyfel.com",
            category: "Development"
        },
        {
            title: "Bain & Company - AI Knowledge Management",
            description: "Co-created a pilot knowledge management chatbot with key product owners, improving information retrieval and enhancing operational efficiency. Created a company-wide training video on LLM prompting viewed by 1500+ employees, demonstrating expertise in leveraging AI models for data analysis.",
            technologies: ["OpenAI", "Prompt Engineering", "Knowledge Management", "LLMs"],
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
            category: "Consulting"
        },
        {
            title: "Fells View Capital - Investment Analysis",
            description: "Researched SaaS & supply chain sectors, contributing weekly industry theses to identify niche investments within $3M-$10M revenue range. Managed outreach campaigns achieving 22% response rates and performed due diligence on potential acquisitions by analyzing CIMs and financial documents.",
            technologies: ["Financial Analysis", "Due Diligence", "Market Research", "HubSpot"],
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
            category: "Finance"
        }
    ];

    const [filter, setFilter] = React.useState('All');
    const categories = ['All', 'Development', 'Consulting', 'Finance'];

    const filteredProjects = filter === 'All' 
        ? projects 
        : projects.filter(project => project.category === filter);

    return (
        <div className="projects-container">
            <div className="projects-header">
                <h1>Projects</h1>
                <p>A collection of my professional work and personal projects</p>
                
                <div className="filter-buttons">
                    {categories.map(category => (
                        <button 
                            key={category}
                            className={`filter-button ${filter === category ? 'active' : ''}`}
                            onClick={() => setFilter(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="projects-grid">
                {filteredProjects.map((project, index) => (
                    <div className="project-card" key={index}>
                        <div className="project-image" style={{backgroundImage: `url(${project.image})`}}>
                            {project.featured && (
                                <div className="featured-badge">
                                    <FaAward /> Featured
                                </div>
                            )}
                        </div>
                        <div className="project-content">
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <div className="tech-stack">
                                {project.technologies.map((tech, i) => (
                                    <span key={i} className="tech-tag">{tech}</span>
                                ))}
                            </div>
                            <div className="project-links">
                                {project.github && (
                                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                                        <FaGithub /> Code
                                    </a>
                                )}
                                {project.link && (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                                        <FaExternalLinkAlt /> Visit
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;