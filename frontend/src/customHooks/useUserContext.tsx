import { useContext } from "react";
import { UserContext } from "@/contexts/userContextProvider";

const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) throw Error("useUserContext is not available");

  return context;
};

export default useUserContext;
