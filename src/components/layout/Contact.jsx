import { Mail, Github, Linkedin } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-20">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-4xl font-bold mb-12 text-center">Get In Touch</h2>
                <div className="flex justify-center space-x-6">
                    <a href="mailto:samyfel2003@gmail.com" className="hover:text-blue-500 transition-colors">
                        <Mail className="h-8 w-8" />
                    </a>
                    <a href="https://github.com/samyfel" className="hover:text-blue-500 transition-colors">
                        <Github className="h-8 w-8" />
                    </a>
                    <a href="https://www.linkedin.com/in/samyfallah/" className="hover:text-blue-500 transition-colors">
                        <Linkedin className="h-8 w-8" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Contact;