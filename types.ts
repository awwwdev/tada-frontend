import React, { Children, ElementType } from "react";

type Document = {
  _id: string;
  id: string;
  createAt: Date;
  updateAt: Date;
  __v: string;
};

export type User = Document & UserFields;
export type Folder = Document & FolderFields;
export type List = Document & ListFields;
export type Task = Document & TaskFields;


type Emoji = string;

export type UserFields =  {
  email: string;
};

export type FolderFields =  {
  name: string;
  emojies?: Emoji[];
  // authorId: string;
  lists: FolderListProperties[] | null;
};

type FolderListProperties = {
  addedAt: Date;
  id: string ;
  show?: boolean | null | undefined;
  orderInFolder?: number | null | undefined;
};

export type ListFields =  {
  name: string;
  authorId: string;
  emojies?: string[] | null;
  tasks? : ListTasktPorpertis[] | null;
  description?: string | null;
  // show?: boolean;
};

type ListTasktPorpertis = {
  addedAt: Date;
  id: string;
  orderInList?: number | null;
};

export type TaskFields = {
  author: string;
  label: string;
  status: "done" | "to-do";

  emojies?: string[] | null;
  note?: string | null;
  // lists?: TaskListPorpertis[] | null;

  dueAt?: Date | null;

  deleted?: boolean | null;
  arhived?: boolean | null;
  starred?: boolean | null;
  pinned?: boolean | null;
  archived?: boolean | null | undefined;
  steps?: string[] | null;
  preTasks?: string[] | null;
  postTasks?: string[] | null;
  comments?: TaskComment[] | null;
  assingnees?: TaskAssignee[] | null;
  attachments?: TaskAttachment[] | null;
  routins?: TaskRoutine[] | null;
  reminders?: TaskReminder[] | null;
};



export type TaskComment = {
  createdAt: Date;
  body: string;
  authorId?: string | null;
  // replyToCommentId?: string | null;
};

type TaskAttachment = {
  createdAt: Date;
  body: string;
  authorId?: string | null | undefined;
};

type TaskAssignee = {
  createdAt: Date;
  authorId?: string | null;
};

type TaskRoutine = {
  startAt: Date;
  endAt: Date;
  numberOfRepeats: number;
  periods: "minute" | "hour" | "day" | "week" | "month" | "year";
  notification?: boolean | null | undefined;
  everyXPeriods: number;
};

type TaskReminder = {
  minutesBeforeDueDate: number;
  remindAt: Date;
};

export type Settings = {
  theme: "light" | "dark" | "system";
  showCompletedTasks: boolean;
  startOfWeek: "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday";
  planForTommorowSettings: {};
};

// ---------------------------

export type RNode = React.ReactNode;

export type Children = { children: React.ReactNode };
export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;
export type HTMLProps<T extends ElementType> = React.ComponentPropsWithoutRef<T>;
// frequently used props type  in uikit -----------------------------------------------
export type CLS = { className?: string | null; preStyled?: boolean };
