import AuthorizedHeader from "@/components/authorizedHeader";
import TabSwitcher from "@/components/tabSwitcher";
import AddSchedule from "@/components/addSchedule";
import Schedules from "@/components/schedules";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSchedules } from "@/utils/requests";
import TaskForm from "@/components/taskForm";
import ClassForm from "@/components/classForm";
import useScheduleContext from "@/customHooks/useScheduleContext";

type viewType = "class" | "task";

const Home = () => {
  const { dispatch } = useScheduleContext();
  const [viewOption, setViewOption] = useState<viewType>("task");
  const router = useRouter();
  const [isTaskFormVisible, setIsTaskFormVisible] = useState<boolean>(false);
  const [isClassFormVisible, setIsClassFormVisible] = useState<boolean>(false);

  // Fetch all tasks and classes through GET Request
  const fetchSchedules = async () => {
    try {
      const fetchedSchedules = await getSchedules();
      if (fetchedSchedules.Error) throw Error(fetchedSchedules.Error);
      dispatch({ type: "GET_TASKS", payload: fetchedSchedules.Tasks });
      dispatch({ type: "GET_CLASSES", payload: fetchedSchedules.Classes });
    } catch (error: any) {
      if (error.message === "Unauthorized") {
        router.push("/");
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const showClassForm = () => {
    setIsClassFormVisible((prevState) => !prevState);
  };

  return (
    <>
      <AuthorizedHeader />
      <main
        className="flex flex-col items-center
                   w-[95%]"
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

export default Home;
