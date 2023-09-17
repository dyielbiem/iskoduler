import Header from "@/components/Header";
import ManageProfile from "@/components/ManageProfile";
import ProfileJumbotron from "@/components/ProfileJumbotron";
import protectRoute from "@/utils/protectRoute";

const Manage = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <Header isSchedulesVisible={true} />
      <main
        className="max-w-7xl gap-x-6
        grid justify-items-center
        items-start md:items-center
        w-11/12 sm:w-10/12 md:w-11/12 xl:w-10/12
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
