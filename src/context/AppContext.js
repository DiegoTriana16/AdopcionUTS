import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export default function AppContext({children}) {
  const [user, setUser] = useState();

  const saveUser = (data) => {
    setUser(data);
  };

  return (
    <UserContext.Provider
      value={{
        saveUser,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}


export function useUserContext(){
    return useContext(UserContext)
}