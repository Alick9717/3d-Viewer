import React, { createContext, useContext, useState } from 'react';
import * as THREE from 'three';

interface ModelViewerContextType {
  directionalLight: {
    intensity: number;
    color: THREE.Color;
    position: THREE.Vector3;
  };
  ambientLight: {
    intensity: number;
    color: THREE.Color;
  };
  setDirectionalLightIntensity: (intensity: number) => void;
  setDirectionalLightColor: (color: THREE.Color) => void;
  setDirectionalLightPosition: (position: THREE.Vector3) => void;
  setAmbientLightIntensity: (intensity: number) => void;
  setAmbientLightColor: (color: THREE.Color) => void;
}

const ModelViewerContext = createContext<ModelViewerContextType | undefined>(undefined);

export function ModelViewerProvider({ children }: { children: React.ReactNode }) {
  const [directionalLight, setDirectionalLight] = useState({
    intensity: 1,
    color: new THREE.Color(0xffffff),
    position: new THREE.Vector3(5, 5, 5),
  });

  const [ambientLight, setAmbientLight] = useState({
    intensity: 0.5,
    color: new THREE.Color(0xffffff),
  });

  const setDirectionalLightIntensity = (intensity: number) => {
    setDirectionalLight(prev => ({ ...prev, intensity }));
  };

  const setDirectionalLightColor = (color: THREE.Color) => {
    setDirectionalLight(prev => ({ ...prev, color }));
  };

  const setDirectionalLightPosition = (position: THREE.Vector3) => {
    setDirectionalLight(prev => ({ ...prev, position }));
  };

  const setAmbientLightIntensity = (intensity: number) => {
    setAmbientLight(prev => ({ ...prev, intensity }));
  };

  const setAmbientLightColor = (color: THREE.Color) => {
    setAmbientLight(prev => ({ ...prev, color }));
  };

  return (
    <ModelViewerContext.Provider
      value={{
        directionalLight,
        ambientLight,
        setDirectionalLightIntensity,
        setDirectionalLightColor,
        setDirectionalLightPosition,
        setAmbientLightIntensity,
        setAmbientLightColor,
      }}
    >
      {children}
    </ModelViewerContext.Provider>
  );
}

export function useModelViewer() {
  const context = useContext(ModelViewerContext);
  if (context === undefined) {
    throw new Error('useModelViewer must be used within a ModelViewerProvider');
  }
  return context;
}