import { IoArrowBack } from "react-icons/io5";
import CustomSelect from "./CustomSelect";
import { useState, useRef, SetStateAction, useEffect } from "react";
import { postClass, updateClass } from "@/utils/schedulesRequests";
import useScheduleContext from "@/customHooks/useScheduleContext";
import { useRouter } from "next/router";

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
  const { dispatch } = useScheduleContext();
  const [className, setClassName] = useState<string>(classNamePlaceholder);
  const [description, setDescription] = useState<string>(
    descriptionPlaceholder
  );
  const [daySchedule, setDaySchedule] = useState<string>(
    daySchedulePlaceholder
  );
  const [timeStart, setTimeStart] = useState<string>(timeStartPlaceholder);
  const [timeEnd, setTimeEnd] = useState<string>(timeEndPlaceholder);
  const timeStartRef = useRef<HTMLInputElement>(null);
  const timeEndRef = useRef<HTMLInputElement>(null);
  const dayOptions: string[] = [
    "Scheduled day",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (router.query.form !== "class") {
      clearForm();
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [router.query.form]);

  const timeFormatter = (time: string): Date => {
    return new Date(`01/01/1970 ${time}`);
  };

  const setTimeInputFocus = (ref: React.RefObject<HTMLInputElement>) => {
    ref.current?.focus();
  };

  const clearForm = () => {
    if (action.type === "ADD") {
      setClassName("");
      setDescription("");
      setDaySchedule("* Scheduled day");
      setTimeStart("");
      setTimeEnd("");
    }
  };

  const closeForm = () => {
    clearForm();
    setIsVisible((prevState) => !prevState);
    setError("");
    router.push("/schedules", undefined, { shallow: true });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      [className, daySchedule, timeStart, timeEnd].some((item) => !item) ||
      daySchedule === "* Scheduled day"
    ) {
      return setError("All required fields must be filled in");
    }

    if (timeFormatter(timeStart) >= timeFormatter(timeEnd))
      return setError("Scheduled time range is invalid");

    if (action.type === "ADD") {
      const newClass = await postClass(
        className,
        description,
        daySchedule,
        timeStart,
        timeEnd
      );

      if (Object.hasOwn(newClass, "Error")) return setError(newClass.Error);

      dispatch({ type: "ADD_CLASS", payload: newClass });
      closeForm();
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

      if (Object.hasOwn(editedClass, "Error"))
        return setError(editedClass.Error);

      dispatch({ type: "EDIT_CLASS", payload: editedClass });

      setIsVisible((prevState) => !prevState);
      setError("");
    }
  };

  return (
    <div
      className={`bg-transparent text-black
      fixed top-0 left-0
      ${isVisible || router.query.form === "class" ? "flex" : "hidden"}
      justify-center items-center
      w-screen
      h-screen z-50`}
    >
      <div
        className="w-full h-full fixed top-0 left-0 bg-[rgba(0,0,0,0.3)]"
        onClick={closeForm}
      ></div>
      <form
        className="flex flex-col bg-white 
        overflow-y-auto
        sm:max-w-lg
        sm:max-h-[90%]
        sm:rounded-xl
        w-full
        h-full sm:h-fit
        px-2 sm:px-6
        py-3 sm:py-6
        gap-3
        text-base
        z-50"
        onSubmit={handleSubmit}
      >
        <div className="flex text-2xl gap-3 text-white">
          <button type="button" onClick={closeForm}>
            <IoArrowBack />
          </button>
          <h2 className="font-bold">
            {action.type === "ADD" ? "Add new" : "Edit"} class
          </h2>
        </div>
        <input
          type="text"
          value={className}
          onChange={(event) => setClassName(event.target.value)}
          placeholder="* Class name"
          className="w-full rounded-xl outline-none
                     py-2
                     px-3"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={3}
          className="w-full outline-none
          resize-none"
        />
        <CustomSelect
          selectOptions={dayOptions}
          placeholder={daySchedule}
          setPlaceholder={setDaySchedule}
        />
        <div
          className="flex bg-white w-full rounded-md
          justify-between shadow-md border-[1px] gap-3
          py-3
          px-2"
          onClick={() => setTimeInputFocus(timeStartRef)}
        >
          <label
            htmlFor="timeStart"
            className="text-gray-400 text-right text-base"
          >
            * Time start
          </label>
          <input
            value={timeStart}
            onChange={(event) => setTimeStart(event.target.value)}
            type="time"
            id="timeStart"
            ref={timeStartRef}
            className="!p-0 !shadow-none !border-0 !w-fit"
          />
        </div>
        <div
          className="flex bg-white w-full rounded-md
          justify-between shadow-md border-[1px] gap-3
          py-3
          px-2"
          onClick={() => setTimeInputFocus(timeEndRef)}
        >
          <label
            htmlFor="timeEnd"
            className="text-gray-400 text-left text-base flex-1"
          >
            * Time end
          </label>
          <input
            value={timeEnd}
            onChange={(event) => setTimeEnd(event.target.value)}
            type="time"
            id="timeEnd"
            onClick={() => setTimeInputFocus(timeEndRef)}
            ref={timeEndRef}
            className="!p-0 !shadow-none !border-0 !w-fit"
          />
        </div>
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
          className="bg-primary text-white font-bold
          rounded-full
          text-lg mt-8
          py-3"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ClassForm;
