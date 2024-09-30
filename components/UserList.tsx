"use client";

import QUERY_KEYS from "@/react-query/queryKeys";
import { List, Task, TasktPorpertisInList } from "@/types";
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
  const tasksQ = useQuery<Task[]>({
    queryKey: ["tasks", "lists", "user-list", listId],
    queryFn: () => fetchAPI.GET(`/tasks?listId=${listId}`),
  });

  const listQ = useQuery<List>({
    queryKey: ["lists", listId],
    queryFn: () => fetchAPI.GET(`/lists/${listId}`),
  });

  const notDeletedTasks = tasksQ.data?.filter((t) => !t.deleted) ?? [];
  if (notDeletedTasks.length === 0) return <EmptyState />;
  const pinnedTasks = notDeletedTasks.filter((t) => t.pinned);
  const notPinnedTasks = notDeletedTasks.filter((t) => !t.pinned);
  const orderedTasks = [...pinnedTasks, ...notPinnedTasks];
  return <List tasks={orderedTasks} listName={listQ.data?.name ?? ""} listId={listId} />;
}

function List({ tasks, listName, listId }: { tasks: Task[]; listName: string; listId: string }) {

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
        <TaskItem task={item} dragHandleProps={dragHandleProps} />
      </div>
    </div>
  );
}
