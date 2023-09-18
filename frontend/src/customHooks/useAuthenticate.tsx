import { getAuthenticate } from "@/utils/userRequests";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useAuthenticate = (initialValue: boolean, route: string) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialValue);
  const router = useRouter();

  const checkAuthentication = async () => {
    const authenticateUser = await getAuthenticate();

    if (authenticateUser.Error) {
      if (!initialValue) router.replace(route);
      return setIsAuthenticated(false);
    }

    if (initialValue) router.replace(route);
    setIsAuthenticated(true);
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  return isAuthenticated;
};

export default useAuthenticate;
