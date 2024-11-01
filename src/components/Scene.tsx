import React from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useModelViewer } from '../context/ModelViewerContext';

interface SceneProps {
  modelFile: File;
}

const Scene: React.FC<SceneProps> = ({ modelFile }) => {
  const { directionalLight, ambientLight } = useModelViewer();
  const modelUrl = modelFile ? URL.createObjectURL(modelFile) : null;
  const gltf = modelUrl ? useLoader(GLTFLoader, modelUrl) : null;

  React.useEffect(() => {
    return () => {
      if (modelUrl) {
        URL.revokeObjectURL(modelUrl);
      }
    };
  }, [modelUrl]);

  return (
    <>
      <directionalLight
        position={directionalLight.position}
        intensity={directionalLight.intensity}
        color={directionalLight.color}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <ambientLight intensity={ambientLight.intensity} color={ambientLight.color} />
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.4} />
      </mesh>
      {gltf && <primitive object={gltf.scene} />}
    </>
  );
};

export default Scene;