import type { NextPage } from "next";
import Head from "next/head";
import DashPage from "../../components/dash";

const Dash: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ip Grabber | Dash</title>
      </Head>
      <DashPage />
    </>
  );
};

export default Dash;
