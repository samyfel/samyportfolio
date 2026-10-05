import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const RESUME_PATH = '/resume.pdf';

const ResumeModal = ({ open, onClose }) => {
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [open, onClose]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-ink/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 340, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-paper w-full max-w-3xl h-[85vh] rounded-md border border-ink/15 shadow-xl flex flex-col overflow-hidden"
                    >
                        <div className="flex items-center justify-between px-4 py-2.5 border-b border-ink/10 font-mono text-xs text-ink-muted shrink-0">
                            <span>
                                <span className="text-signal">$</span> open resume.pdf
                            </span>
                            <div className="flex items-center gap-4">
                                <a
                                    href={RESUME_PATH}
                                    download="Samy_Fallah_Resume.pdf"
                                    className="text-ink hover:text-signal transition-colors"
                                >
                                    download ↓
                                </a>
                                <button onClick={onClose} className="text-ink hover:text-signal transition-colors" aria-label="Close">
                                    close ✕
                                </button>
                            </div>
                        </div>
                        <iframe src={RESUME_PATH} title="Samy Fallah — Resume" className="flex-1 w-full bg-white" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ResumeModal;
