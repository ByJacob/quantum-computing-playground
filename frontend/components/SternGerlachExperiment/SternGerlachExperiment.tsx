'use client';

import { Container } from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import { Animation } from './Animation';
import { ControlPanel } from './ControlPanel';
import { ControlsStates, MagnesiumName } from './Model';

export function SternGerlachExperiment() {
  const defaultState: ControlsStates = {
    object1aEnable: true,
    object1aRad: Math.PI / 4,
    object2aEnable: false,
    object2aRad: 0,
    object2bEnable: false,
    object2bRad: 0,
  };
  const [state, setState] = useSetState(defaultState);

  const onChangeRad = (key: MagnesiumName, value: number) => {
    switch (key) {
      case MagnesiumName['1A']: {
        setState({ object1aRad: value });
        break;
      }
      case MagnesiumName['2A']: {
        setState({ object2aRad: value });
        break;
      }
      case MagnesiumName['2B']: {
        setState({ object2bRad: value });
        break;
      }
    }
  };

  const onChangeEnable = (key: MagnesiumName, value: boolean) => {
    switch (key) {
      case MagnesiumName['1A']: {
        setState({ object1aEnable: value });
        break;
      }
      case MagnesiumName['2A']: {
        setState({ object2aEnable: value });
        break;
      }
      case MagnesiumName['2B']: {
        setState({ object2bEnable: value });
        break;
      }
    }
  };

  return (
    <>
    <Container h={300}>
      <Animation controlStates={state} />
    </Container>
    <ControlPanel
      controlStates={state}
      onChangeRad={onChangeRad}
      onChangeEnable={onChangeEnable}
    />
    </>
  );
}
