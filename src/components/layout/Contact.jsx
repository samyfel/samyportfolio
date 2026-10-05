import { Mail, Github, Linkedin } from 'lucide-react';

const XIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
);

const LINKS = [
    { href: 'mailto:samyfel2003@gmail.com', label: 'email', Icon: Mail },
    { href: 'https://github.com/samyfel', label: 'github', Icon: Github },
    { href: 'https://www.linkedin.com/in/samyfallah/', label: 'linkedin', Icon: Linkedin },
    { href: 'https://x.com/samyfel03', label: 'x', Icon: XIcon },
];

const Contact = () => {
    return (
        <section id="contact" className="bg-paper px-6 sm:px-10 py-24">
            <div className="max-w-5xl mx-auto text-center">
                <p className="font-mono text-xs text-ink-muted/60 mb-8"># reach out</p>
                <div className="flex justify-center items-center gap-8">
                    {LINKS.map(({ href, label, Icon }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={label}
                            className="text-ink-muted hover:text-signal transition-colors"
                        >
                            <Icon className="h-6 w-6" />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Contact;