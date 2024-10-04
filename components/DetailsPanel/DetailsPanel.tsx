"use client";

import { useGlobalContex } from "@/components/Provider";
import { Task } from "@/types";
import fetchAPI from "@/utils/fetchAPI";
import { useQuery } from "@tanstack/react-query";
import Line from "../ui/Line";
import Archive from "./Archive";
import Delete from "./Delete";
import Lists from "./Lists";
import Note from "./Note";
import PinButton from "./PinButton";
import StarButton from "./StarButton";
import Title from "./Title";
import MobileOnly from '../ui/MobileOnly';
import DesktopOnly from '../ui/DesktopOnly';
import Drawer from '../ui/Drawer';

export default function TaskDetailsPanel() {

  const { detailsPanelOpen , setDetailsPanelOpen  } = useGlobalContex();
  return (
    <>
      <MobileOnly>
        <Drawer open={detailsPanelOpen} setOpen={setDetailsPanelOpen} disabled={false} side="right" >
          <TaskDetailsPanelContent className="max-w-[70vw] " />
        </Drawer>
      </MobileOnly>
      <DesktopOnly>
        <TaskDetailsPanelContent />
      </DesktopOnly>
    </>
  );
}


function TaskDetailsPanelContent({className}: {className?: string}) {
  const { selectedTaskId } = useGlobalContex();
  const selectedTaskQ = useQuery({
    queryKey: ["tasks", selectedTaskId],
    queryFn: () => fetchAPI.GET(`/tasks/${selectedTaskId}`),
    enabled: !!selectedTaskId,
  });

  return (
    <div className={` p-6   b-s-1 b-base6 h-full bg-base1 ${className}`}>
      {!selectedTaskQ.data && <EmptyState />}
      {selectedTaskQ.data && <TaskDetailsContent task={selectedTaskQ.data} />}
    </div>
  );
}

function EmptyState() {
  return <div className="w-full h-full py-6 flex items-center justify-center b-base11 italic">No task is selected</div>;
}

function TaskDetailsContent({ task }: { task: Task }) {
  return (
    <div className="flex flex-col gap-3 h-full ">
      <div className="flex gap-3">
        <Title task={task} />
      </div>
      <Line />
      <div className="flex  gap-3">
        <div className="mis-auto flex gap-3">
          <StarButton task={task} />
          <PinButton task={task} />
        </div>
      </div>
      <Line />
      <Note task={task} />
      {/* <Line /> */}
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
      <div className="mt-auto"></div>
      <Line />
      <Lists task={task} />
      <Line />
      <div className="flex gap-3 justify-end ">
        <Archive task={task} />
        <Delete task={task} />
      </div>
    </div>
  );
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
