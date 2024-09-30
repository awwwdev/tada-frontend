"use client";

import QUERY_KEYS from "@/react-query/queryKeys";
import { Task } from "@/types";
import fetchAPI from "@/utils/fetchAPI";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import DraggableList from "react-draggable-list";
import List from '../List';
import { useGlobalContex } from "../Provider";
import TaskItem from "../TaskItem";

export default function AllTasksList() {
  const allTasksQ = useQuery({
    queryKey: [QUERY_KEYS.TASKS],
    queryFn: () => fetchAPI.GET(`/tasks`),
  });
  const notDeletedTasks = allTasksQ.data?.filter((t: Task) => !t.deleted) ?? [];
  if (notDeletedTasks.length === 0) return <EmptyState />;
  const pinnedTasks = notDeletedTasks.filter((t: Task) => t.pinned);
  const notPinnedTasks = notDeletedTasks.filter((t: Task) => !t.pinned);
  const orderedTasks = [...pinnedTasks, ...notPinnedTasks];
  return <List tasks={orderedTasks} listName={"All Tasks"} />;
}


// function ListContent({ tasks, listName }: { tasks: Task[]; listName: string }) {
//   const listContainerRef = useRef<HTMLDivElement>(null);
//   // const [parent, enableAnimations] = useAutoAnimate(/* optional config */)
//   return (
//     <div ref={listContainerRef} className="" suppressHydrationWarning>
//       {/* @ts-ignore */}
//       <DraggableList
//         itemKey="id"
//         template={(props: TemplateProps) => <ListItemTemplate {...props} />}
//         list={tasks}
//         onMoveEnd={(newList: Task[]) => {
//           const pinnedTasks = newList.filter((t: Task) => t.pinned);
//           const notPinnedTasks = newList.filter((t: Task) => !t.pinned);
//           const newListWithUpdatedOrders = [...pinnedTasks, ...notPinnedTasks].map((t: Task, index: number) => {
//             const newTask = { ...t };
//             newTask.lists[listName].orderInList = index;
//             return newTask;
//           });
//           setTasks(newListWithUpdatedOrders);
//         }}
//         container={() => listContainerRef.current}
//       />
//     </div>
//   );
}

function EmptyState() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <p className="c-base11 italic">No Task in this list</p>
    </div>
  );
}

type TemplateProps = {
  item: Task;
  itemSelected: number;
  dragHandleProps: object;
};

function ListItemTemplate({ item, itemSelected, dragHandleProps }: TemplateProps) {
  const scale = itemSelected * 0.05 + 1;
  const shadow = itemSelected * 15 + 1;
  const dragged = itemSelected !== 0;


  return (
    <div
      className={`overflow-hidden max-h-[100%] rd-3
        ${dragged ? "dragged" : ""} `}
      style={{
        transformOrigin: "30% 50% 0px",
        transform: `scale(${scale})`,
        boxShadow: `rgba(0, 0, 0, 0.3) 0px ${shadow}px ${2 * shadow}px 0px`,
      }}
    >
      <div className="grid" style={{ gridTemplateColumns: "1fr auto" }}>
        <TaskItem
          task={item}
          // setTask={(newTask) => updateTaskById({ id: item.id, task: newTask })}
          dragHandleProps={dragHandleProps}
        />
      </div>
    </div>
  );
}
