import TaskItem from "./taskItem";
import { GiTargeting } from "react-icons/gi";

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
}

const TaskGroup = ({ tasks, header }: Props) => {
  return (
    <div className="flex flex-col gap-2 w-full ">
      <h2
        className="font-bold text-2xl flex items-center
        px-1"
      >
        {header}
      </h2>

      <ul
        className={`w-full 
              gap-4
              flex 
              flex-col`}
      >
        {tasks.map((task, index) => (
          <TaskItem task={task} key={index} />
        ))}
      </ul>
    </div>
  );
};

export default TaskGroup;
