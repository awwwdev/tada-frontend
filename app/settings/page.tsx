"use client";

import { useGlobalContex } from "@/components/Provider";
import Icon from '@/components/ui/Icon';
import RadioGroup from "@/components/ui/RadioGroup";
import { Settings } from "@/types";
import Link from 'next/link';

export default function Page() {
  const { settings, setSettings } = useGlobalContex();
  return (
    <div className="p-6 max-w-page mx-auto">
      <Link href="/" className="c-base11 text-sm">
        <Icon name="bf-i-ph-arrow-left" className="mie-1.5 c-base11" />
        <span className="">Back to Home</span>
      </Link>
      <h1 className="H1"> Settings</h1>
      <div className="h-12"></div>
      <RadioGroup
        legend={<span className="H3">Theme</span>}
        name="theme"
        value={settings.theme}
        setValue={(th) => setSettings({ ...settings, theme: th as Settings["theme"] })}
      >
        <RadioGroup.Item label="Light" value="light"></RadioGroup.Item>
        <RadioGroup.Item label="Dark" value="dark"></RadioGroup.Item>
        <RadioGroup.Item label="System" value="system"></RadioGroup.Item>
      </RadioGroup>
      <div className="h-12"></div>
      <RadioGroup
        legend={<span className="H3">Start of Week</span>}
        name="startOfWeek"
        value={settings.startOfWeek}
        setValue={(s) => setSettings({ ...settings, startOfWeek: s as Settings["startOfWeek"] })}
      >
        <RadioGroup.Item label="Sunday" value="sunday"></RadioGroup.Item>
        <RadioGroup.Item label="Monday" value="monday"></RadioGroup.Item>
        <RadioGroup.Item label="Tuesday" value="tuesday"></RadioGroup.Item>
        <RadioGroup.Item label="Wednesday" value="wednesday"></RadioGroup.Item>
        <RadioGroup.Item label="Thursday" value="thursday"></RadioGroup.Item>
        <RadioGroup.Item label="Friday" value="friday"></RadioGroup.Item>
        <RadioGroup.Item label="Saturday" value="saturday"></RadioGroup.Item>
      </RadioGroup>
    </div>
  );
}
