"use client";

import { EMPTY_TASK } from '@/constants';
import {  Task } from '@/types';
import { createContext, useContext, useState } from "react";



type ContextType = {
  isSideMenuOpen: boolean
  setIsSideMenuOpen: (arg: boolean) => void,
  selectedTask: Task | null,
  setSelectedTask: (arg: Task) => void


};
const GloblaContext = createContext<ContextType>({
  isSideMenuOpen: false,
  setIsSideMenuOpen: () => {},
  selectedTask: null,
  setSelectedTask: () => {}

});


export default function GlobalProvider({ children }: {children: React.ReactNode}) {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  return (
    <GloblaContext.Provider value={{
      selectedTask, 
      setSelectedTask,
      isSideMenuOpen,
      setIsSideMenuOpen
    }}>
      {children}
    </GloblaContext.Provider>
  );
}

export const useGlobalContex = () => {
  return useContext(GloblaContext);
}