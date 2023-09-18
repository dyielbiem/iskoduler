import { BsJournalBookmarkFill } from "react-icons/bs";
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
        shadow-customShadow border-[3px] justify-center font-semibold items-center overflow-hidden w-fit flex-shrink
        gap-1
        text-base sm:text-lg"
    >
      <li
        onClick={() => setViewOption("task")}
        className={`group flex-shrink-0 flex h-full 
        px-4 sm:px-6 py-1.5 rounded-full gap-2 items-center cursor-pointer
        font-bold
        ${
          viewOption === "task"
            ? "bg-primary text-tertiary fill-tertiary"
            : "bg-tertiary hover:bg-zinc-200"
        }`}
      >
        <GoTasklist
          className="text-rounded-full 
          text-xl md:text-2xl bg-inherit fill-inherit"
        />
        <p className="bg-inherit text-inherit">Tasks</p>
      </li>

      <li
        onClick={() => setViewOption("class")}
        className={`group flex-shrink-0 flex h-full
        px-4 sm:px-6 py-1.5 rounded-full gap-2 items-center cursor-pointer
        ${
          viewOption === "class"
            ? "bg-primary text-tertiary fill-tertiary"
            : "bg-tertiary hover:bg-zinc-200"
        }`}
      >
        <BsJournalBookmarkFill
          className="text-rounded-full 
          text-lg md:text-xl bg-inherit fill-inherit"
        />
        <p className="bg-inherit text-inherit">Classes</p>
      </li>
    </ul>
  );
};

export default TabSwitcher;
