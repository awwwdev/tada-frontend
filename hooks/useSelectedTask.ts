import { Task } from '@/types';
import fetchAPI from '@/utils/fetchAPI';
import { useMemo } from 'react';
import useUserMe from './useUserMe';
import { useQuery } from '@tanstack/react-query';
import QUERY_KEYS from '@/react-query/queryKeys';
import { useGlobalContex } from '@/components/Provider';

export default function useSelectedTask() {
  const userMeQ = useUserMe();
  const { selectedTaskId } = useGlobalContex();
  const allTasksQ = useQuery({
    queryKey: [QUERY_KEYS.TASKS],
    queryFn: async () => fetchAPI.GET(`/tasks`),
  });

  const selectedTask = useMemo(
    () => {
      if (!allTasksQ.data) return null;
      return allTasksQ.data?.find((t: Task) => t.id === selectedTaskId)
    },
    [allTasksQ.data, selectedTaskId, userMeQ.data?.id]
  );

  return selectedTask
}