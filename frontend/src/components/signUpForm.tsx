import React, { useState, useEffect } from "react";
import { postSignUp } from "@/utils/requests";

type inputChangeType = React.ChangeEvent<HTMLInputElement>;
type setInputType = React.Dispatch<React.SetStateAction<string>>;

const SignUpForm = () => {
  const [username, setUsername] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [retypePassword, setRetypePassword] = useState<string>("");
  const [isButtonDisable, setIsButtonDisable] = useState<boolean>(true);

  // Watch the username, firstname, lastname, password and re-type password fields
  useEffect(() => {
    const fields = [username, firstname, lastname, password, retypePassword];

    if (fields.every((field) => String(field).trim())) {
      if (password === retypePassword) {
        setIsButtonDisable(false);
      } else {
        setIsButtonDisable(true);
      }
    } else {
      setIsButtonDisable(true);
    }
  }, [username, firstname, lastname, password, retypePassword]);

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
    const args = { username, firstname, lastname, password, retypePassword };
    setIsButtonDisable(true);
    await postSignUp(args);

    setIsButtonDisable(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full
              px-[5%]
              mt-10
              gap-3"
    >
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        className="rounded-xl outline-none
                   px-3 py-3"
      />
      <input
        type="text"
        placeholder="First Name"
        value={firstname}
        onChange={(event) => setFirstname(event.target.value)}
        className="rounded-xl outline-none
                   px-3 py-3 "
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastname}
        onChange={(event) => setLastname(event.target.value)}
        className="rounded-xl outline-none
                   px-3 py-3 "
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => handlePasswordInput(event, setPassword)}
        className="rounded-xl outline-none
                   px-3 py-3 "
      />
      <input
        type="password"
        placeholder="Re-type Password"
        value={retypePassword}
        onChange={(event) => handlePasswordInput(event, setRetypePassword)}
        className="rounded-xl outline-none
                   px-3 py-3 "
      />
      <button
        type="submit"
        disabled={isButtonDisable}
        className="bg-blue-600 rounded-full text-white font-bold
                    disabled:cursor-not-allowed disabled:opacity-50
                    px-4 py-4 mt-4"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
