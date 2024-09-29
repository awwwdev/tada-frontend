"use client";

import SMART_LIST_IDS from '@/constants/smartListIds';
import useUserMe from "@/hooks/useUserMe";
import { CurrentList, Settings, SmartListId } from "@/types";
import type * as React from "react";
import { createContext, SetStateAction, useContext, useState } from "react";

const initialCurrentList: CurrentList = {
  id: SMART_LIST_IDS.ALL_TASKS,
  type: 'smart-list',
}

type ContextType = {
  isSideMenuOpen: boolean;
  setIsSideMenuOpen: React.Dispatch<SetStateAction<boolean>>;
  selectedTaskId: string | null;
  currentList: CurrentList
  setSelectedUserListId: (listId: string) => void;
  setSelectedSmartListId: (listId: SmartListId) => void;
  setSelectedTaskId: React.Dispatch<SetStateAction<string | null>>;
  theme: Settings["theme"];
};
const GloblaContext = createContext<ContextType>({
  isSideMenuOpen: false,
  selectedTaskId: null,
  currentList: initialCurrentList,
  setIsSideMenuOpen: () => {},
  setSelectedTaskId: () => {},
  setSelectedUserListId: () => {},
  setSelectedSmartListId: () => {},
  theme: "light",
});

export default function Providers({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: Settings["theme"];
}) {
  useUserMe(); // to initialize userMe
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [currentList , _setCurrentList] = useState<CurrentList>(initialCurrentList);
  const setSelectedUserListId = (id: string) => {
    _setCurrentList({id, type: 'user-list'});
  }
  const setSelectedSmartListId = (id: SmartListId) => {
    _setCurrentList({id, type: 'smart-list'});
  }
  return (
    <GloblaContext.Provider
      value={{
        selectedTaskId,
        currentList,
        setSelectedUserListId,
        setSelectedSmartListId,
        setSelectedTaskId,
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
