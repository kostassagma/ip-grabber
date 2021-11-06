import "tailwindcss/tailwind.css";
import "nprogress/nprogress.css";
import "../styles/globals.css"
import type { AppProps } from "next/app";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import NProgress from "nprogress";
import { Router } from "next/router";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>Ip Grabber</title>
        <meta
          name="description"
          content="Get insight into hardware used to access your website"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
      <Toaster />
    </div>
  );
}

export default MyApp;
