"use client";

import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Icon from "@/components/ui/Icon";
import useTaskMutation from "@/hooks/useTaskMutation";
import useUserMe from "@/hooks/useUserMe";
import { Task } from "@/types";
import fetchAPI from "@/utils/fetchAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useGlobalContex } from "./Provider";
import MobileOnly from "./ui/MobileOnly";
import DesktopOnly from "./ui/DesktopOnly";

export default function TaskItem({ task, dragHandleProps }: { task: Task; dragHandleProps: Object }) {
  const { setSelectedTaskId, selectedTaskId } = useGlobalContex();

  const taskMutation = useTaskMutation();
  const queryClient = useQueryClient();
  const userMeQ = useUserMe();

  const duplicateTaskMutation = useMutation<Task, Error, Task>({
    mutationFn: (copiedTask: Task) => {
      const { id, authorId, createdAt, updatedAt, ...values } = copiedTask;
      return fetchAPI.POST(`/tasks`, { ...values, authorId: userMeQ.data?.id });
    },
    onError: (err) => toast.error("Error: " + err.message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return (
    <li className={`b-base6 rd-3 p-3 pis-6 flex items-center bg-base1 relative  group `}>
      {selectedTaskId === task.id && <TraingleIndicator />}
      <Checkbox
        checked={task.status === "done"}
        onChange={(checked) => taskMutation.mutate({ id: task.id, status: task.status === "done" ? "to-do" : "done" })}
      />
      <SelectArea {...{ dragHandleProps, task }} />
      <div className="mis-auto flex  hover:opacity-100 ">
        {/* <Button variant="text" iconButton onClick={() => setTask({ ...task, deleted: true })}>
          <Icon name="bf-i-ph-trash" className="c-base11" />
          <span className="sr-only">Delete</span>
        </Button> */}
        <Button
          variant="text"
          className={`group-hover:visible invisible `}
          iconButton
          onClick={() => duplicateTaskMutation.mutate(task)}
        >
          <Icon name="bf-i-ph-copy" className="c-base11" />
          <span className="sr-only">Duplicate</span>
        </Button>
        <Button
          variant="text"
          className={`group-hover:visible ${task.pinned ? "visible" : "invisible"} `}
          iconButton
          onClick={() => taskMutation.mutate({ id: task.id, pinned: !task.pinned })}
        >
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
          variant="text"
          className={`group-hover:visible ${task.starred ? "visible" : "invisible"} `}
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

function TraingleIndicator() {
  return (
    <div className="lt-sm:hidden absolute top-50% -translate-y-50% -right-[1.15rem]  z-100  w-6 h-6 overflow-clip scale-y-80 scale-x-100">
      <div className="h-full w-full rotate-135deg rd-br-1.5  b-base7 b-1 bg-base1 translate-x-70%"></div>
    </div>
  );
}

function SelectArea({ task, dragHandleProps }: { task: Task; dragHandleProps: Object }) {
  const { setSelectedTaskId, setDetailsPanelOpen } = useGlobalContex();

  return (
    <>
      <MobileOnly>
        <button
          type="button"
          className="grow cursor-default  h-10 self-stretch text-start"
          onClick={() => {
            setSelectedTaskId(task.id);
            setDetailsPanelOpen(true);
          }}
          {...dragHandleProps}
        >
          <span className="mis-3">{task.label}</span>
          <span className="sr-only">Select This Task</span>
        </button>
      </MobileOnly>
      <DesktopOnly>
        <button
          type="button"
          className="grow cursor-default  h-10 self-stretch text-start"
          onClick={() => {
            setSelectedTaskId(task.id);
          }}
          {...dragHandleProps}
        >
          <span className="mis-3">{task.label}</span>
          <span className="sr-only">Select This Task</span>
        </button>
      </DesktopOnly>
    </>
  );
}
