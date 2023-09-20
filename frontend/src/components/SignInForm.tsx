import React, { useState } from "react";
import { useRouter } from "next/router";
import { postSignIn } from "@/utils/userRequests";
import { VscLoading } from "react-icons/vsc";
import FormButton from "./FormButton";

type inputChangeType = React.ChangeEvent<HTMLInputElement>;

const SignInForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!username || !password)
      return setError("The username and password must not be empty");

    setIsLoading(true);
    const loggedInUser = await postSignIn(username, password);

    if (loggedInUser.Error) {
      setIsLoading(false);
      return setError(loggedInUser.Error);
    }

    await router.replace("/schedules");
    setUsername("");
    setPassword("");
    setIsLoading(false);
    setError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col 
      w-full
      gap-4"
    >
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        className="rounded-xl outline-none
        text-lg
        px-3 py-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="rounded-xl outline-none 
                   text-lg
                   px-3 py-2"
      />
      {error && (
        <p className="font-semibold text-primary text-left px-2">{error}</p>
      )}
      <FormButton
        isLoading={isLoading}
        textButton={"Sign In"}
        marginTopClass="mt-12"
      />
    </form>
  );
};

export default SignInForm;
