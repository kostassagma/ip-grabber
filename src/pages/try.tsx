import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import HomeNav from "../components/nav/homeNav";
import Footer from "../components/footer";
import { useEffect, useState } from "react";

const Try: NextPage = () => {
  const [myIp, setMyIp] = useState("loading...");

  useEffect(() => {
    fetch("/api/get-device-info")
      .then((res) => res.json())
      .then((data) => setMyIp(data.ip!));
  }, []);

  return (
    <>
      <Head>
        <title>Ip Grabber | Homepage</title>
      </Head>
      <div>
        <div className="min-h-screen flex flex-col">
          <HomeNav />
          <div className="m-auto pb-32 p-5">Your Ip: {myIp}</div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Try;
