import { useContext } from "react";
import { ScheduleContext } from "@/contexts/scheduleContextProvider";

const useScheduleContext = () => {
  const context = useContext(ScheduleContext);

  if (!context) {
    throw Error("useScheduleContext is not accessible");
  }
  return context;
};
``;

export default useScheduleContext;
