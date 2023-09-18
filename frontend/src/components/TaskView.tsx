import useScheduleContext from "@/customHooks/useScheduleContext";
import TaskGroup from "./TaskGroup";
import NoSchedule from "./NoSchedule";

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

  if (state.tasks === undefined) return <></>;

  const todayTasks = state.tasks.filter((task) =>
    selectTodayTasks(task.deadline)
  );

  const tomorrowTasks = state.tasks.filter((task) =>
    selectTomorrowTasks(task.deadline)
  );

  const upcomingTasks = state.tasks.filter((task) =>
    selectUpcomingTasks(task.deadline)
  );

  if (
    [todayTasks, tomorrowTasks, upcomingTasks].every(
      (item) => item.length === 0
    ) &&
    state.tasks !== undefined
  )
    return <NoSchedule scheduleType="task" />;

  return (
    <div
      className="flex w-full flex-col
      max-w-7xl mb-16 mt-4 md:mt-8
      gap-10"
    >
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
