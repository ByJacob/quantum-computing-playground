'server-only';

import { createIntl } from '@formatjs/intl';

export default async function getIntl(locale, namespace) {
  return createIntl({
    locale,
    messages: (await import(`@/public/messages/${locale}/${namespace}.json`)).default,
  });
}
