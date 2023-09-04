import { useState, SetStateAction } from "react";
import { IoClose } from "react-icons/io5";
import { parse, format } from "date-fns";

interface Props {
  isDateTimePickerVisible: boolean;
  setIsDateTimePickerVisible: React.Dispatch<SetStateAction<boolean>>;
  setDeadline: React.Dispatch<SetStateAction<string>>;
}

const DateTimePicker = ({
  isDateTimePickerVisible,
  setIsDateTimePickerVisible,
  setDeadline,
}: Props) => {
  const [time, setTime] = useState<string>("23:59");
  const currentDate: string = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState<string>(currentDate);

  // Function that manage the visibility of date time picker
  const showPicker = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    (event.target as HTMLInputElement).showPicker();
  };

  // Function that will be called when submit is called
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const time24: Date = parse(time, "HH:mm", new Date());
      const time12: string = format(time24, "hh:mm a");
      setDeadline(`${date} ${time12}`);
      setIsDateTimePickerVisible((prevState) => !prevState);
    } catch (error: any) {
      return console.log(error.name);
    }
  };

  return (
    <div
      className={`absolute top-0 left-0 bg-[rgba(0,0,0,0.6)]
                 ${isDateTimePickerVisible ? "flex" : "hidden"}
                 justify-center items-center
                 w-screen h-screen px-4 z-30`}
    >
      <form
        className="flex flex-col justify-center items-center
                   bg-white rounded-xl
                   w-full
                   max-w-xl
                   gap-4
                   px-6
                   py-6"
        onSubmit={handleSubmit}
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
          min={currentDate}
          max={"2100-12-31"}
          className="outline-none rounded-xl bg-white
                     selection:bg-transparent
                     text-lg
                     py-2 
                     px-3
                     w-full"
        />
        <input
          type="time"
          value={time}
          onChange={(event) => setTime(event.target.value)}
          className="outline-none rounded-xl bg-white
                     selection:bg-transparent shadow-customShadow
                     text-lg
                     py-2 
                     px-3
                     w-full"
        />
        <button
          className="text-white bg-blue-500 w-full rounded-full
                    p-2
                    font-bold
                    text-2xl"
          type="submit"
        >
          Confirm
        </button>
      </form>
    </div>
  );
};

export default DateTimePicker;
