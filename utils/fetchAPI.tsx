import { API } from "@/consts";

export default async function fetchAPI(url: string, options: RequestInit) {
  const _url = url.startsWith("/") ? url.replace('/', '') : url;
  const res = await fetch(`${API}/${_url}`, options);
  // if (!res.ok) throw new Error('Network response was not ok');
  const json = await res.json();
  if (!res.ok) throw new Error(json.message);
  return json;
}
