'use client';

import { Canvas } from '@react-three/fiber';
import { Extrude, Line, OrbitControls, PerspectiveCamera, Text } from '@react-three/drei';
import { ReactNode, useMemo } from 'react';
import * as THREE from 'three';
import { useComputedColorScheme, useMantineTheme } from '@mantine/core';
import { ControlsStates, MagnesiumName } from './Model';

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

interface SceneProps {
  states: ControlsStates
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
function Scene({ states } : SceneProps) {
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

  const distance = 50;
  const next_angle = 0.55;

  const items: ReactNode[] = [];

  (Object.keys(states) as MagnesiumName[]).forEach((key: MagnesiumName) => {
    const currentState = states[key];
    if (!currentState.enable) {
      return;
    }

    let previous_rotation = 0;
    let previous_rotation2 = 0;
    let level = 1;
    let upParameter = 1;
    let isNextUp = false;
    let isNextDown = false;

    switch (key) {
      case MagnesiumName.A1:
        if (MagnesiumName.B1 in states && states[MagnesiumName.B1].enable) {
          isNextUp = true;
        }
        if (MagnesiumName.B2 in states && states[MagnesiumName.B2].enable) {
          isNextDown = true;
        }
        break;
      case MagnesiumName.B1:
        previous_rotation = states[MagnesiumName.A1].rotateRad;
        level = 2;
        if (MagnesiumName.C1 in states && states[MagnesiumName.C1].enable) {
          isNextUp = true;
        }
        if (MagnesiumName.C2 in states && states[MagnesiumName.C2].enable) {
          isNextDown = true;
        }
        break;
      case MagnesiumName.B2:
        previous_rotation = states[MagnesiumName.A1].rotateRad;
        level = 2;
        upParameter = -1;
        if (MagnesiumName.C3 in states && states[MagnesiumName.C3].enable) {
          isNextUp = true;
        }
        if (MagnesiumName.C4 in states && states[MagnesiumName.C4].enable) {
          isNextDown = true;
        }
        break;
      case MagnesiumName.C1:
        previous_rotation = states[MagnesiumName.A1].rotateRad;
        previous_rotation2 = states[MagnesiumName.B1].rotateRad;
        level = 3;
        break;
    }

    const path_height_next = source_height / 1.2;
    const path_point_next = path_height_next / Math.tan(next_angle);
    const path_points: [number, number, number][] = [
      [0, 0, -distance + (source_lenght / 2)],
      [0, 0, source_lenght / 2.2],
    ];
    if (!isNextUp) {
      path_points.push([0, path_height_next, source_lenght / 2.2 + path_point_next]);
      path_points.push(path_points[1]);
    }
    if (!isNextDown) {
      path_points.push([0, -path_height_next, source_lenght / 2.2 + path_point_next]);
    }
    let rotate_x = 0;
    let rorate_z = 0;
    const rotate_y = currentState.rotateRad + previous_rotation + previous_rotation2;

    let position_x = 0;
    let position_z = source_height / 2;
    let position_y = distance;

    if (level >= 2) {
      const level_distance = distance * 1.014;
      const level_height = distance * Math.sin(next_angle) * 0.8;
      rotate_x += -next_angle * Math.cos(previous_rotation) * upParameter;
      rorate_z += -next_angle * Math.sin(previous_rotation) * upParameter;
      position_x += -1 * Math.sin(previous_rotation) * level_height * upParameter;
      position_z += Math.cos(previous_rotation) * level_height * upParameter;
      position_y += Math.cos(next_angle) * level_distance;
    }

    if (level >= 3) {
      const level_distance = distance * 1.014;
      const level_height = distance * Math.sin(next_angle * 2) * 0.8;
      rotate_x += -next_angle * Math.cos(previous_rotation + previous_rotation2) * upParameter;
      rorate_z += -next_angle * Math.sin(previous_rotation + previous_rotation2) * upParameter;
      position_x +=
        (Math.sin(previous_rotation) * (-level_height) * upParameter)
        + Math.sin(previous_rotation + previous_rotation2) * (-level_height / 2) * upParameter;
      position_z +=
        (Math.cos(previous_rotation) * (level_height / 2) * upParameter)
        + Math.cos(previous_rotation + previous_rotation2) * (level_height / 2) * upParameter;
      position_y += Math.cos(next_angle * 2) * level_distance;
    }

    items.push(
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
      { items }
      {/* <mesh position={[10, 1, 0]}>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh> */}
    </>
  );
}

export function Animation({ controlStates }: AnimationProps) {
  return (
    <Canvas>
      <Scene states={controlStates} />
      <gridHelper args={[1000, 100]} />
      <axesHelper position={[50, 5, 0]} args={[30]} />
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
