export const SITE_URL =
  process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL;
export const baseUrl = new URL('/', SITE_URL);
