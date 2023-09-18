import { getAuthenticate } from "./userRequests";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProtectRoute = (WrappedComponent: () => JSX.Element) => {
  return () => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const checkAuthentication = async () => {
        const authenticateUser = await getAuthenticate();
        if (Object.hasOwn(authenticateUser, "Error")) {
          router.replace("/");
          return console.log(authenticateUser.Error);
        }
        setIsAuthenticated(true);
      };

      checkAuthentication();
    }, []);

    return isAuthenticated ? <WrappedComponent /> : <></>;
  };
};

export default ProtectRoute;
