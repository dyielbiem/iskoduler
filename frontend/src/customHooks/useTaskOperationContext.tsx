import { useContext } from "react";
import { TaskOperationContext } from "@/contexts/taskOperationContextProvider";

const useTaskOperationContext = () => {
  const context = useContext(TaskOperationContext);

  if (!context) throw Error("useTaskOperationContext is not available");

  return context;
};

export default useTaskOperationContext;
