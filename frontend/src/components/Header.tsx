import { PiCalendarCheckFill } from "react-icons/pi";
import { IoPersonCircleSharp } from "react-icons/io5";
import { BiSolidCalendarWeek } from "react-icons/bi";
import Link from "next/link";
import { useEffect } from "react";
import { postUserInformation } from "@/utils/userRequests";
import useUserContext from "@/customHooks/useUserContext";
import Image from "next/image";

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
  const { userInformation, setUserInformation } = useUserContext();

  const fetchUserInformation = async () => {
    const token = await localStorage.getItem("token");
    if (!token) return console.log("Unauthorized");

    const userInformation = await postUserInformation(token);

    if (userInformation.Error) return console.log(userInformation.Error);
    setUserInformation(userInformation);
  };

  useEffect(() => {
    if (!userInformation) {
      fetchUserInformation();
    }
  }, []);

  return (
    <header
      className="sticky top-0 items-center flex justify-center
      w-full z-[21] p-0 border-none
      h-16 md:h-20
      bg-[#eeeeeedd] backdrop-blur-sm"
    >
      <div
        className="flex justify-between items-center max-w-7xl
        py-3 bg-transparent h-full 
        w-11/12 sm:w-10/12 md:w-11/12 xl:w-10/12"
      >
        <Link href={"/schedules"} className="bg-transparent">
          <h1
            className="font-bold text-primary
            text-2xl sm:text-3xl bg-transparent"
          >
            ISKOduler
          </h1>
        </Link>
        <nav
          className="flex bg-transparent
          items-center flex-shrink-0
          gap-2 sm:gap-3 lg:gap-4"
        >
          <Link
            href={"/schedules"}
            className={`${
              isSchedulesVisible ? "" : "hidden"
            } ${hoverIconInfoClass} hover:after:content-["Schedules"] bg-transparent`}
          >
            <BiSolidCalendarWeek className="text-4xl bg-transparent " />
          </Link>
          <Link
            href={"/schedules/previous-tasks"}
            shallow={true}
            className={`${
              isPreviousVisible ? "" : "hidden"
            } ${hoverIconInfoClass} hover:after:content-["Previous_tasks"] bg-transparent`}
          >
            <PiCalendarCheckFill className="text-4xl bg-transparent " />
          </Link>
          <Link
            href={"/profile"}
            className={`group ${
              isProfileVisible ? "" : "hidden"
            } ${hoverIconInfoClass} hover:after:content-["Profile"] bg-transparent`}
          >
            {userInformation?.imageURL && (
              <Image
                src={userInformation.imageURL}
                height={50}
                width={50}
                alt="Profile Image"
                className="rounded-full object-cover bg-white bg-transparent 
                w-10 md:w-11 h-10 md:h-11 
                border-2 border-zinc-300"
              ></Image>
            )}
            {!userInformation?.imageURL && (
              <IoPersonCircleSharp className="text-4xl bg-transparent" />
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
