import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PointCircle = () => {
    const points = useRef();
    
    // Generate particles
    const particlesCount = 2000;
    const positions = useMemo(() => {
        const pos = new Float32Array(particlesCount * 3);
        const radius = 15;
        
        for (let i = 0; i < particlesCount; i++) {
            const theta = THREE.MathUtils.randFloatSpread(360);
            const phi = THREE.MathUtils.randFloatSpread(360);
            
            pos[i * 3] = radius * Math.sin(theta) * Math.cos(phi);
            pos[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
            pos[i * 3 + 2] = radius * Math.cos(theta);
        }
        return pos;
    }, []);

    // Animation
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        
        points.current.rotation.x = time * 0.15;
        points.current.rotation.y = time * 0.1;
        
        // Pulse effect
        points.current.scale.x = 1 + Math.sin(time * 0.8) * 0.1;
        points.current.scale.y = 1 + Math.sin(time * 0.8) * 0.1;
        points.current.scale.z = 1 + Math.sin(time * 0.8) * 0.1;
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particlesCount}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#3B82F6"
                sizeAttenuation={true}
                transparent={true}
                opacity={0.8}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

export default PointCircle;