import { getAuthenticate } from "./userRequests";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function RedirectAuthorizedUser(
  WrappedComponent: () => JSX.Element
) {
  return () => {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(true);

    useEffect(() => {
      const checkAuthentication = async () => {
        const authenticateUser = await getAuthenticate();
        if (Object.hasOwn(authenticateUser, "Error"))
          return setIsAuthorized(false);
        setIsAuthorized(true);
        router.replace("/schedules");
      };

      checkAuthentication();
    }, []);

    return isAuthorized ? null : <WrappedComponent />;
  };
}
