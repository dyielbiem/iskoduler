import Header from "@/components/Header";
// import ProtectRoute from "@/utils/protectRoute";
import MainProfile from "@/components/MainProfile";
import ProfileJumbotron from "@/components/ProfileJumbotron";

const Profile = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Header isSchedulesVisible={true} />
      <main
        className="grid justify-items-center 
        items-start md:items-center
        w-11/12 sm:w-10/12 md:w-11/12 xl:w-10/12
        grid-cols-1 md:grid-cols-2
        gap-x-6
        h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]
        max-w-7xl"
      >
        <ProfileJumbotron />
        <MainProfile />
      </main>
    </div>
  );
};

export default Profile;
