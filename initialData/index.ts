import { Folder, List, Settings, Task, TaskFields } from "@/types";
import { v4 as uuid } from "uuid";

export const makeEmptyTask = (): TaskFields => ({
  label: "",
  status: "to-do",
  author: ""
});

export const createInitialSettings = (): Settings => ({ 
  theme: "system",
  showCompletedTasks: true,
  startOfWeek: "saturday",
  planForTommorowSettings: {},
});


export const createInitialFolders = (): Folder[] => ([
  {
    id: "1",
    name: "Folder 1",
    dateCreated: new Date(),
    emojies: ["📬"],
  },
  {
    id: "2",
    name: "Folder 2",
    dateCreated: new Date(),
    emojies: ["📅"],
  },
]);

export const createInitialLists = (): List[] => (
  [
    {
      id: "1",
      name: "All Tasks",
      dateCreated: new Date(),
      emojies: ["📝"],
      description: "This is a list 1",
      filter: (t: Task) => true,
      show: true,
      orderInFolder: 0,
      folders: null,
    },
    {
      id: "2",
      name: "Do Today",
      dateCreated: new Date(),
      emojies: ["📝"],
      description: "This is a list 2",
      filter: (t: Task) => true,
      show: true,
      orderInFolder: 0,
      folders: null,
    },
    {
      id: "3",
      name: "Do Tomorrow",
      dateCreated: new Date(),
      emojies: ["📝"],
      description: "This is a list 3",
      filter: (t: Task) => true,
      show: true,
      orderInFolder: 0,
      folders: null,
    },
    {
      id: "4",
      name: "Starred",
      dateCreated: new Date(),
      emojies: ["📝"],
      description: "This is a list 4",
      filter: (t: Task) => true,
      show: true,
      orderInFolder: 0,
      folders: null,
    },  
    {
      id: "5",
      name: "With Due Dates",
      dateCreated: new Date(),
      emojies: ["📝"],
      description: "This is a list 5",
      filter: (t: Task) => true,
      show: true,
      orderInFolder: 0,
      folders: null,
    },
  ]
)
