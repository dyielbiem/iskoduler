import React, { useState, useEffect } from "react";
import { postSignUp } from "@/utils/userRequests";
import { useRouter } from "next/router";
import { VscLoading } from "react-icons/vsc";

type inputChangeType = React.ChangeEvent<HTMLInputElement>;
type setInputType = React.Dispatch<React.SetStateAction<string>>;

const SignUpForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [retypePassword, setRetypePassword] = useState<string>("");
  const [isButtonDisable, setIsButtonDisable] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Watch the username, firstname, lastname, password and re-type password fields
  useEffect(() => {
    const fields = [username, firstname, lastname, password, retypePassword];

    if (password && retypePassword && password === retypePassword) {
      setIsButtonDisable(false);
      setError("");
    } else if (password && retypePassword && password !== retypePassword) {
      setIsButtonDisable(true);
      setError("The password confirmation does not match");
    } else if (!retypePassword) {
      setError("");
    }
  }, [password, retypePassword]);

  // Prevent password input field to accept white space characters
  const handlePasswordInput = (
    event: inputChangeType,
    setInput: setInputType
  ) => {
    if (event.target.value.at(-1) !== " ") {
      setInput(event.target.value);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      [username, firstname, lastname, password, retypePassword].some(
        (item) => !item
      )
    )
      return setError("All fields must be filled in");

    const body = {
      username,
      firstname,
      lastname,
      password,
      retypePassword,
    };

    setIsButtonDisable(true);
    setIsLoading(true);
    const signedUpUser = await postSignUp(body);
    if (Object.hasOwn(signedUpUser, "Error")) {
      setIsButtonDisable(false);
      setIsLoading(false);
      return setError(signedUpUser.Error);
    }

    await router.push("/schedules");
    setIsButtonDisable(false);
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full
      max-w-md
      gap-4"
    >
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        className="rounded-xl outline-none w-full
                   px-3 py-2"
      />
      <input
        type="text"
        name="signupFirstname"
        placeholder="First Name"
        value={firstname}
        onChange={(event) => setFirstname(event.target.value)}
        className="rounded-xl outline-none
                   px-3 py-2 "
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastname}
        onChange={(event) => setLastname(event.target.value)}
        className="rounded-xl outline-none
                   px-3 py-2 "
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => handlePasswordInput(event, setPassword)}
        className="rounded-xl outline-none
                   px-3 py-2 "
      />
      <input
        type="password"
        placeholder="Re-type Password"
        value={retypePassword}
        onChange={(event) => handlePasswordInput(event, setRetypePassword)}
        className="rounded-xl outline-none
                   px-3 py-2"
      />
      {error && (
        <p className="font-semibold text-primary text-left px-2">{error}</p>
      )}
      <button
        type="submit"
        disabled={isButtonDisable}
        className={`bg-primary rounded-full text-white font-bold
        disabled:cursor-not-allowed gap-2 items-center
        ${isLoading ? "disabled:opacity-100" : "disabled:opacity-50"}  
        text-lg flex justify-center 
        px-4 py-3 mt-8`}
      >
        <VscLoading
          className={`bg-primary fill-white text-2xl animate-spin
        ${isLoading ? "inline" : "hidden"}`}
        />
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
