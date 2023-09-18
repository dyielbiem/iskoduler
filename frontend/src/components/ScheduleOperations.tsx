import { BsThreeDots } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { GiFeather } from "react-icons/gi";
import { useRef, useEffect, useContext } from "react";
import useTaskOperationContext from "@/customHooks/useTaskOperationContext";

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
  const { isEditVisible, isDeleteVisible } = useTaskOperationContext();

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

  // Function that will be called when edit is clicked
  const handleEditClick = () => {
    setIsFormVisible((prevState) => !prevState);
    setIsOptionVisible((prevState) => !prevState);
  };

  return (
    <div className="relative bg-tertiary" ref={optionRef}>
      <BsThreeDots
        className="fill-black rounded-full p-1.5 hover:bg-zinc-200 hover:fill-gray-800
        cursor-pointer text-3xl md:text-4xl bg-tertiary"
        onClick={() => setIsOptionVisible((prevState) => !prevState)}
      />
      <ul
        className={`absolute top-0 right-0 z-20 rounded-lg
        ${isOptionVisible ? "flex" : "hidden"} 
        flex-col shadow-md border-[1px]
        translate-y-8 md:translate-y-10 p-1
        w-56`}
      >
        {isEditVisible && (
          <li
            onClick={handleEditClick}
            className="flex w-full items-center 
            cursor-pointer
            rounded  gap-3 py-3 px-4 
            group hover:bg-zinc-200"
          >
            <GiFeather className="group-hover:bg-zinc-200" />
            <p className="group-hover:bg-zinc-200  font-medium">Edit</p>
          </li>
        )}
        {isDeleteVisible && (
          <li
            onClick={handleDeleteClick}
            className="flex w-full items-center 
            cursor-pointer
            rounded gap-3 py-3 px-4
            group hover:bg-zinc-200"
          >
            <MdDelete className="group-hover:bg-zinc-200" />
            <p className="group-hover:bg-zinc-200  font-medium">Delete</p>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ScheduleOperations;
