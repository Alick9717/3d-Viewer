import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, SSAO, SMAA, DepthOfField, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Upload } from 'lucide-react';
import Scene from './components/Scene';
import Controls from './components/Controls';
import { ModelViewerProvider } from './context/ModelViewerContext';

function App() {
  const [model, setModel] = useState<File | null>(null);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith('.gltf') || file.name.endsWith('.glb'))) {
      setModel(file);
    }
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.name.endsWith('.gltf') || file.name.endsWith('.glb'))) {
      setModel(file);
    }
  };

  return (
    <ModelViewerProvider>
      <div className="w-full h-screen flex">
        {!model ? (
          <div 
            className="w-full h-full flex items-center justify-center bg-gray-900"
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="p-12 border-2 border-dashed border-gray-500 rounded-lg text-center">
              <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-xl text-gray-300 mb-4">
                Drag and drop your 3D model here
              </p>
              <p className="text-sm text-gray-400 mb-4">
                Supported formats: .gltf, .glb
              </p>
              <label className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
                Browse Files
                <input
                  type="file"
                  accept=".gltf,.glb"
                  className="hidden"
                  onChange={onFileSelect}
                />
              </label>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 relative">
              <Canvas
                camera={{ position: [0, 2, 5], fov: 75 }}
                gl={{ 
                  physicallyCorrectLights: true,
                  toneMapping: 3, // ACESFilmicToneMapping
                  outputColorSpace: 'srgb'
                }}
                shadows
              >
                <Suspense fallback={null}>
                  <Scene modelFile={model} />
                  <Environment preset="sunset" />
                  <EffectComposer multisampling={8}>
                    <SMAA />
                    <Bloom 
                      intensity={1.0}
                      luminanceThreshold={0.9}
                      luminanceSmoothing={0.025}
                    />
                    <SSAO 
                      blendFunction={BlendFunction.MULTIPLY}
                      samples={31}
                      radius={0.1}
                      intensity={20}
                      rings={4}
                      distanceThreshold={1}
                      distanceFalloff={0.1}
                      rangeThreshold={0.05}
                      rangeFalloff={0.01}
                      luminanceInfluence={0.9}
                    />
                    <DepthOfField
                      focusDistance={0}
                      focalLength={0.02}
                      bokehScale={2}
                    />
                    <Vignette
                      offset={0.5}
                      darkness={0.5}
                      eskil={false}
                    />
                  </EffectComposer>
                  <OrbitControls />
                </Suspense>
              </Canvas>
            </div>
            <Controls />
          </>
        )}
      </div>
    </ModelViewerProvider>
  );
}

export default App;