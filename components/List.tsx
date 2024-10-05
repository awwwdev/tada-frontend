import { Task } from "@/types";
import TaskItem from "./TaskItem";
import Icon from "./ui/Icon";
import useUserMe from "@/hooks/useUserMe";
import EmptyState from "./ui/EmptyState";
import Modal from "./ui/modal";
import MenuItem from "./ui/MenuItem/MenuItem";
import LoginOrSignUpBox from "./auth/LoginOrSignUpBox";

export default function List({
  tasks,
  listName,
  listControls,
}: {
  tasks: Task[];
  listName: string;
  listControls?: React.ReactNode;
}) {
  const notDeletedTasks = tasks.filter((t: Task) => !t.deleted) ?? [];
  const userMeQ = useUserMe();
  if (notDeletedTasks.length === 0)
    return (
      <ListTemplate listName={listName} listControls={listControls}>
        {userMeQ.data ? (
          <EmptyState title="No Tasks" subtitle="Add tasks using the input below" icon={<Icon name="bf-i-ph-info" />} />
        ) : (
          <EmptyState
            title="Please Sign-up/Login."
            subtitle=""
            icon={<Icon name="bf-i-ph-info" />}
          >
            <Modal
              trigger={
                <MenuItem size="xl" className="justify-start">
                  <Icon name="bf-i-ph-sign-in" className="mie-1.5 c-base11" />
                  Login
                </MenuItem>
              }
            >
              <LoginOrSignUpBox initalTab="login" />
            </Modal>
          </EmptyState>
        )}
      </ListTemplate>
    );

  const pinnedTasks = notDeletedTasks.filter((t: Task) => t.pinned);
  const notPinnedTasks = notDeletedTasks.filter((t: Task) => !t.pinned);
  const orderedTasks = [...pinnedTasks, ...notPinnedTasks];

  return (
    <ListTemplate listName={listName} listControls={listControls}>
      <ul className=" gap-3 flex flex-col overflow-y-scroll px-4.5">
        {orderedTasks.map((task, index) => {
          return <TaskItem key={index} task={task} dragHandleProps={{}} />;
        })}
      </ul>
    </ListTemplate>
  );
}

function ListTemplate({
  children,
  listName,
  listControls,
}: {
  children: React.ReactNode;
  listName: string;
  listControls: React.ReactNode;
}) {
  return (
    <div className="gap-3 grid overflow-hidden h-full" style={{ gridTemplateRows: "auto 1fr" }}>
      <div className="px-4.5 flex gap-3 w-full ">
        <h2 className="H2">{listName}</h2>
        <div className="mis-auto">{listControls}</div>
      </div>
      <div className="h-full ">{children}</div>
    </div>
  );
}

// function EmptyState() {
//   const userMeQ = useUserMe();
//   return (
//     <div className="h-full w-full flex justify-center items-center">
//       <div className="text-center">
//         {userMeQ.data ? (
//           <>
//             <p className="fs-xl">
//               <Icon name="bf-i-ph-info" className="c-base11 mie-1" />
//               No Tasks.
//             </p>
//             <p className="c-base11 italic">Add new tasks to see them here.</p>
//           </>
//         ) : (
//           <>
//             <p className="fs-xl">
//               <Icon name="bf-i-ph-info" className="c-base11 mie-1" />
//               No Task in this list.
//             </p>
//             <p className="c-base11 italic">Add new tasks to see them here.</p>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// function ListContent({ tasks, listName }: { tasks: Task[]; listName: string }) {
//   const listContainerRef = useRef<HTMLDivElement>(null);
//   // const [parent, enableAnimations] = useAutoAnimate(/* optional config */)
//   return (
//     <div ref={listContainerRef} className="" suppressHydrationWarning>
//       {/* @ts-ignore */}
//       <DraggableList
//         itemKey="id"
//         template={(props: TemplateProps) => <ListItemTemplate {...props} />}
//         list={tasks}
//         onMoveEnd={(newList: Task[]) => {
//           const pinnedTasks = newList.filter((t: Task) => t.pinned);
//           const notPinnedTasks = newList.filter((t: Task) => !t.pinned);
//           const newListWithUpdatedOrders = [...pinnedTasks, ...notPinnedTasks].map((t: Task, index: number) => {
//             const newTask = { ...t };
//             newTask.lists[listName].orderInList = index;
//             return newTask;
//           });
//           setTasks(newListWithUpdatedOrders);
//         }}
//         container={() => listContainerRef.current}
//       />
//     </div>
//   );
// }

type TemplateProps = {
  item: Task;
  itemSelected: number;
  dragHandleProps: object;
};

function ListItemTemplate({ item, itemSelected, dragHandleProps }: TemplateProps) {
  const scale = itemSelected * 0.05 + 1;
  const shadow = itemSelected * 15 + 1;
  const dragged = itemSelected !== 0;

  return (
    <div
      className={`overflow-hidden max-h-[100%] rd-3
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
          // setTask={(newTask) => updateTaskById({ id: item.id, task: newTask })}
          dragHandleProps={dragHandleProps}
        />
      </div>
    </div>
  );
}
