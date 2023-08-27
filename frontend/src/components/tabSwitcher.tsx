import { BsFillPeopleFill } from "react-icons/bs";
import { GoTasklist } from "react-icons/go";

type visibilityType = "tasks" | "classes";

type viewType = "class" | "task";

interface Props {
  viewOption: viewType;
  setViewOption: React.Dispatch<React.SetStateAction<viewType>>;
}
const TabSwitcher = ({ viewOption, setViewOption }: Props) => {
  return (
    <ul
      className="rounded-full flex flex-wrap bg-gray-200
                 justify-center font-semibold items-center
                 mt-2 gap-0.5 text-lg
                 p-0.5"
    >
      <li onClick={() => setViewOption("task")}>
        <button
          className={`rounded-full flex
                     items-center justify-center 
                     ${
                       viewOption === "task"
                         ? "text-white bg-gray-600"
                         : "text-gray-600"
                     }
                     gap-2
                     px-4
                     py-1`}
        >
          <GoTasklist className="text-xl" />
          Tasks
        </button>
      </li>
      <li onClick={() => setViewOption("class")}>
        <button
          className={`rounded-full flex
          items-center justify-center 
          ${viewOption === "class" ? "text-white bg-gray-600" : "text-gray-600"}
          gap-2
          px-4
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
