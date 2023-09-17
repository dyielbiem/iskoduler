import useUserContext from "@/customHooks/useUserContext";

const ProfileJumbotron = () => {
  const { userInformation } = useUserContext();
  return (
    <div
      className="w-full
      hidden md:flex 
      md:flex-col
      col-start-1 row-start-1"
    >
      {userInformation && (
        <p className="md:text-3xl lg:text-4xl font-bold tracking-tight">
          Howdy, {userInformation.firstname}!
        </p>
      )}
      <p className="md:text-xl lg:text-2xl mt-0.5 lg:mt-1.5 font-medium max-w-[30ch]">
        Hoping you are having a great experience with ISKOduler and finding it
        helpful.
      </p>
    </div>
  );
};

export default ProfileJumbotron;
