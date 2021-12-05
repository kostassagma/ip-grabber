import type { NextPage } from "next";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { authOnlyResHandler } from "../../lib/clientSideRequest";
import { API } from "../../lib/constants";

interface AuthTypes {
  accessToken: string;
  username: string;
  setAccessToken: Dispatch<SetStateAction<string>>;
}

export const AuthContext = createContext({} as AuthTypes);

const AuthProvider: NextPage = ({ children }) => {
  const [accessToken, setAccessToken] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    authOnlyResHandler(`${API}/user/details`, accessToken)
      .then((res) => res.json())
      .then((data) => {
        setUsername(data.username);
      })
      .catch((err) => {
        setUsername("");
      });
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ accessToken, username, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
