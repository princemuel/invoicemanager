import { capitalize } from './utils';

export const constants = {
  ONE_DAY: 24 * 3600 * 1000,

  DEFAULT_TITLE_META_TAG: 'Invoice Mail Web',
  DEFAULT_SITE_LOGO: '/logo.svg',
  DEFAULT_DESC_META_TAG: '',
  RENDER_TITLE_META_TAG: (text?: string) =>
    text
      ? `Invoice Mail Web | ${capitalize(text)}`
      : constants?.DEFAULT_TITLE_META_TAG,
  RENDER_DESC_META_TAG: (text?: string) =>
    text ? capitalize(text) : constants?.DEFAULT_DESC_META_TAG,

  BASE_URL_PROD: 'https://invoicetracker.vercel.app',
};
