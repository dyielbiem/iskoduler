import Header from "@/components/header";
import { IoPersonCircleSharp } from "react-icons/io5";
import { getLogout } from "@/utils/userRequests";
import { useRouter } from "next/router";
import Link from "next/link";
import protectRoute from "@/utils/protectRoute";
import { useLayoutEffect } from "react";
import { getUserInformation } from "@/utils/userRequests";
import useUserContext from "@/customHooks/useUserContext";
import useScheduleContext from "@/customHooks/useScheduleContext";

const Profile = () => {
  const router = useRouter();
  const { userInformation, setUserInformation } = useUserContext();
  const { dispatch } = useScheduleContext();

  useLayoutEffect(() => {
    const fetchUserInformation = async () => {
      const userInformation = await getUserInformation();
      if (Object.hasOwn(userInformation, "Error"))
        return console.log(userInformation.Error);
      setUserInformation(userInformation);
    };

    fetchUserInformation();
  }, []);

  const handleLogoutClick = async () => {
    const loggedoutUser = await getLogout();
    if (Object.hasOwn(loggedoutUser, "Error")) throw Error(loggedoutUser.Error);

    // Empty the rendered task and classe schedules and user information
    setUserInformation(undefined);
    dispatch({ type: "GET_TASKS", payload: [] });
    dispatch({ type: "GET_CLASSES", payload: [] });
    router.replace("/");
  };

  return userInformation ? (
    <>
      <Header />
      <main
        className="flex flex-col text-white justify-between items-center
                   h-[calc(100vh-4rem)]
                   w-full
                   pb-8
                   pt-6"
      >
        <div className="flex flex-col justify-center items-center w-full">
          <IoPersonCircleSharp className="text-8xl" />
          <h2 className="text-xl font-bold">@{userInformation.username}</h2>
          <p className="text-xl text-center">
            {userInformation.firstname} {userInformation.lastname}
          </p>
          <Link href={"/profile/manage"}>
            <button
              className="rounded-xl bg-white shadow-customShadow font-semibold
                       text-xl
                       py-2
                       px-8
                       mt-4"
            >
              Manage Profile
            </button>
          </Link>
        </div>
        <button
          className="rounded-xl bg-primary font-semibold
                     text-xl
                     py-3
                     px-8
                     w-[85%]"
          onClick={handleLogoutClick}
        >
          Logout
        </button>
      </main>
    </>
  ) : (
    <></>
  );
};

export default protectRoute(Profile);
