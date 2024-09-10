'use client';

import TaskDetailsPanel from '@/components/TaskDetailsPanel';
import TasksExplorer from '@/components/TasksExplorer';


export default function Page(){

return (

  <div className='grid gap-3 px-6' style={{gridTemplateColumns: '1fr 1fr'}}>
    <TasksExplorer />
    <TaskDetailsPanel />

  </div>
)};