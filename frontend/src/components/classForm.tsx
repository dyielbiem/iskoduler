import { IoArrowBack } from "react-icons/io5";
import CustomSelect from "./customSelect";
import { useState, useRef, SetStateAction, useEffect } from "react";
import { postClass } from "@/utils/requests";

interface Props {
  visibility: boolean;
  setVisibility: React.Dispatch<SetStateAction<boolean>>;
}

const ClassForm = ({ visibility, setVisibility }: Props) => {
  const [className, setClassName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dayPlaceholder, setDayPlaceholder] = useState<string>("Day Schedule*");
  const [timeStart, setTimeStart] = useState<string>("");
  const [timeEnd, setTimeEnd] = useState<string>("");
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
    if ([className, dayPlaceholder, timeStart, timeEnd].some((item) => !item)) {
      return console.log("All required fields must be filled");
    }
    try {
      const newClass = await postClass(
        className,
        description,
        dayPlaceholder,
        timeStart,
        timeEnd
      );

      if (newClass.Error) throw Error(newClass.Error);

      setClassName("");
      setDescription("");
      setDayPlaceholder("Day Schedule*");
      setTimeStart("");
      setTimeEnd("");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div
      className={`bg-[rgba(0,0,0,0.5)]
                 fixed top-0 left-0
                 ${visibility ? "flex" : "hidden"}
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
            onClick={() => setVisibility((prevState) => !prevState)}
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
          placeholder={dayPlaceholder}
          setPlaceholder={setDayPlaceholder}
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
