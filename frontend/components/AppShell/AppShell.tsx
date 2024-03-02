'use client';

import { AppShell as MantineAppShell } from '@mantine/core';
import { IntlProvider } from 'react-intl';
import { useLocalStorage } from '@mantine/hooks';
import { Header } from '../Header';
import { NavBar } from '../NavBar';

interface AppShellProps {
  navBarIntlMessages: any,
  children: React.ReactNode
}

export function AppShell({ navBarIntlMessages, children } : AppShellProps) {
  const [value, setValue] = useLocalStorage({
    key: 'locale',
    defaultValue: '',
  });

  return (
    <MantineAppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
      }}
      padding="md"
    >
      <MantineAppShell.Header>
        <Header />
      </MantineAppShell.Header>

      <MantineAppShell.Navbar p="md">
        <IntlProvider messages={navBarIntlMessages} locale="en">
          <NavBar />
        </IntlProvider>
      </MantineAppShell.Navbar>

      <MantineAppShell.Main>{children}</MantineAppShell.Main>
    </MantineAppShell>
  );
}
