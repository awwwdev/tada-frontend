"use client";

import { useGlobalContex } from "@/components/Provider";
import Icon from '@/components/ui/Icon';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import RadioGroup from "@/components/ui/RadioGroup";
import useUserMe from '@/hooks/userMe';
import QUERY_KEYS from '@/react-query/queryKeys';
import { Settings } from "@/types";
import fetchAPI from '@/utils/fetchAPI';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function Page() {
  const userMeQ = useUserMe();
  const settings = userMeQ.data?.settings;
  const queryClient = useQueryClient();
  const settingsMutation = useMutation({
    mutationFn: async (changedSettings: Partial<Settings>) => fetchAPI.PUT(`/settings/${userMeQ.data?._id}`, changedSettings),
    onError: (err) => {
      toast.error("Something went wrong: " + err.message);
    },
    onSuccess: (data) => {
      toast.success("Settings updated successfully");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERME] });
    },
  });

  if (userMeQ.isLoading || !settings) return <LoadingSpinner />;

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
        setValue={(th) => settingsMutation.mutate({ theme: th as Settings["theme"] })}
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
        setValue={(s) => settingsMutation.mutate({ startOfWeek: s as Settings["startOfWeek"] })}
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
