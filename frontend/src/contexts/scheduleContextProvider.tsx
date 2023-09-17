import { createContext, Dispatch, useReducer, ReactNode } from "react";

interface taskType {
  _id: string;
  taskName: string;
  description: string;
  subject: string;
  type: string;
  deadline: string;
}

interface classType {
  _id: string;
  className: string;
  description: string;
  daySchedule: string;
  timeStart: string;
  timeEnd: string;
}

type Action =
  | { type: "GET_TASKS"; payload: taskType[] | undefined }
  | { type: "ADD_TASK"; payload: taskType }
  | { type: "EDIT_TASK"; payload: taskType }
  | { type: "DELETE_TASK"; payload: taskType }
  | { type: "GET_CLASSES"; payload: classType[] | undefined }
  | { type: "ADD_CLASS"; payload: classType }
  | { type: "EDIT_CLASS"; payload: classType }
  | { type: "DELETE_CLASS"; payload: classType };

interface State {
  tasks: taskType[] | undefined;
  classes: classType[] | undefined;
}

interface scheduleContextType {
  state: State;
  dispatch: Dispatch<Action>;
}

interface Props {
  children: ReactNode;
}

const compareTaskByDate = (a: string, b: string) => {
  return new Date(a).getTime() - new Date(b).getTime();
};

const compareClassBySchedule = (a: classType, b: classType) => {
  const dayValue: { [key: string]: number } = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };
  const dayComparison = dayValue[a.daySchedule] - dayValue[b.daySchedule];

  if (dayComparison === 0) return a.timeStart.localeCompare(b.timeStart);

  return dayComparison;
};

const scheduleReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "GET_TASKS":
      if (!action.payload) return { ...state, tasks: undefined };
      return {
        ...state,
        tasks: action.payload.sort((a, b) =>
          compareTaskByDate(a.deadline, b.deadline)
        ),
      };
    case "ADD_TASK":
      if (!state.tasks) return { ...state, tasks: [action.payload] };
      return {
        ...state,
        tasks: [action.payload, ...state.tasks].sort((a, b) =>
          compareTaskByDate(a.deadline, b.deadline)
        ),
      };
    case "EDIT_TASK":
      if (!state.tasks) return state;
      state.tasks.forEach((task) => {
        if (task._id === action.payload._id) {
          task.taskName = action.payload.taskName;
          task.description = action.payload.description;
          task.subject = action.payload.subject;
          task.type = action.payload.type;
          task.deadline = action.payload.deadline;
        }
      });
      return {
        ...state,
        tasks: state.tasks,
      };
    case "DELETE_TASK":
      if (!state.tasks) return state;
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload._id),
      };
    case "GET_CLASSES":
      if (!action.payload) return { ...state, classes: undefined };
      return {
        ...state,
        classes: action.payload.sort((a, b) => compareClassBySchedule(a, b)),
      };
    case "ADD_CLASS":
      if (!state.classes) return { ...state, classes: [action.payload] };
      return {
        ...state,
        classes: [action.payload, ...state.classes].sort((a, b) =>
          compareClassBySchedule(a, b)
        ),
      };
    case "EDIT_CLASS":
      if (!state.classes) return state;
      state.classes.forEach((classItem) => {
        if (classItem._id === action.payload._id) {
          classItem.className = action.payload.className;
          classItem.description = action.payload.description;
          classItem.daySchedule = action.payload.daySchedule;
          classItem.timeStart = action.payload.timeStart;
          classItem.timeEnd = action.payload.timeEnd;
        }
      });
      return {
        ...state,
        classes: state.classes,
      };
    case "DELETE_CLASS":
      if (!state.classes) return state;
      return {
        ...state,
        classes: state.classes.filter(
          (classItem) => classItem._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const ScheduleContext = createContext<scheduleContextType | undefined>(
  undefined
);

const ScheduleContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(scheduleReducer, {
    tasks: undefined,
    classes: undefined,
  });

  return (
    <ScheduleContext.Provider value={{ state, dispatch }}>
      {children}
    </ScheduleContext.Provider>
  );
};

export default ScheduleContextProvider;
