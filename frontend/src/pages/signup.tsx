import SignUpForm from "@/components/signUpForm";
import CenteredHeader from "@/components/centeredHeader";
import Link from "next/link";
import redirectAuthorizedUser from "@/utils/redirectAuthorizedUser";

const SignUp = () => {
  return (
    <>
      <CenteredHeader />
      <main
        className="flex flex-col items-center
        w-full
        min-h-[calc(100vh-4rem)]"
      >
        <h2 className="text-text font-bold text-2xl mt-10 mb-2">
          Create your account
        </h2>
        <p className="mb-6">
          Have already an account?{" "}
          <Link href={"/"}>
            <span className="text-primary font-bold">Sign In</span>
          </Link>
        </p>
        <SignUpForm />
      </main>
    </>
  );
};

export default redirectAuthorizedUser(SignUp);
