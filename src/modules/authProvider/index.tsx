import type { NextPage } from "next";
import { createContext, Dispatch, SetStateAction, useState } from "react";

interface AuthTypes {
  accessToken: string;
  setAccessToken: Dispatch<SetStateAction<string>>;
}

export const AuthContext = createContext({} as AuthTypes);

const AuthProvider: NextPage = ({ children }) => {
  const [accessToken, setAccessToken] = useState("");

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
