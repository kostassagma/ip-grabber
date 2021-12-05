import type { NextPage } from "next";
import Head from "next/head";
import React, { useContext, useState } from "react";
import DashPage from "../../components/dash";
import UserSettings from "../../components/user";
import AuthOnly from "../../modules/authOnly";
import { AuthContext } from "../../modules/authProvider";

const User: NextPage = () => {
  const { username } = useContext(AuthContext);
  return (
    <AuthOnly>
      <Head>
        <title>Ip Grabber | {username}</title>
      </Head>
      <UserSettings />
    </AuthOnly>
  );
};

export default User;
