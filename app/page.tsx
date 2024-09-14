"use client";

import TaskDetailsPanel from "@/components/TaskDetailsPanel";
import TasksExplorer from "@/components/TasksExplorer";
import Icon from "@/components/ui/Icon";
import Link from "next/link";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import Pre from "@/components/ui/Pre";

import { useLocalStorage } from "usehooks-ts";
import { Task } from "@/types";
import Header from "@/components/header";
import ListsPanel from '@/components/ListsPanel';

export default function Page() {
  return (
    <div className="grid gap-6 h-[100vh] p-6" style={{ gridTemplateRows: "auto 1fr" }}>
      <Header />
      <div className="grid gap-6 " style={{ gridTemplateColumns: "1fr 3fr 3fr" }}>
        <ListsPanel />
        <TasksExplorer />
        <TaskDetailsPanel />
      </div>
    </div>
  );
}

