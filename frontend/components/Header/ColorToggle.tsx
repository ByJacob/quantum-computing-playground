import { MantineColorScheme, SegmentedControl, Tooltip, rem, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { IconMoonStars, IconSun, IconSettingsAutomation } from '@tabler/icons-react';

export function ColorToggle() {
  const theme = useMantineTheme();
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const iconProps = {
    style: { width: rem(16), height: rem(16) },
    stroke: 2.5,
  };

  const sunIcon = (
    <Tooltip label="Jasny">
      <IconSun
        color={theme.colors.yellow[4]}
        {...iconProps}
      />
    </Tooltip>
  );

  const autoIcon = (
    <Tooltip label="Auto">
      <IconSettingsAutomation
        color={theme.colors.gray[4]}
        {...iconProps}
      />
    </Tooltip>
  );

  const moonIcon = (
    <Tooltip label="Ciemny">
      <IconMoonStars
        color={theme.colors.blue[6]}
        {...iconProps}
      />
    </Tooltip>
  );

  const data = [
    { label: sunIcon, value: 'light' },
    { label: autoIcon, value: 'dark' },
    { label: moonIcon, value: 'auto' },
  ];

  return (
    <SegmentedControl
      data={data}
      value={colorScheme}
      onChange={e => setColorScheme(e as MantineColorScheme)}
      mr={8}
    />
  );
}
