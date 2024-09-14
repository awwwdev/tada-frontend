"use client";

import { Task } from "@/types";
import { useGlobalContex } from "./Provider";
import { useLocalStorage } from "usehooks-ts";

export default function TaskDetailsPanel() {
  const { selectedTask } = useGlobalContex();

  return (
    <div className="rd-3 p-6 b-1 b-base6">
      {!selectedTask && <EmptyState />}
      {selectedTask && <TaskDetailsContent task={selectedTask} />}
    </div>
  );
}

function EmptyState() {
  return <div className="w-full h-full flex items-center justify-center b-base11 italic">No task is selected</div>;
}

function TaskDetailsContent({ task }: { task: Task }) {
  const [tasks, setTasks, removeTasks] = useLocalStorage<Task[]>("tasks", []);

  const setTask = (newTask: Task) => {
    const otherTasks = tasks.filter((t: Task) => t.id !== task.id);
    setTasks([...otherTasks, newTask]);
  };
  return (
    <div>
      <Title {...{ task, setTask }} />
      <div className="h-12"></div>
      <Steps {...{ task, setTask }} />
      <Note {...{ task, setTask }} />
      <Emojies {...{ task, setTask }} />
      <Reminders {...{ task, setTask }} />
      <Repetition {...{ task, setTask }} />
      <AsingedTo {...{ task, setTask }} />
      <Comments {...{ task, setTask }} />
      <Archive {...{ task, setTask }} />
      <Delete {...{ task, setTask }} />
    </div>
  );
}

type Props = { task: Task; setTask: (t: Task) => void };

function Title({ task, setTask }: Props) {
  return (
    <div>
      <h3 className="H2">{task.label}</h3>
    </div>
  );
}

function Archive({ task, setTask }: Props) {
  return <div>Archive</div>;
}

function AsingedTo({ task, setTask }: Props) {
  return <div>Assing</div>;
}

function Comments({ task, setTask }: Props) {
  return <div>Comments</div>;
}

function Delete({ task, setTask }: Props) {
  return <div>Delete</div>;
}

function Emojies({ task, setTask }: Props) {
  return <div>Emojies</div>;
}

function Note({ task, setTask }: Props) {
  return <div>Note</div>;
}

function Reminders({ task, setTask }: Props) {
  return <div>Reminders</div>;
}

function Repetition({ task, setTask }: Props) {
  return <div>Repetition</div>;
}

function Steps({ task, setTask }: Props) {
  return <div>Steps</div>;
}

function DescriptionItem({ term, children }: { term: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <dt className="c-base11">{term}</dt>
      <dd>{children}</dd>
    </div>
  );
}
