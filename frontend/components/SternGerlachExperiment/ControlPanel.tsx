'use client';

import { Card, Grid, Text, Slider, Switch, rem } from '@mantine/core';
import { ControlsStates, MagnesiumName } from './Model';

interface MagnesiumPanelProps {
  label: string
  controlEnabled: boolean
  onChangeEnable: (value: boolean) => void
  valueRad: number
  onChangeRad: (value: number) => void
}

interface ControlPanelProps {
  controlStates: ControlsStates
  onChangeRad: (key: MagnesiumName, value: number) => void
  onChangeEnable: (key: MagnesiumName, value: boolean) => void
}

function MagnesiumPanel({
  label,
  controlEnabled,
  onChangeEnable,
  valueRad,
  onChangeRad,
} : MagnesiumPanelProps) {
  const styles = {
    col: {
      paddingTop: rem(10),
    },
  };

  return (
    <Card padding="sm" withBorder>
      <Card.Section>
        <Text ta="center" size="sm">{label}</Text>
      </Card.Section>
      <Grid align="center" styles={styles}>
        <Grid.Col span="content">
          <Switch
            checked={controlEnabled}
            onChange={(event) => onChangeEnable(event.currentTarget.checked)}
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
            disabled={!controlEnabled}
            defaultValue={(180 * valueRad) / Math.PI}
            onChange={(value) => onChangeRad((value * Math.PI) / 180)}
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
  return (
    <Grid>
      <Grid.Col span={4}>
        <MagnesiumPanel
          label="Object 1A"
          controlEnabled={controlStates.object1aEnable}
          valueRad={controlStates.object1aRad}
          onChangeRad={(value) => onChangeRad(MagnesiumName['1A'], value)}
          onChangeEnable={(value) => onChangeEnable(MagnesiumName['1A'], value)}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <MagnesiumPanel
          label="Object 2A"
          controlEnabled={controlStates.object2aEnable}
          valueRad={controlStates.object2aRad}
          onChangeRad={(value) => onChangeRad(MagnesiumName['2A'], value)}
          onChangeEnable={(value) => onChangeEnable(MagnesiumName['2A'], value)}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <MagnesiumPanel
          label="Object 2B"
          controlEnabled={controlStates.object2bEnable}
          valueRad={controlStates.object2bRad}
          onChangeRad={(value) => onChangeRad(MagnesiumName['2B'], value)}
          onChangeEnable={(value) => onChangeEnable(MagnesiumName['2B'], value)}
        />
      </Grid.Col>
    </Grid>
  );
}
