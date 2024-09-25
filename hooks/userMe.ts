import { API } from "@/consts";
import QUERY_KEYS from '@/react-query/queryKeys';
import { User } from "@/types";
import fetchAPI from "@/utils/fetchAPI";
import { useQuery } from "@tanstack/react-query";

export default function useUserMe() {
  return useQuery<User, Error>({
    queryKey: [QUERY_KEYS.USER_ME],
    queryFn: () => fetchAPI.GET(`/auth/user`),
  });
}
