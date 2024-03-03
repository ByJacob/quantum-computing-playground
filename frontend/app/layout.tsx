import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '../theme';
import { AppShell } from '@/components/AppShell/AppShell';
import getIntl from './intl';

export async function generateMetadata() {
  return {
    title: {
      template: '%s | QCP',
      default: 'Quantum Computing Playground', // a default is required when creating a template
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navIntl = await getIntl('navbar');
  const defaultIntl = await getIntl('default');
  return (
    <html lang={navIntl.locale}>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <AppShell
            locale={navIntl.locale}
            navBarIntlMessages={navIntl.messages}
            defaultIntlMessages={defaultIntl.messages}
          >{children}
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
