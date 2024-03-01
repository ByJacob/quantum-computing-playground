'use client';

import { AppShell as MantineAppShell } from '@mantine/core';
import { Header } from '../Header/Header';

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children } : AppShellProps) {
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

      <MantineAppShell.Navbar p="md">Navbar</MantineAppShell.Navbar>

      <MantineAppShell.Main>{children}</MantineAppShell.Main>
    </MantineAppShell>
  );
}
