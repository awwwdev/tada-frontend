"use client";

import TaskDetailsPanel from "@/components/TaskDetailsPanel";

import AllTasksList from "@/components/AllTaskList";
import Header from "@/components/header";
import ListsPanel from "@/components/ListsPanel";
import { useGlobalContex } from "@/components/Provider";
import TaskInput from "@/components/TaskInput";
import UserList from "@/components/UserList";
import useUserMe from "@/hooks/useUserMe";
import SmartList from "@/components/SmartList";

export default function Page() {
  const { currentList } = useGlobalContex();
  const userMeQ = useUserMe();
  return (
    <div className="grid gap-6  p-6  h-[100vh] w-[100vw]" style={{ gridTemplateRows: "auto 1fr" }}>
      <Header />
      <main className="grid gap-3  overflow-hidden" style={{ gridTemplateColumns: "1fr 3fr 3fr" }}>
        <ListsPanel />
        <div className="grid gap-0  overflow-hidden" style={{ gridTemplateRows: "1fr auto" }}>
          {currentList.type === "user-list" && <UserList listId={currentList.id} />}
          {currentList.type === "smart-list" && <SmartList listId={currentList.id}/>}
          <TaskInput />
        </div>
        <TaskDetailsPanel />
      </main>
      {/* <footer>footer ---</footer> */}
    </div>
  );
}
