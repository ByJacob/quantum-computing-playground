import { NavLink } from '@mantine/core';
import { usePathname } from 'next/navigation';
import { IconNumber0, IconNumber1 } from '@tabler/icons-react';
import Link from 'next/link';
import { useIntl } from 'react-intl';

const data = [
  { icon: IconNumber0, label: 'home', href: '/' },
  { icon: IconNumber1, label: 'stern-gerlach', href: '/SternGerlachExperiment' },
];

export function NavBar() {
  const pathname = usePathname();
  const intl = useIntl();
  return (
    <>
    {data.map((item) =>
        <NavLink
          component={Link}
          href={item.href}
          key={item.label}
          active={item.href === pathname}
          label={intl.formatMessage({ id: item.label })}
          leftSection={<item.icon size="1rem" stroke={1.5} />}
        />
      )}
    </>
  );
}
