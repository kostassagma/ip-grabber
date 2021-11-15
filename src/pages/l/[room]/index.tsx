import type { NextPage } from "next";
import Head from "next/head";
import HomeNav from "../../../components/nav/homeNav";
import Footer from "../../../components/footer";

const Try: NextPage = () => {

  return (
    <>
      <Head>
        <title>Ip Grabber</title>
      </Head>
      <div>
        <div className="min-h-screen flex flex-col">
          <HomeNav />
          <div className="m-auto pb-32 p-5">Hello</div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Try;
