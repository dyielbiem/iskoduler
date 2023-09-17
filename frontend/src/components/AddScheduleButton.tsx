import { MdAdd } from "react-icons/md";
import { useEffect } from "react";

interface Props {
  setIsAddButtonVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isTaskFormVisible: boolean;
  isClassFormVisible: boolean;
  isAddButtonVisible: boolean;
  type: "small" | "large";
}

const AddScheduleButton = ({
  isAddButtonVisible,
  setIsAddButtonVisible,
  setIsAddModalVisible,
  isClassFormVisible,
  isTaskFormVisible,
  type,
}: Props) => {
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

  return (
    <button
      className={`bg-primary items-center
      fixed md:static
      bottom-[6%] md:bottom-0
      right-[6%] md:right-0
      gap-1
      rounded-full md:rounded-xl
      text-white
      ${type === "small" && isAddButtonVisible ? "flex md:hidden" : "hidden"}
      ${type === "large" && "hidden md:flex"}
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
  );
};

export default AddScheduleButton;
