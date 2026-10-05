import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CHIPS = ['home', 'photos', 'resume', 'writing'];

const ROUTES = {
    whoami: '/',
    home: '/',
    photos: '/photography',
    photography: '/photography',
    writing: '/writing',
};

const SCROLL_TARGETS = {
    contact: 'contact',
};

const Navbar = ({ onOpenResume }) => {
    const [value, setValue] = useState('');
    const [status, setStatus] = useState(null); // { kind: 'error' | 'ok', text }
    const [focused, setFocused] = useState(false);
    const inputRef = useRef(null);
    const statusTimeout = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => () => clearTimeout(statusTimeout.current), []);

    const flashStatus = (kind, text, ms = 1400) => {
        clearTimeout(statusTimeout.current);
        setStatus({ kind, text });
        statusTimeout.current = setTimeout(() => setStatus(null), ms);
    };

    const goToSection = (id) => {
        if (location.pathname !== '/') {
            navigate('/');
            requestAnimationFrame(() => {
                setTimeout(() => {
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                }, 50);
            });
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const runCommand = (raw) => {
        const cmd = raw.trim().toLowerCase();
        if (!cmd) return;

        if (cmd === 'resume') {
            onOpenResume?.();
            flashStatus('ok', '→ opening resume.pdf');
        } else if (cmd in ROUTES) {
            if (ROUTES[cmd] === '/' && location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                navigate(ROUTES[cmd]);
            }
            flashStatus('ok', `→ ${ROUTES[cmd]}`);
        } else if (cmd in SCROLL_TARGETS) {
            goToSection(SCROLL_TARGETS[cmd]);
            flashStatus('ok', `→ #${SCROLL_TARGETS[cmd]}`);
        } else if (cmd === 'clear') {
            // no-op easter egg, terminal-authentic
        } else {
            flashStatus('error', `command not found: ${cmd}`);
        }
        setValue('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') runCommand(value);
    };

    const handleChipClick = (chip) => {
        setValue(chip);
        setTimeout(() => runCommand(chip), 220);
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-paper/90 backdrop-blur-sm border-b border-ink/10">
            <div
                className="max-w-5xl mx-auto px-4 sm:px-6 min-h-12 py-3 sm:py-0 flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-sm cursor-text"
                onClick={() => inputRef.current?.focus()}
            >
                <span className="text-ink-muted select-none shrink-0">samy@fallah ~ %</span>

                <span className="relative flex items-center min-w-[1ch]">
                    <span className="whitespace-pre text-ink">{value}</span>
                    <span
                        className={`ml-px w-[7px] h-[1.1em] bg-signal ${focused ? 'animate-caret' : 'opacity-40'}`}
                    />
                    <input
                        ref={inputRef}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        spellCheck={false}
                        autoComplete="off"
                        aria-label="site command input"
                        className="absolute inset-0 w-full opacity-0 cursor-text"
                    />
                </span>

                {status ? (
                    <span className={status.kind === 'error' ? 'text-signal' : 'text-ink-muted'}>
                        {status.text}
                    </span>
                ) : (
                    <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1 ml-auto">
                        {CHIPS.map((chip) => (
                            <button
                                key={chip}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleChipClick(chip);
                                }}
                                className="text-ink-muted hover:text-signal transition-colors"
                            >
                                {chip}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
