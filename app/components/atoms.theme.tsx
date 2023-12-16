import { IconMoon, IconSun } from "@/common";
import { tw } from "@/helpers/utils";
import React from "react";
import { Theme, useTheme } from "remix-themes";
import { ClientOnly } from "./client-only";

export const ThemeIcon = () => {
  const [theme, setTheme] = useTheme();
  const [isPending, startTransition] = React.useTransition();

  const isDarkMode = theme === Theme.DARK;
  const Icon = isDarkMode ? IconSun : IconMoon;

  const update = React.useCallback(() => {
    startTransition(() => {
      setTheme(isDarkMode ? Theme.LIGHT : Theme.DARK);
    });
  }, [isDarkMode, setTheme]);

  return (
    <ClientOnly fallback={<ThemeIconFallback />}>
      {() => (
        <button
          type="button"
          title="Toggle Theme"
          className={tw(
            "flex aspect-square w-5 items-center justify-center",
            isPending && "opacity-80",
          )}
          onClick={update}
        >
          <Icon className="transition duration-200 ease-in-out" />
          <span className="sr-only">Toggle theme</span>
        </button>
      )}
    </ClientOnly>
  );
};

function ThemeIconFallback() {
  return (
    <button
      type="button"
      title="Toggle Theme"
      className="flex aspect-square w-5 items-center justify-center"
    >
      <IconSun className="transition duration-200 ease-in-out" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
