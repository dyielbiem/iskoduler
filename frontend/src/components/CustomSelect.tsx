import { SetStateAction, useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";

interface Props {
  selectOptions: string[];
  placeholder: string;
  setPlaceholder: React.Dispatch<SetStateAction<string>>;
}

const CustomSelect = ({
  selectOptions,
  placeholder,
  setPlaceholder,
}: Props) => {
  const [optionsVisibility, setOptionsVisibility] = useState<boolean>(false);
  const selectType = (option: string, index: number) => {
    setOptionsVisibility(false);
    if (index === 0) return;
    setPlaceholder(option);
  };

  return (
    <div
      className="w-full relative shadow-md border-[1px]
      font-medium rounded-md
      "
    >
      <div
        placeholder="Title"
        className="w-full rounded-md outline-none flex justify-between
        items-center bg-white cursor-pointer
        text-base
        py-3
        px-2"
        onClick={() => setOptionsVisibility((prevState) => !prevState)}
      >
        <p
          className={`${
            placeholder === `* ${selectOptions[0]}`
              ? "text-gray-400 font-normal"
              : "text-black font-semibold"
          }`}
        >
          {placeholder}
        </p>
        <MdOutlineArrowDropDown className="text-xl" />
      </div>
      <ul
        className={`${
          optionsVisibility ? "flex" : "hidden"
        } w-full flex-col bg-white absolute 
        shadow-md border-[1px] font-medium mt-[2px]
        rounded-md gap-px overflow-y-scroll px-1 py-1
        max-h-44`}
      >
        {selectOptions.map((option, index) => (
          <li
            key={index}
            onClick={() => selectType(option, index)}
            className={`${
              index === 0 ? "text-gray-400" : "hover:bg-zinc-200"
            } px-3 py-2.5 rounded-md cursor-pointer text-base`}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomSelect;
