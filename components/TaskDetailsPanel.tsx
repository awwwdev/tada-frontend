"use client";

import { Task } from "@/types";
import { useGlobalContex } from "./Provider";
import TextArea from "@/components/ui/TextArea";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/button";
import Input from "@/components/ui/Input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import fetchAPI from "@/utils/fetchAPI";
import toast from "react-hot-toast";
import Modal from "./ui/modal";
import useUserMe from '@/hooks/userMe';
import QUERY_KEYS from '@/react-query/queryKeys';

export default function TaskDetailsPanel() {
  const { selectedTaskId } = useGlobalContex();
  const userMeQ = useUserMe();
  const allTasksQ = useQuery({
    queryKey: [QUERY_KEYS.TASKS],
    queryFn: async () => {
      const data = await fetchAPI.GET(`/tasks?userId=${userMeQ.data?._id}`)
      return data;
    },
    enabled: !!userMeQ.data?._id,
  })

  const selectedTask = allTasksQ.data?.find((t: Task) => t._id === selectedTaskId);

  return (
    <div className="rd-3 p-6 b-1 b-base6">
      {!selectedTask && <EmptyState />}
      {selectedTask && <TaskDetailsContent task={selectedTask} />}
    </div>
  );
}

function EmptyState() {
  return <div className="w-full h-full flex items-center justify-center b-base11 italic">No task is selected</div>;
}

function TaskDetailsContent({task}: {task: Task}) {

  return (
    <div className="space-y-3">
      <Title task={task} />
      <div className="h-12"></div>
      <Line />
      <Note task={task} />
      <Line />
      <Steps task={task} />
      <Line />
      <Emojies task={task} />
      <Line />
      <Reminders task={task} />
      <Line />
      <Repetition task={task} />
      <Line />
      <AsingedTo task={task} />
      <Line />
      <Comments task={task} />
      <Line />
      <Archive task={task} />
      <Line />
      <Delete task={task} />
    </div>
  );
}

function Line() {
  return <div className="b-t-1 b-base6"></div>;
}

type Props = { task: Task };;

function Title({ task }: Props) {
  return (
    <div>
      <Input
        name='label'
        label="Title"
        value={task.label}
        // onChange={(e) => updateTaskById({ id: selectedTask?.id, task: { ...task, label: e.target.value } })}
      />
      <h3 className="H2">{task.label}</h3>
    </div>
  );
}

function Archive({task}: Props) {
  const queryClient = useQueryClient();
  const archiveTaskM = useMutation({
    mutationFn: async  (id: string) => {
      const data = await fetchAPI.PUT(`/tasks/${id}`, { archived: !task?.archived });
      return data;
    },
    onError: (err) => {
      toast.error("Something went wrong: " + err.message);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["tasks", task.id], data);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASKS] });
    },
  });
  return (
    <div>
      <Button variation="ghost" onClick={() => archiveTaskM.mutate(task.id)} isLoading={archiveTaskM.isPending}>
        <Icon name="bf-i-ph-archive" className="c-base11" />
        {task?.archived ? "Unarchive" : "Archive"}
      </Button>
    </div>
  );
}

function AsingedTo({ task }: Props) {
  return <div>Assing</div>;
}

function Comments({ task }: Props) {
  return <div>Comments</div>;
}

function Delete({ task }: Props) {
  const queryClient = useQueryClient();
  const {setSelectedTaskId} = useGlobalContex();
  const deleteTaskM = useMutation({
    mutationFn: async (id: string) => {
      const data = await fetchAPI.DELETE(`/tasks/${id}`);
      return data;
    },
    onError: (err) => {
      toast.error("Something went wrong: " + err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setSelectedTaskId(null);
    },
  });

  return (
    <div>
      <Modal
        trigger={
          <Button variation="ghost">
            <Icon name="bf-i-ph-trash" className="c-base11" />
            Delete
          </Button>
        }
      >
        <p>Are your sure you want to delete this task?</p>
        <div className="h-6"></div>
        <div className="flex justify-end gap-3">
          <Modal.Close>
            <Button variation="soft">Cancel</Button>
          </Modal.Close>
          <Modal.Close>
            <Button variation="solid" onClick={() => deleteTaskM.mutate(task.id)} isLoading={deleteTaskM.isPending}>
              <Icon name="bf-i-ph-trash" className="c-base11" />
              <span className="">Delete</span>
            </Button>
          </Modal.Close>
        </div>
      </Modal>
    </div>
  );
}

function Emojies({ task }: Props) {
  return <div>Emojies</div>;
}

function Note({ task }: Props) {

  return (
    <div>
      <TextArea
        name="note"
        label="Note"
        value={task.note ?? ""}
        // onChange={(e) => updateTaskById({ id: selectedTask?.id, tass: { ...task, note: e.target.value } })}
      />
    </div>
  );
}

function Reminders({ task }: Props) {
  return <div>Reminders</div>;
}

function Repetition({ task }: Props) {
  return <div>Repetition</div>;
}

function Steps({ task }: Props) {
  return <div>Steps</div>;
}

function DescriptionItem({ term, children }: { term: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <dt className="c-base11">{term}</dt>
      <dd>{children}</dd>
    </div>
  );
}
