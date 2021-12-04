import type { NextPage } from "next";
import Head from "next/head";
import { useScreenType } from "../../hooks/screenType";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DashMobilePage from "../../components/dash/mobile";
import AuthOnly from "../../modules/authOnly";
import AuthProvider from "../../modules/authProvider";

const DashMobile: NextPage = () => {
  const screenType = useScreenType()
  const router = useRouter()

  useEffect(() => {
    if (screenType==="desktop") {
      router.push("/dash/recent")
    }
  }, [screenType, router])

  return (
    <AuthOnly>
      <Head>
        <title>Ip Grabber | Dash</title>
      </Head>
      <DashMobilePage />
    </AuthOnly>
  );
};

export default DashMobile;
