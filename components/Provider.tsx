"use client";

import { createInitialFolders, createInitialLists, createInitialSettings, makeEmptyTask } from "@/initialData";
import { Folder, List, Settings, Task } from "@/types";
import { createContext, SetStateAction, useContext, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { v4 as uuid } from "uuid";
import { QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getQueryClient } from "@/react-query/getQueryClient";
import type * as React from "react";
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

// add helper functions updateTaskById, addTask, getTaskById

type ContextType = {
  isSideMenuOpen: boolean;
  setIsSideMenuOpen: (arg: boolean) => void;
  selectedTask: Task | null;
  setSelectedTask: (arg: Task) => void;
  listName: string;
  setListName: React.Dispatch<SetStateAction<string>>;
  tasks: Task[];
  setTasks: React.Dispatch<SetStateAction<Task[]>>;
  addTask: (task: Task) => void;
  updateTaskById: (args: { id: string; task: Task }) => void;
  settings: Settings;
  setSettings: React.Dispatch<SetStateAction<Settings>>;
  lists: List[];
  setLists: React.Dispatch<SetStateAction<List[]>>;
  folders: Folder[];
  setFolders: React.Dispatch<SetStateAction<Folder[]>>;
  theme: Settings["theme"];
};
const GloblaContext = createContext<ContextType>({
  isSideMenuOpen: false,
  selectedTask: null,
  tasks: [],
  listName: "all",
  settings: createInitialSettings(),
  folders: createInitialFolders(),
  lists: createInitialLists(),
  setIsSideMenuOpen: () => {},
  setSelectedTask: () => {},
  setListName: () => {},
  setTasks: () => {},
  addTask: () => {},
  updateTaskById: () => {},
  setSettings: () => {},
  setFolders: () => {},
  setLists: () => {},
  theme: "light",
});

export default function Providers({ children, theme }: { children: React.ReactNode; theme: string }) {
  const queryClient = getQueryClient();

  console.log("🚀 ~ theme:", theme);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [settings, setSettings, removeSettings] = useLocalStorage<Settings>("settings", createInitialSettings());
  const [folders, setFolders, removeFolders] = useLocalStorage<Folder[]>("folders", createInitialFolders());
  const [lists, setLists, removeLists] = useLocalStorage<List[]>("lists", createInitialLists());
  const [tasks, setTasks, removeTasks] = useLocalStorage<Task[]>("tasks", []);
  const [listName, setListName] = useState("all");

  const addTask = (t: Task) =>
    setTasks((currentTasks) => [
      ...currentTasks,
      { ...t, id: uuid(), dateCreated: new Date(), orderInList: tasks.length },
    ]);

  const updateTaskById = ({ id, task }: { id: string; task: Task }) => {
    console.log("[hiiii");
    const index = tasks.findIndex((t: Task) => t.id === id);
    console.log("🚀 ~ index:", index);
    if (index === -1) return;
    tasks[index] = { ...task, id: id };
  };

  return (
    <QueryClientProvider client={queryClient}>
      <GloblaContext.Provider
        value={{
          selectedTask,
          setSelectedTask,
          isSideMenuOpen,
          setIsSideMenuOpen,
          listName,
          setListName,
          tasks,
          setTasks,
          addTask,
          updateTaskById,
          settings,
          setSettings,
          lists,
          setLists,
          folders,
          setFolders,
          theme,
        }}
      >
        <HydrationBoundary state={dehydrate(queryClient)}>
        {children}
        </HydrationBoundary>
      </GloblaContext.Provider>
    </QueryClientProvider>
  );
}

export const useGlobalContex = () => {
  return useContext(GloblaContext);
};
