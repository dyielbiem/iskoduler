import Header from "@/components/Header";
import TabSwitcher from "@/components/TabSwitcher";
import Schedules from "@/components/Schedules";
import { useEffect, useState } from "react";
import { getSchedules } from "@/utils/schedulesRequests";
import TaskForm from "@/components/TaskForm";
import ClassForm from "@/components/ClassForm";
import useScheduleContext from "@/customHooks/useScheduleContext";
// import ProtectRoute from "@/utils/protectRoute";
import AddScheduleButton from "@/components/AddScheduleButton";
import AddScheduleModal from "@/components/AddScheduleModal";
import useAuthenticate from "@/customHooks/useAuthenticate";

type viewType = "class" | "task";

const SchedulesPage = () => {
  const { state, dispatch } = useScheduleContext();
  const [viewOption, setViewOption] = useState<viewType>("task");
  const [isTaskFormVisible, setIsTaskFormVisible] = useState<boolean>(false);
  const [isClassFormVisible, setIsClassFormVisible] = useState<boolean>(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
  const [isAddButtonVisible, setIsAddButtonVisible] = useState<boolean>(true);

  const isAuthenticated = useAuthenticate(false, "/");

  // Fetch all tasks and classes through GET Request
  const fetchSchedules = async () => {
    const fetchedSchedules = await getSchedules();
    if (fetchedSchedules.Error) return console.log(fetchedSchedules.Error);
    dispatch({ type: "GET_TASKS", payload: fetchedSchedules.Tasks });
    dispatch({ type: "GET_CLASSES", payload: fetchedSchedules.Classes });
  };

  useEffect(() => {
    if (
      state.tasks === undefined &&
      state.classes === undefined &&
      isAuthenticated
    )
      fetchSchedules();
  }, [isAuthenticated]);

  if (!isAuthenticated) return <></>;

  return (
    <div
      className="flex flex-col
      justify-center items-center
      w-full"
    >
      <Header isPreviousVisible={true} isProfileVisible={true} />
      <div
        className="w-full flex items-center justify-center 
        py-4 md:py-2
        bg-[#eeeeeedd] backdrop-blur-sm sticky h-fit
        top-16 md:top-20 z-20"
      >
        <div
          className="flex max-w-7xl items-center
          justify-center md:justify-between
          w-11/12 xl:w-10/12 bg-transparent"
        >
          <TabSwitcher viewOption={viewOption} setViewOption={setViewOption} />
          <AddScheduleButton
            isTaskFormVisible={isTaskFormVisible}
            isClassFormVisible={isClassFormVisible}
            isAddButtonVisible={isAddButtonVisible}
            setIsAddButtonVisible={setIsAddButtonVisible}
            setIsAddModalVisible={setIsAddModalVisible}
            type="large"
          />
        </div>
      </div>
      <main
        className="flex flex-col items-center 
        w-11/12 sm:w-10/12 md:w-11/12 xl:w-10/12"
      >
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
        <AddScheduleModal
          isAddModalVisible={isAddModalVisible}
          setIsAddButtonVisible={setIsAddButtonVisible}
          setIsAddModalVisible={setIsAddModalVisible}
          setIsClassFormVisible={setIsClassFormVisible}
          setIsTaskFormVisible={setIsTaskFormVisible}
        />
      </main>
      <AddScheduleButton
        isTaskFormVisible={isTaskFormVisible}
        isClassFormVisible={isClassFormVisible}
        isAddButtonVisible={isAddButtonVisible}
        setIsAddButtonVisible={setIsAddButtonVisible}
        setIsAddModalVisible={setIsAddModalVisible}
        type="small"
      />
    </div>
  );
};

export default SchedulesPage;
