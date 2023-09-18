import { useEffect } from "react";
import TaskItem from "./TaskItem";
import useTaskOperationContext from "@/customHooks/useTaskOperationContext";

interface taskType {
  _id: string;
  taskName: string;
  description: string;
  subject: string;
  type: string;
  deadline: string;
}

interface Props {
  header: string;
  tasks: taskType[];
  type?: "previous" | "upcoming";
}

const TaskGroup = ({ tasks, header, type = "upcoming" }: Props) => {
  const { setIsDeleteVisible, setIsEditVisible } = useTaskOperationContext();

  useEffect(() => {
    if (type === "upcoming") {
      setIsDeleteVisible(true);
      setIsEditVisible(true);
    } else if (type === "previous") {
      setIsDeleteVisible(true);
      setIsEditVisible(false);
    }
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2
        className="font-bold flex items-center
        px-1 
        text-xl md:text-2xl"
      >
        {header}
      </h2>

      <ul
        className={`w-full grid
        grid-cols-1 md:grid-cols-2
        gap-y-6 lg:gap-y-8
        gap-x-6 lg:gap-x-8`}
      >
        {tasks.map((task, index) => (
          <TaskItem
            task={task}
            key={index}
            isEditHidden={type === "upcoming" ? false : true}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskGroup;
