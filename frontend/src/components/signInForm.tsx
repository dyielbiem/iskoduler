import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { postSignIn } from "@/utils/requests";

type inputChangeType = React.ChangeEvent<HTMLInputElement>;
type setInputType = React.Dispatch<React.SetStateAction<string>>;

const SignInForm = () => {
  const router = useRouter();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!usernameRef.current?.value || !passwordRef.current?.value)
      return console.log("The username and password must not be empty");

    postSignIn(usernameRef.current, passwordRef.current, setIsLoading, router);
  };

  // Prevent password input field to accept white space characters
  const handlePasswordInput = (event: inputChangeType) => {
    if (event.target.value.at(-1) === " ") {
      event.target.value = event.target.value.slice(0, -1);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full
              px-[5%]
              mt-20
              gap-3"
    >
      <input
        type="text"
        placeholder="Username"
        ref={usernameRef}
        // onChange={(event) => setUsername(event.target.value)}
        className="rounded-xl outline-none
                   px-3 py-3 "
      />
      <input
        type="password"
        placeholder="Password"
        ref={passwordRef}
        onChange={(event) => handlePasswordInput(event)}
        className="rounded-xl outline-none 
                   px-3 py-3"
      />
      <button
        type="submit"
        className="bg-blue-600 rounded-full text-white font-bold
                    disabled:cursor-wait
                    px-4 py-4 mt-4"
        disabled={isLoading}
      >
        Sign In
      </button>
      <p className="self-center text-center">
        {`New to ISKOduler?${" "}`}
        <Link href="/signup" className="font-bold">
          Sign Up
        </Link>
      </p>
    </form>
  );
};

export default SignInForm;
