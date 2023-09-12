import { createContext, useState, ReactNode } from "react";

interface userInformationType {
  _id: string;
  username: string;
  firstname: string;
  lastname: string;
  imageID: string;
  imageURL: string;
}

interface Props {
  children: ReactNode;
}

interface userContextType {
  userInformation: userInformationType | undefined;
  setUserInformation: React.Dispatch<
    React.SetStateAction<userInformationType | undefined>
  >;
}

export const UserContext = createContext<userContextType | undefined>(
  undefined
);

const UserContextProvider = ({ children }: Props) => {
  const [userInformation, setUserInformation] = useState<
    userInformationType | undefined
  >();
  return (
    <UserContext.Provider value={{ userInformation, setUserInformation }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
