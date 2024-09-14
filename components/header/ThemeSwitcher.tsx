// components/client/theme-swither.tsx
"use client";

import { Settings } from "@/types";
import { useState } from "react";
import { useGlobalContex } from '../Provider';
import Button from "../ui/button";
import Icon from "../ui/Icon";
import ToggleGroup from '../ui/ToggleGroup';
import { setThemeCookie } from '@/app/actions';

type Theme = Settings["theme"];

interface Props {
  theme: Theme;
}

const THEMES = {
  dark: "dark-theme",
  light: "light-theme",
  // system: 'system-theme',
};

export const ThemeSwitcher = () => {

  const { theme} = useGlobalContex();
  const [_theme, _setTheme] = useState<Theme>(theme);

  const setTheme =  async (th: Theme) => {
    const root = document.getElementsByTagName("html")[0];

    if (th === "dark") {
      // document.cookie = `theme=dark`;
      root.classList.remove("light-theme");
      root.classList.add("dark-theme");
      _setTheme("dark");
      await setThemeCookie({theme: 'dark'});
      
    }
    if (th === "light") {
      // document.cookie = `theme=light`;
      root.classList.remove("dark-theme");
      root.classList.add("light-theme");
      _setTheme("light");
      await setThemeCookie({theme: 'light'});
    }
    // if (theme === "system") {
    }
    

  // const toogleTheme = () => {
  //   const root = document.getElementsByTagName("html")[0];
  //   root.classList.toggle("dark-theme");
  //   if (root.classList.contains("dark")) {
  //     setTheme("dark");
  //     document.cookie = `theme=dark`;
  //   } else {
  //     setTheme("light");
  //     document.cookie = `theme=light`;
  //   }
  // };

  return (
    <ToggleGroup value={_theme} setValue={setTheme} legend="Theme">
      <ToggleGroup.Item value="dark">
        <Icon name="bf-i-ph-moon" />
        <span>Dark</span>
      </ToggleGroup.Item>
      <ToggleGroup.Item value="light" >
        <Icon name="bf-i-ph-sun" />
        <span>Light</span>
      </ToggleGroup.Item>
      {/* <ToggleGroup.Item value="system">
        <Icon name="bf-i-ph-computer" />
        <span>System</span>
      </ToggleGroup.Item> */}
    </ToggleGroup>
  );
};


{/* <Button variation="ghost" onClick={toogleTheme}>
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
</Button> */}
