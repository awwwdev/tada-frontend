import useTaskMutation from "@/hooks/useTaskMutation";
import Button from "../ui/button";
import Icon from "../ui/Icon";
import { Task } from "@/types";

export default function StarButton({ task }: { task: Task }) {
  const taskMutation = useTaskMutation();

  return (
    <Button
      variation="ghost"
      iconButton
      onClick={() => {
        taskMutation.mutate({ id: task.id, starred: !task.starred });
      }}
    >
      <Icon name={task.starred ? "bf-i-ph-star-fill" : "bf-i-ph-star"} className="c-base11" />
      <span className="sr-only">Star</span>
    </Button>
  );
}
