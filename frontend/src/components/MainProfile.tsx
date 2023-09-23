import useScheduleContext from "@/customHooks/useScheduleContext";
import useUserContext from "@/customHooks/useUserContext";
import { postLogout } from "@/utils/userRequests";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineRight } from "react-icons/ai";
import { IoPersonCircleSharp } from "react-icons/io5";
import Image from "next/image";

const MainProfile = () => {
  const router = useRouter();
  const { userInformation, setUserInformation } = useUserContext();
  const { dispatch } = useScheduleContext();

  const handleLogoutClick = async () => {
    await localStorage.removeItem("token");

    await router.replace("/");
    // Empty the rendered task and classe schedules and user information
    dispatch({ type: "GET_TASKS", payload: undefined });
    dispatch({ type: "GET_CLASSES", payload: undefined });
    setUserInformation(undefined);
  };

  if (!userInformation) return <></>;

  return (
    <div
      className="flex flex-col justify-between
      md:justify-self-end  md:max-w-md
      h-full md:h-[90%]
      md:border-2
      md:rounded-2xl
      md:shadow-lg
      pt-0 md:pt-6
      pb-4
      md:px-4 lg:px-6
      w-full
      md:max-h-[40rem]
      md:col-start-2 
      row-start-1"
    >
      <div className="flex flex-col w-full items-center justify-center">
        <div className="flex items-center justify-center mb-4 md:mb-8">
          <h2
            className="font-bold
              text-xl sm:text-2xl"
          >
            Profile
          </h2>
        </div>
        <Link href={"/profile/manage/"} className="w-full">
          <div className="flex gap-3 justify-start w-full items-center">
            {userInformation.imageID ? (
              <Image
                src={userInformation.imageURL}
                width={100}
                height={100}
                alt="Image of the user"
                className="w-16 h-16 object-cover rounded-full shadow-customShadow"
              ></Image>
            ) : (
              <IoPersonCircleSharp className="text-7xl" />
            )}
            <div
              className="flex flex-1 items-center justify-between
              pr-3 gap-2"
            >
              {
                <div
                  className="flex flex-col
                        items-start"
                >
                  <p
                    className="font-bold max-w-[20ch]
                          leading-tight lg:leading-none
                          text-lg lg:text-xl"
                  >
                    {userInformation.firstname} {userInformation.lastname}
                  </p>
                  <p
                    className="font-medium text-left
                          text-sm lg:text-base
                          leading-none"
                  >
                    @{userInformation.username}
                  </p>
                  <p
                    className="text-sm lg:text-sm
                          text-left"
                  >
                    Manage profile
                  </p>
                </div>
              }
              <AiOutlineRight className="text-lg flex-shrink-0" />
            </div>
          </div>
        </Link>
      </div>
      <button
        className="rounded-full bg-primary font-semibold
                text-white
                text-lg
                py-3
                w-full"
        onClick={handleLogoutClick}
      >
        Logout
      </button>
    </div>
  );
};

export default MainProfile;
