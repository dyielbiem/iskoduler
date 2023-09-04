import { deleteTask, deleteClass } from "@/utils/requests";
import useScheduleContext from "@/customHooks/useScheduleContext";

interface Props {
  isThisVisible: boolean;
  setIsThisVisible: React.Dispatch<React.SetStateAction<boolean>>;
  scheduleID: string;
  type: "task" | "class";
}

const DeleteModal = ({
  isThisVisible,
  setIsThisVisible,
  scheduleID,
  type,
}: Props) => {
  const { dispatch } = useScheduleContext();
  const handleConfirmClick = async () => {
    try {
      if (type === "task") {
        const deletedTask = await deleteTask(scheduleID);
        if (deletedTask.Error) throw Error(deletedTask.Error);
        setIsThisVisible((prevState) => !prevState);
        dispatch({ type: "DELETE_TASK", payload: deletedTask });
      } else if (type === "class") {
        const deletedClass = await deleteClass(scheduleID);
        if (deletedClass.Error) throw Error(deletedClass.Error);
        setIsThisVisible((prevState) => !prevState);
        dispatch({ type: "DELETE_CLASS", payload: deletedClass });
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div
      className={`bg-[rgba(0,0,0,0.2)] z-50 fixed
                  top-0 left-0 
                  ${isThisVisible ? "flex" : "hidden"}
                  justify-center items-center
                  w-screen 
                  h-screen`}
    >
      <div
        className="bg-white rounded-xl
                     flex flex-col justify-center items-center
                     gap-2                 
                     w-11/12
                     px-3
                     py-5"
      >
        <h2
          className="font-bold text-center
                     text-2xl"
        >
          Delete
        </h2>
        <p
          className="text-center 
                     mb-4"
        >
          {`Are you sure to delete this ${type}? This action cannot be undone.`}
        </p>
        <div>
          <button
            className="bg-primary rounded-full
                        font-bold text-white
                        py-2 
                        px-5
                        text-lg"
            onClick={handleConfirmClick}
          >
            Confirm
          </button>
          <button
            className="rounded-full font-bold
                       py-2 
                       px-5
                       text-lg"
            onClick={() => setIsThisVisible((prevState) => !prevState)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
