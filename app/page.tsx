"use client";

import TaskDetailsPanel from "@/components/TaskDetailsPanel";

import Header from "@/components/header";
import ListsPanel from "@/components/ListsPanel";
import TaskInput from "@/components/TaskInput";
import UserList from "@/components/UserList";
import { useGlobalContex } from "@/components/Provider";
import AllTasksList from "@/components/AllTaskList";

export default function Page() {
  const { selectedTaskId, selectedUserListId } = useGlobalContex();
  return (
    <div className="grid gap-6 h-[100vh] p-6" style={{ gridTemplateRows: "auto 1fr" }}>
      <Header />
      <div className="grid gap-6 " style={{ gridTemplateColumns: "1fr 3fr 3fr" }}>
        <ListsPanel />
        <div className="h-full  flex flex-col">
          {selectedUserListId ? <UserList listId={selectedUserListId} /> : <AllTasksList />}
          <div className="h-12 mt-auto"></div>
          <TaskInput />
        </div>
        <TaskDetailsPanel />
      </div>
    </div>
  );
}
