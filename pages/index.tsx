import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
    <Head>
      <title>Ip Grabber</title>
      <meta
        name="description"
        content="Get insight into hardware used to access your website"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <div className="h-screen flex justify-center p-10 items-center">
      <div>
        <h1 className="font-bold text-7xl ">Ip Grabber</h1>
        <p className="mt-4">
          Get insight into hardware used to access your website
        </p>
        <Link href="/login" passHref>
          <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Get Started
          </button>
        </Link>
      </div>
      <div className="absolute bottom-0 right-0 w-20 h-10 bg-black"></div>
    </div>
    </>
  );
};

export default Home;
