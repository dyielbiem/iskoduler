import useScheduleContext from "@/customHooks/useScheduleContext";
import TaskView from "./taskView";
import ClassView from "./classView";

interface Task {
  _id: string;
  taskName: string;
  description: string;
  deadline: string;
  type: string;
  subject: string;
}

interface Class {
  _id: string;
  className: string;
  description: string;
  daySchedule: string;
  timeStart: string;
  timeEnd: string;
}

type viewType = "task" | "class";

interface Props {
  viewOption: viewType;
}

const Schedules = ({ viewOption }: Props) => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const { state, dispatch } = useScheduleContext();
  const dateFormatter = Intl.DateTimeFormat("en-US", {
    timeZone: userTimeZone,
    dateStyle: "medium",
    timeStyle: "short",
  });

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
