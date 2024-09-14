"use client";

import { Task } from "@/types";
import { useLocalStorage } from "usehooks-ts";
import Button from "@/components/ui/button";
import Input from "@/components/ui/Input";
import { makeEmptyTask } from "@/initialData";
import List from "./List";
import { useGlobalContex } from "./Provider";

export default function TasksExplorer() {

  const { listName, setTasks, addTask } = useGlobalContex();
  return (
    <div className="h-full  flex flex-col">
      <List listName='all' />
      <div className="h-12"></div>
      <TaskInput />
    </div>
  );
}

function TaskInput() {
  const [draft, setDraft, removeValue] = useLocalStorage<Task>("darft-task", makeEmptyTask());
  const { addTask } = useGlobalContex();

  return (
    <div>
      <form
        className="mt-auto"
        onSubmit={(e) => {
          e.preventDefault();
          addTask(draft);
          setDraft(makeEmptyTask());
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
    </div>
  );
}
