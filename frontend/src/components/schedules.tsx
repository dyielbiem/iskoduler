import useScheduleContext from "@/customHooks/useScheduleContext";
import TaskView from "./taskView";
import ClassView from "./classView";

type viewType = "task" | "class";

interface Props {
  viewOption: viewType;
}

const Schedules = ({ viewOption }: Props) => {
  const view = {
    task: TaskView,
    class: ClassView,
  };

  const CurrentView = view[viewOption];
  return (
    <>
      <CurrentView />
    </>
  );
};

export default Schedules;
