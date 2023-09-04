import { RiChatHistoryFill } from "react-icons/ri";
import { IoPersonCircleSharp } from "react-icons/io5";
import Link from "next/link";

type isVisibleType = boolean | undefined;

interface Props {
  isProfileVisible?: isVisibleType;
  isPreviousVisible?: isVisibleType;
}

const Header = ({ isProfileVisible, isPreviousVisible }: Props) => {
  return (
    <header
      className="sticky top-0 bg-white items-center flex justify-center
                 w-full h-16 z-50"
    >
      <div
        className="flex justify-between items-center
                   py-3 
                   w-11/12"
      >
        <Link href={"/schedules"}>
          <h1
            className="font-bold text-primary
                       text-3xl"
          >
            ISKOduler
          </h1>
        </Link>
        <ul
          className="flex text-white
                     text-3xl
                     gap-3"
        >
          <Link href={"/schedules/previous"}>
            <li className={`${isPreviousVisible ? "" : "hidden"}`}>
              <RiChatHistoryFill />
            </li>
          </Link>
          <li className={`${isProfileVisible ? "" : "hidden"}`}>
            <Link href={"/profile"}>
              <IoPersonCircleSharp />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
