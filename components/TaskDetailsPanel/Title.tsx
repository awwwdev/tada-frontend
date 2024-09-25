"use client";

import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/button";
import useAutosizeTextArea from "@/hooks/useAutoSizeTextArea";
import QUERY_KEYS from "@/react-query/queryKeys";
import { Task } from "@/types";
import fetchAPI from "@/utils/fetchAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function Title({ task }: { task: Task }) {
  const queryClient = useQueryClient();
  const [value, setValue] = useState<string>("");
  useEffect(() => {
    setValue(task.label ?? "");
  }, [task.label]);

  const [showEdit, setShowEdit] = useState(false);

  const taskMutation = useMutation({
    mutationFn: async ({ id, label }: { id: string; label: string }) => fetchAPI.PUT(`/tasks/${id}`, { label }),
    onError: (err) => {
      toast.error("Something went wrong: " + err.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TASKS, task._id] });
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
        // defaultValue={task.label}
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
          className="mis-auto shrink-0"
        >
          <Icon name="bf-i-ph-pencil-simple" className="c-base11" />
          <span className="sr-only">Edit</span>
        </Button>
      )}
    </div>
  );
}
