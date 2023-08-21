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
    <div className="w-full relative">
      <div
        placeholder="Title"
        className="w-full rounded-xl outline-none flex justify-between
                       items-center bg-white cursor-pointer
                       py-2
                       px-3"
        onClick={() => setOptionsVisibility((prevState) => !prevState)}
      >
        <p
          className={`${
            placeholder === `${selectOptions[0]}*`
              ? "text-gray-400"
              : "text-black"
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
                       rounded-xl gap-px mt-px overflow-y-scroll`}
      >
        {selectOptions.map((option, index) => (
          <li
            key={index}
            onClick={() => selectType(option, index)}
            className={`${
              index === 0 ? "text-gray-400" : "hover:bg-gray-300"
            } px-3 py-2 rounded-xl cursor-pointer`}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomSelect;
