'use client';

import { Container } from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import { IntlProvider } from 'react-intl';
import { Animation } from './Animation';
import { ControlPanel } from './ControlPanel';
import { ControlsStates, MagnesiumName } from './Model';

interface SternGerlachExperimentProps {
  messages: any,
  locale: string
}

export function SternGerlachExperiment({ messages, locale } : SternGerlachExperimentProps) {
  const placeholder = {
    enable: true,
    name: '',
    rotateRad: 0,
  };
  const defaultState: ControlsStates = {
    [MagnesiumName.A1]: {
      enable: true,
      name: `${messages.magnesium} A1`,
      rotateRad: 0,
    },
    B1: placeholder,
    B2: placeholder,
    C1: placeholder,
    C2: placeholder,
    C3: placeholder,
    C4: placeholder,
  };

  Object.keys(MagnesiumName).forEach(key => {
    if (key === MagnesiumName.A1) {
      return;
    }
    const value = MagnesiumName[key as keyof typeof MagnesiumName];
    defaultState[key as keyof typeof MagnesiumName] = {
      enable: false,
      name: `${messages.magnesium} ${value}`,
      rotateRad: 0,
    };
  });

  const [state, setState] = useSetState(defaultState);

  (Object.keys(defaultState) as MagnesiumName[]).forEach((key: MagnesiumName) => {
    const newName = `${messages.magnesium} ${key}`;
    if (newName !== state[key].name) {
      setState((current: ControlsStates) => {
        const newCurrent = current;
        newCurrent[key].name = newName;
        return newCurrent;
      });
    }
  });

  const onChangeRad = (key: MagnesiumName, value: number) => {
    setState((current: ControlsStates) => {
      const newCurrent = current;
      newCurrent[key].rotateRad = value;
      return newCurrent;
    });
  };

  const onChangeEnable = (key: MagnesiumName, value: boolean) => {
    setState((current: ControlsStates) => {
      const newCurrent = current;
      newCurrent[key].enable = value;
      return newCurrent;
    });
  };

  return (
    <IntlProvider messages={messages} locale={locale}>
      <Container h={300}>
        <Animation controlStates={state} />
      </Container>
      <ControlPanel
        controlStates={state}
        onChangeRad={onChangeRad}
        onChangeEnable={onChangeEnable}
      />
    </IntlProvider>
  );
}
