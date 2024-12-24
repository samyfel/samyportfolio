import { projects } from '../../data/projects';

const Projects = () => {
    return (
        <section id="projects" className="py-20 bg-transparent">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <div key={index} className="bg-gray-700 rounded-lg p-6 hover:transform hover:scale-105 transition-transform">
                            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                            <p className="text-gray-300 mb-4">{project.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag, tagIndex) => (
                                    <span key={tagIndex} className="bg-blue-500 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;