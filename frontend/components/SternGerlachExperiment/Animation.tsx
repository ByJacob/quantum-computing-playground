'use client';

import { Canvas } from '@react-three/fiber';
import { Extrude, OrbitControls, PerspectiveCamera, Text } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';
import { useComputedColorScheme, useMantineTheme } from '@mantine/core';
import { Props as TextProps } from '@react-three/drei/core/Text';

interface SceneColors {
  block: string
  s_letter: string
  n_letter: string
}

interface BoxProps {
  colors: SceneColors
}

function SourceBox() {
  return (
    <>
      <boxGeometry args={[20, 20, 20]} />
      <meshStandardMaterial />
    </>
  );
}

function MagnesiumBox({ colors }: BoxProps) {
  const height = 12;
  const length = 17;

  const shapeBottom = useMemo(() => {
    const _shape = new THREE.Shape();

    _shape.moveTo(0, 0);
    _shape.lineTo(0, height);
    _shape.lineTo(length / 3, height);
    _shape.lineTo(length / 3, (height * 2) / 4);
    _shape.lineTo((length * 2) / 3, (height * 2) / 4);
    _shape.lineTo((length * 2) / 3, height);
    _shape.lineTo(length, height);
    _shape.lineTo(length, 0);
    _shape.lineTo(0, 0);

    return _shape;
  }, []);

  const shapeUp = useMemo(() => {
    const _shape = new THREE.Shape();
    const myHeight = height * 1.5;
    _shape.moveTo(length / 2, 0);
    _shape.lineTo(0, (myHeight * 2) / 3);
    _shape.lineTo(0, myHeight);
    _shape.lineTo(length, myHeight);
    _shape.lineTo(length, (myHeight * 2) / 3);
    _shape.lineTo(length / 2, 0);

    return _shape;
  }, []);

  const extrudeBottomSettings = useMemo(
    () => ({
      steps: 2,
      depth: length,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 1,
    }),
    []
  );

  const extrudeUpSettings = useMemo(
    () => ({
      steps: 2,
      depth: length,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 1,
    }),
    []
  );

  const textProperties: TextProps = {
    fontSize: 6,
    maxWidth: 100,
    lineHeight: 1,
    letterSpacing: 0.02,
    textAlign: 'left',
    font: 'https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff',
  };

  return (
    <>
      <Extrude args={[shapeBottom, extrudeBottomSettings]}>
        <meshNormalMaterial color={colors.block} />
      </Extrude>
      <Extrude args={[shapeUp, extrudeUpSettings]} position={[0, height, 0]}>
        <meshNormalMaterial color={colors.block} />
      </Extrude>
      <Text
        color={colors.s_letter}
        position={[length / 2, height / 4, length + 0.01]}
        {...textProperties}
      >S
      </Text>
      <Text
        color={colors.s_letter}
        position={[length / 2, height / 4, 0 - 0.01]}
        rotation={[0, Math.PI / 1, 0]}
        {...textProperties}
      >S
      </Text>
      <Text
        color={colors.n_letter}
        position={[length / 2, height * 1.75, length + 0.01]}
        {...textProperties}
      >N
      </Text>
      <Text
        color={colors.n_letter}
        position={[length / 2, height * 1.75, 0 - 0.01]}
        rotation={[0, Math.PI / 1, 0]}
        {...textProperties}
      >N
      </Text>
    </>
  );
}

// https://discourse.threejs.org/t/extruded-shape-with-hole-missing-inside-mesh/42401
function Scene() {
  const theme = useMantineTheme();

  const colors_dark: SceneColors = {
    block: theme.colors.gray[0],
    s_letter: theme.colors.red[8],
    n_letter: theme.colors.blue[8],
  };

  const colors_light: SceneColors = {
    block: theme.colors.dark[9],
    s_letter: theme.colors.red[8],
    n_letter: theme.colors.blue[8],
  };

  const colors = useComputedColorScheme() === 'light' ? colors_light : colors_dark;
  console.log(colors);

  return (
    <>
      {/* <mesh position={[0, 10, -70]}>
        <SourceBox />
      </mesh> */}
      <mesh>
        <MagnesiumBox colors={colors} />
      </mesh>
      {/* <mesh position={[10, 1, 0]}>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh> */}
    </>
  );
}

export function Animation() {
  return (
    <Canvas>
      <hemisphereLight args={['white', 'white', 10]} />
      <directionalLight args={['white', 3]} position={[60, 30, 0]} />
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
