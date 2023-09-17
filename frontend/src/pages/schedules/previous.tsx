import Header from "@/components/Header";
import { getSchedules } from "@/utils/schedulesRequests";
import { useEffect } from "react";
import useScheduleContext from "@/customHooks/useScheduleContext";
import TaskGroup from "@/components/TaskGroup";
import protectRoute from "@/utils/protectRoute";
import NoSchedule from "@/components/NoSchedule";

const Previous = () => {
  const { state, dispatch } = useScheduleContext();

  const fetchSchedules = async () => {
    const fetchedSchedules = await getSchedules();
    if (Object.hasOwn(fetchedSchedules, "Error"))
      return console.log(fetchedSchedules.Error);
    dispatch({ type: "GET_TASKS", payload: fetchedSchedules.Tasks });
    dispatch({ type: "GET_CLASSES", payload: fetchedSchedules.Classes });
  };

  useEffect(() => {
    if (state.tasks === undefined && state.classes === undefined)
      fetchSchedules();
  }, []);

  const selectPreviousTaks = (deadlineString: string) => {
    const today = new Date();
    const deadline = new Date(deadlineString);
    today.setHours(0, 0, 0, 0);
    deadline.setHours(0, 0, 0, 0);
    return deadline.getTime() / 86400000 < today.getTime() / 86400000;
  };

  const sortPreviousTask = (aDeadline: string, bDeadline: string) => {
    return new Date(bDeadline).getTime() - new Date(aDeadline).getTime();
  };

  if (state.tasks === undefined) return <></>;

  const previousTasks = state.tasks
    .filter((task) => selectPreviousTaks(task.deadline))
    .sort((a, b) => sortPreviousTask(a.deadline, b.deadline));

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Header isProfileVisible={true} isSchedulesVisible={true} />
      {previousTasks.length === 0 && (
        <NoSchedule scheduleType="previous task" />
      )}
      {previousTasks.length > 0 && (
        <main
          className="flex flex-col justify-center items-center
            w-11/12 sm:w-10/12 md:w-11/12 xl:w-10/12
            max-w-7xl
            mt-6
            mb-16"
        >
          {state.tasks.length > 0 && (
            <TaskGroup
              tasks={previousTasks}
              type="previous"
              header="Previous tasks"
            />
          )}
        </main>
      )}
    </div>
  );
};

export default protectRoute(Previous);
