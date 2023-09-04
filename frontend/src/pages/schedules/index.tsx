import Header from "@/components/header";
import TabSwitcher from "@/components/tabSwitcher";
import AddSchedule from "@/components/addSchedule";
import Schedules from "@/components/schedules";
import { useEffect, useState } from "react";
import { getSchedules } from "@/utils/requests";
import TaskForm from "@/components/taskForm";
import ClassForm from "@/components/classForm";
import useScheduleContext from "@/customHooks/useScheduleContext";
import protectRoute from "@/utils/protectRoute";

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

  const showClassForm = () => {
    setIsClassFormVisible((prevState) => !prevState);
  };

  return (
    <>
      <Header isPreviousVisible={true} isProfileVisible={true} />
      <main
        className="flex flex-col items-center
                   w-11/12"
      >
        <TabSwitcher viewOption={viewOption} setViewOption={setViewOption} />
        <Schedules viewOption={viewOption} />
        <AddSchedule
          setIsTaskFormVisible={setIsTaskFormVisible}
          showClassForm={showClassForm}
        />
        <TaskForm
          isTaskFormVisible={isTaskFormVisible}
          setIsTaskFormVisible={setIsTaskFormVisible}
          taskNamePlaceholder={""}
          descriptionPlaceholder={""}
          subjectPlaceholder={""}
          typePlaceholder={"Type*"}
          deadlinePlaceholder={"Deadline*"}
          action={{ type: "ADD" }}
        />
        <ClassForm
          isVisible={isClassFormVisible}
          setIsVisible={setIsClassFormVisible}
          classNamePlaceholder=""
          descriptionPlaceholder=""
          daySchedulePlaceholder="Day Schedule*"
          timeStartPlaceholder=""
          timeEndPlaceholder=""
          action={{ type: "ADD" }}
        />
      </main>
    </>
  );
};

export default protectRoute(SchedulesPage);
