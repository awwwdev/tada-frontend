import useUserMe from "@/hooks/useUserMe";
import QUERY_KEYS from "@/react-query/queryKeys";
import { TaskFields } from "@/types";
import fetchAPI from "@/utils/fetchAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useLocalStorage } from "usehooks-ts";
import Input from "./ui/Input";
import Button from "./ui/button";

export default function TaskInput() {
  const queryClient = useQueryClient();
  const [draft, setDraft, removeValue] = useLocalStorage<TaskFields>("darft-task", {
    label: "",
    status: "to-do",
    author: "",
  });
  const userMeQ = useUserMe();
  // const { addTask } = useGlobalContex();
  const addTaskM = useMutation({
    mutationFn: (task: TaskFields) => fetchAPI.POST(`/tasks`, { ...task, author: userMeQ.data?.id }),
    onError: (err) => {
      toast.error("Something went wrong: " + err.message);
    },
    onSuccess: () => {
      setDraft({
        label: "",
        status: "to-do",
        author: "",
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASKS] });
    },
  });

  return (
    <div className="relative">
      <div className="bottom-100% h-6 bg-gradient-to-t from-base1 to-transparent  absolute w-full z-10"></div>
      <div className="h-2 bg-base1"></div>
      <form
        className="mt-auto"
        onSubmit={(e) => {
          e.preventDefault();
          addTaskM.mutate(draft);
        }}
      >
        <div className="flex gap-3 items-end px-3">
          <div className="grow">
            <Input
              name="new-task"
              label=""
              type="text"
              value={draft.label}
              onChange={(e) => setDraft((s) => ({ ...s, label: e.target.value }))}
            />
          </div>
          <Button variation="solid" type="submit" isLoading={addTaskM.isPending} disabled={!userMeQ.data?._id}>
            Add Task
          </Button>
        </div>
      </form>
    </div>
  );
}
