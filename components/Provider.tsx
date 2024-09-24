"use client";

import { createInitialFolders, createInitialLists, createInitialSettings } from "@/initialData";
import { Folder, List, Settings, Task, User } from "@/types";
import { createContext, SetStateAction, useContext, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { v4 as uuid } from "uuid";
import type * as React from "react";
import useUserMe from "@/hooks/userMe";

// add helper functions updateTaskById, addTask, getTaskById

type ContextType = {
  isSideMenuOpen: boolean;
  setIsSideMenuOpen: React.Dispatch<SetStateAction<boolean>>;
  selectedTaskId: string | null;
  selectedUserListId: string | null;
  
  setSelectedUserListId: React.Dispatch<SetStateAction<string | null>>;
  setSelectedTaskId: React.Dispatch<SetStateAction<string | null>>;
  theme: Settings["theme"];
};
const GloblaContext = createContext<ContextType>({
  isSideMenuOpen: false,
  selectedTaskId: null,
  selectedUserListId: null,
  setIsSideMenuOpen: () => {},
  setSelectedTaskId: () => {},
  setSelectedUserListId: () => {},
  theme: "light",
});

export default function Providers({
  children,
  theme,
  hasSession,
}: {
  children: React.ReactNode;
  theme: Settings["theme"];
  hasSession: boolean;
}) {
  useUserMe(); // to initialize userMe
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedUserListId, setSelectedUserListId] = useState<string | null>(null);


  return (
    <GloblaContext.Provider
      value={{
        selectedTaskId,
        setSelectedTaskId,
        selectedUserListId,
        setSelectedUserListId,
        isSideMenuOpen,
        setIsSideMenuOpen,
        theme,
      }}
    >
      {children}
    </GloblaContext.Provider>
  );
}

export const useGlobalContex = () => {
  return useContext(GloblaContext);
};
