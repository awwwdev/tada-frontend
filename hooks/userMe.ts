import { API } from "@/consts";
import { User } from "@/types";
import fetchAPI from "@/utils/fetchAPI";
import { useQuery } from "@tanstack/react-query";

export default function useUserMe() {
  return useQuery<User, Error>({
    queryKey: ["userMe"],
    queryFn: async () => {
      const data = await fetchAPI.GET(`/auth/user`);
      return data.user;
    },
  });
}
