import { TbBellFilled } from "react-icons/tb";
import { IoSettings } from "react-icons/io5";

const AuthorizedHeader = () => {
  return (
    <header
      className="sticky top-0 bg-gray-600 items-center flex justify-center
                 w-full h-16"
    >
      <div
        className="flex justify-between items-center
                   py-3 
                   w-[95%]"
      >
        <h1
          className="font-bold text-white
                     text-3xl"
        >
          ISKOduler
        </h1>
        <ul
          className="flex
                     text-2xl
                     gap-2"
        >
          <li>
            <TbBellFilled />
          </li>
          <li>
            <IoSettings />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default AuthorizedHeader;
