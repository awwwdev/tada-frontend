"use client";

import { Task } from "@/types";
import { useGlobalContex } from "./Provider";
import { useLocalStorage } from 'usehooks-ts';

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

  const handleTaskChange = (newTask: Task) => {
    const otherTasks = tasks.filter((t: Task) => t.id !== task.id);
    return [...otherTasks, newTask]
  }
  return (
    <div>
      <dl>
        <DescriptionItem term={<span className='sr-only'>Task Label</span>} >{task.label}</DescriptionItem>
        <DescriptionItem term="description" >{task.description}</DescriptionItem>
        <DescriptionItem term="Created On" >{task.dateCreated?.toISOString?.()}</DescriptionItem>
        <DescriptionItem term="Steps" >{task.status}</DescriptionItem>
        <DescriptionItem term="Due Date" >{task.status}</DescriptionItem>
        <DescriptionItem term="Reminders" >{task.status}</DescriptionItem>
        <DescriptionItem term="Repeat This Task" >{task.status}</DescriptionItem>
        <DescriptionItem term="Status" >{task.status}</DescriptionItem>
        <DescriptionItem term="Status" >{task.status}</DescriptionItem>
      </dl>
    </div>
  );
}


function DescriptionItem({ term , children}: {term: React.ReactNode, children: React.ReactNode}){

return (
  <div className='flex gap-3' >
    <dt className='c-base11'>{term}</dt>
    <dd>{children}</dd>
  </div>
)};