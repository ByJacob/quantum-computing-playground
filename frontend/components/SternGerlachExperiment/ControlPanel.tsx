'use client';

import { Card, Grid, Text, Slider, Switch, rem } from '@mantine/core';
import { ControlsStates, MagnesiumName } from './Model';

interface MagnesiumPanelProps {
  magnesiumKey: MagnesiumName
  states: ControlsStates
  onChangeEnable: (magnesiumKey: MagnesiumName, value: boolean) => void
  onChangeRad: (magnesiumKey: MagnesiumName, value: number) => void
  switchSize: string
}

interface ControlPanelProps {
  controlStates: ControlsStates
  onChangeRad: (magnesiumKey: MagnesiumName, value: number) => void
  onChangeEnable: (magnesiumKey: MagnesiumName, value: boolean) => void
}

function MagnesiumPanel({
  magnesiumKey,
  states,
  onChangeEnable,
  onChangeRad,
  switchSize,
} : MagnesiumPanelProps) {
  const styles = {
    col: {
      paddingTop: rem(10),
    },
  };
  const label = states[magnesiumKey].name;

  return (
    <Card padding="sm" withBorder>
      <Card.Section>
        <Text ta="center" size="sm">{label}</Text>
      </Card.Section>
      <Grid align="center" styles={styles}>
        <Grid.Col span="content">
          <Switch
            checked={states[magnesiumKey].enable}
            disabled={magnesiumKey === MagnesiumName.A1}
            onChange={(event) => onChangeEnable(magnesiumKey, event.currentTarget.checked)}
            size={switchSize}
            onLabel="ON"
            offLabel="OFF"
          />
        </Grid.Col>
        <Grid.Col span="auto">
          <Slider
            size="sm"
            pb="sm"
            min={0}
            max={360}
            disabled={!states[magnesiumKey].enable}
            defaultValue={(180 * states[magnesiumKey].rotateRad) / Math.PI}
            onChange={(value) => onChangeRad(magnesiumKey, (value * Math.PI) / 180)}
            label={(value) => `${value} °`}
            marks={[
              { value: 90, label: '90 °' },
              { value: 180, label: '180 °' },
              { value: 270, label: '270 °' },
            ]}
          />
        </Grid.Col>
      </Grid>
    </Card>
  );
}

function isC(key: MagnesiumName) {
  switch (key) {
    case MagnesiumName.C1:
    case MagnesiumName.C2:
    case MagnesiumName.C3:
    case MagnesiumName.C4:
      return true;
  }
  return false;
}

export function ControlPanel({
  controlStates,
  onChangeRad,
  onChangeEnable,
}: ControlPanelProps) {
  const defaultProps = {
    states: controlStates,
    onChangeRad,
    onChangeEnable,
  };
  return (
    <Grid>
      {
        Object.keys(MagnesiumName).map(key =>
          <Grid.Col span={isC(key as keyof typeof MagnesiumName) ? 3 : 4}>
            <MagnesiumPanel
              magnesiumKey={key as keyof typeof MagnesiumName}
              switchSize={isC(key as keyof typeof MagnesiumName) ? 'xs' : 'md'}
              {...defaultProps}
            />
          </Grid.Col>
        )
      }
    </Grid>
  );
}
