import Header from "@/components/header";
import { getSchedules } from "@/utils/requests";
import { useEffect } from "react";
import useScheduleContext from "@/customHooks/useScheduleContext";
import TaskGroup from "@/components/taskGroup";

const Previous = () => {
  const { state, dispatch } = useScheduleContext();

  const fetchSchedules = async () => {
    const fetchedSchedules = await getSchedules();
    if (Object.hasOwn(fetchedSchedules, "Error"))
      return console.log(fetchedSchedules.Error);
    dispatch({ type: "GET_TASKS", payload: fetchedSchedules.Tasks });
  };

  useEffect(() => {
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

  const previousTasks = state.tasks
    .filter((task) => selectPreviousTaks(task.deadline))
    .sort((a, b) => sortPreviousTask(a.deadline, b.deadline));

  return (
    <>
      <Header isProfileVisible={true} />
      <main
        className="flex flex-col justify-center items-center
        w-11/12
        pb-10"
      >
        {state.tasks.length > 0 && (
          <TaskGroup tasks={previousTasks} header="Previous schedules" />
        )}
      </main>
    </>
  );
};

export default Previous;
