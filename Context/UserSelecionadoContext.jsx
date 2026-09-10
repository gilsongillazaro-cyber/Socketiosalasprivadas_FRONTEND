import { createContext, useState } from "react";

export const UserSContext = createContext();

export default function UserSContextProvider({ children }) {
  const [UserSCont, setUserSCont] = useState(null);

  return (
    <UserSContext.Provider
      value={{
        UserSCont,
        setUserSCont,
      }}
    >
      {children}
    </UserSContext.Provider>
  );
}
