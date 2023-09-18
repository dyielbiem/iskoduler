import SignUpForm from "@/components/SignUpForm";
import WelcomeJumbotron from "@/components/WelcomeJumbotron";
import Link from "next/link";
// import RedirectAuthorizedUser from "@/utils/redirectAuthorizedUser";

const SignUp = () => {
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
        items-center 
        pb-8
        w-11/12 sm:w-9/12 md:w-11/12 xl:w-10/12
        max-w-md lg:max-w-lg
        min-h-[calc(100vh-4rem)] md:min-h-0
        md:h-fit
        md:border-[1px]
        md:shadow-lg
        md:px-6 lg:px-8
        md:py-10
        md:rounded-lg
        md:max-h-[85%]
        md:justify-self-end
        md:overflow-y-auto"
      >
        <h2
          className="text-text font-bold
          mt-10 md:mt-0
          text-center
          text-2xl lg:text-3xl"
        >
          Create your account
        </h2>
        <p
          className="text-center
          mb-6 lg:text-lg"
        >
          Have already an account?{" "}
          <Link href={"/"}>
            <span className="text-primary font-bold">Sign In</span>
          </Link>
        </p>
        <SignUpForm />
      </main>
    </div>
  );
};

export default SignUp;
