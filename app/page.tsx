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
    <div className="grid gap-6  p-6  h-[100vh] w-[100vw]" style={{ gridTemplateRows: "auto 1fr" }}>
      <Header />
      <main className="grid gap-3  overflow-hidden" style={{ gridTemplateColumns: "1fr 3fr 3fr" }}>
        <ListsPanel />
        <div className="grid gap-0  overflow-hidden" style={{ gridTemplateRows: "1fr auto" }}>
          {/* <div></div> */}
          {selectedUserListId ? <UserList listId={selectedUserListId} /> : <AllTasksList />}
          <TaskInput />
        </div>
        <TaskDetailsPanel />
      </main>
      {/* <footer>footer ---</footer> */}
    </div>
  );
}
