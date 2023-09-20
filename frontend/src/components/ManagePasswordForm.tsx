import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { patchUserPassword } from "@/utils/userRequests";
import useUserContext from "@/customHooks/useUserContext";
import FormButton from "./FormButton";
import validator from "validator";

type formType = "name" | "password" | undefined;

interface Props {
  visibleForm: formType;
  setVisibleForm: React.Dispatch<React.SetStateAction<formType>>;
}

const ManagePasswordForm = ({ visibleForm, setVisibleForm }: Props) => {
  const router = useRouter();
  const { setUserInformation } = useUserContext();
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [retypeNewPassword, setRetypeNewPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (visibleForm !== "password") {
      setCurrentPassword("");
      setNewPassword("");
      setRetypeNewPassword("");
      setError("");
    }
  }, [visibleForm]);

  useEffect(() => {
    if (newPassword && !validator.isStrongPassword(newPassword)) {
      setError(
        "Password must be at least 8 characters long with at least 1 uppercase, 1 number, and 1 symbol"
      );
    } else {
      setError("");
    }
  }, [newPassword]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    if (
      [currentPassword, newPassword, retypeNewPassword].some((item) => !item)
    ) {
      setIsLoading(false);
      return setError("All fields must be filled in");
    }

    if (!validator.isStrongPassword(newPassword)) {
      setIsLoading(false);
      return setError(
        "Password must be at least 8 characters long with at least 1 uppercase, 1 number, and 1 symbol"
      );
    } else if (newPassword !== retypeNewPassword) {
      setIsLoading(false);
      return setError("The password confirmation does not match");
    }

    const patchedUserPassword = await patchUserPassword({
      currentPassword,
      newPassword,
    });
    if (patchedUserPassword.Error) {
      setIsLoading(false);
      return setError(patchedUserPassword.Error);
    }

    setUserInformation((prevState) => ({
      ...prevState!,
      password: newPassword,
    }));

    router.replace("/profile/manage", undefined, { shallow: true });
    setVisibleForm(undefined);
    setIsLoading(false);
    setError("");
  };

  return (
    <form
      className={`flex-col justify-center items-center w-full
          ${
            visibleForm === "password" || router.query.tab === "password"
              ? "flex"
              : "hidden"
          }
          gap-3
          mt-2
          my-3`}
      onSubmit={handleSubmit}
    >
      <input
        type="password"
        placeholder="Current password"
        value={currentPassword}
        onChange={(event) => setCurrentPassword(event.target.value)}
      />
      <input
        type="password"
        placeholder="New password"
        value={newPassword}
        onChange={(event) => setNewPassword(event.target.value)}
      />
      <input
        type="password"
        placeholder="Re-type new password"
        value={retypeNewPassword}
        onChange={(event) => setRetypeNewPassword(event.target.value)}
      />
      {error && (
        <p
          className="font-semibold text-left self-start text-primary
          px-2
          text-base"
        >
          {error}
        </p>
      )}
      {/* <button
        type="submit"
        className="w-full bg-primary text-white 
            rounded-full font-bold
            mt-4
            py-3
            text-xl"
      >
        Done
      </button> */}
      <FormButton
        isLoading={isLoading}
        textButton={"Done"}
        marginTopClass="mt-4"
      />
      <hr className="h-0.5 bg-gray-300 w-full" />
    </form>
  );
};

export default ManagePasswordForm;
