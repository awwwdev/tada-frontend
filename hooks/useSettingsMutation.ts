import QUERY_KEYS from '@/react-query/queryKeys';
import { Settings } from '@/types';
import fetchAPI from '@/utils/fetchAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useUserMe from './useUserMe';

export default () => {
  const userMeQ = useUserMe();
  const queryClient = useQueryClient();
  const settingsMutation = useMutation({
    mutationFn: async (changedSettings: Partial<Settings>) =>
      fetchAPI.PUT(`/settings/${userMeQ.data?.id}`, changedSettings),
    onError: (err) => {
      toast.error("Error: " + err.message);
    },
    onSuccess: (data) => {
      toast.success("Settings updated successfully");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_ME] });
    },
  });
  return settingsMutation;
}