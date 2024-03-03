'use client';

import { AppShell as MantineAppShell } from '@mantine/core';
import { IntlProvider } from 'react-intl';
import { Header } from '../Header';
import { NavBar } from '../NavBar';

interface AppShellProps {
  locale: string,
  navBarIntlMessages: any,
  defaultIntlMessages: any,
  children: React.ReactNode
}

export function AppShell({
  locale,
  navBarIntlMessages,
  defaultIntlMessages, children,
} : AppShellProps) {
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
        <IntlProvider messages={defaultIntlMessages} locale={locale}>
          <Header />
        </IntlProvider>
      </MantineAppShell.Header>

      <MantineAppShell.Navbar p="md">
        <IntlProvider messages={navBarIntlMessages} locale={locale}>
          <NavBar />
        </IntlProvider>
      </MantineAppShell.Navbar>

      <MantineAppShell.Main>{children}</MantineAppShell.Main>
    </MantineAppShell>
  );
}
