"use client";

import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import Pre from "@/components/ui/Pre";

import { useLocalStorage } from "usehooks-ts";
import { Task } from "@/types";
import Link from "next/link";
import { useGlobalContex } from "./Provider";
import React from "react";
import LinkButton from './ui/button/LinkButton';

export default function ListsPanel() {
  const { setListName, tasks } = useGlobalContex();
  return (
    <div className="flex flex-col ">
      <ul className="flex flex-col gap-3  ">
        <MenuItem icon="bf-i-ph-list" onClick={() => setListName("all")}>All Tasks</MenuItem>
        <MenuItem icon="bf-i-ph-sun" onClick={() => setListName("doToday")}>Do Today</MenuItem>
        <MenuItem icon="bf-i-ph-sun-horizon" onClick={() => setListName("doTomorrow")}>Do Tomorrow</MenuItem>
        <MenuItem icon="bf-i-ph-star" onClick={() => setListName("starred")}>Starred</MenuItem>
        <MenuItem icon="bf-i-ph-calendar-dots" onClick={() => setListName("withDueDates")}>With Due dates</MenuItem>
        <MenuItem icon="bf-i-ph-users" onClick={() => setListName("assigned")}>Asigned</MenuItem>
        <MenuItem icon="bf-i-ph-user" onClick={() => setListName("assignedToMe")}>Asigned To Me</MenuItem>
        <MenuItem icon="bf-i-ph-user" onClick={() => setListName("withReminders")}>With Reminders</MenuItem>
        <MenuItem icon="bf-i-ph-user" onClick={() => setListName("withRepetition")}>With Repetition</MenuItem>
        <MenuItem icon="bf-i-ph-archive" onClick={() => setListName("archived")}>Archived Tasks</MenuItem>
        <MenuItem icon="bf-i-ph-trash" onClick={() => setListName("deleted")}>Deleted Tasks</MenuItem>
      </ul>
      <Button variation='text' className="!text-start mt-3 w-full">
        <Icon name="bf-i-ph-plus" className="mie-1.5 c-base11" />
        <span className="italic c-base11">Add a List</span>
      </Button>
      <div className="mt-auto flex flex-col gap-3">
        <Modal trigger={<Button variation="ghost">Tasks </Button>}>
          <div className="h-12"></div>
          <div>
            <Pre>{JSON.stringify(tasks, null, 2)}</Pre>
          </div>
        </Modal>
      </div>
    </div>
  );
}

function MenuItem({ icon, children, onClick }: { icon: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <li>
      <Button variation="text" className='!text-start w-full' onClick={(onClick)}>
        <Icon name={icon} className="mie-1.5 c-base11" />
        {children}{" "}
      </Button>
    </li>
  );
}
