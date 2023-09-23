import Link from "next/link";
import { IoArrowBackOutline, IoPersonCircleSharp } from "react-icons/io5";
import ManageNameForm from "./ManageNameForm";
import ManageTab from "./ManageTab";
import ManagePasswordForm from "./ManagePasswordForm";
import { useRouter } from "next/router";
import { useState } from "react";
import useUserContext from "@/customHooks/useUserContext";
import Image from "next/image";
import ManageProfileModal from "./ManageProfileModal";
import UploadImageModal from "./UploadImageModal";
import DeleteImageModal from "./DeleteImageModal";

type formType = "name" | "password" | undefined;

const ManageProfile = () => {
  const { userInformation } = useUserContext();
  const router = useRouter();
  const [visibleForm, setVisibleForm] = useState<formType>();
  const [isManageProfilVisible, setIsManageProfileVisible] =
    useState<boolean>(false);
  const [userImage, setUserImage] = useState<File | undefined>(undefined);
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);

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

  // Open the modal that contains the upload and delete user's image function
  const handleImageClick = () => {
    // Check for a visible form, hide it if present.
    if (router.query.tab) {
      router.replace(`/profile/manage/`, undefined, {
        shallow: true,
      });
    }
    setVisibleForm(undefined);
    setIsManageProfileVisible(true);
  };

  return (
    <div
      className="flex flex-col w-full items-center justify-start
      md:justify-self-end md:max-w-md
      md:overflow-y-auto
      h-full md:h-[90%]
      md:border-2
      md:rounded-2xl
      md:shadow-lg
      pt-0 md:pt-6
      pb-4
      md:px-4 lg:px-6
      md:col-start-2
      md:row-start-1
      md:max-h-[42rem]"
    >
      <div
        className="flex items-center justify-center mb-4 md:mb-8 
        w-full relative"
      >
        <h2 className="text-xl sm:text-2xl font-bold">Manage profile</h2>
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
          <div
            className="flex justify-end items-center cursor-pointer"
            onClick={handleImageClick}
          >
            {userInformation.imageID ? (
              <Image
                src={userInformation.imageURL}
                width={100}
                height={100}
                alt="Image of the user"
                className="w-20 h-20 object-cover rounded-full shadow-customShadow"
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
      <ManageProfileModal
        isModalVisible={isManageProfilVisible}
        setIsModalVisible={setIsManageProfileVisible}
        setUserImage={setUserImage}
        setIsDeleteModalVisible={setIsDeleteModalVisible}
      />

      {userImage && (
        <UploadImageModal
          userImage={userImage}
          setUserImage={setUserImage}
          setIsMainModalVisible={setIsManageProfileVisible}
        />
      )}

      <DeleteImageModal
        setIsMainModalVisible={setIsManageProfileVisible}
        setIsThisVisible={setIsDeleteModalVisible}
        isThisVisible={isDeleteModalVisible}
      />
    </div>
  );
};

export default ManageProfile;
