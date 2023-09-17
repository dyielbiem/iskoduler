import { createContext, useState, ReactNode, useContext } from "react";

interface operationType {
  isDeleteVisible: boolean;
  isEditVisible: boolean;
  setIsDeleteVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TaskOperationContext = createContext<operationType | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

const TaskOperationContextProvider = ({ children }: Props) => {
  const [isDeleteVisible, setIsDeleteVisible] = useState<boolean>(false);
  const [isEditVisible, setIsEditVisible] = useState<boolean>(false);

  return (
    <TaskOperationContext.Provider
      value={{
        isDeleteVisible,
        isEditVisible,
        setIsDeleteVisible,
        setIsEditVisible,
      }}
    >
      {children}
    </TaskOperationContext.Provider>
  );
};

export default TaskOperationContextProvider;
