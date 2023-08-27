import useScheduleContext from "@/customHooks/useScheduleContext";
import TaskItem from "./taskItem";

const TaskView = () => {
  const { state } = useScheduleContext();

  // Array filter function to group the tasks that have a deadline for today
  const selectTodayTasks = (deadlineString: string) => {
    const deadline = new Date(deadlineString);
    deadline.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return deadline.getTime() / 86400000 === today.getTime() / 86400000;
  };

  // Array filter function to group the tasks that have a deadline for tomorrow
  const selectTomorrowTasks = (deadlineString: string) => {
    const deadline = new Date(deadlineString);
    deadline.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return (
      deadline.getTime() / 86400000 === (today.getTime() + 86400000) / 86400000
    );
  };

  // Array filter function to group the tasks that have a deadline later than tomorrow
  const selectUpcomingTasks = (deadlineString: string) => {
    const deadline = new Date(deadlineString);
    deadline.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return (
      deadline.getTime() / 86400000 > (today.getTime() + 86400000) / 86400000
    );
  };

  const todayTasks = state.tasks.filter((task) =>
    selectTodayTasks(task.deadline)
  );

  const tomorrowTasks = state.tasks.filter((task) =>
    selectTomorrowTasks(task.deadline)
  );

  const upcomingTasks = state.tasks.filter((task) =>
    selectUpcomingTasks(task.deadline)
  );

  return (
    <div className="flex w-full flex-col gap-4 my-6">
      {todayTasks.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-white text-2xl">Due Today</h2>
          <ul
            className={`w-full 
              gap-2
              flex 
              flex-col`}
          >
            {todayTasks.map((task, index) => (
              <TaskItem task={task} key={index} />
            ))}
          </ul>
        </div>
      )}

      {tomorrowTasks.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-white text-2xl">Due Tommorrow</h2>

          <ul
            className={`w-full 
              gap-2
              flex 
              flex-col`}
          >
            {tomorrowTasks.map((task, index) => (
              <TaskItem task={task} key={index} />
            ))}
          </ul>
        </div>
      )}

      {upcomingTasks.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-white text-2xl">Upcoming</h2>
          <ul
            className={`w-full 
              gap-2
              flex 
              flex-col`}
          >
            {upcomingTasks.map((task, index) => (
              <TaskItem task={task} key={index} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TaskView;
