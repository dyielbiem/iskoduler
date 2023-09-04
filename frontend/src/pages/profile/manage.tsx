import Header from "@/components/header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useUserContext from "@/customHooks/useUserContext";
import { IoPersonCircleSharp } from "react-icons/io5";
import { getUserInformation } from "@/utils/userRequests";
import ManageTab from "@/components/manageTab";
import ManageNameForm from "@/components/manageNameForm";
import ManagePasswordForm from "@/components/managePasswordForm";

type formType = "name" | "password" | undefined;

const Manage = () => {
  const router = useRouter();
  const { userInformation, setUserInformation } = useUserContext();
  const [visibleForm, setVisibleForm] = useState<formType>();

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

  // Handle the form visibility and query param
  const showForm = (form: formType) => {
    // Hide form and remove query param from route
    if (visibleForm !== form) {
      router.replace(`/profile/manage/?tab=${form}`, undefined, {
        shallow: true,
      });
      return setVisibleForm(form);
    }

    // Show form and add query param to route
    setVisibleForm(undefined);
    router.replace(`/profile/manage/`, undefined, {
      shallow: true,
    });
  };

  return (
    <>
      <Header />
      <main
        className="w-11/12 flex items-center flex-col 
        gap-3
        pt-6
        pb-8"
      >
        {userInformation && (
          <div
            className="flex flex-col justify-center items-center w-full
            mb-4"
          >
            <IoPersonCircleSharp className="text-8xl" />
            <h2 className="text-xl font-bold">@{userInformation.username}</h2>
            <p className="text-xl text-center">
              {userInformation.firstname} {userInformation.lastname}
            </p>
          </div>
        )}

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
      </main>
    </>
  );
};

export default Manage;
