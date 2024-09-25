"use client";

import QUERY_KEYS from "@/react-query/queryKeys";
import { Task, TasktPorpertisInList } from "@/types";
import fetchAPI from "@/utils/fetchAPI";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import DraggableList from "react-draggable-list";
import { useGlobalContex } from "./Provider";
import TaskItem from "./TaskItem";

import useDeleteList from "@/hooks/useDeleteList";
import useListMutation from "@/hooks/useListMutation";
import useUserMe from "@/hooks/useUserMe";
import UserListDropDown from "./UserListDropDown";

export default function UserList({ listId }: { listId: string }) {
  const listQ = useQuery({
    queryKey: [QUERY_KEYS.LISTS, listId],
    queryFn: () => fetchAPI.GET(`/lists/${listId}`),
  });
  const listTask = (listQ.data?.tasks.map((t: TasktPorpertisInList) => t.task) as Task[]) ?? ([] as Task[]);
  const notDeletedTasks = listTask.filter((t) => !t.deleted);
  if (notDeletedTasks.length === 0) return <EmptyState />;
  const pinnedTasks = notDeletedTasks.filter((t) => t.pinned);
  const notPinnedTasks = notDeletedTasks.filter((t) => !t.pinned);
  const orderedTasks = [...pinnedTasks, ...notPinnedTasks];
  return <List tasks={orderedTasks} listName={listQ.data?.name} listId={listId} />;
}

function List({ tasks, listName, listId }: { tasks: Task[]; listName: string; listId: string }) {
  const userMeQ = useUserMe();
  const { setSelectedUserListId } = useGlobalContex();
  const listQ = useQuery({
    queryKey: [QUERY_KEYS.LISTS, listId],
    queryFn:() => fetchAPI.GET(`/lists/${listId}`),
  });

  const [listNameValue, setListNameValue] = useState<string>(listName ?? "");
  useEffect(() => {
    setListNameValue(listName ?? "");
  }, [listName]);
  const deleteListMutation = useDeleteList();
  const [showModal, setShowModal] = useState<boolean>(false);
  const listMutation = useListMutation({ onSuccess: () => setShowModal(false) });

  return (
    <div className="gap-3 grid overflow-hidden" style={{ gridTemplateRows: "auto 1fr" }}>
      <div className="px-3 flex justify-between">
        <h2 className="H2">{listName}</h2>
        <UserListDropDown listId={listId} />
      </div>
      <ul className=" gap-3 flex flex-col overflow-y-scroll px-3 pb-9">
        {tasks.map((task, index) => {
          return <TaskItem key={index} task={task} dragHandleProps={{}} />;
        })}
      </ul>
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
