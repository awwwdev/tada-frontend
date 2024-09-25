import QUERY_KEYS from "@/react-query/queryKeys";
import { TaskFields } from "@/types";
import fetchAPI from "@/utils/fetchAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useTaskMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<TaskFields> & { id: string }) =>
      fetchAPI.PUT(`/tasks/${id}`, { ...updates, id: undefined, _id: undefined }),
    onError: (err) => {
      toast.error("Something went wrong: " + err.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASKS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LISTS] });
    },
  });
}
