import React, { Children, ElementType } from "react";

type Emoji = string;

export type List = {
  tasks: Task[];
  name: string;
  emojies: Emoji[]
}

export type Comment = {
  authorId: string;
  dateCreated: Date;
  body: string;
}

type ListPorpertis = {
  orderInList: number;
  dateAddedToList: Date;
}

export type Task = {
  listId?: string;
  orderInList?: number;
  preTasks?: string[];
  postTasks?: string[];

  lists: Record<string, ListPorpertis | null>
  // inDoTodayList?: boolean;
  // inDoTomorrowList?: boolean;


  id: string,
  label: string;
  status: 'todo' | 'done';
  dateCreated: Date;
  dateModified?: Date;

  emojis?: string[];
  note?: string;
  steps?: string[];
  dueDate?: Date;
  deleted?: boolean;
  arhived?: boolean;
  starred?: boolean;
  pinned?: boolean;
  reminders?: Reminder[];
  repeatitionPatterns?: RepeationPattern[];
  attachments?: string[];
  assignedTo?: string[];
  comments?: Comment[];
}


type RepeationPattern = {
  startDate: Date;
  endAfterXTimes?: number;
  endDate?: Date;
  everyXPeriods: number;
  period: 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'
}


type Reminder = {
  startDate: Date;
  endAfterXTimes?: number;
  endDate?: Date;
  everyXPeriods: number;
  period: 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'
}


export type RNode = React.ReactNode;


export type Children = { children: React.ReactNode };
export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;
export type HTMLProps<T extends ElementType> = React.ComponentPropsWithoutRef<T>
// frequently used props type  in uikit ----------------------------------------------- 
export type CLS = { className?: string | null, preStyled?: boolean; };

