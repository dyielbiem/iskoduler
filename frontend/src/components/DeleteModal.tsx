import { patchDeleteTask, patchDeleteClass } from "@/utils/schedulesRequests";
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
        const token = await localStorage.getItem("token");
        if (!token) return console.log("Unauthorized");
        const deletedTask = await patchDeleteTask(scheduleID, token);
        if (deletedTask.Error) throw Error(deletedTask.Error);
        setIsThisVisible((prevState) => !prevState);
        dispatch({ type: "DELETE_TASK", payload: deletedTask });
      } else if (type === "class") {
        const token = await localStorage.getItem("token");
        if (!token) return console.log("Unauthorized");
        const deletedClass = await patchDeleteClass(scheduleID, token);
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
        w-10/12 
        max-w-sm
        px-5 sm:px-8
        py-8"
      >
        <h2
          className="font-bold text-center
                     text-2xl"
        >
          Delete
        </h2>
        <p
          className="text-center font-medium
                     mb-4"
        >
          {`Are you sure to delete this ${type}? This action cannot be undone.`}
        </p>
        <div
          className="flex flex-col sm:flex-row items-center 
          justify-center gap-2 w-full"
        >
          <button
            className="bg-primary rounded-full
            font-bold text-white flex-1 w-full
            py-2 
            px-5
            text-lg"
            onClick={handleConfirmClick}
          >
            Confirm
          </button>
          <button
            className="rounded-full font-bold
            py-2 bg-zinc-300 flex-1 w-full
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
