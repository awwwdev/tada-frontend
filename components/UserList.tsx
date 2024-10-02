"use client";

import type { List as ListType, Task } from "@/types";
import fetchAPI from "@/utils/fetchAPI";
import { useQuery } from "@tanstack/react-query";

import UserListDropDown from "./UserListDropDown";
import List from "./List";

export default function UserList({ listId }: { listId: string }) {
  const tasksQ = useQuery<Task[]>({
    queryKey: ["tasks", "lists", "user-list", listId],
    queryFn: () => fetchAPI.GET(`/tasks?listId=${listId}`),
  });

  const listQ = useQuery<ListType>({
    queryKey: ["lists", listId],
    queryFn: () => fetchAPI.GET(`/lists/${listId}`),
  });

  return (
    <List
      tasks={tasksQ.data ?? []}
      listName={listQ.data?.name ?? ""}
      listControls={<UserListDropDown listId={listId} />}
    />
  );
}

// function List({ tasks, listName, listId }: { tasks: Task[]; listName: string; listId: string }) {

//   return (

//     <div className="gap-3 grid overflow-hidden" style={{ gridTemplateRows: "auto 1fr" }}>
//       <div className="px-4.5 flex justify-between">
//         <h2 className="H2">{listName}</h2>
//         <UserListDropDown listId={listId} />
//       </div>
//       <ul className=" gap-3 flex flex-col overflow-y-scroll px-4.6 pb-9">
//         {tasks.map((task, index) => {
//           return <TaskItem key={index} task={task} dragHandleProps={{}} />;
//         })}
//       </ul>
//     </div>
//   );
// }
