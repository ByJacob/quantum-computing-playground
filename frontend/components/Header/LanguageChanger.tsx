import { SegmentedControl, rem } from '@mantine/core';
import { US, PL } from 'country-flag-icons/react/3x2';
import { getUserLocales } from 'get-user-locale';
import { useSetState } from '@mantine/hooks';
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useIntl } from 'react-intl';
import i18nConfig from '@/i18nConfig';
import { COOKIE_LOCALE_KEY } from '@/components/constrants';
import { useEffect } from 'react';

export function LanguageChanger() {
  const router = useRouter();
  const intl = useIntl();
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
    if (value.locale !== undefined) {
      return;
    }
    const acceptLanguages = getUserLocales({ fallbackLocale: 'en' }).map((lang) => lang.toLocaleLowerCase().split('-')).flat();
    const browseLocale = acceptLanguages.find(element => i18nConfig.locales.includes(element));
    if (browseLocale) {
      onChangeLanguage(browseLocale);
    } else {
      onChangeLanguage('en');
    }
  }

  useEffect(() => getBrowserLanguage(), []);

  const usIcon = <US title={intl.formatMessage({ id: 'english' })} {...iconProps} />;
  const plIcon = <PL title={intl.formatMessage({ id: 'polish' })} {...iconProps} />;

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
