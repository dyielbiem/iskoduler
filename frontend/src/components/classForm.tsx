import { IoArrowBack } from "react-icons/io5";
import CustomSelect from "./customSelect";
import { useState, useRef, SetStateAction, useEffect } from "react";
import { postClass, updateClass } from "@/utils/requests";
import useScheduleContext from "@/customHooks/useScheduleContext";

interface Props {
  isVisible: boolean;
  setIsVisible: React.Dispatch<SetStateAction<boolean>>;
  classNamePlaceholder: string;
  descriptionPlaceholder: string;
  daySchedulePlaceholder: string;
  timeStartPlaceholder: string;
  timeEndPlaceholder: string;
  action: { type: "ADD" } | { type: "EDIT"; classID: string };
}

const ClassForm = ({
  isVisible,
  setIsVisible,
  classNamePlaceholder,
  descriptionPlaceholder,
  daySchedulePlaceholder,
  timeStartPlaceholder,
  timeEndPlaceholder,
  action,
}: Props) => {
  const [className, setClassName] = useState<string>(classNamePlaceholder);
  const [description, setDescription] = useState<string>(
    descriptionPlaceholder
  );
  const [daySchedule, setDaySchedule] = useState<string>(
    daySchedulePlaceholder
  );
  const [timeStart, setTimeStart] = useState<string>(timeStartPlaceholder);
  const [timeEnd, setTimeEnd] = useState<string>(timeEndPlaceholder);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const timeStartRef = useRef<HTMLInputElement>(null);
  const timeEndRef = useRef<HTMLInputElement>(null);
  const dayOptions: string[] = [
    "Day Schedule",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const { dispatch } = useScheduleContext();

  const timeFormatter = (time: string): Date => {
    return new Date(`01/01/1970 ${time}`);
  };

  const setTimeInputFocus = (ref: React.RefObject<HTMLInputElement>) => {
    ref.current?.focus();
  };

  useEffect(() => {
    if (timeFormatter(timeStart) < timeFormatter(timeEnd)) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [timeStart, timeEnd]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if ([className, daySchedule, timeStart, timeEnd].some((item) => !item)) {
      return console.log("All required fields must be filled");
    }
    try {
      if (action.type === "ADD") {
        const newClass = await postClass(
          className,
          description,
          daySchedule,
          timeStart,
          timeEnd
        );

        if (newClass.Error) throw Error(newClass.Error);

        setClassName("");
        setDescription("");
        setDaySchedule("Day Schedule*");
        setTimeStart("");
        setTimeEnd("");
        dispatch({ type: "ADD_CLASS", payload: newClass });
        setIsVisible((prevState) => !prevState);
      } else if (action.type === "EDIT") {
        if (
          className === classNamePlaceholder &&
          description === descriptionPlaceholder &&
          daySchedule === daySchedulePlaceholder &&
          timeStart === timeStartPlaceholder &&
          timeEnd === timeEndPlaceholder
        )
          return setIsVisible((prevState) => !prevState);

        const editedClass = await updateClass(action.classID, {
          className,
          description,
          daySchedule,
          timeStart,
          timeEnd,
        });

        if (editedClass.Error) throw Error(editedClass.Error);

        dispatch({ type: "EDIT_CLASS", payload: editedClass });

        return setIsVisible((prevState) => !prevState);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div
      className={`bg-[rgba(0,0,0,0.5)] text-black
                 fixed top-0 left-0
                 ${isVisible ? "flex" : "hidden"}
                 justify-center items-center
                 w-screen
                 h-screen z-[60]
                 `}
    >
      <form
        className="flex flex-col bg-gray-500 
                   w-screen
                   h-screen
                   p-2
                   gap-3
                   overflow-y-scroll"
        onSubmit={handleSubmit}
      >
        <div className="flex text-2xl gap-3 text-white">
          <button
            type="button"
            onClick={() => setIsVisible((prevState) => !prevState)}
          >
            <IoArrowBack />
          </button>
          <h2 className="font-bold">Add new class</h2>
        </div>
        <input
          type="text"
          value={className}
          onChange={(event) => setClassName(event.target.value)}
          placeholder="Class Name*"
          className="w-full rounded-xl outline-none
                     py-2
                     px-3"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={3}
          className="w-full rounded-xl outline-none
                     resize-none
                     py-2
                     px-3"
        />
        <CustomSelect
          selectOptions={dayOptions}
          placeholder={daySchedule}
          setPlaceholder={setDaySchedule}
        />
        <div
          className="flex bg-white w-full rounded-xl
                     justify-between   
                     py-2
                     px-3"
          onClick={() => setTimeInputFocus(timeStartRef)}
        >
          <input
            value={timeStart}
            onChange={(event) => setTimeStart(event.target.value)}
            type="time"
            className="outline-none"
            id="timeStart"
            ref={timeStartRef}
          />
          <label htmlFor="timeStart" className="text-gray-400">
            Time Start*
          </label>
        </div>
        <div
          className="flex bg-white w-full rounded-xl
                     justify-between   
                     py-2
                     px-3"
          onClick={() => setTimeInputFocus(timeEndRef)}
        >
          <input
            value={timeEnd}
            onChange={(event) => setTimeEnd(event.target.value)}
            type="time"
            className="outline-none"
            id="timeEnd"
            onClick={() => setTimeInputFocus(timeEndRef)}
            ref={timeEndRef}
          />
          <label htmlFor="timeEnd" className="text-gray-400">
            Time End*
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-400 text-white font-bold
                    rounded-full disabled:cursor-not-allowed
                    text-xl
                    py-3"
          disabled={isButtonDisabled}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ClassForm;
