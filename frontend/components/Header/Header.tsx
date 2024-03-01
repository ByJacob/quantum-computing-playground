import { Center, Grid } from '@mantine/core';
import { ColorToggle } from './ColorToggle';

export function Header() {
  return (
    <>
      <Grid
        justify="space-between"
        align="stretch"
        gutter={0}
        styles={{
          root: {
            height: '100%',
          },
          inner: {
            height: '100%',
          },
        }}
      >
        <Grid.Col span={3}>Logo</Grid.Col>
        <Grid.Col span={3}>coś</Grid.Col>
        <Grid.Col span="content">
          <Center h="100%" inline>
            <ColorToggle />
          </Center>
        </Grid.Col>
      </Grid>
    </>
  );
}
