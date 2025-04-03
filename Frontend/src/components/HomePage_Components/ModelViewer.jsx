import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, SpotLight } from '@react-three/drei';

const Model = ({ url }) => {
    const gltf = useGLTF(url);
    const modelRef = useRef();
    const { clock } = useThree();

    // Rotate model based on mouse position when not being dragged
    useFrame((state) => {
        if (modelRef.current) {
            // Apply gentle rotation and floating animation
            modelRef.current.rotation.y += 0.005;
            modelRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <group ref={modelRef}>
            <primitive
                object={gltf.scene}
                dispose={null}
                scale={1.5}
                position={[0, 0, 0]}
            />
        </group>
    );
};

const ModelViewer = ({ modelPath }) => {
    return (
        <div style={{ width: '100%', height: '100%', background: '#000000' }}>
            <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 50 }}>
                <color attach="background" args={['#000000']} />

                {/* Main model */}
                <Model url={modelPath} />

                {/* Lighting */}
                <SpotLight
                    position={[10, 10, 10]}
                    angle={0.15}
                    penumbra={1}
                    intensity={1}
                    castShadow
                />
                <SpotLight
                    position={[-10, 10, 10]}
                    angle={0.15}
                    penumbra={1}
                    intensity={0.5}
                    castShadow
                />
                <ambientLight intensity={0.4} />

                {/* Controls for dragging and rotating */}
                <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    minDistance={3}
                    maxDistance={20}
                    autoRotate
                    autoRotateSpeed={0.5}
                />

                {/* Environment helps with realistic lighting */}
                <Environment preset="city" />
            </Canvas>
        </div>
    );
};

export default ModelViewer;