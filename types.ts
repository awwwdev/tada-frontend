import React, { Children, ElementType } from "react";

type Emoji = string;

export type List = {
  tasks: Task[];
  name: string;
  emojies: Emoji[]
}

export type Task = {
  id?: string,
  label: string;
  emojis?: string[];
  status: 'todo' | 'done';
  dateCreated?: Date;
  dateModified?: Date;
  description?: string;
  dueDate?: Date;
  reminders?: Reminder[];
  repeatitionPatterns?: RepeationPattern[];
  orderInList?: number;
  preTasks?: string[];  
  postTasks?: string[];
  pinned?: boolean;
  steps?: string[];
  listId?: string;
  deleted?: boolean;
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

