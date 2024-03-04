'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { CameraControls, CubeCamera, OrbitControls, OrthographicCamera, PerspectiveCamera } from '@react-three/drei';
import { useRef, useEffect } from 'react';

// https://discourse.threejs.org/t/extruded-shape-with-hole-missing-inside-mesh/42401
function Scene() {
  return (
    <>
      <mesh position={[0, 10, -70]}>
        <boxGeometry args={[20, 20, 20]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[10, 1, 0]}>
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
      <gridHelper args={[1000, 100]} />
      <PerspectiveCamera
        makeDefault
        position={[60, 30, 0]}
        fov={70}
        zoom={1}
      />
      <OrbitControls />
    </Canvas>
  );
}
