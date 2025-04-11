import React, { useRef } from 'react';
import { Canvas} from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment} from '@react-three/drei';

const Model = ({ url }) => {
    const gltf = useGLTF(url);
    const modelRef = useRef();

    return (
        <group ref={modelRef}>
            <primitive object={gltf.scene} dispose={null} scale={1.6} position={[0, 0, 0]} />
        </group>
    );
};

const ModelViewer = ({ modelPath }) => {
    return (
        <div style={{width: '100%' , height: '100%'}}>
            <Canvas shadows dpr={[1, 2]} camera={{ position: [1, 1, 1], fov: 50 }}>
                <color attach="background" args={['#000000']} />
                <Model url={modelPath} />
                <OrbitControls enablePan={false} enableZoom={false} minDistance={10} maxDistance={10} autoRotate autoRotateSpeed={0.9} />
                <Environment preset="forest" dispose={true}/>
            </Canvas>
        </div>
    );
};

export default ModelViewer;