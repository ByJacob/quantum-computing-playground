'use client';

import { Canvas } from '@react-three/fiber';
import { Extrude, Line, OrbitControls, PerspectiveCamera, Text } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';
import { useComputedColorScheme, useMantineTheme } from '@mantine/core';
import { ControlsStates } from './Model';

const source_height = 20;
const source_lenght = 20;

interface SceneColors {
  light: string
  block: string
  s_letter: string
  n_letter: string
}

interface BoxProps {
  colors: SceneColors
}

interface MagnesiumPosition {
  col: 1 | 2 | 3
  row: -3 | -2 | -1 | 0 | 1 | 2 | 3
  rotate: number
}

interface SceneProps {
  magnesiums: MagnesiumPosition[]
}

interface TestProps {
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  fontSize?: number;
  lineHeight?: number;
  maxWidth?: number;
  letterSpacing?: number;
  font?: string;
}

interface AnimationProps {
  controlStates: ControlsStates
}

function SourceBox({ colors }: BoxProps) {
  const textProperties: TestProps = {
    fontSize: 5,
    maxWidth: 100,
    lineHeight: 1,
    letterSpacing: 0.02,
    textAlign: 'left',
    font: 'https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff',
  };

  return (
    <mesh position={[0, source_height / 2, 0]}>
      <boxGeometry args={[source_lenght, source_height, source_lenght]} />
      <meshStandardMaterial color={colors.block} />
      <Text
        color={colors.s_letter}
        position={[0, source_height / 2 + 0.01, 0]}
        rotation={[-Math.PI / 2, 0, -Math.PI / 4]}
        {...textProperties}
      >Source
      </Text>
      <Text
        color={colors.s_letter}
        position={[-source_height / 2 - 0.01, 0, 0 - 0.01]}
        rotation={[-Math.PI / 2, -Math.PI / 2, -Math.PI / 4]}
        {...textProperties}
      >Source
      </Text>
      <Text
        color={colors.s_letter}
        position={[source_height / 2 + 0.01, 0, 0 - 0.01]}
        rotation={[-Math.PI / 2, Math.PI / 2, Math.PI / 4]}
        {...textProperties}
      >Source
      </Text>
    </mesh>
  );
}

function MagnesiumBox({ colors }: BoxProps) {
  const height = source_height * 0.6;
  const length = source_lenght;

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

  const textProperties: TestProps = {
    fontSize: 6,
    maxWidth: 100,
    lineHeight: 1,
    letterSpacing: 0.02,
    textAlign: 'left',
    font: 'https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff',
  };

  return (
    <mesh position={[-length / 2, -10, -length / 2]}>
      <Extrude args={[shapeBottom, extrudeBottomSettings]}>
        <meshStandardMaterial color={colors.block} />
      </Extrude>
      <Extrude args={[shapeUp, extrudeUpSettings]} position={[0, height, 0]}>
        <meshStandardMaterial color={colors.block} />
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
    </mesh>
  );
}

// https://discourse.threejs.org/t/extruded-shape-with-hole-missing-inside-mesh/42401
function Scene({ magnesiums } : SceneProps) {
  const theme = useMantineTheme();

  const colors_dark: SceneColors = {
    light: 'black',
    block: theme.colors.gray[0],
    s_letter: theme.colors.red[8],
    n_letter: theme.colors.blue[8],
  };

  const colors_light: SceneColors = {
    light: 'white',
    block: theme.colors.dark[9],
    s_letter: theme.colors.red[8],
    n_letter: theme.colors.blue[8],
  };

  const colors = useComputedColorScheme() === 'light' ? colors_light : colors_dark;

  const distance = 40;
  const next_angle = Math.PI / 9;

  const render_magnesiums = magnesiums.map((magnesium) => {
    let previus_level;
    if (magnesium.col === 2) {
      [previus_level] = magnesiums.filter((m) => m.col === 1);
    } else if (magnesium.col === 3 && magnesium.row > 0) {
      [previus_level] = magnesiums.filter((m) => m.col === 2 && m.row === 2);
    } else if (magnesium.col === 3 && magnesium.row < 0) {
      [previus_level] = magnesiums.filter((m) => m.col === 2 && m.row === -2);
    }
    const previous_rotation = previus_level ? previus_level.rotate : 0;
    const path_point_next = (source_height / 2) / Math.tan(next_angle);
    const path_points: [number, number, number][] = [
      [0, 0, -distance + (source_height / 4)],
      [0, 0, source_lenght / 4],
      [0, source_height / 2, source_lenght / 4 + path_point_next],
      [0, 0, source_lenght / 4],
      [0, -source_height / 2, source_lenght / 4 + path_point_next],
    ];
    const rotate_x = -next_angle * Math.cos(previous_rotation) * (magnesium.col - 1);
    const rorate_z = -next_angle * Math.sin(previous_rotation) * (magnesium.col - 1);
    const rotate_y = magnesium.rotate + previous_rotation;
    const position_x = 0 +
      -(magnesium.col - 1) * (Math.sin(previous_rotation) * (source_height / (Math.PI / 2)));
    const position_z = source_height / 2 +
      (magnesium.col - 1) * (Math.cos(previous_rotation) * (source_height / (Math.PI / 2)));
    const position_y = distance * magnesium.col;
    return (
      <mesh
        position={[position_x, position_z, position_y]}
        rotation={[rotate_x, rorate_z, rotate_y]}
      >
        <MagnesiumBox colors={colors} />
        <Line
          points={path_points}
          color="red"
          lineWidth={3}
          dashed={false}
        />
      </mesh>
    );
  });

  return (
    <>
      <hemisphereLight args={['white', colors.light, 10]} />
      <directionalLight args={[colors.light, 3]} position={[60, 30, 0]} />
      <directionalLight args={[colors.light, 3]} position={[-60, 30, 0]} />
      <mesh position={[0, 0, 0]}>
        <SourceBox colors={colors} />
      </mesh>
      {render_magnesiums}
      {/* <mesh position={[10, 1, 0]}>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh> */}
    </>
  );
}

export function Animation({ controlStates }: AnimationProps) {
  const magnesium_1 = {
    col: 1,
    row: 0,
    rotate: controlStates.object1aRad,
  } as MagnesiumPosition;

  const magnesium_2 = {
    col: 2,
    row: 2,
    rotate: controlStates.object2aRad,
  } as MagnesiumPosition;

  const magnesium_3 = {
    col: 3,
    row: 1,
    rotate: Math.PI / 9,
  } as MagnesiumPosition;

  const magnesiums = [magnesium_1, magnesium_2, magnesium_3];

  return (
    <Canvas>
      <Scene magnesiums={magnesiums} />
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
