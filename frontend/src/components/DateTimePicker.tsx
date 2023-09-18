import { useState, SetStateAction, useEffect } from "react";
import { IoCalendarSharp, IoClose } from "react-icons/io5";
import { parse, format } from "date-fns";

interface Props {
  setDeadline: React.Dispatch<SetStateAction<string>>;
  deadline: string;
  minDateTime: string;
}

const DateTimePicker = ({ setDeadline, deadline, minDateTime }: Props) => {
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] =
    useState<boolean>(false);
  const [time, setTime] = useState<string>("23:59");
  const [date, setDate] = useState<string>(minDateTime);

  // Function that manage the visibility of date time picker
  const showPicker = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    (event.target as HTMLInputElement).showPicker();
  };

  // Function that will be called when submit is called
  const handleSubmit = () => {
    const time24: Date = parse(time, "HH:mm", new Date());
    const time12: string = format(time24, "hh:mm a");
    setDeadline(`${date} ${time12}`);
    setIsDateTimePickerVisible((prevState) => !prevState);
  };

  useEffect(() => {
    if (deadline === "* Deadline") {
      setDate(minDateTime);
      setTime("23:59");
    }
  }, [deadline]);

  return (
    <>
      <div
        className="w-full rounded-md outline-none flex justify-between
          items-center cursor-pointer shadow-md font-medium border-[1px]
          py-3
          px-2"
        onClick={() => setIsDateTimePickerVisible((prevState) => !prevState)}
      >
        <p
          className={`${
            deadline === "* Deadline"
              ? "text-gray-400 font-normal"
              : "text-black font-semibold"
          }`}
        >
          {deadline}
        </p>
        <IoCalendarSharp />
      </div>

      {/* Modal Date Time Picker */}
      <div
        className={`absolute top-0 left-0 bg-[rgba(0,0,0,0.6)]
        ${isDateTimePickerVisible ? "flex" : "hidden"}
        justify-center items-center
        w-screen h-screen px-4 z-30`}
      >
        <div
          className="flex flex-col justify-center items-center
          bg-white rounded-xl
          w-full
          max-w-xl
          gap-4
          px-6
          py-6"
        >
          <div className="flex justify-between items-center w-full">
            <h2
              className="self-start font-bold
              text-2xl"
            >
              Deadline
            </h2>
            <IoClose
              className="bg-gray-700 rounded-full cursor-pointer
              p-1
              text-3xl
              fill-white
              text-white"
              onClick={() =>
                setIsDateTimePickerVisible((prevState) => !prevState)
              }
            />
          </div>
          <input
            type="date"
            onFocus={(event) => event.target.blur()}
            onClick={(event) => showPicker(event)}
            onChange={(event) => setDate(event.target.value)}
            value={date}
            min={minDateTime}
            max={"2100-12-31"}
            className="outline-none rounded-xl bg-white
            selection:bg-transparent cursor-pointer"
          />
          <input
            type="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            className="outline-none rounded-xl bg-white
            selection:bg-transparent cursor-pointer"
          />
          <button
            className="text-white bg-primary w-full rounded-full
            p-2
            mt-4
            font-bold
            text-lg
            py-3"
            type="button"
            onClick={handleSubmit}
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};

export default DateTimePicker;
