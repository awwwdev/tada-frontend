"use server";

import { Settings } from '@/types';
import { cookies } from "next/headers";

export async function setThemeCookie({ theme }: { theme: Settings['theme'] }) {
  cookies().set("theme", theme);

  const th = cookies().get("theme");
  // or
}
