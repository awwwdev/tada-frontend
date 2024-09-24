"use client";

import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/Checkbox";
import Icon from "@/components/ui/Icon";
import { Task } from "@/types";
import { useGlobalContex } from "./Provider";

type Callback = (task: Task) => Task;
type SetTask = (arg: Task) => void;
type SetTasks = (arg: Task[]) => void;

export default function TaskItem({
  task,
  setTask,
  dragHandleProps,
}: {
  task: Task;
  setTask: SetTask;
  dragHandleProps: Object;
}) {
  const { setSelectedTask, addTask , selectedTask } = useGlobalContex();

  return (
    <div className={`b-1 b-base6 rd-3 p-3 flex items-center bg-mauve3A ${selectedTask?.id === task.id && '!b-accent8'}`}>
      <Checkbox
        checked={task.status === "done"}
        onChange={(checked) => {
          setTask({ ...task, status: checked ? "done" : "todo" });
        }}
      />
      <button
        type="button"
        className="grow cursor-default  h-10 self-stretch text-start"
        onClick={() => setSelectedTask(task)}
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
          <Icon name="bf-i-ph-pencil" className="c-base11" />
          <span className="sr-only">Edit</span>
        </Button>
        <Button variation="text" iconButton onClick={() => addTask(task)}>
          <Icon name="bf-i-ph-copy" className="c-base11" />
          <span className="sr-only">Duplicate</span>
        </Button>
        <Button variation="text" iconButton onClick={() => setTask({...task, pinned: !task.pinned})}>
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

        <Button variation="text" iconButton onClick={() => setTask({...task, starred: !task.starred})}>
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
    </div>
  );
}
