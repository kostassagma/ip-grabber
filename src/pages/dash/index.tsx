import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import DashPage from "../../components/dash";
import { useScreenType } from "../../hooks/screenType";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DashMobilePage from "../../components/dash/mobile";

const DashMobile: NextPage = () => {
  const screenType = useScreenType()
  const router = useRouter()

  useEffect(() => {
    if (screenType==="desktop") {
      router.push("/dash/recent")
    }
  }, [screenType, router])

  return (
    <>
      <Head>
        <title>Ip Grabber | Dash</title>
      </Head>
      <DashMobilePage />
    </>
  );
};

export default DashMobile;
