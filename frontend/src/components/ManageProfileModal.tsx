import { IoClose } from "react-icons/io5";
import { MdUpload } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import useUserContext from "@/customHooks/useUserContext";

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setUserImage: React.Dispatch<React.SetStateAction<File | undefined>>;
  setIsDeleteModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ManageProfileModal = ({
  isModalVisible,
  setIsModalVisible,
  setUserImage,
  setIsDeleteModalVisible,
}: Props) => {
  const { userInformation } = useUserContext();
  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files![0];

    if (
      ["image/jpeg", "image/jpg", "image/png"].some(
        (item) => item === file.type
      )
    ) {
      setUserImage(event.target.files[0]);
      setIsModalVisible(false);
    } else {
      setUserImage(undefined);
    }
  };

  const handleDelete = () => {
    setIsModalVisible(false);
    setIsDeleteModalVisible(true);
  };

  return (
    <div
      className={`fixed w-screen h-screen top-0 left-0 bg-transparent z-50
      justify-center items-center ${isModalVisible ? "flex" : "hidden"}`}
    >
      <div
        className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)]"
        onClick={closeModal}
      ></div>
      <div
        className="items-start flex-col
        bg-white shadow-customShadow
        gap-2
        max-w-md sm:max-w-lg
        w-11/12 sm:w-full 
        rounded-lg
        py-1 sm:py-2
        px-1 sm:px-2
        z-50"
      >
        <div
          className="flex justify-between items-center
          py-2 px-2"
        >
          <h2 className="text-xl font-bold">Profile image</h2>
          <IoClose className="text-3xl cursor-pointer" onClick={closeModal} />
        </div>
        <ul>
          <li
            className="flex w-full items-center relative
            hover:bg-primary cursor-pointer rounded
            px-2 py-2 
            gap-3 md:gap-4 group"
          >
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              className="h-full w-full absolute top-0 left-0 opacity-0 cursor-pointer"
              multiple={false}
              onChange={(event) => handleUpload(event)}
            />
            <MdUpload
              className="text-2xl group-hover:fill-white 
              group-hover:bg-primary"
            />
            <span
              className="text-base md:text-lg font-bold  group-hover:text-white 
              group-hover:bg-primary"
            >
              Upload
            </span>
          </li>
          {userInformation?.imageURL && (
            <li
              className="flex w-full items-center
              hover:bg-primary cursor-pointer rounded
              px-2 py-2 
              gap-3 md:gap-4 group"
              onClick={handleDelete}
            >
              <IoMdTrash
                className="text-2xl group-hover:fill-white 
              group-hover:bg-primary"
              />
              <span
                className="text-base md:text-lg font-bold group-hover:text-white 
              group-hover:bg-primary"
              >
                Delete
              </span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ManageProfileModal;
