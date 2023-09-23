import React, { useState } from "react";
import Image from "next/image";
import { patchUserImage } from "@/utils/userRequests";
import useUserContext from "@/customHooks/useUserContext";
import { VscLoading } from "react-icons/vsc";

interface Props {
  userImage: File;
  setUserImage: React.Dispatch<React.SetStateAction<File | undefined>>;
  setIsMainModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadImageModal = ({
  userImage,
  setUserImage,
  setIsMainModalVisible,
}: Props) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { setUserInformation } = useUserContext();
  const handleUpload = async () => {
    setIsUploading(true);
    const token = await localStorage.getItem("token");
    if (!token) return console.log("Unauthorized");
    const formData = new FormData();
    formData.append("image", userImage);
    formData.append("token", token);
    const updatedUserImage = await patchUserImage(formData);

    if (updatedUserImage.Error) {
      setIsUploading(false);
      return console.log(updatedUserImage);
    }

    setUserInformation((prevState) => ({
      ...prevState!,
      imageID: updatedUserImage.imageID,
      imageURL: updatedUserImage.imageURL,
    }));
    setUserImage(undefined);
    setIsUploading(false);
  };

  const handleCancel = () => {
    setUserImage(undefined);
    setIsMainModalVisible(true);
  };
  return (
    <div
      className={`fixed bg-[rgba(0,0,0,0.3)] z-[80]
      ${userImage ? "flex" : "hidden"}
      w-screen h-screen justify-center items-center top-0 left-0`}
    >
      <div
        className="flex flex-col px-6 md:px-10 pt-10 md:pt-12 pb-6 md:pb-8 rounded-2xl gap-8
        items-center justify-center max-w-sm
        w-10/12"
      >
        <Image
          src={URL.createObjectURL(userImage)}
          width={500}
          height={500}
          alt="Uploaded Image"
          className="w-40 md:w-56 h-40 md:h-56
          object-cover  rounded-full"
        ></Image>
        {!isUploading ? (
          <div
            className="flex gap-2 md:gap-3 w-full
            flex-col md:flex-row"
          >
            <button
              className="rounded-full text-lg md:text-xl font-bold bg-primary 
              text-white py-2 md:py-3
              w-full flex-1"
              onClick={handleUpload}
            >
              Upload
            </button>
            <button
              className="rounded-full text-lg md:text-xl font-bold 
              bg-zinc-200 py-2 md:py-3
              w-full flex-1"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex gap-3 items-center justify-center cursor-not-allowed">
            <VscLoading className="text-2xl animate-spin" />
            <p className="text-lg font-bold">Uploading your image...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadImageModal;
