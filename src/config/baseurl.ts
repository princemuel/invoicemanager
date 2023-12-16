export const resolveBaseURL = () => {
  let url =
    process.env.VERCEL_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    `http://localhost:${process.env.PORT || 3000}/`;
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Make sure to including trailing `/`.
  return url.charAt(url.length - 1) === '/' ? url : `${url}/`;
};
