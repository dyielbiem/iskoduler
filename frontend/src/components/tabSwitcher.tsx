import { FaPeopleRoof } from "react-icons/fa6";
import { GoTasklist } from "react-icons/go";

type viewType = "class" | "task";

interface Props {
  viewOption: viewType;
  setViewOption: React.Dispatch<React.SetStateAction<viewType>>;
}
const TabSwitcher = ({ viewOption, setViewOption }: Props) => {
  return (
    <ul
      className="rounded-full flex flex-nowrap border-tertiary bg-none
        shadow-customShadow border-[3px]  justify-center font-semibold items-center overflow-hidden w-fit
        gap-1
        text-lg md:text-xl"
    >
      <li
        onClick={() => setViewOption("task")}
        className="bg-tertiary group flex-shrink-0"
      >
        <button
          className={`rounded-full flex
            items-center justify-center
            ${
              viewOption === "task"
                ? "text-tertiary bg-primary"
                : "text-black bg-tertiary group-hover:bg-gray-300"
            }
            gap-2
            px-4 md:px-5
            py-1 md:py-1.5`}
        >
          <GoTasklist
            className={`text-rounded-full md:text-xl
              ${
                viewOption === "task"
                  ? "fill-tertiary bg-primary"
                  : "fill-black bg-tertiary group-hover:bg-gray-300"
              }`}
          />
          Tasks
        </button>
      </li>
      <li onClick={() => setViewOption("class")} className="bg-tertiary group">
        <button
          className={`rounded-full flex
            items-center justify-center
            ${
              viewOption === "class"
                ? "text-tertiary bg-primary"
                : "text-black bg-tertiary group-hover:bg-gray-300"
            }
            gap-2
            px-4 md:px-5
            py-1 md:py-1.5`}
        >
          <FaPeopleRoof
            className={`text-rounded-full md:text-xl
              ${
                viewOption === "class"
                  ? "fill-tertiary bg-primary"
                  : "fill-black bg-tertiary group-hover:bg-gray-300"
              }`}
          />
          Classes
        </button>
      </li>
    </ul>
  );
};

export default TabSwitcher;
