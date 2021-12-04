import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import toast, { Toaster } from "react-hot-toast";
import NProgress from "nprogress";
import { Router, useRouter } from "next/router";
import AuthProvider from "../modules/authProvider";
import { useEffect } from "react";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    let toastText = sessionStorage.getItem("toast")
    if (toastText) {
      toast(toastText);
      sessionStorage.setItem("toast", "")
    }
  });

  return (
    <AuthProvider>
      <Head>
        <title>Ip Grabber</title>
        <meta
          name="description"
          content="Get insight into hardware used to access your website"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
      <Toaster position="bottom-center"/>
    </AuthProvider>
  );
}

export default MyApp;
