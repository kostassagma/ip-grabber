import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import HomeNav from "../components/nav/homeNav";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ip Grabber | Homepage</title>
      </Head>
      <div>
        <HomeNav />
        <div className="flex justify-center p-10 items-center">
          <div>
            <h1 className="font-bold text-7xl ">Ip Grabber</h1>
            <p className="mt-4">
              Get an insight into what hardware used to access your website
            </p>
            <Link href="/login" passHref>
              <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Get Started
              </button>
            </Link>
          </div>
          <div className="absolute bottom-0 right-0 w-20 h-10 bg-black"></div>
        </div>
      </div>
    </>
  );
};

export default Home;
