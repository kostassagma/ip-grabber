import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import DashPage from "../../components/dash";
import AuthOnly from "../../modules/authOnly";

const Dash: NextPage = () => {
  return (
    <AuthOnly>
      <Head>
        <title>Ip Grabber | Dash</title>
      </Head>
      <DashPage />
    </AuthOnly>
  );
};

export default Dash;
