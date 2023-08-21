import { BsFillPeopleFill } from "react-icons/bs";
import { GoTasklist } from "react-icons/go";

type visibilityType = "tasks" | "classes";

interface Props {
  setVisibleSchedules: React.Dispatch<React.SetStateAction<visibilityType>>;
  visibleSchedules: visibilityType;
}
const TabSwitcher = ({ setVisibleSchedules, visibleSchedules }: Props) => {
  return (
    <ul
      className="rounded-full flex flex-wrap bg-gray-200
                 justify-center font-semibold items-center
                 mt-2 gap-0.5
                 p-0.5"
    >
      <li onClick={() => setVisibleSchedules("tasks")}>
        <button
          className={`rounded-full flex
                     items-center justify-center 
                     ${
                       visibleSchedules === "tasks"
                         ? "text-white bg-gray-600"
                         : "text-gray-600"
                     }
                     gap-2
                     px-3
                     py-1`}
        >
          <GoTasklist className="text-xl" />
          Tasks
        </button>
      </li>
      <li onClick={() => setVisibleSchedules("classes")}>
        <button
          className={`rounded-full flex
          items-center justify-center 
          ${
            visibleSchedules === "classes"
              ? "text-white bg-gray-600"
              : "text-gray-600"
          }
          gap-2
          px-3
          py-1`}
        >
          <BsFillPeopleFill className="text-xl" />
          Classes
        </button>
      </li>
    </ul>
  );
};

export default TabSwitcher;
