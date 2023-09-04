import { MdAdd } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { GoTasklist } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

interface Props {
  setIsTaskFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  showClassForm: () => void;
}

const AddSchedule = ({ setIsTaskFormVisible, showClassForm }: Props) => {
  const [isTypeVisible, setIsTypeVisible] = useState<boolean>(false);

  const handleTaskClick = () => {
    setIsTypeVisible((prevState) => !prevState);
    setIsTaskFormVisible((prevState) => !prevState);
  };

  const handleClassClick = () => {
    setIsTypeVisible((prevState) => !prevState);
    showClassForm();
  };

  return (
    <>
      <button
        className={`fixed bottom-[6%] right-[6%] bg-primary 
                   rounded-full text-white
                   ${isTypeVisible ? "hidden" : "inline-block"}
                   p-3
                   text-3xl`}
        onClick={() => setIsTypeVisible((prevState) => !prevState)}
      >
        <MdAdd className="fill-white bg-primary" />
      </button>

      <div
        className={`items-start flex-col
                   rounded-t-xl fixed bg-white shadow-customShadow
                   ${isTypeVisible ? "flex" : "hidden"}
                   gap-2
                   w-full
                   bottom-0
                   py-4`}
      >
        <div className="flex w-full px-4 justify-between items-center">
          <h2
            className="font-bold
                       text-xl"
          >
            Add
          </h2>
          <button
            onClick={() => setIsTypeVisible((prevState) => !prevState)}
            className="text-3xl"
          >
            <IoClose />
          </button>
        </div>

        <ul
          className="flex flex-col font-semibold
                     text-lg w-full"
        >
          <li
            className="flex w-full items-center 
                     hover:bg-gray-300 cursor-pointer
                       gap-4
                       px-4
                       py-2"
            onClick={handleTaskClick}
          >
            <GoTasklist className="text-xl" />
            Task
          </li>
          <li
            className="flex w-full items-center 
                     hover:bg-gray-300 cursor-pointer
                       gap-4
                       px-4
                       py-2"
            onClick={handleClassClick}
          >
            <BsFillPeopleFill className="text-xl" />
            Class
          </li>
        </ul>
      </div>
    </>
  );
};

export default AddSchedule;
