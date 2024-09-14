"use client";

import { createInitialFolders, createInitialLists, createInitialSettings, makeEmptyTask } from '@/initialData';
import { Folder, List, Settings, Task } from "@/types";
import { createContext, SetStateAction, useContext, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { v4 as uuid } from "uuid";

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
  updateTaskById: (args: {id: string, task: Task}) => void;
  settings: Settings;
  setSettings: React.Dispatch<SetStateAction<Settings>>;
  lists: List[];
  setLists: React.Dispatch<SetStateAction<List[]>>;
  folders: Folder[];
  setFolders: React.Dispatch<SetStateAction<Folder[]>>;
};
const GloblaContext = createContext<ContextType>({
  isSideMenuOpen: false,
  selectedTask: null,
  tasks: [],
  listName: 'all',
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
});

export default function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [settings, setSettings, removeSettings] = useLocalStorage<Settings>("settings", createInitialSettings());
  const [folders, setFolders, removeFolders] = useLocalStorage<Folder[]>("folders", createInitialFolders());
  const [lists, setLists, removeLists] = useLocalStorage<List[]>("lists", createInitialLists());
  const [tasks, setTasks, removeTasks] = useLocalStorage<Task[]>("tasks", []);
  const [listName , setListName] = useState('all');

  const addTask = (t:Task) => setTasks((currentTasks) => [...currentTasks, { ...t,  id: uuid(), dateCreated: new Date(), orderInList: tasks.length }]);

  const updateTaskById = ({id, task}: {id: string, task: Task}) => {
      if (!tasks.some((t:Task) => t.id === id)) return ;
      const otherTasks = tasks.filter((t: Task) => t.id !== id);
      setTasks([...otherTasks, task]);
  }

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
      }}
    >
      {children}
    </GloblaContext.Provider>
  );
}

export const useGlobalContex = () => {
  return useContext(GloblaContext);
};
