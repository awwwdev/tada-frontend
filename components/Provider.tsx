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
  setIsSideMenuOpen: React.Dispatch<SetStateAction<boolean | null>>;
  selectedTask: Task | null;
  setSelectedTask: React.Dispatch<SetStateAction<Task | null>>;
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

export default function Providers({ children, theme, hasSession }: { children: React.ReactNode; theme: string; hasSession: boolean }) {

  useUserMe(); // to initialize userMe
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);


  const [listName, setListName] = useState("all");
  const [userMe, setUserMe] = useState<User | null>(null);
  console.log("🚀 ~ userMe:", userMe);

 



  return (
    <GloblaContext.Provider
      value={{
        selectedTask,
        setSelectedTask,
        isSideMenuOpen,
        setIsSideMenuOpen,
        listName,
        setListName,
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
