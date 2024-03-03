import { Center, Grid, Image, useComputedColorScheme } from '@mantine/core';
import NextImage from 'next/image';
import { ColorToggle } from './ColorToggle';
import pageLogo from '@/public/logo.svg';
import { LanguageChanger } from './LanguageChanger';

export function Header() {
  const computedColorScheme = useComputedColorScheme();
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
        <Grid.Col span={3}>
          <Center h="100%" inline>
            <Image
              component={NextImage}
              src={pageLogo}
              h={45}
              w="auto"
              style={{ filter: computedColorScheme === 'dark' ? 'invert(100%)' : 'none' }}
              alt="Logo"
              m={5}
            />
          </Center>
        </Grid.Col>
        <Grid.Col span={3}>coś</Grid.Col>
        <Grid.Col span="content">
          <Center h="100%" inline>
            <LanguageChanger />
            <ColorToggle />
          </Center>
        </Grid.Col>
      </Grid>
    </>
  );
}
