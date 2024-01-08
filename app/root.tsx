import { ClerkApp, ClerkErrorBoundary } from "@clerk/remix";
import { rootAuthLoader } from "@clerk/remix/ssr.server";
import NiceModal from "@ebay/nice-modal-react";
import { cssBundleHref } from "@remix-run/css-bundle";
import {
  json,
  type LinksFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react";
import * as React from "react";
import {
  PreventFlashOnWrongTheme,
  ThemeProvider as RemixThemesProvider,
  useTheme,
} from "remix-themes";
import { getToast } from "remix-toast";
import { Toaster as ToastManager, toast as notify } from "sonner";
import { BreakpointIndicator } from "./components/breakpoint-indicator";
import { Sidebar } from "./components/layout.sidebar";
import styles from "./globals.css";
import { tw } from "./helpers/utils";
import { themeSessionResolver } from "./sessions.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = (args: LoaderFunctionArgs) => {
  return rootAuthLoader(args, async ({ request }) => {
    const { getTheme } = await themeSessionResolver(request);
    const { toast, headers } = await getToast(request);

    return json({ toast, theme: getTheme() }, { headers });
  });
};

export const ErrorBoundary = ClerkErrorBoundary();

function App() {
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();

  React.useEffect(() => {
    const type = data.toast?.type || "";
    const message = data.toast?.message;

    const methods = {
      error: notify.error,
      success: notify.success,
      info: notify.info,
      warning: notify.warning,
    };

    const toast = methods?.[type as keyof typeof methods];

    if (type && message && toast) toast(message);
  }, [data.toast?.message, data.toast?.type]);

  React.useEffect(() => {
    const script = document.createElement("script");
    script.src = `/table-aria.js`;
    document.body.appendChild(script);
  }, []);

  return (
    <html
      lang="en"
      dir="ltr"
      data-darkreader-mode="dynamic"
      data-darkreader-theme={theme ?? "dark"}
      className={tw`__sans__`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
        <style
          dangerouslySetInnerHTML={{
            __html:
              '@font-face{font-family:__FontSans_Fallback;src:system-ui;size-adjust:100%;}@font-face{font-family:"__FontSans";src:url("/fonts/spartan-medium-webfont.woff2")format("woff2"),url("/fonts/spartan-medium-webfont.woff")format("woff");font-weight:500;font-style:normal;font-display:swap;}@font-face{font-family:"__FontSans";src:url("/fonts/spartan-bold-webfont.woff2")format("woff2"),url("/fonts/spartan-bold-webfont.woff")format("woff");font-weight:700;font-style:normal;font-display:swap;}.__sans__{--font-sans:"__FontSans","__FontSans_Fallback";}',
          }}
        />
      </head>

      <body className="relative flex min-h-screen w-full flex-col bg-white text-brand-900 antialiased dark:bg-brand-800 dark:text-white md:flex-row">
        <NiceModal.Provider>
          <React.Fragment>
            <Sidebar />
            <Outlet />
          </React.Fragment>

          <React.Fragment>
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
            <Analytics />
          </React.Fragment>

          <React.Fragment>
            <ToastManager
              position="top-center"
              theme={theme ?? "system"}
              richColors
            />
            <BreakpointIndicator />
          </React.Fragment>
        </NiceModal.Provider>
      </body>
    </html>
  );
}

function Root() {
  const data = useLoaderData<typeof loader>();
  return (
    <RemixThemesProvider
      specifiedTheme={data.theme}
      themeAction="/action/set-theme"
    >
      <App />
    </RemixThemesProvider>
  );
}

export default ClerkApp(Root);
