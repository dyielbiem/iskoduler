interface Task {
  _id: string;
  taskName: string;
  description: string;
  deadline: string;
  type: string;
  subject: string;
}

interface Class {
  _id: string;
  className: string;
  description: string;
  daySchedule: string;
  timeStart: string;
  timeEnd: string;
}

type visibilityType = "tasks" | "classes";

interface Props {
  tasks: Task[];
  classes: Class[];
  visibleSchedules: visibilityType;
}

const Schedules = ({ tasks, classes, visibleSchedules }: Props) => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const dateFormatter = Intl.DateTimeFormat("en-US", {
    timeZone: userTimeZone,
    dateStyle: "medium",
    timeStyle: "short",
  });
  return (
    <>
      <ul
        className={`w-full 
                gap-2
                ${visibleSchedules === "tasks" ? "flex" : "hidden"} 
                flex-col 
                my-6`}
      >
        {tasks.length > 0 &&
          tasks.map((task) => (
            <li
              key={task._id}
              className="text-white bg-gray-700 rounded-2xl
                     p-3 flex flex-col"
            >
              <p className="text-sm">
                Due {dateFormatter.format(new Date(task.deadline))}
              </p>
              <h2
                className="font-bold
                       text-xl"
              >
                {task.taskName}
              </h2>
              <p className="text-sm">{`${task.type} • ${task.subject}`}</p>
              <p>{task.description}</p>
            </li>
          ))}
      </ul>
      <ul
        className={`w-full 
                  gap-2
                  ${visibleSchedules === "classes" ? "flex" : "hidden"} 
                  flex-col 
                  my-6`}
      >
        {classes.length > 0 &&
          classes.map((classItem) => (
            <li
              key={classItem._id}
              className="text-white bg-gray-700 rounded-2xl
                       p-3 flex flex-col"
            >
              <h2
                className="font-bold
                         text-xl"
              >
                {classItem.className}
              </h2>
              <p>{classItem.description}</p>
              <p>{classItem.daySchedule}</p>
              <p className="text-sm">{`${classItem.timeStart} - ${classItem.timeEnd}`}</p>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Schedules;
