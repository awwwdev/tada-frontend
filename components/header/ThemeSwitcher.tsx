// components/client/theme-swither.tsx
"use client";

import { setThemeCookie } from "@/app/actions";
import Icon from "@/components/ui/Icon";
import ToggleGroup from "@/components/ui/ToggleGroup";
import { Settings } from "@/types";
import { useEffect, useState } from "react";
import { useGlobalContex } from "../Provider";
import Card from "../ui/Card";
import Button from "../ui/Button";
import * as RadixToggleGroup from "@radix-ui/react-toggle-group";


type Theme = Settings["theme"];

export const ThemeSwitcher = () => {
  const { theme: themeFromCookie, useSystemTheme } = useGlobalContex();
  const [_theme, _setTheme] = useState<Theme | null>(null);

  const theme = _theme ?? (useSystemTheme ? "system" : themeFromCookie);

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
      await setThemeCookie({ theme: "light", useSystemTheme: false });
    }
    if (to === "system" && getSystemTheme() === "light") {
      changeToLight();
      _setTheme("system");
      await setThemeCookie({ theme: "light", useSystemTheme: true });
    }
    if (to === "system" && getSystemTheme() === "dark") {
      changeToDark();
      _setTheme("system");
      await setThemeCookie({ theme: "dark", useSystemTheme: true });
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
      <RadixToggleGroup.Root value={theme} onValueChange={setTheme}  type="single" >
        <Card className="flex gap-1 w-fit !b-none" size='sm' >
          <RadixToggleGroup.Item  value="light" asChild>
            <Button variant="ghost"  iconButton size='sm'>
              <Icon name="bf-i-ph-sun" />
              <span className="sr-only">Light Color Scheme</span>
            </Button>
          </RadixToggleGroup.Item>
          <RadixToggleGroup.Item  value="dark" asChild>
            <Button variant="ghost"  iconButton size='sm'>
              <Icon name="bf-i-ph-moon" />
              <span className="sr-only">Dark Color Scheme</span>
            </Button>
          </RadixToggleGroup.Item>
          <RadixToggleGroup.Item  value="system" asChild>
            <Button variant="ghost"  iconButton size='sm'>
              <Icon name="bf-i-ph-device-mobile" className="sm:hidden" />
              <Icon name="bf-i-ph-laptop" className="lt-sm:hidden" />
              <span className="sr-only">Follow System Color Scheme</span>
            </Button>
          </RadixToggleGroup.Item>
        </Card>
      </RadixToggleGroup.Root>
    </div>
  );
};

{
  /* <Button variant="ghost" onClick={toogleTheme}>
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
