import { Task } from '@/types';
import fetchAPI from '@/utils/fetchAPI';
import { useMemo } from 'react';
import useUserMe from './userMe';
import { useQuery } from '@tanstack/react-query';
import QUERY_KEYS from '@/react-query/queryKeys';
import { useGlobalContex } from '@/components/Provider';

export default function useSelectedTask() {
  const { selectedTaskId } = useGlobalContex();
  const userMeQ = useUserMe();
  const allTasksQ = useQuery({
    queryKey: [QUERY_KEYS.TASKS],
    queryFn: async () => {
      const data = await fetchAPI.GET(`/tasks?userId=${userMeQ.data?._id}`);
      return data;
    },
    enabled: !!userMeQ.data?._id,
  });

  const selectedTask = useMemo(
    () => {
      if (!allTasksQ.data) return null;
      return allTasksQ.data?.find((t: Task) => t._id === selectedTaskId)
    },
    [allTasksQ.data, selectedTaskId, userMeQ.data?._id]
  );

  return selectedTask
}