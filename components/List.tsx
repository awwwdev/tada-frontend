"use client";

import { Task } from "@/types";
import TaskItem from "./TaskItem";
import { useRef } from "react";
import DraggableList from "react-draggable-list";
import Icon from "./ui/Icon";
import { v4 as uuid } from "uuid";

export default function List({ tasks, setTasks }: { tasks: Task[]; setTasks: any }) {
  if (!tasks || tasks.length === 0) return <EmptyState />;
  const notDeletedTasks = tasks.filter((t: Task) => !t.deleted);
  if (notDeletedTasks.length === 0) return <EmptyState />;
  return <ListContent tasks={notDeletedTasks} setTasks={setTasks} />;
}

function ListContent({ tasks, setTasks }: { tasks: Task[]; setTasks: any }) {
  const listContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={listContainerRef}>
      {/* @ts-ignore */}
      <DraggableList
        itemKey="id"
        template={(props: TemplateProps) => <ListItemTemplate tasks={tasks} setTasks={setTasks} {...props} />}
        list={tasks}
        onMoveEnd={(newList: Task[]) => {
          const newListWithUpdatedOrders = newList.map((t: Task, index: number) => ({ ...t, orderInList: index }))
          setTasks(newListWithUpdatedOrders)
        }
        }
        container={() => listContainerRef.current}
      />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <p className="c-base11 italic">No Task in this list</p>
    </div>
  );
}

type TemplateProps = {
  item: Task;
  itemSelected: number;
  dragHandleProps: object;
};
type ListItemTemplateProps = {
  tasks: Task[];
  setTasks: any;
} & TemplateProps;


function ListItemTemplate({ item, itemSelected, dragHandleProps, tasks, setTasks }: ListItemTemplateProps) {
  const scale = itemSelected * 0.05 + 1;
  const shadow = itemSelected * 15 + 1;
  const dragged = itemSelected !== 0;

  return (
    <div
      className={`overflow-hidden max-h-[100%]
        ${dragged ? "dragged" : ""} `}
      style={{
        transformOrigin: "30% 50% 0px",
        transform: `scale(${scale})`,
        boxShadow: `rgba(0, 0, 0, 0.3) 0px ${shadow}px ${2 * shadow}px 0px`,
      }}
    >
      <div className="grid" style={{ gridTemplateColumns: "1fr auto" }}>
        <TaskItem
          task={item}
          setTasks={setTasks}
          setTask={(newTask: Task) => {
            const otherTasks = tasks.filter((t: Task) => t.id !== item.id);
            setTasks([...otherTasks, newTask]);
          }}
          handleDuplicate={(t: Task) => setTasks([...tasks, { ...t, id: uuid() }])}
          dragHandleProps={dragHandleProps}
        />
      </div>
    </div>
  );
}
