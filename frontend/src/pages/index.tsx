import WelcomeJumbotron from "../components/WelcomeJumbotron";
import SignInForm from "@/components/SignInForm";
import Link from "next/link";
import RedirectAuthorizedUser from "@/utils/redirectAuthorizedUser";

const Index = () => {
  return (
    <div
      className="grid
      justify-items-center items-center 
      grid-cols-1 
      md:grid-cols-2
      md:h-screen
      w-full md:w-11/12 xl:w-10/12
      gap-x-4 
      max-w-7xl"
    >
      <WelcomeJumbotron />
      <main
        className="flex flex-col
        w-11/12 sm:w-9/12 md:w-11/12 xl:w-10/12
        max-w-md lg:max-w-lg
        md:justify-self-end
        items-center
        h-[calc(100vh-4rem)] md:h-fit
        md:justify-center
        md:border-[1px]
        md:shadow-lg
        md:px-6 lg:px-8
        md:py-12 lg:py-16
        md:max-h-[90%]
        md:rounded-2xl"
      >
        <p
          className="text-black font-extrabold text-center
          text-2xl lg:text-3xl
          mb-2 
          mt-10 md:m-0"
        >
          Hello there, ISKOlar!
        </p>
        <p
          className="mb-8 
          text-center
          lg:text-lg"
        >
          Sign in to your account to continue
        </p>

        <SignInForm />
        <p
          className="self-center text-center mt-4
          lg:text-lg"
        >
          {`New to ISKOduler?${" "}`}
          <Link href="/signup">
            <span className="font-extrabold text-primary">Sign Up</span>
          </Link>
        </p>
      </main>
    </div>
  );
};

export default RedirectAuthorizedUser(Index);
