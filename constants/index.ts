import { Task } from '@/types';
import { v4 as uuid } from "uuid";


export const makeEmptyTask = (): Task => ({
  id: uuid(),
  label: "",
  dateCreated: new Date(),
  status: "todo",
  lists: {
    all: {
      dateAddedToList: new Date(),
      orderInList: -1
    }
  }

})