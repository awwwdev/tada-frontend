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
import useUserMe from "@/hooks/userMe";
import QUERY_KEYS from "@/react-query/queryKeys";
import { useId, useRef, useState } from "react";
import useAutosizeTextArea from "@/hooks/useAutoSizeTextArea";

export default function TaskDetailsPanel() {
  const { selectedTaskId } = useGlobalContex();
  const userMeQ = useUserMe();
  const allTasksQ = useQuery({
    queryKey: [QUERY_KEYS.TASKS],
    queryFn: async () => {
      const data = await fetchAPI.GET(`/tasks?userId=${userMeQ.data?._id}`);
      return data;
    },
    enabled: !!userMeQ.data?._id,
  });

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

function TaskDetailsContent({ task }: { task: Task }) {
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

type Props = { task: Task };

function Title({ task }: Props) {
  const queryClient = useQueryClient();
  const [value, setValue] = useState<string>(task.label);
  const [showEdit, setShowEdit] = useState(false);

  const taskMutation = useMutation({
    mutationFn: async ({ id, label }: { id: string; label: string }) => fetchAPI.PUT(`/tasks/${id}`, { label }),
    onError: (err) => {
      toast.error("Something went wrong: " + err.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASKS] });
      setShowEdit(false);
    },
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textareaRef.current, value);
  return (
    <div className="flex gap-3">
      <textarea
        name="label"
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`H2  ${showEdit ? "" : "b-transparent"} b-1 px-1.5 rd-1.5 w-full overflow-hidden resize-none`}
        disabled={!showEdit}
        rows={1}
        // autoFocus
      ></textarea>
      {showEdit ? (
        <Button variation="solid" onClick={() => taskMutation.mutate({ id: task._id, label: value })}>
          Save
        </Button>
      ) : (
        <Button
          variation="ghost"
          onClick={() => {
            setShowEdit(true);
            if (textareaRef.current) {
              textareaRef.current.disabled = false;
              textareaRef.current?.focus();
            }
          }}
          iconButton
          className="mis-auto"
        >
          <Icon name="bf-i-ph-pencil" className="c-base11" />
        </Button>
      )}
    </div>
  );
}

function Archive({ task }: Props) {
  const queryClient = useQueryClient();
  const archiveTaskM = useMutation({
    mutationFn: async (id: string) => fetchAPI.PUT(`/tasks/${id}`, { archived: !task?.archived }),
    onError: (err) => {
      toast.error("Something went wrong: " + err.message);
    },
    onSuccess: (data) => {
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
  const { setSelectedTaskId } = useGlobalContex();
  const deleteTaskM = useMutation({
    mutationFn: (id: string) => fetchAPI.DELETE(`/tasks/${id}`),
    onError: (err) => {
      toast.error("Something went wrong: " + err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASKS] });
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
  const [value, setValue] = useState<string>(task.note ?? "");
  const [showEdit, setShowEdit] = useState(false);
  const queryClient = useQueryClient();

  const taskMutation = useMutation({
    mutationFn: async ({ id, note }: { id: string; note: string }) => fetchAPI.PUT(`/tasks/${id}`, { note }),
    onError: (err) => {
      toast.error("Something went wrong: " + err.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASKS] });
      setShowEdit(false);
    },
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textareaRef.current, value);
  return (
    <div>
      <h3>Note</h3>
      <div className="flex gap-3">
        <textarea
          name="label"
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`H2  ${showEdit ? "" : "b-transparent"} b-1 px-1.5 rd-1.5 w-full overflow-hidden resize-none`}
          disabled={!showEdit}
          rows={1}
          // autoFocus
        ></textarea>
        {showEdit ? (
          <Button variation="solid" onClick={() => taskMutation.mutate({ id: task._id, note: value })}>
            Save
          </Button>
        ) : (
          <Button
            variation="ghost"
            onClick={() => {
              setShowEdit(true);
              if (textareaRef.current) {
                textareaRef.current.disabled = false;
                textareaRef.current?.focus();
              }
            }}
            iconButton
            className="mis-auto"
          >
            <Icon name="bf-i-ph-pencil" className="c-base11" />
          </Button>
        )}
      </div>
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
