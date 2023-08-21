import SignUpForm from "@/components/signUpForm";

const SignUp = () => {
  return (
    <>
      <header>
        <div
          className="items-center justify-center
                     py-3 
                     px-2"
        >
          <h1
            className="font-bold text-center
                        text-2xl"
          >
            Join ISKOduler
          </h1>
        </div>
      </header>
      <main>
        <SignUpForm />
      </main>
    </>
  );
};

export default SignUp;
