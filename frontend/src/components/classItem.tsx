import { useState } from "react";
import ScheduleOperations from "./scheduleOperations";
import DeleteModal from "./deleteModal";
import ClassForm from "./classForm";

interface classType {
  _id: string;
  className: string;
  description: string;
  daySchedule: string;
  timeStart: string;
  timeEnd: string;
}

interface Props {
  classItem: classType;
}

const ClassItem = ({ classItem }: Props) => {
  const [isOptionVisible, setIsOptionVisible] = useState<boolean>(false);
  const [isDeleteClassModalVisible, setIsDeleteClassModalVisible] =
    useState<boolean>(false);
  const [isClassFormVisible, setIsClassFormVisible] = useState<boolean>(false);

  // Function that make time 12 hour format
  const formatTimeTo12Hours = (time24: string): string => {
    const [hours, minutes] = time24.split(":");
    const parsedHours = parseInt(hours, 10);

    const period = parsedHours >= 12 ? "PM" : "AM";
    const formattedHours = parsedHours % 12 === 0 ? 12 : parsedHours % 12;

    return `${formattedHours}:${minutes} ${period}`;
  };

  return (
    <li
      key={classItem._id}
      className="text-white bg-white rounded-lg
      flex flex-col relative before:rounded-l-md
      border-[1px] shadow-md
      before:content-[''] before:absolute before:h-full
      before:w-2 before:top-0 before:left-0
      before:bg-primary
      py-4
      pl-6
      pr-4"
    >
      <div className="flex justify-between w-full">
        <h3
          className="font-bold
                         text-xl"
        >
          {classItem.className}
        </h3>
        <ScheduleOperations
          isOptionVisible={isOptionVisible}
          setIsOptionVisible={setIsOptionVisible}
          setIsDeleteModalVisible={setIsDeleteClassModalVisible}
          setIsFormVisible={setIsClassFormVisible}
        />
      </div>
      <p>{classItem.description}</p>
      <p
        className="border-2 w-fit self-end
        rounded-full text-primary border-primary font-bold
        text-sm
        mt-3
        py-2
        px-4"
      >
        {`${formatTimeTo12Hours(classItem.timeStart)} - ${formatTimeTo12Hours(
          classItem.timeEnd
        )}`}
      </p>
      <DeleteModal
        isThisVisible={isDeleteClassModalVisible}
        setIsThisVisible={setIsDeleteClassModalVisible}
        scheduleID={classItem._id}
        type={"class"}
      />
      <ClassForm
        isVisible={isClassFormVisible}
        setIsVisible={setIsClassFormVisible}
        classNamePlaceholder={classItem.className}
        descriptionPlaceholder={classItem.description}
        daySchedulePlaceholder={classItem.daySchedule}
        timeStartPlaceholder={classItem.timeStart}
        timeEndPlaceholder={classItem.timeEnd}
        action={{ type: "EDIT", classID: classItem._id }}
      />
    </li>
  );
};

export default ClassItem;
