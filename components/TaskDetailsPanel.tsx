"use client";

import { Task } from "@/types";
import { useGlobalContex } from "./Provider";
import { useLocalStorage } from "usehooks-ts";
import TextArea from '@/components/ui/TextArea';
import { useCallback } from 'react';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/button';
import Input from '@/components/ui/Input';

export default function TaskDetailsPanel() {
  const { selectedTask } = useGlobalContex();

  return (
    <div className="rd-3 p-6 b-1 b-base6">
      {!selectedTask && <EmptyState />}
      {selectedTask && <TaskDetailsContent  />}
    </div>
  );
}

function EmptyState() {
  return <div className="w-full h-full flex items-center justify-center b-base11 italic">No task is selected</div>;
}

function TaskDetailsContent() {
  const {updateTaskById, selectedTask } = useGlobalContex();
  const task = selectedTask as Task
  const setTask = useCallback((newTask: Task) => updateTaskById({id: selectedTask.id, task: newTask}) , [selectedTask.id]);
  return (
    <div>
      <Title {...{ task, setTask }} />
      <div className="h-12"></div>
      <Line />
      <Note {...{ task, setTask }} />
      <Line />
      <Steps {...{ task, setTask }} />
      <Line />
      <Emojies {...{ task, setTask }} />
      <Line />
      <Reminders {...{ task, setTask }} />
      <Line />
      <Repetition {...{ task, setTask }} />
      <Line />
      <AsingedTo {...{ task, setTask }} />
      <Line />
      <Comments {...{ task, setTask }} />
      <Line />
      <Archive {...{ task, setTask }} />
      <Line />
      <Delete {...{ task, setTask }} />
    </div>
  );
}

function Line(){

return (
  <div className='b-t-1 b-base6'>

  </div>
)};

type Props = { task: Task; setTask: (t: Task) => void };

function Title({ task, setTask }: Props) {
  const {updateTaskById, selectedTask } = useGlobalContex();
  return (
    <div>
      <Input label='Title' value={task.label} onChange={(e) => updateTaskById({id: selectedTask?.id , task: {...task, label: e.target.value}})} />
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
  return <div>
    <Button variation="ghost" onClick={() => setTask({ ...task, deleted: true })}>
      <Icon name="bf-i-ph-trash" className="c-base11" />
      <span className="">Delete</span>
      </Button>
  </div>;
}

function Emojies({ task, setTask }: Props) {
  return <div>Emojies</div>;
}

function Note({ task, setTask }: Props) {
  const {updateTaskById, selectedTask } = useGlobalContex();

  return <div>
    <TextArea name='note' label="Note" value={task.note} onChange={(e) => updateTaskById({id: selectedTask?.id , tass: {...task, note: e.target.value}})} />
  </div>;
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
