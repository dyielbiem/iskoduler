import Header from "@/components/Header";
import ManageProfile from "@/components/ManageProfile";
import ProfileJumbotron from "@/components/ProfileJumbotron";
import protectRoute from "@/utils/protectRoute";

const Manage = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <Header isSchedulesVisible={true} />
      <main
        className="w-11/12 max-w-7xl gap-x-4
        grid items-center justify-items-center
        md:grid-cols-2 
        h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]"
      >
        <ManageProfile />
        <ProfileJumbotron />
      </main>
    </div>
  );
};

export default protectRoute(Manage);
