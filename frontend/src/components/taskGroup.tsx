import TaskItem from "./TaskItem";

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
          <TaskItem task={task} key={index} />
        ))}
      </ul>
    </div>
  );
};

export default TaskGroup;
