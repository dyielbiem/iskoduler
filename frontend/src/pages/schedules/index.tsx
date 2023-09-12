import Header from "@/components/Header";
import TabSwitcher from "@/components/TabSwitcher";
import Schedules from "@/components/Schedules";
import { useEffect, useState } from "react";
import { getSchedules } from "@/utils/requests";
import TaskForm from "@/components/TaskForm";
import ClassForm from "@/components/ClassForm";
import useScheduleContext from "@/customHooks/useScheduleContext";
import protectRoute from "@/utils/protectRoute";
import AddSchedule from "@/components/AddSchedule";

type viewType = "class" | "task";

const SchedulesPage = () => {
  const { dispatch } = useScheduleContext();
  const [viewOption, setViewOption] = useState<viewType>("task");
  const [isTaskFormVisible, setIsTaskFormVisible] = useState<boolean>(false);
  const [isClassFormVisible, setIsClassFormVisible] = useState<boolean>(false);

  // Fetch all tasks and classes through GET Request
  const fetchSchedules = async () => {
    const fetchedSchedules = await getSchedules();
    if (Object.hasOwn(fetchedSchedules, "Error"))
      return console.log(fetchedSchedules.Error);
    dispatch({ type: "GET_TASKS", payload: fetchedSchedules.Tasks });
    dispatch({ type: "GET_CLASSES", payload: fetchedSchedules.Classes });
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return (
    <div
      className="flex flex-col
      justify-center items-center
      w-full"
    >
      <Header isPreviousVisible={true} isProfileVisible={true} />
      <main
        className="flex flex-col items-center
        w-11/12"
      >
        <div
          className="flex w-full max-w-7xl items-center
          justify-center md:justify-between
          bg-[#eeeeeeee]"
        >
          <TabSwitcher viewOption={viewOption} setViewOption={setViewOption} />
          <AddSchedule
            isTaskFormVisible={isTaskFormVisible}
            isClassFormVisible={isClassFormVisible}
            setIsTaskFormVisible={setIsTaskFormVisible}
            setIsClassFormVisible={setIsClassFormVisible}
          />
        </div>
        <Schedules viewOption={viewOption} />
        <TaskForm
          isTaskFormVisible={isTaskFormVisible}
          setIsTaskFormVisible={setIsTaskFormVisible}
          taskNamePlaceholder={""}
          descriptionPlaceholder={""}
          subjectPlaceholder={""}
          typePlaceholder={"* Type"}
          deadlinePlaceholder={"* Deadline"}
          action={{ type: "ADD" }}
        />
        <ClassForm
          isVisible={isClassFormVisible}
          setIsVisible={setIsClassFormVisible}
          classNamePlaceholder=""
          descriptionPlaceholder=""
          daySchedulePlaceholder="* Scheduled day"
          timeStartPlaceholder=""
          timeEndPlaceholder=""
          action={{ type: "ADD" }}
        />
      </main>
    </div>
  );
};

export default protectRoute(SchedulesPage);
