"use client";

import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/Checkbox";
import Icon from "@/components/ui/Icon";
import useTaskMutation from "@/hooks/useTaskMutation";
import useUserMe from "@/hooks/useUserMe";
import QUERY_KEYS from "@/react-query/queryKeys";
import { Task, TaskFields } from "@/types";
import fetchAPI from "@/utils/fetchAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useGlobalContex } from "./Provider";

export default function TaskItem({ task, dragHandleProps }: { task: Task; dragHandleProps: Object }) {
  const { setSelectedTaskId, selectedTaskId } = useGlobalContex();

  const taskMutation = useTaskMutation();
  const queryClient = useQueryClient();
  const userMeQ = useUserMe();

  const duplicateTaskMutation = useMutation<Task, Error, TaskFields>({
    mutationFn: (newTask: TaskFields) =>
      fetchAPI.POST(`/tasks`, { ...newTask, author: userMeQ.data?.id, id: undefined, _id: undefined, createdAt: undefined, updateAt: undefined, __v: undefined }),
    onError: (err) => {
      toast.error("Something went wrong: " + err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASKS] });
    },
  });

  return (
    <li className={`b-1 b-base6 rd-3 p-3 flex items-center bg-mauve3A ${selectedTaskId === task.id && "!b-accent8"}`}>
      <Checkbox
        checked={task.status === "done"}
        onChange={(checked) => {
          taskMutation.mutate({ id: task.id, status: checked ? "done" : "to-do" });
        }}
      />
      <button
        type="button"
        className="grow cursor-default  h-10 self-stretch text-start"
        onClick={() => setSelectedTaskId(task.id)}
        {...dragHandleProps}
      >
        <span className="mis-3">{task.label}</span>
        <span className="sr-only">Select This Task</span>
      </button>
      <div className="mis-auto flex opacity-20 hover:opacity-100">
        {/* <Button variation="text" iconButton onClick={() => setTask({ ...task, deleted: true })}>
          <Icon name="bf-i-ph-trash" className="c-base11" />
          <span className="sr-only">Delete</span>
        </Button> */}
        <Button variation="text" iconButton>
          <Icon name="bf-i-ph-pencil-simple" className="c-base11" />
          <span className="sr-only">Edit</span>
        </Button>
        <Button variation="text" iconButton onClick={() => duplicateTaskMutation.mutate(task)}>
          <Icon name="bf-i-ph-copy" className="c-base11" />
          <span className="sr-only">Duplicate</span>
        </Button>
        <Button variation="text" iconButton onClick={() => taskMutation.mutate({ id: task.id, pinned: !task.pinned })}>
          {task.pinned ? (
            <Icon name="bf-i-ph-push-pin-fill" className="c-accent11" />
          ) : (
            <Icon name="bf-i-ph-push-pin" className="c-base11" />
          )}
          {task.pinned ? (
            <span className="sr-only">Un pin this task</span>
          ) : (
            <span className="sr-only">Pin this task</span>
          )}
        </Button>

        <Button
          variation="text"
          iconButton
          onClick={() => taskMutation.mutate({ id: task.id, starred: !task.starred })}
        >
          {task.starred ? (
            <Icon name="bf-i-ph-star-fill" className="c-accent11" />
          ) : (
            <Icon name="bf-i-ph-star" className="c-base11" />
          )}
          {task.starred ? (
            <span className="sr-only">Un-star this task</span>
          ) : (
            <span className="sr-only">Star this task</span>
          )}
        </Button>

        <div className={`cursor-move px-2 flex items-center`} {...dragHandleProps}>
          <Icon name="bf-i-ph-dots-six-vertical" />
        </div>
      </div>
    </li>
  );
}
