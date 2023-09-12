import useScheduleContext from "@/customHooks/useScheduleContext";
import ClassItem from "./ClassItem";

const ClassView = () => {
  const { state } = useScheduleContext();

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
    <div className="flex flex-col w-full my-6 gap-6 max-w-7xl">
      {dailyClassSchedules.length > 0 &&
        dailyClassSchedules.map(
          (classSchedules, classIndex) =>
            classSchedules.length > 0 && (
              <div key={classIndex} className="flex flex-col gap-4">
                <h2
                  className="font-bold 
                  px-1
                  text-xl md:text-2xl"
                >
                  {classIndex === 0
                    ? "Today"
                    : classIndex === 1
                    ? "Tomorrow"
                    : classSchedules[0].daySchedule}
                </h2>
                <ul
                  className={`w-full grid
                  grid-cols-1 md:grid-cols-2
                  gap-y-6
                  gap-x-6 lg:gap-x-8`}
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
