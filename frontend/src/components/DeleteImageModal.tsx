import useUserContext from "@/customHooks/useUserContext";
import { deleteUserImage } from "@/utils/userRequests";
import React from "react";
import { IoMdTrash } from "react-icons/io";

interface Props {
  isThisVisible: boolean;
  setIsThisVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMainModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteImageModal = ({
  isThisVisible,
  setIsThisVisible,
  setIsMainModalVisible,
}: Props) => {
  const { setUserInformation } = useUserContext();

  const closeThis = () => {
    setIsThisVisible(false);
  };

  const handleConfirm = async () => {
    const token = await localStorage.getItem("token");
    if (!token) return console.log("Unauthorized");
    const deletedImage = await deleteUserImage(token);
    if (deletedImage.Error) {
      return console.log(deletedImage.Error);
    }

    setUserInformation((prevState) => ({
      ...prevState!,
      imageID: "",
      imageURL: "",
    }));

    closeThis();
  };

  const handleCancel = () => {
    closeThis();
    setIsMainModalVisible(true);
  };

  return (
    <div
      className={`${
        isThisVisible ? "flex" : "hidden"
      } items-center justify-center fixed w-screen h-screen 
      top-0 left-0 bg-transparent z-50`}
    >
      <div
        className="w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.4)]
      "
        onClick={closeThis}
      ></div>
      <div
        className="flex flex-col items-center px-8 py-8 rounded-xl 
        w-10/12 
        max-w-sm gap-2 z-10"
      >
        <div className="flex gap-3 justify-center items-center mb-2">
          <IoMdTrash className="text-3xl md:text-4xl flex-shrink-0 " />
          <h2 className="font-bold text-xl sm:text-2xl text-left">
            Delete image
          </h2>
        </div>
        <p className="text-center max-w-[25ch] font-medium text-md">
          This action cannot be undone. Confirm to continue.
        </p>
        <div
          className="flex 
          flex-col md:flex-row gap-3 mt-4 w-full"
        >
          <button
            className="py-2 text-lg md:text-xl bg-primary text-white 
            font-bold rounded-full flex-1"
            onClick={handleConfirm}
          >
            Confirm
          </button>
          <button
            className="py-2 text-lg md:text-xl bg-zinc-200 text-black 
            font-bold rounded-full flex-1"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteImageModal;
