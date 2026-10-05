import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE, EDUCATION } from '../../data/timeline';
import AsciiLogo from './AsciiLogo';

const COMMAND_1 = 'develop ./af.png';
const COMMAND_2 = 'whoami --history';

const QUICK_LIST = [...EXPERIENCE].reverse().concat(EDUCATION);

const useTypedLine = (command, start) => {
    const [typed, setTyped] = useState('');
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (!start) return;
        const startDelay = setTimeout(() => {
            let i = 0;
            const interval = setInterval(() => {
                i += 1;
                setTyped(command.slice(0, i));
                if (i >= command.length) {
                    clearInterval(interval);
                    setTimeout(() => setDone(true), 200);
                }
            }, 38);
        }, 400);
        return () => clearTimeout(startDelay);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [start]);

    return [typed, done];
};

const TypedLine = ({ typed, done, action }) => (
    <div className="flex items-baseline justify-between gap-3 font-mono text-sm text-ink-muted mb-6">
        <div>
            <span className="text-signal">{'>'}</span> {typed}
            {!done && <span className="inline-block w-[7px] h-[1em] bg-signal animate-caret ml-px align-middle" />}
        </div>
        {done && action}
    </div>
);

const Hero = ({ onOpenResume }) => {
    const [start, setStart] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setStart(true), 300);
        return () => clearTimeout(t);
    }, []);

    const [typed1, done1] = useTypedLine(COMMAND_1, start);
    const [typed2, done2] = useTypedLine(COMMAND_2, done1);

    return (
        <section className="bg-paper pt-32 pb-16 px-6 sm:px-10">
            <div className="max-w-3xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="font-serif text-5xl sm:text-6xl text-ink mb-10"
                >
                    Samy Fallah
                </motion.h1>

                <div className="flex flex-col sm:flex-row gap-8 sm:gap-10">
                    <div className="sm:w-1/2 shrink-0">
                        <TypedLine typed={typed1} done={done1} />

                        {done1 && (
                            <>
                                <AsciiLogo />
                                <p className="font-mono text-[11px] text-ink-muted/60 mt-3 max-w-xs">
                                    AF — <span className="italic">Amor Fati</span>, love of fate. Everything happens
                                    for a reason: love the experience, stay excited for what's next.
                                </p>
                            </>
                        )}
                    </div>

                    <div className="flex-1 min-w-0">
                        <TypedLine
                            typed={typed2}
                            done={done2}
                            action={
                                <button
                                    onClick={onOpenResume}
                                    className="font-mono text-xs text-signal hover:underline shrink-0"
                                >
                                    resume ↗
                                </button>
                            }
                        />

                        {done2 && (
                            <div className="flex flex-col divide-y divide-ink/10 border-t border-ink/10">
                                {QUICK_LIST.map((entry) => (
                                    <div key={entry.org} className="flex flex-col gap-0.5 py-2.5">
                                        <span className="font-mono text-xs text-ink-muted/70">{entry.period}</span>
                                        <span className="text-ink">{entry.org}</span>
                                        <span className="text-ink-muted text-sm">{entry.title}</span>
                                        {entry.href && (
                                            <a
                                                href={entry.href}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="font-mono text-xs text-signal hover:underline"
                                            >
                                                {entry.href.replace('https://', '')} ↗
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
