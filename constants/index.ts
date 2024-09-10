import { Task } from '@/types';

export const EMPTY_TASK: Task = {
  id: "",
  label: "",
  dateCreated: new Date(),
  status: "todo",
};
