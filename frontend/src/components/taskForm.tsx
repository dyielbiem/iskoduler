import { useState, SetStateAction } from "react";
import CustomSelect from "./customSelect";
import { IoCalendarSharp } from "react-icons/io5";
import DeadlinePicker from "./deadlinePicker";
import { IoArrowBack } from "react-icons/io5";
import { postTask } from "@/utils/requests";
import { DateTime } from "luxon";

interface Props {
  taskFormVisibility: boolean;
  showTaskForm: () => void;
}

const TaskForm = ({ taskFormVisibility, showTaskForm }: Props) => {
  const [isDeadlinePickerVisible, setIsDeadlinePickerVisible] =
    useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [type, setType] = useState<string>("Type*");
  const [deadline, setDeadline] = useState("Deadline*");
  const selectOptions: string[] = ["Type", "Activity", "Assignment", "dasda"];

  const showDeadlineFunction = () => {
    setIsDeadlinePickerVisible((prevState) => !prevState);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const requiredField = [taskName, subject, type, deadline];

    if (
      requiredField.some((field) => !String(field).trim()) ||
      type === "Type*"
    )
      return console.log("All required fields must be filled");

    const timeNow = DateTime.local();
    const timeZone = timeNow.toFormat("ZZZZ");

    try {
      const newTask = await postTask(
        taskName,
        String(`${deadline} ${timeZone}`),
        type,
        subject,
        description
      );

      if (newTask.Error) throw Error(newTask.Error);
      setTaskName("");
      setDescription("");
      setSubject("");
      setDeadline("Deadline*");
      setType("Type*");
      showTaskForm();
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div
      className={`fixed top-0 bg-[rgba(0,0,0,0.5)]
                 justify-center items-center
                 ${taskFormVisibility ? "flex" : "hidden"} 
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
                     z-30"
        onSubmit={handleSubmit}
      >
        <div
          className="flex items-center 
                     gap-3"
        >
          <button
            type="button"
            onClick={showTaskForm}
            className="text-2xl text-white"
          >
            <IoArrowBack />
          </button>
          <h2 className="text-white font-bold text-2xl">Add new task</h2>
        </div>
        <input
          type="text"
          placeholder="Title*"
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
          onClick={showDeadlineFunction}
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
      <DeadlinePicker
        showDeadlineFunction={showDeadlineFunction}
        isDeadlinePickerVisible={isDeadlinePickerVisible}
        setDeadline={setDeadline}
      />
    </div>
  );
};

export default TaskForm;
