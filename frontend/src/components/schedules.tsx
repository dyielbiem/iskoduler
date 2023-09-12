import TaskView from "./TaskView";
import ClassView from "./ClassView";

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
