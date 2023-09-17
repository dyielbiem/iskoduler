import { useRouter } from "next/router";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { GoTasklist } from "react-icons/go";
import { IoClose } from "react-icons/io5";

interface Props {
  isAddModalVisible: boolean;
  setIsAddButtonVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTaskFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsClassFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddScheduleModal = ({
  setIsAddButtonVisible,
  setIsAddModalVisible,
  setIsTaskFormVisible,
  isAddModalVisible,
  setIsClassFormVisible,
}: Props) => {
  const router = useRouter();
  // Show the add schedule button then hide add schedule modal
  const showButton = () => {
    setIsAddButtonVisible(true);
    setIsAddModalVisible(false);
  };

  // Show the task form then hide add schedule modal
  const handleTaskClick = () => {
    setIsAddModalVisible(false);
    setIsTaskFormVisible((prevState) => !prevState);
    router.query.form = "task";
    router.push(router, undefined, { shallow: true });
  };

  // Show the class form then hide add schedule modal
  const handleClassClick = () => {
    setIsAddModalVisible(false);
    router.query.form = "class";
    router.push(router, undefined, { shallow: true });
  };

  return (
    <div
      className={`fixed w-screen h-screen top-0 left-0
        ${isAddModalVisible ? "flex" : "hidden"}
        bg-transparent z-50 justify-center 
        items-center`}
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
        max-w-md sm:max-w-lg
        w-11/12 sm:w-full 
        rounded-lg
        py-1 sm:py-2
        px-1 sm:px-2
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
            group cursor-pointer font-bold
            rounded
            hover:bg-primary hover:text-white
            text-base md:text-lg
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
            cursor-pointer font-bold
            rounded
            text-base md:text-lg
            group
            gap-4
            px-3
            py-2"
            onClick={handleClassClick}
          >
            <BsJournalBookmarkFill className="text-xl group-hover:bg-primary group-hover:fill-white" />
            Class
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AddScheduleModal;
