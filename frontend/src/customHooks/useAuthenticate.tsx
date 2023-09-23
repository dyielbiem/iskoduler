import { postAuthenticate } from "@/utils/userRequests";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useAuthenticate = (initialValue: boolean, route: string) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialValue);
  const router = useRouter();

  const checkAuthentication = async () => {
    try {
      const token = await localStorage.getItem("token");

      if (!token) {
        if (!initialValue) router.replace(route);
        return setIsAuthenticated(false);
      }

      const authenticateUser = await postAuthenticate(token);

      if (authenticateUser.Error) {
        if (!initialValue) router.replace(route);
        return setIsAuthenticated(false);
      }

      if (initialValue) router.replace(route);
      setIsAuthenticated(true);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  return isAuthenticated;
};

export default useAuthenticate;
