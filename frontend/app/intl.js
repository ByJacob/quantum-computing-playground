'server-only';

import { createIntl } from '@formatjs/intl';
import { cookies } from 'next/headers';
import { getCookie } from 'cookies-next';
import { COOKIE_LOCALE_KEY } from '../components/constrants';

export default async function getIntl(namespace) {
  const locale = getCookie(COOKIE_LOCALE_KEY, { cookies }) !== undefined ? getCookie(COOKIE_LOCALE_KEY, { cookies }) : 'en';
  return createIntl({
    locale,
    messages: (await import(`@/public/messages/${locale}/${namespace}.json`)).default,
  });
}
