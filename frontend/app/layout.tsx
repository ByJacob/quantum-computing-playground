import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { cookies } from 'next/headers';
import { getCookie } from 'cookies-next';
import { theme } from '../theme';
import { AppShell } from '@/components/AppShell/AppShell';
import getIntl from './intl';
import { COOKIE_LOCALE_KEY } from '@/components/Header/LanguageChanger';

export const metadata = {
  title: 'Mantine Next.js template',
  description: 'I am using Mantine with Next.js!',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const browseLocale = getCookie(COOKIE_LOCALE_KEY, { cookies }) !== undefined ? getCookie(COOKIE_LOCALE_KEY, { cookies }) : 'en';
  const navIntl = await getIntl(browseLocale, 'navbar');

  return (
    <html lang={browseLocale}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <AppShell navBarIntlMessages={navIntl.messages}>{children}</AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}