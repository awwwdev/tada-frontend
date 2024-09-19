"use client";

import { createInitialFolders, createInitialLists, createInitialSettings } from "@/initialData";
import { Folder, List, Settings, Task, User } from "@/types";
import { createContext, SetStateAction, useContext, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { v4 as uuid } from "uuid";
import type * as React from "react";
import useUserMe from '@/hooks/userMe';

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
  userMe: User | null;
  setUserMe: React.Dispatch<SetStateAction<User | null>>;
};
const GloblaContext = createContext<ContextType>({
  isSideMenuOpen: false,
  selectedTask: null,
  tasks: [],
  listName: "all",
  settings: createInitialSettings(),
  folders: createInitialFolders(),
  lists: createInitialLists(),
  userMe: null,
  setIsSideMenuOpen: () => {},
  setSelectedTask: () => {},
  setListName: () => {},
  setTasks: () => {},
  addTask: () => {},
  updateTaskById: () => {},
  setSettings: () => {},
  setFolders: () => {},
  setLists: () => {},
  setUserMe: () => {},
  theme: "light",
});

export default function Providers({ children, theme }: { children: React.ReactNode; theme: string }) {

  const userMeQ = useUserMe(); // to initialize userMe
  console.log("userMeQ", userMeQ.data);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [settings, setSettings, removeSettings] = useLocalStorage<Settings>("settings", createInitialSettings());
  const [folders, setFolders, removeFolders] = useLocalStorage<Folder[]>("folders", createInitialFolders());
  const [lists, setLists, removeLists] = useLocalStorage<List[]>("lists", createInitialLists());
  const [tasks, setTasks, removeTasks] = useLocalStorage<Task[]>("tasks", []);
  const [listName, setListName] = useState("all");
  const [userMe, setUserMe] = useState<User | null>(null);

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
        userMe,
        setUserMe,
      }}
    >
      {children}
    </GloblaContext.Provider>
  );
}

export const useGlobalContex = () => {
  return useContext(GloblaContext);
};
