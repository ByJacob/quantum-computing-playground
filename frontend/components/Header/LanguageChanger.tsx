import { SegmentedControl, rem } from '@mantine/core';
import { US, PL } from 'country-flag-icons/react/3x2';
import { getUserLocales } from 'get-user-locale';
import { useSetState } from '@mantine/hooks';
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import i18nConfig from '@/i18nConfig';

export const COOKIE_LOCALE_KEY = 'browser-locale';

export default function LanguageChanger() {
  const router = useRouter();
  const iconProps = {
    style: { width: rem(16), height: rem(16) },
    stroke: '2.5',
  };

  const [value, setValue] = useSetState({
    locale: getCookie(COOKIE_LOCALE_KEY),
  });

  function onChangeLanguage(e: string) {
    setCookie(COOKIE_LOCALE_KEY, e);
    setValue({
      locale: e,
    });
    router.refresh();
  }

  function getBrowserLanguage() {
    const browseLocale = getUserLocales({ fallbackLocale: 'en' }).find(element => i18nConfig.locales.includes(element));
    if (browseLocale) {
      onChangeLanguage(browseLocale);
    } else {
      onChangeLanguage('en');
    }
  }

  if (value === undefined) {
    getBrowserLanguage();
  }

  const usIcon = <US title="Angielski" {...iconProps} />;
  const plIcon = <PL title="Angielski" {...iconProps} />;

  const data = [
    { label: usIcon, value: 'en' },
    { label: plIcon, value: 'pl' },
  ];

  return (
    <SegmentedControl
      data={data}
      value={value.locale}
      onChange={onChangeLanguage}
      mr={8}
    />
  );
}
