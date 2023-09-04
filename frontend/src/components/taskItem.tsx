import { useState } from "react";
import ScheduleOperations from "./scheduleOperations";
import DeleteModal from "./deleteModal";
import TaskForm from "./taskForm";
import { parse, format } from "date-fns";

interface taskType {
  _id: string;
  deadline: string;
  taskName: string;
  type: string;
  subject: string;
  description: string;
}

interface Props {
  task: taskType;
}

const TaskItem = ({ task }: Props) => {
  const [isOptionVisible, setIsOptionVisible] = useState<boolean>(false);
  const [isTaskFormVisible, setIsTaskFormVisible] = useState<boolean>(false);
  const [isDeleteTaskModalVisible, setIsDeleteTaskModalVisible] =
    useState<boolean>(false);
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Format for display deadline
  const timeFormatter = Intl.DateTimeFormat("en-US", {
    timeZone: userTimeZone,
    dateStyle: "medium",
    timeStyle: "short",
  });

  // Function to format the deadline placeholder in edit task form
  const formatDeadlinePlaceholder = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hour = date.getHours().toString().padStart(2, "0");
    const min = date.getMinutes().toString().padStart(2, "0");

    // Present time in 24 hours format
    const time12 = `${hour}:${min}`;
    const time24 = format(parse(time12, "HH:mm", new Date()), "hh:mm a");

    // Return the YYYY-MM-DD hh:mm a date time string format
    return `${year}-${month}-${day} ${time24}`;
  };

  return (
    <li
      className={`text-white bg-white rounded-lg
      shadow-md border-gray-200 border-[1px] relative
      before:h-full before:content-[''] before:rounded-l-md
      before:w-2 before:absolute before:top-0 before:left-0
      ${
        task.type === "Activity" ? "before:bg-activity" : "before:bg-assignment"
      }
      flex flex-col
      pl-6
      pr-4
      py-3`}
    >
      <div className="flex justify-between items-center">
        <h3
          className="font-bold
                     text-xl"
        >
          {task.taskName}
        </h3>
        <ScheduleOperations
          isOptionVisible={isOptionVisible}
          setIsOptionVisible={setIsOptionVisible}
          setIsDeleteModalVisible={setIsDeleteTaskModalVisible}
          setIsFormVisible={setIsTaskFormVisible}
        />
      </div>
      <p className="text-sm">{timeFormatter.format(new Date(task.deadline))}</p>

      <p className="text-sm">{task.subject}</p>
      <p>{task.description}</p>
      <p
        className={`border-2 rounded-full font-bold
        w-fit self-end
        ${
          task.type === "Activity"
            ? "border-activity text-activity"
            : "border-assignment text-assignment"
        }
        text-base
        px-4 
        py-1`}
      >
        {task.type}
      </p>
      <DeleteModal
        isThisVisible={isDeleteTaskModalVisible}
        setIsThisVisible={setIsDeleteTaskModalVisible}
        scheduleID={task._id}
        type={"task"}
      />
      <TaskForm
        isTaskFormVisible={isTaskFormVisible}
        setIsTaskFormVisible={setIsTaskFormVisible}
        taskNamePlaceholder={task.taskName}
        descriptionPlaceholder={task.description}
        subjectPlaceholder={task.subject}
        typePlaceholder={task.type}
        deadlinePlaceholder={formatDeadlinePlaceholder(task.deadline)}
        action={{ type: "EDIT", taskID: task._id }}
      />
    </li>
  );
};

export default TaskItem;
