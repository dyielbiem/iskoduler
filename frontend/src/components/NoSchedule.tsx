import React from "react";
import { BsFillCalendar2WeekFill } from "react-icons/bs";

interface Props {
  scheduleType: "task" | "class" | "previous task";
}

const NoSchedule = ({ scheduleType }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center mt-12 w-11/12">
      <BsFillCalendar2WeekFill className="text-6xl md:text-7xl mb-2" />
      {scheduleType !== "previous task" && (
        <>
          {scheduleType === "task" && (
            <h2 className="text-2xl md:text-3xl font-bold text-center">
              {`No upcoming tasks`}
            </h2>
          )}
          {scheduleType === "class" && (
            <h2 className="text-2xl md:text-3xl font-bold text-center">
              {`No classes added`}
            </h2>
          )}
          <p className="text-center text-base md:text-lg">
            {`This is the perfect time to add a new ${scheduleType}.`}
          </p>
        </>
      )}
      {scheduleType === "previous task" && (
        <h2
          className="text-xl sm:text-2xl md:text-3xl leading-6 font-bold 
          text-center max-w-[18ch] mt-2 md:mt-4"
        >
          You do not have any previous tasks
        </h2>
      )}
    </div>
  );
};

export default NoSchedule;
