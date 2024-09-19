import { API } from '@/consts';
import { User } from '@/types';
import { useQuery } from '@tanstack/react-query';

export default function useUserMe(){
  return useQuery<User, Error>({
    queryKey: ["userMe"],
    queryFn: async () => {
      const res = await fetch(`${API}/auth/user`, {
        credentials: "include",
      });
      const json = await res.json();
      return json.user;
    },
  })}