import { patchUserName } from "@/utils/userRequests";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useUserContext from "@/customHooks/useUserContext";
import FormButton from "./FormButton";

type formType = "name" | "password" | undefined;

interface Props {
  visibleForm: formType;
  currentFirstName: string;
  currentLastName: string;
  setVisibleForm: React.Dispatch<React.SetStateAction<formType>>;
}

const ManageNameForm = ({
  visibleForm,
  currentFirstName,
  currentLastName,
  setVisibleForm,
}: Props) => {
  const router = useRouter();
  const { setUserInformation } = useUserContext();
  const [firstName, setFirstName] = useState<string>(currentFirstName);
  const [lastName, setLastName] = useState<string>(currentLastName);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Check if visible form value change to handle the visibility of manage user form
  useEffect(() => {
    if (visibleForm === "name") {
      setFirstName(currentFirstName);
      setLastName(currentLastName);
      setError("");
    }
  }, [visibleForm]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    // Check if any of first or last name is empty
    if (!String(firstName).trim() || !String(lastName).trim()) {
      setIsLoading(false);
      return setError("Both first and last name are required");
    }

    // Make a patch request to update user's name
    const updatedUserName = await patchUserName({
      firstname: firstName,
      lastname: lastName,
    });

    // Check if Error has occured in response
    if (Object.hasOwn(updatedUserName, "Error")) {
      setIsLoading(false);
      return setError(updatedUserName.Error);
    }

    // Set the updated user's name to user context
    setUserInformation((prevState) => ({
      ...prevState!,
      firstname: firstName,
      lastname: lastName,
    }));

    // Remove the query param from the route and hide the manage user form
    router.replace("/profile/manage", undefined, { shallow: true });
    setVisibleForm(undefined);
    setIsLoading(false);
    setError("");
  };

  return (
    <form
      className={`flex-col justify-center items-center w-full
      ${
        visibleForm === "name" || router.query.tab === "name"
          ? "flex"
          : "hidden"
      }
      gap-3
      mt-2
      my-3`}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="First name"
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
      />
      <input
        type="text"
        placeholder="Last name"
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
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
      <FormButton
        isLoading={isLoading}
        textButton={"Done"}
        marginTopClass="mt-4"
      />
      <hr className="h-0.5 bg-gray-300 w-full" />
    </form>
  );
};

export default ManageNameForm;
