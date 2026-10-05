import { useMemo, useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { EXPERIENCE, EDUCATION, withIntensity } from '../../data/timeline';

const MILESTONES = [...withIntensity(EXPERIENCE)].reverse().concat(EDUCATION);

const MilestoneCard = ({ milestone, index }) => {
    const [entered, setEntered] = useState(false);
    const side = index % 2 === 0 ? 'left' : 'right';
    const isEducation = milestone === EDUCATION;
    const dotColor = isEducation
        ? 'rgba(21, 23, 28, 0.35)'
        : `rgba(184, 117, 46, ${milestone.intensity})`;

    return (
        <div className="relative py-7">
            <motion.span
                initial={{ scale: 0.6, backgroundColor: 'rgba(21, 23, 28, 0.12)' }}
                animate={entered ? { scale: 1, backgroundColor: dotColor } : {}}
                transition={{ duration: 0.3 }}
                className="absolute left-6 sm:left-1/2 top-2 w-3 h-3 -translate-x-1/2 rounded-full border-2 border-paper z-10"
            />

            <motion.div
                initial={{ opacity: 0, x: side === 'left' ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                onViewportEnter={() => setEntered(true)}
                transition={{ duration: 0.5 }}
                className={`pl-14 sm:pl-0 sm:w-[calc(50%-2rem)] ${
                    side === 'left' ? 'sm:mr-auto sm:text-right' : 'sm:ml-auto sm:text-left'
                }`}
            >
                <div className="font-mono text-xs text-ink-muted/60 mb-1">{milestone.period}</div>
                <div className="font-serif text-2xl text-ink mb-1">{milestone.org}</div>
                <div className="font-mono text-xs text-ink-muted mb-2">{milestone.title}</div>
                {milestone.blurb && (
                    <p className={`text-sm text-ink-muted max-w-sm ${side === 'left' ? 'sm:ml-auto' : ''}`}>
                        {milestone.blurb}
                    </p>
                )}
                {milestone.href && (
                    <a
                        href={milestone.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block mt-2 font-mono text-xs text-signal hover:underline"
                    >
                        visit {milestone.href.replace('https://', '')} ↗
                    </a>
                )}
            </motion.div>
        </div>
    );
};

const TimelineStory = () => {
    const containerRef = useRef(null);
    const [activeIdx, setActiveIdx] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start center', 'end center'],
    });

    useMotionValueEvent(scrollYProgress, 'change', (v) => {
        const idx = Math.min(MILESTONES.length - 1, Math.max(0, Math.floor(v * MILESTONES.length)));
        setActiveIdx(idx);
    });

    const active = MILESTONES[activeIdx];

    return (
        <section className="bg-paper px-6 sm:px-10 pt-12 pb-24">
            <div className="max-w-3xl mx-auto mb-16">
                <h2 className="font-serif text-3xl sm:text-4xl text-ink mb-2">The long version</h2>
                <p className="font-mono text-xs text-ink-muted/60"># same timeline, scroll to read it</p>
            </div>

            <div ref={containerRef} className="max-w-3xl mx-auto flex gap-8">
                <div className="hidden md:block w-20 shrink-0">
                    <div className="sticky top-28">
                        <div className="font-mono text-xs text-ink-muted/50 mb-1">now viewing</div>
                        <div className="font-serif text-2xl text-signal">{active.period.split('–')[0].trim()}</div>
                        <div className="font-mono text-xs text-ink-muted mt-1">{active.org}</div>
                    </div>
                </div>

                <div className="relative flex-1">
                    <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-ink/10 -translate-x-1/2" />
                    <motion.div
                        style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
                        className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-signal -translate-x-1/2"
                    />

                    {MILESTONES.map((m, i) => (
                        <MilestoneCard key={m.org} milestone={m} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TimelineStory;
