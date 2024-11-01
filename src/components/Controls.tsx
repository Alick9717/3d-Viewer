import React, { useCallback } from 'react';
import { useModelViewer } from '../context/ModelViewerContext';
import * as THREE from 'three';

const Controls: React.FC = () => {
  const {
    directionalLight,
    ambientLight,
    setDirectionalLightIntensity,
    setDirectionalLightColor,
    setDirectionalLightPosition,
    setAmbientLightIntensity,
    setAmbientLightColor,
  } = useModelViewer();

  const handleDirectionalLightIntensity = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDirectionalLightIntensity(parseFloat(e.target.value));
  }, [setDirectionalLightIntensity]);

  const handleDirectionalLightColor = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDirectionalLightColor(new THREE.Color(e.target.value));
  }, [setDirectionalLightColor]);

  const handleDirectionalLightPosition = useCallback((axis: 'x' | 'y' | 'z', value: number) => {
    const newPosition = new THREE.Vector3().copy(directionalLight.position);
    newPosition[axis] = value;
    setDirectionalLightPosition(newPosition);
  }, [directionalLight.position, setDirectionalLightPosition]);

  const handleAmbientLightIntensity = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAmbientLightIntensity(parseFloat(e.target.value));
  }, [setAmbientLightIntensity]);

  const handleAmbientLightColor = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAmbientLightColor(new THREE.Color(e.target.value));
  }, [setAmbientLightColor]);

  return (
    <div className="w-80 bg-gray-800 p-4 overflow-y-auto">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Directional Light</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Intensity
              </label>
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={directionalLight.intensity}
                onChange={handleDirectionalLightIntensity}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Color
              </label>
              <input
                type="color"
                value={`#${directionalLight.color.getHexString()}`}
                onChange={handleDirectionalLightColor}
                className="w-full h-8 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Position
              </label>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-gray-400">X</label>
                  <input
                    type="range"
                    min="-10"
                    max="10"
                    step="0.1"
                    value={directionalLight.position.x}
                    onChange={(e) => handleDirectionalLightPosition('x', parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400">Y</label>
                  <input
                    type="range"
                    min="-10"
                    max="10"
                    step="0.1"
                    value={directionalLight.position.y}
                    onChange={(e) => handleDirectionalLightPosition('y', parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400">Z</label>
                  <input
                    type="range"
                    min="-10"
                    max="10"
                    step="0.1"
                    value={directionalLight.position.z}
                    onChange={(e) => handleDirectionalLightPosition('z', parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Ambient Light</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Intensity
              </label>
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={ambientLight.intensity}
                onChange={handleAmbientLightIntensity}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Color
              </label>
              <input
                type="color"
                value={`#${ambientLight.color.getHexString()}`}
                onChange={handleAmbientLightColor}
                className="w-full h-8 rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;