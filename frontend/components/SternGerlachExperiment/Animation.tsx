'use client';

import { Canvas } from '@react-three/fiber';
import { CameraControls, CubeCamera, OrbitControls, OrthographicCamera } from '@react-three/drei';

function Scene(texture) {
  return (
    <>
      <mesh>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[10,0,0]}>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
    </>
  );
}

export function Animation() {
  return (
    <Canvas>
      <Scene />
      <gridHelper args={[100, 10]} />
      <OrbitControls />
    </Canvas>
  );
}
