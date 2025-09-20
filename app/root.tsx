import { ClerkProvider } from "@clerk/react-router";
import { rootAuthLoader } from "@clerk/react-router/ssr.server";
import NiceModal from "@ebay/nice-modal-react";
import { Analytics } from "@vercel/analytics/react";
import * as React from "react";

import {
  data,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  useRouteLoaderData,
} from "react-router";
import {
  PreventFlashOnWrongTheme,
  ThemeProvider as RemixThemesProvider,
  useTheme,
} from "remix-themes";
import { getToast } from "remix-toast";
import { toast as notify, Toaster as ToastManager } from "sonner";
import type { Route } from "./+types/root";
import { BreakpointIndicator } from "./components/breakpoint-indicator";
import { Sidebar } from "./components/layout.sidebar";
import "./globals.css";
import { tw } from "./helpers/tailwind";
import { themeSessionResolver } from "./sessions.server";

export const links: Route.LinksFunction = () => [
  { rel: "icon", type: "image/svg+xml", href: "/vite.svg" },
];

export const loader = (args: Route.LoaderArgs) => {
  return rootAuthLoader(args, async ({ request }) => {
    const { getTheme } = await themeSessionResolver(request);
    const { toast, headers } = await getToast(request);

    const { message, type } = toast || { message: "", type: "" };

    return data({ message, type, theme: getTheme() }, { headers });
  });
};

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useRouteLoaderData("root");
  const error = useRouteError();

  const [theme] = useTheme();

  React.useEffect(() => {
    const methods = new Map([
      ["error", notify.error],
      ["success", notify.success],
      ["info", notify.info],
      ["warning", notify.warning],
    ]);

    const toast = methods.get(data.type);

    if (data.type && data.message && toast) toast(data.message);
  }, [data.message, data.type]);

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

      <body className="text-brand-900 dark:bg-brand-800 relative flex min-h-screen w-full flex-col bg-white antialiased md:flex-row dark:text-white">
        <NiceModal.Provider>
          <React.Fragment>
            <Sidebar />
            {children}
          </React.Fragment>

          <React.Fragment>
            <ScrollRestoration />
            <Scripts />
            <Analytics />
          </React.Fragment>

          <React.Fragment>
            <ToastManager position="top-center" theme={theme ?? "dark"} richColors />
            <BreakpointIndicator />
          </React.Fragment>
        </NiceModal.Provider>
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404 ?
        "The requested page could not be found."
      : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

export default function App({ loaderData }: Route.ComponentProps) {
  return (
    <RemixThemesProvider specifiedTheme={loaderData.theme} themeAction="/action/set-theme">
      <ClerkProvider loaderData={loaderData}>
        <Outlet />
      </ClerkProvider>
    </RemixThemesProvider>
  );
}

// export default ClerkApp(Root, {
//   appearance: {
//     layout: { shimmer: true },
//     variables: {
//       colorPrimary: "#7C5DFA",
//       colorBackground: "#FAFAFA",
//       colorDanger: "#EC5757",
//     },
//   },
// });
