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
      className="rounded-full flex flex-nowrap border-white bg-white
                 shadow-customShadow justify-center font-semibold items-center overflow-hidden
                 border-[3px] gap-1.5
                 mt-2 text-lg"
    >
      <li
        onClick={() => setViewOption("task")}
        className="bg-white group flex-shrink-0"
      >
        <button
          className={`rounded-full flex
                     items-center justify-center 
                     ${
                       viewOption === "task"
                         ? "text-white bg-primary"
                         : "text-black bg-white group-hover:bg-gray-300"
                     }
                     gap-2
                     px-4
                     py-1`}
        >
          <GoTasklist
            className={`text-xl 
                      ${
                        viewOption === "task"
                          ? "fill-white bg-primary"
                          : "fill-black bg-white group-hover:bg-gray-300"
                      }`}
          />
          Tasks
        </button>
      </li>
      <li onClick={() => setViewOption("class")} className="bg-white group">
        <button
          className={`rounded-full flex
          items-center justify-center
          ${
            viewOption === "class"
              ? "text-white bg-primary"
              : "text-black bg-white group-hover:bg-gray-300"
          }
          gap-2
          px-4
          py-1`}
        >
          <BsFillPeopleFill
            className={`text-xl 
            ${
              viewOption === "class"
                ? "fill-white bg-primary"
                : "fill-black bg-white group-hover:bg-gray-300"
            }`}
          />
          Classes
        </button>
      </li>
    </ul>
  );
};

export default TabSwitcher;
