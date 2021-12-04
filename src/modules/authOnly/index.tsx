import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
// import { getAccessToken, setAccessToken } from "../../lib/accessToken";
import { API } from "../../lib/constants";
import { AuthContext } from "../authProvider";

const AuthOnly: NextPage = ({ children }) => {
  const router = useRouter();
  const { accessToken, setAccessToken } = useContext(AuthContext);

  useEffect(() => {
    if (!accessToken) {
      fetch(`${API}/auth/refresh-token`, {
        method: "POST",
      })
        .then((res) => {
          if (!res.ok) {
            router.push(`/login?next=${router.asPath}`);
            return undefined;
          } else {
            return res.json();
          }
        })
        .then((data) => {
          if (!data) {
            return;
          }
          setAccessToken(data.accessToken);
          console.log(`wohwoh->${data.accessToken}`);
        });
    }
  });

  if (accessToken) {
    return <>{children}</>;
  }

  return <div>loading...</div>;
};

export default AuthOnly;
