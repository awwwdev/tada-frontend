"use client";

import { useGlobalContex } from "@/components/Provider";
import useUserMe from "@/hooks/userMe";
import QUERY_KEYS from "@/react-query/queryKeys";
import { Task } from "@/types";
import fetchAPI from "@/utils/fetchAPI";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import Archive from "./Archive";
import Delete from "./Delete";
import Lists from "./Lists";
import Note from "./Note";
import Title from "./Title";
import useSelectedTask from '@/hooks/useSelectedTask';

export default function TaskDetailsPanel() {
  const { selectedTaskId } = useGlobalContex();
  const userMeQ = useUserMe();
  const selectedTaskQ = useQuery({
    queryKey: [QUERY_KEYS.TASKS, selectedTaskId],
    queryFn: () => fetchAPI.GET(`/tasks/${selectedTaskId}`),
    enabled: !!userMeQ.data?._id && !!selectedTaskId,
  });


  return (
    <div className="rd-3 p-6 b-1 b-base6">
      {!selectedTaskQ.data && <EmptyState />}
      {selectedTaskQ.data && <TaskDetailsContent task={selectedTaskQ.data} />}
    </div>
  );
}

function EmptyState() {
  return <div className="w-full h-full flex items-center justify-center b-base11 italic">No task is selected</div>;
}

function TaskDetailsContent({ task }: { task: Task }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-end gap-3">
        <p>Starred</p>
        <p>Pinned</p>
      </div>
      <Title task={task} />
      <div className="h-12"></div>
      <Line />
      <Note task={task} />
      <Line />
      <Lists task={task} />
      <Line />
      {/* <Steps task={task} /> */}
      {/* <Line /> */}
      {/* <Emojies task={task} /> */}
      {/* <Line /> */}
      {/* <Due task={task} /> */}
      {/* <Line /> */}
      {/* <Reminders task={task} /> */}
      {/* <Line /> */}
      {/* <Routines task={task} /> */}
      {/* <Line /> */}
      {/* <Attachements task={task} /> */}
      {/* <Line /> */}
      {/* <PreTasks task={task} /> */}
      {/* <Line /> */}
      {/* <PostTasks task={task} /> */}
      {/* <Line /> */}
      {/* <AsingedTo task={task} /> */}
      {/* <Line /> */}
      {/* <Comments task={task} /> */}
      {/* <Line /> */}
      <Archive task={task} />
      <Line />
      <Delete task={task} />
    </div>
  );
}

function Line() {
  return <div className="b-t-1 b-base6"></div>;
}

function AsingedTo({ task }: { task: Task }) {
  return <div>Assinged To</div>;
}

function Comments({ task }: { task: Task }) {
  return <div>Comments</div>;
}
function Due({ task }: { task: Task }) {
  return <div>Due Date</div>;
}

function Emojies({ task }: { task: Task }) {
  return <div>Emojies</div>;
}

function Reminders({ task }: { task: Task }) {
  return <div>Reminders</div>;
}

function Routines({ task }: { task: Task }) {
  return <div>Routines</div>;
}

function Attachements({ task }: { task: Task }) {
  return <div>Atachements</div>;
}

function PreTasks({ task }: { task: Task }) {
  return <div>PreTasks</div>;
}

function PostTasks({ task }: { task: Task }) {
  return <div>PostTasks</div>;
}

function Steps({ task }: { task: Task }) {
  return <div>Steps</div>;
}
