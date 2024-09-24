"use client";

import Checkbox from "@/components/ui/Checkbox";
import useListMutation from "@/hooks/useListMutation";
import useUserMe from "@/hooks/userMe";
import QUERY_KEYS from "@/react-query/queryKeys";
import { List, Task, TasktPorpertisInList } from "@/types";
import fetchAPI from "@/utils/fetchAPI";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useAutoAnimate } from '@formkit/auto-animate/react';

export default function Lists({ task }: { task: Task }) {
  const userMeQ = useUserMe();

  const listsQ = useQuery({
    queryKey: [QUERY_KEYS.LISTS],
    queryFn: () => fetchAPI.GET(`/lists?userId=${userMeQ.data?._id}`),
    enabled: !!userMeQ.data?._id,
  });

  const listWithThisTask = useMemo(() => {
    if (!listsQ.data) return [];
    return listsQ.data.filter((l: List) => {
      return l.tasks?.some((t: { id: string }) => t.id === task.id);
    });
  }, [listsQ.data]);

  const [showEdit, setShowEdit] = useState<boolean>(false);

  const listMutation = useListMutation();

  const [parentRef, enableAnimations] = useAutoAnimate(/* optional config */)

  return (
    <div className=" ">
      Lists with this task
      <div className="h-3"></div>
      <div>
        <ul className="flex gap-3" ref={parentRef}>
          {listsQ.data &&
            [...listWithThisTask ,  ...listsQ.data.filter((l: List) => !listWithThisTask.includes(l))].map((list: List) => {
              const hasThisTask = listWithThisTask.includes(list) ?? false;
              return (
                <li key={list.id} className="rd-3 p-3 b-1 b-base6 bg-base2">
                  <Checkbox
                    label={list.name}
                    checked={hasThisTask}
                    value={list.id}
                    onChange={() => {
                      listMutation.mutate({
                        id: list.id,
                        tasks: hasThisTask
                          ? list.tasks.filter((t: TasktPorpertisInList) => t.id !== task.id)
                          : [...list.tasks, { id: task.id, addedAt: new Date(), orderInList: list.tasks?.length }],
                      });
                    }}
                  />
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
