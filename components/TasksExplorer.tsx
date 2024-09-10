"use client";

import { Task } from "@/types";
import TaskItem from "@/components/TaskItem";
import { useLocalStorage } from "usehooks-ts";
import { v4 as uuid } from "uuid";
import Button from "@/components/ui/button";
import Input from "@/components/ui/Input";
import Pre from "@/components/ui/Pre";
import { EMPTY_TASK } from '@/constants';
import List from './List';

const items: Task[] = [
  { status: "todo", label: "Buy Bilk", dateCreated: new Date() },
  { status: "done", label: "Buy Soap", dateCreated: new Date() },
  { status: "todo", label: "Excercise", dateCreated: new Date() },
];

export default function TasksExplorer() {
  // const draftTaskId = useId();
  const [draft, setDraft, removeValue] = useLocalStorage<Task>("darft-task", EMPTY_TASK);

  const [tasks, setTasks, removeTasks] = useLocalStorage<Task[]>("tasks", []);

  return (
    <div className="">
      <List tasks={tasks} setTasks={setTasks} />
      <div className="h-12"></div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const draftId = uuid();
          setTasks((currentTasks) => [...currentTasks, { ...draft,  id: draftId, dateCreated: new Date() }]);
          setDraft(EMPTY_TASK);
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
          <Button variation="solid" type="submit">
            Add Task
          </Button>
        </div>
      </form>

      <div className="h-12"></div>
      <div>
        <h2 className="H4">Tasks</h2>
        <Pre>{JSON.stringify(tasks, null, 2)}</Pre>
      </div>
    </div>
  );
}

