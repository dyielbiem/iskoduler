import { useState, SetStateAction } from "react";
import CustomSelect from "./customSelect";
import { IoCalendarSharp } from "react-icons/io5";
import DateTimePicker from "./dateTimePicker";
import { IoArrowBack } from "react-icons/io5";
import { postTask, updateTask } from "@/utils/requests";
import { DateTime } from "luxon";
import useScheduleContext from "@/customHooks/useScheduleContext";

interface Props {
  isTaskFormVisible: boolean;
  setIsTaskFormVisible: React.Dispatch<SetStateAction<boolean>>;
  taskNamePlaceholder: string;
  descriptionPlaceholder: string;
  subjectPlaceholder: string;
  typePlaceholder: string;
  deadlinePlaceholder: string;
  action: { type: "ADD" } | { type: "EDIT"; taskID: string };
}

const TaskForm = ({
  isTaskFormVisible,
  setIsTaskFormVisible,
  taskNamePlaceholder,
  descriptionPlaceholder,
  subjectPlaceholder,
  typePlaceholder,
  deadlinePlaceholder,
  action,
}: Props) => {
  const { dispatch } = useScheduleContext();
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] =
    useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>(taskNamePlaceholder);
  const [description, setDescription] = useState<string>(
    descriptionPlaceholder
  );
  const [subject, setSubject] = useState<string>(subjectPlaceholder);
  const [type, setType] = useState<string>(typePlaceholder);
  const [deadline, setDeadline] = useState<string>(deadlinePlaceholder);
  const selectOptions: string[] = ["Type", "Activity", "Assignment"];

  // Function that will be called when submit is clicked
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const requiredField = [taskName, subject, type, deadline];
    const timeNow = DateTime.local();
    const timeZone = timeNow.toFormat("ZZZZ");

    // Check if there is an empty required field
    if (
      requiredField.some((field) => !String(field).trim()) ||
      type === "Type*" ||
      deadline === "Deadline*"
    )
      return console.log("All required fields must be filled");

    try {
      // Check if action type of the form is to add new task
      if (action.type === "ADD") {
        const newTask = await postTask(
          taskName,
          String(`${deadline} ${timeZone}`),
          type,
          subject,
          description
        );

        if (newTask.Error) throw Error(newTask.Error);

        // Clear all the fields in the task form
        setTaskName("");
        setDescription("");
        setSubject("");
        setDeadline("Deadline*");
        setType("Type*");

        // Add the new task in the task view
        dispatch({ type: "ADD_TASK", payload: newTask });

        // Hide the task form
        setIsTaskFormVisible((prevState) => !prevState);
      } else if (action.type === "EDIT") {
        if (
          taskName === taskNamePlaceholder &&
          description === descriptionPlaceholder &&
          type === typePlaceholder &&
          subject === subjectPlaceholder &&
          deadline === deadlinePlaceholder
        ) {
          return setIsTaskFormVisible((prevState) => !prevState);
        }

        const editedTask = await updateTask(action.taskID, {
          taskName,
          deadline: String(`${deadline} ${timeZone}`),
          type,
          subject,
          description,
        });

        if (editedTask.Error) throw Error(editedTask.Error);

        // // Add the new task in the task view
        dispatch({ type: "EDIT_TASK", payload: editedTask });

        // Hide the task form
        setIsTaskFormVisible((prevState) => !prevState);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 bg-[rgba(0,0,0,0.5)]
                 justify-center items-center z-50 text-black
                 ${isTaskFormVisible ? "flex" : "hidden"} 
                 min-h-screen 
                 w-screen`}
    >
      <form
        className="bg-gray-600 overflow-y-scroll
                     flex flex-col
                     gap-3 
                     h-screen 
                     w-screen 
                     p-2
                     "
        onSubmit={handleSubmit}
      >
        <div
          className="flex items-center 
                     gap-3"
        >
          <button
            type="button"
            onClick={() => setIsTaskFormVisible((prevState) => !prevState)}
            className="text-2xl text-white"
          >
            <IoArrowBack />
          </button>
          <h2 className="text-white font-bold text-2xl">Add new task</h2>
        </div>
        <input
          type="text"
          placeholder={"Title*"}
          value={taskName}
          onChange={(event) => setTaskName(event.target.value)}
          className="w-full rounded-xl outline-none
                     py-2
                     px-3"
        />
        <textarea
          rows={3}
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="w-full rounded-xl outline-none resize-none 
                     py-2
                     px-3"
        />
        <input
          type="text"
          placeholder="Subject*"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          className="w-full rounded-xl outline-none
                     py-2
                     px-3"
        />
        <CustomSelect
          selectOptions={selectOptions}
          placeholder={type}
          setPlaceholder={setType}
        />
        <div
          className="w-full rounded-xl outline-none flex justify-between
                     items-center bg-white cursor-pointer
                     py-2
                     px-3"
          onClick={() => setIsDateTimePickerVisible((prevState) => !prevState)}
        >
          <p
            className={`${
              deadline === "Deadline*" ? "text-gray-400" : "text-black"
            }`}
          >
            {deadline}
          </p>
          <IoCalendarSharp />
        </div>
        <button
          type="submit"
          className="bg-blue-400 text-white font-bold
                    rounded-full
                    text-xl
                    py-3"
        >
          Submit
        </button>
      </form>

      <DateTimePicker
        setIsDateTimePickerVisible={setIsDateTimePickerVisible}
        isDateTimePickerVisible={isDateTimePickerVisible}
        setDeadline={setDeadline}
      />
    </div>
  );
};

export default TaskForm;
