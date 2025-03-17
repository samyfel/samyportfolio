import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseEnter = () => {
            setIsHovering(true);
        };

        const handleMouseLeave = () => {
            setIsHovering(false);
        };

        window.addEventListener('mousemove', updateMousePosition);
        document.querySelectorAll('a, button, [role="button"]').forEach(element => {
            element.addEventListener('mouseenter', handleMouseEnter);
            element.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            document.querySelectorAll('a, button, [role="button"]').forEach(element => {
                element.removeEventListener('mouseenter', handleMouseEnter);
                element.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <>
            <motion.div
                className="cursor-dot"
                animate={{
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                    scale: isHovering ? 1.5 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5
                }}
            />
            <motion.div
                className="cursor-ring"
                animate={{
                    x: mousePosition.x - 16,
                    y: mousePosition.y - 16,
                    scale: isHovering ? 1.5 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 250,
                    damping: 20,
                    mass: 0.5
                }}
            />
            <style jsx global>{`
                body {
                    cursor: none;
                }
                a, button, [role="button"] {
                    cursor: none !important;
                }
                .cursor-dot {
                    position: fixed;
                    z-index: 9999;
                    pointer-events: none;
                    width: 8px;
                    height: 8px;
                    background-color: #3B82F6;
                    border-radius: 50%;
                }
                .cursor-ring {
                    position: fixed;
                    z-index: 9998;
                    pointer-events: none;
                    width: 32px;
                    height: 32px;
                    border: 2px solid #3B82F6;
                    border-radius: 50%;
                    opacity: 0.5;
                }
            `}</style>
        </>
    );
};

export default CustomCursor; 