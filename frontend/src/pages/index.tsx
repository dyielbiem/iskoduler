import CenteredHeader from "../components/centeredHeader";
import SignInForm from "@/components/signInForm";
import Link from "next/link";
import redirectAuthorizedUser from "@/utils/redirectAuthorizedUser";

const Index = () => {
  return (
    <>
      <CenteredHeader />
      <main
        className="flex flex-col w-[90%] h-[calc(100vh-4rem)]
        items-center"
      >
        <p
          className="text-black font-extrabold text-center
          text-2xl mb-2 mt-10"
        >
          Hello there, ISKOlar!
        </p>
        <p className="mb-8">Sign in to your account to continue</p>

        <SignInForm />
        <p className="self-center text-center mt-4">
          {`New to ISKOduler?${" "}`}
          <Link href="/signup">
            <span className="font-extrabold text-primary">Sign Up</span>
          </Link>
        </p>
      </main>
    </>
  );
};

export default redirectAuthorizedUser(Index);
