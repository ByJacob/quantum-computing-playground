'use client';

import { Card, Grid, Text, Slider, Switch, rem } from '@mantine/core';
import { ControlsStates, MagnesiumName } from './Model';

interface MagnesiumPanelProps {
  magnesiumKey: MagnesiumName
  states: ControlsStates
  onChangeEnable: (magnesiumKey: MagnesiumName, value: boolean) => void
  onChangeRad: (magnesiumKey: MagnesiumName, value: number) => void
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
            onChange={(event) => onChangeEnable(magnesiumKey, event.currentTarget.checked)}
            size="md"
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
      <Grid.Col span={4}>
        <MagnesiumPanel
          magnesiumKey={MagnesiumName.A1}
          {...defaultProps}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <MagnesiumPanel
          magnesiumKey={MagnesiumName.B1}
          {...defaultProps}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <MagnesiumPanel
          magnesiumKey={MagnesiumName.B2}
          {...defaultProps}
        />
      </Grid.Col>
    </Grid>
  );
}
