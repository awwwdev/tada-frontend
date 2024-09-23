import { makeEmptyTask } from '@/initialData';
import { useGlobalContex } from './Provider';
import { useLocalStorage } from 'usehooks-ts';
import Input from './ui/Input';
import Button from './ui/button';
import { Task, TaskFields } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API } from '@/consts';
import toast from 'react-hot-toast';
import useUserMe from '@/hooks/userMe';
import fetchAPI from '@/utils/fetchAPI';

export default function TaskInput() {

  const queryClient = useQueryClient();
  const [draft, setDraft, removeValue] = useLocalStorage<TaskFields>("darft-task", {
    label: "",
    status: "to-do",
    author: ""
  });
  const userMeQ = useUserMe();
  // const { addTask } = useGlobalContex();
  const addTaskM = useMutation({
    mutationFn: async (task: TaskFields) => {
      const data = await fetchAPI(`/tasks`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...task, author: userMeQ.data?.id }),
      });
      return data
    },
    onError: (err) => {
      console.log('dfdfsd')
      toast.error("Something went wrong: " + err.message);
    },
    onSuccess: () => {
      setDraft({
        label: "",
        status: "to-do",
        author: ""
      });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

    }
  })

  return (
    <div>
      <form
        className="mt-auto"
        onSubmit={(e) => {
          e.preventDefault();
          addTaskM.mutate(draft);
        }}
      >
        <div className="flex gap-3 items-end">
          <div className="grow">
            <Input
              name="new-task"
              label=""
              type="text"
              value={draft.label}
              onChange={(e) => setDraft((s) => ({ ...s, label: e.target.value }))}
            />
          </div>
          <Button variation="solid" type="submit" isLoading={addTaskM.isPending} disabled={!userMeQ.data?.id}>
            Add Task
          </Button>
        </div>
      </form>
    </div>
  );
}
