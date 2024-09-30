import { SmartListId, Task } from "@/types";
import fetchAPI from "@/utils/fetchAPI";
import { useQuery } from "@tanstack/react-query";
import TaskItem from "../TaskItem";

export default function SmartList({ listId }: { listId: SmartListId }) {
  const tasksQ = useQuery<Task[]>({
    queryKey: ['tasks'], // TODO add query key per list and send filters to api
    queryFn: () => fetchAPI.GET(`/tasks`),
    select: (data: Task[]) => smartListSelect[listId](data),
  });
  return (
    <div className="grid gap-3 overflow-hidden " style={{ gridTemplateRows: "auto 1fr" }}>
      <div className="px-3 flex gap-3">
        <h3 className="capitalize H2 fw-500 tracking-tight">{listId.replaceAll("_", " ").toLowerCase()}</h3>
      </div>
      <ul className=" gap-3 flex flex-col overflow-y-scroll px-3 pb-9">
        {tasksQ.data &&
          tasksQ.data.length > 0 &&
          tasksQ.data.map((task, index) => {
            return <TaskItem key={index} task={task} dragHandleProps={{}} />;
          })}
      </ul>
    </div>
  );
}

const smartListSelect: Record<SmartListId, (data: Task[]) => Task[]> = {
  ALL_TASKS: (data: Task[]) => data.filter((t: Task) => t),
  DO_TODAY: (data: Task[]) => data.filter((t: Task) => t),
  DO_TOMORROW: (data: Task[]) => data.filter((t: Task) => t),
  DO_LATER: (data: Task[]) => data.filter((t: Task) => t),
  NEXT_WEEK: (data: Task[]) => data.filter((t: Task) => t),
  ASSIGNED: (data: Task[]) => data.filter((t: Task) => t),
  ASSIGNED_TO_ME: (data: Task[]) => data.filter((t: Task) => !t.deleted),
  WITH_REMINDERS: (data: Task[]) => data.filter((t: Task) => t.reminders && t.reminders?.length > 0),
  ROUTINES: (data: Task[]) => data.filter((t: Task) => t.routines && t.routines?.length > 0),
  ARCHIVED: (data: Task[]) => data.filter((t: Task) => t.archived),
  DELETED: (data: Task[]) => data.filter((t: Task) => t.deleted),
  STARRED: (data: Task[]) => data.filter((t: Task) => t.starred),
  PINNED: (data: Task[]) => data.filter((t: Task) => t.pinned),
  WITH_DUE_DATES: (data: Task[]) => data.filter((t: Task) => t.dueAt),
};
