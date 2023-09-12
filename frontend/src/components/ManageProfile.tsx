import Link from "next/link";
import { IoArrowBackOutline, IoPersonCircleSharp } from "react-icons/io5";
import ManageNameForm from "./ManageNameForm";
import ManageTab from "./ManageTab";
import ManagePasswordForm from "./ManagePasswordForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useUserContext from "@/customHooks/useUserContext";
import { getUserInformation } from "@/utils/userRequests";
import Image from "next/image";

type formType = "name" | "password" | undefined;

const ManageProfile = () => {
  const { userInformation, setUserInformation } = useUserContext();

  useEffect(() => {
    const fetchUserInformation = async () => {
      const userInformation = await getUserInformation();
      if (Object.hasOwn(userInformation, "Error"))
        return console.log(userInformation.Error);
      setUserInformation(userInformation);
    };

    // Fetch the user information if not yet fetched
    if (!userInformation) {
      fetchUserInformation();
    }
  }, []);

  const router = useRouter();
  const [visibleForm, setVisibleForm] = useState<formType>();

  // Handle the form visibility and query param
  const showForm = (form: formType) => {
    // Hide form and remove query param from route
    if (visibleForm !== form) {
      setVisibleForm(form);
      return router.replace(`/profile/manage?tab=${form}`, undefined, {
        shallow: true,
      });
    }

    // Show form and add query param to route
    setVisibleForm(undefined);
    router.replace(`/profile/manage/`, undefined, {
      shallow: true,
    });
  };

  return (
    <div
      className="flex flex-col w-full items-center justify-start
      md:justify-self-end
      overflow-y-auto
      h-full sm:h-[95%]
      md:border-2
      md:rounded-2xl
      md:shadow-lg
      py-4 md:py-6
      md:px-4 lg:px-6
      max-w-md
      md:col-start-2
      md:row-start-1
      max-h-[42rem]"
    >
      <div
        className="flex items-center justify-center mb-8 
        w-full relative"
      >
        <h2 className="text-xl md:text-2xl font-bold">Manage profile</h2>
        <Link
          href="/profile"
          shallow={true}
          className="absolute left-0 text-2xl"
        >
          <IoArrowBackOutline />
        </Link>
      </div>

      {userInformation! && (
        <div className="flex gap-3 w-full mb-6 items-center">
          <div className="flex justify-end items-center">
            {userInformation.imageID ? (
              <Image
                src={userInformation.imageURL}
                width={100}
                height={100}
                alt="Image of the user"
                className="w-20 h-full aspect-square rounded-full shadow-customShadow"
              ></Image>
            ) : (
              <IoPersonCircleSharp className="text-7xl" />
            )}
          </div>
          <div
            className="flex flex-col
              justify-center
              items-start
              flex-1
              pr-3"
          >
            <p className="font-bold text-lg leading-tight max-w-[20ch]">
              {userInformation.firstname} {userInformation.lastname}
            </p>
            <p className="text-md font-medium text-left">
              @{userInformation.username}
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col w-full gap-3">
        <ManageTab showForm={showForm} label="Name" form="name" />
        {userInformation && (
          <ManageNameForm
            visibleForm={visibleForm}
            currentFirstName={userInformation.firstname}
            currentLastName={userInformation.lastname}
            setVisibleForm={setVisibleForm}
          />
        )}
        <ManageTab showForm={showForm} label="Password" form="password" />
        <ManagePasswordForm
          visibleForm={visibleForm}
          setVisibleForm={setVisibleForm}
        />
      </div>
    </div>
  );
};

export default ManageProfile;
