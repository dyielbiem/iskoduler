import Header from "@/components/Header";
import protectRoute from "@/utils/protectRoute";
import MainProfile from "@/components/MainProfile";
import ProfileJumbotron from "@/components/ProfileJumbotron";

const Profile = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Header isSchedulesVisible={true} />
      <main
        className="w-11/12 grid justify-items-center
        items-center
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

export default protectRoute(Profile);