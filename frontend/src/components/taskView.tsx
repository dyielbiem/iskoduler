import useScheduleContext from "@/customHooks/useScheduleContext";
import TaskItem from "./taskItem";
import TaskGroup from "./taskGroup";

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
    <div className="flex w-full flex-col gap-6 my-6">
      {todayTasks.length > 0 && <TaskGroup tasks={todayTasks} header="Today" />}

      {tomorrowTasks.length > 0 && (
        <TaskGroup tasks={tomorrowTasks} header="Tomorrow" />
      )}

      {upcomingTasks.length > 0 && (
        <TaskGroup tasks={upcomingTasks} header="Upcoming" />
      )}
    </div>
  );
};

export default TaskView;
