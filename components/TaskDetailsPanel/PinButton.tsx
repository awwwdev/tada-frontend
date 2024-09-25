import { Task } from "@/types";
import Button from "../ui/button";
import Icon from "../ui/Icon";
import useTaskMutation from "@/hooks/useTaskMutation";

export default function PinButton({ task }: { task: Task }) {
  const taskMutation = useTaskMutation();

  return (
    <Button
      variation="ghost"
      iconButton
      onClick={() => {
        taskMutation.mutate({ id: task.id, pinned: !task.pinned });
      }}
    >
      <Icon name={task.pinned ? "bf-i-ph-push-pin-fill" : "bf-i-ph-push-pin"} className="c-base11" />
      <span className="sr-only">Pin to the top of the list</span>
    </Button>
  );
}
