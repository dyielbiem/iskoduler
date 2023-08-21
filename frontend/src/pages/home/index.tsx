import AuthorizedHeader from "@/components/authorizedHeader";
import TabSwitcher from "@/components/tabSwitcher";
import AddSchedule from "@/components/addSchedule";
import Schedules from "@/components/schedules";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSchedules } from "@/utils/requests";
import TaskForm from "@/components/taskForm";
import ClassForm from "@/components/classForm";

const Home = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [visibleSchedules, setVisibleSchedules] = useState<"tasks" | "classes">(
    "classes"
  );
  const router = useRouter();
  const [taskFormVisibility, setTaskFormVisibility] = useState<boolean>(false);
  const [classFormVisibility, setClassFormVisibility] =
    useState<boolean>(false);

  // Fetch all tasks and classes through GET Request
  const fetchSchedules = async () => {
    try {
      const fetchedSchedules = await getSchedules();
      if (fetchedSchedules.Error) throw Error(fetchedSchedules.Error);
      setTasks(fetchedSchedules.Tasks);
      setClasses(fetchedSchedules.Classes);
    } catch (error: any) {
      if (error.message === "Unauthorized") {
        router.push("/");
      } else {
        console.log(error.name);
      }
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const showTaskForm = () => {
    setTaskFormVisibility((prevState) => !prevState);
  };

  const showClassForm = () => {
    setClassFormVisibility((prevState) => !prevState);
  };

  return (
    <>
      <AuthorizedHeader />
      <main
        className="flex flex-col items-center
                   w-[95%]"
      >
        <TabSwitcher
          setVisibleSchedules={setVisibleSchedules}
          visibleSchedules={visibleSchedules}
        />
        <Schedules
          tasks={tasks}
          classes={classes}
          visibleSchedules={visibleSchedules}
        />
        <AddSchedule
          showTaskForm={showTaskForm}
          showClassForm={showClassForm}
        />
        <TaskForm
          showTaskForm={showTaskForm}
          taskFormVisibility={taskFormVisibility}
        />
        <ClassForm
          visibility={classFormVisibility}
          setVisibility={setClassFormVisibility}
        />
      </main>
    </>
  );
};

export default Home;
