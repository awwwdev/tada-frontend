import { makeEmptyTask } from '@/initialData';
import { useGlobalContex } from './Provider';
import { useLocalStorage } from 'usehooks-ts';
import Input from './ui/Input';
import Button from './ui/button';
import {  TaskFields } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useUserMe from '@/hooks/userMe';
import fetchAPI from '@/utils/fetchAPI';
import QUERY_KEYS from '@/react-query/queryKeys';

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
      const data = await fetchAPI.POST(`/tasks`, { ...task, author: userMeQ.data?.id });
      return data
    },
    onError: (err) => {
      toast.error("Something went wrong: " + err.message);
    },
    onSuccess: () => {
      setDraft({
        label: "",
        status: "to-do",
        author: ""
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASKS] });

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
          <Button variation="solid" type="submit" isLoading={addTaskM.isPending} disabled={!userMeQ.data?._id}>
            Add Task
          </Button>
        </div>
      </form>
    </div>
  );
}
