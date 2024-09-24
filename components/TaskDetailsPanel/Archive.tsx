"use client";

import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/button";
import QUERY_KEYS from "@/react-query/queryKeys";
import { Task } from "@/types";
import fetchAPI from "@/utils/fetchAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


export default function Archive({ task }: { task: Task }) {
  const queryClient = useQueryClient();
  const archiveTaskM = useMutation({
    mutationFn: async (id: string) => fetchAPI.PUT(`/tasks/${id}`, { archived: !task?.archived }),
    onError: (err) => {
      toast.error("Something went wrong: " + err.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASKS] });
    },
  });
  return (
    <div>
      <Button variation="ghost" onClick={() => archiveTaskM.mutate(task.id)} isLoading={archiveTaskM.isPending}>
        <Icon name="bf-i-ph-archive" className="c-base11" />
        {task?.archived ? "Unarchive" : "Archive"}
      </Button>
    </div>
  );
}
