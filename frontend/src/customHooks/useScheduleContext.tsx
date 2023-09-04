import { useContext } from "react";
import { ScheduleContext } from "@/contexts/scheduleContextProvider";

const useScheduleContext = () => {
  const context = useContext(ScheduleContext);

  if (!context) {
    throw Error("useScheduleContext is not available");
  }
  return context;
};

export default useScheduleContext;
