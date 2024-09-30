"use client";

import Checkbox from "@/components/ui/Checkbox";
import useTaskMutation from '@/hooks/useTaskMutation';
import useUserMe from "@/hooks/useUserMe";
import QUERY_KEYS from "@/react-query/queryKeys";
import { List, ListFields, Task } from "@/types";
import fetchAPI from "@/utils/fetchAPI";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Lists({ task }: { task: Task }) {
  const userMeQ = useUserMe();

  const listsQ = useQuery({
    queryKey: [QUERY_KEYS.LISTS],
    queryFn: () => fetchAPI.GET(`/lists?userId=${userMeQ.data?.id}`),
    enabled: !!userMeQ.data?.id,
  });

  // const listWithThisTask = useMemo(() => {
  //   if (!listsQ.data) return [];
  //   return listsQ.data.filter((l: List) => {
  //     return l.tasks?.some((t: { id: string }) => t.id === task.id);
  //   });
  // }, [listsQ.data, task]);

  const [showEdit, setShowEdit] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const taskMutation = useTaskMutation();

  const listMutation = useMutation<List , Error , Partial<ListFields> & { id: string}>({
    mutationFn: async ({ id, ...updates }: Partial<ListFields> & { id: string }) =>
      fetchAPI.PUT(`/lists/${id}`, { ...updates, id: undefined, _id: undefined }),
    onError: (err) => {
      toast.error("Error: " + err.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LISTS] });
    },
  });

  const [parentRef, enableAnimations] = useAutoAnimate(/* optional config */);

  return (
    <div className=" ">
      Lists with this task
      <div className="h-3"></div>
      <div>
        <ul className="flex gap-3" ref={parentRef}>
          {listsQ.data &&
            listsQ.data.map(
              (list: List) => {
                return (
                  <li key={list.id} className="rd-3 p-3 b-1 b-base6 bg-base2">
                    <Checkbox
                      label={list.name}
                      checked={task.listId === list.id}
                      value={list.id}
                      onChange={() => {
                        taskMutation.mutate({
                          id: task.id,
                          listId: task.listId === list.id ? null : list.id,
                        });
                      }}
                    />
                  </li>
                );
              }
            )}
        </ul>
      </div>
    </div>
  );
}
