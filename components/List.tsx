import { Task } from '@/types';
import TaskItem from './TaskItem';


export default function List({ tasks, listName }: { tasks: Task[]; listName: string }) {
  return (
    <div className="gap-3 grid overflow-hidden" style={{ gridTemplateRows: "auto 1fr" }}>
      <div className='px-3'>
        <h2 className="H2">{listName}</h2>
      </div>
      <ul className=' gap-3 flex flex-col overflow-y-scroll px-3'>
        {tasks.map((task, index) => {
          return <TaskItem key={index} task={task} dragHandleProps={{}} />;
        })}
      </ul>
    </div>
  );
}
