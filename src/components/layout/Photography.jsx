import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { PHOTOS } from '../../data/photos';
import MorphGallery from './MorphGallery';

const images = import.meta.glob('../../assets/photography/*.jpg', { eager: true });

const frameLabel = (file) => {
    const m = file.match(/R(\d+)-([A-Za-z]?\d+)/);
    return m ? `R${m[1]} · ${m[2]}` : null;
};

const PhotoCard = ({ photo }) => {
    const [flipped, setFlipped] = useState(false);
    const src = images[`../../assets/photography/${photo.file}`]?.default;
    const label = frameLabel(photo.file);

    return (
        <div style={{ perspective: 1200 }} className="aspect-[4/3]">
            <motion.div
                className="relative w-full h-full"
                whileHover={{ rotateY: flipped ? 0 : -10, scale: flipped ? 1 : 1.02 }}
                transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            >
                <motion.div
                    className="relative w-full h-full cursor-pointer"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{ rotateY: flipped ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                    onClick={() => setFlipped((f) => !f)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Photo${label ? `, frame ${label}` : ''}. Click to flip for details.`}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setFlipped((f) => !f)}
                >
                    <div
                        className="absolute inset-0 rounded-sm overflow-hidden border border-ink/10 shadow-sm"
                        style={{ backfaceVisibility: 'hidden' }}
                    >
                        <img src={src} alt="" className="w-full h-full object-cover" draggable={false} />
                        {label && (
                            <span className="absolute bottom-1.5 right-2 font-mono text-[10px] text-paper bg-ink/50 px-1.5 py-0.5 rounded-sm backdrop-blur-sm">
                                {label}
                            </span>
                        )}
                    </div>

                    <div
                        className="absolute inset-0 rounded-sm border border-ink/15 bg-paper shadow-sm p-4 flex flex-col"
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                        <div className="font-mono text-[10px] text-ink-muted/50">{label ?? '—'}</div>
                        <div className="mt-auto space-y-2.5">
                            <div>
                                <div className="font-mono text-[10px] text-ink-muted/60">location</div>
                                <div className="text-sm text-ink">{photo.location}</div>
                            </div>
                            <div>
                                <div className="font-mono text-[10px] text-ink-muted/60">camera</div>
                                <div className="text-sm text-ink">{photo.camera}</div>
                            </div>
                            <div>
                                <div className="font-mono text-[10px] text-ink-muted/60">note</div>
                                <div className="font-serif italic text-sm text-ink-muted leading-snug">
                                    {photo.note}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

const Photography = () => {
    const morphPhotos = useMemo(() => [...PHOTOS.slice(0, 3), ...PHOTOS.slice(-2)], []);
    const gridPhotos = useMemo(() => PHOTOS.slice(3, -2), []);

    const morphItems = useMemo(
        () =>
            morphPhotos.map((photo) => ({
                src: images[`../../assets/photography/${photo.file}`]?.default,
                alt: frameLabel(photo.file) ? `Frame ${frameLabel(photo.file)}` : 'Photograph',
            })),
        [morphPhotos],
    );

    return (
        <section className="bg-paper pt-32 pb-24">
            <div className="max-w-5xl mx-auto px-6 sm:px-10">
                <h1 className="font-serif text-4xl sm:text-5xl text-ink mb-2">Photography</h1>
                <p className="font-mono text-xs text-ink-muted/60 mb-12">
                    # film, mostly — dissolving between frames, drag or use the arrows
                </p>
            </div>

            <div className="relative w-screen left-1/2 -translate-x-1/2">
                <MorphGallery items={morphItems} height="70vh" autoplay={6000} />
            </div>

            <div className="max-w-5xl mx-auto px-6 sm:px-10 mt-16">
                <p className="font-mono text-xs text-ink-muted/60 mb-8">
                    # {gridPhotos.length} more frames from the roll — click one to flip it
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gridPhotos.map((photo) => (
                        <PhotoCard key={photo.file} photo={photo} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Photography;
