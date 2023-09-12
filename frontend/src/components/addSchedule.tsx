import { MdAdd } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { GoTasklist } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";

interface Props {
  setIsTaskFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsClassFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isTaskFormVisible: boolean;
  isClassFormVisible: boolean;
}

const AddSchedule = ({
  setIsTaskFormVisible,
  setIsClassFormVisible,
  isClassFormVisible,
  isTaskFormVisible,
}: Props) => {
  const [isAddButtonVisible, setIsAddButtonVisible] = useState<boolean>(true);
  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);

  // Check if both task and class form are hidden, then show the add schedule button
  useEffect(() => {
    if (!isTaskFormVisible && !isClassFormVisible) {
      setIsAddButtonVisible(true);
    } else if (isClassFormVisible || isTaskFormVisible) {
      setIsAddButtonVisible(false);
    }
  }, [isClassFormVisible, isTaskFormVisible]);

  // Show the add schedule modal then hide add schedule button
  const showModal = () => {
    setIsAddButtonVisible(false);
    setIsAddModalVisible(true);
  };

  // Show the add schedule button then hide add schedule modal
  const showButton = () => {
    setIsAddButtonVisible(true);
    setIsAddModalVisible(false);
  };

  // Show the task form then hide add schedule modal
  const handleTaskClick = () => {
    setIsAddModalVisible(false);
    setIsTaskFormVisible((prevState) => !prevState);
  };

  // Show the class form then hide add schedule modal
  const handleClassClick = () => {
    setIsAddModalVisible(false);
    setIsClassFormVisible((prevState) => !prevState);
  };

  return (
    <>
      <button
        className={`bg-primary flex items-center
        fixed md:static
        bottom-[6%] md:bottom-0
        right-[6%] md:right-0
        gap-1
        rounded-full md:rounded-xl
        text-white z-30
        ${isAddButtonVisible ? "inline-block" : "hidden"}
        px-3 md:px-4
        py-3 md:py-3
        `}
        onClick={showModal}
      >
        <MdAdd className="fill-white bg-primary text-3xl md:text-2xl" />
        <span
          className="text-lg bg-inherit text-inherit font-semibold
          hidden md:inline"
        >
          Add schedule
        </span>
      </button>

      <div
        className={`fixed w-screen h-screen top-0 left-0
        ${isAddModalVisible ? "flex" : "hidden"}
        md:py-1
        bg-transparent z-50 justify-center 
        items-end sm:items-center`}
      >
        <div
          className="bg-[rgba(0,0,0,0.3)] w-full h-full
          absolute top-0 left-0"
          onClick={showButton}
        ></div>
        <div
          className={`items-start flex-col
          bg-white shadow-customShadow
          gap-2
          w-full
          rounded-md sm:rounded-xl
          sm:max-w-xl
          py-1 sm:py-2
          px-1 sm:px-2
          mx-1
          mb-1
          z-50`}
        >
          <div className="flex w-full px-2 justify-between items-center ">
            <h2
              className="font-bold my-2
              text-xl"
            >
              Add
            </h2>
            <button onClick={showButton} className="text-3xl">
              <IoClose />
            </button>
          </div>
          <ul
            className="flex flex-col font-semibold
            text-lg"
          >
            <li
              className="flex w-full items-center
              group cursor-pointer
              rounded
              hover:bg-primary hover:text-white
              gap-4
              px-3
              py-2"
              onClick={handleTaskClick}
            >
              <GoTasklist className="text-xl group-hover:bg-primary group-hover:fill-white" />
              Task
            </li>
            <li
              className="flex w-full items-center
              hover:bg-primary hover:text-white
              cursor-pointer
              rounded
              group
              gap-4
              px-3
              py-2"
              onClick={handleClassClick}
            >
              <BsFillPeopleFill className="text-xl group-hover:bg-primary group-hover:fill-white" />
              Class
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AddSchedule;
