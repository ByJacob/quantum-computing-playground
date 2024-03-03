import { MantineColorScheme, SegmentedControl, Tooltip, rem, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { IconMoonStars, IconSun, IconSettingsAutomation } from '@tabler/icons-react';
import { useIntl } from 'react-intl';

export function ColorToggle() {
  const theme = useMantineTheme();
  const intl = useIntl();
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const iconProps = {
    style: { width: rem(16), height: rem(16) },
    stroke: 2.5,
  };

  const sunIcon = (
    <Tooltip label={intl.formatMessage({ id: 'light' })}>
      <IconSun
        color={theme.colors.yellow[4]}
        {...iconProps}
      />
    </Tooltip>
  );
  const moonIcon = (
    <Tooltip label={intl.formatMessage({ id: 'dark' })}>
      <IconMoonStars
        color={theme.colors.blue[6]}
        {...iconProps}
      />
    </Tooltip>
  );

  const data = [
    { label: sunIcon, value: 'light' },
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
