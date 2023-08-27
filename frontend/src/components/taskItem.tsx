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
    dateStyle: "long",
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
      className="text-white bg-gray-700 rounded-2xl
                flex flex-col
                px-4
                py-3"
    >
      <div className="flex justify-between items-center">
        <p className="text-sm">
          {timeFormatter.format(new Date(task.deadline))}
        </p>
        <ScheduleOperations
          isOptionVisible={isOptionVisible}
          setIsOptionVisible={setIsOptionVisible}
          setIsDeleteModalVisible={setIsDeleteTaskModalVisible}
          setIsFormVisible={setIsTaskFormVisible}
        />
      </div>
      <h2
        className="font-bold
                     text-xl"
      >
        {task.taskName}
      </h2>
      <p className="text-sm">{`${task.type} • ${task.subject}`}</p>
      <p>{task.description}</p>
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
