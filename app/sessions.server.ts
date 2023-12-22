import { createCookieSessionStorage } from "@remix-run/node";
import { createThemeSessionResolver } from "remix-themes";

const isProduction = process.env.NODE_ENV === "production";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__remix-themes__",
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secrets: ["s3cr3t"],
    ...(isProduction ?
      { domain: `https://${process.env.VERCEL_URL}`, secure: true }
    : {}),
  },
});

export const themeSessionResolver = createThemeSessionResolver(sessionStorage);
