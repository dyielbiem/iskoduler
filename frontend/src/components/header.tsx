import { PiCalendarCheckFill } from "react-icons/pi";
import { IoPersonCircleSharp } from "react-icons/io5";
import { HiQueueList } from "react-icons/hi2";
import Link from "next/link";

type isVisibleType = boolean | undefined;

interface Props {
  isProfileVisible?: isVisibleType;
  isPreviousVisible?: isVisibleType;
  isSchedulesVisible?: isVisibleType;
}

const hoverIconInfoClass = `relative hover:after:absolute hover:after:text-sm
hover:after:bg-white hover:after:rounded-lg hover:after:py-1.5 hover:after:px-2 hover:after:left-2/4 hover:after:-translate-x-2/4 hover:after:mt-3
hover:after:w-fit hover:after:whitespace-nowrap hover:after:shadow-customShadow
group`;

const Header = ({
  isSchedulesVisible,
  isProfileVisible,
  isPreviousVisible,
}: Props) => {
  return (
    <header
      className="sticky top-0 items-center flex justify-center
      w-full z-50 bg-transparent p-0 border-none
      h-16 md:h-20"
    >
      <div
        className="flex justify-between items-center max-w-7xl
        py-3 bg-[#eeeeeedd] h-full backdrop-blur-sm
        w-11/12"
      >
        <Link href={"/schedules"} className="bg-transparent">
          <h1
            className="font-bold text-primary
            text-3xl bg-transparent"
          >
            ISKOduler
          </h1>
        </Link>
        <nav
          className="flex 
          text-3xl items-center
          gap-3 lg:gap-4"
        >
          <Link
            href={"/schedules"}
            className={`${
              isSchedulesVisible ? "" : "hidden"
            } ${hoverIconInfoClass} hover:after:content-["Schedules"]`}
          >
            <HiQueueList className="text-2xl md:text-3xl" />
          </Link>
          <Link
            href={"/schedules/previous"}
            className={`${
              isPreviousVisible ? "" : "hidden"
            } ${hoverIconInfoClass} hover:after:content-["Previous_tasks"]`}
          >
            <PiCalendarCheckFill className="text-3xl md:text-4xl" />
          </Link>
          <Link
            href={"/profile"}
            className={`${
              isProfileVisible ? "" : "hidden"
            } ${hoverIconInfoClass} hover:after:content-["Profile"]`}
          >
            <IoPersonCircleSharp className="text-3xl md:text-4xl" />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
