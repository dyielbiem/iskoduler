import { BsThreeDots } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { GiFeather } from "react-icons/gi";
import { useRef, useEffect } from "react";

interface Props {
  isOptionVisible: boolean;
  setIsOptionVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleteModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ScheduleOperations = ({
  isOptionVisible,
  setIsOptionVisible,
  setIsDeleteModalVisible,
  setIsFormVisible,
}: Props) => {
  const optionRef = useRef<HTMLDivElement>(null);

  // Hide the task actions if clicked outside task actions component
  useEffect(() => {
    const checkClick = (event: MouseEvent) => {
      if (
        optionRef.current &&
        !optionRef.current.contains(event.target as Node)
      ) {
        setIsOptionVisible(false);
      }
    };

    if (isOptionVisible) {
      document.addEventListener("mousedown", checkClick);
      return () => {
        document.removeEventListener("mousedown", checkClick);
      };
    }
  }, [isOptionVisible]);

  // Function that will be called when delete is clicked
  const handleDeleteClick = () => {
    setIsDeleteModalVisible((prevState) => !prevState);
    setIsOptionVisible((prevState) => !prevState);
  };

  // Function that will be called when update is clicked
  const handleUpdateClick = () => {
    setIsFormVisible((prevState) => !prevState);
    setIsOptionVisible((prevState) => !prevState);
  };

  return (
    <div className="relative" ref={optionRef}>
      <BsThreeDots
        className="fill-gray-200 
                   cursor-pointer text-2xl"
        onClick={() => setIsOptionVisible((prevState) => !prevState)}
      />
      <ul
        className={`absolute top-full mt-1 right-0 z-20 rounded-lg
                   ${isOptionVisible ? "flex" : "hidden"} 
                   flex-col bg-gray-500
                   w-56`}
      >
        <li
          onClick={handleUpdateClick}
          className="flex w-full items-center 
                       cursor-pointer
                       rounded-lg  gap-3 py-3 px-4 
                       hover:bg-gray-400"
        >
          <GiFeather />
          <p>Edit</p>
        </li>
        <li
          onClick={handleDeleteClick}
          className="flex w-full items-center 
                       cursor-pointer
                       rounded-lg  gap-3 py-3 px-4 
                       hover:bg-gray-400"
        >
          <MdDelete />
          <p>Delete</p>
        </li>
      </ul>
    </div>
  );
};

export default ScheduleOperations;