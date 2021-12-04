import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import HomeNav from "../components/nav/homeNav";
import Footer from "../components/footer";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ip Grabber | Homepage</title>
      </Head>
      <div>
        <div className="min-h-screen flex flex-col">
          <HomeNav />
          <div className="m-auto pb-32 p-5">
              <h1 className="font-bold text-6xl ">Ip Grabber</h1>
              <p className="mt-4">
                Get an insight into what hardware used to access your website
              </p>
              <Link href="/dash" passHref>
                <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Get Started
                </button>
              </Link>
          </div>
        </div>
        <Footer/>
      </div>
    </>
  );
};

export default Home;
