"use client";

import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/button";
import QUERY_KEYS from "@/react-query/queryKeys";
import { Task } from "@/types";
import fetchAPI from "@/utils/fetchAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useGlobalContex } from '../Provider';
import Modal from '../ui/modal';


export default function Delete({ task }: { task: Task }) {
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
