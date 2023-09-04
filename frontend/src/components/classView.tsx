import useScheduleContext from "@/customHooks/useScheduleContext";
import ClassItem from "./classItem";

const ClassView = () => {
  const { state } = useScheduleContext();

  // const formatTimeTo12Hours = (time24: string): string => {
  //   const [hours, minutes] = time24.split(":");
  //   const parsedHours = parseInt(hours, 10);

  //   const period = parsedHours >= 12 ? "PM" : "AM";
  //   const formattedHours = parsedHours % 12 === 0 ? 12 : parsedHours % 12;

  //   return `${formattedHours}:${minutes} ${period}`;
  // };

  const dayValue: { [key: string]: number } = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  interface classType {
    _id: string;
    className: string;
    description: string;
    daySchedule: string;
    timeStart: string;
    timeEnd: string;
  }

  let dailyClassSchedules: classType[][] = [];

  // Group and arrange the classes according to their scheduled day
  for (let i = 0; i < 7; i++) {
    const targetDay = new Date().getDay() + i;
    if (targetDay < 7) {
      const classSchedules = state.classes.filter(
        (classItem) => dayValue[classItem.daySchedule] === targetDay
      );
      dailyClassSchedules.push(classSchedules);
    } else {
      const classSchedules = state.classes.filter(
        (classItem) => dayValue[classItem.daySchedule] === targetDay - 7
      );
      dailyClassSchedules.push(classSchedules);
    }
  }

  return (
    <div className="flex flex-col w-full my-6 gap-6">
      {dailyClassSchedules.length > 0 &&
        dailyClassSchedules.map(
          (classSchedules, classIndex) =>
            classSchedules.length > 0 && (
              <div key={classIndex} className="flex flex-col gap-2">
                <h2
                  className="font-bold text-2xl
                  px-1"
                >
                  {classIndex === 0
                    ? "Today"
                    : classIndex === 1
                    ? "Tomorrow"
                    : classSchedules[0].daySchedule}
                </h2>
                <ul
                  className={`w-full 
                  gap-2
                  flex 
                  flex-col`}
                >
                  {classSchedules.map((classItem, index) => (
                    <ClassItem classItem={classItem} key={index} />
                  ))}
                </ul>
              </div>
            )
        )}
    </div>
  );
};

export default ClassView;
