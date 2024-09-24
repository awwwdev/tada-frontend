import { Task } from "@/types";
import TaskItem from "./TaskItem";
import { useRef } from "react";
import DraggableList from "react-draggable-list";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useGlobalContex } from "./Provider";
import { useQuery } from "@tanstack/react-query";
import fetchAPI from "@/utils/fetchAPI";
import useUserMe from "@/hooks/userMe";
import QUERY_KEYS from "@/react-query/queryKeys";

function AllTasksList() {
  const userMeQ = useUserMe();
  const allTasksQ = useQuery({
    queryKey: [QUERY_KEYS.TASKS],
    queryFn: async () => {
      const data = await fetchAPI.GET(`/tasks?userId=${userMeQ.data?._id}`);
      return data;
    },
    enabled: !!userMeQ.data?._id,
  });

  return <div></div>;
}
