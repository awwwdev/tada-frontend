// components/client/theme-swither.tsx
"use client";

import { setThemeCookie } from "@/app/actions";
import Icon from "@/components/ui/Icon";
import ToggleGroup from "@/components/ui/ToggleGroup";
import { Settings } from "@/types";
import { useEffect, useState } from "react";
import { useGlobalContex } from "../Provider";

type Theme = Settings["theme"];

export const ThemeSwitcher = () => {
  const { theme: themeFromCookie , useSystemTheme} = useGlobalContex();
  const [_theme, _setTheme] = useState<Theme | null>(null);

  const theme = _theme ?? (useSystemTheme ? 'system' : themeFromCookie);

  const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };
  // const systemTheme = useOSTheme();

  const setTheme = async (to: Theme) => {
    async function changeToDark() {
      root.classList.remove("light-theme");
      root.classList.add("dark-theme");
    }

    async function changeToLight() {
      root.classList.remove("dark-theme");
      root.classList.add("light-theme");
    }

    const root = document.getElementsByTagName("html")[0];

    if (to === "dark") {
      changeToDark();
      _setTheme("dark");
      await setThemeCookie({ theme: "dark", useSystemTheme: false });
    }
    if (to === "light") {
      changeToLight();
      _setTheme("light");
      await setThemeCookie({ theme: "light" , useSystemTheme: false });
    }
    if (to === "system" && getSystemTheme() === "light") {
      changeToLight();
      _setTheme("system");
      await setThemeCookie({ theme: "light" , useSystemTheme: true });
    }
    if (to === "system" && getSystemTheme() === "dark") {
      changeToDark();
      _setTheme("system");
      await setThemeCookie({ theme: "dark" , useSystemTheme: true });
    }
  };

  useEffect(() => {
    if (theme === "system") setTheme("system");
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
      if (theme === "system") setTheme("system");
    });
  }, []);


  return (
    <div>
      <ToggleGroup<Theme>
        value={theme}
        setValue={setTheme}
      >
        <ToggleGroup.Item value="light">
          <Icon name="bf-i-ph-sun" />
          <span className="sr-only">Light Color Scheme</span>
        </ToggleGroup.Item>
        <ToggleGroup.Item value="dark">
          <Icon name="bf-i-ph-moon" />
          <span className="sr-only">Dark Color Scheme</span>
        </ToggleGroup.Item>
        <ToggleGroup.Item value="system">
          <Icon name="bf-i-ph-device-mobile" className="sm:hidden" />
          <Icon name="bf-i-ph-laptop" className="lt-sm:hidden" />
          <span className="sr-only">Follow System Color Scheme</span>
        </ToggleGroup.Item>
      </ToggleGroup>
    </div>
  );
};

{
  /* <Button variation="ghost" onClick={toogleTheme}>
{_theme == "dark" && (
  <>
    <Icon name="bf-i-ph-moon" />
    <span>Dark</span>
  </>
)}
{_theme == "light" && (
  <>
    <Icon name="bf-i-ph-sun" />
    <span>Light</span>
  </>
)}
{_theme == "system" && (
  <>
    <Icon name="bf-i-ph-computer" />
    <span>System</span>
  </>
)}
</Button> */
}
