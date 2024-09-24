import { API } from "@/consts";
import { User } from "@/types";
import fetchAPI from "@/utils/fetchAPI";
import { useQuery } from "@tanstack/react-query";

export default function useUserMe() {
  return useQuery<User, Error>({
    queryKey: ["userMe"],
    queryFn: async () => {
      const res = await fetchAPI.GET(`/auth/user`);
      const json = await res.json();
      return json.user;
    },
  });
}
