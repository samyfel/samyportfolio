import { useEffect } from 'react';
import './Animation.css';

const Animation = ({ onComplete }) => {
    useEffect(() => {
        generateChaos();

        const timer = setTimeout(() => {
            if (onComplete) onComplete();
        }, 4000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    const generateChaos = () => {
        const container = document.getElementById('chaosContainer');
        if (!container) return;
        
        // Clear any existing content
        container.innerHTML = '';
        
        const fragmentCount = 200;
        const binaryStreamCount = 50;

        // Data fragments
        for (let i = 0; i < fragmentCount; i++) {
            const fragment = document.createElement('div');
            fragment.classList.add('data-fragment');
            
            // Random content generation
            const contentTypes = [
                () => `0x${Math.random().toString(16).slice(2, 8)}`,
                () => `[${Math.random().toString(2).slice(2, 10)}]`,
                () => `<${['script', 'div', 'span', 'data'][Math.floor(Math.random() * 4)]}/>`,
                () => `ERROR_${Math.floor(Math.random() * 1000)}`,
                () => `${['NET', 'CORE', 'PROTO', 'TRANS'][Math.floor(Math.random() * 4)]}_${Math.random().toString(36).slice(2, 7)}`
            ];

            fragment.textContent = contentTypes[Math.floor(Math.random() * contentTypes.length)]();
            
            // Random positioning
            fragment.style.top = `${Math.random() * 100}%`;
            fragment.style.left = `${Math.random() * 100}%`;
            fragment.style.fontSize = `${Math.random() * 20 + 8}px`;
            
            container.appendChild(fragment);
        }

        // Binary streams
        for (let i = 0; i < binaryStreamCount; i++) {
            const stream = document.createElement('div');
            stream.classList.add('binary-stream');
            
            // Generate long binary string
            stream.textContent = Array(50).fill().map(() => Math.random() > 0.5 ? '0' : '1').join('');
            
            stream.style.left = `${Math.random() * 100}%`;
            stream.style.animationDelay = `-${Math.random() * 3}s`;
            
            container.appendChild(stream);
        }
    };

    return (
        <div className="animation-wrapper">
            <div className="chaos-container" id="chaosContainer"></div>
            <div className="system-message">SYSTEM BREACH</div>
        </div>
    );
};

export default Animation; 