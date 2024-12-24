import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import PointCircle from "./PointCircle";

const ParticleRing = () => {
    return (
        <div className="h-full w-full">
            <Canvas
                camera={{
                    position: [20, -15, -15], // Move the camera further back for a zoomed-out view
                }}
                className="bg-gray-900"
            >
                {/* Disable zoom and pan */}
                <OrbitControls enableZoom={false} enablePan={false} />
                <directionalLight />
                <pointLight position={[-30, 0, -30]} power={10.0} />
                <PointCircle />
            </Canvas>
        </div>
    );
};

export default ParticleRing;
