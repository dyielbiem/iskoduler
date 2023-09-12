import { useState, SetStateAction } from "react";
import CustomSelect from "./CustomSelect";
import DateTimePicker from "./DateTimePicker";
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
  const [taskName, setTaskName] = useState<string>(taskNamePlaceholder);
  const [description, setDescription] = useState<string>(
    descriptionPlaceholder
  );
  const [subject, setSubject] = useState<string>(subjectPlaceholder);
  const [type, setType] = useState<string>(typePlaceholder);
  const [deadline, setDeadline] = useState<string>(deadlinePlaceholder);
  const selectOptions: string[] = ["Type", "Activity", "Assignment"];
  const [error, setError] = useState<string>("");
  const currentYear: string = String(new Date().getFullYear());
  const currentMonth: string = String(new Date().getMonth() + 1).padStart(
    2,
    "0"
  );
  const currentDay: string = String(new Date().getDate()).padStart(2, "0");
  const stringDate: string = `${currentYear}-${currentMonth}-${currentDay}`;

  const closeForm = () => {
    // Clear all the fields in the task form
    if (action.type === "ADD") {
      setTaskName("");
      setDescription("");
      setSubject("");
      setDeadline("* Deadline");
      setType("* Type");
    }
    // Hide the task form
    setIsTaskFormVisible((prevState) => !prevState);
    setError("");
  };

  // Function that will be called when submit is clicked
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const requiredField = [taskName, subject, type, deadline];
    const timeNow = DateTime.local();
    const timeZone = timeNow.toFormat("ZZZZ");

    // Check if there is an empty required field
    if (
      requiredField.some((field) => !String(field).trim()) ||
      type === "* Type" ||
      deadline === "* Deadline"
    )
      return setError("All required fields must be filled in");

    // Check if action type of the form is to add new task
    if (action.type === "ADD") {
      const newTask = await postTask(
        taskName,
        String(`${deadline} ${timeZone}`),
        type,
        subject,
        description
      );

      if (Object.hasOwn(newTask, "Error")) return setError(newTask.Error);

      // Add the new task in the task view
      dispatch({ type: "ADD_TASK", payload: newTask });

      closeForm();
    } else if (action.type === "EDIT") {
      if (
        taskName === taskNamePlaceholder &&
        description === descriptionPlaceholder &&
        type === typePlaceholder &&
        subject === subjectPlaceholder &&
        deadline === deadlinePlaceholder
      )
        return setIsTaskFormVisible((prevState) => !prevState);

      const editedTask = await updateTask(action.taskID, {
        taskName,
        deadline: String(`${deadline} ${timeZone}`),
        type,
        subject,
        description,
      });

      if (Object.hasOwn(editedTask, "Error")) return setError(editedTask.Error);

      // Add the new task in the task view
      dispatch({ type: "EDIT_TASK", payload: editedTask });

      // Hide the task form and clear error messsage if it exists
      setIsTaskFormVisible((prevState) => !prevState);
      setError("");
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 bg-transparent
      justify-center items-center z-50 text-black
      ${isTaskFormVisible ? "flex flex-col" : "hidden"} 
      h-screen 
      w-screen`}
    >
      <div
        className="w-full h-full fixed top-0 left-0 bg-[rgba(0,0,0,0.3)]"
        onClick={closeForm}
      ></div>
      <form
        className="bg-white overflow-y-auto
        flex flex-col
        gap-4 
        sm:max-w-lg
        sm:max-h-[90%]
        h-screen sm:h-fit
        w-full
        px-2 sm:px-6
        py-3 sm:py-6
        sm:rounded-2xl
        z-10
        text-base"
        onSubmit={handleSubmit}
      >
        <div
          className="flex items-center 
                     gap-3"
        >
          <button
            type="button"
            onClick={closeForm}
            className="text-2xl text-white"
          >
            <IoArrowBack />
          </button>
          <h2 className="text-black font-bold text-2xl">
            {action.type === "ADD" ? "Add new" : "Edit"} task
          </h2>
        </div>
        <input
          type="text"
          placeholder={"* Title"}
          value={taskName}
          onChange={(event) => setTaskName(event.target.value)}
          className="w-full outline-none 
          text-base
          py-2
          px-3"
        />
        <textarea
          rows={3}
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="w-full outline-none resize-none"
        />
        <input
          type="text"
          placeholder="* Subject"
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

        <DateTimePicker
          setDeadline={setDeadline}
          deadline={deadline}
          minDateTime={stringDate}
        />
        {error && (
          <p
            className="text-primary font-semibold 
            text-left px-2"
          >
            {error}
          </p>
        )}
        <button
          type="submit"
          className="bg-primary  text-white font-bold
          rounded-full
          text-lg
          mt-8
          py-3"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
