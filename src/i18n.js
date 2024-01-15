import merge from 'deepmerge';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const localeMessages = (await import(`./translations/${locale}.json`))
    .default;
  const localeGeneralMessages =
    locale.split('-').length > 1
      ? (await import(`./translations/${locale.split('-')[0]}.json`)).default
      : {};
  const defaultMessages = (await import(`./translations/en.json`)).default;
  const messages = merge.all([
    defaultMessages,
    localeGeneralMessages,
    localeMessages,
  ]);

  return {
    messages,
  };
});
