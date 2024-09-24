"use client";

import { Task } from "@/types";
import TaskItem from "./TaskItem";
import { useRef } from "react";
import DraggableList from "react-draggable-list";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useGlobalContex } from "./Provider";
import { useQuery } from "@tanstack/react-query";
import fetchAPI from "@/utils/fetchAPI";
import useUserMe from "@/hooks/userMe";
import QUERY_KEYS from "@/react-query/queryKeys";

export default function UserList({ listName = "all" }: { listName: string }) {
  const userMeQ = useUserMe();
  const allTasksQ = useQuery({
    queryKey: [QUERY_KEYS.TASKS],
    queryFn: async () => {
      const data = await fetchAPI.GET(`/tasks?userId=${userMeQ.data?._id}`);
      return data;
    },
    enabled: !!userMeQ.data?._id,
  });
  const allTasks = allTasksQ.data ?? [];
  const notDeletedTasks = allTasks.filter((t: Task) => !t.deleted);
  if (notDeletedTasks.length === 0) return <EmptyState />;
  const pinnedTasks = notDeletedTasks.filter((t: Task) => t.pinned);
  const notPinnedTasks = notDeletedTasks.filter((t: Task) => !t.pinned);
  const orderedTasks = [...pinnedTasks, ...notPinnedTasks];
  return <ListContentSimple tasks={orderedTasks} listName={listName} />;
}

function ListContentSimple({ tasks, listName }: { tasks: Task[]; listName: string }) {
  const { updateTaskById, addTask } = useGlobalContex();

  return (
    <div className="gap-3 grid">
      <div>
        <h2 className="H2">{listName}</h2>
      </div>
      {tasks.map((task, index) => {
        return (
          <TaskItem key={index} task={task} setTask={(newTask) => updateTaskById({ id: task.id, task: newTask })} />
        );
      })}
    </div>
  );
}

function ListContent({ tasks, listName }: { tasks: Task[]; listName: string }) {
  const listContainerRef = useRef<HTMLDivElement>(null);
  const { setTasks } = useGlobalContex();
  // const [parent, enableAnimations] = useAutoAnimate(/* optional config */)
  return (
    <div ref={listContainerRef} className="" suppressHydrationWarning>
      {/* @ts-ignore */}
      <DraggableList
        itemKey="id"
        template={(props: TemplateProps) => <ListItemTemplate {...props} />}
        list={tasks}
        onMoveEnd={(newList: Task[]) => {
          const pinnedTasks = newList.filter((t: Task) => t.pinned);
          const notPinnedTasks = newList.filter((t: Task) => !t.pinned);
          const newListWithUpdatedOrders = [...pinnedTasks, ...notPinnedTasks].map((t: Task, index: number) => {
            const newTask = { ...t };
            newTask.lists[listName].orderInList = index;
            return newTask;
          });
          setTasks(newListWithUpdatedOrders);
        }}
        container={() => listContainerRef.current}
      />
    </div>
  );
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

  const { updateTaskById, addTask } = useGlobalContex();

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
          setTask={(newTask) => updateTaskById({ id: item.id, task: newTask })}
          dragHandleProps={dragHandleProps}
        />
      </div>
    </div>
  );
}
